
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { WarrantyApplication, WarrantyStatus } from '../../types';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Modal from '../common/Modal';
import WarrantyCertificate from './WarrantyCertificate';

const UserDashboard: React.FC = () => {
    const { user, applications } = useAppContext();
    const [filter, setFilter] = useState<WarrantyStatus | 'All'>('All');
    const [selectedApp, setSelectedApp] = useState<WarrantyApplication | null>(null);

    const userApplications = useMemo(() => {
        let apps = applications.filter(app => app.userId === user?.id);
        if (filter !== 'All') {
            apps = apps.filter(app => app.status === filter);
        }
        return apps.sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());
    }, [applications, user, filter]);

    const handleViewCertificate = (app: WarrantyApplication) => {
        setSelectedApp(app);
    };

    const closeModal = () => {
        setSelectedApp(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Products</h1>
            <div className="mb-6 flex space-x-2">
                {(['All', ...Object.values(WarrantyStatus)]).map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status as WarrantyStatus | 'All')}
                        className={`px-4 py-2 text-sm font-medium rounded-full ${filter === status ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        {status}
                    </button>
                ))}
            </div>
            {userApplications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userApplications.map(app => (
                        <Card key={app.id} className="flex flex-col">
                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-semibold text-gray-800">{app.brand} {app.model}</h2>
                                    <Badge status={app.status} />
                                </div>
                                <p className="text-sm text-gray-500 mb-4">{app.category}</p>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><span className="font-medium">Serial No:</span> {app.serialNumber}</p>
                                    <p><span className="font-medium">Purchase Date:</span> {app.purchaseDate}</p>
                                    <p><span className="font-medium">Submitted:</span> {app.submittedDate}</p>
                                    {app.remarks && <p className="mt-2 text-sm text-red-600 italic">Admin Remarks: {app.remarks}</p>}
                                </div>
                            </div>
                            {app.status === WarrantyStatus.Approved && (
                                <div className="p-4 bg-gray-50 border-t">
                                     <Button onClick={() => handleViewCertificate(app)}>View Certificate</Button>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="p-8 text-center text-gray-500">
                    <p>You have not registered any products yet.</p>
                </Card>
            )}

            <Modal isOpen={!!selectedApp} onClose={closeModal} title="Warranty Certificate">
                {selectedApp && <WarrantyCertificate application={selectedApp} />}
            </Modal>
        </div>
    );
};

export default UserDashboard;
