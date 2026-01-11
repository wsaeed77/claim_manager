<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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

    public function reportIndex(): Response
    {
        return Inertia::render('Reports/Index');
    }

    public function export(Request $request)
    {
        // Export functionality
        return response()->json(['message' => 'Export functionality']);
    }
}
