import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Monitor, 
  Key, 
  Server, 
  Network, 
  Camera, 
  Printer,
  Building,
  Users,
  Search,
  ChevronDown
} from 'lucide-react'

const DashboardCards = ({ data, onCardClick, dropdownOptions }) => {
  const [searchTerms, setSearchTerms] = useState({})
  const [selectedOptions, setSelectedOptions] = useState({})

  const cardConfigs = [
    {
      id: 'plant',
      title: 'Plant',
      icon: Building,
      color: 'from-blue-500 to-cyan-500',
      hasDropdown: true,
      dropdownOptions: dropdownOptions.plants
    },
    {
      id: 'assets',
      title: 'Assets',
      icon: Monitor,
      color: 'from-purple-500 to-pink-500',
      count: data.assets?.length || 0,
      hasSearch: true
    },
    {
      id: 'departments',
      title: 'Department',
      icon: Users,
      color: 'from-green-500 to-teal-500',
      hasDropdown: true,
      dropdownOptions: dropdownOptions.departments
    },
    {
      id: 'software',
      title: 'Software License',
      icon: Key,
      color: 'from-yellow-500 to-orange-500',
      count: data.software_licenses?.length || 0,
      hasSearch: true
    },
    {
      id: 'servers',
      title: 'Server Details',
      icon: Server,
      color: 'from-red-500 to-pink-500',
      count: (data.sap_servers?.length || 0) + (data.non_sap_servers?.length || 0),
      hasSearch: true
    },
    {
      id: 'switches',
      title: 'Switches Details',
      icon: Network,
      color: 'from-indigo-500 to-purple-500',
      count: data.switches?.length || 0,
      hasSearch: true
    },
    {
      id: 'cctv',
      title: 'CCTV',
      icon: Camera,
      color: 'from-gray-500 to-slate-500',
      count: data.cctv?.length || 0,
      hasSearch: true
    },
    {
      id: 'printers',
      title: 'Printers',
      icon: Printer,
      color: 'from-emerald-500 to-green-500',
      count: data.printers?.length || 0,
      hasSearch: true
    }
  ]

  const handleSearchChange = (cardId, value) => {
    setSearchTerms(prev => ({
      ...prev,
      [cardId]: value
    }))
  }

  const handleDropdownChange = (cardId, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [cardId]: value
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="space-y-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          ACGL Management System Dashboard
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cardConfigs.map((card) => {
          const Icon = card.icon
          
          return (
            <motion.div
              key={card.id}
              className="dashboard-card"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(31, 38, 135, 0.6)"
              }}
              onClick={() => card.hasSearch && onCardClick(card.id)}
              style={{ cursor: card.hasSearch ? 'pointer' : 'default' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {card.count !== undefined && (
                  <div className="text-2xl font-bold text-white">
                    {card.count}
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-white mb-4">
                {card.title}
              </h3>

              {card.hasSearch && (
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerms[card.id] || ''}
                    onChange={(e) => handleSearchChange(card.id, e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              {card.hasDropdown && (
                <div className="relative">
                  <select
                    value={selectedOptions[card.id] || ''}
                    onChange={(e) => handleDropdownChange(card.id, e.target.value)}
                    className="w-full p-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="" className="text-gray-800">
                      Select {card.title}
                    </option>
                    {card.dropdownOptions?.map((option) => (
                      <option 
                        key={option.value} 
                        value={option.value}
                        className="text-gray-800"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-4 h-4 pointer-events-none" />
                </div>
              )}

              {card.hasSearch && (
                <div className="mt-4 text-sm text-gray-300">
                  Click to manage {card.title.toLowerCase()}
                </div>
              )}
            </motion.div>
          )
        })}
      </motion.div>

      {/* Quick Stats Section */}
      <motion.div
        className="content-panel-gradient rounded-2xl p-6 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">System Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white bg-opacity-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {data.assets?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Total Assets</div>
          </div>
          <div className="text-center p-4 bg-white bg-opacity-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {data.software_licenses?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Software Licenses</div>
          </div>
          <div className="text-center p-4 bg-white bg-opacity-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {(data.sap_servers?.length || 0) + (data.non_sap_servers?.length || 0)}
            </div>
            <div className="text-sm text-gray-600">Total Servers</div>
          </div>
          <div className="text-center p-4 bg-white bg-opacity-50 rounded-xl">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {(data.switches?.length || 0) + (data.cctv?.length || 0) + (data.printers?.length || 0)}
            </div>
            <div className="text-sm text-gray-600">Network Devices</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardCards