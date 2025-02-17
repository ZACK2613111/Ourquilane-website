"use client"

import { useEffect, useRef, useMemo } from "react"

interface DataNode {
  x: number
  y: number
  size: number
  connected: boolean
  pulsePhase: number
  speed: number
}

interface DataFlow {
  startX: number
  startY: number
  endX: number
  endY: number
  progress: number
  color: string
}

const TechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const COLORS = useMemo(() => ({
    violet: "rgba(154, 92, 228, 0.2)",  // #9A5CE4 20% opacity
    yellow: "rgba(233, 205, 42, 0.4)",  // #E9CD2A 40% opacity
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
    
    // Data structures
    let nodes: DataNode[] = []
    let dataFlows: DataFlow[] = []

    // Initialize nodes
    const initNodes = (width: number, height: number) => {
      const nodeCount = 20
      return Array(nodeCount).fill(null).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 2,
        connected: false,
        pulsePhase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.2 + 0.1
      }))
    }

    // Create data flow effect
    const createDataFlow = (startNode: DataNode, endNode: DataNode) => {
      return {
        startX: startNode.x,
        startY: startNode.y,
        endX: endNode.x,
        endY: endNode.y,
        progress: 0,
        color: Math.random() > 0.5 ? COLORS.violet : COLORS.yellow
      }
    }

    // Draw nodes and their connections
    const drawNodes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      nodes.forEach((node, i) => {
        // Update node position with smooth movement
        node.x += Math.sin(time * 0.001 + node.pulsePhase) * node.speed
        node.y += Math.cos(time * 0.001 + node.pulsePhase) * node.speed
        
        // Keep nodes within bounds
        node.x = (node.x + width) % width
        node.y = (node.y + height) % height

        // Draw node with pulse effect
        const pulse = Math.sin(time * 0.003 + node.pulsePhase) * 0.5 + 1
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? COLORS.violet : COLORS.yellow
        ctx.fill()

        // Draw node glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.size * 4
        )
        gradient.addColorStop(0, i % 2 === 0 ? COLORS.violet : COLORS.yellow)
        gradient.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = gradient
        ctx.fillRect(node.x - node.size * 4, node.y - node.size * 4, node.size * 8, node.size * 8)
      })
    }

    // Draw data flow animations
    const drawDataFlows = (ctx: CanvasRenderingContext2D) => {
      dataFlows = dataFlows.filter(flow => {
        if (flow.progress >= 1) return false

        const x = flow.startX + (flow.endX - flow.startX) * flow.progress
        const y = flow.startY + (flow.endY - flow.startY) * flow.progress

        // Draw flowing particle
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = flow.color
        ctx.fill()

        // Draw trail
        ctx.beginPath()
        ctx.moveTo(flow.startX, flow.startY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = flow.color
        ctx.lineWidth = 1
        ctx.stroke()

        flow.progress += 0.02
        return true
      })
    }

    // Create new data flows periodically
    const updateDataFlows = () => {
      if (Math.random() < 0.05 && dataFlows.length < 10) {
        const startNode = nodes[Math.floor(Math.random() * nodes.length)]
        const endNode = nodes[Math.floor(Math.random() * nodes.length)]
        if (startNode !== endNode) {
          dataFlows.push(createDataFlow(startNode, endNode))
        }
      }
    }

    // Draw tech grid
    const drawTechGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const gridSize = 50
      const timeOffset = time * 0.001

      ctx.strokeStyle = COLORS.violet
      ctx.lineWidth = 0.5

      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        const offset = Math.sin(x * 0.01 + timeOffset) * 5
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + offset, height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        const offset = Math.cos(y * 0.01 + timeOffset) * 5
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y + offset)
        ctx.stroke()
      }
    }

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.scale(dpr, dpr)
      nodes = initNodes(width, height)
    }

    // Animation loop
    const animate = () => {
      const width = canvas.width / dpr
      const height = canvas.height / dpr

      // Clear and draw background
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, COLORS.background)
      gradient.addColorStop(1, "#161233")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw all elements
      drawTechGrid(ctx, width, height)
      drawNodes(ctx, width, height)
      drawDataFlows(ctx)
      updateDataFlows()

      time++
      animationId = requestAnimationFrame(animate)
    }

    // Initialize
    handleResize()
    window.addEventListener('resize', handleResize)
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [COLORS])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
}

export default TechBackground