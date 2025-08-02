import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import DataTable from './DataTable'
import DataForm from './DataForm'
import DashboardCards from './DashboardCards'
import { Plus } from 'lucide-react'

const DeepakDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [activeSubsection, setActiveSubsection] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [data, setData] = useState({})
  const [dropdownOptions, setDropdownOptions] = useState({
    plants: [],
    departments: []
  })
  const [successMessage, setSuccessMessage] = useState('')

  // Same field and column configurations as Admin
  const fieldConfigs = {
    assets: [
      { name: 'sr_number', label: 'SR Number', type: 'number', required: true },
      { name: 'assets_number', label: 'Assets Number', required: true },
      { name: 'name', label: 'Name', required: true },
      { name: 'department', label: 'Department', required: true },
      { name: 'hostname', label: 'Hostname' },
      { name: 'username', label: 'Username' },
      { name: 'serial_number', label: 'Serial Number' },
      { name: 'device', label: 'Device' }
    ],
    software_licenses: [
      { name: 'sr_number', label: 'SR Number', type: 'number', required: true },
      { name: 'software_key', label: 'Software Key', required: true },
      { name: 'name', label: 'Name', required: true },
      { name: 'department', label: 'Department', required: true },
      { name: 'hostname', label: 'Hostname' },
      { name: 'username', label: 'Username' },
      { name: 'device', label: 'Device' }
    ],
    sap_servers: [
      { name: 'sr_number', label: 'SR Number', type: 'number', required: true },
      { name: 'server_brand', label: 'Server Brand', required: true },
      { name: 'serial_number', label: 'Serial Number', required: true },
      { name: 'model_number', label: 'Model Number', required: true },
      { name: 'hard_disk', label: 'Hard Disk' },
      { name: 'total_ram', label: 'Total RAM' },
      { name: 'total_cpu', label: 'Total CPU' }
    ],
    non_sap_servers: [
      { name: 'sr_number', label: 'SR Number', type: 'number', required: true },
      { name: 'server_brand', label: 'Server Brand', required: true },
      { name: 'serial_number', label: 'Serial Number', required: true },
      { name: 'model_number', label: 'Model Number', required: true },
      { name: 'hard_disk', label: 'Hard Disk' },
      { name: 'total_ram', label: 'Total RAM' },
      { name: 'total_cpu', label: 'Total CPU' },
      { name: 'vm', label: 'VM' }
    ],
    switches: [
      { name: 'sr_number', label: 'SR Number', type: 'number', required: true },
      { name: 'switches_id', label: 'Switches ID', required: true },
      { name: 'name', label: 'Name', required: true },
      { name: 'department', label: 'Department', required: true },
      { name: 'hostname', label: 'Hostname' },
      { name: 'username', label: 'Username' },
      { name: 'plant', label: 'Plant' },
      { name: 'device', label: 'Device' }
    ],
    cctv: [
      { name: 'sr_number', label: 'SR Number', type: 'number', required: true },
      { name: 'switches_id', label: 'Switches ID', required: true },
      { name: 'name', label: 'Name', required: true },
      { name: 'department', label: 'Department', required: true },
      { name: 'hostname', label: 'Hostname' },
      { name: 'username', label: 'Username' },
      { name: 'plant', label: 'Plant' },
      { name: 'device', label: 'Device' }
    ],
    printers: [
      { name: 'sr_number', label: 'SR Number', type: 'number', required: true },
      { name: 'switches_id', label: 'Switches ID', required: true },
      { name: 'name', label: 'Name', required: true },
      { name: 'department', label: 'Department', required: true },
      { name: 'hostname', label: 'Hostname' },
      { name: 'username', label: 'Username' },
      { name: 'plant', label: 'Plant' },
      { name: 'device', label: 'Device' }
    ]
  }

  const columnConfigs = {
    assets: [
      { key: 'sr_number', label: 'SR No.' },
      { key: 'assets_number', label: 'Assets No.' },
      { key: 'name', label: 'Name' },
      { key: 'department', label: 'Department' },
      { key: 'hostname', label: 'Hostname' },
      { key: 'username', label: 'Username' },
      { key: 'serial_number', label: 'Serial No.' },
      { key: 'device', label: 'Device' }
    ],
    software_licenses: [
      { key: 'sr_number', label: 'SR No.' },
      { key: 'software_key', label: 'Software Key' },
      { key: 'name', label: 'Name' },
      { key: 'department', label: 'Department' },
      { key: 'ms_office', label: 'MS Office' },
      { key: 'autocad', label: 'AutoCAD' },
      { key: 'cero', label: 'Cero' }
    ],
    sap_servers: [
      { key: 'sr_number', label: 'SR No.' },
      { key: 'server_brand', label: 'Server Brand' },
      { key: 'serial_number', label: 'Serial No.' },
      { key: 'model_number', label: 'Model No.' },
      { key: 'hard_disk', label: 'Hard Disk' },
      { key: 'total_ram', label: 'Total RAM' },
      { key: 'total_cpu', label: 'Total CPU' }
    ],
    non_sap_servers: [
      { key: 'sr_number', label: 'SR No.' },
      { key: 'server_brand', label: 'Server Brand' },
      { key: 'serial_number', label: 'Serial No.' },
      { key: 'model_number', label: 'Model No.' },
      { key: 'hard_disk', label: 'Hard Disk' },
      { key: 'total_ram', label: 'Total RAM' },
      { key: 'total_cpu', label: 'Total CPU' },
      { key: 'vm', label: 'VM' }
    ],
    switches: [
      { key: 'sr_number', label: 'SR No.' },
      { key: 'switches_id', label: 'Switches ID' },
      { key: 'name', label: 'Name' },
      { key: 'department', label: 'Department' },
      { key: 'plant', label: 'Plant' },
      { key: 'device', label: 'Device' }
    ],
    cctv: [
      { key: 'sr_number', label: 'SR No.' },
      { key: 'switches_id', label: 'Switches ID' },
      { key: 'name', label: 'Name' },
      { key: 'department', label: 'Department' },
      { key: 'plant', label: 'Plant' },
      { key: 'device', label: 'Device' }
    ],
    printers: [
      { key: 'sr_number', label: 'SR No.' },
      { key: 'switches_id', label: 'Switches ID' },
      { key: 'name', label: 'Name' },
      { key: 'department', label: 'Department' },
      { key: 'plant', label: 'Plant' },
      { key: 'device', label: 'Device' }
    ]
  }

  useEffect(() => {
    loadData()
    loadDropdownOptions()
  }, [])

  const loadData = async () => {
    const sections = ['assets', 'software_licenses', 'sap_servers', 'non_sap_servers', 'switches', 'cctv', 'printers']
    const newData = {}
    
    for (const section of sections) {
      try {
        const response = await fetch(`/api/${section}`)
        if (response.ok) {
          newData[section] = await response.json()
        }
      } catch (error) {
        console.error(`Error loading ${section}:`, error)
        newData[section] = []
      }
    }
    
    setData(newData)
  }

  const loadDropdownOptions = async () => {
    try {
      const [plantsRes, deptRes] = await Promise.all([
        fetch('/api/plants'),
        fetch('/api/departments')
      ])
      
      if (plantsRes.ok && deptRes.ok) {
        const plants = await plantsRes.json()
        const departments = await deptRes.json()
        
        setDropdownOptions({
          plants: plants.map(p => ({ value: p.name, label: p.name })),
          departments: departments.map(d => ({ value: d.name, label: d.name }))
        })
      }
    } catch (error) {
      console.error('Error loading dropdown options:', error)
    }
  }

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
    setActiveSubsection('')
    setShowForm(false)
    setEditingItem(null)
  }

  const handleCreateNew = (subsection) => {
    setActiveSubsection(subsection)
    setShowForm(true)
    setEditingItem(null)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setShowForm(true)
  }

  const handleFormSubmit = async (formData) => {
    try {
      const endpoint = activeSubsection || activeSection
      const method = editingItem ? 'PUT' : 'POST'
      const url = editingItem ? `/api/${endpoint}/${editingItem.id}` : `/api/${endpoint}`
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        await loadData()
        setShowForm(false)
        setEditingItem(null)
        showSuccessMessage('Data saved successfully!')
      }
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }

  const renderContent = () => {
    if (activeSection === 'dashboard') {
      return (
        <DashboardCards 
          data={data}
          onCardClick={handleSectionChange}
          dropdownOptions={dropdownOptions}
        />
      )
    }

    if (showForm) {
      const currentConfig = activeSubsection || activeSection
      return (
        <DataForm
          fields={fieldConfigs[currentConfig]}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
          initialData={editingItem || {}}
          title={`${editingItem ? 'Edit' : 'Create'} ${currentConfig.replace('_', ' ').toUpperCase()}`}
          showSoftwareCheckboxes={currentConfig === 'software_licenses'}
        />
      )
    }

    // Server section with dropdown for SAP/Non-SAP
    if (activeSection === 'servers') {
      return (
        <div className="space-y-6">
          <div className="content-panel-gradient rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Server Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <button
                  onClick={() => handleCreateNew('sap_servers')}
                  className="w-full p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-between hover:shadow-lg transition-all"
                >
                  <span className="text-lg font-semibold">SAP Server</span>
                  <Plus className="w-6 h-6" />
                </button>
              </motion.div>
              
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <button
                  onClick={() => handleCreateNew('non_sap_servers')}
                  className="w-full p-6 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl flex items-center justify-between hover:shadow-lg transition-all"
                >
                  <span className="text-lg font-semibold">Non-SAP Server</span>
                  <Plus className="w-6 h-6" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Display both server tables - NO DELETE for Deepak */}
          <div className="space-y-6">
            <DataTable
              data={data.sap_servers || []}
              columns={columnConfigs.sap_servers}
              onEdit={handleEdit}
              onDelete={null} // No delete for Deepak
              canDelete={false}
              title="SAP Servers"
              onAdd={() => handleCreateNew('sap_servers')}
            />
            
            <DataTable
              data={data.non_sap_servers || []}
              columns={columnConfigs.non_sap_servers}
              onEdit={handleEdit}
              onDelete={null} // No delete for Deepak
              canDelete={false}
              title="Non-SAP Servers"
              onAdd={() => handleCreateNew('non_sap_servers')}
            />
          </div>
        </div>
      )
    }

    // Regular sections - NO DELETE for Deepak
    const currentData = data[activeSection] || []
    const currentColumns = columnConfigs[activeSection] || []
    
    return (
      <div className="space-y-6">
        <DataTable
          data={currentData}
          columns={currentColumns}
          onEdit={handleEdit}
          onDelete={null} // No delete for Deepak
          canDelete={false}
          title={`${activeSection.replace('_', ' ').toUpperCase()} Management`}
          onAdd={() => handleCreateNew(activeSection)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg flex">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        userName="Deepak Dashboard"
      />
      
      <div className="flex-1 p-8 overflow-auto">
        {successMessage && (
          <motion.div
            className="success-message mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {successMessage}
          </motion.div>
        )}
        
        {renderContent()}
      </div>
    </div>
  )
}

export default DeepakDashboard