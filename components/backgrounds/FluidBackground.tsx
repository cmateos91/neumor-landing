"use client";

import { useEffect, useRef, useCallback } from "react";

// Configuración del grid
const GRID_SIZE = 35;
const DOT_SIZE = 1.2;
const GLOW_RADIUS = 200;
const LINE_BASE_ALPHA = 0.12;
const LINE_GLOW_ALPHA = 0.5;
const DOT_BASE_ALPHA = 0.25;
const DOT_GLOW_ALPHA = 0.9;

interface Point {
  x: number;
  y: number;
}

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const targetMouseRef = useRef({ x: -1000, y: -1000 });
  const dimsRef = useRef({ width: 0, height: 0, cols: 0, rows: 0 });

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / GRID_SIZE) + 1;
      const rows = Math.ceil(height / GRID_SIZE) + 1;
      const offsetX = (width - (cols - 1) * GRID_SIZE) / 2;
      const offsetY = (height - (rows - 1) * GRID_SIZE) / 2;

      dimsRef.current = { width, height, cols, rows };

      pointsRef.current = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          pointsRef.current.push({
            x: offsetX + col * GRID_SIZE,
            y: offsetY + row * GRID_SIZE
          });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const { width, height, cols, rows } = dimsRef.current;
      const points = pointsRef.current;
      const mouse = mouseRef.current;
      const target = targetMouseRef.current;

      // Smooth mouse following
      mouse.x += (target.x - mouse.x) * 0.12;
      mouse.y += (target.y - mouse.y) * 0.12;

      // Background gradient (light/neumorphic)
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, "#f8f9fc");
      bgGradient.addColorStop(0.5, "#f0f2f7");
      bgGradient.addColorStop(1, "#f5f7fa");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Calculate glow intensity for each point
      const glowIntensities: number[] = [];
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const intensity = Math.max(0, 1 - dist / GLOW_RADIUS);
        glowIntensities.push(intensity * intensity); // Quadratic falloff for smoother glow
      }

      // Draw lines
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          const p = points[i];
          const intensity = glowIntensities[i];

          // Horizontal line
          if (col < cols - 1) {
            const pRight = points[i + 1];
            const intensityRight = glowIntensities[i + 1];
            const lineIntensity = Math.max(intensity, intensityRight);
            const alpha = LINE_BASE_ALPHA + lineIntensity * (LINE_GLOW_ALPHA - LINE_BASE_ALPHA);

            // Color for light theme (blue/indigo glow)
            const r = Math.round(120 - lineIntensity * 70);
            const g = Math.round(140 - lineIntensity * 40);
            const b = Math.round(180 + lineIntensity * 50);

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 0.5 + lineIntensity * 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pRight.x, pRight.y);
            ctx.stroke();
          }

          // Vertical line
          if (row < rows - 1) {
            const pBelow = points[i + cols];
            const intensityBelow = glowIntensities[i + cols];
            const lineIntensity = Math.max(intensity, intensityBelow);
            const alpha = LINE_BASE_ALPHA + lineIntensity * (LINE_GLOW_ALPHA - LINE_BASE_ALPHA);

            const r = Math.round(120 - lineIntensity * 70);
            const g = Math.round(140 - lineIntensity * 40);
            const b = Math.round(180 + lineIntensity * 50);

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 0.5 + lineIntensity * 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pBelow.x, pBelow.y);
            ctx.stroke();
          }
        }
      }

      // Draw dots with glow
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const intensity = glowIntensities[i];
        const alpha = DOT_BASE_ALPHA + intensity * (DOT_GLOW_ALPHA - DOT_BASE_ALPHA);
        const size = DOT_SIZE + intensity * 2;

        // Glow effect for bright dots (blue/indigo for light theme)
        if (intensity > 0.1) {
          const glowSize = size * 4;
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
          glow.addColorStop(0, `rgba(80, 100, 220, ${intensity * 0.25})`);
          glow.addColorStop(0.5, `rgba(100, 120, 200, ${intensity * 0.08})`);
          glow.addColorStop(1, "rgba(120, 140, 200, 0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Main dot (darker blue when glowing)
        const r = Math.round(150 - intensity * 100);
        const g = Math.round(160 - intensity * 60);
        const b = Math.round(190 + intensity * 40);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle center glow around mouse (soft blue for light theme)
      if (target.x > 0) {
        const centerGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, GLOW_RADIUS * 0.8
        );
        centerGlow.addColorStop(0, "rgba(80, 120, 200, 0.06)");
        centerGlow.addColorStop(0.5, "rgba(100, 130, 190, 0.02)");
        centerGlow.addColorStop(1, "rgba(120, 140, 180, 0)");
        ctx.fillStyle = centerGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, GLOW_RADIUS * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = e.clientX;
      targetMouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      targetMouseRef.current.x = -1000;
      targetMouseRef.current.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        targetMouseRef.current.x = e.touches[0].clientX;
        targetMouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      targetMouseRef.current.x = -1000;
      targetMouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
    />
  );
}
