"use client"

import { useEffect, useRef, useMemo } from "react"

interface DataNode {
  x: number
  y: number
  size: number
  connected: boolean
  pulsePhase: number
  speed: number
  depth: number
}

interface DataFlow {
  startX: number
  startY: number
  endX: number
  endY: number
  progress: number
  color: string
  size: number
}

const TechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const COLORS = useMemo(() => ({
    violet: "rgba(154, 92, 228, 0.6)",
    violetFade: "rgba(154, 92, 228, 0.3)",
    yellow: "rgba(250, 210, 42, 0.5)",
    yellowFade: "rgba(250, 210, 42, 0.3)",
    background: "#030711",
    stars: "#ffffff"
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let animationId: number
    let time = 0
    
    let nodes: DataNode[] = []
    let dataFlows: DataFlow[] = []
    let stars: { x: number; y: number; size: number; brightness: number }[] = []

    const initStars = (width: number, height: number) => {
      return Array(200).fill(null).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5,
        brightness: Math.random()
      }))
    }

    const initNodes = (width: number, height: number) => {
      return Array(25).fill(null).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 2,
        connected: false,
        pulsePhase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.15 + 0.05,
        depth: Math.random() * 0.5 + 0.5
      }))
    }

    const createDataFlow = (startNode: DataNode, endNode: DataNode) => {
      return {
        startX: startNode.x,
        startY: startNode.y,
        endX: endNode.x,
        endY: endNode.y,
        progress: 0,
        color: Math.random() > 0.5 ? COLORS.violet : COLORS.yellow,
        size: Math.random() * 2 + 1
      }
    }

    const drawStars = (ctx: CanvasRenderingContext2D) => {
      stars.forEach(star => {
        const twinkle = Math.sin(time * 0.002 + star.brightness * 10) * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * twinkle, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + star.brightness * 0.7 * twinkle})`
        ctx.fill()
      })
    }

    const drawNodes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      nodes.forEach((node, i) => {
        const parallaxSpeed = node.speed * node.depth
        node.x += Math.sin(time * 0.001 + node.pulsePhase) * parallaxSpeed
        node.y += Math.cos(time * 0.001 + node.pulsePhase) * parallaxSpeed
        
        node.x = (node.x + width) % width
        node.y = (node.y + height) % height

        const pulse = Math.sin(time * 0.002 + node.pulsePhase) * 0.3 + 1
        
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.size * 6
        )
        const nodeColor = i % 2 === 0 ? COLORS.violet : COLORS.yellow
        const nodeFadeColor = i % 2 === 0 ? COLORS.violetFade : COLORS.yellowFade
        
        gradient.addColorStop(0, nodeColor)
        gradient.addColorStop(0.5, nodeFadeColor)
        gradient.addColorStop(1, "rgba(0,0,0,0)")
        
        ctx.fillStyle = gradient
        ctx.fillRect(node.x - node.size * 6, node.y - node.size * 6, node.size * 12, node.size * 12)

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.fill()
      })
    }

    const drawDataFlows = (ctx: CanvasRenderingContext2D) => {
      dataFlows = dataFlows.filter(flow => {
        if (flow.progress >= 1) return false

        const x = flow.startX + (flow.endX - flow.startX) * flow.progress
        const y = flow.startY + (flow.endY - flow.startY) * flow.progress

        const particleGlow = ctx.createRadialGradient(x, y, 0, x, y, flow.size * 4)
        particleGlow.addColorStop(0, flow.color)
        particleGlow.addColorStop(1, "rgba(0,0,0,0)")
        
        ctx.fillStyle = particleGlow
        ctx.fillRect(x - flow.size * 4, y - flow.size * 4, flow.size * 8, flow.size * 8)

        ctx.beginPath()
        ctx.arc(x, y, flow.size, 0, Math.PI * 2)
        ctx.fillStyle = flow.color
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(flow.startX, flow.startY)
        ctx.lineTo(x, y)
        const gradient = ctx.createLinearGradient(flow.startX, flow.startY, x, y)
        const fadeColor = flow.color === COLORS.violet ? COLORS.violetFade : COLORS.yellowFade
        gradient.addColorStop(0, fadeColor)
        gradient.addColorStop(1, flow.color)
        ctx.strokeStyle = gradient
        ctx.lineWidth = flow.size * 0.5
        ctx.stroke()

        flow.progress += 0.01
        return true
      })
    }

    const updateDataFlows = () => {
      if (Math.random() < 0.03 && dataFlows.length < 15) {
        const startNode = nodes[Math.floor(Math.random() * nodes.length)]
        const endNode = nodes[Math.floor(Math.random() * nodes.length)]
        if (startNode !== endNode) {
          dataFlows.push(createDataFlow(startNode, endNode))
        }
      }
    }

    const drawTechGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const timeOffset = time * 0.0005
      ctx.strokeStyle = COLORS.violetFade
      ctx.lineWidth = 0.5

      for (let x = 0; x < width; x += 70) {
        const offset = Math.sin(x * 0.01 + timeOffset) * 3
        const perspective = Math.sin(x / width * Math.PI) * 10
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + offset + perspective, height)
        ctx.stroke()
      }

      for (let y = 0; y < height; y += 70) {
        const offset = Math.cos(y * 0.01 + timeOffset) * 3
        const perspective = Math.sin(y / height * Math.PI) * 10
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y + offset + perspective)
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
      nodes = initNodes(width, height)
      stars = initStars(width, height)
    }

    const animate = () => {
      const width = canvas.width / dpr
      const height = canvas.height / dpr

      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, COLORS.background)
      gradient.addColorStop(1, "#050B18")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      drawStars(ctx)
      drawTechGrid(ctx, width, height)
      drawNodes(ctx, width, height)
      drawDataFlows(ctx)
      updateDataFlows()

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

export default TechBackground