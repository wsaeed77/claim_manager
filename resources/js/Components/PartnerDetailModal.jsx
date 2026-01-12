import { useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import InputError from './InputError';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PartnerDetailModal({ show, onClose, partnerId, partnerName, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        partner_type: '',
        address: '',
        phone_number: '',
        email: '',
        reference: '',
    });

    useEffect(() => {
        if (show && partnerId) {
            setLoading(true);
            // Fetch partner details using axios
            axios.get(`/partner/${partnerId}/edit`, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
                .then(res => {
                    if (res.data && res.data.partner) {
                        const partner = res.data.partner;
                        setData({
                            name: partner.name || '',
                            partner_type: partner.partner_type || '',
                            address: partner.address || '',
                            phone_number: partner.phone_number || '',
                            email: partner.email || '',
                            reference: partner.reference || '',
                        });
                    }
                })
                .catch(err => {
                    console.error('Error fetching partner:', err);
                    // If partnerId is actually a name, try to find by name
                    if (partnerName) {
                        axios.get(`/partners/all`, {
                            headers: {
                                'Accept': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest',
                            }
                        })
                            .then(res => {
                                const partners = res.data?.partners || res.data || [];
                                const partner = Array.isArray(partners) 
                                    ? partners.find(p => p.name === partnerName || p.id == partnerId)
                                    : null;
                                if (partner) {
                                    setData({
                                        name: partner.name || '',
                                        partner_type: partner.partner_type || '',
                                        address: partner.address || '',
                                        phone_number: partner.phone_number || '',
                                        email: partner.email || '',
                                        reference: partner.reference || '',
                                    });
                                }
                            })
                            .catch(err => console.error('Error fetching partners list:', err));
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [show, partnerId, partnerName, setData]);

    const submit = (e) => {
        e.preventDefault();
        if (!partnerId) return;
        
        post(`/partner/${partnerId}/edit`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Partner updated successfully!');
                reset();
                onClose();
                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: () => {
                toast.error('Failed to update partner. Please check the form for errors.');
            },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose} title="Partner Details" maxWidth="max-w-2xl">
            {loading ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">Loading partner details...</p>
                </div>
            ) : (
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Partner Type
                    </label>
                    <input
                        type="text"
                        value={data.partner_type}
                        disabled
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                    </label>
                    <textarea
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        rows={3}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <InputError message={errors.address} className="mt-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <InputError message={errors.phone_number} className="mt-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reference
                    </label>
                    <input
                        type="text"
                        value={data.reference}
                        onChange={(e) => setData('reference', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <InputError message={errors.reference} className="mt-2" />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Close
                    </button>
                    <PrimaryButton disabled={processing || !partnerId}>
                        {processing ? 'Saving...' : 'Save'}
                    </PrimaryButton>
                </div>
            </form>
            )}
        </Modal>
    );
}
