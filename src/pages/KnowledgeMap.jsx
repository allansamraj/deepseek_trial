import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Brain, Network, Users, DollarSign, Cpu, Shield, Sparkles, BookOpen, AlertCircle, ArrowUpRight, Search } from 'lucide-react'

const departmentData = {
  HR: {
    name: 'Human Resources',
    icon: Users,
    color: '#8B5CF6',
    docCount: 47,
    health: 92,
    insights: 'Highly structured documentation. Needs updates on hybrid working policies.',
    documents: ['Employee Handbook v3.2', 'Onboarding Checklist', 'Leave Policy Guidelines']
  },
  Finance: {
    name: 'Finance & Accounting',
    icon: DollarSign,
    color: '#3B82F6',
    docCount: 32,
    health: 85,
    insights: 'Robust financial reports. Missing some tax compliance docs for international contractors.',
    documents: ['Q3 Financial Report', 'Expense Guidelines 2025', 'Audit Report v1']
  },
  IT: {
    name: 'Information Technology',
    icon: Cpu,
    color: '#06B6D4',
    docCount: 54,
    health: 78,
    insights: 'Detailed architecture logs. Security policy docs require annual sign-off.',
    documents: ['IT Security Policy', 'Network Diagram v2', 'SaaS Credentials Policy']
  },
  Legal: {
    name: 'Legal & Compliance',
    icon: Shield,
    color: '#10B981',
    docCount: 19,
    health: 90,
    insights: 'Fully compliant. Contractor agreement templates are standard.',
    documents: ['NDA Template 2025', 'Privacy Policy Draft', 'Vercel Deployment SLA']
  },
  Marketing: {
    name: 'Marketing & Brand',
    icon: Sparkles,
    color: '#F59E0B',
    docCount: 28,
    health: 88,
    insights: 'Good brand assets. Missing localization guidelines for European markets.',
    documents: ['Marketing Strategy 2025', 'Brand Guidelines v2.1', 'Asset Repository Links']
  },
  Operations: {
    name: 'Operations & Facilities',
    icon: BookOpen,
    color: '#EF4444',
    docCount: 41,
    health: 82,
    insights: 'Standard SOPs listed. Warehouse safety procedures checklist needs revision.',
    documents: ['Standard SOP Manual', 'Office Safety Rules', 'Business Continuity Plan']
  }
}

