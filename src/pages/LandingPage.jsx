import { motion } from 'motion/react';
import { Brain, Search, FileText, Mic, GitBranch, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const stats = [
  { value: '12,847', label: 'Documents Indexed' },
  { value: '98.6%', label: 'AI Accuracy' },
  { value: '24', label: 'Departments' },
  { value: '94', label: 'Knowledge Score' },
];

const features = [
  {
    icon: Brain,
    title: 'AI Knowledge Assistant',
    description: 'Natural language queries across your entire knowledge base',
    gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
  },
  {
    icon: Search,
    title: 'Semantic Search',
    description: 'Find exactly what you need with context-aware search',
    gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
  },
  {
    icon: FileText,
    title: 'Document Intelligence',
    description: 'Automatic analysis, health scoring, and gap detection',
    gradient: 'linear-gradient(135deg, #06B6D4, #10B981)',
  },
  {
    icon: Mic,
    title: 'Voice Interface',
    description: 'Hands-free interaction with your knowledge base',
    gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
  },
  {
    icon: GitBranch,
    title: 'Knowledge Mapping',
    description: 'Visual graph of organizational knowledge connections',
    gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Role-based access with audit trails',
    gradient: 'linear-gradient(135deg, #10B981, #3B82F6)',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen relative" style={{ background: '#09090B' }}>
      <ParticleBackground />

      {/* ─── Floating Gradient Blobs ─── */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #6366F1, #3B82F6)',
          opacity: 0.2,
          filter: 'blur(120px)',
        }}
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-[40%] right-[-8%] w-96 h-96 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #06B6D4, #10B981)',
          opacity: 0.15,
          filter: 'blur(120px)',
        }}
        animate={{ x: [0, -70, 40, 0], y: [0, 60, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[30%] w-96 h-96 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
          opacity: 0.15,
          filter: 'blur(120px)',
        }}
        animate={{ x: [0, 50, -60, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      />

      {/* ─── Hero Section ─── */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium tracking-widest uppercase text-[#A1A1AA]">
              Enterprise AI Platform
            </span>
          </div>

          <h1
            className="font-heading text-7xl md:text-8xl font-bold tracking-tight leading-none mb-6"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            DeepSeek
          </h1>

          <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-Powered Enterprise Knowledge Platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-base shadow-lg cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                  boxShadow: '0 0 30px rgba(59,130,246,0.3)',
                }}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>

            <Link to="/documents">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-base cursor-pointer"
                style={{
                  border: '1px solid rgba(63,63,70,0.8)',
                  background: 'rgba(24,24,27,0.5)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                Upload Documents
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{ border: '1px solid rgba(161,161,170,0.3)' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#A1A1AA]"
              animate={{ opacity: [1, 0.3, 1], y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── Statistics Section ─── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="p-6 rounded-2xl text-center"
              style={{
                background: 'rgba(24,24,27,0.6)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(63,63,70,0.5)',
              }}
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-[#A1A1AA]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl font-bold text-center text-white mb-14"
        >
          Enterprise Intelligence, Reimagined
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl group"
                style={{
                  background: 'rgba(24,24,27,0.6)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(63,63,70,0.5)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: feature.gradient }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mt-4">{feature.title}</h3>
                <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center py-16 px-8 rounded-2xl"
          style={{
            background: 'rgba(24,24,27,0.6)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(63,63,70,0.5)',
          }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Knowledge Management?
          </h2>
          <p className="text-[#A1A1AA] mb-8 max-w-lg mx-auto">
            Join leading enterprises already using DeepSeek to unlock the full potential of their organizational knowledge.
          </p>
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-white font-semibold text-lg cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                boxShadow: '0 0 40px rgba(59,130,246,0.3)',
              }}
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="relative z-10 py-8 px-6"
        style={{ borderTop: '1px solid rgba(63,63,70,0.5)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#71717A]">
            © 2025 DeepSeek. Enterprise Knowledge Intelligence.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-[#71717A] hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-[#71717A] hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-[#71717A] hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
