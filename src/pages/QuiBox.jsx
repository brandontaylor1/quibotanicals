import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import backgroundImage from '../assets/images/P1010346 1@2x.png'

gsap.registerPlugin(ScrollTrigger)

const QuiBox = () => {
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const content = contentRef.current
    const title = titleRef.current
    const text = textRef.current
    const buttons = buttonsRef.current

    // Create timeline for the scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: content,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // Animate content container
    tl.to(content, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out'
    })

    // Animate title
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4')

    // Animate text
    tl.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3')

    // Animate buttons
    tl.to(buttons.querySelectorAll('button'), {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=0.2')

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section className='relative w-full min-h-[60vh] sm:min-h-[70vh] md:h-[80vh] flex flex-col items-center justify-center overflow-hidden py-6 sm:py-8 md:py-0'>
      {/* Background Image with lighter overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      
      {/* Content */}
      <div ref={contentRef} className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 opacity-0'>
        <div className='bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 text-center'>
          <h3 ref={titleRef}
            className='text-[var(--color-dark-green)] mb-4 sm:mb-6 opacity-0'
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: '300',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            The QuiBox Experience
          </h3>
          
          <p ref={textRef}
            className='text-[var(--color-dirt)] text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto opacity-0'
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300' }}
          >
            Every month, discover hand-selected premium CBD products, artisanal botanicals, and wellness essentials 
            curated by our experts. Each QuiBox tells a story of quality, sustainability, and transformative wellness.
          </p>
          
          <div ref={buttonsRef} className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link to="/subscriptions">
                <button 
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[var(--color-dark-red)] text-white rounded-lg font-medium text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:scale-105 opacity-0 min-w-[200px]"
                >
                  START SUBSCRIPTION
                </button>
              </Link>
              <Link to="/all-products">
                <button 
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[var(--color-dark-red)] text-[var(--color-dark-red)] rounded-lg font-medium text-base sm:text-lg hover:bg-[var(--color-dark-red)] hover:text-white transition-all duration-300 hover:scale-105 opacity-0 min-w-[200px]"
                >
                  SHOP INDIVIDUAL
                </button>
              </Link>
            </div>
            <Link to="/quibox">
              <button 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[var(--color-dark-green)] text-[var(--color-dark-green)] rounded-lg font-medium text-base sm:text-lg hover:bg-[var(--color-dark-green)] hover:text-white transition-all duration-300 hover:scale-105 opacity-0 min-w-[200px]"
              >
                LEARN MORE
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuiBox