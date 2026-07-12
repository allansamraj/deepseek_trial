import { useState, useRef } from 'react'
import { Paperclip, Mic, ArrowUp, Square } from 'lucide-react'

export default function ChatInput({ onSend, isStreaming, onStop }) {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef(null)

  const hasText = inputValue.trim().length > 0

  const handleSend = () => {
    if (!hasText || isStreaming) return
    onSend(inputValue.trim())
    setInputValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px'
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e) => {
    setInputValue(e.target.value)
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '40px'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }

  return (
    <div className="max-w-3xl mx-auto w-full px-4 pb-4">
      <div
        className="flex items-end p-3 rounded-2xl transition-all duration-200"
        style={{
          background: 'rgba(17, 17, 24, 0.8)',
          border: `1px solid ${isFocused ? 'rgba(99, 102, 241, 0.5)' : 'rgba(63, 63, 70, 0.5)'}`,
          boxShadow: isFocused ? '0 0 20px rgba(99, 102, 241, 0.1)' : 'none'
        }}
      >
        {/* Attach Button */}
        <button
          className="p-2 rounded-lg transition-colors duration-150 text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#27272A] flex-shrink-0"
          title="Attach file"
        >
          <Paperclip size={18} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask DeepSeek anything..."
          rows={1}
          className="flex-1 bg-transparent text-white text-sm outline-none resize-none mx-2 py-2 leading-relaxed overflow-y-auto"
          style={{
            minHeight: '40px',
            maxHeight: '200px',
            caretColor: '#6366F1'
          }}
        />

        {/* Mic Button */}
        <button
          className="p-2 rounded-lg transition-colors duration-150 text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#27272A] flex-shrink-0"
          title="Voice input"
        >
          <Mic size={18} />
        </button>

        {/* Send / Stop Button */}
        {isStreaming ? (
          <button
            onClick={onStop}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center transition-colors duration-150 hover:bg-rose-600 ml-1"
            title="Stop generating"
          >
            <Square size={10} className="text-white" fill="white" />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!hasText}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 ml-1"
            style={{
              background: hasText
                ? 'linear-gradient(135deg, #6366F1, #3B82F6)'
                : 'rgba(63, 63, 70, 0.5)',
              opacity: hasText ? 1 : 0.5,
              cursor: hasText ? 'pointer' : 'not-allowed'
            }}
            title="Send message"
          >
            <ArrowUp size={16} className="text-white" />
          </button>
        )}
      </div>
    </div>
  )
}
