
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { PRODUCT_CATEGORIES } from '../../constants';
import { Product } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';

const initialFormState: Product = {
    brand: '', model: '', category: PRODUCT_CATEGORIES[0], serialNumber: '',
    purchaseDate: '', dealerName: '', invoice: null, invoicePreview: '',
};

const WarrantyForm: React.FC = () => {
    const [formData, setFormData] = useState<Product>(initialFormState);
    const [isLoading, setIsLoading] = useState(false);
    const { addApplication } = useAppContext();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({
                ...prev,
                invoice: file,
                invoicePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => { // Simulate API Call
            addApplication(formData);
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <Card className="p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Register a New Product</h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input id="brand" name="brand" label="Brand" value={formData.brand} onChange={handleChange} required />
                        <Input id="model" name="model" label="Model" value={formData.model} onChange={handleChange} required />
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Product Category</label>
                            <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {PRODUCT_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <Input id="serialNumber" name="serialNumber" label="IMEI / Serial Number" value={formData.serialNumber} onChange={handleChange} required />
                        <Input id="purchaseDate" name="purchaseDate" label="Date of Purchase" type="date" value={formData.purchaseDate} onChange={handleChange} required />
                        <Input id="dealerName" name="dealerName" label="Store / Dealer Name" value={formData.dealerName} onChange={handleChange} required />
                        <div className="md:col-span-2">
                            <label htmlFor="invoice" className="block text-sm font-medium leading-6 text-gray-900">Purchase Invoice</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    {formData.invoicePreview ? (
                                        <img src={formData.invoicePreview} alt="Invoice Preview" className="mx-auto h-32 w-auto object-contain" />
                                    ) : (
                                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label htmlFor="invoice" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                            <span>Upload a file</span>
                                            <input id="invoice" name="invoice" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,.pdf" required />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, PDF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <Button type="submit" isLoading={isLoading} className="w-full">Submit for Verification</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default WarrantyForm;
