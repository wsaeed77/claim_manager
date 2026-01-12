<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Partner;
use App\Models\User;
use App\Models\FileHandler;
use App\Models\Claim;
use App\Models\Agent;
use App\Models\Solicitor;
use App\Models\Driver;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        if ($request->has('claimid') && $request->claimid) {
            $client = Client::with([
                'claim', 'accident', 'agent', 'vehicle', 'driver', 'employer',
                'damage', 'insurance', 'hire', 'hireHd', 'hireMileage', 'hirePcn',
                'repair', 'inspection', 'storage', 'solicitor', 'notes', 'witnesses',
                'tpVehicle', 'tpInsurance', 'tpdDriver', 'tps', 'pi', 'pimd', 
                'pigp', 'pihospitals', 'rehab', 'payments.partner'
            ])->findOrFail($request->claimid);

            $caseOrders = Client::where('case_no', $client->case_no)->get();
            
            // Get all partners by type
            $partners = [
                'agents' => Partner::where('partner_type', 'agent')->get(),
                'engineers' => Partner::where('partner_type', 'engineer')->get(),
                'repairers' => Partner::where('partner_type', 'repairer')->get(),
                'medicals' => Partner::where('partner_type', 'medical')->get(),
                'hostCos' => Partner::where('partner_type', 'host-co')->get(),
                'solicitors' => Partner::where('partner_type', 'solicitor')->get(),
                'recovery' => Partner::where('partner_type', 'recovery')->get(),
                'insurers' => Partner::where('partner_type', 'insurer')->get(),
                'storage' => Partner::where('partner_type', 'storage')->get(),
                'hireCompanies' => Partner::where('partner_type', 'hire-company')->get(),
            ];

            $handlers = [];
            if ($client->solicitor && $client->solicitor->solicitors_name) {
                $handlers = FileHandler::where('solicitor_id', $client->solicitor->solicitors_name)
                    ->pluck('name', 'filehandler_id');
            }

            $users = User::all();

            return Inertia::render('Clients/Show', [
                'client' => $client,
                'caseOrders' => $caseOrders,
                'partners' => $partners,
                'handlers' => $handlers,
                'users' => $users,
            ]);
        }

        // List all clients with pagination and search
        $query = Client::query();

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('case_no', 'LIKE', "%{$search}%")
                    ->orWhere('case_ref', 'LIKE', "%{$search}%")
                    ->orWhere('client_fname', 'LIKE', "%{$search}%")
                    ->orWhere('client_lname', 'LIKE', "%{$search}%")
                    ->orWhereRaw("CONCAT(client_fname, ' ', client_lname) LIKE ?", ["%{$search}%"])
                    ->orWhere('client_mobile', 'LIKE', "%{$search}%")
                    ->orWhere('client_email', 'LIKE', "%{$search}%");
            });
        }

        $clients = $query->orderBy('case_no', 'DESC')
            ->orderBy('case_order', 'DESC')
            ->paginate(15)
            ->appends($request->only('search'));

        return Inertia::render('Clients/Index', [
            'clients' => $clients,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        $preFilledFormValues = [
            'case_no' => (Client::max('case_no') ?? 0) + 1,
            'case_order' => 1,
        ];

        $partners = [
            'hostCos' => Partner::where('partner_type', 'host-co')->get(),
            'agents' => Partner::where('partner_type', 'agent')->get(),
        ];

        return Inertia::render('Clients/Create', [
            'preFilledFormValues' => $preFilledFormValues,
            'partners' => $partners,
        ]);
    }

    public function makeClaimants($claimId): Response
    {
        $client = Client::findOrFail($claimId);
        $nextOrder = Client::where('case_no', $client->case_no)->max('case_order') + 1;

        $preFilledFormValues = [
            'case_no' => $client->case_no,
            'case_order' => $nextOrder,
        ];

        $partners = [
            'hostCos' => Partner::where('partner_type', 'host-co')->get(),
            'agents' => Partner::where('partner_type', 'agent')->get(),
        ];

        return Inertia::render('Clients/Create', [
            'preFilledFormValues' => $preFilledFormValues,
            'partners' => $partners,
            'claimId' => $claimId,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'case_no' => 'required|integer',
            'case_order' => 'required|integer',
            'case_ref' => 'nullable|string|max:255',
            'client_title' => 'nullable|string|max:255',
            'client_type' => 'nullable|string|max:255',
            'client_fname' => 'required|string|max:255',
            'client_lname' => 'required|string|max:255',
            'client_address' => 'nullable|string',
            'client_city' => 'nullable|string|max:255',
            'client_country' => 'nullable|string|max:255',
            'client_postcode' => 'nullable|string|max:255',
            'client_hometel' => 'nullable|string|max:255',
            'client_worktel' => 'nullable|string|max:255',
            'client_mobile' => 'nullable|string|max:255',
            'client_email' => 'nullable|email|max:255',
        ]);

        $client = Client::create([
            ...$validated,
            'created_by' => Auth::id(),
        ]);

        // TODO: Handle related tables (accident, agent, etc.)
        // This will be implemented based on the form data

        return redirect()->route('home.index', ['claimid' => $client->id])
            ->with('success', 'Client created successfully.');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'claimid' => 'required|exists:clients,id',
            'case_no' => 'required|integer',
            'case_order' => 'required|integer',
            'case_ref' => 'nullable|string|max:255',
            'client_title' => 'nullable|string|max:255',
            'client_type' => 'nullable|string|max:255',
            'client_fname' => 'required|string|max:255',
            'client_lname' => 'required|string|max:255',
            'client_address' => 'nullable|string',
            'client_city' => 'nullable|string|max:255',
            'client_country' => 'nullable|string|max:255',
            'client_postcode' => 'nullable|string|max:255',
            'client_hometel' => 'nullable|string|max:255',
            'client_worktel' => 'nullable|string|max:255',
            'client_mobile' => 'nullable|string|max:255',
            'client_email' => 'nullable|email|max:255',
            'client_cooperation' => 'nullable|string|max:255',
        ]);

        $client = Client::findOrFail($validated['claimid']);
        $client->update($validated);

        // TODO: Update related tables

        return redirect()->route('home.index', ['claimid' => $client->id])
            ->with('success', 'Client updated successfully.');
    }

    public function deleteClient($clientId)
    {
        $client = Client::findOrFail($clientId);
        $client->delete();

        return redirect()->route('home.index')
            ->with('success', 'Client deleted successfully.');
    }

    public function addclaim(Request $request)
    {
        return $this->store($request);
    }

    public function updateclaim(Request $request)
    {
        $data = $request->all();
        
        // Find client
        $client = Client::findOrFail($data['claimid']);
        
        // Update client
        $client->case_no = $data['case_no'];
        $client->case_order = $data['case_order'];
        $client->case_ref = $data['case_ref'] ?? '';
        $client->client_title = $data['client_title'] ?? '';
        $client->client_type = $data['client_type'] ?? '';
        $client->client_fname = $data['client_fname'];
        $client->client_lname = $data['client_lname'];
        $client->client_address = $data['client_address'] ?? '';
        $client->client_city = $data['client_city'] ?? '';
        $client->client_country = $data['client_country'] ?? '';
        $client->client_postcode = $data['client_postcode'] ?? '';
        $client->client_hometel = $data['client_hometel'] ?? '';
        $client->client_worktel = $data['client_worktel'] ?? '';
        $client->client_mobile = $data['client_mobile'] ?? '';
        $client->client_email = $data['client_email'] ?? '';
        $client->client_cooperation = $data['client_cooperation'] ?? '';
        $client->save();

        // Helper function to parse date from dd-mm-yyyy to yyyy-mm-dd
        $parseDate = function($dateStr) {
            if (empty($dateStr)) return null;
            $parts = explode('-', $dateStr);
            if (count($parts) === 3 && strlen($parts[2]) === 4) {
                // Assume dd-mm-yyyy format
                return $parts[2] . '-' . $parts[1] . '-' . $parts[0];
            }
            return $dateStr;
        };

        // Update or create Claim
        $claim = Claim::firstOrNew(['client_id' => $client->id]);
        $claim->claim_dob = $parseDate($data['claim_dob'] ?? null);
        $claim->claim_occupation = $data['claim_occupation'] ?? '';
        $claim->claim_ni = $data['claim_ni'] ?? '';
        $claim->claim_rni = $data['claim_rni'] ?? '';
        $claim->claim_sdate = $parseDate($data['claim_sdate'] ?? null);
        $claim->claim_ldate = $parseDate($data['claim_ldate'] ?? null);
        $claim->claim_status = $data['claim_status'] ?? 'Pending';
        $claim->claim_dreason = $data['claim_dreason'] ?? '';
        $claim->case_advisor = $data['case_advisor'] ?? '';
        $claim->claim_category = $data['claim_category'] ?? '';
        $claim->claim_type = is_array($data['claim_type'] ?? null) 
            ? implode(',', $data['claim_type']) 
            : ($data['claim_type'] ?? '');
        $claim->claim_odetails = $data['claim_odetails'] ?? '';
        $claim->save();

        // Update or create Agent
        $agent = Agent::firstOrNew(['client_id' => $client->id]);
        $agent->agent_name = $data['agent_name'] ?? '';
        $agent->host_co = $data['host_co'] ?? '';
        $agent->save();

        // Update or create Solicitor
        $solicitor = Solicitor::firstOrNew(['client_id' => $client->id]);
        $solicitor->solicitors_name = $data['solicitors_name'] ?? '';
        $solicitor->solicitors_datesent = $parseDate($data['solicitors_datesent'] ?? null);
        $solicitor->solicitors_dateaccepted = $parseDate($data['solicitors_dateaccepted'] ?? null);
        $solicitor->solicitors_reference = $data['solicitors_reference'] ?? '';
        $solicitor->solicitors_fhandler = $data['solicitors_fhandler'] ?? '';
        $solicitor->solicitors_email = $data['solicitors_email'] ?? '';
        $solicitor->solicitors_tel = $data['solicitors_tel'] ?? '';
        $solicitor->solicitors_invstatus = $data['solicitors_invstatus'] ?? 'Not Ready For invoice';
        $solicitor->solicitors_invsdate = $parseDate($data['solicitors_invsdate'] ?? null);
        $solicitor->solicitors_invpdate = $parseDate($data['solicitors_invpdate'] ?? null);
        $solicitor->solicitors_notes = $data['solicitors_notes'] ?? '';
        $solicitor->solicitors_providers = $data['solicitors_providers'] ?? '';
        $solicitor->solicitors_dstatus = $data['solicitors_dstatus'] ?? 'Not Sent';
        $solicitor->solicitors_dscdate = $parseDate($data['solicitors_dscdate'] ?? null);
        $solicitor->solicitors_dssate = $parseDate($data['solicitors_dssate'] ?? null);
        $solicitor->solicitors_dhandler = $data['solicitors_dhandler'] ?? '';
        $solicitor->solicitors_leico = $data['solicitors_leico'] ?? '';
        $solicitor->solicitors_ate_provider = $data['solicitors_ate_provider'] ?? '';
        $solicitor->solicitors_ate_cstatus = $data['solicitors_ate_cstatus'] ?? '';
        $solicitor->save();

        // Update related tables for all claimants under the same case_no
        $this->updateRelatedTablesForCase($client->case_no, $data, $client->id);

        // Handle redirect with active tab
        $redirectUrl = '/?claimid=' . $client->id;
        if (isset($data['activetab']) && !empty($data['activetab'])) {
            $redirectUrl .= $data['activetab'];
        }

        return redirect($redirectUrl)->with('success', 'Client updated successfully.');
    }

    private function updateRelatedTablesForCase($caseNo, $data, $mainClientId)
    {
        $clientsInCase = Client::where('case_no', $caseNo)->where('id', '!=', $mainClientId)->get();
        
        $parseDate = function($dateStr) {
            if (empty($dateStr)) return null;
            $parts = explode('-', $dateStr);
            if (count($parts) === 3 && strlen($parts[2]) === 4) {
                return $parts[2] . '-' . $parts[1] . '-' . $parts[0];
            }
            return $dateStr;
        };

        foreach ($clientsInCase as $caseClient) {
            // Update Claim for other claimants
            $claim = Claim::firstOrNew(['client_id' => $caseClient->id]);
            $claim->claim_status = $data['claim_status'] ?? $claim->claim_status;
            $claim->case_advisor = $data['case_advisor'] ?? $claim->case_advisor;
            $claim->claim_category = $data['claim_category'] ?? $claim->claim_category;
            $claim->claim_type = is_array($data['claim_type'] ?? null) 
                ? implode(',', $data['claim_type']) 
                : ($data['claim_type'] ?? $claim->claim_type);
            $claim->save();

            // Update Agent for other claimants
            $agent = Agent::firstOrNew(['client_id' => $caseClient->id]);
            $agent->agent_name = $data['agent_name'] ?? $agent->agent_name;
            $agent->host_co = $data['host_co'] ?? $agent->host_co;
            $agent->save();

            // Update Solicitor for other claimants
            $solicitor = Solicitor::firstOrNew(['client_id' => $caseClient->id]);
            $solicitor->solicitors_name = $data['solicitors_name'] ?? $solicitor->solicitors_name;
            $solicitor->solicitors_fhandler = $data['solicitors_fhandler'] ?? $solicitor->solicitors_fhandler;
            $solicitor->save();
        }
    }

    public function reminder(): Response
    {
        // Get medical appointments due in next 7 days
        $list = Client::with('pimd')
            ->leftJoin('pimd', function($query) {
                $query->on('clients.id', '=', 'pimd.client_id');
            })
            ->whereRaw("(pimd.pimd_dad != '' AND pimd.pimd_dad IS NOT NULL) AND pimd.pimd_dad <= DATE_ADD(NOW(), INTERVAL 7 DAY) AND pimd_status = 'Booked'")
            ->select('clients.*')
            ->orderBy('pimd.pimd_dad', 'DESC')
            ->get();

        return Inertia::render('Reminders/Index', [
            'list' => $list,
        ]);
    }
}
