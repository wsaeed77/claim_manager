import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import Datepicker from 'react-tailwindcss-datepicker';

export default function PiForm({ client, className = '' }) {
    const [expandedSections, setExpandedSections] = useState({
        rehabilitation: true,
        hospital: false,
        gp: false,
        medicalReport: false,
    });

    // Parse injury types from pi_injtype (assuming comma-separated)
    const injuryTypes = client.pi?.pi_injtype ? client.pi.pi_injtype.split(',').map(t => t.trim()).filter(t => t) : [];
    const injuryTypeOptions = ['Wiplash', 'Other'];

    const { data, setData, post, processing, errors } = useForm({
        claimid: client.id,
        // PI fields - Injury and Medical Details
        pi_injtype: client.pi?.pi_injtype || '',
        pi_desc: client.pi?.pi_desc || '',
        pi_timeoff: client.pi?.pi_timeoff || '',
        pi_stimeoff: client.pi?.pi_stimeoff || '',
        pi_daysoff: client.pi?.pi_daysoff || '',
        pi_mattent: client.pi?.pi_mattent || '',
        pi_medfdate: client.pi?.pi_medfdate ? (typeof client.pi.pi_medfdate === 'string' ? client.pi.pi_medfdate : client.pi.pi_medfdate.split('T')[0]) : null,
        pi_hosp: client.pi?.pi_hosp || '',
        pi_hospfdate: client.pi?.pi_hospfdate ? (typeof client.pi.pi_hospfdate === 'string' ? client.pi.pi_hospfdate : client.pi.pi_hospfdate.split('T')[0]) : null,
        pi_overnight: client.pi?.pi_overnight || '',
        pi_hospdays: client.pi?.pi_hospdays || '',
        // Rehab fields
        pire_med: client.rehab?.pire_med || '',
        pire_meddetails: client.rehab?.pire_meddetails || '',
        pire_provider: client.rehab?.pire_provider || '',
        pire_rehabc: client.rehab?.pire_rehabc || '',
        pire_rehabcdd: client.rehab?.pire_rehabcdd || '',
        // PIMD fields
        pimd_dad: client.pimd?.pimd_dad ? (typeof client.pimd.pimd_dad === 'string' ? client.pimd.pimd_dad : client.pimd.pimd_dad.split('T')[0]) : null,
        pimd_status: client.pimd?.pimd_status || '',
        pimd_note: client.pimd?.pimd_note || '',
        // PIGP fields
        pigp_gp: client.pigp?.pigp_gp || '',
        pigp_name: client.pigp?.pigp_name || '',
        pigp_add: client.pigp?.pigp_add || '',
        pigp_city: client.pigp?.pigp_city || '',
        pigp_country: client.pigp?.pigp_country || '',
        pigp_postcode: client.pigp?.pigp_postcode || '',
        pigp_tel: client.pigp?.pigp_tel || '',
        pigp_fax: client.pigp?.pigp_fax || '',
        pigp_ref: client.pigp?.pigp_ref || '',
        pigp_note: client.pigp?.pigp_note || '',
        // PiHospital fields
        pihos_hosp: client.pihospitals?.pihos_hosp || '',
        pihos_name: client.pihospitals?.pihos_name || '',
        pihos_add: client.pihospitals?.pihos_add || '',
        pihos_city: client.pihospitals?.pihos_city || '',
        pihos_country: client.pihospitals?.pihos_country || '',
        pihos_postcode: client.pihospitals?.pihos_postcode || '',
        pihos_tel: client.pihospitals?.pihos_tel || '',
        pihos_fax: client.pihospitals?.pihos_fax || '',
        pihos_ref: client.pihospitals?.pihos_ref || '',
        pihos_note: client.pihospitals?.pihos_note || '',
        activetab: '#pi',
    });

    const handleInjuryTypeToggle = (type) => {
        const currentTypes = data.pi_injtype ? data.pi_injtype.split(',').map(t => t.trim()).filter(t => t) : [];
        if (currentTypes.includes(type)) {
            const newTypes = currentTypes.filter(t => t !== type);
            setData('pi_injtype', newTypes.join(','));
        } else {
            setData('pi_injtype', [...currentTypes, type].join(','));
        }
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleDateChange = (name, newValue) => {
        setData(name, newValue.startDate);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('home.updateclaim'), {
            preserveScroll: true,
            onSuccess: () => {
                // Optionally show a success message
            },
        });
    };

    const injuryTypesArray = data.pi_injtype ? data.pi_injtype.split(',').map(t => t.trim()).filter(t => t) : [];

    return (
        <form onSubmit={submit} className={`space-y-6 ${className}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Injury And Medical Details */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Injury And Medical Details</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kind Of Injuries?
                        </label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {injuryTypeOptions.map((type) => {
                                const isSelected = injuryTypesArray.includes(type);
                                return (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => handleInjuryTypeToggle(type)}
                                        className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                            isSelected
                                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {type}
                                        {isSelected && (
                                            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <InputError message={errors.pi_injtype} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description Of Injuries?
                        </label>
                        <textarea
                            id="pi_desc"
                            rows={3}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.pi_desc}
                            onChange={(e) => setData('pi_desc', e.target.value)}
                        ></textarea>
                        <InputError message={errors.pi_desc} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Time Off Work?
                        </label>
                        <select
                            id="pi_timeoff"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.pi_timeoff}
                            onChange={(e) => setData('pi_timeoff', e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <InputError message={errors.pi_timeoff} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Still Off From Work?
                        </label>
                        <select
                            id="pi_stimeoff"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.pi_stimeoff}
                            onChange={(e) => setData('pi_stimeoff', e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <InputError message={errors.pi_stimeoff} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            No. Of Days Off Work?
                        </label>
                        <input
                            id="pi_daysoff"
                            type="number"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.pi_daysoff}
                            onChange={(e) => setData('pi_daysoff', e.target.value)}
                        />
                        <InputError message={errors.pi_daysoff} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Attended GP?
                        </label>
                        <select
                            id="pi_mattent"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.pi_mattent}
                            onChange={(e) => setData('pi_mattent', e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <InputError message={errors.pi_mattent} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date Of Attendance?
                        </label>
                        <Datepicker
                            primaryColor={"indigo"}
                            value={{ startDate: data.pi_medfdate, endDate: data.pi_medfdate }}
                            onChange={(newValue) => handleDateChange('pi_medfdate', newValue)}
                            asSingle={true}
                            useRange={false}
                            inputClassName="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <InputError message={errors.pi_medfdate} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Attended Hospital?
                        </label>
                        <select
                            id="pi_hosp"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.pi_hosp}
                            onChange={(e) => setData('pi_hosp', e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <InputError message={errors.pi_hosp} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date Of Attendance?
                        </label>
                        <Datepicker
                            primaryColor={"indigo"}
                            value={{ startDate: data.pi_hospfdate, endDate: data.pi_hospfdate }}
                            onChange={(newValue) => handleDateChange('pi_hospfdate', newValue)}
                            asSingle={true}
                            useRange={false}
                            inputClassName="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <InputError message={errors.pi_hospfdate} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stay Over Night?
                        </label>
                        <select
                            id="pi_overnight"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.pi_overnight}
                            onChange={(e) => setData('pi_overnight', e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <InputError message={errors.pi_overnight} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            How Many Days?
                        </label>
                        <input
                            id="pi_hospdays"
                            type="number"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.pi_hospdays}
                            onChange={(e) => setData('pi_hospdays', e.target.value)}
                        />
                        <InputError message={errors.pi_hospdays} className="mt-2" />
                    </div>
                </div>

                {/* Right Column - Collapsible Sections */}
                <div className="space-y-2">
                    {/* Rehabilitation Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => toggleSection('rehabilitation')}
                            className="w-full flex items-center justify-between p-4 text-left"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">Rehabilitation</h3>
                            <span className="text-gray-500">
                                {expandedSections.rehabilitation ? '−' : '+'}
                            </span>
                        </button>

                        {expandedSections.rehabilitation && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Has The Medical Professional Recommended The Claimant Should Undertake Any Rehabilitation Such As Physiotherapy?
                                    </label>
                                    <select
                                        id="pire_med"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.pire_med}
                                        onChange={(e) => setData('pire_med', e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                    <InputError message={errors.pire_med} className="mt-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        If Yes Please Provide Brief Details Of The Rehabilitation Treatment Recommended And Any Treatment Provided Including Name Of Provider?
                                    </label>
                                    <textarea
                                        id="pire_meddetails"
                                        rows={4}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.pire_meddetails}
                                        onChange={(e) => setData('pire_meddetails', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.pire_meddetails} className="mt-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Rehab Provider
                                    </label>
                                    <input
                                        id="pire_provider"
                                        type="text"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.pire_provider}
                                        onChange={(e) => setData('pire_provider', e.target.value)}
                                    />
                                    <InputError message={errors.pire_provider} className="mt-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Are You Aware Of Any Rehabilitation Need That The Claimant Has Arising Out Of Accident?
                                    </label>
                                    <select
                                        id="pire_rehabc"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.pire_rehabc}
                                        onChange={(e) => setData('pire_rehabc', e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                    <InputError message={errors.pire_rehabc} className="mt-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        If Yes Please Provide Brief Details
                                    </label>
                                    <textarea
                                        id="pire_rehabcdd"
                                        rows={4}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.pire_rehabcdd}
                                        onChange={(e) => setData('pire_rehabcdd', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.pire_rehabcdd} className="mt-2" />
                                </div>
                            </div>
                        )}
                    </div>
                        {/* Hospital Section */}
                        <div className="border border-blue-500 rounded-lg bg-blue-50">
                            <button
                                type="button"
                                onClick={() => toggleSection('hospital')}
                                className="w-full flex items-center justify-between p-4 text-left"
                            >
                                <h4 className="text-md font-semibold text-gray-900">Hospital</h4>
                                <span className="text-gray-500">
                                    {expandedSections.hospital ? '−' : '+'}
                                </span>
                            </button>

                            {expandedSections.hospital && (
                                <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Hospital
                                            </label>
                                            <input
                                                id="pihos_hosp"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pihos_hosp}
                                                onChange={(e) => setData('pihos_hosp', e.target.value)}
                                            />
                                            <InputError message={errors.pihos_hosp} className="mt-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name
                                            </label>
                                            <input
                                                id="pihos_name"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pihos_name}
                                                onChange={(e) => setData('pihos_name', e.target.value)}
                                            />
                                            <InputError message={errors.pihos_name} className="mt-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address
                                        </label>
                                        <textarea
                                            id="pihos_add"
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={data.pihos_add}
                                            onChange={(e) => setData('pihos_add', e.target.value)}
                                        ></textarea>
                                        <InputError message={errors.pihos_add} className="mt-2" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City
                                            </label>
                                            <input
                                                id="pihos_city"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pihos_city}
                                                onChange={(e) => setData('pihos_city', e.target.value)}
                                            />
                                            <InputError message={errors.pihos_city} className="mt-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Country
                                            </label>
                                            <input
                                                id="pihos_country"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pihos_country}
                                                onChange={(e) => setData('pihos_country', e.target.value)}
                                            />
                                            <InputError message={errors.pihos_country} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Postcode
                                            </label>
                                            <input
                                                id="pihos_postcode"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pihos_postcode}
                                                onChange={(e) => setData('pihos_postcode', e.target.value)}
                                            />
                                            <InputError message={errors.pihos_postcode} className="mt-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Telephone
                                            </label>
                                            <input
                                                id="pihos_tel"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pihos_tel}
                                                onChange={(e) => setData('pihos_tel', e.target.value)}
                                            />
                                            <InputError message={errors.pihos_tel} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Fax
                                            </label>
                                            <input
                                                id="pihos_fax"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pihos_fax}
                                                onChange={(e) => setData('pihos_fax', e.target.value)}
                                            />
                                            <InputError message={errors.pihos_fax} className="mt-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Reference
                                            </label>
                                            <input
                                                id="pihos_ref"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pihos_ref}
                                                onChange={(e) => setData('pihos_ref', e.target.value)}
                                            />
                                            <InputError message={errors.pihos_ref} className="mt-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Notes
                                        </label>
                                        <textarea
                                            id="pihos_note"
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={data.pihos_note}
                                            onChange={(e) => setData('pihos_note', e.target.value)}
                                        ></textarea>
                                        <InputError message={errors.pihos_note} className="mt-2" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* GP Section */}
                        <div className="border border-blue-500 rounded-lg bg-blue-50">
                            <button
                                type="button"
                                onClick={() => toggleSection('gp')}
                                className="w-full flex items-center justify-between p-4 text-left"
                            >
                                <h4 className="text-md font-semibold text-gray-900">GP</h4>
                                <span className="text-gray-500">
                                    {expandedSections.gp ? '−' : '+'}
                                </span>
                            </button>

                            {expandedSections.gp && (
                                <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                GP
                                            </label>
                                            <input
                                                id="pigp_gp"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pigp_gp}
                                                onChange={(e) => setData('pigp_gp', e.target.value)}
                                            />
                                            <InputError message={errors.pigp_gp} className="mt-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name
                                            </label>
                                            <input
                                                id="pigp_name"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pigp_name}
                                                onChange={(e) => setData('pigp_name', e.target.value)}
                                            />
                                            <InputError message={errors.pigp_name} className="mt-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address
                                        </label>
                                        <textarea
                                            id="pigp_add"
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={data.pigp_add}
                                            onChange={(e) => setData('pigp_add', e.target.value)}
                                        ></textarea>
                                        <InputError message={errors.pigp_add} className="mt-2" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City
                                            </label>
                                            <input
                                                id="pigp_city"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pigp_city}
                                                onChange={(e) => setData('pigp_city', e.target.value)}
                                            />
                                            <InputError message={errors.pigp_city} className="mt-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Country
                                            </label>
                                            <input
                                                id="pigp_country"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pigp_country}
                                                onChange={(e) => setData('pigp_country', e.target.value)}
                                            />
                                            <InputError message={errors.pigp_country} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Postcode
                                            </label>
                                            <input
                                                id="pigp_postcode"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pigp_postcode}
                                                onChange={(e) => setData('pigp_postcode', e.target.value)}
                                            />
                                            <InputError message={errors.pigp_postcode} className="mt-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Telephone
                                            </label>
                                            <input
                                                id="pigp_tel"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pigp_tel}
                                                onChange={(e) => setData('pigp_tel', e.target.value)}
                                            />
                                            <InputError message={errors.pigp_tel} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Fax
                                            </label>
                                            <input
                                                id="pigp_fax"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pigp_fax}
                                                onChange={(e) => setData('pigp_fax', e.target.value)}
                                            />
                                            <InputError message={errors.pigp_fax} className="mt-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Reference
                                            </label>
                                            <input
                                                id="pigp_ref"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pigp_ref}
                                                onChange={(e) => setData('pigp_ref', e.target.value)}
                                            />
                                            <InputError message={errors.pigp_ref} className="mt-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Notes
                                        </label>
                                        <textarea
                                            id="pigp_note"
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={data.pigp_note}
                                            onChange={(e) => setData('pigp_note', e.target.value)}
                                        ></textarea>
                                        <InputError message={errors.pigp_note} className="mt-2" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Medical Report Section */}
                        <div className="border border-blue-500 rounded-lg bg-blue-50">
                            <button
                                type="button"
                                onClick={() => toggleSection('medicalReport')}
                                className="w-full flex items-center justify-between p-4 text-left"
                            >
                                <h4 className="text-md font-semibold text-gray-900">Medical Report</h4>
                                <span className="text-gray-500">
                                    {expandedSections.medicalReport ? '−' : '+'}
                                </span>
                            </button>

                            {expandedSections.medicalReport && (
                                <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Date of Appointment
                                            </label>
                                            <Datepicker
                                                primaryColor={"indigo"}
                                                value={{ startDate: data.pimd_dad, endDate: data.pimd_dad }}
                                                onChange={(newValue) => handleDateChange('pimd_dad', newValue)}
                                                asSingle={true}
                                                useRange={false}
                                                inputClassName="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            <InputError message={errors.pimd_dad} className="mt-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <input
                                                id="pimd_status"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.pimd_status}
                                                onChange={(e) => setData('pimd_status', e.target.value)}
                                            />
                                            <InputError message={errors.pimd_status} className="mt-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Notes
                                        </label>
                                        <textarea
                                            id="pimd_note"
                                            rows={4}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={data.pimd_note}
                                            onChange={(e) => setData('pimd_note', e.target.value)}
                                        ></textarea>
                                        <InputError message={errors.pimd_note} className="mt-2" />
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
