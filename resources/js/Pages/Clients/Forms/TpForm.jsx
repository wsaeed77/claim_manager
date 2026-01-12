import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import DateInput from '@/Components/DateInput';
import toast from 'react-hot-toast';

export default function TpForm({ client, partners, className = '' }) {
    const [expandedRightSections, setExpandedRightSections] = useState({
        vehicle: true,
        insurance: false,
        driver: false,
    });

    const { data, setData, post, processing, errors } = useForm({
        claimid: client.id,
        // TP Vehicle fields
        tpv_reg: client.tpVehicle?.tpv_reg || '',
        tpv_make: client.tpVehicle?.tpv_make || '',
        tpv_model: client.tpVehicle?.tpv_model || '',
        tpv_btype: client.tpVehicle?.tpv_btype || '',
        tpv_color: client.tpVehicle?.tpv_color || '',
        tpv_ftype: client.tpVehicle?.tpv_ftype || '',
        tpv_regdate: client.tpVehicle?.tpv_regdate ? (typeof client.tpVehicle.tpv_regdate === 'string' ? client.tpVehicle.tpv_regdate : client.tpVehicle.tpv_regdate.split('T')[0]) : null,
        tpv_nooccu: client.tpVehicle?.tpv_nooccu || '',
        tpv_damage: client.tpVehicle?.tpv_damage || '',
        tpv_details: client.tpVehicle?.tpv_details || '',
        // TP Insurance fields
        tpi_insurer: client.tpInsurance?.tpi_insurer || '',
        tpi_cdetails: client.tpInsurance?.tpi_cdetails || '',
        tpi_tpin: client.tpInsurance?.tpi_tpin || '',
        tpi_policy: client.tpInsurance?.tpi_policy || '',
        tpi_claim: client.tpInsurance?.tpi_claim || '',
        vdamage_liability: client.tpInsurance?.vdamage_liability || '',
        vdamage_insurd: client.tpInsurance?.vdamage_insurd || '',
        vdamage_ndriver: client.tpInsurance?.vdamage_ndriver || '',
        vdamage_rques: client.tpInsurance?.vdamage_rques || '',
        // TPD Driver fields
        tpd_driver: client.tpdDriver?.tpd_driver || '',
        tpd_fname: client.tpdDriver?.tpd_fname || '',
        tpd_lname: client.tpdDriver?.tpd_lname || '',
        tpd_add: client.tpdDriver?.tpd_add || '',
        tpd_city: client.tpdDriver?.tpd_city || '',
        tpd_country: client.tpdDriver?.tpd_country || '',
        tpd_postcode: client.tpdDriver?.tpd_postcode || '',
        tpd_hometel: client.tpdDriver?.tpd_hometel || '',
        tpd_mobtel: client.tpdDriver?.tpd_mobtel || '',
        tpd_liability: client.tpdDriver?.tpd_liability || '',
        // TPS fields
        tp_title: client.tps?.tp_title || '',
        tp_fname: client.tps?.tp_fname || '',
        tp_lname: client.tps?.tp_lname || '',
        tp_address: client.tps?.tp_address || '',
        tp_city: client.tps?.tp_city || '',
        tp_country: client.tps?.tp_country || '',
        tp_postcode: client.tps?.tp_postcode || '',
        tp_hometel: client.tps?.tp_hometel || '',
        tp_mobiletel: client.tps?.tp_mobiletel || '',
        tp_email: client.tps?.tp_email || '',
        tp_desc: client.tps?.tp_desc || '',
        activetab: '#tp',
    });

    const handleDateChange = (name, value) => {
        setData(name, value);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/updateclaim', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Third Party information updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update third party information. Please check the form for errors.');
            },
        });
    };

    const insurers = partners.insurers || [];

    return (
        <form onSubmit={submit} className={`space-y-6 ${className}`}>
            {/* Form Content - Left: TP form fields, Right: Collapsible Vehicle/Insurance/Driver */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Third Party Form Fields Only */}
                <div className="space-y-4">
                    <div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <select
                                value={data.tp_title}
                                onChange={(e) => setData('tp_title', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select...</option>
                                <option value="Mr">Mr</option>
                                <option value="Ms">Ms</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                            </select>
                            <InputError message={errors.tp_title} className="mt-2" />
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={data.tp_fname}
                                    onChange={(e) => setData('tp_fname', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <InputError message={errors.tp_fname} className="mt-2" />
                            </div>
                            <div className="flex items-end">
                                <button
                                    type="button"
                                    className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md"
                                    title="More options"
                                >
                                    ...
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={data.tp_lname}
                                onChange={(e) => setData('tp_lname', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <InputError message={errors.tp_lname} className="mt-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Postcode
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={data.tp_postcode}
                                    onChange={(e) => setData('tp_postcode', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900"
                                >
                                    Get Address
                                </button>
                            </div>
                            <InputError message={errors.tp_postcode} className="mt-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select Your Addresses
                            </label>
                            <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="">Select...</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <textarea
                                value={data.tp_address}
                                onChange={(e) => setData('tp_address', e.target.value)}
                                rows={5}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <InputError message={errors.tp_address} className="mt-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                value={data.tp_city}
                                onChange={(e) => setData('tp_city', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <InputError message={errors.tp_city} className="mt-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                County
                            </label>
                            <input
                                type="text"
                                value={data.tp_country}
                                onChange={(e) => setData('tp_country', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <InputError message={errors.tp_country} className="mt-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Home Tel
                            </label>
                            <input
                                type="text"
                                value={data.tp_hometel}
                                onChange={(e) => setData('tp_hometel', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <InputError message={errors.tp_hometel} className="mt-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mobile Tel
                            </label>
                            <input
                                type="text"
                                value={data.tp_mobiletel}
                                onChange={(e) => setData('tp_mobiletel', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <InputError message={errors.tp_mobiletel} className="mt-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.tp_email}
                                onChange={(e) => setData('tp_email', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <InputError message={errors.tp_email} className="mt-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={data.tp_desc}
                                onChange={(e) => setData('tp_desc', e.target.value)}
                                rows={5}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <InputError message={errors.tp_desc} className="mt-2" />
                        </div>
                    </div>
                </div>

                {/* Right Column - Collapsible sections for Vehicle, Insurance, Driver */}
                <div className="space-y-4">
                    {/* Vehicle Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => setExpandedRightSections(prev => ({ ...prev, vehicle: !prev.vehicle }))}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Vehicle</span>
                            <span>{expandedRightSections.vehicle ? '−' : '+'}</span>
                        </button>
                        {expandedRightSections.vehicle && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Reg
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpVehicle?.tpv_reg || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Make
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpVehicle?.tpv_make || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Model
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpVehicle?.tpv_model || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Body Type
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpVehicle?.tpv_btype || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Colour
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpVehicle?.tpv_color || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fuel Type
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpVehicle?.tpv_ftype || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Reg Date
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpVehicle?.tpv_regdate ? (() => {
                                                const date = new Date(client.tpVehicle.tpv_regdate);
                                                const day = String(date.getDate()).padStart(2, '0');
                                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                                const year = date.getFullYear();
                                                return `${day}/${month}/${year}`;
                                            })() : ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            No Of Occupants
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpVehicle?.tpv_nooccu || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Damage
                                        </label>
                                        <textarea
                                            value={client.tpVehicle?.tpv_damage || ''}
                                            readOnly
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Other Details
                                        </label>
                                        <textarea
                                            value={client.tpVehicle?.tpv_details || ''}
                                            readOnly
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Insurance Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => setExpandedRightSections(prev => ({ ...prev, insurance: !prev.insurance }))}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Insurance</span>
                            <span>{expandedRightSections.insurance ? '−' : '+'}</span>
                        </button>
                        {expandedRightSections.insurance && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Insurer
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpInsurance?.tpi_insurer || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Contact Details
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpInsurance?.tpi_cdetails || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            TP Insurance
                                        </label>
                                        <textarea
                                            value={client.tpInsurance?.tpi_tpin || ''}
                                            readOnly
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Policy Number
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpInsurance?.tpi_policy || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Claim Number
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpInsurance?.tpi_claim || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Liability
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpInsurance?.vdamage_liability || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Insured
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpInsurance?.vdamage_insurd || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Named Driver
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpInsurance?.vdamage_ndriver || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Reason Question
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpInsurance?.vdamage_rques || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Driver Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => setExpandedRightSections(prev => ({ ...prev, driver: !prev.driver }))}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Driver</span>
                            <span>{expandedRightSections.driver ? '−' : '+'}</span>
                        </button>
                        {expandedRightSections.driver && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpdDriver?.tpd_driver || client.tps?.tp_title || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpdDriver?.tpd_fname || client.tps?.tp_fname || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpdDriver?.tpd_lname || client.tps?.tp_lname || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Postcode
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpdDriver?.tpd_postcode || client.tps?.tp_postcode || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address
                                        </label>
                                        <textarea
                                            value={client.tpdDriver?.tpd_add || client.tps?.tp_address || ''}
                                            readOnly
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpdDriver?.tpd_city || client.tps?.tp_city || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            County
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpdDriver?.tpd_country || client.tps?.tp_country || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Home Tel
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpdDriver?.tpd_hometel || client.tps?.tp_hometel || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mobile Tel
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpdDriver?.tpd_mobtel || client.tps?.tp_mobiletel || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Liability
                                        </label>
                                        <input
                                            type="text"
                                            value={client.tpdDriver?.tpd_liability || ''}
                                            readOnly
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                                        />
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
        </form>
    );
}
