import { useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from './Modal';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import PrimaryButton from './PrimaryButton';
import InputError from './InputError';

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
                    onClose();
                    reset();
                },
            });
        } else {
            // Create new note
            post('/add_note', {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                    reset();
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
                        <InputLabel htmlFor="note_date" value="Date" />
                        <TextInput
                            id="note_date"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.note_date}
                            onChange={(e) => setData('note_date', e.target.value)}
                        />
                        <InputError message={errors.note_date} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="note_time" value="Time" />
                        <TextInput
                            id="note_time"
                            type="time"
                            className="mt-1 block w-full"
                            value={data.note_time}
                            onChange={(e) => setData('note_time', e.target.value)}
                        />
                        <InputError message={errors.note_time} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="dealt_by" value="Dealt By" />
                        <select
                            id="dealt_by"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                        <InputError message={errors.dealt_by} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="importance" value="Importance" />
                        <select
                            id="importance"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.importance}
                            onChange={(e) => setData('importance', e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                        <InputError message={errors.importance} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="method" value="Method" />
                        <select
                            id="method"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                        <InputError message={errors.method} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="with" value="With" />
                        <TextInput
                            id="with"
                            className="mt-1 block w-full"
                            value={data.with}
                            onChange={(e) => setData('with', e.target.value)}
                            placeholder="e.g., Solicitors - KQ"
                        />
                        <InputError message={errors.with} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="details" value="Details" />
                    <textarea
                        id="details"
                        rows={4}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.details}
                        onChange={(e) => setData('details', e.target.value)}
                    ></textarea>
                    <InputError message={errors.details} className="mt-2" />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Saving...' : note ? 'Update Note' : 'Create Note'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
