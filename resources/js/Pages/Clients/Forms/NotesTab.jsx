import { useState } from 'react';
import { router } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import NoteModal from '@/Components/NoteModal';
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';
import toast from 'react-hot-toast';

export default function NotesTab({ client, notes, users, auth }) {
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [noteToDelete, setNoteToDelete] = useState(null);

    const formatDateTime = (dateString, timeString) => {
        if (!dateString) return '';
        // Handle dd-mm-yyyy format
        let formattedDate = dateString;
        if (typeof dateString === 'string' && dateString.includes('-')) {
            const parts = dateString.split('-');
            if (parts.length === 3 && parts[0].length === 4) {
                // yyyy-mm-dd format
                formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
        } else {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            }
        }
        const formattedTime = timeString ? timeString.slice(0, 5) : '';
        return formattedDate + (formattedTime ? ' ' + formattedTime : '');
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        setShowNoteModal(true);
    };

    const handleDelete = (note) => {
        setNoteToDelete(note);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (noteToDelete) {
            router.get(`/delete_note?id=${noteToDelete.id}`, {}, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Note deleted successfully!');
                    setShowDeleteModal(false);
                    setNoteToDelete(null);
                },
                onError: () => {
                    toast.error('Failed to delete note.');
                },
            });
        }
    };

    const handleViewNote = (note) => {
        // For now, view will also open edit modal
        handleEditNote(note);
    };

    const handleCloseNoteModal = () => {
        setShowNoteModal(false);
        setSelectedNote(null);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                <button
                    onClick={() => {
                        setSelectedNote(null);
                        setShowNoteModal(true);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    <PlusIcon className="mr-2 h-5 w-5" />
                    Add
                </button>
            </div>

            <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Date/Time
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Dealt By
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Importance
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Method
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    With
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Details
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {notes && notes.length > 0 ? (
                                notes.map((note) => (
                                    <tr key={note.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {formatDateTime(note.note_date, note.note_time)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {note.dealt_by || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                note.importance === 'urgent' ? 'bg-red-100 text-red-800' :
                                                note.importance === 'high' ? 'bg-orange-100 text-orange-800' :
                                                note.importance === 'low' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {note.importance ? note.importance.charAt(0).toUpperCase() + note.importance.slice(1) : 'Normal'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {note.method || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {note.with || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                                            <div className="truncate" title={note.details}>
                                                {note.details || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleViewNote(note)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="View/Edit"
                                                >
                                                    <EyeIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleEditNote(note)}
                                                    className="text-orange-600 hover:text-orange-900"
                                                    title="Edit"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(note)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-500">
                                        No notes found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <NoteModal
                show={showNoteModal}
                onClose={handleCloseNoteModal}
                client={client}
                note={selectedNote}
                users={users || []}
            />

            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setNoteToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="Delete Note"
                message="Are you sure you want to delete this note? This action cannot be undone."
            />
        </div>
    );
}
