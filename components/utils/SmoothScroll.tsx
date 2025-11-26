'use client'
import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css' // Importante para que el CSS base funcione

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 3,          // DURACIÓN: Más alto = más "pesado/lento" (Igloo usa algo alto)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de aceleración suave
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,      // Activar suavizado en rueda
      wheelMultiplier: 1,     // Velocidad de la rueda
      touchMultiplier: 2,     // Velocidad en táctil
    })

    // Bucle de animación para mantenerlo fluido
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    // El contenedor no necesita estilos especiales, Lenis actúa sobre el 'html'
    <div className="w-full min-h-screen">
      {children}
    </div>
  )
}