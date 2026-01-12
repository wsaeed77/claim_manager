import { useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import InputError from './InputError';
import toast from 'react-hot-toast';

export default function InvoiceModal({ show, onClose, client, invoice = null, partners = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        client_id: client?.id || '',
        inv_no: '',
        status: '',
        indate: '',
        desc_de: '',
        uto: '',
        uto_type: '',
        ufor: '',
        amount: '',
        vat: '',
        total: '',
        date_paid: '',
        clawed_date: '',
        chq_no: '',
        due_date: '',
        type: 'invoice',
    });

    useEffect(() => {
        if (invoice) {
            // Editing existing invoice
            setData({
                client_id: invoice.client_id || client?.id || '',
                inv_no: invoice.inv_no || '',
                status: invoice.status || '',
                indate: invoice.indate ? (typeof invoice.indate === 'string' && invoice.indate.includes('-') ? invoice.indate : new Date(invoice.indate).toISOString().split('T')[0]) : '',
                desc_de: invoice.desc_de || '',
                uto: invoice.uto || '',
                uto_type: invoice.uto_type || '',
                ufor: invoice.ufor || '',
                amount: invoice.amount || '',
                vat: invoice.vat || '',
                total: invoice.total || '',
                date_paid: invoice.date_paid ? (typeof invoice.date_paid === 'string' && invoice.date_paid.includes('-') ? invoice.date_paid.split('-').reverse().join('-') : new Date(invoice.date_paid).toISOString().split('T')[0]) : '',
                clawed_date: invoice.clawed_date ? (typeof invoice.clawed_date === 'string' && invoice.clawed_date.includes('-') ? invoice.clawed_date.split('-').reverse().join('-') : new Date(invoice.clawed_date).toISOString().split('T')[0]) : '',
                chq_no: invoice.chq_no || '',
                due_date: invoice.due_date ? (typeof invoice.due_date === 'string' && invoice.due_date.includes('-') ? invoice.due_date.split('-').reverse().join('-') : new Date(invoice.due_date).toISOString().split('T')[0]) : '',
                type: 'invoice',
            });
        } else {
            // Creating new invoice
            reset();
            setData('client_id', client?.id || '');
            setData('type', 'invoice');
        }
    }, [invoice, client]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convert dates from yyyy-mm-dd to yyyy-mm-dd format for backend
        const submitData = {
            ...data,
            client_id: client?.id || data.client_id,
            type: 'invoice',
        };

        if (invoice) {
            // Update existing invoice
            const updateData = { ...submitData, id: invoice.id };
            router.post('/store_update_payment', updateData, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Invoice updated successfully!');
                    onClose();
                    reset();
                },
                onError: () => {
                    toast.error('Failed to update invoice. Please check the form for errors.');
                },
            });
        } else {
            // Create new invoice
            post('/insert_payment', {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Invoice created successfully!');
                    onClose();
                    reset();
                },
                onError: () => {
                    toast.error('Failed to create invoice. Please check the form for errors.');
                },
            });
        }
    };

    const handlePartnerChange = (e) => {
        const partnerId = e.target.value;
        setData('uto', partnerId);
        
        const selectedPartner = partners.find(p => p.id == partnerId);
        if (selectedPartner) {
            // Map partner type to uto_type
            const typeMap = {
                'solicitor': 'Solicitor',
                'agent': 'Agent',
                'engineer': 'Engineer',
                'repairer': 'Repairer',
                'medical': 'Medical',
                'host-co': 'Host CO',
                'recovery': 'Recovery',
                'insurer': 'Insurer',
                'storage': 'Storage',
                'hire-company': 'Hire Company',
            };
            setData('uto_type', typeMap[selectedPartner.partner_type] || 'Partner');
        }
    };

    const calculateTotal = () => {
        const amount = parseFloat(data.amount) || 0;
        const vat = parseFloat(data.vat) || 0;
        const total = amount + vat;
        setData('total', total.toFixed(2));
    };

    useEffect(() => {
        if (data.amount || data.vat) {
            calculateTotal();
        }
    }, [data.amount, data.vat]);

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={invoice ? 'Edit Invoice' : 'Add Invoice'}
            maxWidth="max-w-3xl"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="inv_no" className="block text-sm font-medium text-gray-700 mb-1">
                            Invoice No
                        </label>
                        <input
                            id="inv_no"
                            type="number"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.inv_no}
                            onChange={(e) => setData('inv_no', e.target.value)}
                        />
                        <InputError message={errors.inv_no} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            id="status"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Overdue">Overdue</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <InputError message={errors.status} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="indate" className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                        </label>
                        <input
                            id="indate"
                            type="date"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.indate}
                            onChange={(e) => setData('indate', e.target.value)}
                        />
                        <InputError message={errors.indate} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date
                        </label>
                        <input
                            id="due_date"
                            type="date"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.due_date}
                            onChange={(e) => setData('due_date', e.target.value)}
                        />
                        <InputError message={errors.due_date} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="uto" className="block text-sm font-medium text-gray-700 mb-1">
                            To (Partner)
                        </label>
                        <select
                            id="uto"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.uto}
                            onChange={handlePartnerChange}
                        >
                            <option value="">Select Partner</option>
                            {partners.map((partner) => (
                                <option key={partner.id} value={partner.id}>
                                    {partner.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.uto} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="desc_de" className="block text-sm font-medium text-gray-700 mb-1">
                            For (Description)
                        </label>
                        <input
                            id="desc_de"
                            type="text"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.desc_de}
                            onChange={(e) => setData('desc_de', e.target.value)}
                        />
                        <InputError message={errors.desc_de} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input
                            id="amount"
                            type="number"
                            step="0.01"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                        />
                        <InputError message={errors.amount} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="vat" className="block text-sm font-medium text-gray-700 mb-1">
                            VAT
                        </label>
                        <input
                            id="vat"
                            type="number"
                            step="0.01"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.vat}
                            onChange={(e) => setData('vat', e.target.value)}
                        />
                        <InputError message={errors.vat} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-1">
                            Total
                        </label>
                        <input
                            id="total"
                            type="number"
                            step="0.01"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
                            value={data.total}
                            readOnly
                        />
                        <InputError message={errors.total} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="date_paid" className="block text-sm font-medium text-gray-700 mb-1">
                            Date Paid
                        </label>
                        <input
                            id="date_paid"
                            type="date"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.date_paid}
                            onChange={(e) => setData('date_paid', e.target.value)}
                        />
                        <InputError message={errors.date_paid} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="clawed_date" className="block text-sm font-medium text-gray-700 mb-1">
                            Clawed Back Date
                        </label>
                        <input
                            id="clawed_date"
                            type="date"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.clawed_date}
                            onChange={(e) => setData('clawed_date', e.target.value)}
                        />
                        <InputError message={errors.clawed_date} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="chq_no" className="block text-sm font-medium text-gray-700 mb-1">
                            Cheque No
                        </label>
                        <input
                            id="chq_no"
                            type="text"
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            value={data.chq_no}
                            onChange={(e) => setData('chq_no', e.target.value)}
                        />
                        <InputError message={errors.chq_no} className="mt-1" />
                    </div>
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
                        {processing ? 'Saving...' : invoice ? 'UPDATE INVOICE' : 'CREATE INVOICE'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
