"use client";

import { useEffect, useRef, useCallback } from "react";

// Configuración optimizada para rendimiento
const PARTICLE_COUNT = 600;
const MAX_WAVES = 5;

interface Wave {
  x: number;
  y: number;
  radius: number;
  strength: number;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const lastTimeRef = useRef<number>(0);
  const lastWaveTimeRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Setup canvas con DPR limitado para móvil
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Reiniciar partículas en nueva posición
      initParticles();
    };

    // Inicializar partículas
    const initParticles = () => {
      particlesRef.current = [];
      const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (width / height)));
      const rows = Math.ceil(PARTICLE_COUNT / cols);
      const spacingX = width / cols;
      const spacingY = height / rows;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * spacingX + spacingX / 2 + (Math.random() - 0.5) * spacingX * 0.4;
        const y = row * spacingY + spacingY / 2 + (Math.random() - 0.5) * spacingY * 0.4;

        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          size: 2 + Math.random() * 2,
          alpha: 0.3 + Math.random() * 0.3
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Loop de animación optimizado
    const animate = (timestamp: number) => {
      const deltaTime = Math.min(timestamp - lastTimeRef.current, 32); // Cap at ~30fps min
      lastTimeRef.current = timestamp;

      // Clear con color de fondo
      ctx.fillStyle = "rgba(245, 247, 250, 1)";
      ctx.fillRect(0, 0, width, height);

      const waves = wavesRef.current;
      const particles = particlesRef.current;

      // Actualizar ondas
      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].radius += 4;
        waves[i].strength *= 0.97;
        if (waves[i].strength < 0.01 || waves[i].radius > Math.max(width, height)) {
          waves.splice(i, 1);
        }
      }

      // Dibujar y actualizar partículas
      ctx.fillStyle = "rgba(180, 195, 220, 0.6)";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Calcular influencia de ondas
        let forceX = 0;
        let forceY = 0;

        for (let j = 0; j < waves.length; j++) {
          const w = waves[j];
          const dx = p.x - w.x;
          const dy = p.y - w.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const waveWidth = 100;
          const distToWave = Math.abs(dist - w.radius);

          if (distToWave < waveWidth && dist > 1) {
            const intensity = (1 - distToWave / waveWidth) * w.strength;
            forceX += (dx / dist) * intensity * 2;
            forceY += (dy / dist) * intensity * 2;
          }
        }

        // Fuerza de retorno al origen
        forceX += (p.baseX - p.x) * 0.03;
        forceY += (p.baseY - p.y) * 0.03;

        // Aplicar física
        p.vx = (p.vx + forceX) * 0.9;
        p.vy = (p.vy + forceY) * 0.9;
        p.x += p.vx;
        p.y += p.vy;

        // Calcular desplazamiento para efecto visual
        const displacement = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const dynamicAlpha = Math.min(p.alpha + displacement * 0.1, 0.8);
        const dynamicSize = p.size + Math.min(displacement * 0.5, 3);

        // Dibujar partícula simple (sin gradiente = mucho más rápido)
        ctx.globalAlpha = dynamicAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dynamicSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Event handlers
    const addWave = (x: number, y: number, strength: number) => {
      if (wavesRef.current.length < MAX_WAVES) {
        wavesRef.current.push({ x, y, radius: 0, strength });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastWaveTimeRef.current > 100) {
        lastWaveTimeRef.current = now;
        addWave(e.clientX, e.clientY, 0.8);
      }
    };

    const handleClick = (e: MouseEvent) => {
      addWave(e.clientX, e.clientY, 2.0);
    };

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        const now = Date.now();
        if (now - lastWaveTimeRef.current > 150) {
          lastWaveTimeRef.current = now;
          addWave(touch.clientX, touch.clientY, 1.0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchstart", handleTouch);
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
      style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 50%, #f0f3f7 100%)" }}
    />
  );
}
