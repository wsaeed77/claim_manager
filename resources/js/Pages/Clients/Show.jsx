import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { useState } from 'react';

export default function ClientsShow({ client, caseOrders, partners, handlers, users, auth }) {
    const [activeTab, setActiveTab] = useState('details');

    const tabs = [
        { name: 'Details', id: 'details' },
        { name: 'Claim', id: 'claim' },
        { name: 'Accident', id: 'accident' },
        { name: 'Vehicle', id: 'vehicle' },
        { name: 'Hire', id: 'hire' },
        { name: 'Repair', id: 'repair' },
        { name: 'Solicitor', id: 'solicitor' },
        { name: 'Notes', id: 'notes' },
        { name: 'Payments', id: 'payments' },
    ];

    return (
        <AppLayout title={`Client - ${client.case_no}`} auth={auth}>
            <Head title={`Client ${client.case_no}`} />
            <div>
                <div className="mb-6">
                    <Link
                        href="/"
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                        ← Back to Clients
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Case #{client.case_no} - {client.client_fname} {client.client_lname}
                        </h2>

                        {/* Tabs */}
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            ${activeTab === tab.id
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }
                                            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                                        `}
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-6">
                            {activeTab === 'details' && (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                                        <p className="mt-1 text-sm text-gray-900">{client.client_fname || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <p className="mt-1 text-sm text-gray-900">{client.client_lname || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Mobile</label>
                                        <p className="mt-1 text-sm text-gray-900">{client.client_mobile || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <p className="mt-1 text-sm text-gray-900">{client.client_email || '-'}</p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Address</label>
                                        <p className="mt-1 text-sm text-gray-900">{client.client_address || '-'}</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'claim' && client.claim && (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Claim Type</label>
                                        <p className="mt-1 text-sm text-gray-900">{client.claim.claim_type || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                        <p className="mt-1 text-sm text-gray-900">{client.claim.claim_status || '-'}</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notes' && (
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Notes</h3>
                                    {client.notes && client.notes.length > 0 ? (
                                        <div className="space-y-4">
                                            {client.notes.map((note) => (
                                                <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-900">{note.note}</p>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        {new Date(note.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">No notes yet.</p>
                                    )}
                                    <Link
                                        href="/add_note"
                                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Add Note
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
