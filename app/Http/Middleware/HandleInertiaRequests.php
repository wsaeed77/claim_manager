<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $preFilledFormValues = [
            'case_no' => (\App\Models\Client::max('case_no') ?? 0) + 1,
            'case_order' => 1,
        ];

        // Get partners and users for authenticated users
        $partners = null;
        $users = null;
        $claimCounts = null;
        
        if ($request->user()) {
            $partners = [
                'hostCos' => \App\Models\Partner::where('partner_type', 'host-co')->orderBy('name')->get()->toArray(),
                'agents' => \App\Models\Partner::where('partner_type', 'agent')->orderBy('name')->get()->toArray(),
            ];
            $users = \App\Models\User::pluck('name', 'id')->map(function ($name, $id) {
                return ['id' => $id, 'name' => $name];
            })->values()->toArray();
            
            // Get claim counts for sidebar
            // Try exact match first, then fallback to case-insensitive if needed
            try {
                $totalClaims = \Illuminate\Support\Facades\DB::table('claims')->count();
                
                // Get all unique status values for debugging
                $statuses = \Illuminate\Support\Facades\DB::table('claims')
                    ->select('claim_status')
                    ->whereNotNull('claim_status')
                    ->distinct()
                    ->pluck('claim_status')
                    ->toArray();
                
                \Log::info('Total claims: ' . $totalClaims);
                \Log::info('Unique statuses found: ', $statuses);
                
                // Use case-insensitive matching with LIKE for better compatibility
                $claimCounts = [
                    'pending' => \Illuminate\Support\Facades\DB::table('claims')
                        ->whereRaw('LOWER(claim_status) LIKE ?', ['pending'])
                        ->count(),
                    'on_hold' => \Illuminate\Support\Facades\DB::table('claims')
                        ->whereRaw('LOWER(claim_status) LIKE ?', ['on hold'])
                        ->count(),
                    'declined' => \Illuminate\Support\Facades\DB::table('claims')
                        ->whereRaw('LOWER(claim_status) LIKE ?', ['declined'])
                        ->count(),
                    'referred' => \Illuminate\Support\Facades\DB::table('claims')
                        ->whereRaw('LOWER(claim_status) LIKE ?', ['referred'])
                        ->count(),
                    'fleet' => \Illuminate\Support\Facades\DB::table('claims')
                        ->whereRaw('LOWER(claim_status) LIKE ?', ['fleet'])
                        ->count(),
                    'live' => \Illuminate\Support\Facades\DB::table('claims')
                        ->whereRaw('LOWER(claim_status) LIKE ?', ['live'])
                        ->count(),
                ];
                
                \Log::info('Claim counts calculated:', $claimCounts);
            } catch (\Exception $e) {
                \Log::error('Error calculating claim counts: ' . $e->getMessage());
                $claimCounts = [
                    'pending' => 0,
                    'on_hold' => 0,
                    'declined' => 0,
                    'referred' => 0,
                    'fleet' => 0,
                    'live' => 0,
                ];
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                ] : null,
            ],
            'ziggy' => fn () => [
                ...(new \Tighten\Ziggy\Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'preFilledFormValues' => $preFilledFormValues,
            'partners' => $partners,
            'users' => $users,
            'claimCounts' => $claimCounts,
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ];
    }
}
