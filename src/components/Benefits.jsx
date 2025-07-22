import React from 'react'
import { motion } from 'framer-motion'
import { FaLeaf, FaShieldAlt, FaHeart, FaBolt } from 'react-icons/fa'

const Benefits = () => {
  const benefits = [
    {
      icon: <FaLeaf className="text-4xl text-[var(--color-dark-green)]" />,
      title: "100% Natural",
      description: "Pure, organic CBD sourced from sustainable farms with no synthetic additives"
    },
    {
      icon: <FaShieldAlt className="text-4xl text-[var(--color-dark-red)]" />,
      title: "Lab Tested",
      description: "Third-party tested for purity, potency, and safety with full transparency"
    },
    {
      icon: <FaHeart className="text-4xl text-[var(--color-orange)]" />,
      title: "Wellness Focused",
      description: "Curated to support your mental, physical, and emotional well-being"
    },
    {
      icon: <FaBolt className="text-4xl text-[var(--color-purple)]" />,
      title: "Fast Results",
      description: "Premium quality products designed for effective and consistent results"
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-[6vw] md:text-[4vw] font-extralight text-[var(--color-dark-green)] mb-4'
              style={{
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '-0.02em',
              }}>
            Why Choose QuiBotanicals?
          </h2>
          <p className="text-[var(--color-dirt)] text-lg md:text-xl max-w-3xl mx-auto">
            Experience the difference with our commitment to quality, transparency, and your wellness
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-[var(--color-dark-green)] text-xl font-bold mb-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                {benefit.title}
              </h3>
              <p className="text-[var(--color-dirt)] text-sm leading-relaxed"
                 style={{ fontFamily: 'Poppins, sans-serif' }}>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
