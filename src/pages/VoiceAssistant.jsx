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

        {/* Jarvis AI Energy Orb */}
        <div className="relative flex items-center justify-center mb-12">
          {/* SVG Noise & Turbulence Filters for Jarvis Liquid Morphing */}
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="jarvisLiquid">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale={state === 'listening' ? 25 : state === 'speaking' ? 35 : 8} xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* Morphing Outer Aura Layer */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 220,
              height: 220,
              background: state === 'listening'
                ? 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)'
                : state === 'speaking'
                ? 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
              filter: 'blur(30px) url(#jarvisLiquid)',
            }}
            animate={state !== 'idle' ? {
              scale: [1, 1.15, 0.95, 1.1, 1],
              rotate: [0, 90, 180, 270, 360]
            } : {
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: state === 'speaking' ? 3 : 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Holographic Glowing Rings */}
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border pointer-events-none"
              style={{
                width: 170 + i * 20,
                height: 170 + i * 20,
                borderColor: state === 'listening'
                  ? 'rgba(6, 182, 212, 0.25)'
                  : state === 'speaking'
                  ? 'rgba(16, 185, 129, 0.25)'
                  : 'rgba(99, 102, 241, 0.15)',
                boxShadow: state !== 'idle'
                  ? `inset 0 0 15px ${cfg.glowColor}`
                  : 'none',
              }}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
                scale: state !== 'idle' ? [1, 1.05, 0.98, 1.02, 1] : 1
              }}
              transition={{
                rotate: { duration: 10 * i, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
            />
          ))}

          {/* Interactive Core Mic Button */}
          <motion.button
            onClick={handleMicClick}
            whileTap={{ scale: 0.92 }}
            data-magnetic
            data-cursor-text={state === 'listening' ? 'Mute' : 'Speak'}
            animate={{
              scale: state === 'listening' ? 1.06 : 1,
              boxShadow: state !== 'idle' ? `0 0 50px ${cfg.glowColor}` : '0 0 20px rgba(99, 102, 241, 0.1)',
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 rounded-full flex items-center justify-center cursor-pointer border-0"
            style={{
              width: 150,
              height: 150,
              background: 'rgba(10, 10, 15, 0.85)',
              border: `1.5px solid ${state === 'listening' ? '#06B6D4' : state === 'speaking' ? '#10B981' : 'rgba(99, 102, 241, 0.3)'}`,
              backdropFilter: 'blur(20px)',
              filter: 'url(#jarvisLiquid)',
            }}
          >
            {/* Center Visual Core */}
            <motion.div
              key={state}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center space-y-1.5"
            >
              <StateIcon size={36} style={{ color: cfg.iconColor }} />
              {state === 'listening' && (
                <span className="text-[9px] font-bold tracking-widest text-[#06B6D4] uppercase animate-pulse">
                  Listening
                </span>
              )}
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
