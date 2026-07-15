import { motion } from 'motion/react'
import { FileText, File, FileCode, MoreVertical } from 'lucide-react'

const typeConfig = {
  PDF: { icon: FileText, color: '#F43F5E', bg: 'rgba(244, 63, 94, 0.12)' },
  DOCX: { icon: File, color: '#1E3E62', bg: 'rgba(59, 130, 246, 0.12)' },
  TXT: { icon: FileCode, color: '#FF6500', bg: 'rgba(255, 101, 0, 0.12)' },
}

const deptColors = {
  HR: { bg: 'rgba(255, 101, 0, 0.12)', text: '#FF8233', border: 'rgba(255, 101, 0, 0.25)' },
  Finance: { bg: 'rgba(245, 158, 11, 0.12)', text: '#FBBF24', border: 'rgba(245, 158, 11, 0.25)' },
  IT: { bg: 'rgba(30, 62, 98, 0.12)', text: '#22D3EE', border: 'rgba(30, 62, 98, 0.25)' },
  Marketing: { bg: 'rgba(255, 101, 0, 0.12)', text: '#FF8233', border: 'rgba(255, 101, 0, 0.25)' },
}

function getHealthColor(score) {
  if (score >= 85) return '#FF6500'
  if (score >= 70) return '#FF6500'
  return '#F43F5E'
}

export default function DocumentCard({ document, delay = 0 }) {
  const config = typeConfig[document.type] || typeConfig.PDF
  const Icon = config.icon
  const dept = deptColors[document.department] || deptColors.HR
  const healthColor = getHealthColor(document.healthScore)

  // Circular progress calculations
  const radius = 16
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (document.healthScore / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="glass rounded-2xl p-5 cursor-pointer group"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: config.bg }}
        >
          <Icon size={20} style={{ color: config.color }} />
        </div>
        <button className="btn-ghost p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical size={16} className="text-[#71717A]" />
        </button>
      </div>

      {/* Document Name */}
      <h3 className="text-base font-semibold mt-3 text-[#FAFAFA] leading-snug line-clamp-2">
        {document.name}
      </h3>

      {/* Department Badge */}
      <div className="mt-2">
        <span
          className="inline-flex text-xs rounded-full px-2.5 py-0.5 font-medium"
          style={{
            background: dept.bg,
            color: dept.text,
            border: `1px solid ${dept.border}`,
          }}
        >
          {document.department}
        </span>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[rgba(30,62,98,0.3)]">
        <div className="flex items-center gap-3 text-xs text-[#71717A]">
          <span>{document.size}</span>
          <span className="w-1 h-1 rounded-full bg-[#3F3F46]" />
          <span>{document.date}</span>
        </div>

        {/* Health Score Circle */}
        <div className="relative flex items-center justify-center">
          <svg width="40" height="40" className="circular-progress">
            <circle
              className="circular-progress-track"
              cx="20"
              cy="20"
              r={radius}
            />
            <circle
              className="circular-progress-fill"
              cx="20"
              cy="20"
              r={radius}
              stroke={healthColor}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <span
            className="absolute text-[10px] font-bold"
            style={{ color: healthColor }}
          >
            {document.healthScore}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
