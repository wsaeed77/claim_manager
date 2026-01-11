<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Partner;
use App\Models\User;
use App\Models\FileHandler;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        if ($request->has('claimid') && $request->claimid) {
            $client = Client::with([
                'claim', 'accident', 'agent', 'vehicle', 'driver', 'employer',
                'damage', 'insurance', 'hire', 'hireHd', 'hireMileage', 'hirePcn',
                'repair', 'inspection', 'storage', 'solicitor', 'notes', 'witnesses'
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
