
import React, { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { WarrantyStatus } from '../../types';
import Card from '../common/Card';

const AdminReports: React.FC = () => {
    const { applications } = useAppContext();

    const stats = useMemo(() => {
        return {
            total: applications.length,
            approved: applications.filter(app => app.status === WarrantyStatus.Approved).length,
            pending: applications.filter(app => app.status === WarrantyStatus.Pending).length,
            rejected: applications.filter(app => app.status === WarrantyStatus.Rejected).length,
        };
    }, [applications]);

    return (
        <Card>
            <div className="p-6">
                 <h2 className="text-xl font-semibold mb-4">Application Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <p className="text-3xl font-bold text-blue-800">{stats.total}</p>
                        <p className="text-sm font-medium text-blue-700">Total Applications</p>
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
            </div>
        </Card>
    );
};

export default AdminReports;
