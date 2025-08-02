import React from 'react'
import { motion } from 'framer-motion'
import { 
  Monitor, 
  Key, 
  Server, 
  Network, 
  Camera, 
  Printer, 
  LogOut,
  User,
  Home
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ activeSection, onSectionChange, userName }) => {
  const navigate = useNavigate()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'assets', label: 'Assets Details', icon: Monitor },
    { id: 'software', label: 'Software License', icon: Key },
    { id: 'servers', label: 'Servers', icon: Server },
    { id: 'switches', label: 'Switches', icon: Network },
    { id: 'cctv', label: 'CCTV', icon: Camera },
    { id: 'printers', label: 'Printers', icon: Printer },
  ]

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const sidebarVariants = {
    hidden: { x: -300 },
    visible: {
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  }

  return (
    <motion.div
      className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold">{userName}</h2>
          <p className="text-slate-400 text-sm">Management System</p>
        </motion.div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            )
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <motion.div 
        className="absolute bottom-6 left-6 right-6"
        variants={itemVariants}
      >
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default Sidebar