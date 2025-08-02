import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Lock, LogIn } from 'lucide-react'

const LoginPage = () => {
  const [selectedUser, setSelectedUser] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const users = [
    { id: 'admin', name: 'Admin', username: 'admin', password: 'admin123' },
    { id: 'deepak', name: 'Deepak', username: 'deepak', password: 'deepak123' },
    { id: 'shivaji', name: 'Shivaji', username: 'shivaji', password: 'shivaji123' }
  ]

  useEffect(() => {
    // Auto-fill credentials when user is selected
    if (selectedUser) {
      const user = users.find(u => u.id === selectedUser)
      if (user) {
        setUsername(user.username)
        setPassword(user.password)
      }
    }
  }, [selectedUser])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Navigate based on user role
        switch (data.user.role) {
          case 'admin':
            navigate('/admin-dashboard')
            break
          case 'deepak':
            navigate('/deepak-dashboard')
            break
          case 'shivaji':
            navigate('/shivaji-dashboard')
            break
          default:
            navigate('/login')
        }
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch (error) {
      setError('Login failed. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const backgroundVariants = {
    animate: {
      background: [
        'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)',
        'linear-gradient(-45deg, #4facfe, #00f2fe, #43e97b, #38f9d7)',
        'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)'
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      variants={backgroundVariants}
      animate="animate"
      style={{
        backgroundSize: '400% 400%'
      }}
    >
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-20 h-20 bg-white bg-opacity-10 rounded-full"
        animate={floatingAnimation}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full"
        animate={{
          y: [10, -10, 10],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      <motion.div
        className="absolute top-1/2 left-10 w-12 h-12 bg-white bg-opacity-10 rounded-full"
        animate={{
          y: [-5, 15, -5],
          x: [-5, 5, -5],
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      <motion.div
        className="card-gradient max-w-md w-full p-8 rounded-3xl shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <img 
              src="/acgl-logo.svg" 
              alt="ACGL Logo" 
              className="w-32 h-16 mx-auto"
            />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            ACGL Management System
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* User Selection */}
        <motion.div className="mb-6" variants={itemVariants}>
          <label className="block text-white font-semibold mb-3">Select User:</label>
          <div className="grid grid-cols-3 gap-3">
            {users.map((user) => (
              <motion.button
                key={user.id}
                type="button"
                onClick={() => setSelectedUser(user.id)}
                className={`p-4 rounded-xl text-center transition-all duration-300 ${
                  selectedUser === user.id
                    ? 'bg-white bg-opacity-30 text-white border-2 border-white'
                    : 'bg-white bg-opacity-10 text-white border-2 border-transparent hover:bg-opacity-20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">{user.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.form onSubmit={handleLogin} variants={itemVariants}>
          <div className="space-y-4 mb-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <motion.div
              className="error-message mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-white border-opacity-30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="loading"></div>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Demo Credentials Info */}
        <motion.div 
          className="mt-6 text-center text-white text-opacity-80 text-sm"
          variants={itemVariants}
        >
          <p>Click on any user above to auto-fill credentials</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default LoginPage