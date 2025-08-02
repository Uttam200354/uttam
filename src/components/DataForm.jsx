import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, X } from 'lucide-react'

const DataForm = ({ 
  fields, 
  onSubmit, 
  onCancel, 
  initialData = {}, 
  title,
  showSoftwareCheckboxes = false 
}) => {
  const [formData, setFormData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
    } finally {
      setLoading(false)
    }
  }

  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className="form-select"
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm">{field.label}</span>
          </div>
        )
      
      default:
        return (
          <input
            type={field.type || 'text'}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder || field.label}
            className="form-input"
            required={field.required}
          />
        )
    }
  }

  return (
    <motion.div
      className="content-panel-gradient rounded-2xl p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name} className="form-group">
              <label className="form-label">{field.label}</label>
              {renderField(field)}
            </div>
          ))}
        </div>

        {showSoftwareCheckboxes && (
          <div className="form-group">
            <label className="form-label">Software Licenses</label>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="ms_office"
                  checked={formData.ms_office || false}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm">MS Office</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="autocad"
                  checked={formData.autocad || false}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm">AutoCAD</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="cero"
                  checked={formData.cero || false}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm">Cero</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-4 pt-4">
          <motion.button
            type="submit"
            disabled={loading}
            className="btn btn-success flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="loading"></div>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            type="button"
            onClick={onCancel}
            className="btn btn-danger flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export default DataForm