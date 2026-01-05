'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { subscribeToComing } from '@/app/actions/newsletter'
import Image from 'next/image'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// ============================================
// PARTÍCULAS DE FONDO - Reducidas para móvil
// ============================================
function StarField({ count = 1000 }) {
  const ref = useRef<THREE.Points>(null)
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  })

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.015
      ref.current.rotation.y -= delta * 0.02
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#fbbf24"
        size={0.012}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export function ComingSoon() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [phase, setPhase] = useState<'video' | 'content'>('video')

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const bgVideoRef = useRef<HTMLVideoElement>(null)

  // Manejar fin del video o transición
  const handleVideoEnd = () => {
    const tl = gsap.timeline()

    tl.to(videoContainerRef.current, {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => setPhase('content')
    })
  }

  // Animación del contenido cuando aparece
  useEffect(() => {
    if (phase === 'content' && contentRef.current) {
      gsap.to(particlesRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      })

      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
    }
  }, [phase])

  // Reproducir video de fondo cuando aparece el contenido
  useEffect(() => {
    if (phase === 'content' && bgVideoRef.current) {
      bgVideoRef.current.play()
    }
  }, [phase])

  const handleSkipIntro = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    handleVideoEnd()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const result = await subscribeToComing(email)

    if (result.success) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
      setErrorMsg(result.error || 'Error al suscribirse')
    }
  }

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-[#ffffff] overflow-hidden">
      {/* Canvas 3D con partículas - solo en fase intro (oculto cuando hay video de fondo) */}
      {phase === 'video' && (
        <div ref={particlesRef} className="fixed inset-0 opacity-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <StarField />
            </Suspense>
            <ambientLight intensity={0.5} />
          </Canvas>
        </div>
      )}

      {/* Video Intro */}
      {phase === 'video' && (
        <div
          ref={videoContainerRef}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#ffffff] px-4 pb-safe pt-safe"
        >
          {/* Contenedor del video - pantalla completa en móvil */}
          <div
            className="absolute inset-0 sm:relative sm:inset-auto sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              loop
              className="w-full h-full object-cover"
            >
              <source src="/videos/videointro-boomerang.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Contenido sobre el video en móvil */}
          <div className="absolute bottom-20 left-0 right-0 z-10 flex flex-col items-center sm:relative sm:bottom-auto">
            {/* Título */}
            <h1
              className="mt-4 sm:mt-6 md:mt-8 text-xl sm:text-3xl md:text-4xl font-bold text-white sm:text-gray-900 tracking-wide text-center"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              NeumorStudio
            </h1>

            {/* Subtítulo - visible en todas las pantallas */}
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-white/80 sm:text-gray-500 text-center">
              Diseño que conecta
            </p>

            {/* Botón continuar */}
            <button
              onClick={handleSkipIntro}
              className="mt-5 sm:mt-8 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium text-white sm:text-gray-700 hover:text-gray-900 border border-white/40 sm:border-gray-300 hover:border-gray-400 transition-all duration-300 active:scale-95 sm:hover:scale-105"
              style={{
                background: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Video de fondo neumórfico con efecto boomerang */}
      {phase === 'content' && (
        <div className="fixed inset-0 z-10 overflow-hidden">
          <video
            ref={bgVideoRef}
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-110"
          >
            <source src="/videos/fondoneu-boomerang.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-30 min-h-screen min-h-[100dvh] flex items-center justify-center px-4 py-6 sm:p-6">
        <div
          ref={contentRef}
          className={`w-full max-w-[340px] sm:max-w-md ${phase === 'content' ? '' : 'opacity-0 pointer-events-none'}`}
        >
          {/* Card glassmorphism flotante */}
          <div
            className="p-5 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[40px] text-center animate-float"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.15), 0 15px 30px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
            }}
          >
            {/* Mini logo */}
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-6 rounded-xl sm:rounded-2xl overflow-hidden relative"
              style={{
                boxShadow: '0 0 30px rgba(251,191,36,0.25)'
              }}
            >
              <Image
                src="/images/logoneumor.jpeg"
                alt="NeumorStudio"
                fill
                className="object-cover"
              />
            </div>

            {/* Mensaje */}
            <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1.5 sm:mb-3">
              Estamos preparando algo especial
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-5 sm:mb-8 leading-relaxed">
              Webs con panel propio, leads centralizados y automatizaciones.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Deja tu email y te avisamos cuando esté listo.
            </p>

            {/* Formulario o éxito */}
            {status === 'success' ? (
              <div
                className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl"
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                <div className="text-emerald-500 text-2xl sm:text-4xl mb-2 sm:mb-3">✓</div>
                <p className="text-emerald-600 text-xs sm:text-sm">Te avisaremos cuando lancemos</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tu@email.com"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full text-gray-900 text-sm placeholder:text-gray-400 outline-none transition-all duration-300 focus:ring-2 focus:ring-amber-500/40"
                  style={{
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.1)',
                  }}
                />

                {status === 'error' && (
                  <p className="text-red-500 text-xs sm:text-sm">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full font-medium text-xs sm:text-sm text-black flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] sm:hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    boxShadow: '0 10px 40px rgba(251,191,36,0.3)'
                  }}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Guardando...
                    </span>
                  ) : (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Avisarme del lanzamiento
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-gray-500">
              Sin spam. Solo novedades importantes.
            </p>

            {/* Redes Sociales */}
            <div className="mt-5 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-200/50">
              <p className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4">Siguenos en redes</p>
              <div className="flex justify-center gap-2.5 sm:gap-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/neumorstudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  style={{
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.08)',
                  }}
                  aria-label="Instagram"
                >
                  <svg className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#E4405F] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/people/Neumor-Studio/61585602088554/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  style={{
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.08)',
                  }}
                  aria-label="Facebook"
                >
                  <svg className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#1877F2] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@neumorstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  style={{
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.08)',
                  }}
                  aria-label="TikTok"
                >
                  <svg className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-gray-600 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/channel/UC1uXNNllln0RYC871Z_rruQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  style={{
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.08)',
                  }}
                  aria-label="YouTube"
                >
                  <svg className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#FF0000] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com/neumorstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  style={{
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.08)',
                  }}
                  aria-label="X"
                >
                  <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-gray-600 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradiente de ambiente - solo en fase video */}
      {phase === 'video' && (
        <div
          className="fixed inset-0 pointer-events-none z-20"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.8) 70%)'
          }}
        />
      )}
    </div>
  )
}