export default function KnowledgeMap() {
  const [selectedDept, setSelectedDept] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const connections = [
    { from: 'HR', to: 'IT', strength: 3 },
    { from: 'Finance', to: 'Legal', strength: 2 },
    { from: 'Marketing', to: 'HR', strength: 1 },
    { from: 'Operations', to: 'IT', strength: 4 },
    { from: 'Finance', to: 'Operations', strength: 2 },
    { from: 'IT', to: 'Legal', strength: 3 },
    { from: 'Marketing', to: 'Finance', strength: 2 }
  ]

  const deptCoordinates = {
    HR: { x: 250, y: 120 },
    Finance: { x: 550, y: 120 },
    IT: { x: 180, y: 280 },
    Legal: { x: 620, y: 280 },
    Marketing: { x: 400, y: 70 },
    Operations: { x: 400, y: 330 }
  }

  const handleNodeClick = (dept) => {
    setSelectedDept(selectedDept === dept ? null : dept)
  }

  const filteredDepts = Object.keys(departmentData).filter(key => {
    const dept = departmentData[key]
    return (
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.documents.some(doc => doc.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F4F4F5]">Knowledge Map</h1>
          <p className="text-sm text-[#A1A1AA]">Interactive graph of organizational knowledge and departmental connections.</p>
        </div>
        <div className="relative w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
          <input
            type="text"
            placeholder="Search map or documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph Visualizer */}
        <div className="lg:col-span-2 rounded-2xl p-6 relative overflow-hidden" style={{ background: 'rgba(17, 17, 24, 0.6)', border: '1px solid rgba(63, 63, 70, 0.5)' }}>
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Network size={16} className="text-[#6366F1]" />
            <span className="text-xs font-semibold text-[#A1A1AA]">Interactive Neural Topology</span>
          </div>

          <svg viewBox="0 0 800 400" className="w-full h-auto mt-4">
            {/* Draw connection lines */}
            {connections.map((conn, idx) => {
              const fromCoord = deptCoordinates[conn.from]
              const toCoord = deptCoordinates[conn.to]
              const isSelected = selectedDept === conn.from || selectedDept === conn.to
              return (
                <motion.line
                  key={idx}
                  x1={fromCoord.x}
                  y1={fromCoord.y}
                  x2={toCoord.x}
                  y2={toCoord.y}
                  stroke={isSelected ? '#6366F1' : 'rgba(63, 63, 70, 0.3)'}
                  strokeWidth={conn.strength}
                  strokeDasharray={isSelected ? '5,5' : 'none'}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />
              )
            })}

            {/* Draw Nodes */}
            {Object.keys(departmentData).map((key, i) => {
              const dept = departmentData[key]
              const coord = deptCoordinates[key]
              const Icon = dept.icon
              const isSelected = selectedDept === key
              const isHighlighted = filteredDepts.includes(key)

              return (
                <motion.g
                  key={key}
                  className="cursor-pointer"
                  onClick={() => handleNodeClick(key)}
                  style={{ opacity: isHighlighted ? 1 : 0.25, transition: 'opacity 0.3s ease' }}
                  animate={{
                    y: [0, -6, 3, -3, 0],
                    x: [0, 4, -4, 2, 0]
                  }}
                  transition={{
                    duration: 7 + (i * 1.5),
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  data-magnetic
                  data-cursor-text="Inspect"
                >
                  {/* Outer Pulsing Glow */}
                  {isSelected && (
                    <motion.circle
                      cx={coord.x}
                      cy={coord.y}
                      r={32}
                      fill="none"
                      stroke={dept.color}
                      strokeWidth="2"
                      animate={{ scale: [1, 1.25, 0.95, 1.1, 1], opacity: [0.6, 0.1, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  )}
                  
                  {/* Node Circle */}
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="24"
                    fill="rgba(10, 10, 15, 0.9)"
                    stroke={isSelected ? '#6366F1' : dept.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    style={{
                      transition: 'all 0.3s ease',
                      filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))'
                    }}
                  />

                  {/* Icon */}
                  <g transform={`translate(${coord.x - 10}, ${coord.y - 10})`}>
                    <Icon size={20} style={{ color: dept.color }} />
                  </g>

                  {/* Label */}
                  <text
                    x={coord.x}
                    y={coord.y + 40}
                    textAnchor="middle"
                    fill={isSelected ? '#F4F4F5' : '#A1A1AA'}
                    fontSize="11"
                    fontWeight={isSelected ? 'bold' : '500'}
                    style={{ transition: 'fill 0.3s ease' }}
                  >
                    {dept.name.split(' ')[0]}
                  </text>
                </motion.g>
              )
            })}
          </svg>
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedDept ? (
              <motion.div
                key={selectedDept}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 rounded-2xl p-6 h-full"
                style={{
                  background: 'rgba(17, 17, 24, 0.6)',
                  border: '1px solid rgba(63, 63, 70, 0.5)'
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${departmentData[selectedDept].color}15` }}
                  >
                    {(() => {
                      const Icon = departmentData[selectedDept].icon
                      return <Icon size={24} style={{ color: departmentData[selectedDept].color }} />
                    })()}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#F4F4F5]">{departmentData[selectedDept].name}</h2>
                    <span className="text-xs text-[#71717A]">Department Knowledge Core</span>
                  </div>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(24, 24, 27, 0.6)', border: '1px solid rgba(63, 63, 70, 0.3)' }}>
                    <div className="text-xs text-[#71717A] mb-1">Index Size</div>
                    <div className="text-xl font-bold text-[#F4F4F5]">{departmentData[selectedDept].docCount} Docs</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(24, 24, 27, 0.6)', border: '1px solid rgba(63, 63, 70, 0.3)' }}>
                    <div className="text-xs text-[#71717A] mb-1">Health Score</div>
                    <div className="text-xl font-bold text-[#10B981]">{departmentData[selectedDept].health}%</div>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="p-4 rounded-xl space-y-2" style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#818CF8]">
                    <AlertCircle size={14} />
                    <span>AI Shadow Insight</span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    {departmentData[selectedDept].insights}
                  </p>
                </div>

                {/* Document List */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Top Source Materials</div>
                  <div className="space-y-2">
                    {departmentData[selectedDept].documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-3 transition-colors group"
                        style={{ background: 'rgba(24, 24, 27, 0.4)', border: '1px solid rgba(63, 63, 70, 0.3)' }}
                      >
                        <span className="text-xs text-[#A1A1AA] font-medium truncate max-w-[80%]">{doc}</span>
                        <ArrowUpRight size={14} className="text-[#71717A] group-hover:text-white transition-colors cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div
                className="h-full flex flex-col items-center justify-center text-center py-12 px-6 space-y-4 rounded-2xl"
                style={{
                  background: 'rgba(17, 17, 24, 0.6)',
                  border: '1px solid rgba(63, 63, 70, 0.5)',
                  minHeight: '400px'
                }}
              >
                <Brain size={48} className="text-[#71717A] animate-float" />
                <div>
                  <h3 className="text-sm font-semibold text-[#F4F4F5]">No Department Selected</h3>
                  <p className="text-xs text-[#71717A] mt-1 max-w-[200px] mx-auto">
                    Click any node in the topology network to inspect metadata, insights, and documents.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
