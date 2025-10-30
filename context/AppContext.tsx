import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, WarrantyApplication, WarrantyStatus } from '../types';

interface NotificationState {
    message: string;
    type: 'success' | 'error' | 'info';
}

interface AppContextType {
    user: User | null;
    users: User[];
    applications: WarrantyApplication[];
    notification: NotificationState | null;
    login: (email: string, pass: string, isAdmin?: boolean) => boolean;
    logout: () => void;
    register: (name: string, email: string, phone: string, pass: string) => boolean;
    addApplication: (app: Omit<WarrantyApplication, 'id' | 'userId' | 'userName' | 'status' | 'submittedDate'>) => void;
    updateApplicationStatus: (id: string, status: WarrantyStatus, remarks: string) => void;
    setNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialUsers: User[] = [
    { id: 'user-1', name: 'John Doe', email: 'user@example.com', phone: '123-456-7890', role: 'user' },
    { id: 'admin-1', name: 'Admin', email: 'admin@example.com', phone: '987-654-3210', role: 'admin' },
];

const initialApplications: WarrantyApplication[] = [
    {
        id: 'app-1', userId: 'user-1', userName: 'John Doe', brand: 'Apple', model: 'iPhone 15 Pro', category: 'Mobile Phone',
        serialNumber: 'SN123456789', purchaseDate: '2023-10-15', dealerName: 'Apple Store', invoice: null,
        status: WarrantyStatus.Approved, submittedDate: '2023-10-20', warrantyId: 'WID-2023-001', remarks: 'All documents verified.'
    },
    {
        id: 'app-2', userId: 'user-1', userName: 'John Doe', brand: 'Dell', model: 'XPS 15', category: 'Laptop',
        serialNumber: 'SN987654321', purchaseDate: '2023-09-01', dealerName: 'Best Buy', invoice: null,
        status: WarrantyStatus.Pending, submittedDate: '2023-09-05'
    },
     {
        id: 'app-3', userId: 'user-1', userName: 'John Doe', brand: 'Sony', model: 'Bravia A95L', category: 'Television',
        serialNumber: 'SN555555555', purchaseDate: '2023-11-01', dealerName: 'Amazon', invoice: null,
        status: WarrantyStatus.Rejected, submittedDate: '2023-11-02', remarks: 'Invoice is not legible.'
    },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [applications, setApplications] = useState<WarrantyApplication[]>(initialApplications);
    const [notification, setNotificationState] = useState<NotificationState | null>(null);

    const setNotification = (message: string, type: 'success' | 'error' | 'info') => {
        setNotificationState({ message, type });
    };

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotificationState(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const login = (email: string, pass: string, isAdmin = false): boolean => {
        // Mock password check
        const targetRole = isAdmin ? 'admin' : 'user';
        const foundUser = users.find(u => u.email === email && u.role === targetRole);
        if (foundUser) {
            setUser(foundUser);
            setNotification('Login successful!', 'success');
            return true;
        }
        setNotification('Invalid credentials.', 'error');
        return false;
    };

    const logout = () => {
        setUser(null);
        setNotification('You have been logged out.', 'info');
    };

    const register = (name: string, email: string, phone: string, pass: string): boolean => {
        if (users.some(u => u.email === email)) {
            setNotification('An account with this email already exists.', 'error');
            return false;
        }
        const newUser: User = { id: `user-${Date.now()}`, name, email, phone, role: 'user' };
        setUsers(prev => [...prev, newUser]);
        setUser(newUser); // Auto-login after registration
        setNotification('Registration successful!', 'success');
        return true;
    };

    const addApplication = (appData: Omit<WarrantyApplication, 'id' | 'userId' | 'userName' | 'status' | 'submittedDate'>) => {
        if (!user) return;
        const newApplication: WarrantyApplication = {
            ...appData,
            id: `app-${Date.now()}`,
            userId: user.id,
            userName: user.name,
            status: WarrantyStatus.Pending,
            submittedDate: new Date().toISOString().split('T')[0],
        };
        setApplications(prev => [newApplication, ...prev]);
        setNotification('Warranty application submitted successfully!', 'success');
    };
    
    const updateApplicationStatus = (id: string, status: WarrantyStatus, remarks: string) => {
        setApplications(prev => prev.map(app => {
            if (app.id === id) {
                const updatedApp = { ...app, status, remarks };
                if (status === WarrantyStatus.Approved && !app.warrantyId) {
                    updatedApp.warrantyId = `WID-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}`;
                }
                setNotification(`Application ${id} has been ${status.toLowerCase()}.`, 'success');
                return updatedApp;
            }
            return app;
        }));
    };

    return (
        <AppContext.Provider value={{ user, users, applications, login, logout, register, addApplication, updateApplicationStatus, notification, setNotification }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};