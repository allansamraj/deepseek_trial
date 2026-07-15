import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import {
  Brain, Search, FileText, Mic, GitBranch, Shield, Sparkles, ArrowRight,
  Zap, Globe, BarChart3, Lock, Cpu, Network, ChevronRight, Star,
  Upload, MessageSquare, Activity, Database, Bot, Check, ArrowUpRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ParticleBackground from '../components/ParticleBackground'
import TiltCard from '../components/TiltCard'

/* ═══════════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════════ */

const stats = [
  { value: 12847, label: 'Documents Indexed', suffix: '+' },
  { value: 98.6, label: 'AI Accuracy', suffix: '%', decimals: 1 },
  { value: 24, label: 'Departments', suffix: '' },
  { value: 94, label: 'Knowledge Score', suffix: '/100' },
]

const problems = [
  { stat: '67%', text: 'of enterprise knowledge is undiscoverable by employees', icon: Search },
  { stat: '3.2hrs', text: 'per day wasted searching for information', icon: Activity },
  { stat: '$31.5B', text: 'lost annually to poor knowledge management', icon: BarChart3 },
]

const features = [
  {
    icon: Brain,
    title: 'AI Knowledge Assistant',
    description: 'Natural language queries across your entire knowledge base with context-aware understanding',
    gradient: 'linear-gradient(135deg, #FF6500, #FF6500)',
  },
  {
    icon: Search,
    title: 'Semantic Search',
    description: 'Find exactly what you need with vector-powered contextual search that understands intent',
    gradient: 'linear-gradient(135deg, #1E3E62, #FF6500)',
  },
  {
    icon: FileText,
    title: 'Document Intelligence',
    description: 'Automatic analysis, health scoring, gap detection, and smart summarization',
    gradient: 'linear-gradient(135deg, #FF6500, #FF6500)',
  },
  {
    icon: Mic,
    title: 'Voice Interface',
    description: 'Hands-free interaction with your knowledge base — talk to your AI assistant',
    gradient: 'linear-gradient(135deg, #FF6500, #EC4899)',
  },
  {
    icon: Network,
    title: 'Knowledge Mapping',
    description: 'Visual graph of organizational knowledge connections across departments',
    gradient: 'linear-gradient(135deg, #FF6500, #E03E00)',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Role-based access control with comprehensive audit trails and compliance',
    gradient: 'linear-gradient(135deg, #FF6500, #1E3E62)',
  },
]

const architectureSteps = [
  { icon: Upload, label: 'Upload', desc: 'Documents' },
  { icon: FileText, label: 'Extract', desc: 'Text Processing' },
  { icon: Database, label: 'Embed', desc: 'Vector Embeddings' },
  { icon: Search, label: 'Retrieve', desc: 'Semantic Search' },
  { icon: Bot, label: 'LLM', desc: 'OpenRouter AI' },
  { icon: MessageSquare, label: 'Response', desc: 'AI Answer' },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'Perfect for small teams getting started',
    features: ['Up to 1,000 documents', '5 team members', 'AI Chat Assistant', 'Basic Analytics', 'Email Support'],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$199',
    period: '/month',
    description: 'For growing organizations',
    features: ['Up to 50,000 documents', '50 team members', 'Voice Assistant', 'Knowledge Map', 'Advanced Analytics', 'Priority Support', 'Custom Integrations'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large-scale deployments',
    features: ['Unlimited documents', 'Unlimited team members', 'Dedicated AI Models', 'SSO & SAML', 'On-premise option', '24/7 Premium Support', 'Custom SLA', 'Compliance & Audit'],
    cta: 'Contact Sales',
    popular: false,
  },
]

const testimonials = [
  {
    quote: "DeepSeek transformed how our 2,000+ employees access knowledge. Search time dropped by 73% in the first month.",
    name: 'Sarah Chen',
    title: 'VP of Engineering, TechCorp Global',
    avatar: 'SC',
  },
  {
    quote: "The AI assistant feels like having a senior analyst on demand. It understands context better than any tool we've tried.",
    name: 'James Mitchell',
    title: 'Head of Operations, FinanceFlow',
    avatar: 'JM',
  },
  {
    quote: "Knowledge gap detection alone saved us from three compliance incidents. The ROI was immediate and measurable.",
    name: 'Dr. Priya Patel',
    title: 'Chief Knowledge Officer, MedTech Inc.',
    avatar: 'PP',
  },
]

/* ═══════════════════════════════════════════════════════
   Utility Components
   ═══════════════════════════════════════════════════════ */

function CountUp({ target, suffix = '', decimals = 0, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target
      setCount(current)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  )
}

function SectionReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function GlassFeatureCard({ icon: Icon, title, description, gradient, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <TiltCard
        className="p-6 cursor-default h-full"
        glowColor="rgba(255, 101, 0, 0.15)"
        data-magnetic
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: gradient }}
        >
          <Icon size={22} className="text-white" />
        </div>
        <h3 className="text-lg font-semibold text-[#F4F4F5] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">{description}</p>
      </TiltCard>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   Chat Demo Component
   ═══════════════════════════════════════════════════════ */

function ChatDemo() {
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const hasPlayed = useRef(false)

  const demoConversation = [
    { role: 'user', content: 'What is our remote work policy for international employees?' },
    { role: 'ai', content: 'Based on the **Employee Handbook v3.2** (HR Department), international remote work is permitted under the following conditions:\n\n• Employees must have manager approval\n• Maximum of 90 days per calendar year\n• Tax compliance documentation required\n• VPN connection mandatory for all work\n\n📄 *Source: Employee Handbook v3.2, Page 47 • Confidence: 96.2%*' },
  ]

  useEffect(() => {
    if (!inView || hasPlayed.current) return
    hasPlayed.current = true
    let timeouts = []
    // Show user message
    timeouts.push(setTimeout(() => {
      setMessages([demoConversation[0]])
      setTyping(true)
    }, 800))
    // Show AI response
    timeouts.push(setTimeout(() => {
      setTyping(false)
      setMessages([demoConversation[0], demoConversation[1]])
    }, 3000))
    return () => timeouts.forEach(clearTimeout)
  }, [inView])

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden max-w-2xl mx-auto"
      style={{
        background: 'rgba(11, 25, 44, 0.8)',
        border: '1px solid rgba(30, 62, 98, 0.5)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Chat header */}
      <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: '1px solid rgba(30, 62, 98, 0.5)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6500, #1E3E62)' }}>
          <Bot size={16} className="text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-[#F4F4F5]">DeepSeek AI</div>
          <div className="text-xs text-[#FF6500] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6500] inline-block" /> Online
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="p-5 min-h-[240px] flex flex-col gap-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="rounded-2xl px-4 py-3 text-sm max-w-[85%]"
              style={msg.role === 'user' ? {
                background: 'linear-gradient(135deg, #FF6500, #1E3E62)',
                color: 'white',
                borderBottomRightRadius: '6px',
              } : {
                background: 'rgba(24, 24, 27, 0.8)',
                color: '#F4F4F5',
                border: '1px solid rgba(30, 62, 98, 0.5)',
                borderBottomLeftRadius: '6px',
              }}
            >
              {msg.content.split('\n').map((line, li) => (
                <p key={li} className="my-0.5" dangerouslySetInnerHTML={{
                  __html: line
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em style="color:#A1A1AA">$1</em>')
                    .replace(/•/g, '<span style="color:#FF6500">•</span>')
                }} />
              ))}
            </div>
          </motion.div>
        ))}

        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1.5 px-4 py-3 rounded-2xl w-fit" style={{ background: 'rgba(24,24,27,0.8)', border: '1px solid rgba(30,62,98,0.5)' }}>
            {[0, 1, 2].map(i => (
              <span key={i} className="w-2 h-2 rounded-full bg-[#FF6500]" style={{ animation: `typing 1.4s infinite ${i * 0.2}s` }} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   Architecture Flow
   ═══════════════════════════════════════════════════════ */

function ArchitectureFlow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
      {architectureSteps.map((step, i) => {
        const Icon = step.icon
        return (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 md:gap-4"
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: inView ? 'linear-gradient(135deg, rgba(255,101,0,0.2), rgba(30,62,98,0.2))' : 'rgba(24,24,27,0.6)',
                  border: '1px solid rgba(255, 101, 0, 0.3)',
                  transition: 'all 0.5s ease',
                  transitionDelay: `${i * 0.15 + 0.3}s`,
                }}
              >
                <Icon size={24} className="text-[#FF6500]" />
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-[#F4F4F5]">{step.label}</div>
                <div className="text-[10px] text-[#71717A]">{step.desc}</div>
              </div>
            </div>
            {i < architectureSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.2 }}
              >
                <ChevronRight size={20} className="text-[#FF6500] opacity-50 hidden md:block" />
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   Main Landing Page
   ═══════════════════════════════════════════════════════ */

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <div className="min-h-screen relative" style={{ background: '#000000' }}>
      <ParticleBackground />

      {/* Cursor Glow */}
      <div
        className="cursor-glow"
        style={{ left: mousePos.x, top: mousePos.y, opacity: mousePos.x > 0 ? 1 : 0 }}
      />

      {/* ─── Floating Gradient Blobs ─── */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,101,0,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }}
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-[40%] right-[-8%] w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(30,62,98,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
        animate={{ x: [0, -70, 40, 0], y: [0, 60, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[30%] w-[450px] h-[450px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,101,0,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
        animate={{ x: [0, 50, -60, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* ═══════════════ SECTION 1: HERO ═══════════════ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full text-sm"
          style={{
            background: 'rgba(255, 101, 0, 0.1)',
            border: '1px solid rgba(255, 101, 0, 0.25)',
            color: '#FF8233',
          }}
        >
          <Sparkles size={14} />
          <span>Enterprise AI Knowledge Intelligence</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight"
          style={{
            fontFamily: 'var(--font-heading)',
            background: 'linear-gradient(135deg, #F4F4F5 0%, #FF6500 50%, #FF6500 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
          }}
        >
          DeepSeek
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl text-[#A1A1AA] mb-10 max-w-2xl"
        >
          Enterprise Intelligence. Reinvented.
          <br />
          <span className="text-[#71717A]">
            AI-powered knowledge management that transforms how your organization discovers, shares, and creates intelligence.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(255,101,0,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl text-white font-semibold text-sm flex items-center gap-2 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #FF6500, #1E3E62)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Get Started <ArrowRight size={16} />
            </motion.button>
          </Link>
          <Link to="/documents">
            <motion.button
              whileHover={{ scale: 1.04, borderColor: 'rgba(255,101,0,0.6)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm text-[#A1A1AA] cursor-pointer"
              style={{
                background: 'rgba(11, 25, 44, 0.6)',
                border: '1px solid rgba(30, 62, 98, 0.5)',
                backdropFilter: 'blur(10px)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Watch Demo
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{ border: '2px solid rgba(255, 101, 0, 0.3)' }}
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#FF6500]"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══════════════ SECTION 2: TRUSTED BY ═══════════════ */}
      <section className="relative z-10 py-16 px-6">
        <SectionReveal>
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#71717A] mb-8">Trusted by industry leaders</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-40">
              {['TechCorp', 'FinanceFlow', 'MedTech', 'GlobalBank', 'InnovateCo', 'SecureNet'].map((name) => (
                <span key={name} className="text-lg md:text-xl font-bold text-[#52525B]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ═══════════════ SECTION 3: ENTERPRISE PROBLEMS ═══════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.15em] text-[#FF6500] mb-4 font-semibold">The Problem</p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#F4F4F5] mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                Enterprise Knowledge is Broken
              </h2>
              <p className="text-[#71717A] text-lg max-w-xl mx-auto">
                Critical knowledge is scattered, siloed, and inaccessible when your teams need it most.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((problem, i) => {
              const Icon = problem.icon
              return (
                <SectionReveal key={i} delay={i * 0.15}>
                  <div
                    className="rounded-2xl p-8 text-center"
                    style={{
                      background: 'rgba(11, 25, 44, 0.6)',
                      border: '1px solid rgba(30, 62, 98, 0.5)',
                      backdropFilter: 'blur(16px)',
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl mx-auto mb-5 flex items-center justify-center" style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                      <Icon size={22} className="text-[#F43F5E]" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-[#F4F4F5] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      <CountUp target={parseFloat(problem.stat.replace(/[^0-9.]/g, ''))} suffix={problem.stat.replace(/[0-9.]/g, '')} />
                    </div>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">{problem.text}</p>
                  </div>
                </SectionReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 4: AI SOLUTION ═══════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SectionReveal>
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-[#FF6500] mb-4 font-semibold">The Solution</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F4F4F5] mb-6" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                AI That Understands Your Enterprise
              </h2>
              <p className="text-[#A1A1AA] mb-8 leading-relaxed">
                DeepSeek uses advanced RAG (Retrieval Augmented Generation) to connect your organization's knowledge with state-of-the-art language models, delivering accurate, contextual answers in seconds.
              </p>
              <div className="space-y-4">
                {[
                  'Semantic understanding across all document types',
                  'Real-time knowledge gap detection',
                  'Confidence-scored AI responses with source citations',
                  'Multi-model support via OpenRouter',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255, 101, 0, 0.15)' }}>
                      <Check size={14} className="text-[#FF6500]" />
                    </div>
                    <span className="text-sm text-[#A1A1AA]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Animated AI brain visual */}
          <SectionReveal delay={0.2}>
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute w-72 h-72 rounded-full"
                style={{ border: '1px dashed rgba(255, 101, 0, 0.2)' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                className="absolute w-56 h-56 rounded-full"
                style={{ border: '1px dashed rgba(30, 62, 98, 0.2)' }}
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-32 h-32 rounded-3xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,101,0,0.2), rgba(30,62,98,0.2))',
                  border: '1px solid rgba(255, 101, 0, 0.3)',
                  boxShadow: '0 0 60px rgba(255, 101, 0, 0.15)',
                }}
              >
                <Brain size={48} className="text-[#FF6500]" />
              </motion.div>

              {/* Floating nodes */}
              {[
                { x: -120, y: -80, icon: FileText, color: '#1E3E62', delay: 0 },
                { x: 120, y: -60, icon: Search, color: '#FF6500', delay: 0.5 },
                { x: -100, y: 80, icon: Database, color: '#FF6500', delay: 1 },
                { x: 110, y: 90, icon: Zap, color: '#FF6500', delay: 1.5 },
              ].map((node, i) => {
                const NodeIcon = node.icon
                return (
                  <motion.div
                    key={i}
                    className="absolute w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      left: `calc(50% + ${node.x}px)`,
                      top: `calc(50% + ${node.y}px)`,
                      background: `rgba(${node.color === '#1E3E62' ? '59,130,246' : node.color === '#FF6500' ? '6,182,212' : node.color === '#FF6500' ? '139,92,246' : '16,185,129'}, 0.15)`,
                      border: `1px solid ${node.color}30`,
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: node.delay }}
                  >
                    <NodeIcon size={18} style={{ color: node.color }} />
                  </motion.div>
                )
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════ SECTION 5: STATISTICS ═══════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: 'rgba(11, 25, 44, 0.6)',
                    border: '1px solid rgba(30, 62, 98, 0.5)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#F4F4F5] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <CountUp target={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                  </div>
                  <div className="text-xs text-[#71717A] uppercase tracking-wider">{stat.label}</div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 6: FEATURES ═══════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.15em] text-[#FF6500] mb-4 font-semibold">Capabilities</p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#F4F4F5] mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                Enterprise Intelligence, Reimagined
              </h2>
              <p className="text-[#71717A] text-lg max-w-xl mx-auto">
                A comprehensive AI platform that transforms how your organization manages knowledge.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <GlassFeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 7: INTERACTIVE AI DEMO ═══════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.15em] text-[#FF6500] mb-4 font-semibold">Live Preview</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F4F4F5] mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                AI That Knows Your Business
              </h2>
              <p className="text-[#71717A] max-w-lg mx-auto">
                Ask any question and get instant, accurate answers sourced from your knowledge base.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <ChatDemo />
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════ SECTION 8: VOICE ASSISTANT PREVIEW ═══════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SectionReveal>
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Pulsing rings */}
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full"
                    style={{ border: '1px solid rgba(255, 101, 0, 0.3)' }}
                    animate={{ scale: [1, 1.5 + i * 0.3], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-28 h-28 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,101,0,0.2), rgba(255,101,0,0.2))',
                    border: '1px solid rgba(255, 101, 0, 0.3)',
                    boxShadow: '0 0 60px rgba(255, 101, 0, 0.15)',
                  }}
                >
                  <Mic size={36} className="text-[#FF6500]" />
                </motion.div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-[#FF6500] mb-4 font-semibold">Voice Interface</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F4F4F5] mb-6" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                Talk to Your Knowledge Base
              </h2>
              <p className="text-[#A1A1AA] mb-6 leading-relaxed">
                Hands-free AI interaction. Ask questions, get summaries, and navigate your knowledge base using natural voice commands. It feels like talking to Jarvis.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#F4F4F5]">15+</span>
                  <span className="text-xs text-[#71717A]">Languages</span>
                </div>
                <div className="w-px h-10 bg-[#27272A]" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#F4F4F5]">&lt;1s</span>
                  <span className="text-xs text-[#71717A]">Response Time</span>
                </div>
                <div className="w-px h-10 bg-[#27272A]" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#F4F4F5]">99.2%</span>
                  <span className="text-xs text-[#71717A]">Recognition</span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════ SECTION 9: KNOWLEDGE MAP PREVIEW ═══════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.15em] text-[#FF6500] mb-4 font-semibold">Knowledge Graph</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F4F4F5] mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                Visualize Your Knowledge Network
              </h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div
              className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
              style={{ background: 'rgba(11, 25, 44, 0.6)', border: '1px solid rgba(30, 62, 98, 0.5)' }}
            >
              {/* Animated SVG knowledge graph */}
              <svg viewBox="0 0 800 400" className="w-full h-auto">
                {/* Connection lines */}
                {[
                  { x1: 400, y1: 200, x2: 200, y2: 100, delay: 0 },
                  { x1: 400, y1: 200, x2: 600, y2: 100, delay: 0.2 },
                  { x1: 400, y1: 200, x2: 150, y2: 300, delay: 0.4 },
                  { x1: 400, y1: 200, x2: 650, y2: 300, delay: 0.6 },
                  { x1: 400, y1: 200, x2: 400, y2: 60, delay: 0.3 },
                  { x1: 400, y1: 200, x2: 400, y2: 340, delay: 0.5 },
                  { x1: 200, y1: 100, x2: 400, y2: 60, delay: 0.7 },
                  { x1: 600, y1: 100, x2: 400, y2: 60, delay: 0.8 },
                  { x1: 150, y1: 300, x2: 400, y2: 340, delay: 0.9 },
                  { x1: 650, y1: 300, x2: 400, y2: 340, delay: 1 },
                ].map((line, i) => (
                  <motion.line
                    key={i}
                    x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                    stroke="rgba(255, 101, 0, 0.2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: line.delay }}
                  />
                ))}

                {/* Center node */}
                <motion.circle cx="400" cy="200" r="30" fill="url(#centerGrad)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
                <text x="400" y="205" textAnchor="middle" fill="#F4F4F5" fontSize="10" fontWeight="bold">DeepSeek</text>

                {/* Department nodes */}
                {[
                  { cx: 200, cy: 100, label: 'HR', color: '#FF6500' },
                  { cx: 600, cy: 100, label: 'Finance', color: '#1E3E62' },
                  { cx: 150, cy: 300, label: 'IT', color: '#FF6500' },
                  { cx: 650, cy: 300, label: 'Legal', color: '#FF6500' },
                  { cx: 400, cy: 60, label: 'Marketing', color: '#FF6500' },
                  { cx: 400, cy: 340, label: 'Operations', color: '#E03E00' },
                ].map((node, i) => (
                  <g key={i}>
                    <motion.circle
                      cx={node.cx} cy={node.cy} r="22"
                      fill={`${node.color}20`} stroke={`${node.color}60`} strokeWidth="1"
                      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    />
                    <text x={node.cx} y={node.cy + 4} textAnchor="middle" fill={node.color} fontSize="9" fontWeight="600">{node.label}</text>
                  </g>
                ))}

                <defs>
                  <radialGradient id="centerGrad">
                    <stop offset="0%" stopColor="rgba(255,101,0,0.3)" />
                    <stop offset="100%" stopColor="rgba(255,101,0,0.1)" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════ SECTION 10: ANALYTICS PREVIEW ═══════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SectionReveal>
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-[#FF6500] mb-4 font-semibold">Analytics</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F4F4F5] mb-6" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                Measure Knowledge Intelligence
              </h2>
              <p className="text-[#A1A1AA] mb-6 leading-relaxed">
                Real-time dashboards with AI-driven insights. Track knowledge growth, identify gaps, and measure the impact of your knowledge management strategy.
              </p>
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-[#FF6500] font-semibold hover:text-[#FF8233] transition-colors">
                Explore Dashboard <ArrowUpRight size={16} />
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Documents', value: '12,847', change: '+12.5%', color: '#1E3E62' },
                { label: 'AI Queries', value: '45,231', change: '+28.3%', color: '#FF6500' },
                { label: 'Accuracy', value: '98.6%', change: '+2.1%', color: '#FF6500' },
                { label: 'Users', value: '342', change: '+15.7%', color: '#FF6500' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl p-5"
                  style={{ background: 'rgba(11, 25, 44, 0.6)', border: '1px solid rgba(30, 62, 98, 0.5)' }}
                >
                  <div className="text-xs text-[#71717A] mb-2">{item.label}</div>
                  <div className="text-2xl font-bold text-[#F4F4F5]" style={{ fontFamily: 'var(--font-heading)' }}>{item.value}</div>
                  <div className="text-xs text-[#FF6500] mt-1">{item.change}</div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════ SECTION 11: ARCHITECTURE ═══════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.15em] text-[#FF6500] mb-4 font-semibold">Architecture</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F4F4F5] mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                How DeepSeek Works
              </h2>
              <p className="text-[#71717A] max-w-lg mx-auto">
                A sophisticated RAG pipeline that transforms your documents into intelligent, searchable knowledge.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <ArchitectureFlow />
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════ SECTION 12: TESTIMONIALS ═══════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.15em] text-[#FF6500] mb-4 font-semibold">Testimonials</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F4F4F5]" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                Loved by Enterprise Teams
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <div
                  className="rounded-2xl p-6 flex flex-col h-full"
                  style={{ background: 'rgba(11, 25, 44, 0.6)', border: '1px solid rgba(30, 62, 98, 0.5)' }}
                >
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className="text-[#FF6500]" fill="#FF6500" />)}
                  </div>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #FF6500, #1E3E62)' }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#F4F4F5]">{t.name}</div>
                      <div className="text-xs text-[#71717A]">{t.title}</div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 13: PRICING ═══════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.15em] text-[#FF6500] mb-4 font-semibold">Pricing</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F4F4F5] mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                Plans That Scale With You
              </h2>
              <p className="text-[#71717A] max-w-lg mx-auto">
                Start free and upgrade as your organization grows.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <TiltCard
                  className="p-6 relative flex flex-col h-full cursor-default"
                  glowColor={plan.popular ? 'rgba(255, 101, 0, 0.25)' : 'rgba(255, 101, 0, 0.12)'}
                  style={{
                    background: plan.popular ? 'rgba(255, 101, 0, 0.08)' : 'rgba(11, 25, 44, 0.6)',
                    borderColor: plan.popular ? 'rgba(255, 101, 0, 0.4)' : 'rgba(30, 62, 98, 0.5)',
                  }}
                  data-magnetic
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white z-10" style={{ background: 'linear-gradient(135deg, #FF6500, #1E3E62)' }}>
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#F4F4F5] mb-1">{plan.name}</h3>
                    <p className="text-xs text-[#71717A]">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#F4F4F5]" style={{ fontFamily: 'var(--font-heading)' }}>{plan.price}</span>
                    <span className="text-sm text-[#71717A]">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                        <Check size={14} className="text-[#FF6500] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl font-semibold text-sm cursor-pointer"
                      style={{
                        background: plan.popular ? 'linear-gradient(135deg, #FF6500, #1E3E62)' : 'rgba(24, 24, 27, 0.8)',
                        color: plan.popular ? 'white' : '#A1A1AA',
                        border: plan.popular ? 'none' : '1px solid rgba(30, 62, 98, 0.5)',
                      }}
                    >
                      {plan.cta}
                    </motion.button>
                  </Link>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 14: FINAL CTA ═══════════════ */}
      <section className="relative z-10 py-24 px-6">
        <SectionReveal>
          <div
            className="max-w-4xl mx-auto rounded-3xl py-16 px-8 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,101,0,0.15), rgba(30,62,98,0.1))',
              border: '1px solid rgba(255, 101, 0, 0.2)',
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#F4F4F5] mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
              Ready to Transform Your Knowledge?
            </h2>
            <p className="text-[#A1A1AA] mb-8 max-w-md mx-auto">
              Join hundreds of enterprises already using DeepSeek to unlock their organizational intelligence.
            </p>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(255,101,0,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-xl text-white font-semibold flex items-center gap-2 mx-auto cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FF6500, #1E3E62)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Start Free Trial <ArrowRight size={18} />
              </motion.button>
            </Link>
          </div>
        </SectionReveal>
      </section>

      {/* ═══════════════ SECTION 15: FOOTER ═══════════════ */}
      <footer className="relative z-10 py-12 px-6" style={{ borderTop: '1px solid rgba(30, 62, 98, 0.3)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6500, #FF6500)' }}>
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-[#F4F4F5]" style={{ fontFamily: 'var(--font-heading)' }}>DeepSeek</span>
            </div>
            <div className="flex items-center gap-8">
              {['Privacy', 'Terms', 'Security', 'Contact'].map(link => (
                <a key={link} href="#" className="text-sm text-[#71717A] hover:text-[#A1A1AA] transition-colors">{link}</a>
              ))}
            </div>
            <p className="text-xs text-[#52525B]">© 2025 DeepSeek. Enterprise Knowledge Intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
