'use client'

import { useEffect, useRef, type MutableRefObject } from 'react'
import { ContactForm } from "@/components/forms/ContactForm"
import { NeumorfSection } from "@/components/ui/NeumorfSection"
import { Navbar } from "@/components/ui/Navbar"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InteractiveLogo3D } from "@/components/ui/InteractiveLogo3D"

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const heroLine1Ref = useRef<HTMLSpanElement>(null)
  const heroLine2Ref = useRef<HTMLSpanElement>(null)
  const service1Ref = useRef<HTMLDivElement>(null)
  const service2Ref = useRef<HTMLDivElement>(null)
  const service3Ref = useRef<HTMLDivElement>(null)
  const service4Ref = useRef<HTMLDivElement>(null)
  const service5Ref = useRef<HTMLDivElement>(null)
  const serviceRefsArray = [
    service1Ref,
    service2Ref,
    service3Ref,
    service4Ref,
    service5Ref,
  ]

  // Animación inicial del contenido
  // Control de reproducción con IntersectionObserver para que cada video actúe solo cuando está visible.
  useEffect(() => {
    if (!contentRef.current) return
    const tl = gsap.timeline()
    gsap.set(contentRef.current, { autoAlpha: 0, y: 20 })
    tl.to(contentRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
    return () => {
      tl.kill()
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 }
    )
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause()
        observer.observe(video)
      }
    })
    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    const serviceRefs = serviceRefsArray
    if (serviceRefs.some((ref) => !ref.current) || !contactRef.current) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    const scroller = document.documentElement

    // Sincronizamos ScrollTrigger con Lenis vía scrollerProxy para que cada capítulo responda al scroll virtual.
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          window.scrollTo({ top: value, behavior: 'auto' })
          return value
        }
        return scroller.scrollTop
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: scroller.style.transform ? 'transform' : 'fixed',
    })

    const serviceTimelines = serviceRefs.map((serviceRef) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: serviceRef.current,
          scroller,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
          once: true,
        },
      })
      timeline.fromTo(
        serviceRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power4.out',
        }
      )
      return timeline
    })

    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        scroller,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
      },
    })
    contactTimeline.fromTo(
      contactRef.current,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
      }
    )

    // No usamos pin en esta fase para mantener el layout estable; la narrativa viene por visibilidad.
    ScrollTrigger.refresh()

    return () => {
      serviceTimelines.forEach((tl) => {
        tl.scrollTrigger?.kill()
        tl.kill()
      })
      contactTimeline.scrollTrigger?.kill()
      contactTimeline.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  useEffect(() => {
    if (!heroLine1Ref.current || !heroLine2Ref.current) return

    // Animación editorial desacoplada de contentRef para que cada línea cuente independientemente.
    const lineTimeline = gsap.timeline()
    gsap.set([heroLine1Ref.current, heroLine2Ref.current], { autoAlpha: 0, y: 30 })
    lineTimeline
      .to(heroLine1Ref.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power4.out',
      })
      .to(
        heroLine2Ref.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power4.out',
        },
        '+=0.2' // micro-delay narrativo entre líneas
      )
    return () => {
      lineTimeline.kill()
    }
  }, [])

  const nichos = [
    'Restaurantes', 'Salones', 'Clinicas',
    'Gimnasios', 'Tiendas', 'Reformas'
  ]

  type Chapter = {
    id: string
    headline: string
    copy: string
    video: string
  }

  const chapters: Chapter[] = [
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

  const videoRefs = useRef<HTMLVideoElement[]>([])

  const VideoCard = ({
    chapter,
    index,
    videoRefs,
  }: {
    chapter: Chapter
    index: number
    videoRefs: MutableRefObject<HTMLVideoElement[]>
  }) => (
    <div className="w-full">
      <div className="design-card shadow-[0_25px_45px_rgba(15,23,42,0.25)] rounded-3xl bg-white/60 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/5">
        <div
          className="aspect-video w-full overflow-hidden rounded-2xl"
          style={{ minHeight: 0 }}
        >
          <video
            ref={(el) => {
              if (!el) return
              videoRefs.current[index] = el
            }}
            src={chapter.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            preload="metadata"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative min-h-screen">
      {/* Contenido principal */}
      <div ref={contentRef} style={{ willChange: 'opacity, transform' }}>
        <Navbar />

        <main className="min-h-screen pt-20">
          {/* HERO */}
          <NeumorfSection className="py-16 md:py-24 hero-section">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="design-badge inline-flex items-center gap-2 px-4 py-2
                            text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                Webs listas en 3 dias
              </div>

              {/* Titulo */}
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-slate-800 dark:text-slate-100">
                <span
                  ref={heroLine1Ref}
                  className="block"
                  style={{ willChange: 'opacity, transform' }}
                >
                  Tu web profesional.
                </span>
                <span
                  ref={heroLine2Ref}
                  className="block text-blue-500"
                  style={{ willChange: 'opacity, transform' }}
                >
                  Con panel y automatizaciones.
                </span>
              </h1>

              {/* Descripcion */}
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                Sitios web para negocios locales con panel de administracion
                y respuestas automaticas. Todo gestionado desde un solo lugar.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#servicios"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="design-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3
                            text-sm font-medium"
                >
                  Ver que incluye
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="design-btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3
                            text-sm font-medium"
                >
                  Solicitar propuesta
                </a>
              </div>
            </div>
          </NeumorfSection>

          {/* SERVICIOS - max-w-7xl para dar mas ancho al bloque de capítulos, mantiene la narrativa potente */}
          <NeumorfSection id="servicios" className="space-y-20 max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
                Servicios diseñados para crecer
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Soluciones digitales que combinan diseño, control y automatización para impulsar tu negocio con claridad y coherencia.              </p>
            </div>

            {/* Zig-zag: el grid cambia entre 35/65 y 65/35 para mantener el vídeo en la columna ancha sin depender de order */}
            {chapters.map((chapter, index) => {
              const isEvenChapter = index % 2 === 1
              const gridCols = isEvenChapter ? "md:grid-cols-[65%_35%]" : "md:grid-cols-[35%_65%]"
              return (
                <section
                  key={chapter.id}
                  className="min-h-[80vh] w-full"
                >
                  <div className={`grid items-start gap-10 ${gridCols}`}>
                    {/* En capítulos pares renderizamos primero el vídeo para que ocupe la columna ancha */}
                    {isEvenChapter && (
                      <VideoCard chapter={chapter} index={index} videoRefs={videoRefs} />
                    )}

                    <div className="space-y-4 md:max-w-[520px]">
                      <p className="text-xs tracking-[0.4em] uppercase text-slate-500 dark:text-slate-400">
                        Servicio {index + 1}
                      </p>
                      <h3 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">
                        {chapter.headline}
                      </h3>
                      <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl">
                        {chapter.copy}
                      </p>
                    </div>

                    {/* Si es capítulo impar el vídeo va después del texto */}
                    {!isEvenChapter && (
                      <VideoCard chapter={chapter} index={index} videoRefs={videoRefs} />
                    )}
                  </div>
                </section>
              )
            })}

            {/* Nichos - Glass pills */}
            <div className="text-center pt-8">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Plantillas especializadas para
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {nichos.map((nicho) => (
                  <span
                    key={nicho}
                    className="design-badge px-4 py-2 text-sm cursor-default"
                  >
                    {nicho}
                  </span>
                ))}
              </div>
            </div>
          </NeumorfSection>

          {/* CONTACTO */}
          <div ref={contactRef}>
            <NeumorfSection id="contacto" className="pb-16">
            <div className="grid gap-8 md:grid-cols-2 items-start">
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
                  Tienes un negocio local?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Cuentame que haces y te propongo una solucion concreta:
                  que incluiria tu web, que automatizaciones necesitas
                  y por donde empezariamos.
                </p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Respuesta en menos de 24h
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Propuesta personalizada sin compromiso
                </li>
              </ul>

              {/* Logo 3D interactivo premium justo antes del formulario */}
              <InteractiveLogo3D />
            </div>
            <ContactForm />
            </div>
            </NeumorfSection>
          </div>

          {/* FOOTER */}
          <footer className="border-t border-white/40 dark:border-white/5 bg-white/30 dark:bg-black/10 backdrop-blur-sm">
            <NeumorfSection className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span>&copy; {new Date().getFullYear()} NeumorStudio</span>
              <div className="flex gap-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/neumorstudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="design-card w-10 h-10 !p-0 flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@neumorstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="design-card w-10 h-10 !p-0 flex items-center justify-center"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                {/* X */}
                <a
                  href="https://x.com/neumorstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="design-card w-10 h-10 !p-0 flex items-center justify-center"
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
    </div>
  )
}
