import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import DateInput from '@/Components/DateInput';
import WitnessModal from '@/Components/WitnessModal';
import ShowWitnessModal from '@/Components/ShowWitnessModal';
import toast from 'react-hot-toast';

export default function AccidentForm({ client, className = '' }) {
    const [expandedSections, setExpandedSections] = useState({
        policeDetails: false,
        witnessOtherParty: false,
        sketchPreviousAccidents: false,
        mibClaims: false,
        busCoach: false,
        liability: false,
    });

    const [showWitnessModal, setShowWitnessModal] = useState(false);
    const [showWitnessListModal, setShowWitnessListModal] = useState(false);
    const [selectedWitness, setSelectedWitness] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        claimid: client.id,
        accident_date: client.accident?.accident_date ? (typeof client.accident.accident_date === 'string' ? client.accident.accident_date : client.accident.accident_date.split('T')[0]) : null,
        accident_time: client.accident?.accident_time || '',
        accident_cond: client.accident?.accident_cond || '',
        accident_other: client.accident?.accident_other || '',
        accident_rcond: client.accident?.accident_rcond || '',
        accident_rother: client.accident?.accident_rother || '',
        accident_speed: client.accident?.accident_speed || '',
        accident_tp: client.accident?.accident_tp || '',
        accident_circum: client.accident?.accident_circum || '',
        accident_circumd: client.accident?.accident_circumd || '',
        accident_loca: client.accident?.accident_loca || '',
        accident_seatbelt: client.accident?.accident_seatbelt || '',
        accident_accbook: client.accident?.accident_accbook || '',
        activetab: '#accident',
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleDateChange = (name, value) => {
        setData(name, value);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/updateclaim', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Accident information updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update accident information. Please check the form for errors.');
            },
        });
    };

    // Parse speed if stored as "client_speed/tp_speed"
    const speedParts = data.accident_speed ? data.accident_speed.split('/') : ['', ''];
    const clientSpeed = speedParts[0]?.trim() || '';
    const tpSpeed = speedParts[1]?.trim() || '';

    const handleSpeedChange = (type, value) => {
        if (type === 'client') {
            setData('accident_speed', value ? `${value}${tpSpeed ? '/' + tpSpeed : ''}` : (tpSpeed || ''));
        } else {
            setData('accident_speed', clientSpeed ? `${clientSpeed}/${value}` : (value || ''));
        }
    };

    return (
        <form onSubmit={submit} className={`space-y-6 ${className}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date/Time
                        </label>
                        <div className="flex gap-2 items-start">
                            <div className="flex-1">
                                <DateInput
                                    value={data.accident_date}
                                    onChange={(value) => handleDateChange('accident_date', value)}
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={data.accident_time}
                                    onChange={(e) => setData('accident_time', e.target.value)}
                                    placeholder="3:15pm"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                            </div>
                        </div>
                        <InputError message={errors.accident_date} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location?
                        </label>
                        <input
                            type="text"
                            value={data.accident_loca}
                            onChange={(e) => setData('accident_loca', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <InputError message={errors.accident_loca} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Weather Conditions
                        </label>
                        <select
                            value={data.accident_cond}
                            onChange={(e) => setData('accident_cond', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select...</option>
                            <option value="Clear">Clear</option>
                            <option value="Cloudy">Cloudy</option>
                            <option value="Rain">Rain</option>
                            <option value="Snow">Snow</option>
                            <option value="Fog">Fog</option>
                            <option value="Other">Other</option>
                        </select>
                        <InputError message={errors.accident_cond} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Road Conditions
                        </label>
                        <select
                            value={data.accident_rcond}
                            onChange={(e) => setData('accident_rcond', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select...</option>
                            <option value="Dry">Dry</option>
                            <option value="Wet">Wet</option>
                            <option value="Ice">Ice</option>
                            <option value="Snow">Snow</option>
                            <option value="Other">Other</option>
                        </select>
                        <InputError message={errors.accident_rcond} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Speed Client:
                        </label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={clientSpeed}
                                onChange={(e) => handleSpeedChange('client', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <span className="text-gray-500">/TP</span>
                            <input
                                type="text"
                                value={tpSpeed}
                                onChange={(e) => handleSpeedChange('tp', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <InputError message={errors.accident_speed} className="mt-2" />
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Description Of The Accident</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Circumstances?
                                </label>
                                <select
                                    value={data.accident_circum}
                                    onChange={(e) => setData('accident_circum', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select...</option>
                                    <option value="Claimant Vehicle Hit In The Rear">Claimant Vehicle Hit In The Rear</option>
                                    <option value="Claimant Vehicle Hit In The Front">Claimant Vehicle Hit In The Front</option>
                                    <option value="Claimant Vehicle Hit In The Side">Claimant Vehicle Hit In The Side</option>
                                    <option value="Other">Other</option>
                                </select>
                                <InputError message={errors.accident_circum} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Brief Description Of The Accident Including Appoximate Speed Of All Vehicles And Area Of The Vehicle Damage?
                                </label>
                                <textarea
                                    value={data.accident_circumd}
                                    onChange={(e) => setData('accident_circumd', e.target.value)}
                                    rows={6}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <InputError message={errors.accident_circumd} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Wear A Seatbelt?
                                </label>
                                <select
                                    value={data.accident_seatbelt}
                                    onChange={(e) => setData('accident_seatbelt', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select...</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    <option value="Unknown">Unknown</option>
                                </select>
                                <InputError message={errors.accident_seatbelt} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Recorded In Accident Book?
                                </label>
                                <select
                                    value={data.accident_accbook}
                                    onChange={(e) => setData('accident_accbook', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select...</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                <InputError message={errors.accident_accbook} className="mt-2" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-2">
                    {/* Police Details Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => toggleSection('policeDetails')}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Police Details</span>
                            <span>{expandedSections.policeDetails ? '−' : '+'}</span>
                        </button>

                        {expandedSections.policeDetails && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Was The Incident Reported To Police?
                                    </label>
                                    <select
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Select...</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name And Address Of Police Station?
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name Of The Reporting Officer?
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Referrence #
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Witness/Other Party Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => toggleSection('witnessOtherParty')}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Witness/Other Party</span>
                            <span>{expandedSections.witnessOtherParty ? '−' : '+'}</span>
                        </button>

                        {expandedSections.witnessOtherParty && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedWitness(null);
                                            setShowWitnessModal(true);
                                        }}
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Add Witness
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowWitnessListModal(true)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Show Witness
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sketch/Previous Accidents Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => toggleSection('sketchPreviousAccidents')}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Sketch/Previous Accidents</span>
                            <span>{expandedSections.sketchPreviousAccidents ? '−' : '+'}</span>
                        </button>

                        {expandedSections.sketchPreviousAccidents && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <p className="text-sm text-gray-500">Sketch and previous accidents will be implemented here.</p>
                            </div>
                        )}
                    </div>

                    {/* MIB Claims Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => toggleSection('mibClaims')}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>MIB Claims - For Uninsured Cases</span>
                            <span>{expandedSections.mibClaims ? '−' : '+'}</span>
                        </button>

                        {expandedSections.mibClaims && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <p className="text-sm text-gray-500">MIB Claims fields will be implemented here.</p>
                            </div>
                        )}
                    </div>

                    {/* Accidents Involving Bus/Coach Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => toggleSection('busCoach')}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Accidents Involving Bus/Coach</span>
                            <span>{expandedSections.busCoach ? '−' : '+'}</span>
                        </button>

                        {expandedSections.busCoach && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <p className="text-sm text-gray-500">Bus/Coach fields will be implemented here.</p>
                            </div>
                        )}
                    </div>

                    {/* Liability Section */}
                    <div className="border border-blue-500 rounded-lg bg-blue-50">
                        <button
                            type="button"
                            onClick={() => toggleSection('liability')}
                            className="w-full flex items-center justify-between p-4 text-left text-blue-700 font-semibold"
                        >
                            <span>Liability</span>
                            <span>{expandedSections.liability ? '−' : '+'}</span>
                        </button>

                        {expandedSections.liability && (
                            <div className="p-4 space-y-4 border-t border-blue-200 bg-white">
                                <p className="text-sm text-gray-500">Liability fields will be implemented here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </div>

            {/* Witness Modals */}
            <WitnessModal
                show={showWitnessModal}
                onClose={() => {
                    setShowWitnessModal(false);
                    setSelectedWitness(null);
                }}
                client={client}
                witness={selectedWitness}
            />

            <ShowWitnessModal
                show={showWitnessListModal}
                onClose={() => setShowWitnessListModal(false)}
                witnesses={client.witnesses || []}
                onEdit={(witness) => {
                    setSelectedWitness(witness);
                    setShowWitnessListModal(false);
                    setShowWitnessModal(true);
                }}
                onDelete={() => {
                    // Refresh will happen automatically via Inertia
                }}
            />
        </form>
    );
}
