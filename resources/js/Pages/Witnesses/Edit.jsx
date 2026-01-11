import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function WitnessesEdit({ witness, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        witness_title: witness.witness_title || '',
        witness_fname: witness.witness_fname || '',
        witness_lname: witness.witness_lname || '',
        witness_add: witness.witness_add || '',
        witness_city: witness.witness_city || '',
        witness_postcode: witness.witness_postcode || '',
        witness_hometel: witness.witness_hometel || '',
        witness_officetel: witness.witness_officetel || '',
        witness_type: witness.witness_type || '',
        witness_vehreg: witness.witness_vehreg || '',
        witness_make: witness.witness_make || '',
        witness_model: witness.witness_model || '',
        witness_insco: witness.witness_insco || '',
        witness_policno: witness.witness_policno || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/update_witness', {
            data: { ...data, wid: witness.id },
        });
    };

    return (
        <AppLayout title="Edit Witness" auth={auth}>
            <Head title="Edit Witness" />
            <div>
                <div className="mb-6">
                    <Link
                        href={witness.client_id ? `/?claimid=${witness.client_id}` : '/show_witness'}
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                        ← Back
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Witness</h2>

                        <form onSubmit={submit}>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_title}
                                        onChange={(e) => setData('witness_title', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_fname}
                                        onChange={(e) => setData('witness_fname', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                    {errors.witness_fname && (
                                        <p className="mt-1 text-sm text-red-600">{errors.witness_fname}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_lname}
                                        onChange={(e) => setData('witness_lname', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                    {errors.witness_lname && (
                                        <p className="mt-1 text-sm text-red-600">{errors.witness_lname}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Type
                                    </label>
                                    <select
                                        value={data.witness_type}
                                        onChange={(e) => setData('witness_type', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="witness">Witness</option>
                                        <option value="third-party">Third Party</option>
                                        <option value="driver">Driver</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_add}
                                        onChange={(e) => setData('witness_add', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_city}
                                        onChange={(e) => setData('witness_city', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Postcode
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_postcode}
                                        onChange={(e) => setData('witness_postcode', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Home Tel
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_hometel}
                                        onChange={(e) => setData('witness_hometel', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Office Tel
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_officetel}
                                        onChange={(e) => setData('witness_officetel', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Vehicle Registration
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_vehreg}
                                        onChange={(e) => setData('witness_vehreg', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Vehicle Make
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_make}
                                        onChange={(e) => setData('witness_make', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Vehicle Model
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_model}
                                        onChange={(e) => setData('witness_model', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Insurance Company
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_insco}
                                        onChange={(e) => setData('witness_insco', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Policy Number
                                    </label>
                                    <input
                                        type="text"
                                        value={data.witness_policno}
                                        onChange={(e) => setData('witness_policno', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end space-x-3">
                                <Link
                                    href={witness.client_id ? `/?claimid=${witness.client_id}` : '/show_witness'}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update Witness'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
