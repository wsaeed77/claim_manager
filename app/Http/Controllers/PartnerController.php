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
            'phone_number' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'reference' => 'nullable|string|max:255',
        ]);

        Partner::create($validated);

        return redirect()->route('partner.index')
            ->with('success', 'Partner created successfully.');
    }

    public function update($id): Response
    {
        $partner = Partner::findOrFail($id);

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
            'phone_number' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'reference' => 'nullable|string|max:255',
        ]);

        $partner = Partner::findOrFail($id);
        $partner->update($validated);

        return redirect()->route('partner.index')
            ->with('success', 'Partner updated successfully.');
    }

    public function getPartners($partnerType): Response
    {
        $partners = Partner::where('partner_type', $partnerType)->orderBy('name')->get();

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
