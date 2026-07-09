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
      style={{ borderRight: '1px solid rgba(63, 63, 70, 0.5)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 shrink-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
          }}
        >
          <Sparkles size={20} className="text-white" />
        </div>
        {sidebarOpen && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="text-lg font-bold tracking-tight"
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
              <item.icon size={20} className="shrink-0" />
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
                  style={{ background: 'rgba(99, 102, 241, 0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(63, 63, 70, 0.5)' }}>
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
