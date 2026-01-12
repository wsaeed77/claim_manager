import { useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from './Modal';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import PrimaryButton from './PrimaryButton';
import InputError from './InputError';

export default function WitnessModal({ show, onClose, client, witness = null }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        client_id: client?.id || '',
        witness_title: '',
        witness_fname: '',
        witness_lname: '',
        witness_add: '',
        witness_city: '',
        witness_country: '',
        witness_postcode: '',
        witness_hometel: '',
        witness_officetel: '',
        witness_op: '',
        witness_opd: '',
        witness_type: '',
        witness_vehreg: '',
        witness_make: '',
        witness_model: '',
        witness_insco: '',
        witness_policno: '',
    });

    useEffect(() => {
        if (witness) {
            // Editing existing witness
            setData({
                client_id: witness.client_id || client?.id || '',
                witness_title: witness.witness_title || '',
                witness_fname: witness.witness_fname || '',
                witness_lname: witness.witness_lname || '',
                witness_add: witness.witness_add || '',
                witness_city: witness.witness_city || '',
                witness_country: witness.witness_country || '',
                witness_postcode: witness.witness_postcode || '',
                witness_hometel: witness.witness_hometel || '',
                witness_officetel: witness.witness_officetel || '',
                witness_op: witness.witness_op || '',
                witness_opd: witness.witness_opd || '',
                witness_type: witness.witness_type || '',
                witness_vehreg: witness.witness_vehreg || '',
                witness_make: witness.witness_make || '',
                witness_model: witness.witness_model || '',
                witness_insco: witness.witness_insco || '',
                witness_policno: witness.witness_policno || '',
            });
        } else {
            // Creating new witness
            reset();
            setData('client_id', client?.id || '');
        }
    }, [witness, client]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const submitData = {
            ...data,
            client_id: client?.id || data.client_id,
        };

        if (witness) {
            // Update existing witness
            const updateData = { ...submitData, wid: witness.id };
            router.post('/update_witness', updateData, {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                    reset();
                },
            });
        } else {
            // Create new witness
            post('/save_witness', {
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
            title={witness ? 'Edit Witness' : 'Add Witness'}
            maxWidth="max-w-3xl"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel htmlFor="witness_title" value="Title" />
                                <TextInput
                                    id="witness_title"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.witness_title}
                                    onChange={(e) => setData('witness_title', e.target.value)}
                                />
                        <InputError message={errors.witness_title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_fname" value="First Name *" />
                        <TextInput
                            id="witness_fname"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.witness_fname}
                            onChange={(e) => setData('witness_fname', e.target.value)}
                            required
                        />
                        <InputError message={errors.witness_fname} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_lname" value="Last Name *" />
                        <TextInput
                            id="witness_lname"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.witness_lname}
                            onChange={(e) => setData('witness_lname', e.target.value)}
                            required
                        />
                        <InputError message={errors.witness_lname} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_type" value="Type" />
                        <select
                            id="witness_type"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.witness_type}
                            onChange={(e) => setData('witness_type', e.target.value)}
                        >
                            <option value="">Select Type</option>
                            <option value="witness">Witness</option>
                            <option value="third-party">Third Party</option>
                            <option value="driver">Driver</option>
                        </select>
                        <InputError message={errors.witness_type} className="mt-2" />
                    </div>

                    <div className="sm:col-span-2">
                        <InputLabel htmlFor="witness_add" value="Address" />
                        <textarea
                            id="witness_add"
                            rows={3}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.witness_add}
                            onChange={(e) => setData('witness_add', e.target.value)}
                        />
                        <InputError message={errors.witness_add} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_city" value="City" />
                        <TextInput
                            id="witness_city"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.witness_city}
                            onChange={(e) => setData('witness_city', e.target.value)}
                        />
                        <InputError message={errors.witness_city} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_country" value="Country" />
                        <TextInput
                            id="witness_country"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.witness_country}
                            onChange={(e) => setData('witness_country', e.target.value)}
                        />
                        <InputError message={errors.witness_country} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_postcode" value="Postcode" />
                        <TextInput
                            id="witness_postcode"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.witness_postcode}
                            onChange={(e) => setData('witness_postcode', e.target.value)}
                        />
                        <InputError message={errors.witness_postcode} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_hometel" value="Home Tel" />
                        <TextInput
                            id="witness_hometel"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.witness_hometel}
                            onChange={(e) => setData('witness_hometel', e.target.value)}
                        />
                        <InputError message={errors.witness_hometel} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_officetel" value="Office Tel" />
                        <TextInput
                            id="witness_officetel"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.witness_officetel}
                            onChange={(e) => setData('witness_officetel', e.target.value)}
                        />
                        <InputError message={errors.witness_officetel} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_vehreg" value="Vehicle Registration" />
                        <TextInput
                            id="witness_vehreg"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.witness_vehreg}
                            onChange={(e) => setData('witness_vehreg', e.target.value)}
                        />
                        <InputError message={errors.witness_vehreg} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_make" value="Vehicle Make" />
                        <TextInput
                            id="witness_make"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.witness_make}
                            onChange={(e) => setData('witness_make', e.target.value)}
                        />
                        <InputError message={errors.witness_make} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_model" value="Vehicle Model" />
                        <TextInput
                            id="witness_model"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.witness_model}
                            onChange={(e) => setData('witness_model', e.target.value)}
                        />
                        <InputError message={errors.witness_model} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_insco" value="Insurance Company" />
                        <TextInput
                            id="witness_insco"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.witness_insco}
                            onChange={(e) => setData('witness_insco', e.target.value)}
                        />
                        <InputError message={errors.witness_insco} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="witness_policno" value="Policy Number" />
                        <TextInput
                            id="witness_policno"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.witness_policno}
                            onChange={(e) => setData('witness_policno', e.target.value)}
                        />
                        <InputError message={errors.witness_policno} className="mt-2" />
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
                        {processing ? 'Saving...' : witness ? 'Update Witness' : 'Save Witness'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
