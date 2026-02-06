'use client'

import { useEffect, useRef, useState } from 'react'

interface CursorState {
  x: number
  y: number
  isHovering: boolean
  isClicking: boolean
}

export function NeoGlassCursor() {
  const [isClient, setIsClient] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true) // Default true para SSR safety
  
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
  })
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    setIsClient(true)

    // Detección robusta de dispositivos táctiles
    const checkTouch = () => {
      const hasTouch = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      
      setIsTouchDevice(hasTouch)
      return hasTouch
    }

    const isTouch = checkTouch()
    
    // Re-verificar en resize (por si cambia orientación o conectan mouse)
    const handleResize = () => checkTouch()
    window.addEventListener('resize', handleResize, { passive: true })

    if (isTouch) {
      // En móvil: no inicializar cursor, solo cleanup
      return () => window.removeEventListener('resize', handleResize)
    }

    // Lerp factor
    const LERP = 0.15

    const animate = () => {
      const target = targetRef.current
      const current = currentRef.current

      current.x += (target.x - current.x) * LERP
      current.y += (target.y - current.y) * LERP

      setState(prev => ({
        ...prev,
        x: current.x,
        y: current.y,
      }))

      rafRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isHoverable = target.closest('a, button, [role="button"], input, textarea, .cursor-hover')
      setState(prev => ({ ...prev, isHovering: !!isHoverable }))
    }

    const handleMouseDown = () => {
      setState(prev => ({ ...prev, isClicking: true }))
    }

    const handleMouseUp = () => {
      setState(prev => ({ ...prev, isClicking: false }))
    }

    rafRef.current = requestAnimationFrame(animate)

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // No renderizar: SSR, touch devices, o no client
  if (!isClient || isTouchDevice) return null

  const getScale = () => {
    if (state.isClicking) return 0.9
    if (state.isHovering) return 1.6
    return 1
  }

  const scale = getScale()

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          transform: `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%)`,
          willChange: 'transform',
        }}
      >
        <div
          className="relative transition-transform duration-150 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          <div
            className="w-8 h-8 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: `
                0 4px 20px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.8),
                0 0 30px rgba(59, 130, 246, 0.2)
              `,
            }}
          />
          {state.isHovering && (
            <div
              className="absolute inset-0 rounded-full -m-2 animate-pulse"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
              }}
            />
          )}
        </div>
      </div>

      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          transform: `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className="w-1 h-1 rounded-full bg-white/80"
          style={{
            opacity: state.isHovering ? 0 : 1,
            transition: 'opacity 0.15s ease',
          }}
        />
      </div>

      <style jsx global>{`
        @media (pointer: fine) and (min-width: 768px) {
          * {
            cursor: none !important;
          }
          a, button, [role="button"], input, textarea {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
