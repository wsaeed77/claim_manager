import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    HomeIcon,
    MagnifyingGlassIcon,
    ChartBarIcon,
    BuildingOfficeIcon,
    Bars3Icon,
    XMarkIcon,
    DocumentArrowDownIcon,
    PlusIcon,
    ShieldCheckIcon,
    BellIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    PowerIcon,
    CogIcon,
    ArrowsPointingOutIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline';
import CreateClientModal from '@/Components/CreateClientModal';

export default function AppLayout({ children, title = 'Claim Manager', auth, claimid, preFilledFormValues, partners, users, claimCounts: claimCountsProp }) {
    // Get shared props from Inertia
    const { props } = usePage();
    const claimCounts = claimCountsProp || props.claimCounts || null;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [summaryExpanded, setSummaryExpanded] = useState(false);
    const { post } = useForm();

    const topMenuItems = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'Save', href: '#', icon: DocumentArrowDownIcon, onClick: true },
        { name: 'Create', href: '#', icon: PlusIcon, onClick: () => setShowCreateModal(true) },
        { name: 'View Partners', href: '/partners', icon: BuildingOfficeIcon },
        { name: 'Search', href: '/search', icon: MagnifyingGlassIcon },
        { name: 'Report', href: '/reports', icon: ChartBarIcon },
        { name: 'Reminder', href: '/reminder', icon: BellIcon },
        { name: 'Batch', href: '/batches', icon: ShieldCheckIcon },
    ];

    const handleLogout = (e) => {
        e.preventDefault();
        post('/logout');
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Save functionality - can be implemented later
        console.log('Save clicked');
    };

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar - Dark Blue */}
                <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#2A3F54] transform transition-transform duration-200 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 md:static md:inset-0`}>
                    <div className="flex flex-col h-full">
                        {/* Logo */}


                        {/* User Profile Section */}
                        <div className="px-6 py-4 border-b border-[#34495E]">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                                    <span className="text-[#2A3F54] font-medium text-lg">
                                        {auth?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <p className="text-xs text-gray-300">Welcome,</p>
                                    <p className="text-sm font-semibold text-white truncate">
                                        {auth?.user?.name || 'Guest'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation - Summary */}
                        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                            <div className="mb-4">
                                <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">GENERAL</h3>
                                <div className="mt-1">
                                    <button
                                        onClick={() => setSummaryExpanded(!summaryExpanded)}
                                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-white hover:bg-[#34495E] rounded-md transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <HomeIcon className="h-5 w-5 mr-2" />
                                            <span>Summary</span>
                                        </div>
                                        {summaryExpanded ? (
                                            <ChevronUpIcon className="h-4 w-4" />
                                        ) : (
                                            <ChevronDownIcon className="h-4 w-4" />
                                        )}
                                    </button>
                                    {summaryExpanded && (
                                        <div className="ml-7 mt-1 space-y-1">
                                            <Link
                                                href="/reports?period=all&start_date=&end_date=&case_status[]=Pending&report_type=Pending/Referred/Fleet&group_by=agent&select=all&order_by=case_number"
                                                className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#34495E] rounded-md transition-colors"
                                            >
                                                Pending: ({claimCounts?.pending || 0})
                                            </Link>
                                            <Link
                                                href="/reports?period=all&start_date=&end_date=&case_status[]=On+Hold&report_type=Pending/Referred/Fleet&group_by=agent&select=all&order_by=case_number"
                                                className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#34495E] rounded-md transition-colors"
                                            >
                                                On Hold: ({claimCounts?.on_hold || 0})
                                            </Link>
                                            <Link
                                                href="/reports?period=all&start_date=&end_date=&case_status[]=Declined&report_type=Pending/Referred/Fleet&group_by=agent&select=all&order_by=case_number"
                                                className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#34495E] rounded-md transition-colors"
                                            >
                                                Decline: ({claimCounts?.declined || 0})
                                            </Link>
                                            <Link
                                                href="/reports?period=all&start_date=&end_date=&case_status[]=Referred&report_type=Pending/Referred/Fleet&group_by=agent&select=all&order_by=case_number"
                                                className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#34495E] rounded-md transition-colors"
                                            >
                                                Referred: ({claimCounts?.referred || 0})
                                            </Link>
                                            <Link
                                                href="/reports?period=all&start_date=&end_date=&case_status[]=Fleet&report_type=Pending/Referred/Fleet&group_by=agent&select=all&order_by=case_number"
                                                className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#34495E] rounded-md transition-colors"
                                            >
                                                Fleet: ({claimCounts?.fleet || 0})
                                            </Link>
                                            <Link
                                                href="/reports?period=all&start_date=&end_date=&case_status[]=Live&report_type=Pending/Referred/Fleet&group_by=agent&select=all&order_by=case_number"
                                                className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#34495E] rounded-md transition-colors"
                                            >
                                                Live: ({claimCounts?.live || 0})
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </nav>

                        {/* Footer */}
                        <div className="border-t border-[#34495E] p-4">
                            <div className="flex items-center justify-between mb-3">
                                <a
                                    href="https://smartjacks.co.uk/cm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-gray-400 hover:text-white transition-colors"
                                >
                                    https://smartjacks.co.uk/cm
                                </a>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                    title="Settings"
                                >
                                    <CogIcon className="h-5 w-5" />
                                </button>
                                <button
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                    title="FullScreen"
                                >
                                    <ArrowsPointingOutIcon className="h-5 w-5" />
                                </button>
                                <button
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                    title="Lock"
                                >
                                    <LockClosedIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                    title="Logout"
                                >
                                    <PowerIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main content */}
                <div className="flex-1 flex flex-col md:ml-0 min-w-0">
                    {/* Top Navigation Bar with Icons */}
                    <header className="flex-shrink-0 bg-[#EDEDED] border-b border-[#D9DEE4]">
                        <div className="flex items-center justify-between h-auto px-4 py-2">
                            <div className="flex items-center space-x-1">
                                {topMenuItems.map((item) => {
                                    const Icon = item.icon;
                                    const content = (
                                        <div className="flex flex-col items-center justify-center px-3 py-2 hover:bg-[#D9DEE4] rounded transition-colors cursor-pointer">
                                            <Icon className="h-10 w-10 text-[#34495E] mb-1" />
                                            <span className="text-xs text-[#34495E] text-center leading-tight">{item.name}</span>
                                        </div>
                                    );

                                    if (item.onClick === true) {
                                        return (
                                            <div key={item.name} onClick={handleSave}>
                                                {content}
                                            </div>
                                        );
                                    }

                                    if (typeof item.onClick === 'function') {
                                        return (
                                            <div key={item.name} onClick={item.onClick}>
                                                {content}
                                            </div>
                                        );
                                    }

                                    return (
                                        <Link key={item.name} href={item.href} className="no-underline">
                                            {content}
                                        </Link>
                                    );
                                })}
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                                        <span className="text-[#34495E] font-medium text-xs">
                                            {auth?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                    <span className="text-sm text-[#34495E]">{auth?.user?.name || 'Guest'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-[#5A738E] hover:text-[#34495E]"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 overflow-auto bg-[#F7F7F7]">
                        <div className="px-4 py-4 sm:px-6 lg:px-8">
                            <div className="max-w-full mx-auto">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>

                {/* Create Client Modal */}
                <CreateClientModal
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    preFilledFormValues={preFilledFormValues}
                    partners={partners}
                    users={users}
                    auth={auth}
                    onSuccess={() => {
                        router.reload({ only: ['clients', 'preFilledFormValues', 'partners', 'users'] });
                    }}
                    onOpen={() => {
                        // Reload preFilledFormValues when modal opens to get latest case number
                        // Partners and users are already available globally, no need to reload
                        router.reload({ only: ['preFilledFormValues'] });
                    }}
                />
            </div>
        </>
    );
}
