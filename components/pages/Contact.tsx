import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { setNotification } = useAppContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock form submission
        setNotification('Your message has been sent successfully!', 'success');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="container mx-auto px-4 py-12">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-800">Get in Touch</h1>
                <p className="mt-4 text-lg text-gray-600">We'd love to hear from you. Contact us with any questions or feedback.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <Card className="p-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Contact Form</h2>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <Input id="name" label="Your Name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                        <Input id="email" label="Your Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <div>
                             <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                                Message
                             </label>
                             <div className="mt-2">
                                <textarea id="message" rows={4} value={message} onChange={e => setMessage(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>
                        <Button type="submit">Send Message</Button>
                    </form>
                </Card>
                 <Card className="p-8 bg-blue-50">
                     <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
                     <div className="mt-6 space-y-4 text-gray-700">
                        <p><strong>Address:</strong> 123 Tech Lane, Silicon Valley, CA, USA</p>
                        <p><strong>Email:</strong> support@misafe.com</p>
                        <p><strong>Phone:</strong> (800) 555-0100</p>
                        <p><strong>Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM</p>
                     </div>
                </Card>
            </div>
        </div>
    );
};

export default Contact;