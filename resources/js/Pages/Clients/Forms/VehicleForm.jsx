import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function VehicleForm({ client, partners, onSave }) {
    const { data, setData, post, processing } = useForm({
        claimid: client.id,
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
        activetab: '#vehicle',
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Registration
                    </label>
                    <input
                        type="text"
                        value={data.vehicle_reg}
                        onChange={(e) => setData('vehicle_reg', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
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
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Registration Date
                    </label>
                    <input
                        type="text"
                        value={data.vehicle_regdate}
                        onChange={(e) => setData('vehicle_regdate', e.target.value)}
                        placeholder="dd-mm-yyyy"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
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
                        <option value="Semi-Automatic">Semi-Automatic</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Engine
                    </label>
                    <input
                        type="text"
                        value={data.vehicle_engine}
                        onChange={(e) => setData('vehicle_engine', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Engine Group
                    </label>
                    <input
                        type="text"
                        value={data.vehicle_egroup}
                        onChange={(e) => setData('vehicle_egroup', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
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
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Market Value
                    </label>
                    <input
                        type="text"
                        value={data.vehicle_mvalue}
                        onChange={(e) => setData('vehicle_mvalue', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Occupants
                    </label>
                    <input
                        type="text"
                        value={data.vehicle_occupants}
                        onChange={(e) => setData('vehicle_occupants', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Damage
                    </label>
                    <input
                        type="text"
                        value={data.vehicle_damage}
                        onChange={(e) => setData('vehicle_damage', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        PCO
                    </label>
                    <select
                        value={data.vehicle_pco}
                        onChange={(e) => setData('vehicle_pco', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
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
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Condition
                    </label>
                    <input
                        type="text"
                        value={data.vehicle_condition}
                        onChange={(e) => setData('vehicle_condition', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

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
