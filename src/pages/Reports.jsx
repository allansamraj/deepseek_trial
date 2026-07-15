import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ClipboardList, Plus, FileText, Download, Play, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'

const initialReports = [
  { id: 'R1', title: 'Q3 Enterprise Knowledge Gap Audit', type: 'Gap Analysis', date: '2025-07-10', status: 'Completed', size: '1.4 MB' },
  { id: 'R2', title: 'Global Operations Compliance Review', type: 'Compliance', date: '2025-07-08', status: 'Completed', size: '2.8 MB' },
  { id: 'R3', title: 'IT Department Document Health Check', type: 'Health Audit', date: '2025-07-01', status: 'Completed', size: '940 KB' }
]

const reportTemplates = [
  { title: 'Knowledge Gap Analysis', desc: 'Identifies search queries that returned no answers or low confidence matches.', type: 'Gap Analysis' },
  { title: 'Department Health Report', desc: 'Measures completeness, readability, and updates of documents per department.', type: 'Health Audit' },
  { title: 'RAG Accuracy & Speed Audit', desc: 'Benchmarking response relevancy, latency, and source citation accuracy.', type: 'Performance' }
]

export default function Reports() {
  const [reports, setReports] = useState(initialReports)
  const [generatingTemplate, setGeneratingTemplate] = useState(null)

  const handleGenerate = (template) => {
    if (generatingTemplate) return
    setGeneratingTemplate(template.title)

    // Simulate PDF report generation
    setTimeout(() => {
      const newReport = {
        id: `R${Date.now()}`,
        title: `${template.title} - Auto Generated`,
        type: template.type,
        date: new Date().toISOString().split('T')[0],
        status: 'Completed',
        size: '1.2 MB'
      }
      setReports(prev => [newReport, ...prev])
      setGeneratingTemplate(null)
    }, 2500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F4F4F5]">Audit Reports</h1>
          <p className="text-sm text-[#A1A1AA]">Generate comprehensive PDF summaries of gaps, compliance, and document health.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates Grid */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-sm font-bold text-[#F4F4F5] uppercase tracking-wider">Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl flex flex-col justify-between h-44 hover:border-[#FF6500] transition-all duration-300"
                style={{ background: 'rgba(11, 25, 44, 0.6)', border: '1px solid rgba(30, 62, 98, 0.5)' }}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-semibold text-[#FF6500] uppercase tracking-wider">{template.type}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#F4F4F5]">{template.title}</h3>
                  <p className="text-xs text-[#71717A] mt-2 leading-relaxed">{template.desc}</p>
                </div>

                <button
                  onClick={() => handleGenerate(template)}
                  disabled={!!generatingTemplate}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 mt-4 rounded-xl text-xs font-semibold w-full cursor-pointer transition-colors"
                  style={{
                    background: generatingTemplate === template.title ? 'rgba(255,101,0,0.1)' : 'linear-gradient(135deg, #FF6500, #1E3E62)',
                    color: generatingTemplate === template.title ? '#FF8233' : 'white',
                    border: generatingTemplate === template.title ? '1px solid rgba(255,101,0,0.3)' : 'none'
                  }}
                >
                  {generatingTemplate === template.title ? (
                    <>
                      <RefreshCw size={12} className="animate-spin" /> Generating PDF...
                    </>
                  ) : (
                    <>
                      <Play size={12} fill="white" /> Generate Report
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="rounded-2xl p-6 flex flex-col h-full" style={{ background: 'rgba(11, 25, 44, 0.6)', border: '1px solid rgba(30, 62, 98, 0.5)' }}>
          <h2 className="text-sm font-bold text-[#F4F4F5] uppercase tracking-wider mb-4">Generated Audits</h2>
          
          <div className="space-y-3 overflow-y-auto max-h-[350px]">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl space-y-3"
                style={{ background: 'rgba(24, 24, 27, 0.4)', border: '1px solid rgba(30, 62, 98, 0.3)' }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(255,101,0,0.15)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText size={16} className="text-[#FF6500]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-[#F4F4F5] truncate">{report.title}</h4>
                    <span className="text-[10px] text-[#71717A]">{report.type} • {report.size}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[rgba(30,62,98,0.15)] pt-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#FF6500] font-semibold">
                    <CheckCircle2 size={12} />
                    <span>{report.status}</span>
                  </div>
                  <button className="flex items-center gap-1 text-[10px] font-semibold text-[#A1A1AA] hover:text-white transition-colors cursor-pointer">
                    <Download size={12} /> Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
