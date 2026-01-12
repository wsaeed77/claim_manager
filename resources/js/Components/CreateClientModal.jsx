import { useForm, router, usePage } from '@inertiajs/react';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import InputError from './InputError';
import DateInput from './DateInput';
import PartnerModal from './PartnerModal';
import PartnerDetailModal from './PartnerDetailModal';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateClientModal({ show, onClose, preFilledFormValues, partners: partnersProp, users: usersProp, auth: authProp, onSuccess, onOpen }) {
    // Get shared data from Inertia page props as fallback
    const { props } = usePage();
    const partners = partnersProp || props.partners;
    const users = usersProp || props.users;
    const auth = authProp || props.auth;
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentPartnerType, setCurrentPartnerType] = useState('');
    const [currentPartnerId, setCurrentPartnerId] = useState(null);
    const [currentPartnerName, setCurrentPartnerName] = useState('');

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

    // Get current date in dd-mm-yyyy format
    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Get preFilledFormValues from props if not passed directly
    const initialFormValues = preFilledFormValues || props.preFilledFormValues;

    const { data, setData, post, processing, errors, reset } = useForm({
        case_no: initialFormValues?.case_no || '',
        case_order: initialFormValues?.case_order || 1,
        case_ref: '',
        client_title: '',
        client_type: '',
        client_fname: '',
        client_lname: '',
        // Claim fields
        claim_category: 'RTA',
        driver_passenger: '',
        case_advisor: auth?.user?.name || '',
        claim_status: 'Pending',
        claim_sdate: getCurrentDate(),
        is_owner: '',
        fault: '',
        host_co: '',
        agent_name: '',
    });

    // Get preFilledFormValues from props if not passed directly
    const formValues = preFilledFormValues || props.preFilledFormValues;


    // Update form when modal opens or preFilledFormValues change
    useEffect(() => {
        if (show) {
            // Trigger onOpen callback to refresh preFilledFormValues (only if needed)
            if (onOpen && !formValues?.case_no) {
                onOpen();
            }
            
            // Update form with fresh values
            if (formValues) {
                setData(prevData => ({
                    ...prevData,
                    case_no: formValues.case_no || '',
                    case_order: formValues.case_order || 1,
                    case_ref: `${formValues.case_no || ''}/${formValues.case_order || 1}`,
                    // Reset other fields when modal opens
                    client_title: '',
                    client_type: '',
                    client_fname: '',
                    client_lname: '',
                    claim_category: 'RTA',
                    driver_passenger: '',
                    case_advisor: auth?.user?.name || '',
                    claim_status: 'Pending',
                    claim_sdate: getCurrentDate(),
                    is_owner: '',
                    fault: '',
                    host_co: '',
                    agent_name: '',
                }));
            }
        }
    }, [show, formValues, setData, auth, onOpen]);

    // Update case_ref when case_no or case_order changes
    useEffect(() => {
        setData('case_ref', `${data.case_no || ''}/${data.case_order || 1}`);
    }, [data.case_no, data.case_order, setData]);

    const submit = (e) => {
        e.preventDefault();
        post('/addclaim', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Client created successfully!');
                reset();
                onClose();
                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: () => {
                toast.error('Failed to create client. Please check the form for errors.');
            },
        });
    };

    const handleClose = () => {
        // Reset form to initial state
        const formValues = preFilledFormValues || props.preFilledFormValues;
        setData({
            case_no: formValues?.case_no || '',
            case_order: formValues?.case_order || 1,
            case_ref: '',
            client_title: '',
            client_type: '',
            client_fname: '',
            client_lname: '',
            claim_category: 'RTA',
            driver_passenger: '',
            case_advisor: auth?.user?.name || '',
            claim_status: 'Pending',
            claim_sdate: getCurrentDate(),
            is_owner: '',
            fault: '',
            host_co: '',
            agent_name: '',
        });
        onClose();
    };

    const handleDateChange = (name, value) => {
        setData(name, value);
    };

    const handleAddPartner = (partnerType) => {
        setCurrentPartnerType(partnerType);
        setShowAddModal(true);
    };

    const handleDetailPartner = (partnerId, partnerName) => {
        if (!partnerId) return;
        setCurrentPartnerId(partnerId);
        setCurrentPartnerName(partnerName || '');
        setShowDetailModal(true);
    };

    const handlePartnerSuccess = () => {
        router.reload({ only: ['partners', 'preFilledFormValues'] });
    };

    return (
        <>
            <Modal show={show} onClose={handleClose} title="Add Client & Claim Type" maxWidth="max-w-5xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Section: Add Client */}
                        <div className="space-y-4 lg:border-r lg:border-gray-200 lg:pr-6 pb-6 lg:pb-0 border-b lg:border-b-0 border-gray-200">
                            <h3 className="text-base font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">Add Client</h3>
                            
                            <div className="flex gap-2 items-end">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Case #
                                    </label>
                                    <input
                                        type="text"
                                        value={data.case_no}
                                        onChange={(e) => setData('case_no', e.target.value)}
                                        className={`block w-full px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors ${
                                            errors.case_no ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                                        }`}
                                        required
                                    />
                                    <InputError message={errors.case_no} className="mt-1" />
                                </div>
                                <div className="w-12 flex items-end">
                                    <span className="text-gray-700 mb-1">/</span>
                                </div>
                                <div className="w-16">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        &nbsp;
                                    </label>
                                    <input
                                        type="text"
                                        value={data.case_order}
                                        onChange={(e) => setData('case_order', e.target.value)}
                                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                        required
                                    />
                                    <InputError message={errors.case_order} className="mt-1" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Case Ref
                                </label>
                                <input
                                    type="text"
                                    value={data.case_ref || `${data.case_no || ''}/${data.case_order || 1}`}
                                    readOnly
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Client Type
                                </label>
                                <select
                                    value={data.client_type}
                                    onChange={(e) => setData('client_type', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
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
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
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
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={data.client_fname}
                                        onChange={(e) => setData('client_fname', e.target.value)}
                                        className={`flex-1 px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors ${
                                            errors.client_fname ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                                        }`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="px-3 py-2.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md transition-colors"
                                        title="More options"
                                    >
                                        ...
                                    </button>
                                </div>
                                <InputError message={errors.client_fname} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.client_lname}
                                    onChange={(e) => setData('client_lname', e.target.value)}
                                    className={`block w-full px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors ${
                                        errors.client_lname ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                />
                                <InputError message={errors.client_lname} className="mt-1" />
                            </div>
                        </div>

                        {/* Right Section: Claim Type */}
                        <div className="space-y-4 lg:pl-6 pt-6 lg:pt-0">
                            <h3 className="text-base font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">Claim Type</h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Claim Category
                                </label>
                                <select
                                    value={data.claim_category}
                                    onChange={(e) => setData('claim_category', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                >
                                    {claimCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Driver/Passenger
                                </label>
                                <select
                                    value={data.driver_passenger}
                                    onChange={(e) => setData('driver_passenger', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                >
                                    <option value="">Select...</option>
                                    <option value="The Owner Of The Vehicle">The Owner Of The Vehicle</option>
                                    <option value="Passenger">Passenger</option>
                                    <option value="Driver">Driver</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Case Advisor
                                </label>
                                <select
                                    value={data.case_advisor}
                                    onChange={(e) => setData('case_advisor', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                >
                                    <option value="">Select...</option>
                                    {users && users.map(user => (
                                        <option key={user.id} value={user.name}>{user.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Claim Status
                                </label>
                                <select
                                    value={data.claim_status}
                                    onChange={(e) => setData('claim_status', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                >
                                    {claimStatuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Claim Start Date
                                </label>
                                <DateInput
                                    value={data.claim_sdate}
                                    onChange={(value) => handleDateChange('claim_sdate', value)}
                                />
                                <InputError message={errors.claim_sdate} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Is Owner?
                                </label>
                                <select
                                    value={data.is_owner}
                                    onChange={(e) => setData('is_owner', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
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
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                >
                                    <option value="">Select...</option>
                                    <option value="Non-Fault">Non-Fault</option>
                                    <option value="Fault">Fault</option>
                                    <option value="Split Liability">Split Liability</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Host Co.
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={data.host_co}
                                        onChange={(e) => setData('host_co', e.target.value)}
                                        className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                    >
                                        <option value="">Select...</option>
                                        {partners && partners.hostCos && Array.isArray(partners.hostCos) && partners.hostCos.length > 0 ? (
                                            partners.hostCos.map(hostCo => (
                                                <option key={hostCo.id} value={hostCo.id}>{hostCo.name}</option>
                                            ))
                                        ) : null}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => handleAddPartner('host-co')}
                                        className="px-3 py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 border-l border-gray-300 rounded-r-md transition-colors"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDetailPartner(data.host_co, partners?.hostCos?.find(h => h.id == data.host_co)?.name)}
                                        disabled={!data.host_co}
                                        className="px-3 py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent border-l border-gray-300 rounded-r-md transition-colors"
                                    >
                                        Detail
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Agent
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={data.agent_name}
                                        onChange={(e) => setData('agent_name', e.target.value)}
                                        className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                    >
                                        <option value="">Select...</option>
                                        {partners && partners.agents && Array.isArray(partners.agents) && partners.agents.length > 0 ? (
                                            partners.agents.map(agent => (
                                                <option key={agent.id} value={agent.id}>{agent.name}</option>
                                            ))
                                        ) : null}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => handleAddPartner('agent')}
                                        className="px-3 py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 border-l border-gray-300 rounded-r-md transition-colors"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDetailPartner(data.agent_name, partners?.agents?.find(a => a.id == data.agent_name)?.name)}
                                        disabled={!data.agent_name}
                                        className="px-3 py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent border-l border-gray-300 rounded-r-md transition-colors"
                                    >
                                        Detail
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-center border-t border-gray-200 pt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {processing ? 'Creating...' : 'ADD CLAIM'}
                        </button>
                    </div>
                </form>
            </Modal>

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
        </>
    );
}
