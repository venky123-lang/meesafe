import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const plans = [
    {
        name: 'Essential Care',
        price: '$9.99/mo',
        features: ['Coverage for manufacturing defects', '24/7 Customer Support', 'Cashless Facility', '3-day Repair Promise'],
        cta: 'Choose Plan',
        highlight: false,
    },
    {
        name: 'Premium Protect',
        price: '$19.99/mo',
        features: ['All Essential Care benefits', 'Accidental damage protection', 'Free pick-up and drop-off', 'Zero Paperwork', '30-day Replacement Guarantee'],
        cta: 'Choose Plan',
        highlight: true,
    },
    {
        name: 'Ultimate Shield',
        price: '$29.99/mo',
        features: ['All Premium Protect benefits', 'Theft and loss protection', 'Extended warranty by 1 year', 'Free Service at Home'],
        cta: 'Choose Plan',
        highlight: false,
    }
];

const Services: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Our Warranty Plans</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Choose the perfect protection plan for your devices. Peace of mind, guaranteed.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={`flex flex-col rounded-2xl ${plan.highlight ? 'border-2 border-blue-500 shadow-blue-200' : ''}`}>
                           {plan.highlight && (
                               <div className="bg-blue-500 text-white text-center py-1.5 rounded-t-xl text-sm font-bold">Most Popular</div>
                           )}
                            <div className="p-8 flex-grow">
                                <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                                <p className="mt-4 text-4xl font-bold text-gray-900">{plan.price}</p>
                                <ul className="mt-8 space-y-4 text-gray-600">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-8 pt-0">
                               <Button 
                                    onClick={() => navigate('/register')} 
                                    variant={plan.highlight ? 'primary' : 'secondary'}
                                    className="w-full"
                                >
                                    {plan.cta}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;