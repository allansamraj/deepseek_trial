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
            background: 'linear-gradient(135deg, #FF6500, #FF6500)'
          }}
        >
          <Brain size={16} className="text-white" />
        </div>
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
        {/* Message Bubble */}
        {isUser ? (
          <div
            className="px-4 py-3 text-white text-sm leading-relaxed"
            style={{
              background: 'linear-gradient(135deg, #FF6500, #1E3E62)',
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
              backgroundColor: 'rgba(11, 25, 44, 0.8)',
              border: '1px solid rgba(30, 62, 98, 0.5)',
              borderRadius: '1rem 1rem 1rem 0.25rem'
            }}
          >
            <div className="markdown-content text-[#F4F4F5]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {message.content}
              </ReactMarkdown>
            </div>

            {/* Source References */}
            {message.sources && message.sources.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(30, 62, 98, 0.3)' }}>
                {message.sources.map((source, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                    style={{
                      background: 'rgba(11, 25, 44, 0.6)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(30, 62, 98, 0.4)'
                    }}
                  >
                    <FileText size={12} className="text-[#FF6500] flex-shrink-0" />
                    <span className="text-[#A1A1AA]">{source.document}</span>
                    <span className="text-[#71717A]">p.{source.page}</span>
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[10px] font-medium"
                      style={{
                        background: source.confidence >= 0.9
                          ? 'rgba(255, 101, 0, 0.15)'
                          : 'rgba(245, 158, 11, 0.15)',
                        color: source.confidence >= 0.9 ? '#FF6500' : '#FF6500'
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
                className="p-1.5 rounded-lg transition-colors duration-150 text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#27272A]"
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
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6500] flex items-center justify-center mt-1">
          <User size={16} className="text-white" />
        </div>
      )}
    </motion.div>
  )
}
