import { useState, useCallback, useRef } from 'react'

export default function useVoice() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [conversations, setConversations] = useState([])
  const [error, setError] = useState(null)
  const recognitionRef = useRef(null)

  const startListening = useCallback(() => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        setError('Speech recognition not supported')
        return
      }
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setConversations(prev => [...prev, { role: 'user', text: transcript, timestamp: new Date() }])
        
        // Get AI response (demo)
        const response = getVoiceResponse(transcript)
        setConversations(prev => [...prev, { role: 'assistant', text: response, timestamp: new Date() }])
        speak(response)
      }
      
      recognition.onend = () => setIsListening(false)
      recognition.onerror = (e) => {
        setError(e.error)
        setIsListening(false)
      }
      
      recognition.start()
      recognitionRef.current = recognition
      setIsListening(true)
      setError(null)
    } catch (e) {
      setError('Failed to start speech recognition')
    }
  }, [])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  const speak = useCallback((text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }, [])

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  const clearConversations = useCallback(() => setConversations([]), [])

  return { isListening, isSpeaking, conversations, error, startListening, stopListening, speak, stopSpeaking, clearConversations }
}

function getVoiceResponse(query) {
  const q = query.toLowerCase()
  if (q.includes('leave')) return 'According to our employee handbook, annual leave is 24 days per year. Sick leave is 12 days per year. Would you like more details?'
  if (q.includes('hello') || q.includes('hi')) return 'Hello! I\'m DeepSeek, your AI knowledge assistant. How can I help you today?'
  return 'I found relevant information in your knowledge base. Based on the available documents, here is what I can tell you about your query. Would you like me to provide more specific details?'
}
