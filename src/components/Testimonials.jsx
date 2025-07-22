import React from 'react'
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "QuiBotanicals transformed my sleep routine. The monthly boxes are like receiving a gift from nature!",
      subscription: "Premium Plan"
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "The quality is unmatched. I've tried many CBD brands, but nothing compares to what I get in my QuiBox.",
      subscription: "Luxury Plan"
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment: "Perfect for managing my daily stress. The curated selection helps me discover new products I love.",
      subscription: "Essential Plan"
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
            What Our Members Say
          </h2>
          <p className="text-[var(--color-dirt)] text-lg md:text-xl max-w-3xl mx-auto">
            Join thousands of satisfied subscribers who trust QuiBotanicals for their wellness journey
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-2xl p-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>
              <p className="text-[var(--color-dirt)] text-lg mb-6 italic leading-relaxed">
                "{testimonial.comment}"
              </p>
              <div className="border-t pt-4">
                <h4 className="text-[var(--color-dark-green)] font-bold text-lg mb-1"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                  {testimonial.name}
                </h4>
                <p className="text-[var(--color-orange)] text-sm font-medium">
                  {testimonial.subscription}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
