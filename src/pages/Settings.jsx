import { useState, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import {
  Bot,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Volume2,
  Info,
  Zap,
} from 'lucide-react'

const STORAGE_KEY = 'deepseek-settings'

const defaultSettings = {
  apiKey: '',
  model: 'deepseek/deepseek-chat-v3-0324',
  temperature: 0.7,
  maxTokens: 2048,
  voice: '',
  speechRate: 1,
  autoListen: false,
}

const models = [
  { value: 'deepseek/deepseek-chat-v3-0324', label: 'DeepSeek Chat v3', badge: 'Default' },
  { value: 'openai/gpt-4o', label: 'GPT-4o', badge: 'Premium' },
  { value: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet', badge: 'Premium' },
  { value: 'google/gemini-2.0-flash-001', label: 'Gemini 2.0 Flash', badge: null },
]

const techBadges = [
  { name: 'React', color: '#61DAFB', bg: 'rgba(97, 218, 251, 0.12)' },
  { name: 'FastAPI', color: '#009688', bg: 'rgba(0, 150, 136, 0.12)' },
  { name: 'FAISS', color: '#6366F1', bg: 'rgba(99, 102, 241, 0.12)' },
  { name: 'OpenRouter', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' },
]

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings)
  const [showApiKey, setShowApiKey] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('disconnected') // connected | disconnected | testing
  const [voices, setVoices] = useState([])

  // Load settings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(stored) }))
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis?.getVoices() || []
      if (available.length > 0) {
        setVoices(available)
      }
    }
    loadVoices()
    window.speechSynthesis?.addEventListener('voiceschanged', loadVoices)
    return () => window.speechSynthesis?.removeEventListener('voiceschanged', loadVoices)
  }, [])

  // Save settings to localStorage on change
  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const testConnection = async () => {
    setConnectionStatus('testing')
    // Simulate API test
    await new Promise((r) => setTimeout(r, 2000))
    setConnectionStatus(settings.apiKey.length > 10 ? 'connected' : 'disconnected')
  }

  const statusConfig = {
    connected: { icon: CheckCircle2, color: '#10B981', label: 'Connected', bg: 'rgba(16, 185, 129, 0.12)' },
    disconnected: { icon: XCircle, color: '#F43F5E', label: 'Disconnected', bg: 'rgba(244, 63, 94, 0.12)' },
    testing: { icon: Loader2, color: '#F59E0B', label: 'Testing...', bg: 'rgba(245, 158, 11, 0.12)' },
  }

  const StatusIcon = statusConfig[connectionStatus].icon

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-[#FAFAFA]" style={{ fontFamily: 'var(--font-heading)' }}>
          Settings
        </h1>
        <p className="text-sm text-[#71717A] mt-1">Configure your AI assistant and preferences</p>
      </div>

      {/* ── AI Configuration ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-2xl p-6"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(99,102,241,0.12)]">
            <Bot size={20} className="text-indigo" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#FAFAFA]" style={{ fontFamily: 'var(--font-heading)' }}>
              AI Configuration
            </h2>
            <p className="text-xs text-[#71717A]">Model settings and API connection</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">API Key</label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={settings.apiKey}
                onChange={(e) => updateSetting('apiKey', e.target.value)}
                placeholder="sk-or-v1-xxxxxxxxxxxxxxxx"
                className="input pr-10"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#FAFAFA] transition-colors"
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-[#52525B] mt-1.5 flex items-center gap-1">
              <Info size={12} />
              Your API key is stored locally and never sent to our servers
            </p>
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">Model</label>
            <div className="space-y-2">
              {models.map((m) => (
                <label
                  key={m.value}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    settings.model === m.value
                      ? 'bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.3)]'
                      : 'border border-transparent hover:bg-[rgba(39,39,42,0.5)]'
                  }`}
                >
                  <input
                    type="radio"
                    name="model"
                    value={m.value}
                    checked={settings.model === m.value}
                    onChange={() => updateSetting('model', m.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      settings.model === m.value
                        ? 'border-indigo bg-indigo'
                        : 'border-[#52525B]'
                    }`}
                  >
                    {settings.model === m.value && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-[#FAFAFA]">{m.label}</span>
                  {m.badge && (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: m.badge === 'Default' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: m.badge === 'Default' ? '#818CF8' : '#FBBF24',
                      }}
                    >
                      {m.badge}
                    </span>
                  )}
                  <span className="text-[10px] text-[#52525B] ml-auto font-mono">{m.value.split('/')[0]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Temperature */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-[#A1A1AA]">Temperature</label>
              <span className="text-sm font-mono font-bold text-indigo">{settings.temperature}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => updateSetting('temperature', parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #6366F1 0%, #6366F1 ${settings.temperature * 100}%, #27272A ${settings.temperature * 100}%, #27272A 100%)`,
              }}
            />
            <div className="flex justify-between text-[10px] text-[#52525B] mt-1">
              <span>Precise</span>
              <span>Creative</span>
            </div>
          </div>

          {/* Max Tokens */}
          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">Max Tokens</label>
            <input
              type="number"
              value={settings.maxTokens}
              onChange={(e) => updateSetting('maxTokens', parseInt(e.target.value) || 0)}
              className="input w-40"
              min={1}
              max={128000}
            />
          </div>

          {/* Test Connection + Status */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={testConnection}
              disabled={connectionStatus === 'testing'}
              className="btn-primary flex items-center gap-2"
            >
              {connectionStatus === 'testing' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Zap size={16} />
              )}
              Test Connection
            </button>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: statusConfig[connectionStatus].bg,
                color: statusConfig[connectionStatus].color,
              }}
            >
              <StatusIcon size={14} className={connectionStatus === 'testing' ? 'animate-spin' : ''} />
              {statusConfig[connectionStatus].label}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Voice Settings ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass rounded-2xl p-6"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(6,182,212,0.12)]">
            <Volume2 size={20} className="text-cyan-accent" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#FAFAFA]" style={{ fontFamily: 'var(--font-heading)' }}>
              Voice Settings
            </h2>
            <p className="text-xs text-[#71717A]">Speech synthesis and recognition preferences</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Voice Selection */}
          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">Voice</label>
            <select
              value={settings.voice}
              onChange={(e) => updateSetting('voice', e.target.value)}
              className="input appearance-none cursor-pointer"
              style={{ background: 'rgba(24, 24, 27, 0.6)', backdropFilter: 'blur(20px)' }}
            >
              <option value="">System Default</option>
              {voices.length > 0
                ? voices.map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))
                : ['Google US English', 'Google UK English Female', 'Microsoft Zira', 'Alex'].map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
            </select>
          </div>

          {/* Speech Rate */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-[#A1A1AA]">Speech Rate</label>
              <span className="text-sm font-mono font-bold text-cyan-accent">{settings.speechRate}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.speechRate}
              onChange={(e) => updateSetting('speechRate', parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #06B6D4 0%, #06B6D4 ${((settings.speechRate - 0.5) / 1.5) * 100}%, #27272A ${((settings.speechRate - 0.5) / 1.5) * 100}%, #27272A 100%)`,
              }}
            />
            <div className="flex justify-between text-[10px] text-[#52525B] mt-1">
              <span>0.5x Slow</span>
              <span>2x Fast</span>
            </div>
          </div>

          {/* Auto-Listen Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#FAFAFA]">Auto-Listen</p>
              <p className="text-xs text-[#71717A]">Automatically start listening after AI response</p>
            </div>
            <button
              onClick={() => updateSetting('autoListen', !settings.autoListen)}
              className="relative w-12 h-6 rounded-full transition-colors duration-200"
              style={{
                background: settings.autoListen ? '#6366F1' : '#3F3F46',
              }}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
                animate={{ left: settings.autoListen ? 26 : 2 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── About ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass rounded-2xl p-6"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div className="flex items-center gap-4 mb-5">
          {/* Logo */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
            }}
          >
            <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
              D
            </span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#FAFAFA]" style={{ fontFamily: 'var(--font-heading)' }}>
              DeepSeek
            </h2>
            <p className="text-xs text-[#71717A]">Enterprise Knowledge Intelligence Platform</p>
          </div>
          <span className="ml-auto text-xs font-mono text-[#52525B] px-2.5 py-1 rounded-full border border-[rgba(63,63,70,0.5)]">
            v1.0.0
          </span>
        </div>

        <p className="text-sm text-[#A1A1AA] mb-5 leading-relaxed">
          DeepSeek is your enterprise AI knowledge assistant. It helps teams discover, query, and
          manage organizational knowledge using advanced AI and semantic search.
        </p>

        {/* Tech Stack Badges */}
        <div>
          <p className="text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-3">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {techBadges.map((tech) => (
              <span
                key={tech.name}
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background: tech.bg,
                  color: tech.color,
                  border: `1px solid ${tech.color}22`,
                }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
