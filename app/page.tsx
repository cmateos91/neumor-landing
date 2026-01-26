'use client'

import { useState, useEffect, useRef } from 'react'
import { ContactForm } from "@/components/forms/ContactForm"
import { NeumorfSection } from "@/components/ui/NeumorfSection"
import { NeumorfCard } from "@/components/ui/NeumorfCard"
import { Navbar } from "@/components/ui/Navbar"
import gsap from 'gsap'

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Manejar fin del video intro
  const handleVideoEnd = () => {
    const tl = gsap.timeline({
      onComplete: () => setShowContent(true)
    })

    tl.to(videoContainerRef.current, {
      autoAlpha: 0,
      scale: 1.02,
      duration: 1.2,
      ease: 'power3.out'
    })
    .fromTo(contentRef.current,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )
  }

  // Preparar estados iniciales
  useEffect(() => {
    if (contentRef.current) {
      gsap.set(contentRef.current, { autoAlpha: 0 })
    }
  }, [])

  const nichos = [
    'Restaurantes', 'Salones', 'Clinicas',
    'Gimnasios', 'Tiendas', 'Reformas'
  ]

  return (
    <div className="relative min-h-screen">
      {/* Video Intro */}
      <div
        ref={videoContainerRef}
        className="fixed inset-0 z-50 overflow-hidden"
        style={{
          willChange: 'opacity, visibility, transform',
          backgroundColor: '#000'
        }}
      >
        <img
          src="/images/video-poster.jpg"
          alt=""
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          style={{ zIndex: 1 }}
          fetchPriority="high"
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          style={{ zIndex: 2 }}
        >
          <source src="/videos/VideoIntroducción.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Contenido principal */}
      <div ref={contentRef} style={{ willChange: 'opacity, transform' }}>
        <Navbar />

        <main className="min-h-screen pt-20">
          {/* HERO */}
          <NeumorfSection className="py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge - Glass */}
              <div className="glass-badge inline-flex items-center gap-2 px-4 py-2 rounded-full
                            text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                Webs listas en 5 dias
              </div>

              {/* Titulo */}
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-slate-800 dark:text-slate-100">
                Tu web profesional.
                <span className="block text-blue-500">
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
                  className="cta-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full
                            text-sm font-medium text-white"
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
                  className="glass-cta inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full
                            text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  Solicitar propuesta
                </a>
              </div>
            </div>
          </NeumorfSection>

          {/* SERVICIOS */}
          <NeumorfSection id="servicios" className="space-y-12">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
                Todo incluido
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Sin sorpresas. Un precio, todo lo que necesitas.
              </p>
            </div>

            {/* 3 Cards principales */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Web moderna */}
              <NeumorfCard className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl
                              bg-blue-500/10 dark:bg-blue-500/20
                              backdrop-blur-sm border border-blue-500/20 dark:border-blue-500/10
                              flex items-center justify-center
                              shadow-[0_4px_12px_rgba(59,130,246,0.15)]">
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">Web moderna</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Diseno neumorfico, responsive y optimizada para movil.
                </p>
              </NeumorfCard>

              {/* Panel propio */}
              <NeumorfCard className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl
                              bg-emerald-500/10 dark:bg-emerald-500/20
                              backdrop-blur-sm border border-emerald-500/20 dark:border-emerald-500/10
                              flex items-center justify-center
                              shadow-[0_4px_12px_rgba(16,185,129,0.15)]">
                  <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">Panel propio</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Cambia textos, fotos y precios sin tocar codigo.
                </p>
              </NeumorfCard>

              {/* Automatizaciones */}
              <NeumorfCard className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl
                              bg-purple-500/10 dark:bg-purple-500/20
                              backdrop-blur-sm border border-purple-500/20 dark:border-purple-500/10
                              flex items-center justify-center
                              shadow-[0_4px_12px_rgba(168,85,247,0.15)]">
                  <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">Automatizaciones</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Confirmaciones, recordatorios y respuestas automaticas.
                </p>
              </NeumorfCard>
            </div>

            {/* Nichos - Glass pills */}
            <div className="text-center pt-8">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Plantillas especializadas para
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {nichos.map((nicho) => (
                  <span
                    key={nicho}
                    className="glass-pill px-4 py-2 rounded-full text-sm
                              text-slate-600 dark:text-slate-300 cursor-default"
                  >
                    {nicho}
                  </span>
                ))}
              </div>
            </div>
          </NeumorfSection>

          {/* CONTACTO */}
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
              </div>
              <ContactForm />
            </div>
          </NeumorfSection>

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
                  className="glass-pill w-10 h-10 !p-0 rounded-xl flex items-center justify-center"
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
                  className="glass-pill w-10 h-10 !p-0 rounded-xl flex items-center justify-center"
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
                  className="glass-pill w-10 h-10 !p-0 rounded-xl flex items-center justify-center"
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
