import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaArrowLeft, FaHeart, FaShare, FaStar, FaShoppingCart, FaCheckCircle } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const ProductDetail = () => {
  const { productId } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const imageGridRef = useRef(null)
  const productInfoRef = useRef(null)
  const detailsRef = useRef(null)

  // Sample product data - in a real app, this would come from an API
  const product = {
    id: productId,
    name: "Premium CBD Wellness Oil",
    price: 85,
    originalPrice: 100,
    rating: 4.8,
    reviewCount: 124,
    description: "Our signature CBD oil blend combines the finest organic hemp extract with carefully selected botanicals to create a premium wellness experience. Each bottle contains 30ml of pure, lab-tested CBD oil with natural terpenes for enhanced effectiveness.",
    benefits: [
      "Promotes relaxation and stress relief",
      "Supports healthy sleep patterns",
      "May help with muscle recovery",
      "100% organic and lab-tested",
      "Third-party verified for purity"
    ],
    variants: [
      { name: "500mg", price: 85, stock: 15 },
      { name: "1000mg", price: 120, stock: 8 },
      { name: "1500mg", price: 150, stock: 12 }
    ],
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600"
    ],
    category: "CBD Oils",
    inStock: true,
    ingredients: ["Organic Hemp Extract", "MCT Oil", "Natural Terpenes", "Vitamin E"],
    usage: "Take 1-2 drops under tongue, hold for 30 seconds before swallowing. Use daily for best results."
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate image grid
      gsap.fromTo(imageGridRef.current, 
        { opacity: 0, x: -50 }, 
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: imageGridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate product info
      gsap.fromTo(productInfoRef.current.children, 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: productInfoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate details section
      gsap.fromTo(detailsRef.current.children, 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: detailsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  const handleAddToCart = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-light-pink)] to-[var(--color-light-green)]">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pb-12 md:pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-[var(--color-dirt)] mb-8">
          <Link to="/" className="hover:text-[var(--color-dark-green)] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/all-products" className="hover:text-[var(--color-dark-green)] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[var(--color-dark-green)]">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link to="/all-products" className="inline-flex items-center space-x-2 text-[var(--color-dark-green)] hover:text-[var(--color-dark-red)] transition-colors mb-8">
          <FaArrowLeft />
          <span style={{ fontFamily: 'Poppins, sans-serif' }}>Back to Products</span>
        </Link>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Bento Grid */}
          <div ref={imageGridRef} className="opacity-0">
            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] md:h-[600px]">
              {/* Main large image */}
              <div className="col-span-3 row-span-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/600/600';
                  }}
                />
              </div>
              
              {/* Four smaller images */}
              {product.images.slice(1, 5).map((image, index) => (
                <div 
                  key={index}
                  className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedImage === index + 1 ? 'ring-2 ring-[var(--color-dark-green)]' : ''
                  }`}
                  onClick={() => setSelectedImage(index + 1)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/300/300';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div ref={productInfoRef} className="space-y-6">
            {/* Product Header */}
            <div className="opacity-0">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-[var(--color-dark-green)]/20 text-[var(--color-dark-green)] text-sm font-medium rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
                    <FaHeart className="text-[var(--color-dark-red)]" />
                  </button>
                  <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
                    <FaShare className="text-[var(--color-dark-green)]" />
                  </button>
                </div>
              </div>

              <h1 className="text-[var(--color-dark-green)] font-light mb-4"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    letterSpacing: '-0.02em'
                  }}>
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < Math.floor(product.rating) ? 'text-[var(--color-orange)]' : 'text-gray-300'} 
                    />
                  ))}
                  <span className="text-[var(--color-dirt)] text-sm ml-2">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-[var(--color-dark-red)] font-bold text-3xl"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                  ${product.variants[selectedVariant].price}
                </span>
                {product.originalPrice && (
                  <span className="text-[var(--color-dirt)] text-xl line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div className="opacity-0">
              <p className="text-[var(--color-dirt)] leading-relaxed mb-6"
                 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300' }}>
                {product.description}
              </p>
            </div>

            {/* Variants */}
            <div className="opacity-0">
              <h3 className="text-[var(--color-dark-green)] font-semibold mb-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                Strength
              </h3>
              <div className="flex space-x-3 mb-6">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                      selectedVariant === index
                        ? 'border-[var(--color-dark-green)] bg-[var(--color-dark-green)] text-white'
                        : 'border-[var(--color-light-green)] hover:border-[var(--color-dark-green)]'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="opacity-0">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-[var(--color-dark-green)] font-medium">Quantity:</span>
                  <div className="flex items-center border-2 border-[var(--color-light-green)] rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 hover:bg-[var(--color-light-green)] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x-2 border-[var(--color-light-green)]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 hover:bg-[var(--color-light-green)] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="text-sm text-[var(--color-dirt)]">
                  {product.variants[selectedVariant].stock} in stock
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[var(--color-dark-green)] text-white rounded-lg font-medium text-lg hover:bg-[var(--color-dark-red)] transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div ref={detailsRef} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefits */}
            <div className="opacity-0">
              <h3 className="text-[var(--color-dark-green)] font-semibold text-xl mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                Benefits
              </h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <FaCheckCircle className="text-[var(--color-dark-green)] mt-1 flex-shrink-0" />
                    <span className="text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients & Usage */}
            <div className="opacity-0">
              <h3 className="text-[var(--color-dark-green)] font-semibold text-xl mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                Ingredients
              </h3>
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[var(--color-light-green)] text-[var(--color-dark-green)] text-sm rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-[var(--color-dark-green)] font-semibold text-xl mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                How to Use
              </h3>
              <p className="text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {product.usage}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-[var(--color-dark-green)] text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50">
          <FaCheckCircle />
          <span>Added to cart successfully!</span>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ProductDetail
