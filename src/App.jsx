import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import AdminDashboard from './components/AdminDashboard'
import DeepakDashboard from './components/DeepakDashboard'
import ShivajiDashboard from './components/ShivajiDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/deepak-dashboard" 
          element={
            <ProtectedRoute role="deepak">
              <DeepakDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/shivaji-dashboard" 
          element={
            <ProtectedRoute role="shivaji">
              <ShivajiDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App