'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registramos el plugin para que GSAP sepa leer el scroll
gsap.registerPlugin(ScrollTrigger)

interface ScrollFloatProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade' | 'slide' | 'scale' // Por si quieres variantes en el futuro
  delay?: number
}

export function ScrollFloat({ children, className = "", delay = 0 }: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    // 1. ENTRADA (Aparecer desde abajo)
    gsap.fromTo(el,
      { autoAlpha: 0, y: 50 }, // Empieza invisible y 50px abajo
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: delay,
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=10%", // Empieza cuando el top del elemento entra al 90% de la pantalla
          end: "top center+=10%",   // Termina cuando llega casi al centro
          scrub: 1,                 // "1" suaviza el movimiento (no es instantáneo)
        }
      }
    )

    // 2. SALIDA (Desvanecerse hacia arriba)
    // Esto es lo que da el "efecto Igloo": las cosas se van suavemente al subir
    gsap.to(el, {
      autoAlpha: 0,
      y: -50, // Se va 50px hacia arriba
      scrollTrigger: {
        trigger: el,
        start: "bottom top+=20%", // Empieza a irse cuando su parte baja está cerca del top
        end: "bottom top",        // Desaparece totalmente al salir
        scrub: 1,
      }
    })

  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}