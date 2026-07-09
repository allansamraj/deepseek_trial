import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { Upload, X, FileText } from 'lucide-react'

export default function FileUpload({ onUpload, onClose }) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    addFiles(selectedFiles)
  }

  const addFiles = (newFiles) => {
    const validExtensions = ['.pdf', '.docx', '.txt']
    const filtered = newFiles.filter((f) =>
      validExtensions.some((ext) => f.name.toLowerCase().endsWith(ext))
    )
    setFiles((prev) => [...prev, ...filtered])
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleUpload = async () => {
    if (files.length === 0) return
    setUploading(true)
    setProgress(0)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 80))
      setProgress(i)
    }

    setUploading(false)
    setProgress(100)
    if (onUpload) onUpload(files)
    setTimeout(() => {
      setFiles([])
      setProgress(0)
      if (onClose) onClose()
    }, 600)
  }

  return (
    <div className="space-y-5">
      {/* Drop Zone */}
      <div
        className={`drop-zone rounded-2xl p-8 ${isDragActive ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={isDragActive ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Upload size={48} className="text-[#71717A]" />
          </motion.div>
          <p className="font-medium text-[#FAFAFA]">Drag & drop files here</p>
          <p className="text-sm text-[#71717A]">or</p>
          <button
            type="button"
            className="btn-secondary"
            onClick={(e) => {
              e.stopPropagation()
              inputRef.current?.click()
            }}
          >
            Browse Files
          </button>
          <p className="text-xs text-[#52525B] mt-2">
            PDF, DOCX, TXT up to 50MB
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Selected Files List */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          <p className="text-sm font-medium text-[#A1A1AA]">
            Selected files ({files.length})
          </p>
          {files.map((file, index) => (
            <motion.div
              key={`${file.name}-${index}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(99,102,241,0.12)]">
                  <FileText size={16} className="text-indigo" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#FAFAFA] truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-[#71717A]">{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 rounded-lg hover:bg-[rgba(244,63,94,0.12)] transition-colors"
              >
                <X size={14} className="text-[#71717A] hover:text-[#F43F5E]" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full rounded-full h-1 overflow-hidden" style={{ background: 'var(--color-surface-3)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #6366F1, #06B6D4)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Upload Button */}
      {files.length > 0 && !uploading && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="btn-primary w-full flex items-center justify-center gap-2"
          onClick={handleUpload}
        >
          <Upload size={16} />
          Upload {files.length} file{files.length > 1 ? 's' : ''}
        </motion.button>
      )}
    </div>
  )
}
