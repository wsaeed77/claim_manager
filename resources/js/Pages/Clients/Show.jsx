import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { useState } from 'react';
import VehicleForm from './Forms/VehicleForm';
import TpForm from './Forms/TpForm';
import AccidentForm from './Forms/AccidentForm';
import HireForm from './Forms/HireForm';
import PiForm from './Forms/PiForm';
import NotesTab from './Forms/NotesTab';
import PaymentsTab from './Forms/PaymentsTab';

export default function ClientsShow({ client, caseOrders, partners, handlers, users, auth }) {
    const [activeTab, setActiveTab] = useState('client');
    const [expandedSections, setExpandedSections] = useState({
        claim: true,
        claimType: true,
        driverPassenger: true,
        solicitors: false,
    });

    // Parse claim_type from comma-separated string to array
    const claimTypesArray = client.claim?.claim_type 
        ? client.claim.claim_type.split(',').map(t => t.trim()).filter(t => t)
        : [];

    const { data, setData, post, processing, errors } = useForm({
        claimid: client.id,
        case_no: client.case_no || '',
        case_order: client.case_order || 1,
        case_ref: client.case_ref || '',
        client_title: client.client_title || '',
        client_type: client.client_type || '',
        client_fname: client.client_fname || '',
        client_lname: client.client_lname || '',
        client_address: client.client_address || '',
        client_city: client.client_city || '',
        client_country: client.client_country || '',
        client_postcode: client.client_postcode || '',
        client_hometel: client.client_hometel || '',
        client_worktel: client.client_worktel || '',
        client_mobile: client.client_mobile || '',
        client_email: client.client_email || '',
        client_cooperation: client.client_cooperation || '',
        // Claim fields
        claim_dob: client.claim?.claim_dob || '',
        claim_occupation: client.claim?.claim_occupation || '',
        claim_ni: client.claim?.claim_ni || '',
        claim_rni: client.claim?.claim_rni || '',
        claim_sdate: client.claim?.claim_sdate || '',
        claim_ldate: client.claim?.claim_ldate || '',
        claim_status: client.claim?.claim_status || 'Pending',
        claim_dreason: client.claim?.claim_dreason || '',
        case_advisor: client.claim?.case_advisor || '',
        claim_category: client.claim?.claim_category || '',
        claim_type: claimTypesArray,
        claim_odetails: client.claim?.claim_odetails || '',
        // Agent fields
        agent_name: client.agent?.agent_name || '',
        host_co: client.agent?.host_co || '',
        // Driver/Passenger fields
        driver_title: client.driver?.driver_title || '',
        driver_fname: client.driver?.driver_fname || '',
        driver_lname: client.driver?.driver_lname || '',
        driver_passenger: client.driver?.driver_passenger || '',
        passenger_position: client.driver?.passenger_position || '',
        is_owner: client.driver?.is_owner || '',
        fault: client.driver?.fault || '',
        // Solicitor fields
        solicitors_name: client.solicitor?.solicitors_name || '',
        solicitors_datesent: client.solicitor?.solicitors_datesent || '',
        solicitors_dateaccepted: client.solicitor?.solicitors_dateaccepted || '',
        solicitors_reference: client.solicitor?.solicitors_reference || '',
        solicitors_fhandler: client.solicitor?.solicitors_fhandler || '',
        solicitors_email: client.solicitor?.solicitors_email || '',
        solicitors_tel: client.solicitor?.solicitors_tel || '',
        solicitors_invstatus: client.solicitor?.solicitors_invstatus || 'Not Ready For invoice',
        solicitors_invsdate: client.solicitor?.solicitors_invsdate || '',
        solicitors_invpdate: client.solicitor?.solicitors_invpdate || '',
        solicitors_notes: client.solicitor?.solicitors_notes || '',
        solicitors_providers: client.solicitor?.solicitors_providers || '',
        solicitors_dstatus: client.solicitor?.solicitors_dstatus || 'Not Sent',
        solicitors_dscdate: client.solicitor?.solicitors_dscdate || '',
        solicitors_dssate: client.solicitor?.solicitors_dssate || '',
        solicitors_dhandler: client.solicitor?.solicitors_dhandler || '',
        solicitors_leico: client.solicitor?.solicitors_leico || '',
        solicitors_ate_provider: client.solicitor?.solicitors_ate_provider || '',
        solicitors_ate_cstatus: client.solicitor?.solicitors_ate_cstatus || '',
        activetab: activeTab === 'client' ? '#client' : '',
    });

    const tabs = [
        { name: 'Client', id: 'client' },
        { name: 'Vehicle', id: 'vehicle' },
        { name: 'TP', id: 'tp' },
        { name: 'Accident', id: 'accident' },
        { name: 'Hire', id: 'hire' },
        { name: 'PI', id: 'pi' },
        { name: 'Notes', id: 'notes' },
        { name: 'Payments', id: 'payments' },
    ];

    const clientCooperations = [
        'Fully Cooperative',
        'Fully Non Cooperative',
        'Cooperative with Solicitors',
        'Client out of country',
        'Partial Cooperative',
        'Through Agent',
        'Non Cooperative to Agent',
    ];

    const claimStatuses = [
        'Completed', 'Declined', 'Fleet', 'Fraud', 'In House', 'Live',
        'On Hold', 'Pending', 'Referred', 'Solicitors', 'With Drawn'
    ];

    const claimCategories = [
        'RTA', 'SNT', 'IND', 'Spot Hire', 'Authorised Hire', 'Intervention',
        'Medical Negligence', 'CICA', 'Public Liability', 'Work Related',
        'Financial - PPI', 'Financial - PBA', 'Legal - Immigration',
        'Legal - Conveyancing', 'Legal - Family', 'Legal - Civil',
        'Legal - Mortgages', 'Legal - Court Disputes'
    ];

    const claimTypeOptions = [
        'Vehicle damage', 'Car hire', 'PI', 'Credit Repair', 'Loss of use',
        'Loss of earnings', 'Recovery', 'Driveable', 'Inspection', 'Storage',
        'Excess', 'Medical'
    ];

    const invoiceStatuses = [
        'Paid', 'Cancelled', 'Not Ready For invoice', 'Ready For invoice',
        'Outstanding', 'Offer in negotiation', 'Withdrawn', 'Debt Collection',
        'Clawed Back', 'OutSourced', 'Part paid', 'On Liability'
    ];

    const documentStatuses = [
        'Not Sent', 'Not Received from Solicitor', 'Received from Client',
        'Received from Solicitor', 'Received Incomplete', 'Sent CFA Missing ID',
        'Sent to Client', 'Sent to Solicitor'
    ];

    const handleClaimTypeChange = (type) => {
        const currentTypes = Array.isArray(data.claim_type) ? data.claim_type : [];
        if (currentTypes.includes(type)) {
            setData('claim_type', currentTypes.filter(t => t !== type));
        } else {
            setData('claim_type', [...currentTypes, type]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = {
            ...data,
            claim_type: Array.isArray(data.claim_type) ? data.claim_type.join(',') : data.claim_type,
            activetab: `#${activeTab}`,
        };
        post('/updateclaim', {
            preserveScroll: true,
            onSuccess: () => {
                // Optionally show success message
            },
        });
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <AppLayout title={`Client - ${client.case_no}`} auth={auth}>
            <Head title={`Client ${client.case_no}`} />
            <div>
                <div className="mb-6">
                    <Link
                        href="/"
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                        ← Back to Clients
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            {client.client_fname} {client.client_lname} Case Ref: {client.case_ref || client.case_no}
                        </h2>

                        {/* Tabs */}
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            ${activeTab === tab.id
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }
                                            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                                        `}
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-6">
                            {activeTab === 'client' && (
                                <form onSubmit={submit}>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Left Column - Client Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Client</h3>
                                            
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Case #
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.case_no}
                                                        onChange={(e) => setData('case_no', e.target.value)}
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div className="w-16">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        /
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.case_order}
                                                        onChange={(e) => setData('case_order', e.target.value)}
                                                        size="2"
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Case Ref
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.case_ref}
                                                    onChange={(e) => setData('case_ref', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Client Type
                                                </label>
                                                <select
                                                    value={data.client_type}
                                                    onChange={(e) => setData('client_type', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="individual">Individual</option>
                                                    <option value="company">Company</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Title
                                                </label>
                                                <select
                                                    value={data.client_title}
                                                    onChange={(e) => setData('client_title', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="Mr">Mr</option>
                                                    <option value="Ms">Ms</option>
                                                    <option value="Mrs">Mrs</option>
                                                    <option value="Miss">Miss</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.client_fname}
                                                    onChange={(e) => setData('client_fname', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.client_lname}
                                                    onChange={(e) => setData('client_lname', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Postcode
                                                </label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={data.client_postcode}
                                                        onChange={(e) => setData('client_postcode', e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Get Address
                                                    </button>
                                                </div>
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
                                                    value={data.client_address}
                                                    onChange={(e) => setData('client_address', e.target.value)}
                                                    rows={5}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.client_city}
                                                    onChange={(e) => setData('client_city', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    County
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.client_country}
                                                    onChange={(e) => setData('client_country', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Home Tel
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.client_hometel}
                                                    onChange={(e) => setData('client_hometel', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Work Tel
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.client_worktel}
                                                    onChange={(e) => setData('client_worktel', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Mobile
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.client_mobile}
                                                    onChange={(e) => setData('client_mobile', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={data.client_email}
                                                    onChange={(e) => setData('client_email', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Client Cooperation
                                                </label>
                                                <select
                                                    value={data.client_cooperation}
                                                    onChange={(e) => setData('client_cooperation', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option value="">Select...</option>
                                                    {clientCooperations.map(coop => (
                                                        <option key={coop} value={coop}>{coop}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Right Column - Claim Information */}
                                        <div className="space-y-4">
                                            {/* Claim Section */}
                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSection('claim')}
                                                    className="w-full flex items-center justify-between text-left"
                                                >
                                                    <h3 className="text-lg font-semibold text-gray-900">Claim</h3>
                                                    <span className="text-gray-500">
                                                        {expandedSections.claim ? '−' : '+'}
                                                    </span>
                                                </button>
                                                
                                                {expandedSections.claim && (
                                                    <div className="mt-4 space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Date Of Birth
                                                            </label>
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={data.claim_dob}
                                                                    onChange={(e) => setData('claim_dob', e.target.value)}
                                                                    placeholder="dd-mm-yyyy"
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                                <input type="checkbox" className="mt-2" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Occupation
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.claim_occupation}
                                                                onChange={(e) => setData('claim_occupation', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                NI
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.claim_ni}
                                                                onChange={(e) => setData('claim_ni', e.target.value.toUpperCase())}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm uppercase"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Reason of NI
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.claim_rni}
                                                                onChange={(e) => setData('claim_rni', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Claim Start Date
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.claim_sdate}
                                                                onChange={(e) => setData('claim_sdate', e.target.value)}
                                                                placeholder="dd-mm-yyyy"
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Live Date
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.claim_ldate}
                                                                onChange={(e) => setData('claim_ldate', e.target.value)}
                                                                placeholder="dd-mm-yyyy"
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Claim Status
                                                            </label>
                                                            <select
                                                                value={data.claim_status}
                                                                onChange={(e) => setData('claim_status', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            >
                                                                {claimStatuses.map(status => (
                                                                    <option key={status} value={status}>{status}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Reason For Decline
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.claim_dreason}
                                                                onChange={(e) => setData('claim_dreason', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Case Advisor
                                                            </label>
                                                            <select
                                                                value={data.case_advisor}
                                                                onChange={(e) => setData('case_advisor', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            >
                                                                <option value="">Select...</option>
                                                                {users && users.map(user => (
                                                                    <option key={user.id} value={user.name}>{user.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="mt-4">
                                                            <Link
                                                                href={`/make/claimants/${client.id}`}
                                                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                                            >
                                                                Add Claimants
                                                            </Link>
                                                            {caseOrders && caseOrders.length > 0 && (
                                                                <div className="mt-2">
                                                                    <p className="text-sm font-medium text-gray-700 mb-1">Claimants:</p>
                                                                    <ul className="list-disc list-inside text-sm text-gray-600">
                                                                        {caseOrders.map(order => (
                                                                            <li key={order.id}>
                                                                                {order.client_fname} {order.client_lname}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Claim Type Section */}
                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSection('claimType')}
                                                    className="w-full flex items-center justify-between text-left"
                                                >
                                                    <h3 className="text-lg font-semibold text-gray-900">Claim Type</h3>
                                                    <span className="text-gray-500">
                                                        {expandedSections.claimType ? '−' : '+'}
                                                    </span>
                                                </button>
                                                
                                                {expandedSections.claimType && (
                                                    <div className="mt-4 space-y-2">
                                                        {claimTypeOptions.map(type => (
                                                            <div key={type} className="flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`claim_type_${type}`}
                                                                    checked={Array.isArray(data.claim_type) && data.claim_type.includes(type)}
                                                                    onChange={() => handleClaimTypeChange(type)}
                                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                                />
                                                                <label htmlFor={`claim_type_${type}`} className="ml-2 text-sm text-gray-700">
                                                                    {type}
                                                                </label>
                                                            </div>
                                                        ))}

                                                        <div className="mt-4">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Claim Category
                                                            </label>
                                                            <select
                                                                value={data.claim_category}
                                                                onChange={(e) => setData('claim_category', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            >
                                                                <option value="">Select...</option>
                                                                {claimCategories.map(cat => (
                                                                    <option key={cat} value={cat}>{cat}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="mt-4">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Other Claim Details
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.claim_odetails}
                                                                onChange={(e) => setData('claim_odetails', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div className="mt-4">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Agent
                                                            </label>
                                                            <div className="flex gap-2">
                                                                <select
                                                                    value={data.agent_name}
                                                                    onChange={(e) => setData('agent_name', e.target.value)}
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                >
                                                                    <option value="">Select...</option>
                                                                    {partners.agents && partners.agents.map(agent => (
                                                                        <option key={agent.id} value={agent.id}>{agent.name}</option>
                                                                    ))}
                                                                </select>
                                                                <Link
                                                                    href="/partners?type=agent"
                                                                    className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Add
                                                                </Link>
                                                                <Link
                                                                    href={`/partners/${data.agent_name}`}
                                                                    className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Detail
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Host Co
                                                            </label>
                                                            <div className="flex gap-2">
                                                                <select
                                                                    value={data.host_co}
                                                                    onChange={(e) => setData('host_co', e.target.value)}
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                >
                                                                    <option value="">Select...</option>
                                                                    {partners.hostCos && partners.hostCos.map(hostCo => (
                                                                        <option key={hostCo.id} value={hostCo.id}>{hostCo.name}</option>
                                                                    ))}
                                                                </select>
                                                                <Link
                                                                    href="/partners?type=host-co"
                                                                    className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Add
                                                                </Link>
                                                                <Link
                                                                    href={`/partners/${data.host_co}`}
                                                                    className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Detail
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Driver/Passenger Section */}
                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSection('driverPassenger')}
                                                    className="w-full flex items-center justify-between text-left"
                                                >
                                                    <h3 className="text-lg font-semibold text-gray-900">Driver/Passenger</h3>
                                                    <span className="text-gray-500">
                                                        {expandedSections.driverPassenger ? '−' : '+'}
                                                    </span>
                                                </button>
                                                
                                                {expandedSections.driverPassenger && (
                                                    <div className="mt-4 space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Driver/Passenger
                                                            </label>
                                                            <select
                                                                value={data.driver_passenger}
                                                                onChange={(e) => setData('driver_passenger', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            >
                                                                <option value="">Select...</option>
                                                                <option value="The Owner Of The Vehicle">The Owner Of The Vehicle</option>
                                                                <option value="Passenger">Passenger</option>
                                                                <option value="Driver">Driver</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Passenger Position
                                                            </label>
                                                            <select
                                                                value={data.passenger_position}
                                                                onChange={(e) => setData('passenger_position', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            >
                                                                <option value="">Select...</option>
                                                                <option value="Driver">Driver</option>
                                                                <option value="Front Passenger">Front Passenger</option>
                                                                <option value="Rear Passenger">Rear Passenger</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Is Owner?
                                                            </label>
                                                            <select
                                                                value={data.is_owner}
                                                                onChange={(e) => setData('is_owner', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            >
                                                                <option value="">Select...</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Fault
                                                            </label>
                                                            <select
                                                                value={data.fault}
                                                                onChange={(e) => setData('fault', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            >
                                                                <option value="">Select...</option>
                                                                <option value="Non-Fault">Non-Fault</option>
                                                                <option value="Fault">Fault</option>
                                                                <option value="Split Liability">Split Liability</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Solicitors Section */}
                                            <div className="border border-blue-500 rounded-lg p-4 bg-blue-50">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSection('solicitors')}
                                                    className="w-full flex items-center justify-between text-left"
                                                >
                                                    <h3 className="text-lg font-semibold text-gray-900">Solicitors</h3>
                                                    <span className="text-gray-500">
                                                        {expandedSections.solicitors ? '−' : '+'}
                                                    </span>
                                                </button>
                                                
                                                {expandedSections.solicitors && (
                                                    <div className="mt-4 space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Solicitors
                                                            </label>
                                                            <div className="flex gap-2">
                                                                <select
                                                                    value={data.solicitors_name}
                                                                    onChange={(e) => setData('solicitors_name', e.target.value)}
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                >
                                                                    <option value="">Select...</option>
                                                                    {partners.solicitors && partners.solicitors.map(solicitor => (
                                                                        <option key={solicitor.id} value={solicitor.id}>{solicitor.name}</option>
                                                                    ))}
                                                                </select>
                                                                <Link
                                                                    href="/partners?type=solicitor"
                                                                    className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Add
                                                                </Link>
                                                                <Link
                                                                    href={`/partners/${data.solicitors_name}`}
                                                                    className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Detail
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Date Sent
                                                            </label>
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={data.solicitors_datesent}
                                                                    onChange={(e) => setData('solicitors_datesent', e.target.value)}
                                                                    placeholder="dd-mm-yyyy"
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                                <input type="checkbox" className="mt-2" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Dated Accepted
                                                            </label>
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={data.solicitors_dateaccepted}
                                                                    onChange={(e) => setData('solicitors_dateaccepted', e.target.value)}
                                                                    placeholder="dd-mm-yyyy"
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                                <input type="checkbox" className="mt-2" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Reference
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.solicitors_reference}
                                                                onChange={(e) => setData('solicitors_reference', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                File Handler
                                                            </label>
                                                            <div className="flex gap-2">
                                                                <select
                                                                    value={data.solicitors_fhandler}
                                                                    onChange={(e) => setData('solicitors_fhandler', e.target.value)}
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                >
                                                                    <option value="">Select...</option>
                                                                    {handlers && Object.entries(handlers).map(([id, name]) => (
                                                                        <option key={id} value={name}>{name}</option>
                                                                    ))}
                                                                </select>
                                                                <Link
                                                                    href={`/filehandlers/add?solicitor_id=${data.solicitors_name}`}
                                                                    className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Add
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Email
                                                            </label>
                                                            <input
                                                                type="email"
                                                                value={data.solicitors_email}
                                                                onChange={(e) => setData('solicitors_email', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Tel
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.solicitors_tel}
                                                                onChange={(e) => setData('solicitors_tel', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Invoice Status
                                                            </label>
                                                            <select
                                                                value={data.solicitors_invstatus}
                                                                onChange={(e) => setData('solicitors_invstatus', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            >
                                                                {invoiceStatuses.map(status => (
                                                                    <option key={status} value={status}>{status}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Inv Sent Date
                                                            </label>
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={data.solicitors_invsdate}
                                                                    onChange={(e) => setData('solicitors_invsdate', e.target.value)}
                                                                    placeholder="dd-mm-yyyy"
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                                <input type="checkbox" className="mt-2" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Inv Paid Date
                                                            </label>
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={data.solicitors_invpdate}
                                                                    onChange={(e) => setData('solicitors_invpdate', e.target.value)}
                                                                    placeholder="dd-mm-yyyy"
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                                <input type="checkbox" className="mt-2" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Amount received £
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.solicitors_notes}
                                                                onChange={(e) => setData('solicitors_notes', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Services Provided
                                                            </label>
                                                            <textarea
                                                                value={data.solicitors_providers}
                                                                onChange={(e) => setData('solicitors_providers', e.target.value)}
                                                                rows={4}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Document Status
                                                            </label>
                                                            <select
                                                                value={data.solicitors_dstatus}
                                                                onChange={(e) => setData('solicitors_dstatus', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            >
                                                                {documentStatuses.map(status => (
                                                                    <option key={status} value={status}>{status}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Date sent to client
                                                            </label>
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={data.solicitors_dscdate}
                                                                    onChange={(e) => setData('solicitors_dscdate', e.target.value)}
                                                                    placeholder="dd-mm-yyyy"
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                                <input type="checkbox" className="mt-2" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Date sent to Solicitor
                                                            </label>
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={data.solicitors_dssate}
                                                                    onChange={(e) => setData('solicitors_dssate', e.target.value)}
                                                                    placeholder="dd-mm-yyyy"
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                                <input type="checkbox" className="mt-2" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Document Handler
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.solicitors_dhandler}
                                                                onChange={(e) => setData('solicitors_dhandler', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                LEI ins. co
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.solicitors_leico}
                                                                onChange={(e) => setData('solicitors_leico', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                ATE Provider
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.solicitors_ate_provider}
                                                                onChange={(e) => setData('solicitors_ate_provider', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                ATE commission £
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.solicitors_ate_cstatus}
                                                                onChange={(e) => setData('solicitors_ate_cstatus', e.target.value)}
                                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                        >
                                            {processing ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Vehicle Tab */}
                            {activeTab === 'vehicle' && (
                                <VehicleForm 
                                    client={client} 
                                    partners={partners}
                                    onSave={() => router.reload({ only: ['client'] })}
                                />
                            )}

                            {/* TP Tab */}
                            {activeTab === 'tp' && (
                                <TpForm 
                                    client={client} 
                                    partners={partners}
                                    onSave={() => router.reload({ only: ['client'] })}
                                />
                            )}

                            {/* Accident Tab */}
                            {activeTab === 'accident' && (
                                <AccidentForm 
                                    client={client}
                                    onSave={() => router.reload({ only: ['client'] })}
                                />
                            )}

                            {/* Hire Tab */}
                            {activeTab === 'hire' && (
                                <HireForm 
                                    client={client} 
                                    partners={partners}
                                    onSave={() => router.reload({ only: ['client'] })}
                                />
                            )}

                            {/* PI Tab */}
                            {activeTab === 'pi' && (
                                <PiForm 
                                    client={client} 
                                    partners={partners}
                                    onSave={() => router.reload({ only: ['client'] })}
                                />
                            )}

                            {/* Notes Tab */}
                            {activeTab === 'notes' && (
                                <NotesTab 
                                    client={client}
                                    notes={client.notes || []}
                                    users={users}
                                    auth={auth}
                                />
                            )}

                            {/* Payments Tab */}
                            {activeTab === 'payments' && (
                                <PaymentsTab 
                                    client={client}
                                    payments={client.payments || []}
                                    partners={partners}
                                    auth={auth}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
