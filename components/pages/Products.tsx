
import React from 'react';
import Card from '../common/Card';
import { PRODUCT_CATEGORIES } from '../../constants';

const productImages: { [key: string]: string } = {
    'Mobile Phone': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1965&auto=format&fit=crop',
    'Laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop',
    'Television': 'https://images.unsplash.com/photo-1593784959338-583769115b88?q=80&w=1991&auto=format&fit=crop',
    'Tablet': 'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=1887&auto=format&fit=crop',
    'Camera': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop',
    'Headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    'Smartwatch': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop',
    'Other Electronics': 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=1925&auto=format&fit=crop',
};

const Products: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-12">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-800">Products We Cover</h1>
                <p className="mt-4 text-lg text-gray-600">We offer warranty services for a wide range of electronic devices.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCT_CATEGORIES.map(category => (
                    <Card key={category} className="group">
                        <div className="relative">
                           <img src={productImages[category]} alt={category} className="h-48 w-full object-cover rounded-t-lg"/>
                           <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800">{category}</h2>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Products;
