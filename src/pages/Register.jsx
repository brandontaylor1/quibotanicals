import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.fullName,
                    phone: formData.phone
                }
            }
        });

        if (error) {
            setError(error.message);
        } else {
            // Show success message or redirect
            navigate('/login', { 
                state: { 
                    message: 'Account created successfully! Please check your email to verify your account.' 
                }
            });
        }
        setLoading(false);
    };

    const handleSocialLogin = async (provider) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/dashboard`
            }
        });
        
        if (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-light-pink)] to-[var(--color-light-green)] py-12 px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-[var(--color-dark-green)] mb-2" 
                            style={{ fontFamily: 'Playfair Display, serif' }}>
                            Join QuiBotanicals
                        </h2>
                        <p className="text-[var(--color-dirt)] text-sm">
                            Create your account and start your wellness journey
                        </p>
                    </div>
                    
                    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                        {error && (
                            <motion.div 
                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                {error}
                            </motion.div>
                        )}
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-[var(--color-dark-green)] mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full px-4 py-3 border border-[var(--color-clay)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-dark-green)] mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-4 py-3 border border-[var(--color-clay)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-dark-green)] mb-1">
                                    Phone Number (Optional)
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-3 border border-[var(--color-clay)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[var(--color-dark-green)] mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        required
                                        className="w-full px-4 py-3 border border-[var(--color-clay)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-[var(--color-clay)] hover:text-[var(--color-dark-green)]"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--color-dark-green)] mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        required
                                        className="w-full px-4 py-3 border border-[var(--color-clay)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-[var(--color-clay)] hover:text-[var(--color-dark-green)]"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-[var(--color-dark-green)] text-white font-semibold rounded-lg hover:bg-[var(--color-dark-red)] focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </motion.button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[var(--color-clay)]" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-[var(--color-dirt)]">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <motion.button
                                onClick={() => handleSocialLogin('google')}
                                className="w-full inline-flex justify-center items-center py-2 px-4 border border-[var(--color-clay)] rounded-lg shadow-sm bg-white text-sm font-medium text-[var(--color-dirt)] hover:bg-gray-50 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaGoogle className="w-5 h-5 text-red-500 mr-2" />
                                Google
                            </motion.button>

                            <motion.button
                                onClick={() => handleSocialLogin('facebook')}
                                className="w-full inline-flex justify-center items-center py-2 px-4 border border-[var(--color-clay)] rounded-lg shadow-sm bg-white text-sm font-medium text-[var(--color-dirt)] hover:bg-gray-50 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaFacebook className="w-5 h-5 text-blue-500 mr-2" />
                                Facebook
                            </motion.button>
                        </div>
                    </div>

                    <div className="text-center">
                        <span className="text-[var(--color-dirt)]">Already have an account? </span>
                        <Link
                            to="/login"
                            className="font-medium text-[var(--color-dark-green)] hover:text-[var(--color-dark-red)] transition-colors"
                        >
                            Sign in
                        </Link>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Register;
