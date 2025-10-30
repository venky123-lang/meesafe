import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
        {children}
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 lg:col-span-1">
                        <h3 className="text-2xl font-bold text-blue-500">Misafe</h3>
                        <p className="text-gray-400 mt-2 text-sm">Your safety, our priority.</p>
                        <div className="flex space-x-4 mt-6">
                            <SocialIcon href="#">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.243 7.84-2.223 2.115 2.223 2.115a.75.75 0 0 1-1.037 1.09l-2.223-2.115-2.223 2.115a.75.75 0 0 1-1.037-1.09l2.223-2.115-2.223-2.115a.75.75 0 1 1 1.037-1.09l2.223 2.115 2.223-2.115a.75.75 0 0 1 1.037 1.09z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold">Company</h4>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
                        </ul>
                    </div>
                     <div className="col-span-1">
                        <h4 className="font-semibold">Services</h4>
                         <ul className="mt-4 space-y-2">
                            <li><Link to="/warranty-plans" className="text-gray-400 hover:text-white text-sm">Warranty Plans</Link></li>
                            <li><Link to="/dashboard" className="text-gray-400 hover:text-white text-sm">Claim Warranty</Link></li>
                             <li><Link to="/register-product" className="text-gray-400 hover:text-white text-sm">Register Device</Link></li>
                        </ul>
                    </div>
                     <div className="col-span-2 md:col-span-1">
                        <h4 className="font-semibold">Legal</h4>
                         <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Misafe Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;