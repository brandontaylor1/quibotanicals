import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('adminUser')
    const savedSession = localStorage.getItem('adminSession')
    
    if (savedUser && savedSession) {
      const sessionData = JSON.parse(savedSession)
      const now = new Date().getTime()
      
      // Check if session is still valid (24 hours)
      if (now < sessionData.expires) {
        setUser(JSON.parse(savedUser))
      } else {
        // Session expired, clear storage
        localStorage.removeItem('adminUser')
        localStorage.removeItem('adminSession')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    // Demo admin credentials - in production, this would be an API call
    const adminCredentials = {
      email: 'admin@quibotanicals.com',
      password: 'admin123'
    }

    if (email === adminCredentials.email && password === adminCredentials.password) {
      const adminUser = {
        id: 1,
        email: 'admin@quibotanicals.com',
        name: 'QuiBotanicals Admin',
        role: 'admin'
      }

      // Create session that expires in 24 hours
      const session = {
        expires: new Date().getTime() + (24 * 60 * 60 * 1000)
      }

      setUser(adminUser)
      localStorage.setItem('adminUser', JSON.stringify(adminUser))
      localStorage.setItem('adminSession', JSON.stringify(session))
      
      return { success: true }
    } else {
      return { success: false, error: 'Invalid email or password' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('adminUser')
    localStorage.removeItem('adminSession')
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAdmin: user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
