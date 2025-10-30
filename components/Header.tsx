import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Button from './common/Button';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
        {children}
    </a>
);


const Header: React.FC = () => {
    const { user, logout } = useAppContext();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };
    
    const navLinkClasses = "px-3 py-2 rounded-md text-base md:text-sm font-medium transition-colors duration-300";
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
        `${navLinkClasses} ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`;

    const links = [
        { name: 'Home', to: '/' },
        { name: 'About Us', to: '/about' },
        { name: 'Warranty Plans', to: '/warranty-plans' },
        { name: 'How to Claim', to: '/how-to-claim' },
        ...(user ? [
          { name: 'Claim Your Plan', to: '/dashboard' },
          { name: 'Register Warranty', to: '/register-product' }
        ] : []),
        { name: 'Contact Us', to: '/contact' }
    ];

    const MobileNav = () => (
        <div className={`fixed inset-0 bg-white z-50 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
            <div className="flex justify-end p-4">
                 <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                    <svg className="h-6 w-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <nav className="flex flex-col items-center space-y-6 mt-8">
                {links.map(link => (
                    <NavLink 
                        key={link.name} 
                        to={link.to} 
                        className={getNavLinkClass}
                        onClick={() => setIsMenuOpen(false)}
                        end={link.to === '/'}
                    >
                        {link.name}
                    </NavLink>
                ))}
                <div className="mt-6 w-full px-8">
                     {user ? (
                        <div className="text-center">
                            <p className="text-gray-700 mb-4">Welcome, {user.name.split(' ')[0]}</p>
                            <Button onClick={handleLogout} variant="secondary">Logout</Button>
                        </div>
                     ) : (
                        <div className="space-y-4">
                            <Button variant="secondary" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>Login</Button>
                            <Button onClick={() => { navigate('/register'); setIsMenuOpen(false); }}>Register Your Warranty</Button>
                        </div>
                     )}
                </div>
            </nav>
        </div>
    );

    return (
        <>
            <div className="bg-gray-800 text-gray-300 hidden md:block">
                <div className="container mx-auto px-4 flex justify-between items-center h-10">
                    <div className="flex items-center space-x-6 text-xs font-medium">
                        <a href="tel:800-555-0100" className="flex items-center space-x-2 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span>(800) 555-0100</span>
                        </a>
                        <a href="mailto:support@misafe.com" className="flex items-center space-x-2 hover:text-white transition-colors">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span>support@misafe.com</span>
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <SocialIcon href="#">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </SocialIcon>
                        <SocialIcon href="#">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </SocialIcon>
                        <SocialIcon href="#">
                             <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </SocialIcon>
                        <SocialIcon href="#">
                             <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.41 19.83,18.65C19.33,18.76 18.5,18.84 17.5,18.88C16.5,18.93 15.28,18.96 13.84,18.99C13.26,19 12.63,19 12,19C11.37,19 10.74,19 10.16,18.99C8.72,18.96 7.5,18.93 6.5,18.88C5.5,18.84 4.67,18.76 4.17,18.65C3.27,18.41 2.69,17.73 2.44,16.83C2.16,15.8 2,14.19 2,12L2.06,11.16C2.06,10.56 2.09,9.87 2.16,9.07C2.22,8.27 2.31,7.64 2.44,7.17C2.69,6.27 3.27,5.59 4.17,5.35C4.67,5.24 5.5,5.16 6.5,5.12C7.5,5.07 8.72,5.04 10.16,5.01C10.74,5 11.37,5 12,5C12.63,5 13.26,5 13.84,5.01C15.28,5.04 16.5,5.07 17.5,5.12C18.5,5.16 19.33,5.24 19.83,5.35C20.73,5.59 21.31,6.27 21.56,7.17Z" /></svg>
                        </SocialIcon>
                    </div>
                </div>
            </div>
            <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-bold text-blue-600">Misafe</Link>
                        </div>
                         <div className="hidden md:flex items-center space-x-2">
                            {links.map(link => (
                                 <NavLink 
                                    key={link.name} 
                                    to={link.to} 
                                    className={getNavLinkClass}
                                    end={link.to === '/'}
                                 >
                                    {link.name}
                                 </NavLink>
                            ))}
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                 <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-700 hidden sm:block">Welcome, {user.name.split(' ')[0]}</span>
                                    <button onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-blue-500">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Button variant="secondary" onClick={() => navigate('/login')} className="!w-auto !py-1.5">Login</Button>
                                    <Button onClick={() => navigate('/register')} className="!w-auto !py-1.5">Register Your Warranty</Button>
                                </div>
                            )}
                        </div>
                        <div className="md:hidden">
                           <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
                                <svg className="h-6 w-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                           </button>
                        </div>
                    </div>
                </div>
                <MobileNav />
            </header>
        </>
    );
};

export default Header;