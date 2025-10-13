import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Sidebar from './Sidebar'
import Header from './Header'
import Notes from '../Notes/Notes'
import Profile from '../Profile/Profile'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className={styles.dashboard}>
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`${styles.mainContent} ${!sidebarOpen ? styles.expanded : ''}`}>
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/notes" replace />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard