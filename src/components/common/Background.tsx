"use client";

import { useEffect, useRef, useMemo } from "react";

const SimpleTechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const COLORS = useMemo(() => ({
    violet: "rgba(154, 92, 228, 0.08)", // More subtle opacity
    yellow: "rgba(233, 205, 42, 0.08)", // More subtle opacity
    background: "#0A081B"
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let animationId: number;
    let time = 0;

    // Draw tech grid with subtle movement
    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const gridSize = 100; // Even larger grid for more minimalist look
      const timeOffset = time * 0.0003; // Slower animation for subtlety

      // Apply slight blur for softer lines
      ctx.shadowColor = "rgba(154, 92, 228, 0.2)";
      ctx.shadowBlur = 5;

      // Vertical lines
      for (let x = 0; x < width + gridSize; x += gridSize) {
        const offset = Math.sin(x * 0.008 + timeOffset) * 3;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + offset, height);
        ctx.strokeStyle = x % (gridSize * 3) === 0 ? COLORS.violet : COLORS.yellow;
        ctx.lineWidth = 0.4;
        ctx.globalAlpha = 0.3 + Math.sin(timeOffset * 2 + x * 0.01) * 0.15;
        ctx.stroke();
      }

      // Horizontal lines with more spacing
      for (let y = 0; y < height + gridSize; y += gridSize * 2) {
        const offset = Math.cos(y * 0.008 + timeOffset) * 3;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + offset);
        ctx.strokeStyle = y % (gridSize * 3) === 0 ? COLORS.yellow : COLORS.violet;
        ctx.lineWidth = 0.4;
        ctx.globalAlpha = 0.3 + Math.sin(timeOffset * 2 + y * 0.01) * 0.15;
        ctx.stroke();
      }

      // Reset shadow and alpha
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    // Create floating particles
    const particles: { x: number; y: number; size: number; speed: number; hue: number }[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        hue: Math.random() > 0.5 ? 60 : 270 // Yellow or purple hue
      });
    }

    const drawParticles = (ctx: CanvasRenderingContext2D) => {
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${0.1 + Math.sin(time * 0.01) * 0.05})`;
        ctx.fill();
        
        // Move particles upward slowly
        p.y -= p.speed;
        if (p.y < -10) p.y = window.innerHeight + 10;
        
        // Add slight horizontal drift
        p.x += Math.sin(time * 0.001 + p.y * 0.01) * 0.3;
      });
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
    };

    // Animation loop
    const animate = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Clear and draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, COLORS.background);
      gradient.addColorStop(1, "#161233");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      drawGrid(ctx, width, height);
      
      // Draw particles
      drawParticles(ctx);

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

export default SimpleTechBackground;