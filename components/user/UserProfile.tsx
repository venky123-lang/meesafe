
import React, { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { WarrantyStatus } from '../../types';
import Card from '../common/Card';

const UserProfile: React.FC = () => {
    const { user, applications } = useAppContext();

    const stats = useMemo(() => {
        if (!user) return { total: 0, approved: 0, pending: 0, rejected: 0 };
        const userApps = applications.filter(app => app.userId === user.id);
        return {
            total: userApps.length,
            approved: userApps.filter(app => app.status === WarrantyStatus.Approved).length,
            pending: userApps.filter(app => app.status === WarrantyStatus.Pending).length,
            rejected: userApps.filter(app => app.status === WarrantyStatus.Rejected).length,
        };
    }, [user, applications]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 p-6">
                    <h2 className="text-xl font-semibold mb-4">Account Details</h2>
                    <div className="space-y-3 text-gray-700">
                        <p><span className="font-medium text-gray-900">Name:</span> {user.name}</p>
                        <p><span className="font-medium text-gray-900">Email:</span> {user.email}</p>
                        <p><span className="font-medium text-gray-900">Phone:</span> {user.phone}</p>
                    </div>
                </Card>
                <Card className="lg:col-span-2 p-6">
                    <h2 className="text-xl font-semibold mb-4">Warranty Statistics</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-blue-100 p-4 rounded-lg">
                            <p className="text-3xl font-bold text-blue-800">{stats.total}</p>
                            <p className="text-sm font-medium text-blue-700">Total Registered</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg">
                            <p className="text-3xl font-bold text-green-800">{stats.approved}</p>
                            <p className="text-sm font-medium text-green-700">Approved</p>
                        </div>
                         <div className="bg-yellow-100 p-4 rounded-lg">
                            <p className="text-3xl font-bold text-yellow-800">{stats.pending}</p>
                            <p className="text-sm font-medium text-yellow-700">Pending</p>
                        </div>
                        <div className="bg-red-100 p-4 rounded-lg">
                            <p className="text-3xl font-bold text-red-800">{stats.rejected}</p>
                            <p className="text-sm font-medium text-red-700">Rejected</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default UserProfile;
