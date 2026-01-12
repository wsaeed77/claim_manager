import { useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import InputError from './InputError';
import toast from 'react-hot-toast';

export default function NoteModal({ show, onClose, client, note = null, users = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        client_id: client?.id || '',
        note_date: '',
        note_time: '',
        dealt_by: '',
        importance: 'normal',
        method: '',
        with: '',
        name: '',
        details: '',
    });

    useEffect(() => {
        if (note) {
            // Editing existing note
            setData({
                client_id: note.client_id || client?.id || '',
                note_date: note.note_date ? (typeof note.note_date === 'string' && note.note_date.includes('-') ? note.note_date.split('-').reverse().join('-') : new Date(note.note_date).toISOString().split('T')[0]) : '',
                note_time: note.note_time || '',
                dealt_by: note.dealt_by || '',
                importance: note.importance || 'normal',
                method: note.method || '',
                with: note.with || '',
                name: note.name || '',
                details: note.details || '',
            });
        } else {
            // Creating new note
            const now = new Date();
            reset();
            setData('client_id', client?.id || '');
            setData('note_date', now.toISOString().split('T')[0]);
            setData('note_time', now.toTimeString().slice(0, 5));
        }
    }, [note, client]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const submitData = {
            ...data,
            client_id: client?.id || data.client_id,
        };

        if (note) {
            // Update existing note
            router.post('/update_note', { ...submitData, id: note.id }, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Note updated successfully!');
                    onClose();
                    reset();
                },
                onError: () => {
                    toast.error('Failed to update note. Please check the form for errors.');
                },
            });
        } else {
            // Create new note
            post('/add_note', {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Note added successfully!');
                    onClose();
                    reset();
                },
                onError: () => {
                    toast.error('Failed to add note. Please check the form for errors.');
                },
            });
        }
    };

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={note ? 'Edit Note' : 'Add Note'}
            maxWidth="max-w-3xl"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="note_date" className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                        </label>
                        <input
                            id="note_date"
                            type="date"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.note_date}
                            onChange={(e) => setData('note_date', e.target.value)}
                        />
                        <InputError message={errors.note_date} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="note_time" className="block text-sm font-medium text-gray-700 mb-1">
                            Time
                        </label>
                        <input
                            id="note_time"
                            type="time"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.note_time}
                            onChange={(e) => setData('note_time', e.target.value)}
                        />
                        <InputError message={errors.note_time} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="dealt_by" className="block text-sm font-medium text-gray-700 mb-1">
                            Dealt By
                        </label>
                        <select
                            id="dealt_by"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.dealt_by}
                            onChange={(e) => setData('dealt_by', e.target.value)}
                        >
                            <option value="">Select...</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.dealt_by} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="importance" className="block text-sm font-medium text-gray-700 mb-1">
                            Importance
                        </label>
                        <select
                            id="importance"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.importance}
                            onChange={(e) => setData('importance', e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                        <InputError message={errors.importance} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
                            Method
                        </label>
                        <select
                            id="method"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.method}
                            onChange={(e) => setData('method', e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="Email Received">Email Received</option>
                            <option value="Email Sent">Email Sent</option>
                            <option value="Phone Call Made">Phone Call Made</option>
                            <option value="Phone Call Received">Phone Call Received</option>
                            <option value="Letter Sent">Letter Sent</option>
                            <option value="Letter Received">Letter Received</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Other">Other</option>
                        </select>
                        <InputError message={errors.method} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="with" className="block text-sm font-medium text-gray-700 mb-1">
                            With
                        </label>
                        <input
                            id="with"
                            type="text"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.with}
                            onChange={(e) => setData('with', e.target.value)}
                            placeholder="e.g., Solicitors - KQ"
                        />
                        <InputError message={errors.with} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-1" />
                    </div>
                </div>

                <div>
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                        Details
                    </label>
                    <textarea
                        id="details"
                        rows={4}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                        value={data.details}
                        onChange={(e) => setData('details', e.target.value)}
                    ></textarea>
                    <InputError message={errors.details} className="mt-1" />
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <PrimaryButton disabled={processing} className="px-6 py-2.5">
                        {processing ? 'Saving...' : note ? 'UPDATE NOTE' : 'CREATE NOTE'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
