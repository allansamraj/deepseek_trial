import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  LayoutDashboard,
  FileText,
  Bot,
  Mic,
  Brain,
  BarChart3,
  ClipboardList,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/documents', icon: FileText, label: 'Documents' },
  { path: '/chat', icon: Bot, label: 'AI Assistant' },
  { path: '/voice', icon: Mic, label: 'Voice Assistant' },
  { path: '/knowledge-map', icon: Brain, label: 'Knowledge Map' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/reports', icon: ClipboardList, label: 'Reports' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useApp()
  const location = useLocation()

  return (
    <motion.aside
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col glass-heavy"
      animate={{ width: sidebarOpen ? 260 : 72 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderRight: '1px solid rgba(30, 62, 98, 0.45)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 shrink-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 animate-pulse-glow"
          style={{
            background: 'linear-gradient(135deg, #FF6500 0%, #1E3E62 100%)',
          }}
        >
          <Sparkles size={20} className="text-white" />
        </div>
        {sidebarOpen && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="text-lg font-bold tracking-tight text-white"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            DeepSeek
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} className="shrink-0" style={{ color: isActive ? '#FF6500' : 'inherit' }} />
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="truncate"
                >
                  {item.label}
                </motion.span>
              )}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'rgba(255, 101, 0, 0.08)',
                    borderLeft: '3.5px solid #FF6500'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(30, 62, 98, 0.45)' }}>
        <button
          onClick={toggleSidebar}
          className="sidebar-link w-full justify-center"
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          {sidebarOpen && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  )
}
