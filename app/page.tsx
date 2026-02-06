'use client'

import { useEffect, useRef, useState } from 'react'
import { ContactForm } from "@/components/forms/ContactForm"
import { NeumorfSection } from "@/components/ui/NeumorfSection"
import { Navbar } from "@/components/ui/Navbar"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InteractiveLogo3D } from "@/components/ui/InteractiveLogo3D"
import { AntiGravityTextImmediate } from "@/components/ui/AntiGravityText"

// Registrar plugins una sola vez
gsap.registerPlugin(ScrollTrigger)

// Datos de capítulos
const chapters = [
  {
    id: 'web-que-atrae',
    headline: 'Tu marca, elevada',
    copy: 'Landing pages neumórficas, copy claro y CTA estratégico para convertir visitas en deseo.',
    video: '/videos/webqueatraevideo.mp4',
  },
  {
    id: 'panel-admin',
    headline: 'El control total, simplificado',
    copy: 'Un dashboard interno donde gestionas precios, horarios y métricas con total claridad.',
    video: '/videos/paneladminquecontrolavideo.mp4',
  },
  {
    id: 'panel-usuario',
    headline: 'Fidelizar sin esfuerzo',
    copy: 'Un espacio privado que se siente como un club exclusivo y hace que el cliente vuelva.',
    video: '/videos/panelusuarioquefidelizavideo.mp4',
  },
  {
    id: 'newsletter',
    headline: 'Nunca dejes de estar presente',
    copy: 'Comunicación inteligente que impacta en el momento justo y reactiva clientes dormidos.',
    video: '/videos/newsletterquecomunicavideo.mp4',
  },
  {
    id: 'automatizacion',
    headline: 'Tu negocio funciona mientras duermes',
    copy: 'Procesos automáticos que escalan sin errores y devuelven tiempo al dueño del negocio.',
    video: '/videos/automatizacionqueescalavideo.mp4',
  },
]

const nichos = [
  'Restaurantes', 'Salones', 'Clínicas',
  'Gimnasios', 'Tiendas', 'Reformas'
]

