import React from 'react';
import Card from '../common/Card';

const About: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-16">
                <Card className="p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-center text-blue-800">About Misafe</h1>
                    <p className="mt-6 text-lg text-center text-gray-600 max-w-3xl mx-auto">
                        Your one-stop solution for managing electronic product warranties with ease and confidence.
                    </p>
                    
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
                            <p className="mt-4 text-gray-600">
                                At Misafe, our mission is to simplify the post-purchase experience for every electronics owner. We believe that managing warranties shouldn't be a hassle. Our platform is designed to provide a transparent, efficient, and user-friendly way to register products, track warranty status, and access support, ensuring that your investments are always protected.
                            </p>
                             <h2 className="text-2xl font-semibold text-gray-800 mt-8">Our Vision</h2>
                            <p className="mt-4 text-gray-600">
                                We envision a world where customers can enjoy their electronic devices without worrying about potential defects or damage. By leveraging technology, we aim to build the most reliable and customer-centric warranty management system globally, fostering trust between consumers, retailers, and brands.
                            </p>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1784&auto=format&fit=crop" alt="Team collaborating" className="rounded-lg shadow-lg" />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default About;