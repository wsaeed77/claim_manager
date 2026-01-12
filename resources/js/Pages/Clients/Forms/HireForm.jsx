import React, { useState } from 'react';
import { useForm, router, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import Datepicker from 'react-tailwindcss-datepicker';

export default function HireForm({ client, partners, className = '' }) {
    const [expandedSections, setExpandedSections] = useState({
        hireDetails: false,
        mileageCostDeductions: false,
        pcns: false,
    });

    const { data, setData, post, processing, errors } = useForm({
        claimid: client.id,
        // Hire table fields
        hire_req: client.hire?.hire_req || '',
        hire_alter: client.hire?.hire_alter || '',
        hire_ongoing: client.hire?.hire_ongoing || '',
        hire_provider: client.hire?.hire_provider || '',
        hire_vehicle_type: client.hire?.hire_vehicle_type || '',
        hire_ref: client.hire?.hire_ref || '',
        hire_sdate: client.hire?.hire_sdate ? (typeof client.hire.hire_sdate === 'string' ? client.hire.hire_sdate : client.hire.hire_sdate.split('T')[0]) : null,
        hire_edate: client.hire?.hire_edate ? (typeof client.hire.hire_edate === 'string' ? client.hire.hire_edate : client.hire.hire_edate.split('T')[0]) : null,
        hire_reg: client.hire?.hire_reg || '',
        hire_make: client.hire?.hire_make || '',
        hire_model: client.hire?.hire_model || '',
        hire_cc: client.hire?.hire_cc || '',
        hire_diveh: client.hire?.hire_diveh || '',
        hire_knr: client.hire?.hire_knr || '',
        hire_cd: client.hire?.hire_cd || '',
        // Hire HD fields
        hirehd_agreement: client.hireHd?.hirehd_agreement || '',
        hirehd_status: client.hireHd?.hirehd_status || '',
        hirehd_rate: client.hireHd?.hirehd_rate || '',
        hirehd_ddate: client.hireHd?.hirehd_ddate ? (typeof client.hireHd.hirehd_ddate === 'string' ? client.hireHd.hirehd_ddate : client.hireHd.hirehd_ddate.split('T')[0]) : null,
        hirehd_cdate: client.hireHd?.hirehd_cdate ? (typeof client.hireHd.hirehd_cdate === 'string' ? client.hireHd.hirehd_cdate : client.hireHd.hirehd_cdate.split('T')[0]) : null,
        hirehd_edate: client.hireHd?.hirehd_edate ? (typeof client.hireHd.hirehd_edate === 'string' ? client.hireHd.hirehd_edate : client.hireHd.hirehd_edate.split('T')[0]) : null,
        hirehd_colection: client.hireHd?.hirehd_colection ? (typeof client.hireHd.hirehd_colection === 'string' ? client.hireHd.hirehd_colection : client.hireHd.hirehd_colection.split('T')[0]) : null,
        hirehd_hirety: client.hireHd?.hirehd_hirety || '',
        hirehd_sd: client.hireHd?.hirehd_sd || '',
        hirehd_note: client.hireHd?.hirehd_note || '',
        hirehd_dby: client.hireHd?.hirehd_dby || '',
        hirehd_reto: client.hireHd?.hirehd_reto || '',
        hirehd_addedby: client.hireHd?.hirehd_addedby || '',
        hirehd_collectedby: client.hireHd?.hirehd_collectedby || '',
        activetab: '#hire',
    });

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
        post('/updateclaim', {
            preserveScroll: true,
            onSuccess: () => {
                // Optionally show a success message
            },
        });
    };

    const hireCompanies = partners.hireCompanies || [];

    return (
        <form onSubmit={submit} className={`space-y-6 ${className}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - General Hire Information */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hire Required ?
                        </label>
                        <select
                            id="hire_req"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.hire_req}
                            onChange={(e) => setData('hire_req', e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <InputError message={errors.hire_req} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Already On Hire ?
                        </label>
                        <select
                            id="hire_alter"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.hire_alter}
                            onChange={(e) => setData('hire_alter', e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <InputError message={errors.hire_alter} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hire On Going?
                        </label>
                        <select
                            id="hire_ongoing"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.hire_ongoing}
                            onChange={(e) => setData('hire_ongoing', e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <InputError message={errors.hire_ongoing} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Provider
                        </label>
                        <div className="flex gap-2">
                            <select
                                id="hire_provider"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={data.hire_provider}
                                onChange={(e) => setData('hire_provider', e.target.value)}
                            >
                                <option value="">Select...</option>
                                {hireCompanies.map(company => (
                                    <option key={company.id} value={company.id}>{company.name}</option>
                                ))}
                            </select>
                            <Link
                                href="/partners?type=hire-company"
                                className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 whitespace-nowrap"
                            >
                                Add
                            </Link>
                            {data.hire_provider && (
                                <Link
                                    href={`/partners/${data.hire_provider}`}
                                    className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 whitespace-nowrap"
                                >
                                    Detail
                                </Link>
                            )}
                        </div>
                        <InputError message={errors.hire_provider} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Vehicle Type
                        </label>
                        <select
                            id="hire_vehicle_type"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.hire_vehicle_type}
                            onChange={(e) => setData('hire_vehicle_type', e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="Minor">Minor</option>
                            <option value="Taxi">Taxi</option>
                            <option value="Prestige">Prestige</option>
                            <option value="Standard">Standard</option>
                        </select>
                        <InputError message={errors.hire_vehicle_type} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reference
                        </label>
                        <input
                            id="hire_ref"
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.hire_ref}
                            onChange={(e) => setData('hire_ref', e.target.value)}
                        />
                        <InputError message={errors.hire_ref} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                        </label>
                        <div className="flex gap-2">
                            <Datepicker
                                primaryColor={"indigo"}
                                value={{ startDate: data.hire_sdate, endDate: data.hire_sdate }}
                                onChange={(newValue) => handleDateChange('hire_sdate', newValue)}
                                asSingle={true}
                                useRange={false}
                                inputClassName="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <input
                                type="checkbox"
                                className="mt-2"
                            />
                        </div>
                        <InputError message={errors.hire_sdate} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                        </label>
                        <div className="flex gap-2">
                            <Datepicker
                                primaryColor={"indigo"}
                                value={{ startDate: data.hire_edate, endDate: data.hire_edate }}
                                onChange={(newValue) => handleDateChange('hire_edate', newValue)}
                                asSingle={true}
                                useRange={false}
                                inputClassName="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <input
                                type="checkbox"
                                className="mt-2"
                            />
                        </div>
                        <InputError message={errors.hire_edate} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reg.
                        </label>
                        <input
                            id="hire_reg"
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.hire_reg}
                            onChange={(e) => setData('hire_reg', e.target.value)}
                        />
                        <InputError message={errors.hire_reg} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Make
                        </label>
                        <input
                            id="hire_make"
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.hire_make}
                            onChange={(e) => setData('hire_make', e.target.value)}
                        />
                        <InputError message={errors.hire_make} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Model
                        </label>
                        <input
                            id="hire_model"
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.hire_model}
                            onChange={(e) => setData('hire_model', e.target.value)}
                        />
                        <InputError message={errors.hire_model} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            CC
                        </label>
                        <input
                            id="hire_cc"
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.hire_cc}
                            onChange={(e) => setData('hire_cc', e.target.value)}
                        />
                        <InputError message={errors.hire_cc} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            TP Provided By Hire ?
                        </label>
                        <select
                            id="hire_diveh"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.hire_diveh}
                            onChange={(e) => setData('hire_diveh', e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <InputError message={errors.hire_diveh} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            If Yes, What Kind Of Vehicle Require
                        </label>
                        <input
                            id="hire_knr"
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.hire_knr}
                            onChange={(e) => setData('hire_knr', e.target.value)}
                        />
                        <InputError message={errors.hire_knr} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Details
                        </label>
                        <input
                            id="hire_cd"
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.hire_cd}
                            onChange={(e) => setData('hire_cd', e.target.value)}
                        />
                        <InputError message={errors.hire_cd} className="mt-2" />
                    </div>
                </div>

                {/* Right Column - Collapsible Sections */}
                <div className="space-y-2">
                    {/* Hire Details Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => toggleSection('hireDetails')}
                            className="w-full flex items-center justify-between p-4 text-left"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">Hire Details</h3>
                            <span className="text-gray-500">
                                {expandedSections.hireDetails ? '−' : '+'}
                            </span>
                        </button>

                        {expandedSections.hireDetails && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Left Column */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Agreement Number
                                            </label>
                                            <input
                                                id="hirehd_agreement"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.hirehd_agreement}
                                                onChange={(e) => setData('hirehd_agreement', e.target.value)}
                                            />
                                            <InputError message={errors.hirehd_agreement} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <input
                                                id="hirehd_status"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.hirehd_status}
                                                onChange={(e) => setData('hirehd_status', e.target.value)}
                                            />
                                            <InputError message={errors.hirehd_status} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Hire Rate
                                            </label>
                                            <input
                                                id="hirehd_rate"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.hirehd_rate}
                                                onChange={(e) => setData('hirehd_rate', e.target.value)}
                                            />
                                            <InputError message={errors.hirehd_rate} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Delivery Date
                                            </label>
                                            <Datepicker
                                                primaryColor={"indigo"}
                                                value={{ startDate: data.hirehd_ddate, endDate: data.hirehd_ddate }}
                                                onChange={(newValue) => handleDateChange('hirehd_ddate', newValue)}
                                                asSingle={true}
                                                useRange={false}
                                                inputClassName="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            <InputError message={errors.hirehd_ddate} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Agreed Collection Date
                                            </label>
                                            <Datepicker
                                                primaryColor={"indigo"}
                                                value={{ startDate: data.hirehd_cdate, endDate: data.hirehd_cdate }}
                                                onChange={(newValue) => handleDateChange('hirehd_cdate', newValue)}
                                                asSingle={true}
                                                useRange={false}
                                                inputClassName="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            <InputError message={errors.hirehd_cdate} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Hire End Date
                                            </label>
                                            <Datepicker
                                                primaryColor={"indigo"}
                                                value={{ startDate: data.hirehd_edate, endDate: data.hirehd_edate }}
                                                onChange={(newValue) => handleDateChange('hirehd_edate', newValue)}
                                                asSingle={true}
                                                useRange={false}
                                                inputClassName="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            <InputError message={errors.hirehd_edate} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Collection Date/Time
                                            </label>
                                            <Datepicker
                                                primaryColor={"indigo"}
                                                value={{ startDate: data.hirehd_colection, endDate: data.hirehd_colection }}
                                                onChange={(newValue) => handleDateChange('hirehd_colection', newValue)}
                                                asSingle={true}
                                                useRange={false}
                                                inputClassName="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            <InputError message={errors.hirehd_colection} className="mt-2" />
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Hire Type
                                            </label>
                                            <input
                                                id="hirehd_hirety"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.hirehd_hirety}
                                                onChange={(e) => setData('hirehd_hirety', e.target.value)}
                                            />
                                            <InputError message={errors.hirehd_hirety} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Service Details
                                            </label>
                                            <input
                                                id="hirehd_sd"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.hirehd_sd}
                                                onChange={(e) => setData('hirehd_sd', e.target.value)}
                                            />
                                            <InputError message={errors.hirehd_sd} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Note
                                            </label>
                                            <input
                                                id="hirehd_note"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.hirehd_note}
                                                onChange={(e) => setData('hirehd_note', e.target.value)}
                                            />
                                            <InputError message={errors.hirehd_note} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Delivered By
                                            </label>
                                            <input
                                                id="hirehd_dby"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.hirehd_dby}
                                                onChange={(e) => setData('hirehd_dby', e.target.value)}
                                            />
                                            <InputError message={errors.hirehd_dby} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                To Be Returned To
                                            </label>
                                            <input
                                                id="hirehd_reto"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.hirehd_reto}
                                                onChange={(e) => setData('hirehd_reto', e.target.value)}
                                            />
                                            <InputError message={errors.hirehd_reto} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Added By
                                            </label>
                                            <input
                                                id="hirehd_addedby"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.hirehd_addedby}
                                                onChange={(e) => setData('hirehd_addedby', e.target.value)}
                                            />
                                            <InputError message={errors.hirehd_addedby} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Collected By
                                            </label>
                                            <input
                                                id="hirehd_collectedby"
                                                type="text"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={data.hirehd_collectedby}
                                                onChange={(e) => setData('hirehd_collectedby', e.target.value)}
                                            />
                                            <InputError message={errors.hirehd_collectedby} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mileage/Cost/Deductions Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => toggleSection('mileageCostDeductions')}
                            className="w-full flex items-center justify-between p-4 text-left"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">Mileage/Cost/Deductions</h3>
                            <span className="text-gray-500">
                                {expandedSections.mileageCostDeductions ? '−' : '+'}
                            </span>
                        </button>

                        {expandedSections.mileageCostDeductions && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <p className="text-sm text-gray-500">Mileage/Cost/Deductions fields will be implemented here.</p>
                            </div>
                        )}
                    </div>

                    {/* PCNs Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => toggleSection('pcns')}
                            className="w-full flex items-center justify-between p-4 text-left"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">PCNs</h3>
                            <span className="text-gray-500">
                                {expandedSections.pcns ? '−' : '+'}
                            </span>
                        </button>

                        {expandedSections.pcns && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <p className="text-sm text-gray-500">PCNs fields will be implemented here.</p>
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
