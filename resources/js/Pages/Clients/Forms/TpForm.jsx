import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function TpForm({ client, partners, onSave }) {
    const [activeSection, setActiveSection] = useState('vehicle');

    const { data, setData, post, processing } = useForm({
        claimid: client.id,
        // TP Vehicle fields
        tpv_reg: client.tpVehicle?.tpv_reg || '',
        tpv_make: client.tpVehicle?.tpv_make || '',
        tpv_model: client.tpVehicle?.tpv_model || '',
        tpv_btype: client.tpVehicle?.tpv_btype || '',
        tpv_color: client.tpVehicle?.tpv_color || '',
        tpv_ftype: client.tpVehicle?.tpv_ftype || '',
        tpv_regdate: client.tpVehicle?.tpv_regdate || '',
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

    const submit = (e) => {
        e.preventDefault();
        post('/updateclaim', {
            preserveScroll: true,
            onSuccess: () => {
                if (onSave) onSave();
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        type="button"
                        onClick={() => setActiveSection('vehicle')}
                        className={`${activeSection === 'vehicle' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        TP Vehicle
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveSection('insurance')}
                        className={`${activeSection === 'insurance' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        TP Insurance
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveSection('driver')}
                        className={`${activeSection === 'driver' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        TP Driver
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveSection('thirdparty')}
                        className={`${activeSection === 'thirdparty' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Third Party
                    </button>
                </nav>
            </div>

            {/* TP Vehicle Section */}
            {activeSection === 'vehicle' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Registration
                        </label>
                        <input
                            type="text"
                            value={data.tpv_reg}
                            onChange={(e) => setData('tpv_reg', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Make
                        </label>
                        <input
                            type="text"
                            value={data.tpv_make}
                            onChange={(e) => setData('tpv_make', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Model
                        </label>
                        <input
                            type="text"
                            value={data.tpv_model}
                            onChange={(e) => setData('tpv_model', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Body Type
                        </label>
                        <input
                            type="text"
                            value={data.tpv_btype}
                            onChange={(e) => setData('tpv_btype', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Colour
                        </label>
                        <input
                            type="text"
                            value={data.tpv_color}
                            onChange={(e) => setData('tpv_color', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fuel Type
                        </label>
                        <select
                            value={data.tpv_ftype}
                            onChange={(e) => setData('tpv_ftype', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select...</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Registration Date
                        </label>
                        <input
                            type="text"
                            value={data.tpv_regdate}
                            onChange={(e) => setData('tpv_regdate', e.target.value)}
                            placeholder="dd-mm-yyyy"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Occupants
                        </label>
                        <input
                            type="text"
                            value={data.tpv_nooccu}
                            onChange={(e) => setData('tpv_nooccu', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Damage
                        </label>
                        <textarea
                            value={data.tpv_damage}
                            onChange={(e) => setData('tpv_damage', e.target.value)}
                            rows={3}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Details
                        </label>
                        <textarea
                            value={data.tpv_details}
                            onChange={(e) => setData('tpv_details', e.target.value)}
                            rows={3}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            )}

            {/* TP Insurance Section */}
            {activeSection === 'insurance' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Insurer
                        </label>
                        <div className="flex gap-2">
                            <select
                                value={data.tpi_insurer}
                                onChange={(e) => setData('tpi_insurer', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select...</option>
                                {partners.insurers && partners.insurers.map(insurer => (
                                    <option key={insurer.id} value={insurer.id}>{insurer.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Details
                        </label>
                        <input
                            type="text"
                            value={data.tpi_cdetails}
                            onChange={(e) => setData('tpi_cdetails', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            TPI Notes
                        </label>
                        <textarea
                            value={data.tpi_tpin}
                            onChange={(e) => setData('tpi_tpin', e.target.value)}
                            rows={4}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Policy
                        </label>
                        <input
                            type="text"
                            value={data.tpi_policy}
                            onChange={(e) => setData('tpi_policy', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Claim
                        </label>
                        <input
                            type="text"
                            value={data.tpi_claim}
                            onChange={(e) => setData('tpi_claim', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Vehicle Damage Liability
                        </label>
                        <select
                            value={data.vdamage_liability}
                            onChange={(e) => setData('vdamage_liability', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select...</option>
                            <option value="Admitted">Admitted</option>
                            <option value="Denied">Denied</option>
                            <option value="Under Investigation">Under Investigation</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Insured
                        </label>
                        <input
                            type="text"
                            value={data.vdamage_insurd}
                            onChange={(e) => setData('vdamage_insurd', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Named Driver
                        </label>
                        <input
                            type="text"
                            value={data.vdamage_ndriver}
                            onChange={(e) => setData('vdamage_ndriver', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Requested
                        </label>
                        <input
                            type="text"
                            value={data.vdamage_rques}
                            onChange={(e) => setData('vdamage_rques', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            )}

            {/* TP Driver Section */}
            {activeSection === 'driver' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Driver
                        </label>
                        <input
                            type="text"
                            value={data.tpd_driver}
                            onChange={(e) => setData('tpd_driver', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={data.tpd_fname}
                            onChange={(e) => setData('tpd_fname', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={data.tpd_lname}
                            onChange={(e) => setData('tpd_lname', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <textarea
                            value={data.tpd_add}
                            onChange={(e) => setData('tpd_add', e.target.value)}
                            rows={3}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                        </label>
                        <input
                            type="text"
                            value={data.tpd_city}
                            onChange={(e) => setData('tpd_city', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                        </label>
                        <input
                            type="text"
                            value={data.tpd_country}
                            onChange={(e) => setData('tpd_country', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Postcode
                        </label>
                        <input
                            type="text"
                            value={data.tpd_postcode}
                            onChange={(e) => setData('tpd_postcode', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Home Tel
                        </label>
                        <input
                            type="text"
                            value={data.tpd_hometel}
                            onChange={(e) => setData('tpd_hometel', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile Tel
                        </label>
                        <input
                            type="text"
                            value={data.tpd_mobtel}
                            onChange={(e) => setData('tpd_mobtel', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Liability
                        </label>
                        <select
                            value={data.tpd_liability}
                            onChange={(e) => setData('tpd_liability', e.target.value)}
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

            {/* Third Party Section */}
            {activeSection === 'thirdparty' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={data.tp_fname}
                            onChange={(e) => setData('tp_fname', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
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
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <textarea
                            value={data.tp_address}
                            onChange={(e) => setData('tp_address', e.target.value)}
                            rows={3}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                        </label>
                        <input
                            type="text"
                            value={data.tp_country}
                            onChange={(e) => setData('tp_country', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Postcode
                        </label>
                        <input
                            type="text"
                            value={data.tp_postcode}
                            onChange={(e) => setData('tp_postcode', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
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
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={data.tp_desc}
                            onChange={(e) => setData('tp_desc', e.target.value)}
                            rows={4}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {processing ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
}
