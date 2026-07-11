import { useState } from 'react'
import { motion } from 'motion/react'
import { User, Brain, Copy, RefreshCw, Volume2, FileText, Check } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default function ChatMessage({ message }) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
          style={{
            background: 'linear-gradient(135deg, #FEF4D5, #E6D17B)'
          }}
        >
          <Brain size={16} className="text-midnight" />
        </div>
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
        {/* Message Bubble */}
        {isUser ? (
          <div
            className="px-4 py-3 text-midnight text-sm leading-relaxed"
            style={{
              background: 'linear-gradient(135deg, #E6D17B, #F1E49A)',
              borderRadius: '1rem 1rem 0.25rem 1rem',
              maxWidth: '70%'
            }}
          >
            {message.content}
          </div>
        ) : (
          <div
            className="px-4 py-3 text-sm leading-relaxed"
            style={{
              backgroundColor: '#3a2318',
              border: '1px solid rgba(230, 209, 123, 0.25)',
              borderRadius: '1rem 1rem 1rem 0.25rem'
            }}
          >
            <div className="markdown-content text-[#FEF4D5]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {message.content}
              </ReactMarkdown>
            </div>

            {/* Source References */}
            {message.sources && message.sources.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(230, 209, 123, 0.15)' }}>
                {message.sources.map((source, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                    style={{
                      background: 'rgba(44, 24, 16, 0.6)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(230, 209, 123, 0.2)'
                    }}
                  >
                    <FileText size={12} className="text-[#E6D17B] flex-shrink-0" />
                    <span className="text-[#dcd2b8]">{source.document}</span>
                    <span className="text-[#b0a68d]">p.{source.page}</span>
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[10px] font-medium"
                      style={{
                        background: source.confidence >= 0.9
                          ? 'rgba(143, 166, 130, 0.15)'
                          : 'rgba(230, 185, 123, 0.15)',
                        color: source.confidence >= 0.9 ? '#8fa682' : '#e6b97b'
                      }}
                    >
                      {Math.round(source.confidence * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons (AI messages only) */}
            <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg transition-colors duration-150 text-[#b0a68d] hover:text-[#FEF4D5] hover:bg-[#4a3023]"
                title={copied ? 'Copied!' : 'Copy'}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <button
                className="p-1.5 rounded-lg transition-colors duration-150 text-[#71717A] hover:text-white hover:bg-[#27272A]"
                title="Regenerate"
              >
                <RefreshCw size={14} />
              </button>
              <button
                className="p-1.5 rounded-lg transition-colors duration-150 text-[#71717A] hover:text-white hover:bg-[#27272A]"
                title="Read Aloud"
              >
                <Volume2 size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-[#52525B] mt-1 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center mt-1">
          <User size={16} className="text-white" />
        </div>
      )}
    </motion.div>
  )
}
