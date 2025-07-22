import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-light-pink)] to-[var(--color-light-green)] pt-[120px]">
        <div className="container mx-auto px-4 py-20">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-extralight text-[var(--color-dark-green)] mb-6" 
                style={{ 
                  fontFamily: 'Playfair Display, serif', 
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)'
                }}>
              About QuiBotanicals
            </h1>
            <p className="text-[var(--color-dark-red)] text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Crafting premium CBD experiences through nature's finest botanicals
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div 
            className="grid md:grid-cols-2 gap-16 items-center mb-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <h2 className="font-extralight text-[var(--color-purple)] mb-6"
                  style={{ 
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)'
                  }}>
                Our Story
              </h2>
              <p className="text-[var(--color-dirt)] text-lg leading-relaxed">
                Founded with a passion for natural wellness, QuiBotanicals emerged from a simple belief: 
                everyone deserves access to premium, carefully crafted CBD products that enhance daily life.
              </p>
              <p className="text-[var(--color-dirt)] text-lg leading-relaxed">
                Our journey began in the heart of organic farms, where we discovered the transformative 
                power of botanicals. Today, we curate subscription boxes that bring luxury CBD experiences 
                directly to your doorstep.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-[400px] bg-[var(--color-clay)] rounded-lg shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-orange)] to-transparent opacity-30"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-sm italic">
                    "Nature's wisdom, carefully curated for modern wellness"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="font-extralight text-[var(--color-purple)] text-center mb-12"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)'
                }}>
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quality First",
                  description: "Every product is carefully selected and tested to ensure the highest quality standards.",
                  color: "var(--color-orange)"
                },
                {
                  title: "Sustainable Practices",
                  description: "We partner with farms that prioritize environmental responsibility and ethical cultivation.",
                  color: "var(--color-light-green)"
                },
                {
                  title: "Customer Wellness",
                  description: "Your wellness journey is our priority. We're here to support every step of your path.",
                  color: "var(--color-clay)"
                }
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-8 rounded-lg shadow-lg bg-white/80 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                       style={{ backgroundColor: value.color }}>
                    <span className="text-white text-2xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-dark-green)] mb-4"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                    {value.title}
                  </h3>
                  <p className="text-[var(--color-dirt)] leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission Section */}
          <motion.div 
            className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-[4vw] md:text-[3vw] font-bold text-[var(--color-purple)] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Mission
            </h2>
            <p className="text-[var(--color-dirt)] text-xl leading-relaxed max-w-4xl mx-auto">
              To democratize access to premium CBD products through curated subscription experiences 
              that educate, inspire, and support your wellness journey. We believe that everyone 
              deserves the opportunity to discover the perfect botanical blend for their unique needs.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default About