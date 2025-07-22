import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Welcome = () => {
  const welcomeRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title elements
      gsap.fromTo(titleRef.current.children, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          scrollTrigger: {
            trigger: welcomeRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
      
      // Animate content paragraph
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: welcomeRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
      
      // Animate buttons
      gsap.fromTo(buttonsRef.current.children, 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          delay: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: welcomeRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, welcomeRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={welcomeRef} className='py-12 sm:py-16 md:py-20'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <div ref={titleRef} className="mb-8 sm:mb-12">
            <h1 className='text-[var(--color-dark-red)] font-light mb-3 opacity-0'
                style={{ 
                  fontFamily: 'Playfair Display, serif', 
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)'
                }}>
              Welcome
            </h1>
            <h2 className='text-[var(--color-orange)] font-light mb-3 opacity-0'
                style={{ 
                  fontFamily: 'Playfair Display, serif', 
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)'
                }}>
              to the world of
            </h2>
            <h3 className='text-[var(--color-clay)] font-extralight opacity-0'
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontStyle: 'italic',
                  letterSpacing: '-0.03em',
                  fontSize: 'clamp(4rem, 8vw, 6rem)'
                }}>
              CBD LUXURY
            </h3>
          </div>
          
          <p ref={contentRef} className='text-[var(--color-dirt)] text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12 opacity-0 px-4 sm:px-0'
             style={{ fontFamily: "Poppins, sans-serif", fontWeight: '300' }}>
            Discover the transformative power of premium CBD through our carefully curated subscription boxes. 
            Each delivery brings you closer to wellness, balance, and the luxurious self-care you deserve.
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 px-4 sm:px-0">
            <Link to="/subscriptions">
              <button 
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-[var(--color-dark-red)] text-white rounded-lg font-medium text-lg sm:text-xl hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:scale-105 opacity-0 min-w-[240px]"
              >
                START YOUR JOURNEY
              </button>
            </Link>
            <Link to="/about">
              <button 
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-[var(--color-clay)] text-[var(--color-clay)] rounded-lg font-medium text-lg sm:text-xl hover:bg-[var(--color-clay)] hover:text-white transition-all duration-300 hover:scale-105 opacity-0 min-w-[240px]"
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

export default Welcome