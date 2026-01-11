import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function ReportsIndex({ auth }) {
    return (
        <AppLayout title="Reports" auth={auth}>
            <Head title="Reports" />
            <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Reports</h1>

                <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-gray-500">Reporting functionality coming soon...</p>
                </div>
            </div>
        </AppLayout>
    );
}
