<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Partner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Response as HttpResponse;

class SearchController extends Controller
{
    public function index(Request $request): Response
    {
        $query = $request->get('query', '');
        $type = $request->get('type', 'all');
        $results = [];

        if ($query) {
            if ($type === 'all' || $type === 'clients') {
                $results = Client::where(function ($q) use ($query) {
                    $q->where('client_fname', 'like', "%{$query}%")
                        ->orWhere('client_lname', 'like', "%{$query}%")
                        ->orWhere('case_no', 'like', "%{$query}%")
                        ->orWhere('case_ref', 'like', "%{$query}%")
                        ->orWhere('client_mobile', 'like', "%{$query}%")
                        ->orWhere('client_email', 'like', "%{$query}%");
                })->get();
            }
        }

        return Inertia::render('Search/Index', [
            'results' => $results,
            'searchParams' => [
                'query' => $query,
                'type' => $type,
            ],
        ]);
    }

    public function reportIndex(Request $request): Response
    {
        $search = $request->all();
        $claimTypes = ['Car hire', 'Vehicle damage', 'PI', 'Credit Repair', 'Loss of use', 'Loss of earnings', 
            'Recovery', 'Driveable', 'Inspection', 'Storage', 'Excess', 'Medical'];

        $caseStatus = ['Completed', 'Declined', 'Fleet', 'In House', 'Live', 'On Hold', 'Pending', 'Referred', 
            'Solicitors', 'With Drawn'];

        $clients = [];
        $clientsCount = 0;
        
        if (isset($search['report_type'])) {
            $clients = Client::report($search);
            $clientsCount = Client::reportCount($search);
        }

        // Get partners for group by dropdown
        $partners = [];
        if (isset($search['group_by'])) {
            if ($search['group_by'] == 'solicitor') {
                $partners = Partner::where('partner_type', 'solicitor')->get();
            } elseif ($search['group_by'] == 'agent') {
                $partners = Partner::where('partner_type', 'agent')->get();
            } elseif ($search['group_by'] == 'insurer') {
                $partners = Partner::where('partner_type', 'insurer')->get();
            } elseif ($search['group_by'] == 'hire-company') {
                $partners = Partner::where('partner_type', 'hire-company')->get();
            } elseif ($search['group_by'] == 'repairer') {
                $partners = Partner::where('partner_type', 'repairer')->get();
            }
        }

        return Inertia::render('Reports/Index', [
            'clients' => $clients,
            'clientsCount' => $clientsCount,
            'search' => $search,
            'claimTypes' => $claimTypes,
            'caseStatus' => $caseStatus,
            'partners' => $partners,
            'query' => $request->query(),
        ]);
    }

