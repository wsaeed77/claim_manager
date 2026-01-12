import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { useState, useEffect } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function ReportsIndex({ auth, clients = [], clientsCount = 0, search = {}, claimTypes = [], caseStatus = [], partners = [], query = {} }) {
    const [formData, setFormData] = useState({
        period: search.period || 'all',
        start_date: search.start_date || '',
        end_date: search.end_date || '',
        claim_type: search.claim_type || [],
        allClaimType: search.allClaimType !== undefined ? search.allClaimType : true,
        case_status: search.case_status || [],
        allCaseStatus: search.allCaseStatus !== undefined ? search.allCaseStatus : true,
        report_type: search.report_type || '',
        group_by: search.group_by || '',
        select: search.select || '',
        order_by: search.order_by || 'case_number',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = {
            period: formData.period,
            start_date: formData.period === 'period' ? formData.start_date : undefined,
            end_date: formData.period === 'period' ? formData.end_date : undefined,
            claim_type: formData.allClaimType ? undefined : formData.claim_type,
            allClaimType: formData.allClaimType ? true : undefined,
            case_status: formData.allCaseStatus ? undefined : formData.case_status,
            allCaseStatus: formData.allCaseStatus ? true : undefined,
            report_type: formData.report_type || undefined,
            group_by: formData.group_by || undefined,
            select: formData.select || undefined,
            order_by: formData.order_by,
        };

        // Remove undefined values
        Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

        router.get('/reports', params);
    };

    const handleExport = () => {
        const params = new URLSearchParams();
        if (formData.period) params.append('period', formData.period);
        if (formData.period === 'period' && formData.start_date) params.append('start_date', formData.start_date);
        if (formData.period === 'period' && formData.end_date) params.append('end_date', formData.end_date);
        if (!formData.allClaimType && formData.claim_type.length > 0) {
            formData.claim_type.forEach(type => params.append('claim_type[]', type));
        }
        if (formData.allClaimType) params.append('allClaimType', 'true');
        if (!formData.allCaseStatus && formData.case_status.length > 0) {
            formData.case_status.forEach(status => params.append('case_status[]', status));
        }
        if (formData.allCaseStatus) params.append('allCaseStatus', 'true');
        if (formData.report_type) params.append('report_type', formData.report_type);
        if (formData.group_by) params.append('group_by', formData.group_by);
        if (formData.select) params.append('select', formData.select);
        if (formData.order_by) params.append('order_by', formData.order_by);

        window.location.href = `/export?${params.toString()}`;
    };

    const toggleClaimType = (type) => {
        if (formData.claim_type.includes(type)) {
            setFormData({ ...formData, claim_type: formData.claim_type.filter(t => t !== type) });
        } else {
            setFormData({ ...formData, claim_type: [...formData.claim_type, type] });
        }
        setFormData(prev => ({ ...prev, allClaimType: false }));
    };

    const toggleCaseStatus = (status) => {
        if (formData.case_status.includes(status)) {
            setFormData({ ...formData, case_status: formData.case_status.filter(s => s !== status) });
        } else {
            setFormData({ ...formData, case_status: [...formData.case_status, status] });
        }
        setFormData(prev => ({ ...prev, allCaseStatus: false }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        } catch (e) {
            return dateString;
        }
    };

    const renderTable = () => {
        if (!formData.report_type || clients.length === 0) {
            return (
                <div className="text-center py-12">
                    <p className="text-gray-500">Select a report type and apply filters to view results</p>
                </div>
            );
        }

        const reportType = formData.report_type;

        if (reportType === 'Pending/Referred/Fleet') {
            return (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Case Ref.</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Case Date</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">First Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Last Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Tel</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Mobile</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Claim Adviser</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">REG</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Solicitor</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Agent</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {clients.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Link href={`/?claimid=${client.id}`} className="text-indigo-600 hover:text-indigo-900" target="_blank">
                                            {client.case_ref || '-'}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Link href={`/?claimid=${client.id}`} className="text-indigo-600 hover:text-indigo-900" target="_blank">
                                            {formatDate(client.claim_sdate)}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.claim_status || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.claim_type || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.client_fname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.client_lname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.client_hometel || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.client_mobile || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.case_advisor || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.vehicle_reg || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.solicitors_name ? client.solicitors_name : '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.agent_name ? client.agent_name : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (reportType === 'Solicitor') {
            return (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Case Ref.</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Case Date</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">First Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Last Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">REG</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Solicitor</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sol. Claim Handler</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sol. Ref</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sol. Date Accepted</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sol. Inv. Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sol. Inv. Issue Date</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sol. Inv. Paid Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {clients.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Link href={`/?claimid=${client.id}`} className="text-indigo-600 hover:text-indigo-900" target="_blank">
                                            {client.case_ref || '-'}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Link href={`/?claimid=${client.id}`} className="text-indigo-600 hover:text-indigo-900" target="_blank">
                                            {formatDate(client.claim_sdate)}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.claim_status || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.claim_type || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.client_fname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.client_lname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.vehicle_reg || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.solicitors_name ? client.solicitors_name : '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.solicitors_dhandler || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.solicitors_reference || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(client.solicitors_dateaccepted)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.solicitors_invstatus || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(client.solicitors_invsdate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Link href={`/?claimid=${client.id}`} className="text-indigo-600 hover:text-indigo-900" target="_blank">
                                            {formatDate(client.solicitors_invpdate)}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        // Add more report types as needed - for now, return a basic table for other types
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Case No</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Case Date</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Client Name</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <Link href={`/?claimid=${client.id}`} className="text-indigo-600 hover:text-indigo-900" target="_blank">
                                        {client.case_no}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(client.claim_sdate)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{client.claim_status || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{client.client_fname} {client.client_lname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <AppLayout title="Reports" auth={auth}>
            <Head title="Reports" />
            <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Reports</h1>

                {/* Report Form */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 mb-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Period */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Period</label>
                                <div className="space-y-2 mb-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="period"
                                            value="all"
                                            checked={formData.period === 'all'}
                                            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                            className="mr-2"
                                        />
                                        All
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="period"
                                            value="period"
                                            checked={formData.period === 'period'}
                                            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                            className="mr-2"
                                        />
                                        Select Period
                                    </label>
                                </div>
                                {formData.period === 'period' && (
                                    <div className="space-y-2">
                                        <input
                                            type="date"
                                            value={formData.start_date}
                                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        <input
                                            type="date"
                                            value={formData.end_date}
                                            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Claim Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Claim Type</label>
                                <div className="mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.allClaimType}
                                            onChange={(e) => setFormData({ ...formData, allClaimType: e.target.checked, claim_type: [] })}
                                            className="mr-2"
                                        />
                                        All
                                    </label>
                                </div>
                                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2">
                                    {claimTypes.map((type) => (
                                        <label key={type} className="flex items-center mb-1">
                                            <input
                                                type="checkbox"
                                                checked={formData.claim_type.includes(type)}
                                                onChange={() => toggleClaimType(type)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Case Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Case Status</label>
                                <div className="mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.allCaseStatus}
                                            onChange={(e) => setFormData({ ...formData, allCaseStatus: e.target.checked, case_status: [] })}
                                            className="mr-2"
                                        />
                                        All
                                    </label>
                                </div>
                                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2">
                                    {caseStatus.map((status) => (
                                        <label key={status} className="flex items-center mb-1">
                                            <input
                                                type="checkbox"
                                                checked={formData.case_status.includes(status)}
                                                onChange={() => toggleCaseStatus(status)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{status}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Options */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs text-gray-600 mb-1">Select Report</label>
                                        <select
                                            value={formData.report_type}
                                            onChange={(e) => setFormData({ ...formData, report_type: e.target.value })}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option value="">-- Select --</option>
                                            <option value="Pending/Referred/Fleet">Pending/Referred/Fleet</option>
                                            <option value="Solicitor">Solicitor</option>
                                            <option value="Agent Fee">Agent Fee</option>
                                            <option value="Car Hire">Car Hire</option>
                                            <option value="Inspection Status">Inspection Status</option>
                                            <option value="Liability Status">Liability Status</option>
                                            <option value="Medical Appointment">Medical Appointment</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-600 mb-1">Group By</label>
                                        <select
                                            value={formData.group_by}
                                            onChange={(e) => setFormData({ ...formData, group_by: e.target.value, select: '' })}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option value="">-- Select --</option>
                                            <option value="agent">Agents</option>
                                            <option value="solicitor">Solicitor</option>
                                            <option value="insurer">Insurer</option>
                                            <option value="hire-company">Hire Company</option>
                                            <option value="claim-adviser">Claim Adviser</option>
                                            <option value="repairer">Repairer</option>
                                        </select>
                                    </div>

                                    {formData.group_by && partners.length > 0 && (
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">Select</label>
                                            <select
                                                value={formData.select}
                                                onChange={(e) => setFormData({ ...formData, select: e.target.value })}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value="">-- All --</option>
                                                {partners.map((partner) => (
                                                    <option key={partner.id} value={partner.id}>
                                                        {partner.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-xs text-gray-600 mb-1">Order By</label>
                                        <div className="space-y-1">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="order_by"
                                                    value="case_number"
                                                    checked={formData.order_by === 'case_number'}
                                                    onChange={(e) => setFormData({ ...formData, order_by: e.target.value })}
                                                    className="mr-2"
                                                />
                                                Case Number
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="order_by"
                                                    value="case_date"
                                                    checked={formData.order_by === 'case_date'}
                                                    onChange={(e) => setFormData({ ...formData, order_by: e.target.value })}
                                                    className="mr-2"
                                                />
                                                Case Date
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Generate Report
                            </button>
                            {clients.length > 0 && (
                                <button
                                    type="button"
                                    onClick={handleExport}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <DocumentArrowDownIcon className="mr-2 h-5 w-5" />
                                    Export
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Results Count */}
                {clientsCount > 0 && (
                    <div className="mb-4">
                        <h4 className="text-lg font-medium text-gray-900">Total Results: {clientsCount}</h4>
                    </div>
                )}

                {/* Results Table */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    {renderTable()}
                </div>
            </div>
        </AppLayout>
    );
}
