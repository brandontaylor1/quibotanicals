import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[var(--color-dark-green)] to-[var(--color-clay)] py-20">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-white text-[6vw] md:text-[4vw] font-extralight mb-6'
              style={{
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '-0.02em',
              }}>
            Ready to Transform Your Wellness?
          </h2>
          <p className="text-white text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join our community of wellness enthusiasts and discover premium CBD products 
            delivered to your door every month. Start your journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/subscriptions">
              <motion.button 
                className="px-10 py-4 bg-white text-[var(--color-dark-green)] rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg min-w-[200px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                START SUBSCRIPTION
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button 
                className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-[var(--color-dark-green)] transition-all duration-300 min-w-[200px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CREATE ACCOUNT
              </motion.button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <h4 className="text-3xl font-bold mb-2">10,000+</h4>
              <p className="text-sm opacity-80">Happy Subscribers</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold mb-2">50+</h4>
              <p className="text-sm opacity-80">Premium Products</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold mb-2">99%</h4>
              <p className="text-sm opacity-80">Satisfaction Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full"></div>
      </div>
    </section>
  )
}

export default CallToAction
