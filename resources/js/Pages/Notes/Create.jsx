import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function NotesCreate({ clientId, auth, users }) {
    const { data, setData, post, processing, errors } = useForm({
        client_id: clientId || '',
        note_date: new Date().toISOString().split('T')[0],
        note_time: new Date().toTimeString().slice(0, 5),
        dealt_by: '',
        importance: 'normal',
        method: '',
        with: '',
        name: '',
        details: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/add_note', {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Add Note" auth={auth}>
            <Head title="Add Note" />
            <div>
                <div className="mb-6">
                    <Link
                        href={clientId ? `/?claimid=${clientId}` : '/'}
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                        ← Back
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Note</h2>

                        <form onSubmit={submit}>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={data.note_date}
                                        onChange={(e) => setData('note_date', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                    {errors.note_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.note_date}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Time *
                                    </label>
                                    <input
                                        type="time"
                                        value={data.note_time}
                                        onChange={(e) => setData('note_time', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                    {errors.note_time && (
                                        <p className="mt-1 text-sm text-red-600">{errors.note_time}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Dealt By *
                                    </label>
                                    {users && users.length > 0 ? (
                                        <select
                                            value={data.dealt_by}
                                            onChange={(e) => setData('dealt_by', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">Select User</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={data.dealt_by}
                                            onChange={(e) => setData('dealt_by', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            required
                                        />
                                    )}
                                    {errors.dealt_by && (
                                        <p className="mt-1 text-sm text-red-600">{errors.dealt_by}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Importance
                                    </label>
                                    <select
                                        value={data.importance}
                                        onChange={(e) => setData('importance', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="low">Low</option>
                                        <option value="normal">Normal</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                    {errors.importance && (
                                        <p className="mt-1 text-sm text-red-600">{errors.importance}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Method
                                    </label>
                                    <input
                                        type="text"
                                        value={data.method}
                                        onChange={(e) => setData('method', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Phone, Email, etc."
                                    />
                                    {errors.method && (
                                        <p className="mt-1 text-sm text-red-600">{errors.method}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        With
                                    </label>
                                    <input
                                        type="text"
                                        value={data.with}
                                        onChange={(e) => setData('with', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Contact person"
                                    />
                                    {errors.with && (
                                        <p className="mt-1 text-sm text-red-600">{errors.with}</p>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Details *
                                    </label>
                                    <textarea
                                        value={data.details}
                                        onChange={(e) => setData('details', e.target.value)}
                                        rows={6}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                    {errors.details && (
                                        <p className="mt-1 text-sm text-red-600">{errors.details}</p>
                                    )}
                                </div>

                                {clientId && (
                                    <input type="hidden" name="client_id" value={clientId} />
                                )}
                            </div>

                            <div className="mt-6 flex items-center justify-end space-x-3">
                                <Link
                                    href={clientId ? `/?claimid=${clientId}` : '/'}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Note'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
