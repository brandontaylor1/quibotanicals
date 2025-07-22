import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AdminLogin from '../pages/AdminLogin'

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, isAdmin } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-orange)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <AdminLogin />
  }

  return children
}

export default ProtectedRoute
