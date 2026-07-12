import { motion } from 'motion/react';
import {
  FileText,
  Brain,
  Search,
  Users,
  BarChart3,
  AlertTriangle,
  Sparkles,
  Clock,
  FolderOpen,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import StatCard from '../components/StatCard';
import KnowledgeHealthScore from '../components/KnowledgeHealthScore';

// --- Data ---
const activityData = [
  { name: 'Mon', queries: 420, docs: 24 },
  { name: 'Tue', queries: 380, docs: 18 },
  { name: 'Wed', queries: 510, docs: 32 },
  { name: 'Thu', queries: 470, docs: 28 },
  { name: 'Fri', queries: 590, docs: 35 },
  { name: 'Sat', queries: 320, docs: 12 },
  { name: 'Sun', queries: 280, docs: 9 },
];

const recentDocuments = [
  { name: 'Q3 Revenue Report', department: 'Finance', date: 'Jul 8, 2026', color: '#3B82F6' },
  { name: 'Employee Handbook v3', department: 'HR', date: 'Jul 7, 2026', color: '#8B5CF6' },
  { name: 'IT Security Policy', department: 'IT', date: 'Jul 6, 2026', color: '#06B6D4' },
  { name: 'Marketing Strategy 2025', department: 'Marketing', date: 'Jul 5, 2026', color: '#F59E0B' },
  { name: 'HR Leave Guidelines', department: 'HR', date: 'Jul 4, 2026', color: '#8B5CF6' },
];

const knowledgeGaps = [
  { topic: 'Work From Home Policy', searches: 72 },
  { topic: 'Remote Expense Guidelines', searches: 45 },
  { topic: 'Contractor Onboarding', searches: 38 },
  { topic: 'Data Retention Policy', searches: 31 },
  { topic: 'Equipment Return Process', searches: 24 },
];

const healthMetrics = [
  { label: 'Completeness', value: 92 },
  { label: 'Readability', value: 88 },
  { label: 'Coverage', value: 81 },
];

// --- Helpers ---
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getGapColor(searches) {
  if (searches >= 60) return '#F43F5E';
  if (searches >= 35) return '#F59E0B';
  return '#71717A';
}

// --- Glass card wrapper ---
function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border p-6 ${className}`}
      style={{
        background: 'rgba(17, 17, 24, 0.6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderColor: 'rgba(63, 63, 70, 0.5)',
      }}
    >
      {children}
    </div>
  );
}

// --- Custom Tooltip ---
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl border px-4 py-3"
      style={{
        background: 'rgba(17, 17, 24, 0.95)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(63, 63, 70, 0.5)',
      }}
    >
      <p className="mb-1 text-xs font-medium" style={{ color: '#A1A1AA' }}>
        {label}
      </p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

// --- Dashboard ---
export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 lg:p-8" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* ====== TOP SECTION ====== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1
            className="text-3xl font-bold text-white lg:text-4xl"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            {getGreeting()} 👋
          </h1>
          <div className="mt-2 flex items-center gap-2 text-sm" style={{ color: '#A1A1AA' }}>
            <Clock size={14} />
            {formatDate()}
          </div>
        </div>

        {/* AI Status badge */}
        <div
          className="flex w-fit items-center gap-2 rounded-full border px-4 py-2"
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'rgba(16, 185, 129, 0.3)',
          }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: '#10B981' }}
            />
            <span
              className="relative inline-flex h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: '#10B981' }}
            />
          </span>
          <span className="text-sm font-medium" style={{ color: '#10B981' }}>
            AI System Online
          </span>
        </div>
      </motion.div>

      {/* ====== STATS ROW ====== */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FileText}
          title="Total Documents"
          value="2,847"
          trend="+12.5%"
          trendUp={true}
          color="#3B82F6"
          delay={0.1}
        />
        <StatCard
          icon={Brain}
          title="AI Queries Today"
          value="1,284"
          trend="+8.3%"
          trendUp={true}
          color="#6366F1"
          delay={0.2}
        />
        <StatCard
          icon={Search}
          title="Search Accuracy"
          value="98.6%"
          trend="+2.1%"
          trendUp={true}
          color="#10B981"
          delay={0.3}
        />
        <StatCard
          icon={Users}
          title="Active Users"
          value="342"
          trend="+15.7%"
          trendUp={true}
          color="#06B6D4"
          delay={0.4}
        />
      </div>

      {/* ====== MIDDLE ROW ====== */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Knowledge Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <GlassCard>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)' }}
                >
                  <BarChart3 size={20} style={{ color: '#6366F1' }} />
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-white"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    Knowledge Activity
                  </h3>
                  <p className="text-xs" style={{ color: '#71717A' }}>
                    Weekly queries and document uploads
                  </p>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activityData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="queriesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="docsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(63, 63, 70, 0.15)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#71717A', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#71717A', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="queries"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fill="url(#queriesGradient)"
                  name="Queries"
                />
                <Area
                  type="monotone"
                  dataKey="docs"
                  stroke="#06B6D4"
                  strokeWidth={2}
                  fill="url(#docsGradient)"
                  name="Documents"
                />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Knowledge Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <GlassCard className="flex h-full flex-col">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}
              >
                <Sparkles size={20} style={{ color: '#10B981' }} />
              </div>
              <h3
                className="text-lg font-semibold text-white"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                Knowledge Health
              </h3>
            </div>

            <div className="flex flex-1 items-center justify-center py-4">
              <KnowledgeHealthScore score={87} />
            </div>

            {/* Mini stats */}
            <div className="mt-4 space-y-3">
              {healthMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {metric.label}
                    </span>
                    <span className="text-sm font-semibold text-white">{metric.value}%</span>
                  </div>
                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full"
                    style={{ backgroundColor: '#1E1E24' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                      style={{
                        background: 'linear-gradient(90deg, #6366F1, #06B6D4)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* ====== BOTTOM ROW ====== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <GlassCard>
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)' }}
              >
                <FileText size={20} style={{ color: '#06B6D4' }} />
              </div>
              <h3
                className="text-lg font-semibold text-white"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                Recent Documents
              </h3>
            </div>

            <div className="space-y-1">
              {recentDocuments.map((doc, i) => (
                <motion.div
                  key={doc.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                  className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${doc.color}20` }}
                    >
                      <FolderOpen size={14} style={{ color: doc.color }} />
                    </div>
                    <span className="font-medium text-white" style={{ fontSize: '14px' }}>
                      {doc.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: `${doc.color}18`,
                        color: doc.color,
                      }}
                    >
                      {doc.department}
                    </span>
                    <span className="text-xs" style={{ color: '#71717A' }}>
                      {doc.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Top Knowledge Gaps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <GlassCard>
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)' }}
                >
                  <AlertTriangle size={20} style={{ color: '#F59E0B' }} />
                </div>
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  Top Knowledge Gaps
                </h3>
              </div>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  color: '#EF4444',
                }}
              >
                {knowledgeGaps.length} gaps
              </span>
            </div>

            <div className="space-y-1">
              {knowledgeGaps.map((gap, i) => (
                <motion.div
                  key={gap.topic}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }}
                  className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: getGapColor(gap.searches) }}
                    />
                    <span className="text-sm font-medium text-white">{gap.topic}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm" style={{ color: getGapColor(gap.searches) }}>
                      {gap.searches} searches
                    </span>
                    <button
                      className="rounded-lg border px-3 py-1 text-xs font-medium opacity-0 transition-all group-hover:opacity-100 cursor-pointer"
                      style={{
                        borderColor: 'rgba(63, 63, 70, 0.5)',
                        color: 'var(--color-text-secondary)',
                        background: 'transparent',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#6366F1';
                        e.currentTarget.style.color = '#6366F1';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(63, 63, 70, 0.5)';
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                      }}
                    >
                      Generate Draft
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
