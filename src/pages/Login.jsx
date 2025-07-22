import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/dashboard');
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
                            Welcome Back
                        </h2>
                        <p className="text-[var(--color-dirt)] text-sm">
                            Sign in to your QuiBotanicals account
                        </p>
                    </div>
                    
                    <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
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
                                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-dark-green)] mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
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
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
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
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-[var(--color-dark-green)] text-white font-semibold rounded-lg hover:bg-[var(--color-dark-red)] focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
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
                        <span className="text-[var(--color-dirt)]">Don't have an account? </span>
                        <Link
                            to="/register"
                            className="font-medium text-[var(--color-dark-green)] hover:text-[var(--color-dark-red)] transition-colors"
                        >
                            Sign up
                        </Link>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Login;
