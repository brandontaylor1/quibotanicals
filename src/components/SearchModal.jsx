import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiX } from 'react-icons/fi'
import { gsap } from 'gsap'

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  
  const modalRef = useRef(null)
  const inputRef = useRef(null)
  const resultsRef = useRef(null)

  // Sample product data - in a real app, this would come from an API
  const allProducts = useMemo(() => [
    { 
      id: 1, 
      name: 'Premium CBD Wellness Oil', 
      price: 85, 
      category: 'CBD Oils',
      description: 'Our signature CBD oil blend for daily wellness',
      image: '/api/placeholder/300/300'
    },
    { 
      id: 2, 
      name: 'CBD Wellness Serum', 
      price: 75, 
      category: 'Skincare',
      description: 'Premium CBD serum for daily wellness',
      image: '/api/placeholder/300/300'
    },
    { 
      id: 3, 
      name: 'Botanical Balance Tincture', 
      price: 85, 
      category: 'Wellness',
      description: 'Full-spectrum CBD tincture for balance',
      image: '/api/placeholder/300/300'
    },
    { 
      id: 4, 
      name: 'Luxury Recovery Cream', 
      price: 95, 
      category: 'Skincare',
      description: 'Luxurious CBD-infused recovery cream',
      image: '/api/placeholder/300/300'
    },
    { 
      id: 5, 
      name: 'Calm & Focus Capsules', 
      price: 65, 
      category: 'Wellness',
      description: 'CBD capsules for mental clarity',
      image: '/api/placeholder/300/300'
    },
    { 
      id: 6, 
      name: 'Sleep Support Gummies', 
      price: 40, 
      category: 'Wellness',
      description: 'CBD gummies for better sleep',
      image: '/api/placeholder/300/300'
    },
  ], [])

  const popularSearches = [
    'CBD Oil', 'Skincare', 'Wellness', 'Sleep', 'Pain Relief', 'Anxiety', 'Tinctures', 'Gummies'
  ]

  useEffect(() => {
    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)

      // Animate modal in
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      )

      // Load recent searches from localStorage
      const saved = localStorage.getItem('recentSearches')
      if (saved) {
        setRecentSearches(JSON.parse(saved))
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Allow body scroll
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsLoading(true)
      
      // Simulate API call delay
      const searchTimeout = setTimeout(() => {
        const filtered = allProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSearchResults(filtered)
        setIsLoading(false)
      }, 300)

      return () => clearTimeout(searchTimeout)
    } else {
      setSearchResults([])
      setIsLoading(false)
    }
  }, [searchQuery, allProducts])

  const handleSearch = (query) => {
    if (query.trim()) {
      // Save to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
      
      // Navigate to search results page
      window.location.href = `/search?q=${encodeURIComponent(query)}`
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery)
    }
  }

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl mx-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Search Input */}
        <div className="p-6 border-b border-[var(--color-light-green)]/30">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-dark-green)] text-xl" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search products, categories, or keywords..."
              className="w-full pl-12 pr-12 py-4 bg-[var(--color-light-green)]/20 border border-[var(--color-light-green)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-green)] text-[var(--color-dark-green)] placeholder-[var(--color-dirt)]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            />
            <button
              onClick={handleClose}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--color-dirt)] hover:text-[var(--color-dark-red)] transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div ref={resultsRef} className="max-h-96 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-dark-green)] mx-auto"></div>
              <p className="mt-2 text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Searching...
              </p>
            </div>
          ) : searchQuery.trim() ? (
            searchResults.length > 0 ? (
              <div className="p-4">
                <h3 className="text-[var(--color-dark-green)] font-semibold mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                  Search Results ({searchResults.length})
                </h3>
                <div className="space-y-3">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={onClose}
                      className="flex items-center space-x-4 p-3 rounded-xl hover:bg-[var(--color-light-green)]/20 transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/300/300';
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="text-[var(--color-dark-green)] font-medium"
                            style={{ fontFamily: 'Playfair Display, serif' }}>
                          {product.name}
                        </h4>
                        <p className="text-[var(--color-dirt)] text-sm"
                           style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {product.category} • ${product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {searchResults.length > 3 && (
                  <div className="mt-4 pt-4 border-t border-[var(--color-light-green)]/30">
                    <Link
                      to={`/search?q=${encodeURIComponent(searchQuery)}`}
                      onClick={onClose}
                      className="block text-center py-2 px-4 bg-[var(--color-dark-green)] text-white rounded-lg hover:bg-[var(--color-dark-red)] transition-colors"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      View All Results
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-[var(--color-dirt)] mb-4"
                   style={{ fontFamily: 'Poppins, sans-serif' }}>
                  No results found for "{searchQuery}"
                </p>
                <Link
                  to="/all-products"
                  onClick={onClose}
                  className="text-[var(--color-dark-green)] hover:text-[var(--color-dark-red)] transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Browse All Products →
                </Link>
              </div>
            )
          ) : (
            <div className="p-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-[var(--color-dark-green)] font-semibold mb-3"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                    Recent Searches
                  </h3>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(search)}
                        className="block w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--color-light-green)]/20 transition-colors text-[var(--color-dirt)]"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <FiSearch className="inline mr-2" />
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <h3 className="text-[var(--color-dark-green)] font-semibold mb-3"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(search)}
                      className="px-3 py-1 bg-[var(--color-light-green)]/30 text-[var(--color-dark-green)] rounded-full text-sm hover:bg-[var(--color-light-green)]/50 transition-colors"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal
