export default function Badge({ children, variant = 'info', className = '' }) {
  const styles = {
    success: {
      background: 'rgba(16, 185, 129, 0.15)',
      color: '#34D399',
      border: '1px solid rgba(16, 185, 129, 0.25)',
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.15)',
      color: '#F59E0B',
      border: '1px solid rgba(245, 158, 11, 0.25)',
    },
    error: {
      background: 'rgba(244, 63, 94, 0.15)',
      color: '#F43F5E',
      border: '1px solid rgba(244, 63, 94, 0.25)',
    },
    info: {
      background: 'rgba(99, 102, 241, 0.15)',
      color: '#818CF8',
      border: '1px solid rgba(99, 102, 241, 0.25)',
    },
    cyan: {
      background: 'rgba(6, 182, 212, 0.15)',
      color: '#22D3EE',
      border: '1px solid rgba(6, 182, 212, 0.25)',
    },
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}
      style={styles[variant] || styles.info}
    >
      {children}
    </span>
  )
}
