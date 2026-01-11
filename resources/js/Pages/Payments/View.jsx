import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function PaymentsView({ invoice, auth }) {
    return (
        <AppLayout title={`Invoice ${invoice.inv_no || invoice.id}`} auth={auth}>
            <Head title={`Invoice ${invoice.inv_no || invoice.id}`} />
            <div>
                <div className="mb-6">
                    <Link
                        href="/invoice_list"
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                        ← Back to Invoices
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="sm:flex sm:items-center sm:justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Invoice {invoice.inv_no || `#${invoice.id}`}
                            </h2>
                            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                                invoice.status === 'paid' 
                                    ? 'bg-green-100 text-green-800' 
                                    : invoice.status === 'overdue'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {invoice.status || 'pending'}
                            </span>
                        </div>

                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Client</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {invoice.client ? (
                                        <Link
                                            href={`/?claimid=${invoice.client.id}`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            {invoice.client.client_fname} {invoice.client.client_lname}
                                        </Link>
                                    ) : '-'}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Date</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {invoice.indate ? new Date(invoice.indate).toLocaleDateString() : '-'}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : '-'}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Description</dt>
                                <dd className="mt-1 text-sm text-gray-900">{invoice.desc_de || '-'}</dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Amount</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    £{parseFloat(invoice.amount || 0).toFixed(2)}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">VAT</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    £{parseFloat(invoice.vat || 0).toFixed(2)}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Total</dt>
                                <dd className="mt-1 text-lg font-semibold text-gray-900">
                                    £{parseFloat(invoice.total || 0).toFixed(2)}
                                </dd>
                            </div>

                            {invoice.partner && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Partner</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{invoice.partner.name}</dd>
                                </div>
                            )}
                        </dl>

                        <div className="mt-6 flex items-center justify-end space-x-3">
                            <Link
                                href={`/update_payment/${invoice.id}`}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Edit Invoice
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
