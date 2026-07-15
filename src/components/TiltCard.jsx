import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

export default function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  glowColor = 'rgba(99, 102, 241, 0.15)',
  ...props
}) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for tracking cursor relative to card size
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  // Spring animations for smooth, natural movement
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  // Transform coordinates into degrees of rotation
  const rotateX = useTransform(ySpring, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(xSpring, [0, 1], [-maxTilt, maxTilt])

  // Radial gradient background for mouse-following glow
  const glowX = useTransform(xSpring, [0, 1], ['0%', '100%'])
  const glowY = useTransform(ySpring, [0, 1], ['0%', '100%'])

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const relativeX = (e.clientX - rect.left) / rect.width
    const relativeY = (e.clientY - rect.top) / rect.height
    x.set(relativeX)
    y.set(relativeY)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${className}`}
      style={{
        background: 'rgba(17, 17, 24, 0.65)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderColor: isHovered ? 'rgba(99, 102, 241, 0.35)' : 'rgba(63, 63, 70, 0.4)',
        boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.4)' : 'none',
        transformStyle: 'preserve-3d',
        rotateX: rotateX,
        rotateY: rotateY,
        perspective: 1000
      }}
      {...props}
    >
      {/* Interactive Light Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle 200px at ${gx} ${gy}, ${glowColor}, transparent 80%)`
          )
        }}
      />
      
      {/* Content wrapper preserving 3D depth */}
      <div style={{ transform: 'translateZ(10px)' }}>
        {children}
      </div>
    </motion.div>
  )
}
