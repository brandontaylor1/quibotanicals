import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaBox, FaCrown, FaStar } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Subscriptions = () => {
    const [selectedTier, setSelectedTier] = useState('premium');

    const tiers = [
        {
            id: 'basic',
            name: 'Essential',
            price: 39.99,
            description: 'Perfect for beginners exploring CBD wellness',
            icon: FaBox,
            color: 'var(--color-light-green)',
            features: [
                '3-4 premium CBD products',
                'Monthly delivery',
                'Educational wellness guide',
                'Access to community forum',
                'Free shipping',
                'Cancel anytime'
            ]
        },
        {
            id: 'premium',
            name: 'Premium',
            price: 69.99,
            description: 'Our most popular plan for regular CBD users',
            icon: FaStar,
            color: 'var(--color-orange)',
            popular: true,
            features: [
                '5-6 premium CBD products',
                'Monthly delivery',
                'Exclusive limited edition items',
                'Priority customer support',
                'Educational wellness guide',
                'Access to community forum',
                'Free shipping',
                'Cancel anytime'
            ]
        },
        {
            id: 'luxury',
            name: 'Luxury',
            price: 99.99,
            description: 'Ultimate CBD experience with premium brands',
            icon: FaCrown,
            color: 'var(--color-purple)',
            features: [
                '7-8 premium CBD products',
                'Monthly delivery',
                'Exclusive luxury brand items',
                'First access to new products',
                'Personalized wellness consultation',
                'Priority customer support',
                'Educational wellness guide',
                'Access to community forum',
                'Free shipping',
                'Cancel anytime'
            ]
        }
    ];

    const handleSubscribe = (tierId) => {
        // This would integrate with Stripe for payment processing
        console.log(`Subscribing to ${tierId} plan`);
        // Navigate to checkout or show payment modal
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-[var(--color-light-pink)] to-[var(--color-light-green)] pt-[120px]">
                <div className="container mx-auto px-4 py-20">
                    {/* Hero Section */}
                    <motion.div 
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-[8vw] md:text-[6vw] font-extralight text-[var(--color-dark-green)] mb-6" 
                            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.05em' }}>
                            Choose Your Journey
                        </h1>
                        <p className="text-[var(--color-dark-red)] text-xl md:text-2xl font-light max-w-3xl mx-auto">
                            Discover the perfect CBD subscription plan tailored to your wellness goals
                        </p>
                    </motion.div>

                    {/* Subscription Tiers */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {tiers.map((tier, index) => (
                            <motion.div 
                                key={tier.id}
                                className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl ${
                                    tier.popular ? 'ring-4 ring-[var(--color-orange)] scale-105' : ''
                                }`}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[var(--color-orange)] text-white px-6 py-2 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </div>
                                )}
                                
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                                         style={{ backgroundColor: tier.color }}>
                                        <tier.icon className="text-white text-2xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[var(--color-dark-green)] mb-2"
                                        style={{ fontFamily: 'Playfair Display, serif' }}>
                                        {tier.name}
                                    </h3>
                                    <p className="text-[var(--color-dirt)] text-sm mb-4">
                                        {tier.description}
                                    </p>
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold text-[var(--color-dark-green)]">
                                            ${tier.price}
                                        </span>
                                        <span className="text-[var(--color-dirt)] text-sm">/month</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            <FaCheck className="text-[var(--color-dark-green)] text-sm flex-shrink-0" />
                                            <span className="text-[var(--color-dirt)] text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <motion.button
                                    onClick={() => handleSubscribe(tier.id)}
                                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                                        tier.popular
                                            ? 'bg-[var(--color-orange)] text-white hover:bg-[var(--color-dark-red)]'
                                            : 'bg-[var(--color-dark-green)] text-white hover:bg-[var(--color-dark-red)]'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Get Started
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>

                    {/* How It Works Section */}
                    <motion.div 
                        className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-[var(--color-dark-green)] text-center mb-12"
                            style={{ fontFamily: 'Playfair Display, serif' }}>
                            How It Works
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    step: 1,
                                    title: 'Choose Your Plan',
                                    description: 'Select the subscription tier that matches your CBD wellness goals and preferences.'
                                },
                                {
                                    step: 2,
                                    title: 'Curated Selection',
                                    description: 'Our experts handpick premium CBD products from trusted brands for your monthly box.'
                                },
                                {
                                    step: 3,
                                    title: 'Delivered Monthly',
                                    description: 'Receive your curated box with new products to discover and enjoy each month.'
                                }
                            ].map((item, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-[var(--color-orange)] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-white text-2xl font-bold">{item.step}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--color-dark-green)] mb-4"
                                        style={{ fontFamily: 'Playfair Display, serif' }}>
                                        {item.title}
                                    </h3>
                                    <p className="text-[var(--color-dirt)] leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* FAQ Section */}
                    <motion.div 
                        className="mt-16 text-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <h3 className="text-2xl font-bold text-[var(--color-dark-green)] mb-4"
                            style={{ fontFamily: 'Playfair Display, serif' }}>
                            Questions?
                        </h3>
                        <p className="text-[var(--color-dirt)] mb-6">
                            We're here to help you find the perfect CBD subscription for your needs.
                        </p>
                        <motion.button
                            className="bg-[var(--color-dark-green)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-dark-red)] transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Support
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Subscriptions;
