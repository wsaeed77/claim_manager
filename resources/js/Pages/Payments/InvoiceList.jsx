import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import Pagination from '../../Components/Pagination';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function InvoiceList({ invoices, auth }) {
    return (
        <AppLayout title="Invoices" auth={auth}>
            <Head title="Invoices" />
            <div>
                <div className="sm:flex sm:items-center sm:justify-between mb-4">
                    <div>
                        <p className="text-sm text-gray-600">
                            A list of all invoices in the system.
                        </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <Link
                            href="/add_payment"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            <PlusIcon className="mr-2 h-5 w-5" />
                            Add Invoice
                        </Link>
                    </div>
                </div>

                <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Invoice No
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Client
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {invoices && invoices.data && invoices.data.length > 0 ? (
                                    invoices.data.map((invoice) => (
                                        <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {invoice.inv_no || `#${invoice.id}`}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {invoice.client?.client_fname} {invoice.client?.client_lname}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {invoice.indate ? new Date(invoice.indate).toLocaleDateString() : '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    £{parseFloat(invoice.total || 0).toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                    invoice.status === 'paid' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : invoice.status === 'overdue'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {invoice.status || 'pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={`/invoice_view/${invoice.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="text-gray-500">
                                                <p className="text-sm">No invoices found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {invoices && invoices.links && <Pagination links={invoices.links} meta={invoices} />}
                </div>
            </div>
        </AppLayout>
    );
}
