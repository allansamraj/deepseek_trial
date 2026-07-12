import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Bell, Wifi, WifiOff, User, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import CommandPalette from './CommandPalette'

export default function TopNavbar() {
  const { aiStatus, notifications, markNotificationRead } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false)
      }
    }
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandPalette(prev => !prev)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [notifications])

  return (
    <header
      className="h-16 shrink-0 flex items-center justify-between px-6 z-30 relative"
      style={{
        background: 'rgba(17, 17, 24, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(63, 63, 70, 0.5)',
      }}
    >
      {/* Search */}
      <div className="relative w-80">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-subtle"
        />
        <input
          type="text"
          placeholder="Search knowledge base... (⌘K)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={(e) => {
            e.target.blur()
            setShowCommandPalette(true)
          }}
          className="input pl-10 py-2 text-sm cursor-pointer"
          style={{
            background: 'rgba(17, 17, 24, 0.6)',
            borderColor: 'rgba(63, 63, 70, 0.5)',
          }}
        />
        <kbd
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-1.5 py-0.5 rounded pointer-events-none"
          style={{ background: 'rgba(63, 63, 70, 0.5)', color: 'var(--color-text-secondary, #A1A1AA)' }}
        >
          ⌘K
        </kbd>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* AI Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{
            background: aiStatus.connected
              ? 'rgba(16, 185, 129, 0.12)'
              : 'rgba(245, 158, 11, 0.12)',
            border: `1px solid ${aiStatus.connected
              ? 'rgba(16, 185, 129, 0.25)'
              : 'rgba(245, 158, 11, 0.25)'}`,
            color: aiStatus.connected ? '#34D399' : '#F59E0B',
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse-glow"
            style={{
              background: aiStatus.connected ? '#10B981' : '#F59E0B',
            }}
          />
          {aiStatus.connected ? (
            <>
              <Wifi size={12} />
              <span>AI Connected</span>
            </>
          ) : (
            <>
              <WifiOff size={12} />
              <span>Demo Mode</span>
            </>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-surface-3 transition-colors"
          >
            <Bell size={20} className="text-slate-subtle" />
            {unreadCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ background: '#F43F5E' }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-80 rounded-xl overflow-hidden z-50"
                style={{
                  background: 'rgba(17, 17, 24, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(63, 63, 70, 0.5)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                }}
              >
                <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(63, 63, 70, 0.5)' }}>
                  <h3 className="text-sm font-semibold">Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-subtle hover:text-white">
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className="px-4 py-3 cursor-pointer hover:bg-surface-3 transition-colors border-b"
                      style={{
                        borderColor: 'rgba(63, 63, 70, 0.3)',
                        background: !n.read ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                      }}
                    >
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-slate-subtle mt-0.5">{n.description}</p>
                      <p className="text-[10px] text-slate-muted mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #6366F1, #3B82F6)',
            }}
          >
            <User size={16} className="text-white" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-56 rounded-xl overflow-hidden z-50"
                style={{
                  background: 'rgba(17, 17, 24, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(63, 63, 70, 0.5)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                }}
              >
                <div className="p-4 border-b" style={{ borderColor: 'rgba(63, 63, 70, 0.5)' }}>
                  <p className="text-sm font-semibold">Admin User</p>
                  <p className="text-xs text-slate-subtle">admin@deepseek.ai</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-surface-3 text-text-secondary hover:text-white transition-colors">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-surface-3 text-text-secondary hover:text-white transition-colors">
                    Help & Support
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-surface-3 text-rose transition-colors">
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <CommandPalette isOpen={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
    </header>
  )
}
