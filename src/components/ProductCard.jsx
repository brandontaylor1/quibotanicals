import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ name, price, image, description, category }) => {
  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
      {/* Product Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = '/api/placeholder/300/400';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[var(--color-dark-green)]/80 text-white text-xs font-medium rounded-full backdrop-blur-sm"
                style={{ fontFamily: 'Poppins, sans-serif' }}>
            {category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-[var(--color-dark-green)] font-semibold text-lg mb-2 group-hover:text-[var(--color-dark-red)] transition-colors duration-300"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              letterSpacing: '-0.01em'
            }}>
          {name}
        </h3>
        
        <p className="text-[var(--color-dirt)] text-sm mb-4 line-clamp-2"
           style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300' }}>
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[var(--color-dark-red)] font-bold text-xl"
                style={{ fontFamily: 'Playfair Display, serif' }}>
            ${price}
          </span>
          
          <button className="px-4 py-2 bg-[var(--color-dark-green)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-dark-red)] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-green)] focus:ring-offset-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Quick View Overlay */}
      <div className="absolute inset-0 bg-[var(--color-dark-green)]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Link to={`/product/${name.toLowerCase().replace(/\s+/g, '-')}`}>
          <button className="px-6 py-3 bg-white text-[var(--color-dark-green)] rounded-lg font-medium hover:bg-[var(--color-light-green)] transition-all duration-300 hover:scale-105"
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;