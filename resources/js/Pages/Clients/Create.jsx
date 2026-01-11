import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ClientsCreate({ preFilledFormValues, partners, claimId, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        case_no: preFilledFormValues?.case_no || '',
        case_order: preFilledFormValues?.case_order || 1,
        case_ref: '',
        client_title: '',
        client_type: '',
        client_fname: '',
        client_lname: '',
        client_address: '',
        client_city: '',
        client_country: '',
        client_postcode: '',
        client_hometel: '',
        client_worktel: '',
        client_mobile: '',
        client_email: '',
        claimIdcop: claimId || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/addclaim');
    };

    return (
        <AppLayout title="Create Client" auth={auth}>
            <Head title="Create Client" />
            <div>
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeftIcon className="mr-2 h-4 w-4" />
                        Back to Clients
                    </Link>
                </div>

                <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-900">Create New Client</h2>
                        <p className="mt-1 text-sm text-gray-500">Add a new client and claim to the system</p>
                    </div>

                    <form onSubmit={submit} className="p-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Case Number
                                </label>
                                <input
                                    type="number"
                                    value={data.case_no}
                                    onChange={(e) => setData('case_no', e.target.value)}
                                    className={`block w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                                        errors.case_no ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    required
                                />
                                {errors.case_no && (
                                    <p className="mt-1 text-sm text-red-600">{errors.case_no}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Case Order
                                </label>
                                <input
                                    type="number"
                                    value={data.case_order}
                                    onChange={(e) => setData('case_order', e.target.value)}
                                    className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    value={data.client_fname}
                                    onChange={(e) => setData('client_fname', e.target.value)}
                                    className={`block w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                                        errors.client_fname ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    required
                                />
                                {errors.client_fname && (
                                    <p className="mt-1 text-sm text-red-600">{errors.client_fname}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    value={data.client_lname}
                                    onChange={(e) => setData('client_lname', e.target.value)}
                                    className={`block w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                                        errors.client_lname ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    required
                                />
                                {errors.client_lname && (
                                    <p className="mt-1 text-sm text-red-600">{errors.client_lname}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.client_email}
                                    onChange={(e) => setData('client_email', e.target.value)}
                                    className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile
                                </label>
                                <input
                                    type="text"
                                    value={data.client_mobile}
                                    onChange={(e) => setData('client_mobile', e.target.value)}
                                    className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                </label>
                                <textarea
                                    value={data.client_address}
                                    onChange={(e) => setData('client_address', e.target.value)}
                                    rows={3}
                                    className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-end space-x-3 border-t border-gray-200 pt-6">
                            <Link
                                href="/"
                                className="px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {processing ? 'Creating...' : 'Create Client'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
