
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { WarrantyApplication, WarrantyStatus } from '../../types';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Modal from '../common/Modal';

const ApplicationActionModal: React.FC<{
    application: WarrantyApplication;
    action: 'Approve' | 'Reject';
    onClose: () => void;
    onSubmit: (id: string, status: WarrantyStatus, remarks: string) => void;
}> = ({ application, action, onClose, onSubmit }) => {
    const [remarks, setRemarks] = useState('');
    const status = action === 'Approve' ? WarrantyStatus.Approved : WarrantyStatus.Rejected;

    const handleSubmit = () => {
        onSubmit(application.id, status, remarks);
        onClose();
    };

    return (
        <Modal isOpen={true} onClose={onClose} title={`${action} Application`}>
            <p className="text-sm text-gray-500 mb-4">
                You are about to {action.toLowerCase()} the warranty application for <strong>{application.brand} {application.model}</strong> submitted by <strong>{application.userName}</strong>.
            </p>
            <div className="mb-4">
                <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks (optional for approval)</label>
                <textarea
                    id="remarks"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                />
            </div>
            <Button
                onClick={handleSubmit}
                variant={action === 'Approve' ? 'primary' : 'danger'}
            >
                Confirm {action}
            </Button>
        </Modal>
    );
};

const ApplicationList: React.FC = () => {
    const { applications, updateApplicationStatus } = useAppContext();
    const [filter, setFilter] = useState<WarrantyStatus | 'All'>('All');
    const [modalState, setModalState] = useState<{ app: WarrantyApplication; action: 'Approve' | 'Reject' } | null>(null);

    const filteredApplications = useMemo(() => {
        let apps = [...applications];
        if (filter !== 'All') {
            apps = apps.filter(app => app.status === filter);
        }
        return apps.sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());
    }, [applications, filter]);
    
    const openModal = (app: WarrantyApplication, action: 'Approve' | 'Reject') => {
        setModalState({ app, action });
    };

    const closeModal = () => {
        setModalState(null);
    };

    return (
        <Card>
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">All Applications</h2>
                <div className="my-4 flex flex-wrap gap-2">
                    {(['All', ...Object.values(WarrantyStatus)]).map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status as WarrantyStatus | 'All')}
                            className={`px-4 py-2 text-sm font-medium rounded-full ${filter === status ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 ring-1 ring-inset ring-gray-200'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredApplications.map(app => (
                                <tr key={app.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.userName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.brand} {app.model}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.submittedDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><Badge status={app.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {app.status === WarrantyStatus.Pending && (
                                            <div className="flex justify-end space-x-2">
                                                <button onClick={() => openModal(app, 'Approve')} className="text-indigo-600 hover:text-indigo-900">Approve</button>
                                                <button onClick={() => openModal(app, 'Reject')} className="text-red-600 hover:text-red-900">Reject</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredApplications.length === 0 && (
                     <p className="text-center text-gray-500 py-8">No applications found for this filter.</p>
                )}
            </div>
            {modalState && (
                <ApplicationActionModal
                    application={modalState.app}
                    action={modalState.action}
                    onClose={closeModal}
                    onSubmit={updateApplicationStatus}
                />
            )}
        </Card>
    );
};

export default ApplicationList;
