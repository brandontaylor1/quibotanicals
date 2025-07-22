import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus, FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Premium CBD Oil 1000mg',
            price: 89.99,
            quantity: 1,
            image: '/path/to/product1.jpg',
            isSubscription: false
        },
        {
            id: 2,
            name: 'CBD Gummies - Mixed Berry',
            price: 49.99,
            quantity: 2,
            image: '/path/to/product2.jpg',
            isSubscription: false
        },
        {
            id: 3,
            name: 'Premium Subscription Box',
            price: 69.99,
            quantity: 1,
            image: '/path/to/subscription.jpg',
            isSubscription: true,
            frequency: 'Monthly'
        }
    ]);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity === 0) {
            removeItem(id);
            return;
        }
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + shipping;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-[var(--color-light-pink)] to-[var(--color-light-green)] pt-[120px]">
                <div className="container mx-auto px-4 py-20">
                    <motion.div 
                        className="mb-12"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-[6vw] md:text-[4vw] font-extralight text-[var(--color-dark-green)] text-center mb-6" 
                            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.05em' }}>
                            Your Cart
                        </h1>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <motion.div 
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {cartItems.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-[var(--color-dirt)] text-xl mb-6">Your cart is empty</p>
                                        <Link to="/products">
                                            <motion.button
                                                className="bg-[var(--color-dark-green)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-dark-red)] transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Continue Shopping
                                            </motion.button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {cartItems.map((item) => (
                                            <motion.div 
                                                key={item.id}
                                                className="flex items-center gap-4 p-4 border border-[var(--color-clay)] rounded-lg"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4 }}
                                            >
                                                <div className="w-20 h-20 bg-[var(--color-clay)] rounded-lg flex-shrink-0">
                                                    {/* Product image placeholder */}
                                                </div>
                                                
                                                <div className="flex-grow">
                                                    <h3 className="font-semibold text-[var(--color-dark-green)] text-lg">
                                                        {item.name}
                                                    </h3>
                                                    {item.isSubscription && (
                                                        <p className="text-sm text-[var(--color-orange)] font-medium">
                                                            {item.frequency} Subscription
                                                        </p>
                                                    )}
                                                    <p className="text-[var(--color-dirt)] text-sm">
                                                        ${item.price.toFixed(2)} each
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 bg-[var(--color-clay)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-dark-green)] transition-colors"
                                                    >
                                                        <FaMinus className="text-xs" />
                                                    </button>
                                                    
                                                    <span className="w-8 text-center font-semibold">
                                                        {item.quantity}
                                                    </span>
                                                    
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 bg-[var(--color-clay)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-dark-green)] transition-colors"
                                                    >
                                                        <FaPlus className="text-xs" />
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="font-semibold text-[var(--color-dark-green)] text-lg">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-[var(--color-dark-red)] hover:text-red-600 transition-colors mt-1"
                                                    >
                                                        <FaTrash className="text-sm" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div 
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h2 className="text-2xl font-bold text-[var(--color-dark-green)] mb-6"
                                    style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-dirt)]">Subtotal</span>
                                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-dirt)]">Shipping</span>
                                        <span className="font-semibold">
                                            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    
                                    {shipping === 0 && (
                                        <p className="text-sm text-[var(--color-dark-green)]">
                                            🎉 You qualify for free shipping!
                                        </p>
                                    )}
                                    
                                    <hr className="border-[var(--color-clay)]" />
                                    
                                    <div className="flex justify-between text-lg font-bold text-[var(--color-dark-green)]">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <motion.button
                                    className="w-full bg-[var(--color-dark-green)] text-white py-4 rounded-lg font-semibold hover:bg-[var(--color-dark-red)] transition-colors flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={cartItems.length === 0}
                                >
                                    <FaCreditCard />
                                    Proceed to Checkout
                                </motion.button>

                                <div className="mt-6 text-center">
                                    <Link to="/products" className="text-[var(--color-dark-green)] hover:text-[var(--color-dark-red)] transition-colors">
                                        ← Continue Shopping
                                    </Link>
                                </div>

                                <div className="mt-8 p-4 bg-[var(--color-light-green)] rounded-lg">
                                    <h3 className="font-semibold text-[var(--color-dark-green)] mb-2">
                                        Need Help?
                                    </h3>
                                    <p className="text-sm text-[var(--color-dirt)] mb-3">
                                        Have questions about your order or our products?
                                    </p>
                                    <Link to="/contact">
                                        <button className="text-sm bg-white text-[var(--color-dark-green)] px-4 py-2 rounded border border-[var(--color-dark-green)] hover:bg-[var(--color-dark-green)] hover:text-white transition-colors">
                                            Contact Support
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
