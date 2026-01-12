import { useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from './Modal';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import PrimaryButton from './PrimaryButton';
import InputError from './InputError';

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
                    onClose();
                    reset();
                },
            });
        } else {
            // Create new invoice
            post('/insert_payment', {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                    reset();
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
                        <InputLabel htmlFor="inv_no" value="Invoice No" />
                        <TextInput
                            id="inv_no"
                            type="number"
                            className="mt-1 block w-full"
                            value={data.inv_no}
                            onChange={(e) => setData('inv_no', e.target.value)}
                        />
                        <InputError message={errors.inv_no} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="status" value="Status" />
                        <select
                            id="status"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Overdue">Overdue</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="indate" value="Date" />
                        <TextInput
                            id="indate"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.indate}
                            onChange={(e) => setData('indate', e.target.value)}
                        />
                        <InputError message={errors.indate} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="due_date" value="Due Date" />
                        <TextInput
                            id="due_date"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.due_date}
                            onChange={(e) => setData('due_date', e.target.value)}
                        />
                        <InputError message={errors.due_date} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="uto" value="To (Partner)" />
                        <select
                            id="uto"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                        <InputError message={errors.uto} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="desc_de" value="For (Description)" />
                        <TextInput
                            id="desc_de"
                            className="mt-1 block w-full"
                            value={data.desc_de}
                            onChange={(e) => setData('desc_de', e.target.value)}
                        />
                        <InputError message={errors.desc_de} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="amount" value="Amount" />
                        <TextInput
                            id="amount"
                            type="number"
                            step="0.01"
                            className="mt-1 block w-full"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                        />
                        <InputError message={errors.amount} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="vat" value="VAT" />
                        <TextInput
                            id="vat"
                            type="number"
                            step="0.01"
                            className="mt-1 block w-full"
                            value={data.vat}
                            onChange={(e) => setData('vat', e.target.value)}
                        />
                        <InputError message={errors.vat} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="total" value="Total" />
                        <TextInput
                            id="total"
                            type="number"
                            step="0.01"
                            className="mt-1 block w-full bg-gray-50"
                            value={data.total}
                            readOnly
                        />
                        <InputError message={errors.total} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="date_paid" value="Date Paid" />
                        <TextInput
                            id="date_paid"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.date_paid}
                            onChange={(e) => setData('date_paid', e.target.value)}
                        />
                        <InputError message={errors.date_paid} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="clawed_date" value="Clawed Back Date" />
                        <TextInput
                            id="clawed_date"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.clawed_date}
                            onChange={(e) => setData('clawed_date', e.target.value)}
                        />
                        <InputError message={errors.clawed_date} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="chq_no" value="Cheque No" />
                        <TextInput
                            id="chq_no"
                            className="mt-1 block w-full"
                            value={data.chq_no}
                            onChange={(e) => setData('chq_no', e.target.value)}
                        />
                        <InputError message={errors.chq_no} className="mt-2" />
                    </div>
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
                        {processing ? 'Saving...' : invoice ? 'Update Invoice' : 'Create Invoice'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
