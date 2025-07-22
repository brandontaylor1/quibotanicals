import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

gsap.registerPlugin(ScrollTrigger)

const SearchResults = () => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(false)
  
  const resultsRef = useRef(null)
  const headerRef = useRef(null)
  const filtersRef = useRef(null)

  // Sample product data
  const allProducts = useMemo(() => [
    { 
      id: 1, 
      name: 'Premium CBD Wellness Oil', 
      price: 85, 
      category: 'CBD Oils',
      description: 'Our signature CBD oil blend for daily wellness',
      image: '/api/placeholder/300/300',
      rating: 4.8,
      reviews: 124
    },
    { 
      id: 2, 
      name: 'CBD Wellness Serum', 
      price: 75, 
      category: 'Skincare',
      description: 'Premium CBD serum for daily wellness',
      image: '/api/placeholder/300/300',
      rating: 4.6,
      reviews: 89
    },
    { 
      id: 3, 
      name: 'Botanical Balance Tincture', 
      price: 85, 
      category: 'Wellness',
      description: 'Full-spectrum CBD tincture for balance',
      image: '/api/placeholder/300/300',
      rating: 4.9,
      reviews: 156
    },
    { 
      id: 4, 
      name: 'Luxury Recovery Cream', 
      price: 95, 
      category: 'Skincare',
      description: 'Luxurious CBD-infused recovery cream',
      image: '/api/placeholder/300/300',
      rating: 4.7,
      reviews: 203
    },
    { 
      id: 5, 
      name: 'Calm & Focus Capsules', 
      price: 65, 
      category: 'Wellness',
      description: 'CBD capsules for mental clarity',
      image: '/api/placeholder/300/300',
      rating: 4.5,
      reviews: 78
    },
    { 
      id: 6, 
      name: 'Sleep Support Gummies', 
      price: 40, 
      category: 'Wellness',
      description: 'CBD gummies for better sleep',
      image: '/api/placeholder/300/300',
      rating: 4.4,
      reviews: 95
    },
    { 
      id: 7, 
      name: 'Pure CBD Isolate', 
      price: 120, 
      category: 'CBD Oils',
      description: 'Premium CBD isolate for maximum potency',
      image: '/api/placeholder/300/300',
      rating: 4.9,
      reviews: 67
    },
    { 
      id: 8, 
      name: 'Soothing Face Mask', 
      price: 55, 
      category: 'Skincare',
      description: 'CBD-infused face mask for relaxation',
      image: '/api/placeholder/300/300',
      rating: 4.3,
      reviews: 112
    },
  ], [])

  const categories = ['All', 'CBD Oils', 'Skincare', 'Wellness']

  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const query = params.get('q') || ''
    setSearchQuery(query)
  }, [location.search])

  // Perform search
  useEffect(() => {
    setIsLoading(true)
    
    const searchTimeout = setTimeout(() => {
      let results = []
      
      if (searchQuery.trim()) {
        results = allProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      } else {
        results = allProducts
      }
      
      setSearchResults(results)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(searchTimeout)
  }, [searchQuery, allProducts])

  // Filter and sort results
  useEffect(() => {
    let filtered = [...searchResults]

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // relevance - keep original order
        break
    }

    setFilteredResults(filtered)
  }, [searchResults, selectedCategory, priceRange, sortBy])

  // GSAP Animations
  useEffect(() => {
    if (!isLoading && filteredResults.length > 0) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )

      gsap.fromTo(filtersRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
      )

      gsap.fromTo(resultsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.4,
          ease: 'power2.out'
        }
      )
    }
  }, [isLoading, filteredResults])

  const handleNewSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const newUrl = `/search?q=${encodeURIComponent(searchQuery)}`
      window.history.pushState({}, '', newUrl)
      // The useEffect will handle the search automatically
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-light-green)] via-white to-[var(--color-light-green)]">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search Header */}
          <div ref={headerRef} className="mb-8 opacity-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <form onSubmit={handleNewSearch} className="mb-4">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-dark-green)] text-xl" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, categories, or keywords..."
                    className="w-full pl-12 pr-4 py-4 bg-[var(--color-light-green)]/20 border border-[var(--color-light-green)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-green)] text-[var(--color-dark-green)]"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>
              </form>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[var(--color-dark-green)] mb-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
                  </h1>
                  <p className="text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {isLoading ? 'Searching...' : `${filteredResults.length} products found`}
                  </p>
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color-dark-green)] text-white rounded-lg hover:bg-[var(--color-dark-red)] transition-colors lg:hidden"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <FiFilter />
                  Filters
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Filters Sidebar */}
            <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div ref={filtersRef} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg sticky top-24 opacity-0">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[var(--color-dark-green)]"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-[var(--color-dirt)] hover:text-[var(--color-dark-red)]"
                  >
                    <FiX />
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-[var(--color-dark-green)] mb-3"
                      style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Category
                  </h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-2 text-[var(--color-dark-green)] focus:ring-[var(--color-dark-green)]"
                        />
                        <span className="text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-[var(--color-dark-green)] mb-3"
                      style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[var(--color-dirt)]"
                         style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="font-semibold text-[var(--color-dark-green)] mb-3"
                      style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Sort By
                  </h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-[var(--color-light-green)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-green)]"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-dark-green)] mx-auto"></div>
                  <p className="mt-4 text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Searching for products...
                  </p>
                </div>
              ) : filteredResults.length > 0 ? (
                <div ref={resultsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredResults.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-[var(--color-dark-green)] mb-4"
                        style={{ fontFamily: 'Playfair Display, serif' }}>
                      No Results Found
                    </h2>
                    <p className="text-[var(--color-dirt)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      We couldn't find any products matching your search criteria.
                    </p>
                    <div className="space-y-4">
                      <button
                        onClick={() => {
                          setSearchQuery('')
                          setSelectedCategory('All')
                          setPriceRange([0, 200])
                          setSortBy('relevance')
                        }}
                        className="block w-full sm:w-auto mx-auto px-6 py-3 bg-[var(--color-dark-green)] text-white rounded-lg hover:bg-[var(--color-dark-red)] transition-colors"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Clear All Filters
                      </button>
                      <Link
                        to="/all-products"
                        className="block text-[var(--color-dark-green)] hover:text-[var(--color-dark-red)] transition-colors"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Browse All Products →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default SearchResults
