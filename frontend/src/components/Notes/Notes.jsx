import { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiGrid, FiList, FiDownload } from 'react-icons/fi'
import axios from 'axios'
import { toast } from 'react-toastify'
import NoteCard from './NoteCard'
import NoteModal from './NoteModal'
import styles from './Notes.module.css'

const API_URL = 'https://secure-notes-backend-pblm.onrender.com/api'

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [allTags, setAllTags] = useState([])
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [sortBy, setSortBy] = useState('updated-desc')
  const [modalOpen, setModalOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState(null)
  const [stats, setStats] = useState({ total: 0, today: 0, tags: 0 })

  useEffect(() => {
    fetchNotes()
    fetchTags()
  }, [])

  useEffect(() => {
    filterAndSortNotes()
  }, [notes, searchTerm, selectedTags, sortBy])

  const fetchNotes = async () => {
    setLoading(true)
    try {
      const tagQuery = selectedTags.length > 0 ? `?tags=${selectedTags.join(',')}` : ''
      const response = await axios.get(`${API_URL}/notes${tagQuery}`)
      setNotes(response.data)
      calculateStats(response.data)
    } catch (error) {
      toast.error('Failed to fetch notes')
    } finally {
      setLoading(false)
    }
  }

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${API_URL}/tags`)
      setAllTags(response.data)
    } catch (error) {
      console.error('Failed to fetch tags')
    }
  }

  const calculateStats = (notesList) => {
    const today = new Date().toDateString()
    const todayNotes = notesList.filter(note => 
      new Date(note.createdAt).toDateString() === today
    ).length
    
    const uniqueTags = new Set()
    notesList.forEach(note => note.tags.forEach(tag => uniqueTags.add(tag)))
    
    setStats({
      total: notesList.length,
      today: todayNotes,
      tags: uniqueTags.size
    })
  }

  const filterAndSortNotes = () => {
    let filtered = [...notes]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'updated-desc':
          return new Date(b.updatedAt) - new Date(a.updatedAt)
        case 'updated-asc':
          return new Date(a.updatedAt) - new Date(b.updatedAt)
        case 'created-desc':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'created-asc':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    setFilteredNotes(filtered)
  }

  const handleCreateNote = () => {
    setCurrentNote(null)
    setModalOpen(true)
  }

  const handleEditNote = (note) => {
    setCurrentNote(note)
    setModalOpen(true)
  }

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await axios.delete(`${API_URL}/notes/${noteId}`)
      toast.success('Note deleted successfully')
      fetchNotes()
      fetchTags()
    } catch (error) {
      toast.error('Failed to delete note')
    }
  }

  const handleSaveNote = async (noteData) => {
    try {
      if (currentNote) {
        await axios.put(`${API_URL}/notes/${currentNote.id}`, noteData)
        toast.success('Note updated successfully')
      } else {
        await axios.post(`${API_URL}/notes`, noteData)
        toast.success('Note created successfully')
      }
      setModalOpen(false)
      fetchNotes()
      fetchTags()
    } catch (error) {
      toast.error('Failed to save note')
    }
  }

  const toggleTagFilter = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const exportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `notes-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    toast.success('Notes exported successfully')
  }

  return (
    <div className={styles.notesContainer}>
      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.total}</div>
          <div className={styles.statLabel}>Total Notes</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.tags}</div>
          <div className={styles.statLabel}>Tags</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.today}</div>
          <div className={styles.statLabel}>Created Today</div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="updated-desc">Recently Updated</option>
          <option value="updated-asc">Oldest Updated</option>
          <option value="created-desc">Recently Created</option>
          <option value="created-asc">Oldest Created</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
        </select>

        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${view === 'grid' ? styles.active : ''}`}
            onClick={() => setView('grid')}
            title="Grid View"
          >
            <FiGrid />
          </button>
          <button
            className={`${styles.viewBtn} ${view === 'list' ? styles.active : ''}`}
            onClick={() => setView('list')}
            title="List View"
          >
            <FiList />
          </button>
        </div>

        <button onClick={exportNotes} className={styles.exportBtn} title="Export Notes">
          <FiDownload /> Export
        </button>

        <button onClick={handleCreateNote} className={styles.createBtn}>
          <FiPlus /> New Note
        </button>
      </div>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className={styles.tagFilters}>
          <p className={styles.filterLabel}>Filter by tags:</p>
          <div className={styles.tags}>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagActive : ''}`}
                onClick={() => toggleTagFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Notes Grid/List */}
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading notes...</p>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📝</div>
          <h3>No notes found</h3>
          <p>Create your first note to get started!</p>
          <button onClick={handleCreateNote} className={styles.createBtn}>
            <FiPlus /> Create Note
          </button>
        </div>
      ) : (
        <div className={view === 'grid' ? styles.notesGrid : styles.notesList}>
          {filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              view={view}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      )}

      {/* Note Modal */}
      {modalOpen && (
        <NoteModal
          note={currentNote}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveNote}
        />
      )}
    </div>
  )
}

export default Notes