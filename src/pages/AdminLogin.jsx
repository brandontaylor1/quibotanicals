import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const containerRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
    )
    
    gsap.fromTo(formRef.current.children, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(email, password)
      if (!result.success) {
        setError(result.error)
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-dark-green)] via-[var(--color-clay)] to-[var(--color-dark-red)] flex items-center justify-center p-4">
      {/* Back to Homepage Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center space-x-2"
      >
        <span>←</span>
        <span>Back to Homepage</span>
      </button>

      <div 
        ref={containerRef}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 
            className="text-3xl font-bold text-[var(--color-orange)] mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Admin Login
          </h1>
          <p className="text-gray-600">Access QuiBotanicals Dashboard</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="opacity-0">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all duration-200"
              placeholder="admin@quibotanicals.com"
            />
          </div>

          <div className="opacity-0">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm opacity-0">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-orange)] text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:ring-2 focus:ring-[var(--color-orange)] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed opacity-0"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg opacity-0">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
          <p className="text-xs text-gray-600">Email: admin@quibotanicals.com</p>
          <p className="text-xs text-gray-600">Password: admin123</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
