import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mic, Volume2, Trash2, MicOff, AlertCircle } from 'lucide-react'
import useVoice from '../hooks/useVoice'

const waveformDelays = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05]

export default function VoiceAssistant() {
  const {
    isListening,
    isSpeaking,
    conversations,
    error,
    startListening,
    stopListening,
    stopSpeaking,
    clearConversations,
  } = useVoice()

  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [conversations])

  const state = isSpeaking ? 'speaking' : isListening ? 'listening' : 'idle'

  const handleMicClick = () => {
    if (isSpeaking) {
      stopSpeaking()
    } else if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const stateConfig = {
    idle: {
      label: 'Tap to speak',
      sublabel: 'Ask anything from your knowledge base',
      icon: Mic,
      glowColor: 'transparent',
      borderGradient: 'linear-gradient(135deg, #6366F1, #06B6D4)',
      iconColor: '#A1A1AA',
    },
    listening: {
      label: 'Listening...',
      sublabel: 'Speak clearly into your microphone',
      icon: Mic,
      glowColor: 'rgba(6, 182, 212, 0.4)',
      borderGradient: 'linear-gradient(135deg, #06B6D4, #22D3EE)',
      iconColor: '#06B6D4',
    },
    speaking: {
      label: 'Speaking...',
      sublabel: 'Playing AI response',
      icon: Volume2,
      glowColor: 'rgba(16, 185, 129, 0.4)',
      borderGradient: 'linear-gradient(135deg, #10B981, #34D399)',
      iconColor: '#10B981',
    },
  }

  const cfg = stateConfig[state]
  const StateIcon = cfg.icon

  return (
    <div className="flex flex-col h-full">
      {/* Voice Interface — centered */}
      <div className="flex-1 flex flex-col items-center justify-center relative py-12">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 500px 400px at 50% 40%, ${
              state === 'listening'
                ? 'rgba(6, 182, 212, 0.06)'
                : state === 'speaking'
                ? 'rgba(16, 185, 129, 0.06)'
                : 'rgba(99, 102, 241, 0.04)'
            }, transparent 70%)`,
          }}
        />

        {/* Mic button container */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Waveform bars (listening / speaking) */}
          <AnimatePresence>
            {(state === 'listening' || state === 'speaking') && (
              <>
                {waveformDelays.map((d, i) => {
                  const angle = i * 45
                  const distance = 110
                  const x = Math.cos((angle * Math.PI) / 180) * distance
                  const y = Math.sin((angle * Math.PI) / 180) * distance
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: d * 0.15, duration: 0.3 }}
                      className="absolute rounded-full"
                      style={{
                        width: 4,
                        height: 4,
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        background:
                          state === 'listening'
                            ? 'linear-gradient(to top, #06B6D4, #6366F1)'
                            : 'linear-gradient(to top, #10B981, #06B6D4)',
                      }}
                    >
                      <motion.div
                        className="w-full rounded-full"
                        animate={{
                          height: [8, 32, 8],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: d,
                          ease: 'easeInOut',
                        }}
                        style={{
                          width: 4,
                          background: 'inherit',
                          borderRadius: '9999px',
                          transformOrigin: 'center',
                        }}
                      />
                    </motion.div>
                  )
                })}
              </>
            )}
          </AnimatePresence>

          {/* Gradient ring behind the button */}
          <motion.div
            className="absolute rounded-full"
            animate={{
              scale: state === 'listening' ? [1, 1.15, 1] : state === 'speaking' ? [1, 1.1, 1] : [1, 1.05, 1],
              opacity: state === 'idle' ? [0.3, 0.6, 0.3] : [0.5, 1, 0.5],
            }}
            transition={{ duration: state === 'idle' ? 3 : 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 176,
              height: 176,
              background: cfg.borderGradient,
              filter: 'blur(1px)',
            }}
          />

          {/* Main mic button */}
          <motion.button
            onClick={handleMicClick}
            whileTap={{ scale: 0.92 }}
            animate={{
              scale: state === 'listening' ? 1.05 : 1,
              boxShadow: state !== 'idle' ? `0 0 40px ${cfg.glowColor}` : '0 0 0px transparent',
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 rounded-full flex items-center justify-center cursor-pointer border-0"
            style={{
              width: 160,
              height: 160,
              background: 'rgba(24, 24, 27, 0.8)',
            }}
          >
            <motion.div
              key={state}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <StateIcon size={48} style={{ color: cfg.iconColor }} />
            </motion.div>
          </motion.button>
        </div>

        {/* State label */}
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <p className="text-lg font-semibold text-[#FAFAFA]" style={{ fontFamily: 'var(--font-heading)' }}>
            {cfg.label}
          </p>
          <p className="text-sm text-[#71717A] mt-1">{cfg.sublabel}</p>
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.25)',
              }}
            >
              <AlertCircle size={16} className="text-[#F43F5E]" />
              <span className="text-sm text-[#F43F5E]">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Conversation transcript */}
      {conversations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-shrink-0 border-t border-[rgba(63,63,70,0.3)]"
          style={{ maxHeight: '40vh' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3">
            <p className="text-sm font-medium text-[#A1A1AA]">
              Conversation ({conversations.length} messages)
            </p>
            <button
              onClick={clearConversations}
              className="btn-ghost flex items-center gap-1.5 text-xs"
            >
              <Trash2 size={14} />
              Clear
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="overflow-y-auto px-6 pb-6 space-y-3"
            style={{ maxHeight: 'calc(40vh - 48px)' }}
          >
            {conversations.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.05, duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={
                    msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                  }
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className="text-[10px] mt-1.5 opacity-50">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
