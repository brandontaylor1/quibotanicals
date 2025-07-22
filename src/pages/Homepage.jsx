import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import videoBg from '../assets/videos/7268824-uhd_4096_2160_25fps.mp4'

import Navbar from '../components/Navbar'
import Welcome from './Welcome'
import WellnessJourney from '../components/WellnessJourney'
import HowItWorks from './HowItWorks'
import QuiBox from './QuiBox'
import FeaturedProducts from './FeaturedProducts'
import FeaturedProducer from './FeaturedProducer'
import Benefits from '../components/Benefits'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

const Homepage = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    // Create a link element to preload the video
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = videoBg
    link.as = 'video'
    link.type = 'video/mp4'
    document.head.appendChild(link)

    // Also preload via video element for better compatibility
    const video = document.createElement('video')
    video.src = videoBg
    video.preload = 'auto'
    video.load()
    
    video.oncanplaythrough = () => {
      setVideoLoaded(true)
    }
    
    video.onerror = () => {
      setVideoError(true)
      setVideoLoaded(true) // Show fallback
    }

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <>
        <Navbar />
        {/* Video Hero Section */}
        <section className='homepage-container w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden'>
          {/* Fallback Background */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-[var(--color-dark-green)] via-[var(--color-clay)] to-[var(--color-dark-red)] transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'}`}
          >
            {/* Subtle loading indicator */}
            {!videoLoaded && !videoError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          {/* Video Background */}
          <video 
            src={videoBg} 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            className={`object-cover w-full h-full absolute top-0 left-0 z-0 transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'}`}
            onCanPlayThrough={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
          />
          
          <motion.h1 
              className='text-white w-full h-auto absolute bottom-4 sm:bottom-8 md:bottom-12 left-0 right-0 z-10 font-extralight tracking-tighter text-center px-4'
              style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: '100',
                fontSize: 'clamp(3rem, 8vw, 10vw)',
                lineHeight: '0.9',
              }}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}>
                QUIBOTANICALS
            </motion.h1>
        </section>
        
        {/* Content Sections with Gradient Background */}
        <div className="bg-gradient-to-br from-[var(--color-light-pink)] to-[var(--color-light-green)] min-h-screen">
          <Welcome />
          <WellnessJourney />
          <HowItWorks />
          <QuiBox />
          <FeaturedProducts />
          <FeaturedProducer />
          <Benefits />
          <Testimonials />
          <CallToAction />
          <Footer />
        </div>
    </>
  )
}

export default Homepage