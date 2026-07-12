import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090B] space-y-6">
      <div className="relative">
        {/* Pulsing glow behind */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[#6366F1]/20 blur-3xl rounded-full"
        />

        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-2xl border border-[#6366F1]/30 flex items-center justify-center"
        />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles size={32} className="text-[#6366F1]" />
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-1.5">
        <h3 className="text-sm font-bold text-[#F4F4F5]" style={{ fontFamily: 'var(--font-heading)' }}>DeepSeek</h3>
        <p className="text-xs text-[#71717A] animate-pulse">Initializing neural knowledge fabric...</p>
      </div>
    </div>
  )
}
