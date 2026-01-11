import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import {
    BuildingOffice2Icon,
    UserGroupIcon,
    ShieldCheckIcon,
    WrenchScrewdriverIcon,
    BuildingLibraryIcon,
    TruckIcon,
    DocumentTextIcon,
    AcademicCapIcon,
    ArchiveBoxIcon,
    BeakerIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

export default function PartnersIndex({ auth }) {
    const partnerTypes = [
        {
            name: 'Host CO.',
            type: 'host-co',
            icon: BuildingOffice2Icon,
            color: 'text-blue-600',
        },
        {
            name: 'Appoint',
            type: 'medical-appointment',
            icon: BeakerIcon,
            color: 'text-blue-600',
        },
        {
            name: 'Insurer',
            type: 'insurer',
            icon: ShieldCheckIcon,
            color: 'text-blue-600',
        },
        {
            name: 'Agent',
            type: 'agent',
            icon: UserGroupIcon,
            color: 'text-blue-600',
        },
        {
            name: 'Hire',
            type: 'hire-company',
            icon: TruckIcon,
            color: 'text-blue-600',
        },
        {
            name: 'ATE',
            type: 'ate',
            icon: DocumentTextIcon,
            color: 'text-gray-900',
        },
        {
            name: 'Engineer',
            type: 'engineer',
            icon: WrenchScrewdriverIcon,
            color: 'text-blue-600',
        },
        {
            name: 'Medical',
            type: 'medical',
            icon: BuildingLibraryIcon,
            color: 'text-blue-600',
        },
        {
            name: 'Recovery',
            type: 'recovery',
            icon: ClockIcon,
            color: 'text-gray-600',
        },
        {
            name: 'Repairer',
            type: 'repairer',
            icon: WrenchScrewdriverIcon,
            color: 'text-gray-900',
        },
        {
            name: 'Solicitor',
            type: 'solicitor',
            icon: AcademicCapIcon,
            color: 'text-gray-900',
        },
        {
            name: 'Storage',
            type: 'storage',
            icon: ArchiveBoxIcon,
            color: 'text-blue-600',
        },
    ];

    return (
        <AppLayout title="Partners" auth={auth}>
            <Head title="Partners" />
            <div className="bg-white p-6">
                <div className="grid grid-cols-4 gap-8">
                    {partnerTypes.map((partnerType) => {
                        const Icon = partnerType.icon;
                        return (
                            <div key={partnerType.type} className="flex flex-col items-center text-center">
                                <Link
                                    href={`/partners/${partnerType.type}`}
                                    className="flex flex-col items-center mb-2 hover:opacity-80 transition-opacity"
                                >
                                    <Icon className={`h-24 w-24 ${partnerType.color} mb-2`} />
                                    <span className="text-sm font-medium text-gray-900">{partnerType.name}</span>
                                </Link>
                                <Link
                                    href={`/add-partners/${partnerType.type}`}
                                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                                >
                                    Add
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
