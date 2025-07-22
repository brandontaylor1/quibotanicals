import React, { useState, useEffect } from 'react'
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSearch, FiShoppingBag, FiUser, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import logo from '../assets/images/QuiLogoSvg.svg'
import SearchModal from './SearchModal'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [cartCount] = useState(2)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const navigate = useNavigate()

    const links = [
        { name: "Home", link: "/" },
        { name: "Products", link: "/all-products" },
        { name: "Subscriptions", link: "/subscriptions" },
        { name: "About", link: "/about" },
        { name: "Contact", link: "/contact" },
    ]

    useEffect(() => {
        // Get current user
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user || null);
            }
        );

        // Handle scroll effect
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            subscription.unsubscribe();
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' 
          : 'bg-white/90 backdrop-blur-sm py-6'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={logo} 
                alt="QuiBotanicals" 
                className={`transition-all duration-300 ${
                  isScrolled ? 'w-12 h-12' : 'w-16 h-16'
                }`}
              />
              <span className="text-[var(--color-dark-green)] font-light text-xl hidden sm:block"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                QuiBotanicals
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {links.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="text-[var(--color-dark-green)] hover:text-[var(--color-dark-red)] transition-colors duration-300 font-medium"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-[var(--color-light-green)]/30 transition-colors duration-300"
              >
                <FiSearch className="text-[var(--color-dark-green)] text-xl" />
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-[var(--color-light-green)]/30 transition-colors duration-300">
                <FiShoppingBag className="text-[var(--color-dark-green)] text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-dark-red)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Profile */}
              {user ? (
                <div className="relative group">
                  <button className="p-2 rounded-full hover:bg-[var(--color-light-green)]/30 transition-colors duration-300">
                    <FiUser className="text-[var(--color-dark-green)] text-xl" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                    <div className="py-2">
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-3 text-[var(--color-dark-green)] hover:bg-[var(--color-light-green)]/30 transition-colors"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-3 text-[var(--color-dark-green)] hover:bg-[var(--color-light-green)]/30 transition-colors"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-3 text-[var(--color-dark-red)] hover:bg-[var(--color-light-green)]/30 transition-colors flex items-center space-x-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <FiLogOut />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="p-2 rounded-full hover:bg-[var(--color-light-green)]/30 transition-colors duration-300"
                >
                  <FiUser className="text-[var(--color-dark-green)] text-xl" />
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-full hover:bg-[var(--color-light-green)]/30 transition-colors duration-300"
              >
                {isOpen ? (
                  <HiX className="text-[var(--color-dark-green)] text-2xl" />
                ) : (
                  <HiMenuAlt3 className="text-[var(--color-dark-green)] text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        ></div>

        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-[var(--color-light-pink)] to-[var(--color-light-green)] backdrop-blur-lg shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <img src={logo} alt="QuiBotanicals" className="w-10 h-10" />
                <span className="text-[var(--color-dark-green)] font-light text-lg"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                  QuiBotanicals
                </span>
              </div>
              <button 
                onClick={closeMenu}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <HiX className="text-[var(--color-dark-green)] text-2xl" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4 mb-8">
              {links.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  onClick={closeMenu}
                  className="block py-3 px-4 rounded-xl bg-white/20 backdrop-blur-sm text-[var(--color-dark-green)] hover:bg-white/30 hover:text-[var(--color-dark-red)] transition-all duration-300 font-medium"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* User Section */}
            {user && (
              <div className="border-t border-white/20 pt-6 space-y-3">
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="block py-3 px-4 rounded-xl bg-white/20 backdrop-blur-sm text-[var(--color-dark-green)] hover:bg-white/30 transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    closeMenu();
                  }}
                  className="w-full text-left py-3 px-4 rounded-xl bg-white/20 backdrop-blur-sm text-[var(--color-dark-red)] hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <FiLogOut />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

export default Navbar