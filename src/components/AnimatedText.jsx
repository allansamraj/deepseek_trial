import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

export default function AnimatedText({
  text = '',
  mode = 'words',
  delay = 0,
  speed = 100,
  className = '',
  as = 'span'
}) {
  const Component = as

  if (mode === 'typewriter') {
    const [displayed, setDisplayed] = useState('')

    useEffect(() => {
      let timer
      let currentIndex = 0
      const startTimer = setTimeout(() => {
        timer = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayed((prev) => prev + text[currentIndex])
            currentIndex++
          } else {
            clearInterval(timer)
          }
        }, speed)
      }, delay * 1000)

      return () => {
        clearTimeout(startTimer)
        clearInterval(timer)
      }
    }, [text, delay, speed])

    return (
      <Component className={className}>
        {displayed}
        <span className="animate-pulse-glow text-[#6366F1] font-bold">|</span>
      </Component>
    )
  }

  if (mode === 'words') {
    const words = text.split(' ')
    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: speed / 1000,
          delayChildren: delay
        }
      }
    }
    const child = {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          damping: 25,
          stiffness: 100
        }
      }
    }

    return (
      <Component>
        <motion.span
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`inline-block ${className}`}
        >
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              variants={child}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    )
  }

  if (mode === 'characters') {
    const chars = Array.from(text)
    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: speed / 1000,
          delayChildren: delay
        }
      }
    }
    const child = {
      hidden: { opacity: 0, y: 5 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.2
        }
      }
    }

    return (
      <Component>
        <motion.span
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`inline-block ${className}`}
        >
          {chars.map((char, idx) => (
            <motion.span
              key={idx}
              variants={child}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    )
  }

  return <Component className={className}>{text}</Component>
}
