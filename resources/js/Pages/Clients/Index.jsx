import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { PlusIcon, EyeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';
import CreateClientModal from '@/Components/CreateClientModal';
import { useState } from 'react';

export default function ClientsIndex({ clients, auth, filters, preFilledFormValues, partners, users }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/', { search }, {
            preserveState: true,
            preserveScroll: true,
            only: ['clients'],
        });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get('/', {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['clients'],
        });
    };

    return (
        <AppLayout title="Clients" auth={auth}>
            <Head title="Clients" />
            <div>
                {/* Header */}
                <div className="sm:flex sm:items-center sm:justify-between mb-4">
                    <div>
                        <p className="text-sm text-gray-600">
                            Manage all your clients and claims in one place
                        </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            <PlusIcon className="mr-2 h-5 w-5" />
                            Add Client
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 mb-4">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by case number, name, reference, or mobile..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Search
                        </button>
                        {search && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Clear
                            </button>
                        )}
                    </form>
                </div>

                {/* Table */}
                <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Case No
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Reference
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Mobile
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {clients.data && clients.data.length > 0 ? (
                                    clients.data.map((client) => (
                                        <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {client.case_no}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {client.client_fname} {client.client_lname}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {client.case_ref || <span className="text-gray-400">—</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {client.client_mobile || <span className="text-gray-400">—</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={`/?claimid=${client.id}`}
                                                    className="inline-flex items-center text-indigo-600 hover:text-indigo-900 transition-colors"
                                                >
                                                    <EyeIcon className="mr-1 h-4 w-4" />
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="text-gray-500">
                                                <p className="text-sm">No clients found.</p>
                                                {search && (
                                                    <button
                                                        onClick={handleClearSearch}
                                                        className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Clear search to see all clients
                                                    </button>
                                                )}
                                                {!search && (
                                                    <button
                                                        onClick={() => setShowCreateModal(true)}
                                                        className="mt-2 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Create your first client
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Pagination links={clients.links} meta={clients.meta} />
                </div>

                {/* Create Client Modal */}
                <CreateClientModal
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    preFilledFormValues={preFilledFormValues}
                    partners={partners}
                    users={users}
                    auth={auth}
                    onSuccess={() => {
                        router.reload({ only: ['clients', 'preFilledFormValues', 'partners', 'users'] });
                    }}
                    onOpen={() => {
                        router.reload({ only: ['preFilledFormValues'] });
                    }}
                />
            </div>
        </AppLayout>
    );
}
