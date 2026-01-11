import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { useState } from 'react';

export default function SearchIndex({ auth, results, searchParams }) {
    const { data, setData, get, processing } = useForm({
        query: searchParams?.query || '',
        type: searchParams?.type || 'all',
    });

    const submit = (e) => {
        e.preventDefault();
        get('/search', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Search" auth={auth}>
            <Head title="Search" />
            <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Search</h1>

                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="sm:col-span-2">
                                <label htmlFor="query" className="block text-sm font-medium text-gray-700">
                                    Search Query
                                </label>
                                <input
                                    type="text"
                                    id="query"
                                    value={data.query}
                                    onChange={(e) => setData('query', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Search by name, case number, reference..."
                                />
                            </div>
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                    Search Type
                                </label>
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="all">All</option>
                                    <option value="clients">Clients</option>
                                    <option value="claims">Claims</option>
                                    <option value="partners">Partners</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {processing ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </form>
                </div>

                {results && results.length > 0 && (
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Case No
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Name
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Reference
                                    </th>
                                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {results.map((result) => (
                                    <tr key={result.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {result.case_no}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {result.client_fname} {result.client_lname}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {result.case_ref || '-'}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <Link
                                                href={`/?claimid=${result.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {results && results.length === 0 && data.query && (
                    <div className="bg-white shadow rounded-lg p-6 text-center">
                        <p className="text-gray-500">No results found.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
