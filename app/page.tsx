// src/app/page.tsx
import { Hero3DVideo, Logo3DMini } from "@/components/sections/Hero3DVideo";
import { ContactForm } from "@/components/forms/ContactForm";
import { NeumorfSection } from "@/components/ui/NeumorfSection";
import { NeumorfCard } from "@/components/ui/NeumorfCard";
import { Navbar } from "@/components/ui/Navbar";
import { ImageModal } from "@/components/ui/ImageModal";
import { ComingSoon } from "@/components/ComingSoon";

const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === 'true'

export default function Home() {
  if (isComingSoon) {
    return <ComingSoon />
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20">
        <Logo3DMini />
        <Hero3DVideo />
      {/* Contenido principal */}
      <div className="min-h-screen flex flex-col items-center">
        {/* SECCIÓN: QUÉ HACEMOS */}
        <NeumorfSection id="servicios" className="space-y-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Todo lo que necesitas, conectado
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
              No es solo una web. Es un sistema completo que trabaja por ti
              mientras te enfocas en tu negocio.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <NeumorfCard className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-base">
                Web con panel propio
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Cambia textos, fotos y precios desde un editor visual. Sin depender de nadie.
              </p>
            </NeumorfCard>

            <NeumorfCard className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-base">
                Leads en un solo lugar
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Web, Instagram, WhatsApp, Facebook. Todos tus contactos en un dashboard con estadisticas.
              </p>
            </NeumorfCard>

            <NeumorfCard className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-base">
                Respuestas automaticas
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Atencion 24/7 sin estar pendiente. El sistema responde y filtra por ti.
              </p>
            </NeumorfCard>

            <NeumorfCard className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-base">
                Reservas online
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Tus clientes reservan desde la web. Confirmacion automatica por email.
              </p>
            </NeumorfCard>
          </div>
        </NeumorfSection>

        {/* SECCIÓN: DEMO DEL PANEL */}
        <NeumorfSection className="space-y-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Tu panel de control
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
              Gestiona todo desde un solo lugar. Sin conocimientos tecnicos.
            </p>
          </div>

          <div className="grid gap-12 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="demo-video-shell">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block"
                >
                  <source src="/videos/editor.webm" type="video/webm" />
                </video>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-base mb-1">Editor visual</h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                  Cambia cualquier texto o imagen en tiempo real
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="demo-video-shell">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block"
                >
                  <source src="/videos/dashboard.webm" type="video/webm" />
                </video>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-base mb-1">Dashboard de leads</h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                  Estadisticas, filtros y gestion de contactos
                </p>
              </div>
            </div>
          </div>
        </NeumorfSection>

        {/* PROCESO */}
        <NeumorfSection id="proceso" className="space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-2xl font-semibold">
              Cómo trabajaremos juntos
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <NeumorfCard className="text-center p-6">
              <h3 className="font-semibold mb-2 text-base">
                Diagnostico rapido
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Cuentame que vendes, a quien y como captas clientes ahora mismo.
                Definimos juntos la estructura de la web.
              </p>
            </NeumorfCard>

            <NeumorfCard className="text-center p-6">
              <h3 className="font-semibold mb-2 text-base">
                Diseno + sistema de leads
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Creamos tu interfaz y conectamos formularios a una base
                de datos estructurada lista para escalar.
              </p>
            </NeumorfCard>

            <NeumorfCard className="text-center p-6">
              <h3 className="font-semibold mb-2 text-base">
                Automatizacion y lanzamiento
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Configuramos las respuestas automaticas iniciales y dejamos todo
                listo para que puedas medir y mejorar.
              </p>
            </NeumorfCard>
          </div>
        </NeumorfSection>

        {/* FAQ */}
        <NeumorfSection className="space-y-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
            <NeumorfCard className="p-5">
              <h3 className="font-semibold text-base mb-2">
                Cuanto cuesta?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Depende de lo que necesites. Contactame y te doy un presupuesto
                personalizado segun las funcionalidades que quieras.
              </p>
            </NeumorfCard>

            <NeumorfCard className="p-5">
              <h3 className="font-semibold text-base mb-2">
                Cuanto tiempo tarda?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Una web basica con panel y automatizaciones puede estar lista
                en 2-3 semanas. Proyectos mas complejos, un poco mas.
              </p>
            </NeumorfCard>

            <NeumorfCard className="p-5">
              <h3 className="font-semibold text-base mb-2">
                Necesito saber programar?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                No. El panel es visual, solo arrastras y escribes. Cambiar textos,
                fotos o precios es tan facil como usar Word.
              </p>
            </NeumorfCard>

            <NeumorfCard className="p-5">
              <h3 className="font-semibold text-base mb-2">
                Puedo hacer cambios despues?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Si, ese es el punto. Tu panel te permite editar todo cuando quieras,
                sin depender de nadie ni pagar por cada cambio.
              </p>
            </NeumorfCard>

            <NeumorfCard className="p-5">
              <h3 className="font-semibold text-base mb-2">
                Que pasa con el hosting?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Incluyo hosting optimizado. Tu web estara rapida y segura sin que
                tengas que preocuparte por nada tecnico.
              </p>
            </NeumorfCard>

            <NeumorfCard className="p-5">
              <h3 className="font-semibold text-base mb-2">
                Como funcionan las automatizaciones?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Configuro respuestas automaticas para Instagram, WhatsApp y tu web.
                Cuando alguien te escribe, recibe respuesta al instante.
              </p>
            </NeumorfCard>
          </div>
        </NeumorfSection>

        {/* FORMULARIO DE CONTACTO */}
        <NeumorfSection id="contacto" className="pb-16">
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] items-start">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">
                ¿Quieres que NeumorStudio revise tu proyecto?
              </h2>
              <p className="text-sm md:text-base text-slate-600 mb-4">
                Déjame unos datos básicos y te responderé con una propuesta
                concreta: qué haría, qué priorizaría y por dónde empezaríamos.
              </p>
              <ul className="text-xs md:text-sm text-slate-600 space-y-1">
                <li>• Ideal si ya tienes negocio y quieres mejorar tu presencia.</li>
                <li>• Perfecto si estás arrancando y quieres algo con base sólida.</li>
              </ul>
            </div>

            <ContactForm />
          </div>
        </NeumorfSection>

        {/* FOOTER */}
        <footer className="w-full border-t border-slate-200/60">
          <NeumorfSection className="py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs md:text-sm text-slate-500">
            <span>© {new Date().getFullYear()} NeumorStudio.</span>
            <span>Diseño neumórfico + leads + automatización.</span>
          </NeumorfSection>
        </footer>

      </div>
    </main>
    </>
  );
}
