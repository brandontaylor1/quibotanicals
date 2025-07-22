import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const FeaturedProducer = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)

  const producers = [
    {
      name: "Green Valley Farms",
      description: "Organic hemp cultivation with sustainable practices",
      location: "Colorado, USA",
      bgColor: "var(--color-light-pink)",
      textColor: "var(--color-dark-red)"
    },
    {
      name: "Botanical Artisans",
      description: "Handcrafted CBD products with traditional methods",
      location: "Oregon, USA", 
      bgColor: "var(--color-light-green)",
      textColor: "var(--color-dark-green)"
    },
    {
      name: "Pure Essence Co.",
      description: "Premium extracts using cutting-edge technology",
      location: "California, USA",
      bgColor: "var(--color-purple)",
      textColor: "var(--color-clay)"
    },
    {
      name: "Heritage Hemp",
      description: "Family-owned farm with 30 years of experience",
      location: "Kentucky, USA",
      bgColor: "var(--color-clay)",
      textColor: "var(--color-orange)"
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(titleRef.current.children, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
      
      // Animate cards
      gsap.fromTo(cardsRef.current.children, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <h1 className='font-extralight text-[var(--color-dark-green)] mb-4 opacity-0'
              style={{
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '-0.02em',
                fontSize: 'clamp(3rem, 6vw, 4.5rem)'
              }}>
            Featured Producers
          </h1>
          <p className="text-[var(--color-dirt)] text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-0">
            Meet the artisans and farmers behind our exceptional CBD products
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {producers.map((producer, index) => (
            <div 
              key={index}
              className="rounded-lg shadow-2xl p-6 sm:p-8 h-[280px] sm:h-[300px] flex flex-col justify-between hover:scale-105 transition-transform duration-300 opacity-0"
              style={{ backgroundColor: producer.bgColor }}
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3"
                    style={{ color: producer.textColor, fontFamily: 'Playfair Display, serif' }}>
                  {producer.name}
                </h3>
                <p className="text-sm sm:text-base mb-4"
                   style={{ color: producer.textColor, fontFamily: 'Poppins, sans-serif' }}>
                  {producer.description}
                </p>
                <p className="text-xs sm:text-sm opacity-80"
                   style={{ color: producer.textColor, fontFamily: 'Poppins, sans-serif' }}>
                  📍 {producer.location}
                </p>
              </div>
              <div className="pt-4">
                <Link to="/about">
                  <button 
                    className="px-4 sm:px-6 py-2 border-2 rounded-lg font-medium text-xs sm:text-sm hover:bg-opacity-20 transition-all duration-300 hover:scale-105"
                    style={{ 
                      borderColor: producer.textColor, 
                      color: producer.textColor,
                      backgroundColor: 'transparent'
                    }}
                  >
                    LEARN MORE
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducer