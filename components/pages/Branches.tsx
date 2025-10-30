import React from 'react';
import Card from '../common/Card';

const branches = [
    { city: 'New York', address: '123 Madison Ave, New York, NY 10016', phone: '(212) 555-0199' },
    { city: 'Los Angeles', address: '456 Rodeo Dr, Beverly Hills, CA 90210', phone: '(310) 555-0132' },
    { city: 'Chicago', address: '789 Michigan Ave, Chicago, IL 60611', phone: '(312) 555-0156' },
    { city: 'San Francisco', address: '101 Market St, San Francisco, CA 94105', phone: '(415) 555-0178' },
    { city: 'Miami', address: '202 Ocean Dr, Miami Beach, FL 33139', phone: '(305) 555-0111' },
    { city: 'Seattle', address: '303 Pike St, Seattle, WA 98101', phone: '(206) 555-0143' },
];

const Branches: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-12">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-800">Our Branches</h1>
                <p className="mt-4 text-lg text-gray-600">Find a Misafe service center near you.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {branches.map((branch) => (
                    <Card key={branch.city} className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800">{branch.city}</h2>
                        <p className="mt-2 text-gray-600">{branch.address}</p>
                        <p className="mt-2 text-blue-600 font-medium">{branch.phone}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Branches;