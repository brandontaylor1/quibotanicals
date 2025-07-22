import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-light-pink)] to-[var(--color-light-green)] pt-[120px]">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-[var(--color-dark-green)] text-center mb-8">
            Contact Us
          </h1>
          <p className="text-center text-[var(--color-dirt)]">
            Contact page content coming soon...
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact