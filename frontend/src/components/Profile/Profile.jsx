import { useState } from 'react'
import { FiUser, FiMail, FiCalendar, FiEdit2, FiSave } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { toast } from 'react-toastify'
import styles from './Profile.module.css'

const Profile = () => {
  const { user, updateUser, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    updateUser(formData)
    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      email: user?.email || ''
    })
    setIsEditing(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>Profile Settings</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className={styles.profileContent}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className={styles.avatarInfo}>
              <h2>{user?.username}</h2>
              <p>{user?.email}</p>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <FiUser /> Username
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={styles.editInput}
                />
              ) : (
                <div className={styles.infoValue}>{user?.username}</div>
              )}
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <FiMail /> Email
              </div>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.editInput}
                />
              ) : (
                <div className={styles.infoValue}>{user?.email}</div>
              )}
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <FiCalendar /> Member Since
              </div>
              <div className={styles.infoValue}>
                {formatDate(user?.createdAt)}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            {isEditing ? (
              <>
                <button onClick={handleCancel} className={styles.cancelBtn}>
                  Cancel
                </button>
                <button onClick={handleSave} className={styles.saveBtn}>
                  <FiSave /> Save Changes
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
                <FiEdit2 /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Preferences Card */}
        <div className={styles.preferencesCard}>
          <h3>Preferences</h3>
          
          <div className={styles.preferenceItem}>
            <div>
              <h4>Theme</h4>
              <p>Choose your preferred color theme</p>
            </div>
            <button onClick={toggleTheme} className={styles.themeBtn}>
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>

          <div className={styles.preferenceItem}>
            <div>
              <h4>Account Status</h4>
              <p>Your account is active and secure</p>
            </div>
            <div className={styles.statusBadge}>Active</div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={styles.dangerZone}>
          <h3>Danger Zone</h3>
          <p>Once you logout, you'll need to sign in again</p>
          <button onClick={logout} className={styles.logoutBtn}>
            Logout from Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile