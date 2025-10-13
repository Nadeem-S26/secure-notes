import { FiEdit2, FiTrash2, FiClock } from 'react-icons/fi'
import styles from './NoteCard.module.css'

const NoteCard = ({ note, view, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div 
      className={`${styles.noteCard} ${view === 'list' ? styles.listView : ''}`}
      onClick={() => onEdit(note)}
    >
      <div className={styles.noteHeader}>
        <h3 className={styles.noteTitle}>{note.title}</h3>
        <div className={styles.noteActions} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onEdit(note)}
            className={styles.actionBtn}
            title="Edit"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <p className={styles.noteContent}>
        {note.content.substring(0, 150)}
        {note.content.length > 150 ? '...' : ''}
      </p>

      {note.tags && note.tags.length > 0 && (
        <div className={styles.noteTags}>
          {note.tags.map(tag => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className={styles.noteMeta}>
        <span className={styles.metaItem}>
          <FiClock /> {formatDate(note.updatedAt)}
        </span>
      </div>
    </div>
  )
}

export default NoteCard