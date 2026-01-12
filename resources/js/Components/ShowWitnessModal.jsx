import Modal from './Modal';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';

export default function ShowWitnessModal({ show, onClose, witnesses = [], onEdit, onDelete }) {
    const handleEdit = (witness) => {
        onEdit(witness);
    };

    const handleDelete = (witness) => {
        if (confirm('Are you sure you want to delete this witness?')) {
            router.get(`/delete_witness?id=${witness.id}`, {}, {
                preserveScroll: true,
                onSuccess: () => {
                    // Modal will be refreshed by parent component
                },
            });
        }
    };

    return (
        <Modal show={show} onClose={onClose} title="Witnesses" maxWidth="max-w-4xl">
            <div>
                {witnesses.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {witnesses.map((witness) => (
                                    <tr key={witness.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {witness.witness_type || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {witness.witness_title ? `${witness.witness_title} ` : ''}
                                            {witness.witness_fname} {witness.witness_lname}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {witness.witness_hometel || witness.witness_officetel || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEdit(witness)}
                                                    className="text-orange-600 hover:text-orange-900"
                                                    title="Edit"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(witness)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 text-center py-8">No witnesses found.</p>
                )}
            </div>
        </Modal>
    );
}
