<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    public function index(Request $request): Response
    {
        $clientId = $request->get('client_id');
        $users = \App\Models\User::all();
        
        return Inertia::render('Notes/Create', [
            'clientId' => $clientId,
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'note_date' => 'required|date',
            'note_time' => 'required|string',
            'dealt_by' => 'required|string',
            'importance' => 'nullable|string',
            'method' => 'nullable|string',
            'with' => 'nullable|string',
            'name' => 'nullable|string',
            'details' => 'required|string',
        ]);

        Note::create([
            ...$validated,
        ]);

        return redirect()->route('home.index', ['claimid' => $validated['client_id']])
            ->with('success', 'Note added successfully.');
    }

    public function show(Request $request): Response
    {
        $notes = Note::with('client')
            ->orderBy('created_at', 'DESC')
            ->paginate(15);

        return Inertia::render('Notes/Index', [
            'notes' => $notes,
        ]);
    }

    public function view($noteId): Response
    {
        $note = Note::with('client')->findOrFail($noteId);

        return Inertia::render('Notes/View', [
            'note' => $note,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:notes,id',
            'note' => 'required|string',
        ]);

        $note = Note::findOrFail($validated['id']);
        $note->update(['note' => $validated['note']]);

        return redirect()->back()->with('success', 'Note updated successfully.');
    }

    public function destroy(Request $request)
    {
        $note = Note::findOrFail($request->id);
        $note->delete();

        return redirect()->back()->with('success', 'Note deleted successfully.');
    }
}
