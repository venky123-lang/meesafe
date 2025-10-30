import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
import Home from './components/pages/Home';
import About from './components/pages/About';
import Services from './components/pages/Services'; // This will be our "Warranty Plans" page
import Contact from './components/pages/Contact';
import HowToClaim from './components/pages/HowToClaim';

// Auth and User Components
import UserLogin from './components/user/UserLogin';
import UserRegister from './components/user/UserRegister';
import UserDashboard from './components/user/UserDashboard';
import WarrantyForm from './components/user/WarrantyForm';
import UserProfile from './components/user/UserProfile';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import Notification from './components/common/Notification';

const PrivateRoute: React.FC<{ children: React.ReactElement; adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const { user, setNotification } = useAppContext();
  if (!user) {
    setNotification('You need to be logged in to access this page.', 'info');
    return <Navigate to={adminOnly ? "/admin" : "/login"} />;
  }
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

const AppRoutes: React.FC = () => {
    const { notification } = useAppContext();
    return (
        <div className="min-h-screen flex flex-col font-sans bg-white">
            <Header />
            {notification && <Notification message={notification.message} type={notification.type} />}
            <main className="flex-grow">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/warranty-plans" element={<Services />} /> {/* Renamed route */}
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/how-to-claim" element={<HowToClaim />} />

                    {/* Auth Routes */}
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/register" element={<UserRegister />} />
                    <Route path="/admin" element={<AdminLogin />} />

                    {/* Private User Routes */}
                    <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} /> {/* "Claim Your Plan" goes here */}
                    <Route path="/register-product" element={<PrivateRoute><WarrantyForm /></PrivateRoute>} /> {/* "Service Request" goes here */}
                    <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                    
                    {/* Private Admin Route */}
                    <Route path="/admin/dashboard" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
  return (
    <AppProvider>
        <HashRouter>
            <AppRoutes />
        </HashRouter>
    </AppProvider>
  );
};

export default App;