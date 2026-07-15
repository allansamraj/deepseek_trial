import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  X,
  FileText,
  File,
  FileCode,
  ChevronDown,
} from 'lucide-react'
import DocumentCard from '../components/DocumentCard'
import FileUpload from '../components/FileUpload'

const sampleDocuments = [
  { id: '1', name: 'Employee Handbook v3.2', type: 'PDF', department: 'HR', size: '2.4 MB', date: '2024-12-15', healthScore: 92, status: 'healthy' },
  { id: '2', name: 'Q3 Financial Report', type: 'PDF', department: 'Finance', size: '1.8 MB', date: '2024-12-10', healthScore: 85, status: 'good' },
  { id: '3', name: 'IT Security Policy', type: 'DOCX', department: 'IT', size: '890 KB', date: '2024-11-28', healthScore: 65, status: 'warning' },
  { id: '4', name: 'Marketing Strategy 2025', type: 'PDF', department: 'Marketing', size: '3.1 MB', date: '2024-12-08', healthScore: 90, status: 'healthy' },
  { id: '5', name: 'Leave Policy Guidelines', type: 'PDF', department: 'HR', size: '1.2 MB', date: '2024-12-01', healthScore: 88, status: 'good' },
  { id: '6', name: 'Onboarding Checklist', type: 'TXT', department: 'HR', size: '45 KB', date: '2024-11-20', healthScore: 78, status: 'good' },
]

const typeIcons = {
  PDF: <FileText size={14} className="text-[#F43F5E]" />,
  DOCX: <File size={14} className="text-[#1E3E62]" />,
  TXT: <FileCode size={14} className="text-[#FF6500]" />,
}

function getHealthColor(score) {
  if (score >= 85) return '#FF6500'
  if (score >= 70) return '#FF6500'
  return '#F43F5E'
}

export default function Documents() {
  const [documents] = useState(sampleDocuments)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [showUpload, setShowUpload] = useState(false)

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === 'All' || doc.type === typeFilter
      return matchesSearch && matchesType
    })
  }, [documents, search, typeFilter])

  return (
    <div>
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA]" style={{ fontFamily: 'var(--font-heading)' }}>
            Documents
          </h1>
          <p className="text-sm text-[#71717A] mt-1">
            {filtered.length} document{filtered.length !== 1 ? 's' : ''} in your knowledge base
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input w-64 pl-9"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input appearance-none pr-8 cursor-pointer"
              style={{
                background: 'rgba(24, 24, 27, 0.6)',
                backdropFilter: 'blur(20px)',
                width: 100,
              }}
            >
              <option value="All">All</option>
              <option value="PDF">PDF</option>
              <option value="DOCX">DOCX</option>
              <option value="TXT">TXT</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="flex items-center rounded-lg overflow-hidden border border-[rgba(30,62,98,0.5)]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[rgba(255,101,0,0.15)] text-[#FF8233]'
                  : 'text-[#71717A] hover:text-[#FAFAFA] hover:bg-[rgba(39,39,42,0.5)]'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-[rgba(255,101,0,0.15)] text-[#FF8233]'
                  : 'text-[#71717A] hover:text-[#FAFAFA] hover:bg-[rgba(39,39,42,0.5)]'
              }`}
            >
              <List size={16} />
            </button>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setShowUpload(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            Upload
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc, i) => (
            <DocumentCard key={doc.id} document={doc} delay={i * 0.08} />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-2">
          {/* Header Row */}
          <div className="flex items-center gap-4 px-4 py-2 text-xs font-semibold text-[#71717A] uppercase tracking-wider">
            <span className="flex-1 min-w-0">Name</span>
            <span className="w-16 text-center">Type</span>
            <span className="w-24 text-center hidden sm:block">Department</span>
            <span className="w-20 text-center hidden md:block">Size</span>
            <span className="w-24 text-center hidden lg:block">Date</span>
            <span className="w-16 text-center">Health</span>
          </div>

          {filtered.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="glass flex items-center gap-4 p-4 rounded-xl cursor-pointer group hover:border-[rgba(255,101,0,0.4)] transition-all"
            >
              {/* Name */}
              <div className="flex-1 min-w-0 flex items-center gap-3">
                {typeIcons[doc.type]}
                <span className="text-sm font-medium text-[#FAFAFA] truncate">{doc.name}</span>
              </div>

              {/* Type */}
              <span className="w-16 text-center text-xs text-[#A1A1AA] font-medium">{doc.type}</span>

              {/* Department */}
              <span className="w-24 text-center text-xs text-[#A1A1AA] hidden sm:block">{doc.department}</span>

              {/* Size */}
              <span className="w-20 text-center text-xs text-[#71717A] hidden md:block">{doc.size}</span>

              {/* Date */}
              <span className="w-24 text-center text-xs text-[#71717A] hidden lg:block">{doc.date}</span>

              {/* Health */}
              <div className="w-16 flex items-center justify-center">
                <span
                  className="text-xs font-bold"
                  style={{ color: getHealthColor(doc.healthScore) }}
                >
                  {doc.healthScore}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <FileText size={48} className="text-[#3F3F46] mb-4" />
          <p className="text-lg font-semibold text-[#A1A1AA]">No documents found</p>
          <p className="text-sm text-[#71717A] mt-1">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowUpload(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-heavy rounded-2xl p-6 w-full max-w-lg relative"
              style={{ boxShadow: 'var(--shadow-elevated)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowUpload(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[rgba(39,39,42,0.5)] transition-colors"
              >
                <X size={18} className="text-[#71717A]" />
              </button>

              <h2
                className="text-xl font-bold text-[#FAFAFA] mb-5"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Upload Documents
              </h2>

              <FileUpload
                onUpload={(files) => {
                  console.log('Uploaded:', files)
                  setShowUpload(false)
                }}
                onClose={() => setShowUpload(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
