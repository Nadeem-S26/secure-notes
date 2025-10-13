import { FiMenu, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import styles from './Header.module.css'

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button onClick={toggleSidebar} className={styles.menuBtn}>
          <FiMenu />
        </button>
        <h2 className={styles.greeting}>
          Welcome back, <span>{user?.username}!</span>
        </h2>
      </div>

      <div className={styles.headerRight}>
        <button onClick={toggleTheme} className={styles.themeToggle} title="Toggle theme">
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>
      </div>
    </header>
  )
}

export default Header