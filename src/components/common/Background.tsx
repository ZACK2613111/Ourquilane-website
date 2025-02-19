"use client";

import { useEffect, useRef, useMemo } from "react";

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const COLORS = useMemo(() => ({
    node: "rgba(255, 255, 255, 0.8)",
    connection: "rgba(255, 255, 255, 0.15)",
    pulse: "rgba(255, 255, 255, 0.3)",
    background: "#000000"
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let animationId: number;
    let time = 0;

    // Simplified node class
    class Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;

      constructor(x: number, y: number) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
      }

      update(time: number) {
        // Smooth, circular motion
        const angle = time * 0.001;
        const radius = 30;
        this.x = this.baseX + Math.cos(angle) * radius;
        this.y = this.baseY + Math.sin(angle) * radius;
      }
    }

    // Create fewer nodes in a meaningful pattern
    let nodes: Node[] = [];
    const createNodes = (width: number, height: number) => {
      nodes = [];
      // Create nodes in a circular pattern
      const centerX = width / 2;
      const centerY = height / 2;
      const numNodes = 12; // Reduced number of nodes
      const radius = Math.min(width, height) * 0.3;

      for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        nodes.push(new Node(x, y));
      }

      // Add a center node
      nodes.push(new Node(centerX, centerY));
    };

    const drawConnections = (ctx: CanvasRenderingContext2D, time: number) => {
      const centerNode = nodes[nodes.length - 1];
      
      nodes.forEach((node, index) => {
        if (index === nodes.length - 1) return; // Skip center node

        // Draw connection to center
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(centerNode.x, centerNode.y);
        
        // Animated gradient
        const gradient = ctx.createLinearGradient(node.x, node.y, centerNode.x, centerNode.y);
        const offset = (time * 0.001 + index * 0.1) % 1;
        gradient.addColorStop(offset, COLORS.connection);
        gradient.addColorStop((offset + 0.5) % 1, COLORS.pulse);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.node;
        ctx.fill();
      });

      // Draw center node
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.node;
      ctx.fill();
    };

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      createNodes(width, height);
    };

    // Animation loop
    const animate = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Clear background
      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, width, height);

      // Update nodes
      nodes.forEach(node => node.update(time));

      // Draw connections with glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = COLORS.pulse;
      drawConnections(ctx, time);
      ctx.shadowBlur = 0;

      time++;
      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [COLORS]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default NeuralBackground;