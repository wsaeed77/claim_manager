import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import Pagination from '../../Components/Pagination';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function NotesIndex({ notes, auth }) {
    return (
        <AppLayout title="Notes" auth={auth}>
            <Head title="Notes" />
            <div>
                <div className="sm:flex sm:items-center sm:justify-between mb-4">
                    <div>
                        <p className="text-sm text-gray-600">
                            A list of all notes in the system.
                        </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <Link
                            href="/add_note"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            <PlusIcon className="mr-2 h-5 w-5" />
                            Add Note
                        </Link>
                    </div>
                </div>

                <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Client
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Dealt By
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Details
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Importance
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {notes && notes.data && notes.data.length > 0 ? (
                                    notes.data.map((note) => (
                                        <tr key={note.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {note.note_date ? new Date(note.note_date).toLocaleDateString() : '-'}
                                                </div>
                                                <div className="text-xs text-gray-500">{note.note_time || ''}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {note.client ? (
                                                    <Link
                                                        href={`/?claimid=${note.client.id}`}
                                                        className="text-sm text-indigo-600 hover:text-indigo-900 transition-colors"
                                                    >
                                                        {note.client.client_fname} {note.client.client_lname}
                                                    </Link>
                                                ) : (
                                                    <span className="text-sm text-gray-500">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {note.dealt_by || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-500 max-w-xs truncate">
                                                    {note.details || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
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
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={`/view_note/${note.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-500">
                                            No notes found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {notes && notes.links && <Pagination links={notes.links} meta={notes} />}
                </div>
            </div>
        </AppLayout>
    );
}
