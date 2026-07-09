import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [aiStatus, setAiStatus] = useState({ connected: false, model: '', status: 'checking' })
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New document uploaded', description: 'Q3 Revenue Report has been processed', time: '2 hours ago', read: false },
    { id: 2, title: 'Knowledge gap detected', description: 'Work From Home Policy has 72 unanswered queries', time: '5 hours ago', read: false },
    { id: 3, title: 'AI model updated', description: 'DeepSeek model has been refreshed', time: '1 day ago', read: true },
  ])

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch('/api/status')
        if (res.ok) {
          const data = await res.json()
          setAiStatus({
            connected: data.ai_connected,
            model: data.model,
            status: data.status,
          })
        }
      } catch {
        setAiStatus({ connected: false, model: 'demo', status: 'demo_mode' })
      }
    }
    checkStatus()
  }, [])

  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  return (
    <AppContext.Provider value={{
      sidebarOpen,
      toggleSidebar,
      aiStatus,
      notifications,
      markNotificationRead,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}

export default AppContext
