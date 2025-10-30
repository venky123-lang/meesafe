import React from 'react';
import { WarrantyApplication } from '../../types';
import Button from '../common/Button';

interface WarrantyCertificateProps {
  application: WarrantyApplication;
}

const WarrantyCertificate: React.FC<WarrantyCertificateProps> = ({ application }) => {

    const handlePrint = () => {
        const printableContent = document.getElementById('certificate-to-print');
        if (printableContent) {
            const printWindow = window.open('', '_blank');
            printWindow?.document.write('<html><head><title>Print Certificate</title>');
            printWindow?.document.write('<script src="https://cdn.tailwindcss.com"></script>');
            printWindow?.document.write('</head><body>');
            printWindow?.document.write(printableContent.innerHTML);
            printWindow?.document.write('</body></html>');
            printWindow?.document.close();
            printWindow?.print();
        }
    };

    const validityDate = new Date(application.purchaseDate);
    validityDate.setFullYear(validityDate.getFullYear() + 1);

    return (
        <div>
            <div id="certificate-to-print" className="p-6 border-2 border-dashed border-gray-400 bg-slate-50 rounded-lg">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-indigo-700">Warranty Certificate</h2>
                    <p className="text-gray-500">Official proof of warranty</p>
                </div>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div className="col-span-2 sm:col-span-1">
                        <p className="font-semibold text-gray-800">Warranty ID</p>
                        <p className="text-gray-600">{application.warrantyId}</p>
                    </div>
                     <div className="col-span-2 sm:col-span-1">
                        <p className="font-semibold text-gray-800">Customer Name</p>
                        <p className="text-gray-600">{application.userName}</p>
                    </div>
                    <div className="col-span-2 border-t my-2"></div>
                    <div className="col-span-2 sm:col-span-1">
                        <p className="font-semibold text-gray-800">Product</p>
                        <p className="text-gray-600">{application.brand} {application.model}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <p className="font-semibold text-gray-800">Serial Number</p>
                        <p className="text-gray-600">{application.serialNumber}</p>
                    </div>
                     <div className="col-span-2 sm:col-span-1">
                        <p className="font-semibold text-gray-800">Purchase Date</p>
                        <p className="text-gray-600">{application.purchaseDate}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <p className="font-semibold text-gray-800">Warranty Valid Until</p>
                        <p className="text-gray-600">{validityDate.toISOString().split('T')[0]}</p>
                    </div>
                </div>

                 <div className="mt-8 text-center text-xs text-gray-400">
                    <p>This certificate is computer generated and does not require a signature.</p>
                    <p>&copy; {new Date().getFullYear()} Misafe Inc. All rights reserved.</p>
                </div>
            </div>
            <div className="mt-6">
                <Button onClick={handlePrint} variant="secondary">
                    Download / Print
                </Button>
            </div>
        </div>
    );
};

export default WarrantyCertificate;