"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Configuración de partículas - ajustable para rendimiento
const PARTICLE_COUNT = 12000;
const WAVE_SPEED = 3.5;       // Velocidad de expansión de ondas
const WAVE_DECAY = 0.985;     // Decaimiento más lento para ondas más duraderas
const WAVE_STRENGTH = 4.0;    // Fuerza del efecto en partículas

interface Wave {
  x: number;
  y: number;
  radius: number;
  strength: number;
  time: number;
}

export function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const wavesRef = useRef<Wave[]>([]);
  const particlesRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const basePositionsRef = useRef<Float32Array | null>(null);
  const animationRef = useRef<number | null>(null);

  const initCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      setSupported(false);
      return;
    }

    setSupported(true);

    // Configurar canvas
    const dpr = Math.min(window.devicePixelRatio, 2);
    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Inicializar partículas en grid con variación
    const particles = new Float32Array(PARTICLE_COUNT * 2);
    const velocities = new Float32Array(PARTICLE_COUNT * 2);
    const basePositions = new Float32Array(PARTICLE_COUNT * 2);

    const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (width / height)));
    const rows = Math.ceil(PARTICLE_COUNT / cols);
    const spacingX = width / cols;
    const spacingY = height / rows;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Posición base con pequeña variación aleatoria
      const baseX = col * spacingX + spacingX / 2 + (Math.random() - 0.5) * spacingX * 0.3;
      const baseY = row * spacingY + spacingY / 2 + (Math.random() - 0.5) * spacingY * 0.3;

      particles[i * 2] = baseX;
      particles[i * 2 + 1] = baseY;
      basePositions[i * 2] = baseX;
      basePositions[i * 2 + 1] = baseY;
      velocities[i * 2] = 0;
      velocities[i * 2 + 1] = 0;
    }

    particlesRef.current = particles;
    velocitiesRef.current = velocities;
    basePositionsRef.current = basePositions;

    // Colores neumórficos más visibles
    const colors = [
      "rgba(160, 180, 210, 0.8)",  // Gris azulado
      "rgba(140, 165, 200, 0.75)", // Azul suave
      "rgba(180, 195, 220, 0.85)", // Gris claro azulado
      "rgba(150, 175, 210, 0.7)",  // Azul grisáceo
    ];

    // Función para calcular influencia de ondas en una posición
    const calculateWaveInfluence = (x: number, y: number, time: number) => {
      let totalDx = 0;
      let totalDy = 0;

      const waves = wavesRef.current;
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        const dx = x - wave.x;
        const dy = y - wave.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Onda concéntrica expandiéndose
        const waveRadius = wave.radius;
        const waveWidth = 120; // Ancho de la onda más amplio

        // Distancia al frente de onda
        const distToWave = Math.abs(dist - waveRadius);

        if (distToWave < waveWidth) {
          // Intensidad basada en distancia al frente de onda (forma de campana)
          const intensity = Math.cos((distToWave / waveWidth) * Math.PI * 0.5);
          const strength = wave.strength * intensity;

          // Dirección radial desde el centro de la onda
          if (dist > 0.1) {
            const nx = dx / dist;
            const ny = dy / dist;

            // Movimiento ondulatorio (seno para efecto de subir/bajar)
            const phase = (dist - waveRadius) * 0.05 + time * 2;
            const waveMotion = Math.sin(phase) * strength;

            totalDx += nx * waveMotion;
            totalDy += ny * waveMotion;
          }
        }
      }

      return { dx: totalDx, dy: totalDy };
    };

    // Loop de animación
    const animate = (timestamp: number) => {
      const time = timestamp * 0.001;

      ctx.clearRect(0, 0, width, height);

      // Fondo con gradiente neumórfico sutil
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(240, 243, 248, 0.3)");
      gradient.addColorStop(0.5, "rgba(235, 238, 245, 0.2)");
      gradient.addColorStop(1, "rgba(245, 247, 250, 0.3)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current!;
      const velocities = velocitiesRef.current!;
      const basePositions = basePositionsRef.current!;
      const waves = wavesRef.current;

      // Actualizar ondas
      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].radius += WAVE_SPEED; // Expandir onda
        waves[i].strength *= WAVE_DECAY; // Decaer fuerza

        // Eliminar ondas muy débiles o muy grandes
        if (waves[i].strength < 0.05 || waves[i].radius > Math.max(width, height) * 2) {
          waves.splice(i, 1);
        }
      }

      // Actualizar y dibujar partículas
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 2;
        const x = particles[idx];
        const y = particles[idx + 1];
        const baseX = basePositions[idx];
        const baseY = basePositions[idx + 1];

        // Influencia de ondas
        const waveInfluence = calculateWaveInfluence(x, y, time);

        // Movimiento orgánico base (muy sutil)
        const noiseX = Math.sin(time * 0.3 + i * 0.01) * 0.15;
        const noiseY = Math.cos(time * 0.25 + i * 0.012) * 0.15;

        // Fuerza de retorno a posición base (resorte suave)
        const returnX = (baseX - x) * 0.02;
        const returnY = (baseY - y) * 0.02;

        // Actualizar velocidad
        velocities[idx] += waveInfluence.dx * WAVE_STRENGTH + returnX + noiseX * 0.1;
        velocities[idx + 1] += waveInfluence.dy * WAVE_STRENGTH + returnY + noiseY * 0.1;

        // Fricción
        velocities[idx] *= 0.92;
        velocities[idx + 1] *= 0.92;

        // Actualizar posición
        particles[idx] += velocities[idx];
        particles[idx + 1] += velocities[idx + 1];

        // Calcular desplazamiento desde base para determinar color/tamaño
        const displacement = Math.sqrt(
          Math.pow(particles[idx] - baseX, 2) +
          Math.pow(particles[idx + 1] - baseY, 2)
        );

        // Tamaño dinámico basado en desplazamiento
        const baseSize = 3;
        const size = baseSize + Math.min(displacement * 0.15, 5);

        // Color basado en desplazamiento (más desplazado = más visible)
        const alpha = Math.min(0.5 + displacement * 0.05, 1.0);
        const colorIndex = i % colors.length;

        // Dibujar partícula con efecto de brillo suave
        ctx.beginPath();
        ctx.arc(particles[idx], particles[idx + 1], size, 0, Math.PI * 2);

        // Gradiente radial para efecto suave
        const particleGradient = ctx.createRadialGradient(
          particles[idx], particles[idx + 1], 0,
          particles[idx], particles[idx + 1], size
        );
        particleGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`);
        particleGradient.addColorStop(0.5, colors[colorIndex].replace(/[\d.]+\)$/, `${alpha})`));
        particleGradient.addColorStop(1, `rgba(200, 210, 225, 0)`);

        ctx.fillStyle = particleGradient;
        ctx.fill();
      }

      // Efecto de conexión entre partículas cercanas (muy sutil)
      ctx.strokeStyle = "rgba(200, 210, 225, 0.08)";
      ctx.lineWidth = 0.5;

      // Solo conectar algunas partículas para rendimiento
      for (let i = 0; i < PARTICLE_COUNT; i += 20) {
        const idx = i * 2;
        const x1 = particles[idx];
        const y1 = particles[idx + 1];

        for (let j = i + 20; j < Math.min(i + 100, PARTICLE_COUNT); j += 20) {
          const jdx = j * 2;
          const x2 = particles[jdx];
          const y2 = particles[jdx + 1];

          const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

          if (dist < 50) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Manejar movimiento del mouse - crear ondas
    // Usamos window para capturar eventos incluso cuando hay capas encima
    let lastWaveTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastWaveTime < 50) return; // Limitar frecuencia de ondas
      lastWaveTime = now;

      // Usar coordenadas directas del viewport
      const x = e.clientX;
      const y = e.clientY;

      // Crear onda pequeña al mover
      wavesRef.current.push({
        x,
        y,
        radius: 0,
        strength: 1.2,
        time: now
      });

      // Limitar número de ondas activas
      if (wavesRef.current.length > 20) {
        wavesRef.current.shift();
      }
    };

    // Click - crear onda grande
    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      wavesRef.current.push({
        x,
        y,
        radius: 0,
        strength: 4.0,
        time: Date.now()
      });
    };

    // Touch support
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;

      const now = Date.now();
      if (now - lastWaveTime < 60) return;
      lastWaveTime = now;

      wavesRef.current.push({
        x,
        y,
        radius: 0,
        strength: 1.5,
        time: now
      });

      if (wavesRef.current.length > 15) {
        wavesRef.current.shift();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;

      wavesRef.current.push({
        x,
        y,
        radius: 0,
        strength: 3.5,
        time: Date.now()
      });
    };

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      canvas.width = newWidth * dpr;
      canvas.height = newHeight * dpr;
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;
      ctx.scale(dpr, dpr);

      // Recalcular posiciones base
      const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (newWidth / newHeight)));
      const rows = Math.ceil(PARTICLE_COUNT / cols);
      const spacingX = newWidth / cols;
      const spacingY = newHeight / rows;

      const particles = particlesRef.current!;
      const basePositions = basePositionsRef.current!;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const baseX = col * spacingX + spacingX / 2;
        const baseY = row * spacingY + spacingY / 2;

        basePositions[i * 2] = baseX;
        basePositions[i * 2 + 1] = baseY;

        // Mover suavemente a nueva posición
        particles[i * 2] = baseX + (Math.random() - 0.5) * 10;
        particles[i * 2 + 1] = baseY + (Math.random() - 0.5) * 10;
      }
    };

    // Event listeners en window para capturar a través de las capas
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("resize", handleResize);

    // Iniciar animación
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 50%, #f0f3f7 100%)"
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          opacity: supported === false ? 0 : 1,
          transition: "opacity 0.5s ease"
        }}
      />
      {supported === false && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
      )}
    </div>
  );
}
