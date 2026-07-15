import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Search, FileText, Bot, Mic, Brain, BarChart3, ClipboardList, Settings, Command } from 'lucide-react'

const commandItems = [
  { path: '/dashboard', label: 'Go to Dashboard', icon: BarChart3, category: 'Navigation' },
  { path: '/documents', label: 'Manage Documents', icon: FileText, category: 'Navigation' },
  { path: '/chat', label: 'AI chat assistant', icon: Bot, category: 'Intelligence' },
  { path: '/voice', label: 'Voice Interaction', icon: Mic, category: 'Intelligence' },
  { path: '/knowledge-map', label: 'View Knowledge Graph Topology', icon: Brain, category: 'Intelligence' },
  { path: '/analytics', label: 'Search Analytics & Audits', icon: BarChart3, category: 'Audits' },
  { path: '/reports', label: 'Generate PDF Reports', icon: ClipboardList, category: 'Audits' },
  { path: '/settings', label: 'System Settings', icon: Settings, category: 'System' }
]

export default function CommandPalette({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setSearch('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  const filtered = commandItems.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex(prev => (prev + 1) % Math.max(1, filtered.length))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[activeIndex]) {
          navigate(filtered[activeIndex].path)
          onClose()
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, activeIndex, filtered, navigate, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-2xl overflow-hidden glass-heavy shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
            style={{ border: '1px solid rgba(30, 62, 98, 0.5)' }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'rgba(30, 62, 98, 0.3)' }}>
              <Search size={18} className="text-[#71717A]" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                  setActiveIndex(0)
                }}
                className="w-full bg-transparent text-sm text-[#F4F4F5] outline-none"
              />
              <Command size={14} className="text-[#71717A]" />
            </div>

            {/* List */}
            <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
              {filtered.length > 0 ? (
                filtered.map((item, idx) => {
                  const Icon = item.icon
                  const active = idx === activeIndex
                  return (
                    <div
                      key={item.path}
                      onClick={() => {
                        navigate(item.path)
                        onClose()
                      }}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                        active ? 'bg-[rgba(255,101,0,0.15)] text-white' : 'text-[#A1A1AA]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className={active ? 'text-[#FF6500]' : 'text-[#71717A]'} />
                        <span className="text-xs font-medium">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A] bg-surface-3 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </div>
                  )
                })
              ) : (
                <div className="py-8 text-center text-xs text-[#71717A]">
                  No commands found matching "{search}"
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
