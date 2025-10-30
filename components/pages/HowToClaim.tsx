import React from 'react';
import Card from '../common/Card';
import { Link } from 'react-router-dom';

const HowToClaim: React.FC = () => {
    const steps = [
        {
            title: 'Login to Your Account',
            description: 'Access your personalized dashboard by logging in with your credentials. If you haven\'t registered, you can create an account in seconds.',
        },
        {
            title: 'Navigate to "Claim Your Plan"',
            description: 'Once logged in, you will find the "Claim Your Plan" section in your dashboard. This is where all your registered products are listed.',
        },
        {
            title: 'Select Your Product',
            description: 'Find the product that needs service from your list of approved warranties. Click on it to view details and initiate a claim or service request.',
        },
        {
            title: 'Describe the Issue & Submit',
            description: 'Fill out a simple form describing the problem with your device. Provide as much detail as possible to help our technicians diagnose the issue quickly. Submit the form, and our team will get in touch with you shortly with the next steps.',
        }
    ];

    return (
        <div className="bg-slate-50 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">How to Claim Your Warranty</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Follow these simple steps to get your device serviced quickly and efficiently.
                    </p>
                </div>

                <Card className="p-8 md:p-12 max-w-4xl mx-auto">
                    <div className="flow-root">
                        <ul className="-mb-8">
                            {steps.map((step, index) => (
                                <li key={index}>
                                    <div className="relative pb-8">
                                        {index !== steps.length - 1 ? (
                                            <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                        ) : null}
                                        <div className="relative flex items-start space-x-4">
                                            <div>
                                                <span className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center ring-8 ring-slate-50">
                                                    <span className="font-bold text-white">{index + 1}</span>
                                                </span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                                                    <p className="mt-1 text-gray-600">{step.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>

                <div className="text-center mt-12">
                    <p className="text-gray-600">Ready to start?</p>
                    <Link to="/login" className="mt-2 inline-block text-lg font-semibold text-indigo-600 hover:text-indigo-500">
                        Go to Your Dashboard &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HowToClaim;