export default function Home() {
  // Refs organizados
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<HTMLVideoElement[]>([])
  const chapterTriggersRef = useRef<ScrollTrigger[]>([])

  // ========== VIDEO INTERSECTION OBSERVER ==========
  useEffect(() => {
    // Detectar si es móvil/táctil
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    
    // En móvil, no usar IntersectionObserver para autoplay
    // Los videos se controlan manualmente con el botón de play
    if (isTouchDevice) return

    const videos = videoRefs.current.filter(Boolean)
    if (videos.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement
          // Solo reproducir si el video no tiene controles activos
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.3, 0.5, 1], rootMargin: '-10% 0px' }
    )

    videos.forEach((video) => observer.observe(video))

    return () => {
      videos.forEach((video) => observer.unobserve(video))
      observer.disconnect()
    }
  }, [])

  // ========== GSAP ANIMATIONS CON CONTEXT ==========
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // ----- Hero Animation (sin el título, manejado por AntiGravityText) -----
      const heroTl = gsap.timeline({ 
        defaults: { ease: 'power3.out' },
        delay: 0.8 // Delay aumentado para dejar que AntiGravityText inicie primero
      })

      heroTl
        .fromTo(
          '.hero-badge',
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 }
        )
        .fromTo(
          '.hero-desc',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
          '-=0.3'
        )

      // ----- Chapters Scroll Animation -----
      const chapterSections = gsap.utils.toArray<HTMLElement>('.chapter-section')

      chapterSections.forEach((chapter, index) => {
        const isEven = index % 2 === 1

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        })

        const textEl = chapter.querySelector('.chapter-text')
        const videoEl = chapter.querySelector('.chapter-video')

        // Texto entra desde el lado correspondiente
        tl.fromTo(
          textEl,
          { opacity: 0, x: isEven ? 40 : -40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
        ).fromTo(
          videoEl,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' },
          '-=0.6'
        )

        if (tl.scrollTrigger) {
          chapterTriggersRef.current.push(tl.scrollTrigger)
        }
      })

      // ----- Nichos Animation -----
      gsap.fromTo(
        '.nicho-pill',
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.nichos-section',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // ----- Contact Section -----
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      contactTl
        .fromTo(
          '.contact-content > *',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out' }
        )
        .fromTo(
          '.contact-form',
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        )

    }, containerRef)

    return () => {
      ctx.revert()
      chapterTriggersRef.current.forEach((st) => st.kill())
      chapterTriggersRef.current = []
    }
  }, [])

  // ========== SMOOTH SCROLL TO TOP ==========
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="min-h-screen pt-20">
        {/* HERO */}
        <NeumorfSection ref={heroRef} className="py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="hero-badge ng-badge text-emerald-600 dark:text-emerald-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              Webs listas en 3 días
            </div>

            <div className="mb-4">
              <AntiGravityTextImmediate
                as="h1"
                className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-800 dark:text-slate-100"
                delay={0.3}
                stagger={0.025}
                duration={1.4}
              >
                Tu web profesional.
              </AntiGravityTextImmediate>
              <AntiGravityTextImmediate
                as="h1"
                className="text-3xl md:text-5xl font-semibold tracking-tight text-blue-500"
                delay={0.8}
                stagger={0.03}
                duration={1.2}
              >
                Con panel y automatizaciones.
              </AntiGravityTextImmediate>
            </div>

            <p className="hero-desc text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
              Sitios web para negocios locales con panel de administración
              y respuestas automáticas. Todo gestionado desde un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-cta ng-btn-primary"
              >
                Ver qué incluye
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button
                onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-cta ng-raised px-6 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
              >
                Solicitar propuesta
              </button>
            </div>
          </div>
        </NeumorfSection>

        {/* SERVICIOS */}
        <NeumorfSection id="servicios" className="space-y-32 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Servicios diseñados para crecer
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Soluciones digitales que combinan diseño, control y automatización para impulsar tu negocio.
            </p>
          </div>

          {chapters.map((chapter, index) => (
            <section
              key={chapter.id}
              className={`chapter-section min-h-[60vh] w-full grid items-center gap-10 md:gap-12 ${
                index % 2 === 1 ? 'md:grid-cols-[55%_45%]' : 'md:grid-cols-[45%_55%]'
              }`}
            >
              {index % 2 === 1 && (
                <div className="chapter-video order-1 md:order-1">
                  <VideoCard chapter={chapter} index={index} videoRefs={videoRefs} />
                </div>
              )}

              <div className={`chapter-text space-y-4 ${index % 2 === 1 ? 'order-2 md:order-2' : ''}`}>
                <p className="text-xs tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500 font-medium">
                  Servicio {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-2xl md:text-4xl font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                  {chapter.headline}
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                  {chapter.copy}
                </p>
              </div>

              {index % 2 === 0 && (
                <div className="chapter-video">
                  <VideoCard chapter={chapter} index={index} videoRefs={videoRefs} />
                </div>
              )}
            </section>
          ))}

          {/* Nichos - Glass pills */}
          <div className="nichos-section text-center pt-8">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Plantillas especializadas para
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {nichos.map((nicho) => (
                <span
                  key={nicho}
                  className="nicho-pill ng-raised px-4 py-2 text-sm text-slate-600 dark:text-slate-300 cursor-default hover:bg-white/40 dark:hover:bg-white/5 transition-colors"
                >
                  {nicho}
                </span>
              ))}
            </div>
          </div>
        </NeumorfSection>

        {/* CONTACTO */}
        <div ref={contactRef} id="contacto">
          <NeumorfSection className="pb-24">
            <div className="contact-content grid gap-12 md:grid-cols-2 items-start">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                    ¿Tienes un negocio local?
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Cuéntame qué haces y te propongo una solución concreta:
                    qué incluiría tu web, qué automatizaciones necesitas
                    y por dónde empezaríamos.
                  </p>
                </div>

                <ul className="space-y-3">
                  {['Respuesta en menos de 24h', 'Propuesta personalizada sin compromiso'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <InteractiveLogo3D />
              </div>

              <div className="contact-form">
                <ContactForm />
              </div>
            </div>
          </NeumorfSection>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/40 dark:border-white/5 bg-white/30 dark:bg-black/10 backdrop-blur-sm">
          <NeumorfSection className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span>&copy; {new Date().getFullYear()} NeumorStudio</span>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/neumorstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="ng-raised w-10 h-10 !p-0 flex items-center justify-center hover:bg-white/50 dark:hover:bg-white/5 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@neumorstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="ng-raised w-10 h-10 !p-0 flex items-center justify-center hover:bg-white/50 dark:hover:bg-white/5 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://x.com/neumorstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="ng-raised w-10 h-10 !p-0 flex items-center justify-center hover:bg-white/50 dark:hover:bg-white/5 transition-colors"
                aria-label="X"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </NeumorfSection>
        </footer>
      </main>
    </div>
  )
}

// ========== VIDEO CARD COMPONENT ==========
interface VideoCardProps {
  chapter: {
    id: string
    headline: string
    copy: string
    video: string
  }
  index: number
  videoRefs: React.MutableRefObject<HTMLVideoElement[]>
}

function VideoCard({ chapter, index, videoRefs }: VideoCardProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      const isTouchDevice = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      setIsMobile(isTouchDevice)
    }
    checkMobile()
  }, [])

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play().catch(() => {})
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className="ng-video-card group relative">
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative">
        {/* Video Element */}
        <video
          ref={(el) => {
            videoRef.current = el
            if (el) videoRefs.current[index] = el
          }}
          src={chapter.video}
          muted={!isMobile} // En móvil, no forzar muted para permitir interacción
          loop
          playsInline
          controls={isMobile} // Mostrar controles nativos en móvil
          webkit-playsinline="true"
          x5-playsinline="true"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          preload="metadata"
          poster={`/images/${chapter.id}-poster.jpg`}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        {/* Overlay con botón de play para móvil (cuando no está reproduciendo) */}
        {isMobile && !isPlaying && (
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity"
            aria-label="Reproducir video"
          >
            <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/50">
              <svg 
                className="w-6 h-6 text-slate-800 dark:text-white ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}
