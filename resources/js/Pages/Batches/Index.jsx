import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { PlusIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function BatchesIndex({ batches, auth }) {
    return (
        <AppLayout title="Batches" auth={auth}>
            <Head title="Batches" />
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Batches</h2>
                    <Link
                        href="/batches/create"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Create Batch
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Batch #
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Solicitor Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Created By
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {batches && batches.length > 0 ? (
                                batches.map((batch) => (
                                    <tr key={batch.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                href={`/batches/${batch.id}`}
                                                className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                                            >
                                                {batch.id}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                href={`/batches/${batch.id}`}
                                                className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                                            >
                                                {batch.partner?.name || '-'}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {batch.created_at ? new Date(batch.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {batch.created_by || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-3">
                                                {batch.status === 1 || batch.status === true ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        Paid
                                                    </span>
                                                ) : (
                                                    <Link
                                                        href={`/batches/askdate/${batch.id}`}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                                                    >
                                                        Mark Paid
                                                    </Link>
                                                )}
                                                <Link
                                                    href={`/batches/${batch.id}/edit`}
                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                    title="Edit"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/batches/${batch.id}`}
                                                    target="_blank"
                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                    title="View"
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <p className="text-sm text-gray-500">No batches found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
