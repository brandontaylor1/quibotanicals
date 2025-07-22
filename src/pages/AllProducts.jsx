import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../components/ProductCard'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger)

const AllProducts = () => {
  const headerRef = useRef(null)
  const filtersRef = useRef(null)
  const productsRef = useRef(null)

  // Example product data with better structure
  const products = [
    { 
      id: 1, 
      name: 'CBD Wellness Serum', 
      price: 75, 
      category: 'Skincare', 
      image: '/api/placeholder/300/400',
      description: 'Premium CBD serum for daily wellness'
    },
    { 
      id: 2, 
      name: 'Botanical Balance Tincture', 
      price: 85, 
      category: 'Wellness', 
      image: '/api/placeholder/300/400',
      description: 'Full-spectrum CBD tincture for balance'
    },
    { 
      id: 3, 
      name: 'Luxury Recovery Cream', 
      price: 95, 
      category: 'Skincare', 
      image: '/api/placeholder/300/400',
      description: 'Luxurious CBD-infused recovery cream'
    },
    { 
      id: 4, 
      name: 'Calm & Focus Capsules', 
      price: 65, 
      category: 'Wellness', 
      image: '/api/placeholder/300/400',
      description: 'CBD capsules for mental clarity'
    },
    { 
      id: 5, 
      name: 'Premium CBD Oil', 
      price: 120, 
      category: 'Luxury', 
      image: '/api/placeholder/300/400',
      description: 'Highest quality CBD oil blend'
    },
    { 
      id: 6, 
      name: 'Botanical Bath Bombs', 
      price: 45, 
      category: 'Luxury', 
      image: '/api/placeholder/300/400',
      description: 'Relaxing CBD bath experience'
    },
    { 
      id: 7, 
      name: 'Daily Glow Moisturizer', 
      price: 55, 
      category: 'Skincare', 
      image: '/api/placeholder/300/400',
      description: 'CBD moisturizer for healthy skin'
    },
    { 
      id: 8, 
      name: 'Sleep Support Gummies', 
      price: 40, 
      category: 'Wellness', 
      image: '/api/placeholder/300/400',
      description: 'CBD gummies for better sleep'
    },
  ];

  // State for filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(headerRef.current.children, 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate filters
      gsap.fromTo(filtersRef.current, 
        { opacity: 0, x: -30 }, 
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: filtersRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate products grid
      gsap.fromTo(productsRef.current.children, 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  // Handle category checkbox changes
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filtered and sorted products
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-light-pink)] to-[var(--color-light-green)]">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pb-12 md:pb-16">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <h1 className="font-extralight text-[var(--color-dark-green)] mb-4 opacity-0"
              style={{
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '-0.02em',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)'
              }}>
            All Products
          </h1>
          <p className="text-[var(--color-dirt)] text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-0 px-4 sm:px-0">
            Discover our complete collection of premium CBD products, carefully curated for your wellness journey
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside ref={filtersRef} className="lg:w-1/4 opacity-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-[var(--color-dark-green)] font-semibold text-xl mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                Filter Products
              </h2>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-[var(--color-dark-green)] font-medium text-lg mb-3">Category</h3>
                <div className="space-y-2">
                  {['Skincare', 'Wellness', 'Luxury'].map((category) => (
                    <label key={category} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="w-4 h-4 text-[var(--color-dark-green)] rounded focus:ring-[var(--color-dark-green)]"
                      />
                      <span className="text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-[var(--color-dark-green)] font-medium text-lg mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-[var(--color-dirt)]">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full h-2 bg-[var(--color-light-green)] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <h3 className="text-[var(--color-dark-green)] font-medium text-lg mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 border border-[var(--color-light-green)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-green)]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 150]);
                  setSortBy('name');
                }}
                className="w-full py-2 px-4 bg-[var(--color-clay)] text-white rounded-lg hover:bg-opacity-90 transition-all duration-300"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6 text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Showing {filteredProducts.length} products
            </div>
            
            <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  description={product.description}
                  category={product.category}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[var(--color-dirt)] text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllProducts;