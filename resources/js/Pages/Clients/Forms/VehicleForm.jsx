import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import DateInput from '@/Components/DateInput';
import PartnerModal from '@/Components/PartnerModal';
import PartnerDetailModal from '@/Components/PartnerDetailModal';
import toast from 'react-hot-toast';

export default function VehicleForm({ client, partners, className = '' }) {
    const [expandedSections, setExpandedSections] = useState({
        insurance: true,
        driver: false,
        recovery: false,
        storage: false,
        damage: false,
        inspection: false,
        repairs: false,
    });

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentPartnerType, setCurrentPartnerType] = useState('');
    const [currentPartnerId, setCurrentPartnerId] = useState(null);
    const [currentPartnerName, setCurrentPartnerName] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        claimid: client.id,
        // Vehicle fields
        vehicle_reg: client.vehicle?.vehicle_reg || '',
        vehicle_make: client.vehicle?.vehicle_make || '',
        vehicle_model: client.vehicle?.vehicle_model || '',
        vehicle_bodytype: client.vehicle?.vehicle_bodytype || '',
        vehicle_colour: client.vehicle?.vehicle_colour || '',
        vehicle_fueltype: client.vehicle?.vehicle_fueltype || '',
        vehicle_regdate: client.vehicle?.vehicle_regdate || '',
        vehicle_transmission: client.vehicle?.vehicle_transmission || '',
        vehicle_engine: client.vehicle?.vehicle_engine || '',
        vehicle_egroup: client.vehicle?.vehicle_egroup || '',
        vehicle_mileage: client.vehicle?.vehicle_mileage || '',
        vehicle_mvalue: client.vehicle?.vehicle_mvalue || '',
        vehicle_occupants: client.vehicle?.vehicle_occupants || '',
        vehicle_damage: client.vehicle?.vehicle_damage || '',
        vehicle_pco: client.vehicle?.vehicle_pco || '',
        vehicle_taxi: client.vehicle?.vehicle_taxi || '',
        vehicle_condition: client.vehicle?.vehicle_condition || '',
        // Insurance fields
        insurance_name: client.insurance?.insurance_name || '',
        insurance_details: client.insurance?.insurance_details || '',
        insurance_policyno: client.insurance?.insurance_policyno || '',
        insurance_cover: client.insurance?.insurance_cover || '',
        insurance_claimno: client.insurance?.insurance_claimno || '',
        insurance_expdate: client.insurance?.insurance_expdate || '',
        insurance_insreported: client.insurance?.insurance_insreported || '',
        insurance_owner: client.insurance?.insurance_owner || '',
        insurance_notes: client.insurance?.insurance_notes || '',
        // Driver fields
        driver_title: client.driver?.driver_title || '',
        driver_fname: client.driver?.driver_fname || '',
        driver_lname: client.driver?.driver_lname || '',
        driver_address: client.driver?.driver_address || '',
        driver_city: client.driver?.driver_city || '',
        driver_country: client.driver?.driver_country || '',
        driver_postcode: client.driver?.driver_postcode || '',
        driver_hometel: client.driver?.driver_hometel || '',
        driver_mobtel: client.driver?.driver_mobtel || '',
        driver_email: client.driver?.driver_email || '',
        driver_dob: client.driver?.driver_dob || '',
        driver_ni: client.driver?.driver_ni || '',
        driver_occupation: client.driver?.driver_occupation || '',
        driver_dlno: client.driver?.driver_dlno || '',
        driver_dtype: client.driver?.driver_dtype || '',
        driver_dotp: client.driver?.driver_dotp || '',
        driver_doiss: client.driver?.driver_doiss || '',
        driver_doexpires: client.driver?.driver_doexpires || '',
        driver_pol: client.driver?.driver_pol || '',
        // Recovery fields
        recovery_provided: client.recovery?.recovery_provided || '',
        recovery_company: client.recovery?.recovery_company || '',
        recovery_to: client.recovery?.recovery_to || '',
        recovery_date: client.recovery?.recovery_date || '',
        recovery_agreed: client.recovery?.recovery_agreed || '',
        recovery_invstatus: client.recovery?.recovery_invstatus || '',
        recovery_dsent: client.recovery?.recovery_dsent || '',
        recovery_dpaid: client.recovery?.recovery_dpaid || '',
        recovery_chk: client.recovery?.recovery_chk || '',
        // Storage fields
        storage_provided: client.storage?.storage_provided || '',
        storage_company: client.storage?.storage_company || '',
        storage_location: client.storage?.storage_location || '',
        storage_indate: client.storage?.storage_indate || '',
        storage_outdate: client.storage?.storage_outdate || '',
        storage_rate_one: client.storage?.storage_rate_one || '',
        storage_dsentinv: client.storage?.storage_dsentinv || '',
        storage_dpaidinv: client.storage?.storage_dpaidinv || '',
        storage_rate: client.storage?.storage_rate || '',
        storage_chqrec: client.storage?.storage_chqrec || '',
        // Damage fields
        vdamage_ownv: client.damage?.vdamage_ownv || '',
        // Inspection fields
        inspect_status: client.inspection?.inspect_status || 'Inspection not Done',
        inspect_eng: client.inspection?.inspect_eng || '',
        inspect_engname: client.inspection?.inspect_engname || '',
        inspect_salk: client.inspection?.inspect_salk || '',
        inspect_inst: client.inspection?.inspect_inst || '',
        inspect_insptd: client.inspection?.inspect_insptd || '',
        inspect_rrec: client.inspection?.inspect_rrec || '',
        inspect_rsent: client.inspection?.inspect_rsent || '',
        inspect_vdamount: client.inspection?.inspect_vdamount || '',
        inspect_vdamount_received: client.inspection?.inspect_vdamount_received || '',
        inspect_setofer: client.inspection?.inspect_setofer || '',
        inspect_doffer: client.inspection?.inspect_doffer || '',
        inspect_chqrec: client.inspection?.inspect_chqrec || '',
        // Repair fields
        repair_repair: client.repair?.repair_repair || '',
        repair_status: client.repair?.repair_status || '',
        repair_dauthor: client.repair?.repair_dauthor || '',
        repair_din: client.repair?.repair_din || '',
        repair_dout: client.repair?.repair_dout || '',
        repair_sns: client.repair?.repair_sns || '',
        repair_amount: client.repair?.repair_amount || '',
        activetab: '#vehicle',
    });

    const handleDateChange = (name, value) => {
        setData(name, value);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/updateclaim', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Vehicle information updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update vehicle information. Please check the form for errors.');
            },
        });
    };

    const insurers = partners.insurers || [];
    const engineers = partners.engineers || [];
    const repairers = partners.repairers || [];
    const recoveryPartners = partners.recovery || [];
    const storagePartners = partners.storage || [];

    // Helper function to copy client info to driver
    const copyClientToDriver = () => {
        setData('driver_title', client.client_title || '');
        setData('driver_fname', client.client_fname || '');
        setData('driver_lname', client.client_lname || '');
        setData('driver_address', client.client_address || '');
        setData('driver_postcode', client.client_postcode || '');
        setData('driver_city', client.client_city || '');
        setData('driver_country', client.client_country || '');
        setData('driver_hometel', client.client_hometel || '');
        setData('driver_email', client.client_email || '');
        setData('driver_mobtel', client.client_mobile || '');
        setData('driver_dob', client.claim?.claim_dob || '');
        setData('driver_ni', client.claim?.claim_ni || '');
        setData('driver_occupation', client.claim?.claim_occupation || '');
    };

    // Partner modal handlers
    const handleAddPartner = (partnerType) => {
        setCurrentPartnerType(partnerType);
        setShowAddModal(true);
    };

    const handleDetailPartner = (partnerId, partnerName) => {
        setCurrentPartnerId(partnerId);
        setCurrentPartnerName(partnerName || '');
        setShowDetailModal(true);
    };

    const handlePartnerSuccess = () => {
        // Reload the page to refresh partner lists
        router.reload({ only: ['partners'] });
    };

    return (
        <form onSubmit={submit} className={`space-y-6 ${className}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Vehicle Form Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reg
                        </label>
                        <input
                            type="text"
                            value={data.vehicle_reg}
                            onChange={(e) => setData('vehicle_reg', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <InputError message={errors.vehicle_reg} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Make
                        </label>
                        <input
                            type="text"
                            value={data.vehicle_make}
                            onChange={(e) => setData('vehicle_make', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <InputError message={errors.vehicle_make} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Model
                        </label>
                        <input
                            type="text"
                            value={data.vehicle_model}
                            onChange={(e) => setData('vehicle_model', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <InputError message={errors.vehicle_model} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Body Type
                        </label>
                        <input
                            type="text"
                            value={data.vehicle_bodytype}
                            onChange={(e) => setData('vehicle_bodytype', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <InputError message={errors.vehicle_bodytype} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Colour
                        </label>
                        <input
                            type="text"
                            value={data.vehicle_colour}
                            onChange={(e) => setData('vehicle_colour', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <InputError message={errors.vehicle_colour} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fuel Type
                        </label>
                        <select
                            value={data.vehicle_fueltype}
                            onChange={(e) => setData('vehicle_fueltype', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select...</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                        </select>
                        <InputError message={errors.vehicle_fueltype} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reg Date
                        </label>
                        <DateInput
                            value={data.vehicle_regdate}
                            onChange={(value) => handleDateChange('vehicle_regdate', value)}
                        />
                        <InputError message={errors.vehicle_regdate} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Transmission
                        </label>
                        <select
                            value={data.vehicle_transmission}
                            onChange={(e) => setData('vehicle_transmission', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select...</option>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                        <InputError message={errors.vehicle_transmission} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Engine CC
                        </label>
                        <input
                            type="text"
                            value={data.vehicle_engine}
                            onChange={(e) => setData('vehicle_engine', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <InputError message={errors.vehicle_engine} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mileage
                        </label>
                        <input
                            type="text"
                            value={data.vehicle_mileage}
                            onChange={(e) => setData('vehicle_mileage', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <InputError message={errors.vehicle_mileage} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            No of occupants
                        </label>
                        <input
                            type="text"
                            value={data.vehicle_occupants}
                            onChange={(e) => setData('vehicle_occupants', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <InputError message={errors.vehicle_occupants} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Damage
                        </label>
                        <textarea
                            value={data.vehicle_damage}
                            onChange={(e) => setData('vehicle_damage', e.target.value)}
                            rows={10}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <InputError message={errors.vehicle_damage} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Taxi
                        </label>
                        <select
                            value={data.vehicle_taxi}
                            onChange={(e) => setData('vehicle_taxi', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <InputError message={errors.vehicle_taxi} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Condition
                        </label>
                        <select
                            value={data.vehicle_condition}
                            onChange={(e) => setData('vehicle_condition', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select...</option>
                            <option value="Driveable">Driveable</option>
                            <option value="Driveable and Repairable">Driveable and Repairable</option>
                            <option value="Driverable but not fit for taxi">Driverable but not fit for taxi</option>
                            <option value="Driveable but Total Loss">Driveable but Total Loss</option>
                            <option value="Non Driveable">Non Driveable</option>
                            <option value="Non Driveable and Total Loss">Non Driveable and Total Loss</option>
                            <option value="Non Driveable but repairable">Non Driveable but repairable</option>
                        </select>
                        <InputError message={errors.vehicle_condition} className="mt-2" />
                    </div>
                </div>

                {/* Right Column - Insurance and Collapsible Sections */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Insurance Section - Expanded by default */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => setExpandedSections(prev => ({ ...prev, insurance: !prev.insurance }))}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Insurance</span>
                            <span>{expandedSections.insurance ? '−' : '+'}</span>
                        </button>
                        {expandedSections.insurance && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Insurer
                                        </label>
                                        <div className="flex gap-2">
                                            <select
                                                value={data.insurance_name}
                                                onChange={(e) => setData('insurance_name', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option value="">Select...</option>
                                                {insurers.map((insurer) => (
                                                    <option key={insurer.id} value={insurer.id}>
                                                        {insurer.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => handleAddPartner('insurer')}
                                                className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 border-l border-gray-300"
                                            >
                                                Add
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDetailPartner(data.insurance_name, insurers.find(i => i.id == data.insurance_name)?.name)}
                                                disabled={!data.insurance_name}
                                                className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed border-l border-gray-300"
                                            >
                                                Detail
                                            </button>
                                        </div>
                                        <InputError message={errors.insurance_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Contact Details
                                        </label>
                                        <textarea
                                            value={data.insurance_details}
                                            onChange={(e) => setData('insurance_details', e.target.value)}
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.insurance_details} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Policy No.
                                        </label>
                                        <input
                                            type="text"
                                            value={data.insurance_policyno}
                                            onChange={(e) => setData('insurance_policyno', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.insurance_policyno} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Insurance Cover
                                        </label>
                                        <select
                                            value={data.insurance_cover}
                                            onChange={(e) => setData('insurance_cover', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Third Party Only">Third Party Only</option>
                                            <option value="Third Party Fire And Theft">Third Party Fire And Theft</option>
                                            <option value="Comprehensive">Comprehensive</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <InputError message={errors.insurance_cover} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Claim Number
                                        </label>
                                        <input
                                            type="text"
                                            value={data.insurance_claimno}
                                            onChange={(e) => setData('insurance_claimno', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.insurance_claimno} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ins Expiry Date
                                        </label>
                                        <DateInput
                                            value={data.insurance_expdate}
                                            onChange={(value) => handleDateChange('insurance_expdate', value)}
                                        />
                                        <InputError message={errors.insurance_expdate} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ins Reported Date
                                        </label>
                                        <DateInput
                                            value={data.insurance_insreported}
                                            onChange={(value) => handleDateChange('insurance_insreported', value)}
                                        />
                                        <InputError message={errors.insurance_insreported} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Owner
                                        </label>
                                        <textarea
                                            value={data.insurance_owner}
                                            onChange={(e) => setData('insurance_owner', e.target.value)}
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.insurance_owner} className="mt-2" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Notes
                                        </label>
                                        <textarea
                                            value={data.insurance_notes}
                                            onChange={(e) => setData('insurance_notes', e.target.value)}
                                            rows={4}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.insurance_notes} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Driver Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => setExpandedSections(prev => ({ ...prev, driver: !prev.driver }))}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Driver</span>
                            <span>{expandedSections.driver ? '−' : '+'}</span>
                        </button>
                        {expandedSections.driver && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title
                                        </label>
                                        <div className="flex gap-2">
                                            <select
                                                value={data.driver_title}
                                                onChange={(e) => setData('driver_title', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option value="">Select...</option>
                                                <option value="Mr">Mr</option>
                                                <option value="Ms">Ms</option>
                                                <option value="Mrs">Mrs</option>
                                                <option value="Miss">Miss</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <button
                                                type="button"
                                                onClick={copyClientToDriver}
                                                className="px-3 py-2 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                            >
                                                As Client
                                            </button>
                                        </div>
                                        <InputError message={errors.driver_title} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_fname}
                                            onChange={(e) => setData('driver_fname', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_fname} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_lname}
                                            onChange={(e) => setData('driver_lname', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_lname} className="mt-2" />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address
                                        </label>
                                        <textarea
                                            value={data.driver_address}
                                            onChange={(e) => setData('driver_address', e.target.value)}
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_address} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Home tel
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_hometel}
                                            onChange={(e) => setData('driver_hometel', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_hometel} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mobile tel
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_mobtel}
                                            onChange={(e) => setData('driver_mobtel', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_mobtel} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_email}
                                            onChange={(e) => setData('driver_email', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_email} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date Of Birth
                                        </label>
                                        <DateInput
                                            value={data.driver_dob}
                                            onChange={(value) => handleDateChange('driver_dob', value)}
                                        />
                                        <InputError message={errors.driver_dob} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            NI
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_ni}
                                            onChange={(e) => setData('driver_ni', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_ni} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Occupation
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_occupation}
                                            onChange={(e) => setData('driver_occupation', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_occupation} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            DL No.
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_dlno}
                                            onChange={(e) => setData('driver_dlno', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_dlno} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Type
                                        </label>
                                        <select
                                            value={data.driver_dtype}
                                            onChange={(e) => setData('driver_dtype', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Full">Full</option>
                                            <option value="Professional">Professional</option>
                                        </select>
                                        <InputError message={errors.driver_dtype} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            D. Passed
                                        </label>
                                        <DateInput
                                            value={data.driver_dotp}
                                            onChange={(value) => handleDateChange('driver_dotp', value)}
                                            placeholderText="Date Of Test Passed"
                                        />
                                        <InputError message={errors.driver_dotp} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            D. Issue
                                        </label>
                                        <DateInput
                                            value={data.driver_doiss}
                                            onChange={(value) => handleDateChange('driver_doiss', value)}
                                            placeholderText="Date Of Issue"
                                        />
                                        <InputError message={errors.driver_doiss} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            D. Expires
                                        </label>
                                        <DateInput
                                            value={data.driver_doexpires}
                                            onChange={(value) => handleDateChange('driver_doexpires', value)}
                                            placeholderText="Date of Expires"
                                        />
                                        <InputError message={errors.driver_doexpires} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            licence Points
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_pol}
                                            onChange={(e) => setData('driver_pol', e.target.value)}
                                            placeholder="Points of licence"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_pol} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Post Code
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_postcode}
                                            onChange={(e) => setData('driver_postcode', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_postcode} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_city}
                                            onChange={(e) => setData('driver_city', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_city} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            County
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_country}
                                            onChange={(e) => setData('driver_country', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.driver_country} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Recovery Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => setExpandedSections(prev => ({ ...prev, recovery: !prev.recovery }))}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Recovery</span>
                            <span>{expandedSections.recovery ? '−' : '+'}</span>
                        </button>
                        {expandedSections.recovery && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Provided?
                                        </label>
                                        <select
                                            value={data.recovery_provided}
                                            onChange={(e) => setData('recovery_provided', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        <InputError message={errors.recovery_provided} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Company
                                        </label>
                                        <div className="flex gap-2">
                                            <select
                                                value={data.recovery_company}
                                                onChange={(e) => setData('recovery_company', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option value="">Select...</option>
                                                {recoveryPartners.map((rec) => (
                                                    <option key={rec.id} value={rec.id}>
                                                        {rec.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => handleAddPartner('recovery')}
                                                className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 border-l border-gray-300"
                                            >
                                                Add
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDetailPartner(data.recovery_company, recoveryPartners.find(r => r.id == data.recovery_company)?.name)}
                                                disabled={!data.recovery_company}
                                                className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed border-l border-gray-300"
                                            >
                                                Detail
                                            </button>
                                        </div>
                                        <InputError message={errors.recovery_company} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Recovered to
                                        </label>
                                        <input
                                            type="text"
                                            value={data.recovery_to}
                                            onChange={(e) => setData('recovery_to', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.recovery_to} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Recovered date
                                        </label>
                                        <DateInput
                                            value={data.recovery_date}
                                            onChange={(value) => handleDateChange('recovery_date', value)}
                                        />
                                        <InputError message={errors.recovery_date} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Amount Agreed £
                                        </label>
                                        <input
                                            type="text"
                                            value={data.recovery_agreed}
                                            onChange={(e) => setData('recovery_agreed', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.recovery_agreed} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Invoice Status
                                        </label>
                                        <select
                                            value={data.recovery_invstatus}
                                            onChange={(e) => setData('recovery_invstatus', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Outstanding">Outstanding</option>
                                            <option value="Paid">Paid</option>
                                            <option value="Cancelled">Cancelled</option>
                                            <option value="Not Ready">Not Ready</option>
                                            <option value="Ready">Ready</option>
                                            <option value="Sent">Sent</option>
                                            <option value="Offer Accepted">Offer Accepted</option>
                                            <option value="Offer in Negociation">Offer in Negociation</option>
                                            <option value="Withdrawn">Withdrawn</option>
                                            <option value="Debt Collection">Debt Collection</option>
                                            <option value="Clawed Back">Clawed Back</option>
                                            <option value="Out Sourced">Out Sourced</option>
                                            <option value="Part Paid">Part Paid</option>
                                            <option value="Quantum Agreed">Quantum Agreed</option>
                                            <option value="On Liability">On Liability</option>
                                        </select>
                                        <InputError message={errors.recovery_invstatus} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date Sent
                                        </label>
                                        <DateInput
                                            value={data.recovery_dsent}
                                            onChange={(value) => handleDateChange('recovery_dsent', value)}
                                        />
                                        <InputError message={errors.recovery_dsent} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date Paid
                                        </label>
                                        <DateInput
                                            value={data.recovery_dpaid}
                                            onChange={(value) => handleDateChange('recovery_dpaid', value)}
                                        />
                                        <InputError message={errors.recovery_dpaid} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Chq Received
                                        </label>
                                        <input
                                            type="text"
                                            value={data.recovery_chk}
                                            onChange={(e) => setData('recovery_chk', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.recovery_chk} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Storage Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => setExpandedSections(prev => ({ ...prev, storage: !prev.storage }))}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Storage</span>
                            <span>{expandedSections.storage ? '−' : '+'}</span>
                        </button>
                        {expandedSections.storage && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Storage Provided?
                                        </label>
                                        <select
                                            value={data.storage_provided}
                                            onChange={(e) => setData('storage_provided', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        <InputError message={errors.storage_provided} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Company
                                        </label>
                                        <div className="flex gap-2">
                                            <select
                                                value={data.storage_company}
                                                onChange={(e) => setData('storage_company', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option value="">Select...</option>
                                                {storagePartners.map((rec) => (
                                                    <option key={rec.id} value={rec.id}>
                                                        {rec.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => handleAddPartner('storage')}
                                                className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 border-l border-gray-300"
                                            >
                                                Add
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDetailPartner(data.storage_company, storagePartners.find(s => s.id == data.storage_company)?.name)}
                                                disabled={!data.storage_company}
                                                className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed border-l border-gray-300"
                                            >
                                                Detail
                                            </button>
                                        </div>
                                        <InputError message={errors.storage_company} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Location
                                        </label>
                                        <textarea
                                            value={data.storage_location}
                                            onChange={(e) => setData('storage_location', e.target.value)}
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.storage_location} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            In Date
                                        </label>
                                        <DateInput
                                            value={data.storage_indate}
                                            onChange={(value) => handleDateChange('storage_indate', value)}
                                        />
                                        <InputError message={errors.storage_indate} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Out Date
                                        </label>
                                        <DateInput
                                            value={data.storage_outdate}
                                            onChange={(value) => handleDateChange('storage_outdate', value)}
                                        />
                                        <InputError message={errors.storage_outdate} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Daily Rate £
                                        </label>
                                        <input
                                            type="text"
                                            value={data.storage_rate_one}
                                            onChange={(e) => setData('storage_rate_one', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.storage_rate_one} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date Sent
                                        </label>
                                        <DateInput
                                            value={data.storage_dsentinv}
                                            onChange={(value) => handleDateChange('storage_dsentinv', value)}
                                        />
                                        <InputError message={errors.storage_dsentinv} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date Paid
                                        </label>
                                        <DateInput
                                            value={data.storage_dpaidinv}
                                            onChange={(value) => handleDateChange('storage_dpaidinv', value)}
                                        />
                                        <InputError message={errors.storage_dpaidinv} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Daily Rate £
                                        </label>
                                        <input
                                            type="text"
                                            value={data.storage_rate}
                                            onChange={(e) => setData('storage_rate', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.storage_rate} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Chq Received
                                        </label>
                                        <input
                                            type="text"
                                            value={data.storage_chqrec}
                                            onChange={(e) => setData('storage_chqrec', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.storage_chqrec} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Vehicle Damage Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => setExpandedSections(prev => ({ ...prev, damage: !prev.damage }))}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Vehicle Damage</span>
                            <span>{expandedSections.damage ? '−' : '+'}</span>
                        </button>
                        {expandedSections.damage && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Claim vehicle damage through
                                    </label>
                                    <select
                                        value={data.vdamage_ownv}
                                        onChange={(e) => setData('vdamage_ownv', e.target.value)}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Select...</option>
                                        <option value="Own Insurance">Own Insurance</option>
                                        <option value="Hire Company">Hire Company</option>
                                        <option value="Defendent Insurance">Defendent Insurance</option>
                                        <option value="Solicitor">Solicitor</option>
                                    </select>
                                    <InputError message={errors.vdamage_ownv} className="mt-2" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Vehicle Inspection Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => setExpandedSections(prev => ({ ...prev, inspection: !prev.inspection }))}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Vehicle Inspection</span>
                            <span>{expandedSections.inspection ? '−' : '+'}</span>
                        </button>
                        {expandedSections.inspection && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status
                                        </label>
                                        <select
                                            value={data.inspect_status}
                                            onChange={(e) => setData('inspect_status', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="Inspection not Done">Inspection not Done</option>
                                            <option value="Engineer Instructed">Engineer Instructed</option>
                                            <option value="Inspection Done">Inspection Done</option>
                                            <option value="Report Received">Report Received</option>
                                            <option value="Report Sent to TPI">Report Sent to TPI</option>
                                            <option value="Requestion TPI">Requestion TPI</option>
                                            <option value="Inspected - Not Authorized">Inspected - Not Authorized</option>
                                        </select>
                                        <InputError message={errors.inspect_status} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Eng. Co
                                        </label>
                                        <div className="flex gap-2">
                                            <select
                                                value={data.inspect_eng}
                                                onChange={(e) => setData('inspect_eng', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option value="">Select...</option>
                                                {engineers.map((engineer) => (
                                                    <option key={engineer.id} value={engineer.id}>
                                                        {engineer.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => handleAddPartner('engineer')}
                                                className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 border-l border-gray-300"
                                            >
                                                Add
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDetailPartner(data.inspect_eng, engineers.find(e => e.id == data.inspect_eng)?.name)}
                                                disabled={!data.inspect_eng}
                                                className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed border-l border-gray-300"
                                            >
                                                Detail
                                            </button>
                                        </div>
                                        <InputError message={errors.inspect_eng} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Engineer Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.inspect_engname}
                                            onChange={(e) => setData('inspect_engname', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.inspect_engname} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Salvage Keeper
                                        </label>
                                        <input
                                            type="text"
                                            value={data.inspect_salk}
                                            onChange={(e) => setData('inspect_salk', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.inspect_salk} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Instructed
                                        </label>
                                        <DateInput
                                            value={data.inspect_inst}
                                            onChange={(value) => handleDateChange('inspect_inst', value)}
                                        />
                                        <InputError message={errors.inspect_inst} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Inspected
                                        </label>
                                        <DateInput
                                            value={data.inspect_insptd}
                                            onChange={(value) => handleDateChange('inspect_insptd', value)}
                                        />
                                        <InputError message={errors.inspect_insptd} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Report received
                                        </label>
                                        <DateInput
                                            value={data.inspect_rrec}
                                            onChange={(value) => handleDateChange('inspect_rrec', value)}
                                        />
                                        <InputError message={errors.inspect_rrec} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Report Sent
                                        </label>
                                        <DateInput
                                            value={data.inspect_rsent}
                                            onChange={(value) => handleDateChange('inspect_rsent', value)}
                                        />
                                        <InputError message={errors.inspect_rsent} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            VD Amount £
                                        </label>
                                        <input
                                            type="text"
                                            value={data.inspect_vdamount}
                                            onChange={(e) => setData('inspect_vdamount', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.inspect_vdamount} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            VD Amount Received £
                                        </label>
                                        <input
                                            type="text"
                                            value={data.inspect_vdamount_received}
                                            onChange={(e) => setData('inspect_vdamount_received', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.inspect_vdamount_received} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date of settlement offer
                                        </label>
                                        <DateInput
                                            value={data.inspect_setofer}
                                            onChange={(value) => handleDateChange('inspect_setofer', value)}
                                        />
                                        <InputError message={errors.inspect_setofer} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date offer accepted
                                        </label>
                                        <DateInput
                                            value={data.inspect_doffer}
                                            onChange={(value) => handleDateChange('inspect_doffer', value)}
                                        />
                                        <InputError message={errors.inspect_doffer} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date chq received
                                        </label>
                                        <DateInput
                                            value={data.inspect_chqrec}
                                            onChange={(value) => handleDateChange('inspect_chqrec', value)}
                                        />
                                        <InputError message={errors.inspect_chqrec} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Repairs Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => setExpandedSections(prev => ({ ...prev, repairs: !prev.repairs }))}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Repairs</span>
                            <span>{expandedSections.repairs ? '−' : '+'}</span>
                        </button>
                        {expandedSections.repairs && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Repairer
                                        </label>
                                        <div className="flex gap-2">
                                            <select
                                                value={data.repair_repair}
                                                onChange={(e) => setData('repair_repair', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option value="">Select...</option>
                                                {repairers.map((repairer) => (
                                                    <option key={repairer.id} value={repairer.id}>
                                                        {repairer.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => handleAddPartner('repairer')}
                                                className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 border-l border-gray-300"
                                            >
                                                Add
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDetailPartner(data.repair_repair, repairers.find(r => r.id == data.repair_repair)?.name)}
                                                disabled={!data.repair_repair}
                                                className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed border-l border-gray-300"
                                            >
                                                Detail
                                            </button>
                                        </div>
                                        <InputError message={errors.repair_repair} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status
                                        </label>
                                        <select
                                            value={data.repair_status}
                                            onChange={(e) => setData('repair_status', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Complete">Complete</option>
                                            <option value="Authorised">Authorised</option>
                                            <option value="Not yet authorised">Not yet authorised</option>
                                            <option value="Not known">Not known</option>
                                            <option value="Total Loss">Total Loss</option>
                                            <option value="In Repair">In Repair</option>
                                            <option value="Withdrawn">Withdrawn</option>
                                            <option value="Cash in lieu">Cash in lieu</option>
                                        </select>
                                        <InputError message={errors.repair_status} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date Repair authorised
                                        </label>
                                        <input
                                            type="text"
                                            value={data.repair_dauthor}
                                            onChange={(e) => setData('repair_dauthor', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.repair_dauthor} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date In
                                        </label>
                                        <DateInput
                                            value={data.repair_din}
                                            onChange={(value) => handleDateChange('repair_din', value)}
                                        />
                                        <InputError message={errors.repair_din} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date Out
                                        </label>
                                        <DateInput
                                            value={data.repair_dout}
                                            onChange={(value) => handleDateChange('repair_dout', value)}
                                        />
                                        <InputError message={errors.repair_dout} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Satisfaction Note Signed
                                        </label>
                                        <input
                                            type="text"
                                            value={data.repair_sns}
                                            onChange={(e) => setData('repair_sns', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.repair_sns} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Repair Amount £
                                        </label>
                                        <input
                                            type="text"
                                            value={data.repair_amount}
                                            onChange={(e) => setData('repair_amount', e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <InputError message={errors.repair_amount} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </div>

            {/* Partner Modals */}
            <PartnerModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                partnerType={currentPartnerType}
                onSuccess={handlePartnerSuccess}
            />
            <PartnerDetailModal
                show={showDetailModal}
                onClose={() => {
                    setShowDetailModal(false);
                    setCurrentPartnerId(null);
                    setCurrentPartnerName('');
                }}
                partnerId={currentPartnerId}
                partnerName={currentPartnerName}
                onSuccess={handlePartnerSuccess}
            />
        </form>
    );
}
