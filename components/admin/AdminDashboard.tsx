
import React from 'react';
import AdminReports from './AdminReports';
import ApplicationList from './ApplicationList';

const AdminDashboard: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <AdminReports />
            <ApplicationList />
        </div>
    );
};

export default AdminDashboard;
