import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { PencilIcon } from '@heroicons/react/24/outline';
import PartnerModal from '@/Components/PartnerModal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PartnersList({ partners, partnerType, auth }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingPartner, setEditingPartner] = useState(null);

    const partnerTypeNames = {
        'host-co': 'Host CO.',
        'medical-appointment': 'Appoint',
        'insurer': 'Insurer',
        'agent': 'Agent',
        'hire-company': 'Hire',
        'ate': 'ATE',
        'engineer': 'Engineer',
        'medical': 'Medical',
        'recovery': 'Recovery',
        'repairer': 'Repairer',
        'solicitor': 'Solicitor',
        'storage': 'Storage',
    };

    const typeName = partnerTypeNames[partnerType] || partnerType;

    const handleEdit = async (partnerId) => {
        try {
            const response = await axios.get(`/partner/${partnerId}/edit`, {
                headers: {
                    'Accept': 'application/json',
                },
            });
            setEditingPartner(response.data.partner);
            setShowEditModal(true);
        } catch (error) {
            toast.error('Failed to load partner details.');
            console.error(error);
        }
    };

    const handleModalSuccess = () => {
        router.reload({ only: ['partners'] });
    };

    return (
        <AppLayout title={`${typeName} Partners`} auth={auth}>
            <Head title={`${typeName} Partners`} />
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">{typeName} Partners</h2>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Add Partner
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Reference
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {partners && partners.length > 0 ? (
                                partners.map((partner, index) => (
                                    <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {partner.name || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {partner.email || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {partner.reference || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {partner.address || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-4">
                                                {partnerType === 'solicitor' && (
                                                    <Link
                                                        href={`/filehandlers/${partner.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900 transition-colors text-sm"
                                                    >
                                                        View Handlers
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={() => handleEdit(partner.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                    title="Edit"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <p className="text-sm text-gray-500">No partners found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Partner Modals */}
            <PartnerModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                partnerType={partnerType}
                onSuccess={handleModalSuccess}
            />
            <PartnerModal
                show={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setEditingPartner(null);
                }}
                partner={editingPartner}
                partnerType={partnerType}
                onSuccess={handleModalSuccess}
            />
        </AppLayout>
    );
}
