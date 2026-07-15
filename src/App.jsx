import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { AppProvider } from './context/AppContext'
import DashboardLayout from './layouts/DashboardLayout'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const AIChat = lazy(() => import('./pages/AIChat'))
const VoiceAssistant = lazy(() => import('./pages/VoiceAssistant'))
const Documents = lazy(() => import('./pages/Documents'))
const Settings = lazy(() => import('./pages/Settings'))
const KnowledgeMap = lazy(() => import('./pages/KnowledgeMap'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Reports = lazy(() => import('./pages/Reports'))

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <CustomCursor />
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat" element={<AIChat />} />
                <Route path="/voice" element={<VoiceAssistant />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/knowledge-map" element={<KnowledgeMap />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Routes>
          </Suspense>
        </AnimatePresence>
      </BrowserRouter>
    </AppProvider>
  )
}
