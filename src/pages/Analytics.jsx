import { useState } from 'react'
import { motion } from 'motion/react'
import { BarChart3, TrendingUp, Search, Users, AlertCircle, FileText, Download } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'

const monthlyActivity = [
  { name: 'Jan', queries: 820, docs: 12 },
  { name: 'Feb', queries: 950, docs: 18 },
  { name: 'Mar', queries: 1200, docs: 25 },
  { name: 'Apr', queries: 1100, docs: 15 },
  { name: 'May', queries: 1450, docs: 30 },
  { name: 'Jun', queries: 1800, docs: 42 },
  { name: 'Jul', queries: 2100, docs: 48 }
]

const departmentStats = [
  { name: 'HR', documents: 47, health: 92, queries: 840 },
  { name: 'Finance', documents: 32, health: 85, queries: 620 },
  { name: 'IT', documents: 54, health: 78, queries: 1240 },
  { name: 'Legal', documents: 19, health: 90, queries: 320 },
  { name: 'Marketing', documents: 28, health: 88, queries: 510 },
  { name: 'Operations', documents: 41, health: 82, queries: 790 }
]

const topQueries = [
  { query: 'Remote work policy for international contract', count: 182, success: '96.2%' },
  { query: 'Q3 financial targets and revenue analysis', count: 145, success: '94.8%' },
  { query: 'SSO setup instructions for AWS console', count: 112, success: '98.0%' },
  { query: 'Sick leave approvals and guidelines', count: 98, success: '95.1%' },
  { query: 'NDA templates and signature flow', count: 86, success: '91.3%' }
]

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F4F4F5]">Analytics Dashboard</h1>
          <p className="text-sm text-[#A1A1AA]">Real-time audit metrics on search activity, knowledge growth, and health scores.</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm bg-surface-3 text-[#A1A1AA] border border-[rgba(63,63,70,0.5)] focus:border-[#6366F1] outline-none"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-3 text-[#A1A1AA] border border-[rgba(63,63,70,0.5)] hover:border-white transition-colors">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Search, label: 'Search Queries', value: '45,231', trend: '+28.3%', color: '#6366F1' },
          { icon: TrendingUp, label: 'Average Accuracy', value: '98.6%', trend: '+2.1%', color: '#10B981' },
          { icon: Users, label: 'Active Users', value: '342', trend: '+15.7%', color: '#3B82F6' },
          { icon: FileText, label: 'New Documents', value: '175', trend: '+12.5%', color: '#06B6D4' }
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: 'rgba(17, 17, 24, 0.6)', border: '1px solid rgba(63, 63, 70, 0.5)' }}
            >
              <div className="flex justify-between items-center mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}15` }}
                >
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
                <span className="text-xs font-semibold text-[#10B981] bg-[rgba(16,185,129,0.1)] px-2 py-0.5 rounded-full">{stat.trend}</span>
              </div>
              <div className="text-xs text-[#71717A] mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-[#F4F4F5]" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Knowledge Growth Area Chart */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(17, 17, 24, 0.6)', border: '1px solid rgba(63, 63, 70, 0.5)' }}>
          <h2 className="text-sm font-bold text-[#F4F4F5] uppercase tracking-wider mb-6">Knowledge Activity Over Time</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="queriesColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(63, 63, 70, 0.1)" />
                <XAxis dataKey="name" stroke="#71717A" fontSize={10} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'rgba(17, 17, 24, 0.95)', border: '1px solid rgba(63, 63, 70, 0.5)', borderRadius: '12px' }}
                  labelStyle={{ color: '#F4F4F5', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="queries" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#queriesColor)" name="Queries" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Breakdown Bar Chart */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(17, 17, 24, 0.6)', border: '1px solid rgba(63, 63, 70, 0.5)' }}>
          <h2 className="text-sm font-bold text-[#F4F4F5] uppercase tracking-wider mb-6">Department Distribution</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(63, 63, 70, 0.1)" />
                <XAxis dataKey="name" stroke="#71717A" fontSize={10} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'rgba(17, 17, 24, 0.95)', border: '1px solid rgba(63, 63, 70, 0.5)', borderRadius: '12px' }}
                  labelStyle={{ color: '#F4F4F5', fontWeight: 'bold' }}
                />
                <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />
                <Bar dataKey="documents" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Documents" />
                <Bar dataKey="queries" fill="#6366F1" radius={[4, 4, 0, 0]} name="Queries Activity" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Queries Table */}
        <div className="lg:col-span-2 rounded-2xl p-6" style={{ background: 'rgba(17, 17, 24, 0.6)', border: '1px solid rgba(63, 63, 70, 0.5)' }}>
          <h2 className="text-sm font-bold text-[#F4F4F5] uppercase tracking-wider mb-4">Top AI Search Queries</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[rgba(63,63,70,0.3)]">
                  <th className="pb-3 text-[#71717A] font-semibold">Search Phrase</th>
                  <th className="pb-3 text-[#71717A] font-semibold text-center">Hits</th>
                  <th className="pb-3 text-[#71717A] font-semibold text-right">RAG Confidence</th>
                </tr>
              </thead>
              <tbody>
                {topQueries.map((q, i) => (
                  <tr key={i} className="border-b border-[rgba(63,63,70,0.15)] last:border-0">
                    <td className="py-3.5 font-medium text-[#A1A1AA]">{q.query}</td>
                    <td className="py-3.5 text-center text-[#F4F4F5] font-semibold">{q.count}</td>
                    <td className="py-3.5 text-right text-[#10B981] font-semibold">{q.success}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insight Alerts */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(17, 17, 24, 0.6)', border: '1px solid rgba(63, 63, 70, 0.5)' }}>
          <h2 className="text-sm font-bold text-[#F4F4F5] uppercase tracking-wider mb-4">AI Knowledge Warnings</h2>
          <div className="space-y-4">
            {[
              { text: 'IT security policies have not been updated since Dec 2024. Review scheduled.', level: 'high' },
              { text: 'Search hits on remote international work rising (154%). Gap detected: missing regional tax files.', level: 'medium' },
              { text: 'Finance Q3 data reports 100% completeness. Ready for publication.', level: 'info' }
            ].map((alert, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl flex gap-3 text-xs leading-relaxed"
                style={{
                  background: alert.level === 'high' ? 'rgba(244, 63, 94, 0.05)' : alert.level === 'medium' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                  border: `1px solid ${alert.level === 'high' ? 'rgba(244, 63, 94, 0.2)' : alert.level === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`
                }}
              >
                <AlertCircle size={16} className={alert.level === 'high' ? 'text-[#F43F5E]' : alert.level === 'medium' ? 'text-[#F59E0B]' : 'text-[#10B981]'} />
                <span className="text-[#A1A1AA]">{alert.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
