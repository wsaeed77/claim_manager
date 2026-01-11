import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function NotesView({ note, auth }) {
    return (
        <AppLayout title="View Note" auth={auth}>
            <Head title="View Note" />
            <div>
                <div className="mb-6">
                    <Link
                        href={note.client_id ? `/?claimid=${note.client_id}` : '/show_note'}
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                        ← Back
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="sm:flex sm:items-center sm:justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Note Details</h2>
                            <div className="mt-4 sm:mt-0">
                                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                                    note.importance === 'urgent' 
                                        ? 'bg-red-100 text-red-800' 
                                        : note.importance === 'high'
                                        ? 'bg-orange-100 text-orange-800'
                                        : note.importance === 'low'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {note.importance || 'normal'}
                                </span>
                            </div>
                        </div>

                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Date</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {note.note_date ? new Date(note.note_date).toLocaleDateString() : '-'}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Time</dt>
                                <dd className="mt-1 text-sm text-gray-900">{note.note_time || '-'}</dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Client</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {note.client ? (
                                        <Link
                                            href={`/?claimid=${note.client.id}`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            {note.client.client_fname} {note.client.client_lname}
                                        </Link>
                                    ) : '-'}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Dealt By</dt>
                                <dd className="mt-1 text-sm text-gray-900">{note.dealt_by || '-'}</dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Method</dt>
                                <dd className="mt-1 text-sm text-gray-900">{note.method || '-'}</dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">With</dt>
                                <dd className="mt-1 text-sm text-gray-900">{note.with || '-'}</dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Name</dt>
                                <dd className="mt-1 text-sm text-gray-900">{note.name || '-'}</dd>
                            </div>

                            <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-500">Details</dt>
                                <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                                    {note.details || '-'}
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-6 flex items-center justify-end space-x-3">
                            <Link
                                href={`/?claimid=${note.client_id}`}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                View Client
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
