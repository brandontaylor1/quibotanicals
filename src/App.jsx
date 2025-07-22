import React, { useState } from 'react'
import Loader from './components/Loader'
import Homepage from './pages/Homepage'
import AllProducts from './pages/AllProducts'
import ProductDetail from './pages/ProductDetail'
import SearchResults from './pages/SearchResults'
import QuiBoxPage from './pages/QuiBoxPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Subscriptions from './pages/Subscriptions'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'


const App = () => {
  const [loading, setLoading] = useState(true)

  return (
    <AuthProvider>
      <Router>
        {loading && <Loader onFinish={() => setLoading(false)} />}
        {!loading && (
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/products' element={<AllProducts />} />
            <Route path='/all-products' element={<AllProducts />} />
            <Route path='/product/:productId' element={<ProductDetail />} />
            <Route path='/search' element={<SearchResults />} />
            <Route path='/quibox' element={<QuiBoxPage />} />
            <Route path='/subscriptions' element={<Subscriptions />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/admin' element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        )}
      </Router>
    </AuthProvider>
  )
}

export default App