    public function export(Request $request)
    {
        $search = $request->all();
        $file_name = isset($search['report_type']) ? $search['report_type'] : 'file';
        $file_name = str_replace(' ', '-', $file_name) . '-' . time();

        $clients = Client::report($search);
        
        $columns = [];
        $callback = null;

        if (isset($search['report_type']) && $search['report_type'] == 'Pending/Referred/Fleet') {
            $columns = ['Case Number', 'Case Date', 'Status', 'Ref', 'Invoice Status', 'Type', 'First Name', 
                'Last Name', 'Tel', 'Mobile', 'Claim Adviser', 'REG', 'Solicitor', 'Agent', 'Notes Last Date', 'Notes Detail'];

            $callback = function() use ($clients, $columns) {
                $file = fopen('php://output', 'w');
                fputcsv($file, $columns);

                foreach ($clients as $client) {
                    $latestNote = $client->latestNotes();
                    fputcsv($file, [
                        $client->case_no,
                        $client->claim_sdate ? $client->getFormatDate($client->claim_sdate) : '',
                        $client->claim_status ?? '',
                        $client->solicitors_reference ?? '',
                        $client->solicitors_invstatus ?? '',
                        $client->claim_type ?? '',
                        $client->client_fname,
                        $client->client_lname,
                        $client->client_hometel ?? '',
                        $client->client_mobile ?? '',
                        $client->case_advisor ?? '',
                        $client->vehicle_reg ?? '',
                        Client::partner($client->solicitors_name ?? null),
                        Client::partner($client->agent_name ?? null),
                        $latestNote ? $client->getFormatDate($latestNote->note_date) : '',
                        $latestNote ? $latestNote->details : '',
                    ]);
                }
                fclose($file);
            };
        } elseif (isset($search['report_type']) && $search['report_type'] == 'Solicitor') {
            $columns = ['Case Number', 'Case Date', 'Status', 'Type', 'First Name', 'Last Name', 'REG', 
                'Solicitor', 'Sol. Claim Handler', 'Sol. Ref', 'Sol. Date Accepted', 'ATE Status', 
                'Sol. Inv. Status', 'Sol. Inv. Issue Date', 'Sol. Inv. Paid Date'];

            $callback = function() use ($clients, $columns) {
                $file = fopen('php://output', 'w');
                fputcsv($file, $columns);

                foreach ($clients as $client) {
                    fputcsv($file, [
                        $client->case_no,
                        $client->claim_sdate ? $client->getFormatDate($client->claim_sdate) : '',
                        $client->claim_status ?? '',
                        $client->claim_type ?? '',
                        $client->client_fname,
                        $client->client_lname,
                        $client->vehicle_reg ?? '',
                        Client::partner($client->solicitors_name ?? null),
                        $client->solicitors_dhandler ?? '',
                        $client->solicitors_reference ?? '',
                        $client->solicitors_dateaccepted ? $client->getFormatDate($client->solicitors_dateaccepted) : '',
                        $client->solicitors_ate_cstatus ?? '',
                        $client->solicitors_invstatus ?? '',
                        $client->solicitors_invsdate ? $client->getFormatDate($client->solicitors_invsdate) : '',
                        $client->solicitors_invpdate ? $client->getFormatDate($client->solicitors_invpdate) : '',
                    ]);
                }
                fclose($file);
            };
        } elseif (isset($search['report_type']) && $search['report_type'] == 'Agent Fee') {
            $columns = ['Case Number', 'Claim Ref.', 'Case Date', 'Status', 'First Name', 'Last Name', 
                'Solicitor', 'Sol. Inv. Status', 'Sol. Inv. Issue Date', 'Sol. Inv. Paid Date', 'Agent', 
                'Agent Fee Detail', 'Agent Fee Status', 'Agent Fee Amount', 'Agent Fee Date Paid'];

            $callback = function() use ($clients, $columns) {
                $file = fopen('php://output', 'w');
                fputcsv($file, $columns);

                foreach ($clients as $client) {
                    fputcsv($file, [
                        $client->case_no,
                        $client->case_ref ?? '',
                        $client->claim_sdate ? $client->getFormatDate($client->claim_sdate) : '',
                        $client->claim_status ?? '',
                        $client->client_fname,
                        $client->client_lname,
                        Client::partner($client->solicitors_name ?? null),
                        $client->solicitors_invstatus ?? '',
                        $client->solicitors_invsdate ? $client->getFormatDate($client->solicitors_invsdate) : '',
                        $client->solicitors_invpdate ? $client->getFormatDate($client->solicitors_invpdate) : '',
                        Client::partner($client->agent_name ?? null),
                        '-', '-', '-', '-',
                    ]);
                }
                fclose($file);
            };
        } elseif (isset($search['report_type']) && $search['report_type'] == 'Car Hire') {
            $columns = ['Case Number', 'Case Date', 'Status', 'Type', 'First Name', 'Last Name', 
                'Claim Adviser', 'REG', 'Hire Co', 'Hire Start Date', 'Hire End Date', 'Hire Comm', 
                'Garage/R', 'Repair Status', 'Repair Date', 'Repair A.'];

            $callback = function() use ($clients, $columns) {
                $file = fopen('php://output', 'w');
                fputcsv($file, $columns);

                foreach ($clients as $client) {
                    fputcsv($file, [
                        $client->case_no,
                        $client->claim_sdate ? $client->getFormatDate($client->claim_sdate) : '',
                        $client->claim_status ?? '',
                        $client->claim_type ?? '',
                        $client->client_fname,
                        $client->client_lname,
                        $client->case_advisor ?? '',
                        $client->vehicle_reg ?? '',
                        Client::partner($client->hire_provider ?? null),
                        $client->hire_sdate ? $client->getFormatDate($client->hire_sdate) : '',
                        $client->hire_edate ? $client->getFormatDate($client->hire_edate) : '',
                        'Hire Comm',
                        Client::partner($client->repair_repair ?? null),
                        $client->repair_status ?? '',
                        $client->repair_din ? $client->getFormatDate($client->repair_din) : '',
                        $client->repair_dauthor ?? '',
                    ]);
                }
                fclose($file);
            };
        } elseif (isset($search['report_type']) && $search['report_type'] == 'Inspection Status') {
            $columns = ['Case Number', 'Case Date', 'Status', 'First Name', 'Last Name', 'Address', 
                'Tel', 'Mobile', 'REG', 'Engineer', 'Inspection Status', 'Date Instructed', 
                'Date Inspected', 'Date Report', 'Date Report Send'];

            $callback = function() use ($clients, $columns) {
                $file = fopen('php://output', 'w');
                fputcsv($file, $columns);

                foreach ($clients as $client) {
                    fputcsv($file, [
                        $client->case_no,
                        $client->claim_sdate ? $client->getFormatDate($client->claim_sdate) : '',
                        $client->claim_status ?? '',
                        $client->client_fname,
                        $client->client_lname,
                        $client->client_address ?? '',
                        $client->client_hometel ?? '',
                        $client->client_mobile ?? '',
                        $client->vehicle_reg ?? '',
                        Client::partner($client->inspect_eng ?? null),
                        $client->inspect_status ?? '',
                        $client->inspect_inst ? $client->getFormatDate($client->inspect_inst) : '',
                        $client->inspect_insptd ? $client->getFormatDate($client->inspect_insptd) : '',
                        $client->inspect_rrec ? $client->getFormatDate($client->inspect_rrec) : '',
                        $client->inspect_rsent ? $client->getFormatDate($client->inspect_rsent) : '',
                    ]);
                }
                fclose($file);
            };
        } elseif (isset($search['report_type']) && $search['report_type'] == 'Liability Status') {
            $columns = ['Case Number', 'Case Date', 'Status', 'First Name', 'Last Name', 'Address', 
                'Tel', 'Mobile', 'REG', 'Liability Status', 'TPI Notes'];

            $callback = function() use ($clients, $columns) {
                $file = fopen('php://output', 'w');
                fputcsv($file, $columns);

                foreach ($clients as $client) {
                    fputcsv($file, [
                        $client->case_no,
                        $client->claim_sdate ? $client->getFormatDate($client->claim_sdate) : '',
                        $client->claim_status ?? '',
                        $client->client_fname,
                        $client->client_lname,
                        $client->client_address ?? '',
                        $client->client_hometel ?? '',
                        $client->client_mobile ?? '',
                        $client->vehicle_reg ?? '',
                        $client->vdamage_liability ?? '',
                        $client->tpi_tpin ?? '',
                    ]);
                }
                fclose($file);
            };
        } elseif (isset($search['report_type']) && $search['report_type'] == 'Medical Appointment') {
            $columns = ['Case Number', 'Case Ref.', 'Case Date', 'Category', 'Title', 'First Name', 
                'Last Name', 'Address', 'Accident Date', 'Solicitor', 'Sol. Ref', 'Agent', 'Expert', 
                'Venue', 'App. Date', 'App. Time', 'App. Status', 'Date Med.'];

            $callback = function() use ($clients, $columns) {
                $file = fopen('php://output', 'w');
                fputcsv($file, $columns);

                foreach ($clients as $client) {
                    fputcsv($file, [
                        $client->case_no,
                        $client->case_ref ?? '',
                        $client->claim_sdate ? $client->getFormatDate($client->claim_sdate) : '',
                        $client->claim_category ?? '',
                        $client->client_title ?? '',
                        $client->client_fname,
                        $client->client_lname,
                        $client->client_address ?? '',
                        $client->accident_date ? $client->getFormatDate($client->accident_date) : '',
                        Client::partner($client->solicitors_name ?? null),
                        $client->solicitors_reference ?? '',
                        Client::partner($client->agent_name ?? null),
                        $client->pimd_exp ?? '',
                        $client->pimd_venue ?? '',
                        $client->pimd_dad ? $client->getFormatDate($client->pimd_dad) : '',
                        $client->pimd_dat ?? '',
                        $client->pimd_status ?? '',
                        $client->pimd_drr ? $client->getFormatDate($client->pimd_drr) : '',
                    ]);
                }
                fclose($file);
            };
        }

        if ($callback) {
            $headers = [
                'Content-type' => 'text/csv',
                'Content-Disposition' => "attachment; filename={$file_name}.csv",
                'Pragma' => 'no-cache',
                'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
                'Expires' => '0'
            ];

            return HttpResponse::stream($callback, 200, $headers);
        }

        return response()->json(['message' => 'Invalid report type'], 400);
    }
}
