import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Edit, Trash2, Plus } from 'lucide-react'

const DataTable = ({ 
  data, 
  columns, 
  onEdit, 
  onDelete, 
  onAdd,
  searchable = true,
  canDelete = true,
  canEdit = true,
  title 
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data)
    } else {
      const filtered = data.filter(item =>
        Object.values(item).some(value =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      setFilteredData(filtered)
    }
  }, [data, searchTerm])

  const formatValue = (value, column) => {
    if (typeof value === 'boolean') {
      return value ? '✓' : '✗'
    }
    if (column.type === 'date' && value) {
      return new Date(value).toLocaleDateString()
    }
    return value || '-'
  }

  return (
    <motion.div
      className="content-panel-gradient rounded-2xl p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        {onAdd && (
          <motion.button
            onClick={onAdd}
            className="btn btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </motion.button>
        )}
      </div>

      {searchable && (
        <div className="search-box mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              {(canEdit || canDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (canEdit || canDelete ? 1 : 0)} 
                  className="text-center py-8 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <motion.tr
                  key={item.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {columns.map((column) => (
                    <td key={column.key}>
                      {formatValue(item[column.key], column)}
                    </td>
                  ))}
                  {(canEdit || canDelete) && (
                    <td>
                      <div className="flex space-x-2">
                        {canEdit && onEdit && (
                          <motion.button
                            onClick={() => onEdit(item)}
                            className="btn btn-warning p-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                        )}
                        {canDelete && onDelete && (
                          <motion.button
                            onClick={() => onDelete(item.id)}
                            className="btn btn-danger p-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredData.length} of {data.length} records
        </div>
      )}
    </motion.div>
  )
}

export default DataTable