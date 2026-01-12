import { useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import InputError from './InputError';
import toast from 'react-hot-toast';

export default function PartnerModal({ show, onClose, partner = null, partnerType = null, onSuccess }) {
    const isEdit = !!partner;
    const currentPartnerType = partner?.partner_type || partnerType || '';

    // Determine which fields to show based on partner type
    const showMobileNumber = !['medical-appointment', 'insurer', 'solicitor', 'hire-company'].includes(currentPartnerType);
    const showHostCoFields = currentPartnerType === 'host-co' && showMobileNumber;
    const showPayRate = !['host-co', 'agent'].includes(currentPartnerType) && showMobileNumber;
    const showSolicitorFields = currentPartnerType === 'solicitor';
    const showHireCompanyFields = currentPartnerType === 'hire-company';
    const showAgentFields = currentPartnerType === 'agent';

    const { data, setData, post, processing, errors, reset } = useForm({
        name: partner?.name || '',
        partner_type: currentPartnerType,
        email: partner?.email || '',
        reference: partner?.reference || '',
        partner_postcode: partner?.partner_postcode || '',
        address: partner?.address || '',
        partner_city: partner?.partner_city || '',
        partner_county: partner?.partner_county || '',
        phone_number: partner?.phone_number || '',
        mobile_number: partner?.mobile_number || '',
        fax: partner?.fax || '',
        prefix: partner?.prefix || '',
        website: partner?.website || '',
        comp_reg_no: partner?.comp_reg_no || '',
        vat_reg_no: partner?.vat_reg_no || '',
        bank_name: partner?.bank_name || '',
        acc_name: partner?.acc_name || '',
        short_code: partner?.short_code || '',
        acc_no: partner?.acc_no || '',
        attach_logo: null,
        pay_rate: partner?.pay_rate || '',
        minor_pay_rate: partner?.minor_pay_rate || '',
        taxi_pay_rate: partner?.taxi_pay_rate || '',
        prestige_pay_rate: partner?.prestige_pay_rate || '',
        moj_register: partner?.moj_register || '',
        moj_crm_no: partner?.moj_crm_no || '',
    });

    useEffect(() => {
        if (show && partner) {
            // Editing existing partner
            setData({
                name: partner.name || '',
                partner_type: partner.partner_type || '',
                email: partner.email || '',
                reference: partner.reference || '',
                partner_postcode: partner.partner_postcode || '',
                address: partner.address || '',
                partner_city: partner.partner_city || '',
                partner_county: partner.partner_county || '',
                phone_number: partner.phone_number || '',
                mobile_number: partner.mobile_number || '',
                fax: partner.fax || '',
                prefix: partner.prefix || '',
                website: partner.website || '',
                comp_reg_no: partner.comp_reg_no || '',
                vat_reg_no: partner.vat_reg_no || '',
                bank_name: partner.bank_name || '',
                acc_name: partner.acc_name || '',
                short_code: partner.short_code || '',
                acc_no: partner.acc_no || '',
                attach_logo: null,
                pay_rate: partner.pay_rate || '',
                minor_pay_rate: partner.minor_pay_rate || '',
                taxi_pay_rate: partner.taxi_pay_rate || '',
                prestige_pay_rate: partner.prestige_pay_rate || '',
                moj_register: partner.moj_register || '',
                moj_crm_no: partner.moj_crm_no || '',
            });
        } else if (show && !partner) {
            // Creating new partner - reset form
            reset();
            setData('partner_type', currentPartnerType);
        }
    }, [show, partner, currentPartnerType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'attach_logo' && data[key]) {
                formData.append(key, data[key]);
            } else if (data[key] !== null && data[key] !== '') {
                formData.append(key, data[key]);
            }
        });

        if (isEdit) {
            formData.append('id', partner.id);
            router.post(`/partner/${partner.id}/edit`, formData, {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Partner updated successfully!');
                    onClose();
                    reset();
                    if (onSuccess) onSuccess();
                },
                onError: () => {
                    toast.error('Failed to update partner. Please check the form for errors.');
                },
            });
        } else {
            router.post('/add-partners', formData, {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Partner created successfully!');
                    onClose();
                    reset();
                    if (onSuccess) onSuccess();
                },
                onError: () => {
                    toast.error('Failed to create partner. Please check the form for errors.');
                },
            });
        }
    };

    const handleFileChange = (e) => {
        setData('attach_logo', e.target.files[0]);
    };

    const getPartnerTypeDisplayName = (type) => {
        const names = {
            'host-co': 'Host CO.',
            'medical-appointment': 'Appoint',
            'insurer': 'Insurer',
            'agent': 'Agent',
            'hire-company': 'Hire',
            'ate': 'ATE',
            'engineer': 'Engineer',
            'medical': 'Medical',
            'recovery': 'Recovery',
            'repairer': 'Repairer',
            'solicitor': 'Solicitor',
            'storage': 'Storage',
        };
        return names[type] || type;
    };

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={isEdit ? 'Edit Partner' : `Add Partner (${getPartnerTypeDisplayName(currentPartnerType)})`}
            maxWidth="max-w-4xl"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Partner Type - Readonly for edit, hidden for create */}
                    {isEdit && (
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Partner Type
                            </label>
                            <input
                                type="text"
                                value={data.partner_type}
                                readOnly
                                className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
                            />
                        </div>
                    )}

                    {/* Name */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                required
                            />
                            <button
                                type="button"
                                className="px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md transition-colors"
                                title="More options"
                            >
                                ...
                            </button>
                        </div>
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    {/* Reference */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reference
                        </label>
                        <input
                            type="text"
                            value={data.reference}
                            onChange={(e) => setData('reference', e.target.value)}
                            readOnly={isEdit || !isEdit}
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
                            placeholder={isEdit ? '' : 'Auto-generated'}
                        />
                        <InputError message={errors.reference} className="mt-1" />
                    </div>

                    {/* Postcode */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Postcode
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={data.partner_postcode}
                                onChange={(e) => setData('partner_postcode', e.target.value)}
                                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            />
                            <button
                                type="button"
                                className="px-3 py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-900 border border-gray-300 rounded-md transition-colors"
                            >
                                Get Address
                            </button>
                        </div>
                        <InputError message={errors.partner_postcode} className="mt-1" />
                    </div>

                    {/* Select Your Addresses */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Your Addresses
                        </label>
                        <select className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors">
                            <option value="">Select...</option>
                        </select>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <textarea
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            rows={3}
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                        />
                        <InputError message={errors.address} className="mt-1" />
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                        </label>
                        <input
                            type="text"
                            value={data.partner_city}
                            onChange={(e) => setData('partner_city', e.target.value)}
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                        />
                        <InputError message={errors.partner_city} className="mt-1" />
                    </div>

                    {/* County */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            County
                        </label>
                        <input
                            type="text"
                            value={data.partner_county}
                            onChange={(e) => setData('partner_county', e.target.value)}
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                        />
                        <InputError message={errors.partner_county} className="mt-1" />
                    </div>

                    {/* Phone No */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone No
                        </label>
                        <input
                            type="text"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                        />
                        <InputError message={errors.phone_number} className="mt-1" />
                    </div>

                    {/* Mobile No - Conditional */}
                    {showMobileNumber && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mobile No
                            </label>
                            <input
                                type="text"
                                value={data.mobile_number}
                                onChange={(e) => setData('mobile_number', e.target.value)}
                                className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            />
                            <InputError message={errors.mobile_number} className="mt-1" />
                        </div>
                    )}

                    {/* Host CO Fields */}
                    {showHostCoFields && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fax
                                </label>
                                <input
                                    type="text"
                                    value={data.fax}
                                    onChange={(e) => setData('fax', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.fax} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prefix
                                </label>
                                <input
                                    type="text"
                                    value={data.prefix}
                                    onChange={(e) => setData('prefix', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.prefix} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Website
                                </label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 py-2.5 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500 text-sm">
                                        http://
                                    </span>
                                    <input
                                        type="text"
                                        value={data.website}
                                        onChange={(e) => setData('website', e.target.value)}
                                        className="flex-1 px-3 py-2.5 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                    />
                                </div>
                                <InputError message={errors.website} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Reg No
                                </label>
                                <input
                                    type="text"
                                    value={data.comp_reg_no}
                                    onChange={(e) => setData('comp_reg_no', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.comp_reg_no} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    VAT Reg No
                                </label>
                                <input
                                    type="text"
                                    value={data.vat_reg_no}
                                    onChange={(e) => setData('vat_reg_no', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.vat_reg_no} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Bank Name
                                </label>
                                <input
                                    type="text"
                                    value={data.bank_name}
                                    onChange={(e) => setData('bank_name', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.bank_name} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name on the Account
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={data.acc_name}
                                        onChange={(e) => setData('acc_name', e.target.value)}
                                        className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                    />
                                    <button
                                        type="button"
                                        className="px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md transition-colors"
                                        title="More options"
                                    >
                                        ...
                                    </button>
                                </div>
                                <InputError message={errors.acc_name} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sort Code
                                </label>
                                <input
                                    type="text"
                                    value={data.short_code}
                                    onChange={(e) => setData('short_code', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.short_code} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Account No
                                </label>
                                <input
                                    type="text"
                                    value={data.acc_no}
                                    onChange={(e) => setData('acc_no', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.acc_no} className="mt-1" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Attach Logo
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                                {partner?.attach_logo && (
                                    <div className="mt-2">
                                        <img src={`/cm/uploads/${partner.attach_logo}`} alt="Logo" className="h-20 w-auto" />
                                    </div>
                                )}
                                <InputError message={errors.attach_logo} className="mt-1" />
                            </div>
                        </>
                    )}

                    {/* Pay Rate - Conditional */}
                    {showPayRate && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pay Rate
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.pay_rate}
                                onChange={(e) => setData('pay_rate', e.target.value)}
                                className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                            />
                            <InputError message={errors.pay_rate} className="mt-1" />
                        </div>
                    )}

                    {/* Solicitor Fields */}
                    {showSolicitorFields && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fax
                                </label>
                                <input
                                    type="text"
                                    value={data.fax}
                                    onChange={(e) => setData('fax', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.fax} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Adult Pay Rate
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.pay_rate}
                                    onChange={(e) => setData('pay_rate', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.pay_rate} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Minor Pay Rate
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.minor_pay_rate}
                                    onChange={(e) => setData('minor_pay_rate', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.minor_pay_rate} className="mt-1" />
                            </div>
                        </>
                    )}

                    {/* Hire Company Fields */}
                    {showHireCompanyFields && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fax
                                </label>
                                <input
                                    type="text"
                                    value={data.fax}
                                    onChange={(e) => setData('fax', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.fax} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Taxi Pay Rate
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.taxi_pay_rate}
                                    onChange={(e) => setData('taxi_pay_rate', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.taxi_pay_rate} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prestige Pay Rate
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.prestige_pay_rate}
                                    onChange={(e) => setData('prestige_pay_rate', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.prestige_pay_rate} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Standard Hire Pay Rate
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.pay_rate}
                                    onChange={(e) => setData('pay_rate', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.pay_rate} className="mt-1" />
                            </div>
                        </>
                    )}

                    {/* Agent Fields */}
                    {showAgentFields && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Service Fee
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.pay_rate}
                                    onChange={(e) => setData('pay_rate', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.pay_rate} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hire Comm
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.minor_pay_rate}
                                    onChange={(e) => setData('minor_pay_rate', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.minor_pay_rate} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    MOJ Register?
                                </label>
                                <select
                                    value={data.moj_register}
                                    onChange={(e) => setData('moj_register', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                <InputError message={errors.moj_register} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    MOJ CRM No
                                </label>
                                <input
                                    type="number"
                                    value={data.moj_crm_no}
                                    onChange={(e) => setData('moj_crm_no', e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                                <InputError message={errors.moj_crm_no} className="mt-1" />
                            </div>
                        </>
                    )}
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
                        {processing ? 'Saving...' : isEdit ? 'UPDATE PARTNER' : 'CREATE PARTNER'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
