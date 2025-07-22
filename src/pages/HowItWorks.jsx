import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HowItWorks = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)

  const steps = [
    {
      number: "01",
      title: "Choose Your Plan",
      description: "Select from our three curated subscription tiers designed to match your wellness journey and lifestyle needs.",
      bgColor: "var(--color-light-pink)",
      textColor: "var(--color-dark-red)"
    },
    {
      number: "02", 
      title: "Curated Selection",
      description: "Our experts handpick premium CBD products from trusted artisans and sustainable sources worldwide.",
      bgColor: "var(--color-orange)",
      textColor: "white"
    },
    {
      number: "03",
      title: "Delivered Monthly",
      description: "Receive your luxury CBD box delivered directly to your door with detailed guides and usage instructions.",
      bgColor: "var(--color-light-green)",
      textColor: "var(--color-green)"
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
        { opacity: 0, y: 80 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.2,
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
    <section ref={sectionRef} className='py-12 sm:py-16 md:py-20'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <h1 className='font-extralight text-[var(--color-orange)] mb-4 opacity-0'
              style={{
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '-0.02em',
                fontSize: 'clamp(3rem, 6vw, 4.5rem)'
              }}>
            How It Works
          </h1>
          <p className="text-[var(--color-dirt)] text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-0 px-4 sm:px-0">
            Three simple steps to transform your wellness routine with premium CBD
          </p>
        </div>
        
        <div ref={cardsRef} className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto'>
          {steps.map((step, index) => (
            <div 
              key={index}
              className='relative rounded-lg shadow-2xl overflow-hidden h-[300px] sm:h-[350px] flex flex-col justify-between p-6 sm:p-8 hover:scale-105 transition-transform duration-300 opacity-0'
              style={{ backgroundColor: step.bgColor }}
            >
              <div className="flex flex-col h-full">
                <div className="text-4xl sm:text-5xl md:text-6xl font-extralight mb-3 sm:mb-4 opacity-30"
                     style={{ color: step.textColor, fontFamily: 'Playfair Display, serif' }}>
                  {step.number}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
                    style={{ color: step.textColor, fontFamily: 'Playfair Display, serif' }}>
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed flex-grow flex items-end"
                   style={{ color: step.textColor, fontFamily: 'Poppins, sans-serif' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks