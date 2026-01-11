import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function PaymentsCreatePayout({ clients, partners, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        client_id: '',
        type: 'payout',
        inv_no: '',
        status: 'pending',
        indate: new Date().toISOString().split('T')[0],
        desc_de: '',
        uto: '',
        amount: '',
        vat: '',
        total: '',
        due_date: '',
    });

    const calculateTotal = () => {
        const amount = parseFloat(data.amount) || 0;
        const vat = parseFloat(data.vat) || 0;
        setData('total', (amount + vat).toFixed(2));
    };

    const submit = (e) => {
        e.preventDefault();
        post('/insert_payout');
    };

    return (
        <AppLayout title="Create Payout" auth={auth}>
            <Head title="Create Payout" />
            <div>
                <div className="mb-6">
                    <Link
                        href="/payout_list"
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                        ← Back to Payouts
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Payout</h2>

                        <form onSubmit={submit}>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Client *
                                    </label>
                                    <select
                                        value={data.client_id}
                                        onChange={(e) => setData('client_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select Client</option>
                                        {clients.map((client) => (
                                            <option key={client.id} value={client.id}>
                                                Case {client.case_no} - {client.client_fname} {client.client_lname}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.client_id && (
                                        <p className="mt-1 text-sm text-red-600">{errors.client_id}</p>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Partner *
                                    </label>
                                    <select
                                        value={data.uto}
                                        onChange={(e) => setData('uto', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select Partner</option>
                                        {partners.map((partner) => (
                                            <option key={partner.id} value={partner.id}>
                                                {partner.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.uto && (
                                        <p className="mt-1 text-sm text-red-600">{errors.uto}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Invoice/Reference Number
                                    </label>
                                    <input
                                        type="text"
                                        value={data.inv_no}
                                        onChange={(e) => setData('inv_no', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={data.indate}
                                        onChange={(e) => setData('indate', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        value={data.desc_de}
                                        onChange={(e) => setData('desc_de', e.target.value)}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Amount (£)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={(e) => {
                                            setData('amount', e.target.value);
                                            calculateTotal();
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        VAT (£)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.vat}
                                        onChange={(e) => {
                                            setData('vat', e.target.value);
                                            calculateTotal();
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Total (£)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.total}
                                        readOnly
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 sm:text-sm"
                                    />
                                </div>

                                <input type="hidden" name="type" value="payout" />
                            </div>

                            <div className="mt-6 flex items-center justify-end space-x-3">
                                <Link
                                    href="/payout_list"
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Create Payout'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
