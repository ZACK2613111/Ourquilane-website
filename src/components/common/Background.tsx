"use client"

import { useEffect, useRef, useMemo } from "react"

const SimpleTechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const COLORS = useMemo(() => ({
    violet: "rgba(154, 92, 228, 0.15)",
    yellow: "rgba(233, 205, 42, 0.15)",
    background: "#0A081B"
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let animationId: number
    let time = 0

    // Draw tech grid with subtle movement
    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const gridSize = 80 
      const timeOffset = time * 0.005 

      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        const offset = Math.sin(x * 0.01 + timeOffset) * 2
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + offset, height)
        ctx.strokeStyle = x % (gridSize * 2) === 0 ? COLORS.violet : COLORS.yellow
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Horizontal lines with more spacing
      for (let y = 0; y < height; y += gridSize * 1.5) {
        const offset = Math.cos(y * 0.01 + timeOffset) * 2 
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y + offset)
        ctx.strokeStyle = y % (gridSize * 2) === 0 ? COLORS.yellow : COLORS.violet
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.scale(dpr, dpr)
    }

    const animate = () => {
      const width = canvas.width / dpr
      const height = canvas.height / dpr

      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, COLORS.background)
      gradient.addColorStop(1, "#161233")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      drawGrid(ctx, width, height)

      time++
      animationId = requestAnimationFrame(animate)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [COLORS])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
}


export default SimpleTechBackground