import { Head, Link, router } from '@inertiajs/react';
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
import PartnerModal from '@/Components/PartnerModal';
import { useState } from 'react';

export default function PartnersIndex({ auth }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedPartnerType, setSelectedPartnerType] = useState(null);
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
            <div className="bg-[#F7F7F7] min-h-full p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">Partners</h1>
                        <p className="text-sm text-gray-600 mt-1">Manage your partner organizations and services</p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
                        {partnerTypes.map((partnerType) => {
                            const Icon = partnerType.icon;
                            const isBlue = partnerType.color === 'text-blue-600';
                            const isGray = partnerType.color === 'text-gray-600' || partnerType.color === 'text-gray-900';
                            
                            return (
                                <div
                                    key={partnerType.type}
                                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                                >
                                    <Link
                                        href={`/partners/${partnerType.type}`}
                                        className="block p-6 pb-4"
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div className={`
                                                w-20 h-20 rounded-lg flex items-center justify-center mb-4
                                                transition-all duration-200
                                                ${isBlue 
                                                    ? 'bg-blue-50 group-hover:bg-blue-100' 
                                                    : isGray 
                                                        ? 'bg-gray-50 group-hover:bg-gray-100'
                                                        : 'bg-indigo-50 group-hover:bg-indigo-100'
                                                }
                                            `}>
                                                <Icon className={`h-12 w-12 ${partnerType.color} transition-transform duration-200 group-hover:scale-110`} />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900 mb-1">
                                                {partnerType.name}
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="px-6 pb-4 border-t border-gray-100">
                                        <button
                                            onClick={() => {
                                                setSelectedPartnerType(partnerType.type);
                                                setShowModal(true);
                                            }}
                                            className="w-full py-2 text-sm font-medium text-green-600 hover:text-white hover:bg-green-600 rounded-md transition-all duration-200 border border-green-600 hover:border-green-700"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Partner Modal */}
            <PartnerModal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedPartnerType(null);
                }}
                partnerType={selectedPartnerType}
                onSuccess={() => {
                    router.reload({ only: ['partners'] });
                }}
            />
        </AppLayout>
    );
}
