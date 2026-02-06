'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AntiGravityTextProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  stagger?: number
  duration?: number
}

export function AntiGravityText({
  children,
  className = '',
  as: Component = 'h1',
  delay = 0,
  stagger = 0.03,
  duration = 1.2,
}: AntiGravityTextProps) {
  const containerRef = useRef<HTMLElement>(null)
  const triggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const chars = container.querySelectorAll('.ag-char')
    
    // Configuración inicial: caos gravitatorio
    // Cada letra en posición aleatoria "sin gravedad"
    gsap.set(chars, {
      opacity: 0,
      y: () => gsap.utils.random(-200, -100), // Arriba, flotando
      x: () => gsap.utils.random(-100, 100),  // Dispersión horizontal
      rotation: () => gsap.utils.random(-25, 25), // Rotación caótica
      scale: () => gsap.utils.random(0.5, 1.5), // Tamaño variable
      filter: 'blur(10px)', // Desenfoque por movimiento
    })

    // Crear timeline
    const tl = gsap.timeline({
      delay,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      },
    })

    // Animación de convergencia: la "gravedad" activa
    tl.to(chars, {
      opacity: 1,
      y: 0,
      x: 0,
      rotation: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration,
      stagger: {
        each: stagger,
        from: 'random', // Caos a orden
      },
      ease: 'back.out(1.2)', // Rebote suave al "caer"
    })

    // Guardar trigger para cleanup
    if (tl.scrollTrigger) {
      triggersRef.current.push(tl.scrollTrigger)
    }

    return () => {
      triggersRef.current.forEach(st => st.kill())
      triggersRef.current = []
      tl.kill()
    }
  }, [delay, stagger, duration])

  // Split text into chars manteniendo espacios
  const renderChars = () => {
    return children.split('').map((char, index) => {
      // Preservar espacios
      if (char === ' ') {
        return (
          <span 
            key={`space-${index}`} 
            className="ag-char inline-block"
            style={{ width: '0.3em' }}
          >
            &nbsp;
          </span>
        )
      }
      
      return (
        <span
          key={`${char}-${index}`}
          className="ag-char inline-block will-change-transform"
          style={{ display: 'inline-block' }}
        >
          {char}
        </span>
      )
    })
  }

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={`${className}`}
    >
      {renderChars()}
    </Component>
  )
}

// Versión alternativa: Trigger inmediato (sin scroll)
export function AntiGravityTextImmediate({
  children,
  className = '',
  as: Component = 'h1',
  delay = 0.2,
  stagger = 0.02,
  duration = 1,
}: AntiGravityTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const chars = container.querySelectorAll('.ag-char')
    
    // Estado inicial caótico
    gsap.set(chars, {
      opacity: 0,
      y: () => gsap.utils.random(-300, -150),
      x: () => gsap.utils.random(-150, 150),
      rotation: () => gsap.utils.random(-30, 30),
      scale: () => gsap.utils.random(0.3, 2),
      filter: 'blur(8px)',
    })

    // Timeline con delay inicial
    const tl = gsap.timeline({ delay })

    // Caída gravitatoria con stagger
    tl.to(chars, {
      opacity: 1,
      y: 0,
      x: 0,
      rotation: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration,
      stagger: {
        each: stagger,
        from: 'start',
      },
      ease: 'back.out(1.7)', // Más rebote para efecto dramático
    })

    return () => {
      tl.kill()
    }
  }, [delay, stagger, duration])

  const renderChars = () => {
    return children.split('').map((char, index) => {
      if (char === ' ') {
        return (
          <span 
            key={`space-${index}`} 
            className="ag-char inline-block"
            style={{ width: '0.3em' }}
          >
            &nbsp;
          </span>
        )
      }
      
      return (
        <span
          key={`${char}-${index}`}
          className="ag-char inline-block will-change-transform"
        >
          {char}
        </span>
      )
    })
  }

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={className}
    >
      {renderChars()}
    </Component>
  )
}
