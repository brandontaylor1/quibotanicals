import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useAuth } from '../contexts/AuthContext'

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats] = useState({
    totalUsers: 1247,
    activeSubscriptions: 892,
    monthlyRevenue: 68420,
    totalOrders: 3456,
    newSignups: 34,
    cancelledSubs: 12
  })

  const [products] = useState([
    { id: 1, name: 'Premium CBD Oil', price: 89.99, stock: 45, category: 'Oils' },
    { id: 2, name: 'Wellness Gummies', price: 34.99, stock: 128, category: 'Edibles' },
    { id: 3, name: 'Sleep Tincture', price: 67.50, stock: 23, category: 'Tinctures' },
    { id: 4, name: 'Pain Relief Balm', price: 42.00, stock: 67, category: 'Topicals' }
  ])

  const [orders] = useState([
    { id: 1001, customer: 'Sarah Johnson', amount: 89.99, status: 'Shipped', date: '2025-01-12' },
    { id: 1002, customer: 'Mike Chen', amount: 156.48, status: 'Processing', date: '2025-01-12' },
    { id: 1003, customer: 'Emma Davis', amount: 67.50, status: 'Delivered', date: '2025-01-11' },
    { id: 1004, customer: 'John Smith', amount: 198.75, status: 'Pending', date: '2025-01-11' }
  ])

  const [users] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', subscription: 'Premium', joined: '2024-06-15' },
    { id: 2, name: 'Mike Chen', email: 'mike@email.com', subscription: 'Standard', joined: '2024-08-22' },
    { id: 3, name: 'Emma Davis', email: 'emma@email.com', subscription: 'Basic', joined: '2024-11-03' },
    { id: 4, name: 'John Smith', email: 'john@email.com', subscription: 'Premium', joined: '2024-12-01' }
  ])

  useEffect(() => {
    gsap.fromTo('.admin-card', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    )
  }, [activeTab])

  const StatCard = ({ title, value, change, color = 'var(--color-green)' }) => (
    <div className="admin-card bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      </div>
    </div>
  )

  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
        activeTab === id 
          ? 'bg-[var(--color-orange)] text-white shadow-lg' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  )

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers.toLocaleString()} change={8.2} />
        <StatCard title="Active Subscriptions" value={stats.activeSubscriptions.toLocaleString()} change={12.5} color="var(--color-green)" />
        <StatCard title="Monthly Revenue" value={`$${stats.monthlyRevenue.toLocaleString()}`} change={15.3} color="var(--color-orange)" />
        <StatCard title="Total Orders" value={stats.totalOrders.toLocaleString()} change={6.8} color="var(--color-clay)" />
        <StatCard title="New Signups" value={stats.newSignups} change={-2.1} color="var(--color-light-green)" />
        <StatCard title="Cancelled Subs" value={stats.cancelledSubs} change={-18.5} color="var(--color-dark-red)" />
      </div>
      
      <div className="admin-card bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-gray-600">New user registration: emma@email.com</span>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-gray-600">Order #1004 requires attention</span>
            <span className="text-xs text-gray-400">4 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-gray-600">Product stock low: Sleep Tincture (23 remaining)</span>
            <span className="text-xs text-gray-400">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="admin-card bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Product Management</h3>
          <button className="bg-[var(--color-orange)] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
            Add Product
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{product.name}</td>
                  <td className="py-3 px-4">${product.price}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock < 30 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="admin-card bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Order Management</h3>
          <div className="flex space-x-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Orders</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">#{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">${order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                    <button className="text-green-600 hover:text-green-800">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="admin-card bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search users..." 
              className="border rounded-lg px-3 py-2 text-sm w-64"
            />
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Users</option>
              <option>Premium</option>
              <option>Standard</option>
              <option>Basic</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Subscription</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.subscription === 'Premium' ? 'bg-purple-100 text-purple-800' :
                      user.subscription === 'Standard' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.subscription}
                    </span>
                  </td>
                  <td className="py-3 px-4">{user.joined}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Suspend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Manage your QuiBotanicals platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Welcome back, {user?.name}
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleString()}
              </div>
              <button 
                onClick={logout}
                className="bg-[var(--color-orange)] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-4">
            <TabButton id="overview" label="Overview" icon="📊" />
            <TabButton id="products" label="Products" icon="📦" />
            <TabButton id="orders" label="Orders" icon="🛒" />
            <TabButton id="users" label="Users" icon="👥" />
          </nav>
        </div>

        <div
          key={activeTab}
          className="transition-all duration-300 ease-in-out"
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'users' && renderUsers()}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
