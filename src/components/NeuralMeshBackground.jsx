import { useEffect, useRef } from 'react'

export default function NeuralMeshBackground({
  className = '',
  opacity = 0.5,
  speed = 1
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const blobs = [
      {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 300 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 0.5 * speed,
        vy: (Math.random() - 0.5) * 0.5 * speed,
        color: 'rgba(255, 101, 0, 0.12)'
      },
      {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 250 + Math.random() * 150,
        vx: (Math.random() - 0.5) * 0.4 * speed,
        vy: (Math.random() - 0.5) * 0.4 * speed,
        color: 'rgba(30, 62, 98, 0.08)'
      },
      {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 350 + Math.random() * 150,
        vx: (Math.random() - 0.5) * 0.3 * speed,
        vy: (Math.random() - 0.5) * 0.3 * speed,
        color: 'rgba(255, 101, 0, 0.08)'
      }
    ]

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 101, 0, 0.03)'
      ctx.lineWidth = 1
      const gridSize = 40

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Update and draw blobs
      blobs.forEach((blob) => {
        blob.x += blob.vx
        blob.y += blob.vy

        // Bounce
        if (blob.x - blob.r < 0 || blob.x + blob.r > width) blob.vx *= -1
        if (blob.y - blob.r < 0 || blob.y + blob.r > height) blob.vy *= -1

        // Clamp inside boundary slightly
        if (blob.x < -blob.r) blob.x = -blob.r
        if (blob.x > width + blob.r) blob.x = width + blob.r
        if (blob.y < -blob.r) blob.y = -blob.r
        if (blob.y > height + blob.r) blob.y = height + blob.r

        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r)
        grad.addColorStop(0, blob.color)
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2)
        ctx.fill()
      })

      drawGrid()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [speed])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    />
  )
}
