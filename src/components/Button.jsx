import { useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { Loader2 } from 'lucide-react'

const variants = {
  primary: {
    background: 'linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)',
    color: 'white',
    border: 'none',
  },
  secondary: {
    background: '#27272A',
    color: '#FAFAFA',
    border: '1px solid rgba(63, 63, 70, 0.5)',
  },
  ghost: {
    background: 'transparent',
    color: '#A1A1AA',
    border: 'none',
  },
  danger: {
    background: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
    color: 'white',
    border: 'none',
  },
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  onClick,
  ...props
}) {
  const buttonRef = useRef(null)

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  }

  const handleClick = useCallback((e) => {
    if (disabled || loading) return

    // Ripple effect
    const button = buttonRef.current
    if (button) {
      const rect = button.getBoundingClientRect()
      const ripple = document.createElement('span')
      const size = Math.max(rect.width, rect.height)
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`
      ripple.className = 'ripple'
      button.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    }

    onClick?.(e)
  }, [disabled, loading, onClick])

  const style = variants[variant]

  return (
    <motion.button
      ref={buttonRef}
      className={`
        inline-flex items-center justify-center font-semibold rounded-xl
        relative overflow-hidden cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        ...style,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
      whileHover={!disabled ? { y: -1, scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
      {children}
    </motion.button>
  )
}
