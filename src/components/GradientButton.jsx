import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

export default function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  className = '',
  glowing = false
}) {
  const [ripples, setRipples] = useState([])

  const createRipple = (e) => {
    if (disabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const size = Math.max(rect.width, rect.height) * 2

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    }

    setRipples((prev) => [...prev, newRipple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)

    if (onClick) onClick(e)
  }

  const baseStyles = 'relative overflow-hidden inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 font-heading cursor-pointer select-none'

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base'
  }

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white border-none hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]',
    secondary: 'bg-[#18181B] text-[#F4F4F5] border border-[rgba(63,63,70,0.5)] hover:border-[#6366F1] hover:bg-[#1E1E24]',
    outline: 'bg-transparent text-[#6366F1] border-2 border-[#6366F1] hover:bg-[rgba(99,102,241,0.05)]'
  }

  const glowStyle = glowing
    ? {
        animation: 'pulse-glow 2s infinite'
      }
    : {}

  const buttonProps = {
    className: `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`,
    onClick: createRipple,
    style: glowStyle,
    whileHover: { scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 },
    whileTap: { scale: disabled ? 1 : 0.98 }
  }

  const iconMarkup = Icon && <Icon size={size === 'lg' ? 20 : 16} className={iconPosition === 'left' ? 'mr-2' : 'ml-2'} />

  const content = (
    <>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple absolute bg-white/20 rounded-full pointer-events-none"
          style={{
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
            transform: 'scale(0)',
            animation: 'ripple-expand 0.6s ease-out forwards'
          }}
        />
      ))}
      {Icon && iconPosition === 'left' && iconMarkup}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && iconMarkup}
    </>
  )

  if (href) {
    return (
      <Link to={href} className="inline-block">
        <motion.div {...buttonProps}>{content}</motion.div>
      </Link>
    )
  }

  return (
    <motion.button disabled={disabled} {...buttonProps}>
      {content}
    </motion.button>
  )
}
