
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('password');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAppContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => { // Simulate API call
            const success = login(email, password, true);
            setIsLoading(false);
            if (success) {
                navigate('/admin/dashboard');
            }
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center py-12">
            <Card className="w-full max-w-md p-8 space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        Admin Portal
                    </h2>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Input id="email" label="Admin Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Input id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <Button type="submit" isLoading={isLoading}>
                        Sign in
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default AdminLogin;
