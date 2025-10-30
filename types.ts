
export enum WarrantyStatus {
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected',
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'admin';
}

export interface Product {
    brand: string;
    model: string;
    category: string;
    serialNumber: string;
    purchaseDate: string;
    dealerName: string;
    invoice: File | null;
    invoicePreview?: string;
}

export interface WarrantyApplication extends Product {
    id: string;
    userId: string;
    userName: string;
    status: WarrantyStatus;
    submittedDate: string;
    warrantyId?: string;
    remarks?: string;
}
