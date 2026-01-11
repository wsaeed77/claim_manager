import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import Pagination from '../../Components/Pagination';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function WitnessesIndex({ witnesses, auth }) {
    return (
        <AppLayout title="Witnesses" auth={auth}>
            <Head title="Witnesses" />
            <div>
                <div className="sm:flex sm:items-center sm:justify-between mb-4">
                    <div>
                        <p className="text-sm text-gray-600">
                            A list of all witnesses in the system.
                        </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <Link
                            href="/add_witness"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            <PlusIcon className="mr-2 h-5 w-5" />
                            Add Witness
                        </Link>
                    </div>
                </div>

                <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Client
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {witnesses && witnesses.data && witnesses.data.length > 0 ? (
                                    witnesses.data.map((witness) => (
                                        <tr key={witness.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {witness.witness_fname} {witness.witness_lname}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {witness.client ? (
                                                    <Link
                                                        href={`/?claimid=${witness.client.id}`}
                                                        className="text-sm text-indigo-600 hover:text-indigo-900 transition-colors"
                                                    >
                                                        Case {witness.client.case_no}
                                                    </Link>
                                                ) : (
                                                    <span className="text-sm text-gray-500">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {witness.witness_type || '—'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {witness.witness_hometel || witness.witness_officetel || '—'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={`/edit_witness/${witness.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500">
                                            No witnesses found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {witnesses && witnesses.links && <Pagination links={witnesses.links} meta={witnesses} />}
                </div>
            </div>
        </AppLayout>
    );
}
