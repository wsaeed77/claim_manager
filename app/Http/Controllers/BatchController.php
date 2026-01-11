<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BatchController extends Controller
{
    public function index(): Response
    {
        $batches = Batch::with('partner')->get();

        return Inertia::render('Batches/Index', [
            'batches' => $batches,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Batches/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'partner_id' => 'required|exists:partners,id',
            'due_date' => 'required|date',
            'amount' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        Batch::create([
            ...$validated,
            'created_by' => auth()->id(),
            'status' => 0,
        ]);

        return redirect()->route('batches.index')
            ->with('success', 'Batch created successfully.');
    }

    public function show($id): Response
    {
        $batch = Batch::with(['partner', 'invoices'])->findOrFail($id);

        return Inertia::render('Batches/Show', [
            'batch' => $batch,
        ]);
    }

    public function edit($id): Response
    {
        $batch = Batch::findOrFail($id);

        return Inertia::render('Batches/Edit', [
            'batch' => $batch,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'partner_id' => 'required|exists:partners,id',
            'due_date' => 'required|date',
            'amount' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $batch = Batch::findOrFail($id);
        $batch->update($validated);

        return redirect()->route('batches.index')
            ->with('success', 'Batch updated successfully.');
    }

    public function destroy($id)
    {
        $batch = Batch::findOrFail($id);
        $batch->delete();

        return redirect()->route('batches.index')
            ->with('success', 'Batch deleted successfully.');
    }

    public function delrow($id)
    {
        // Delete batch invoice row
        return redirect()->back()->with('success', 'Row deleted successfully.');
    }

    public function markpaid($id)
    {
        $batch = Batch::findOrFail($id);
        $batch->update(['status' => 1]);

        return redirect()->back()->with('success', 'Batch marked as paid.');
    }

    public function askdate($id): Response
    {
        $batch = Batch::findOrFail($id);

        return Inertia::render('Batches/AskDate', [
            'batch' => $batch,
        ]);
    }
}
