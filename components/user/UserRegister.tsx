
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';

const UserRegister: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAppContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => { // Simulate API call
            const success = register(name, email, phone, password);
            setIsLoading(false);
            if (success) {
                navigate('/dashboard');
            }
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center py-12">
            <Card className="w-full max-w-md p-8 space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create a new account
                    </h2>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Input id="name" label="Full Name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                    <Input id="email" label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Input id="phone" label="Phone Number" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
                    <Input id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <Button type="submit" isLoading={isLoading}>
                        Register
                    </Button>
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                           Sign in
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default UserRegister;
