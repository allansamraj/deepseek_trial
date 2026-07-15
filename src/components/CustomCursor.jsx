import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [clicked, setClicked] = useState(false)
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [magneticElement, setMagneticElement] = useState(null)

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect()
        const center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
        // Snap to center with a slight offset towards cursor (magnetic effect)
        const distanceX = e.clientX - center.x
        const distanceY = e.clientY - center.y
        cursorX.set(center.x + distanceX * 0.15)
        cursorY.set(center.y + distanceY * 0.15)
      } else {
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
      }
    }

    const handleMouseDown = () => {
      setClicked(true)
      setTimeout(() => setClicked(false), 200)
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, select, input, textarea, [role="button"], [data-magnetic]')
      if (target) {
        setIsHoveringInteractive(true)
        if (target.hasAttribute('data-magnetic')) {
          setMagneticElement(target)
        }
        const text = target.getAttribute('data-cursor-text')
        if (text) {
          setCursorText(text)
        }
      } else {
        setIsHoveringInteractive(false)
        setMagneticElement(null)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [magneticElement])

  return (
    <>
      {/* Magnetic Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: isHoveringInteractive ? 54 : 24,
          height: isHoveringInteractive ? 54 : 24,
          border: isHoveringInteractive ? '1.5px solid #06B6D4' : '1px solid rgba(99, 102, 241, 0.4)',
          background: isHoveringInteractive ? 'rgba(6, 182, 212, 0.05)' : 'transparent',
          boxShadow: isHoveringInteractive ? '0 0 15px rgba(6, 182, 212, 0.2)' : 'none',
        }}
        animate={{
          scale: clicked ? 0.8 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {cursorText && (
          <span className="absolute left-16 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-widest text-[#06B6D4] uppercase bg-black/80 px-2.5 py-1 rounded-md border border-[#06B6D4]/20 font-heading">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Solid Inner Dot */}
      <motion.div
        className="fixed w-1.5 h-1.5 bg-[#06B6D4] rounded-full pointer-events-none z-50 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 8px #06B6D4',
        }}
      />
    </>
  )
}
