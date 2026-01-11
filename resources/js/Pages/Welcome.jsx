import { Head, Link } from '@inertiajs/react';
import AppLayout from './Layouts/AppLayout';
import {
    PlusIcon,
    UserGroupIcon,
    MagnifyingGlassIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

export default function Welcome({ auth }) {
    const quickActions = [
        {
            name: 'Create New Client',
            description: 'Add a new client and claim to the system',
            href: '/make',
            icon: PlusIcon,
            color: 'bg-indigo-500',
        },
        {
            name: 'View All Clients',
            description: 'Browse and manage all clients',
            href: '/',
            icon: UserGroupIcon,
            color: 'bg-blue-500',
        },
        {
            name: 'Search',
            description: 'Search for clients and claims',
            href: '/search',
            icon: MagnifyingGlassIcon,
            color: 'bg-purple-500',
        },
        {
            name: 'Reports',
            description: 'View reports and analytics',
            href: '/reports',
            icon: ChartBarIcon,
            color: 'bg-green-500',
        },
        {
            name: 'Payments',
            description: 'Manage invoices and payouts',
            href: '/invoice_list',
            icon: CurrencyDollarIcon,
            color: 'bg-yellow-500',
        },
        {
            name: 'Partners',
            description: 'Manage business partners',
            href: '/partners',
            icon: BuildingOfficeIcon,
            color: 'bg-pink-500',
        },
    ];

    return (
        <AppLayout title="Dashboard" auth={auth}>
            <Head title="Dashboard" />
            <div>
                {/* Welcome Section */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome back, {auth?.user?.name?.split(' ')[0] || 'User'}!
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Here's what's happening with your claims today.
                    </p>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={action.name}
                                href={action.href}
                                className="group relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-indigo-300 transition-all duration-200"
                            >
                                <div className="flex items-start">
                                    <div className={`${action.color} p-3 rounded-lg`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                            {action.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {action.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Stats Section - Placeholder */}
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-500">Total Clients</div>
                        <div className="mt-2 text-3xl font-bold text-gray-900">-</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-500">Active Claims</div>
                        <div className="mt-2 text-3xl font-bold text-gray-900">-</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-500">Pending Payments</div>
                        <div className="mt-2 text-3xl font-bold text-gray-900">-</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-500">Partners</div>
                        <div className="mt-2 text-3xl font-bold text-gray-900">-</div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
