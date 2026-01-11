<?php

namespace App\Http\Controllers;

use App\Models\FileHandler;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FilehandlerController extends Controller
{
    public function index($solicitorId): Response
    {
        $fileHandlers = FileHandler::where('solicitor_id', $solicitorId)->get();

        return Inertia::render('FileHandlers/Index', [
            'fileHandlers' => $fileHandlers,
            'solicitorId' => $solicitorId,
        ]);
    }

    public function add($solicitorId): Response
    {
        return Inertia::render('FileHandlers/Create', [
            'solicitorId' => $solicitorId,
        ]);
    }

    public function save(Request $request)
    {
        $validated = $request->validate([
            'solicitor_id' => 'required|integer',
            'name' => 'required|string|max:255',
        ]);

        FileHandler::create($validated);

        return redirect()->back()->with('success', 'File handler created successfully.');
    }

    public function edit($id): Response
    {
        $fileHandler = FileHandler::findOrFail($id);

        return Inertia::render('FileHandlers/Edit', [
            'fileHandler' => $fileHandler,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:file_handlers,filehandler_id',
            'name' => 'required|string|max:255',
        ]);

        $fileHandler = FileHandler::findOrFail($validated['id']);
        unset($validated['id']);
        $fileHandler->update($validated);

        return redirect()->back()->with('success', 'File handler updated successfully.');
    }

    public function list($solicitorId)
    {
        $fileHandlers = FileHandler::where('solicitor_id', $solicitorId)->get();

        return response()->json($fileHandlers);
    }

    public function detail($id): Response
    {
        $fileHandler = FileHandler::findOrFail($id);

        return Inertia::render('FileHandlers/Show', [
            'fileHandler' => $fileHandler,
        ]);
    }
}
