import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { AppProvider } from './context/AppContext'
import DashboardLayout from './layouts/DashboardLayout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import AIChat from './pages/AIChat'
import VoiceAssistant from './pages/VoiceAssistant'
import Documents from './pages/Documents'
import Settings from './pages/Settings'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<AIChat />} />
              <Route path="/voice" element={<VoiceAssistant />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/knowledge-map" element={<Dashboard />} />
              <Route path="/analytics" element={<Dashboard />} />
              <Route path="/reports" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </AppProvider>
  )
}
