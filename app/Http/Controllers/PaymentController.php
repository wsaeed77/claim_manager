<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Client;
use App\Models\Partner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function add(): Response
    {
        $clients = Client::select('id', 'case_no', 'client_fname', 'client_lname')
            ->get();
        $partners = Partner::all();

        return Inertia::render('Payments/Create', [
            'clients' => $clients,
            'partners' => $partners,
        ]);
    }

    public function addPayout(): Response
    {
        $clients = Client::select('id', 'case_no', 'client_fname', 'client_lname')
            ->get();
        $partners = Partner::all();

        return Inertia::render('Payments/CreatePayout', [
            'clients' => $clients,
            'partners' => $partners,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'inv_no' => 'nullable|integer',
            'status' => 'nullable|string|max:255',
            'indate' => 'nullable|date',
            'desc_de' => 'nullable|string|max:255',
            'uto' => 'nullable|integer',
            'due_date' => 'nullable|date',
            'amount' => 'nullable|numeric',
            'vat' => 'nullable|numeric',
            'total' => 'nullable|numeric',
            'type' => 'required|in:invoice,payout',
        ]);

        Payment::create($validated);

        return redirect()->route('payments.invoice_list')
            ->with('success', 'Payment created successfully.');
    }

    public function invoiceList(Request $request): Response
    {
        $invoices = Payment::with(['client', 'partner'])
            ->where('type', 'invoice')
            ->orderBy('indate', 'DESC')
            ->paginate(15);

        return Inertia::render('Payments/InvoiceList', [
            'invoices' => $invoices,
        ]);
    }

    public function payoutList(Request $request): Response
    {
        $payouts = Payment::with(['client', 'partner'])
            ->where('type', 'payout')
            ->orderBy('indate', 'DESC')
            ->paginate(15);

        return Inertia::render('Payments/PayoutList', [
            'payouts' => $payouts,
        ]);
    }

    public function view($invoiceId): Response
    {
        $invoice = Payment::with(['client', 'partner'])->findOrFail($invoiceId);

        return Inertia::render('Payments/View', [
            'invoice' => $invoice,
        ]);
    }

    public function update($id): Response
    {
        $payment = Payment::with(['client', 'partner'])->findOrFail($id);
        $clients = Client::select('id', 'case_no', 'client_fname', 'client_lname')->get();
        $partners = Partner::all();

        return Inertia::render('Payments/Edit', [
            'payment' => $payment,
            'clients' => $clients,
            'partners' => $partners,
        ]);
    }

    public function updateStore(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:payments,id',
            'client_id' => 'required|exists:clients,id',
            'inv_no' => 'nullable|integer',
            'status' => 'nullable|string|max:255',
            'indate' => 'nullable|date',
            'desc_de' => 'nullable|string|max:255',
            'uto' => 'nullable|integer',
            'due_date' => 'nullable|date',
            'amount' => 'nullable|numeric',
            'vat' => 'nullable|numeric',
            'total' => 'nullable|numeric',
        ]);

        $payment = Payment::findOrFail($validated['id']);
        $payment->update($validated);

        return redirect()->route('payments.invoice_list')
            ->with('success', 'Payment updated successfully.');
    }

    public function destroy(Request $request)
    {
        $payment = Payment::findOrFail($request->id);
        $payment->delete();

        return redirect()->back()->with('success', 'Payment deleted successfully.');
    }
}
