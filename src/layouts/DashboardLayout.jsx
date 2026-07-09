import { Outlet } from 'react-router-dom'
import { motion } from 'motion/react'
import Sidebar from '../components/Sidebar'
import TopNavbar from '../components/TopNavbar'
import { useApp } from '../context/AppContext'

export default function DashboardLayout() {
  const { sidebarOpen } = useApp()

  return (
    <div className="flex h-screen bg-midnight overflow-hidden">
      {/* Neural network ambient background */}
      <div className="neural-bg" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div
        className="flex flex-col flex-1 min-w-0 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '260px' : '72px' }}
      >
        {/* Top Navbar */}
        <TopNavbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 relative z-10"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
