import { motion } from 'motion/react'

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  padding = true,
  ...props
}) {
  return (
    <motion.div
      className={`rounded-2xl ${padding ? 'p-6' : ''} ${className}`}
      style={{
        background: 'rgba(44, 24, 16, 0.6)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(230, 209, 123, 0.25)',
      }}
      whileHover={hover ? {
        y: -2,
        borderColor: 'rgba(241, 228, 154, 0.4)',
        boxShadow: glow
          ? '0 0 20px rgba(241, 228, 154, 0.2), 0 8px 40px rgba(0,0,0,0.3)'
          : '0 4px 24px rgba(0,0,0,0.3)',
      } : undefined}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
