import { NavLink } from 'react-router-dom'
import { FiHome, FiUser, FiLogOut, FiFileText } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import styles from './Sidebar.module.css'

const Sidebar = ({ isOpen }) => {
  const { logout, user } = useAuth()

  const navItems = [
    { path: '/dashboard/notes', icon: <FiFileText />, label: 'Notes' },
    { path: '/dashboard/profile', icon: <FiUser />, label: 'Profile' },
  ]

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🔒</span>
          {isOpen && <span className={styles.logoText}>Secure Notes</span>}
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
            title={!isOpen ? item.label : ''}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {isOpen && <span className={styles.navLabel}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <button onClick={logout} className={styles.logoutBtn} title={!isOpen ? 'Logout' : ''}>
          <span className={styles.navIcon}><FiLogOut /></span>
          {isOpen && <span>Logout</span>}
        </button>
        
        {isOpen && (
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className={styles.userDetails}>
              <p className={styles.userName}>{user?.username}</p>
              <p className={styles.userEmail}>{user?.email}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar