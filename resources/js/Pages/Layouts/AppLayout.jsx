import { Head, Link, useForm } from '@inertiajs/react';
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
} from '@heroicons/react/24/outline';

export default function AppLayout({ children, title = 'Claim Manager', auth, claimid }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { post } = useForm();

    const topMenuItems = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'Save', href: '#', icon: DocumentArrowDownIcon, onClick: true },
        { name: 'Create', href: '/make', icon: PlusIcon },
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
                        <div className="flex items-center justify-between h-16 px-6 border-b border-[#34495E]">
                            <div className="flex items-center">
                                <Bars3Icon className="h-6 w-6 text-white mr-3" />
                                <span className="text-lg font-semibold text-white">INVENTORY!</span>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="md:hidden text-gray-400 hover:text-white"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Navigation - Summary */}
                        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                            <div className="px-3 py-2 text-white">
                                <div className="flex items-center">
                                    <HomeIcon className="h-5 w-5 mr-2" />
                                    <span className="text-sm font-medium">Summary</span>
                                </div>
                            </div>
                        </nav>

                        {/* User section */}
                        <div className="border-t border-[#34495E] p-4">
                            <div className="flex items-center mb-3">
                                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-[#2A3F54] font-medium text-sm">
                                        {auth?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                        {auth?.user?.name || 'Guest'}
                                    </p>
                                </div>
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

                                    if (item.onClick) {
                                        return (
                                            <div key={item.name} onClick={handleSave}>
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
            </div>
        </>
    );
}
