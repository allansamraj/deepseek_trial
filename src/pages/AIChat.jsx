import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Brain, Sparkles, FileText, GitCompare, ShieldCheck } from 'lucide-react'
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import useChat from '../hooks/useChat'

const suggestions = [
  {
    text: 'What is our company\'s leave policy?',
    icon: FileText
  },
  {
    text: 'Summarize the Q3 financial report',
    icon: Sparkles
  },
  {
    text: 'Compare old and new HR policies',
    icon: GitCompare
  },
  {
    text: 'Generate a training quiz on security',
    icon: ShieldCheck
  }
]

export default function AIChat() {
  const { messages, isStreaming, sendMessage, stopStreaming, clearMessages } = useChat()
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  const isEmpty = messages.length === 0

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSuggestionClick = (text) => {
    sendMessage(text)
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto"
      >
        {isEmpty ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* Brain Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.15))',
                  border: '1px solid rgba(99, 102, 241, 0.2)'
                }}
              >
                <Brain
                  size={32}
                  style={{
                    stroke: 'url(#brainGradient)'
                  }}
                />
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                  <defs>
                    <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <h1
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                How can I help you today?
              </h1>
              <p className="text-[var(--color-text-secondary)] text-sm mb-8">
                Ask me anything about your organization's knowledge base
              </p>
            </motion.div>

            {/* Suggestion Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl w-full"
            >
              {suggestions.map((suggestion, idx) => {
                const Icon = suggestion.icon
                return (
                  <motion.button
                    key={suggestion.text}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="flex items-start gap-3 p-4 rounded-xl text-left text-sm text-[var(--color-text-secondary)] transition-colors duration-200 cursor-pointer"
                    style={{
                      background: 'rgba(17, 17, 24, 0.6)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(63, 63, 70, 0.5)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                      e.currentTarget.style.color = '#F4F4F5'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(63, 63, 70, 0.5)'
                      e.currentTarget.style.color = 'var(--color-text-secondary)'
                    }}
                  >
                    <Icon size={16} className="text-[#6366F1] flex-shrink-0 mt-0.5" />
                    <span>{suggestion.text}</span>
                  </motion.button>
                )
              })}
            </motion.div>
          </div>
        ) : (
          /* Messages List */
          <div className="flex flex-col gap-6 py-6 px-4 max-w-3xl mx-auto">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isStreaming && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && messages[messages.length - 1].content === '' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 px-4"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #6366F1, #06B6D4)'
                  }}
                >
                  <Brain size={16} className="text-white" />
                </div>
                <div className="flex gap-1 px-4 py-3 rounded-2xl" style={{ backgroundColor: 'rgba(17, 17, 24, 0.8)', border: '1px solid rgba(63, 63, 70, 0.5)' }}>
                  <span
                    className="w-2 h-2 rounded-full bg-[#6366F1]"
                    style={{
                      animation: 'typingDot 1.4s infinite ease-in-out',
                      animationDelay: '0s'
                    }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#71717A]"
                    style={{
                      animation: 'typingDot 1.4s infinite ease-in-out',
                      animationDelay: '0.2s'
                    }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#71717A]"
                    style={{
                      animation: 'typingDot 1.4s infinite ease-in-out',
                      animationDelay: '0.4s'
                    }}
                  />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0">
        <ChatInput
          onSend={sendMessage}
          isStreaming={isStreaming}
          onStop={stopStreaming}
        />
        <p className="text-xs text-center text-[#52525B] pb-3">
          DeepSeek may produce inaccurate information. Verify important details.
        </p>
      </div>
    </div>
  )
}
