import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaBox, FaCreditCard, FaCog, FaSignOutAlt, FaCalendarAlt, FaShoppingCart } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/login');
                return;
            }
            setUser(user);

            // Get user profile
            const { data: profile } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            
            setUserProfile(profile);
            setLoading(false);
        };

        getUser();
    }, [navigate]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: FaUser },
        { id: 'subscription', label: 'My Subscription', icon: FaBox },
        { id: 'orders', label: 'Order History', icon: FaShoppingCart },
        { id: 'billing', label: 'Billing', icon: FaCreditCard },
        { id: 'settings', label: 'Settings', icon: FaCog },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-light-pink)] to-[var(--color-light-green)]">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--color-dark-green)]"></div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-[var(--color-light-pink)] to-[var(--color-light-green)] pt-[120px]">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <motion.div 
                            className="lg:w-1/4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl h-fit"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-[var(--color-orange)] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaUser className="text-white text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-[var(--color-dark-green)]" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    {userProfile?.full_name || user?.email}
                                </h3>
                                <p className="text-[var(--color-dirt)] text-sm">{user?.email}</p>
                            </div>

                            <nav className="space-y-2">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                            activeTab === item.id
                                                ? 'bg-[var(--color-dark-green)] text-white'
                                                : 'text-[var(--color-dirt)] hover:bg-[var(--color-clay)] hover:text-white'
                                        }`}
                                    >
                                        <item.icon className="text-lg" />
                                        {item.label}
                                    </button>
                                ))}
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-dark-red)] hover:bg-[var(--color-dark-red)] hover:text-white transition-all"
                                >
                                    <FaSignOutAlt className="text-lg" />
                                    Sign Out
                                </button>
                            </nav>
                        </motion.div>

                        {/* Main Content */}
                        <motion.div 
                            className="lg:w-3/4 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {activeTab === 'overview' && (
                                <div>
                                    <h2 className="text-3xl font-bold text-[var(--color-dark-green)] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        Welcome back, {userProfile?.full_name || 'there'}!
                                    </h2>
                                    
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                        <div className="bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-clay)] p-6 rounded-lg text-white">
                                            <FaBox className="text-3xl mb-2" />
                                            <h3 className="text-lg font-semibold">Active Subscription</h3>
                                            <p className="text-sm opacity-90">Premium Plan</p>
                                        </div>
                                        
                                        <div className="bg-gradient-to-r from-[var(--color-light-green)] to-[var(--color-dark-green)] p-6 rounded-lg text-white">
                                            <FaCalendarAlt className="text-3xl mb-2" />
                                            <h3 className="text-lg font-semibold">Next Delivery</h3>
                                            <p className="text-sm opacity-90">January 15, 2025</p>
                                        </div>
                                        
                                        <div className="bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-dark-red)] p-6 rounded-lg text-white">
                                            <FaShoppingCart className="text-3xl mb-2" />
                                            <h3 className="text-lg font-semibold">Total Orders</h3>
                                            <p className="text-sm opacity-90">12 orders</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-xl font-bold text-[var(--color-dark-green)] mb-4">Recent Orders</h3>
                                            <div className="space-y-4">
                                                {[1, 2, 3].map((order) => (
                                                    <div key={order} className="border border-[var(--color-clay)] rounded-lg p-4">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="font-semibold">Order #QB{order}234</span>
                                                            <span className="text-sm text-[var(--color-dirt)]">Dec {order + 10}, 2024</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm text-[var(--color-dirt)]">Premium CBD Bundle</span>
                                                            <span className="text-[var(--color-dark-green)] font-semibold">$89.99</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-[var(--color-dark-green)] mb-4">Subscription Status</h3>
                                            <div className="bg-[var(--color-light-green)] p-6 rounded-lg">
                                                <h4 className="font-semibold text-[var(--color-dark-green)] mb-2">Premium Plan</h4>
                                                <p className="text-[var(--color-dirt)] text-sm mb-4">
                                                    Your next box will be delivered on January 15, 2025
                                                </p>
                                                <div className="flex gap-2">
                                                    <button className="bg-[var(--color-dark-green)] text-white px-4 py-2 rounded-lg text-sm hover:bg-[var(--color-dark-red)] transition-colors">
                                                        Manage Plan
                                                    </button>
                                                    <button className="border border-[var(--color-dark-green)] text-[var(--color-dark-green)] px-4 py-2 rounded-lg text-sm hover:bg-[var(--color-dark-green)] hover:text-white transition-colors">
                                                        Skip Next
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'subscription' && (
                                <div>
                                    <h2 className="text-3xl font-bold text-[var(--color-dark-green)] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        My Subscription
                                    </h2>
                                    <div className="text-center text-[var(--color-dirt)]">
                                        <p>Subscription management features coming soon...</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'orders' && (
                                <div>
                                    <h2 className="text-3xl font-bold text-[var(--color-dark-green)] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        Order History
                                    </h2>
                                    <div className="text-center text-[var(--color-dirt)]">
                                        <p>Order history features coming soon...</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'billing' && (
                                <div>
                                    <h2 className="text-3xl font-bold text-[var(--color-dark-green)] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        Billing & Payment
                                    </h2>
                                    <div className="text-center text-[var(--color-dirt)]">
                                        <p>Billing management features coming soon...</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div>
                                    <h2 className="text-3xl font-bold text-[var(--color-dark-green)] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        Account Settings
                                    </h2>
                                    <div className="text-center text-[var(--color-dirt)]">
                                        <p>Account settings features coming soon...</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
