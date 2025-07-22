import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WellnessJourney = () => {
  const journeyRef = useRef(null)
  const stepsRef = useRef([])
  const floatingElementsRef = useRef([])
  const [activeStep, setActiveStep] = useState(0)

  const journeySteps = [
    {
      title: "Discover",
      subtitle: "Your Wellness Needs",
      description: "Every journey begins with understanding your unique wellness goals and lifestyle.",
      icon: "🌱",
      color: "var(--color-light-green)",
      bgColor: "var(--color-light-green)/10"
    },
    {
      title: "Curate",
      subtitle: "Premium Selection",
      description: "Our experts handpick the finest CBD products from trusted artisans worldwide.",
      icon: "✨",
      color: "var(--color-orange)",
      bgColor: "var(--color-orange)/10"
    },
    {
      title: "Experience",
      subtitle: "Transform Daily",
      description: "Integrate luxury CBD wellness into your daily routine with guided experiences.",
      icon: "🧘‍♀️",
      color: "var(--color-clay)",
      bgColor: "var(--color-clay)/10"
    },
    {
      title: "Evolve",
      subtitle: "Continuous Growth",
      description: "Your wellness journey adapts and grows with your changing needs and preferences.",
      icon: "🦋",
      color: "var(--color-dark-red)",
      bgColor: "var(--color-dark-red)/10"
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating background elements
      const floatingElements = floatingElementsRef.current
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        })
      })

      // Parallax scrolling for steps
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.fromTo(step,
            {
              opacity: 0,
              y: 100,
              scale: 0.8,
              rotationY: 45
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
                onEnter: () => setActiveStep(index),
                onLeaveBack: () => setActiveStep(Math.max(0, index - 1))
              }
            }
          )

          // Add hover animations
          step.addEventListener('mouseenter', () => {
            gsap.to(step, {
              scale: 1.05,
              y: -10,
              duration: 0.3,
              ease: "power2.out"
            })
          })

          step.addEventListener('mouseleave', () => {
            gsap.to(step, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            })
          })
        }
      })

      // Progress line animation
      gsap.to(".progress-line", {
        scaleY: 1,
        transformOrigin: "top",
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: journeyRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 1
        }
      })

    }, journeyRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={journeyRef} 
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-white via-[var(--color-light-pink)]/20 to-[var(--color-light-green)]/30"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={el => floatingElementsRef.current[i] = el}
            className="absolute w-16 h-16 rounded-full opacity-20"
            style={{
              background: `linear-gradient(45deg, var(--color-light-green), var(--color-orange))`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translate(-50%, -50%)`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-extralight text-[var(--color-dark-green)] mb-6"
              style={{
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '-0.02em',
                fontSize: 'clamp(3rem, 6vw, 4.5rem)'
              }}>
            Your Wellness Journey
          </h2>
          <p className="text-[var(--color-dirt)] text-xl max-w-3xl mx-auto leading-relaxed"
             style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300' }}>
            Experience the transformation from discovery to evolution through our curated CBD luxury experience.
          </p>
        </div>

        {/* Journey Steps */}
        <div className="relative max-w-6xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-light-green)] to-[var(--color-dark-red)] transform -translate-x-1/2 progress-line scale-y-0 hidden lg:block" />

          {journeySteps.map((step, index) => (
            <div
              key={index}
              ref={el => stepsRef.current[index] = el}
              className={`relative mb-32 ${
                index % 2 === 0 ? 'lg:pr-1/2 lg:text-right' : 'lg:pl-1/2 lg:ml-auto lg:text-left'
              }`}
            >
              {/* Step Number Circle */}
              <div className={`absolute top-8 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg hidden lg:flex ${
                index % 2 === 0 ? 'right-0 lg:-mr-8' : 'left-0 lg:-ml-8'
              }`}
                   style={{ backgroundColor: step.color }}>
                {index + 1}
              </div>

              {/* Content Card */}
              <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-l-4 hover:shadow-2xl transition-all duration-300 ${
                index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'
              }`}
                   style={{ borderLeftColor: step.color }}>
                
                {/* Mobile Step Number */}
                <div className="lg:hidden w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white mb-4"
                     style={{ backgroundColor: step.color }}>
                  {index + 1}
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-4xl mb-4 lg:hidden">{step.icon}</div>
                  <div className="flex-1">
                    <div className={`hidden lg:block text-6xl mb-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2" 
                        style={{ fontFamily: 'Playfair Display, serif', color: step.color }}>
                      {step.title}
                    </h3>
                    <h4 className="text-xl text-[var(--color-dirt)] mb-4 font-semibold"
                        style={{ fontFamily: 'Playfair Display, serif' }}>
                      {step.subtitle}
                    </h4>
                    <p className="text-[var(--color-dirt)] leading-relaxed text-lg"
                       style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Interactive Elements */}
                <div className="mt-6 flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: activeStep === index ? step.color : '#E5E7EB',
                        transform: activeStep === index ? 'scale(1.5)' : 'scale(1)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WellnessJourney
