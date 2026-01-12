<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    public function index(Request $request): Response
    {
        $partners = Partner::orderBy('name', 'ASC')
            ->paginate(15);

        return Inertia::render('Partners/Index', [
            'partners' => $partners,
        ]);
    }

    public function addPartner($partnerType): Response
    {
        return Inertia::render('Partners/Create', [
            'partnerType' => $partnerType,
        ]);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'partner_type' => 'required|string|max:255',
            'address' => 'nullable|string',
            'partner_city' => 'nullable|string|max:255',
            'partner_county' => 'nullable|string|max:255',
            'partner_postcode' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:255',
            'mobile_number' => 'nullable|string|max:255',
            'fax' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'reference' => 'nullable|string|max:255',
            'prefix' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
            'comp_reg_no' => 'nullable|string|max:255',
            'vat_reg_no' => 'nullable|string|max:255',
            'bank_name' => 'nullable|string|max:255',
            'acc_name' => 'nullable|string|max:255',
            'short_code' => 'nullable|string|max:255',
            'acc_no' => 'nullable|string|max:255',
            'attach_logo' => 'nullable|file|image|max:2048',
            'pay_rate' => 'nullable|numeric',
            'minor_pay_rate' => 'nullable|numeric',
            'taxi_pay_rate' => 'nullable|numeric',
            'prestige_pay_rate' => 'nullable|numeric',
            'moj_register' => 'nullable|string|max:255',
            'moj_crm_no' => 'nullable|string|max:255',
        ]);

        $data = $validated;

        // Auto-generate reference if not provided
        if (empty($data['reference'])) {
            $partnerType = $data['partner_type'];
            $typeMap = [
                'host-co' => 'host_co',
                'agent' => 'agent',
                'solicitor' => 'solicitor',
                'engineer' => 'engineer',
                'repairer' => 'repairer',
                'medical' => 'medical',
                'recovery' => 'recovery',
                'insurer' => 'insurer',
                'storage' => 'storage',
                'hire-company' => 'hire_company',
                'ate' => 'ate',
                'medical-appointment' => 'medical_appointment',
            ];
            $prefix = $typeMap[$partnerType] ?? 'partner';
            
            // Get the count of existing partners of this type
            $count = Partner::where('partner_type', $partnerType)->count();
            $data['reference'] = $prefix . '_' . ($count + 1);
        }

        // Handle file upload
        if ($request->hasFile('attach_logo')) {
            $file = $request->file('attach_logo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('cm/uploads'), $filename);
            $data['attach_logo'] = $filename;
        }

        $partner = Partner::create($data);

        // If it's an Inertia request (from modal), redirect back
        if ($request->header('X-Inertia')) {
            return redirect()->back()->with('success', 'Partner created successfully.');
        }

        return redirect()->route('partner.index')
            ->with('success', 'Partner created successfully.');
    }

    public function update(Request $request, $id)
    {
        // Try to find by ID first, then by name
        $partner = Partner::where('id', $id)->orWhere('name', $id)->firstOrFail();

        // If it's an AJAX/JSON request, return JSON (for modal usage)
        if ($request->wantsJson() || $request->ajax() || $request->header('Accept') === 'application/json') {
            return response()->json(['partner' => $partner]);
        }

        // If it's an Inertia request, return Inertia response
        if ($request->header('X-Inertia')) {
            return Inertia::render('Partners/Edit', [
                'partner' => $partner,
            ]);
        }

        // Default to Inertia response
        return Inertia::render('Partners/Edit', [
            'partner' => $partner,
        ]);
    }

    public function save(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'partner_type' => 'required|string|max:255',
            'address' => 'nullable|string',
            'partner_city' => 'nullable|string|max:255',
            'partner_county' => 'nullable|string|max:255',
            'partner_postcode' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:255',
            'mobile_number' => 'nullable|string|max:255',
            'fax' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'reference' => 'nullable|string|max:255',
            'prefix' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
            'comp_reg_no' => 'nullable|string|max:255',
            'vat_reg_no' => 'nullable|string|max:255',
            'bank_name' => 'nullable|string|max:255',
            'acc_name' => 'nullable|string|max:255',
            'short_code' => 'nullable|string|max:255',
            'acc_no' => 'nullable|string|max:255',
            'attach_logo' => 'nullable|file|image|max:2048',
            'pay_rate' => 'nullable|numeric',
            'minor_pay_rate' => 'nullable|numeric',
            'taxi_pay_rate' => 'nullable|numeric',
            'prestige_pay_rate' => 'nullable|numeric',
            'moj_register' => 'nullable|string|max:255',
            'moj_crm_no' => 'nullable|string|max:255',
        ]);

        // Try to find by ID first, then by name
        $partner = Partner::where('id', $id)->orWhere('name', $id)->firstOrFail();
        
        $data = $validated;

        // Handle file upload
        if ($request->hasFile('attach_logo')) {
            // Delete old logo if exists
            if ($partner->attach_logo && file_exists(public_path('cm/uploads/' . $partner->attach_logo))) {
                unlink(public_path('cm/uploads/' . $partner->attach_logo));
            }
            
            $file = $request->file('attach_logo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('cm/uploads'), $filename);
            $data['attach_logo'] = $filename;
        }

        $partner->update($data);

        // If it's an Inertia request (from modal), redirect back
        if ($request->header('X-Inertia')) {
            return redirect()->back()->with('success', 'Partner updated successfully.');
        }

        return redirect()->route('partner.index')
            ->with('success', 'Partner updated successfully.');
    }

    public function getPartners(Request $request, $partnerType = null)
    {
        if ($partnerType) {
            $partners = Partner::where('partner_type', $partnerType)->orderBy('name')->get();
        } else {
            $partners = Partner::orderBy('name')->get();
        }

        // If it's an Inertia request, return Inertia response
        if ($request->header('X-Inertia')) {
            return Inertia::render('Partners/List', [
                'partners' => $partners,
                'partnerType' => $partnerType,
            ]);
        }

        // If it's an AJAX/JSON request (but not Inertia), return JSON
        if ($request->wantsJson() || $request->ajax() || $request->header('Accept') === 'application/json') {
            return response()->json(['partners' => $partners]);
        }

        // Default to Inertia response
        return Inertia::render('Partners/List', [
            'partners' => $partners,
            'partnerType' => $partnerType,
        ]);
    }

    public function info()
    {
        // API endpoint for partner info
        return response()->json(['message' => 'Partner info endpoint']);
    }
}
