import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-[var(--color-dark-green)] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-light mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}>
              QuiBotanicals
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Premium CBD subscription service dedicated to your wellness journey. 
              Discover the transformative power of nature's finest botanicals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/subscriptions" className="text-gray-300 hover:text-white transition-colors">Subscriptions</Link></li>
              <li><Link to="/all-products" className="text-gray-300 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xl font-semibold mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}>
              Customer Care
            </h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-white transition-colors">Cart</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-600 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-xl font-semibold mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}>
              Stay Connected
            </h4>
            <p className="text-gray-300 mb-4">
              Get wellness tips, exclusive offers, and product updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white text-gray-800 border-none focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)]"
              />
              <button className="px-6 py-2 bg-[var(--color-orange)] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 pt-8 text-center text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 QuiBotanicals. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
