<?php

namespace App\Http\Controllers;

use App\Models\Witness;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WitnessController extends Controller
{
    public function add(Request $request): Response
    {
        $clientId = $request->get('client_id');
        
        return Inertia::render('Witnesses/Create', [
            'clientId' => $clientId,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'witness_title' => 'nullable|string|max:255',
            'witness_fname' => 'required|string|max:255',
            'witness_lname' => 'required|string|max:255',
            'witness_add' => 'nullable|string',
            'witness_city' => 'nullable|string|max:255',
            'witness_postcode' => 'nullable|string|max:255',
            'witness_hometel' => 'nullable|string|max:255',
            'witness_officetel' => 'nullable|string|max:255',
            'witness_type' => 'nullable|string|max:255',
            'witness_vehreg' => 'nullable|string|max:255',
            'witness_make' => 'nullable|string|max:255',
            'witness_model' => 'nullable|string|max:255',
            'witness_insco' => 'nullable|string|max:255',
            'witness_policno' => 'nullable|string|max:255',
        ]);

        Witness::create($validated);

        return redirect()->route('home.index', ['claimid' => $validated['client_id']])
            ->with('success', 'Witness added successfully.');
    }

    public function show(Request $request): Response
    {
        $witnesses = Witness::with('client')
            ->orderBy('id', 'DESC')
            ->paginate(15);

        return Inertia::render('Witnesses/Index', [
            'witnesses' => $witnesses,
        ]);
    }

    public function edit($id): Response
    {
        $witness = Witness::findOrFail($id);

        return Inertia::render('Witnesses/Edit', [
            'witness' => $witness,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'wid' => 'required|exists:witness,id',
            'witness_title' => 'nullable|string|max:255',
            'witness_fname' => 'required|string|max:255',
            'witness_lname' => 'required|string|max:255',
            'witness_add' => 'nullable|string',
            'witness_city' => 'nullable|string|max:255',
            'witness_postcode' => 'nullable|string|max:255',
            'witness_hometel' => 'nullable|string|max:255',
            'witness_officetel' => 'nullable|string|max:255',
            'witness_type' => 'nullable|string|max:255',
            'witness_vehreg' => 'nullable|string|max:255',
            'witness_make' => 'nullable|string|max:255',
            'witness_model' => 'nullable|string|max:255',
            'witness_insco' => 'nullable|string|max:255',
            'witness_policno' => 'nullable|string|max:255',
        ]);

        $witness = Witness::findOrFail($validated['wid']);
        unset($validated['wid']);
        $witness->update($validated);

        return redirect()->route('home.index', ['claimid' => $witness->client_id])
            ->with('success', 'Witness updated successfully.');
    }

    public function destroy(Request $request)
    {
        $witness = Witness::findOrFail($request->id);
        $witness->delete();

        return redirect()->back()->with('success', 'Witness deleted successfully.');
    }
}
