// src/app/page.tsx
import { NeumorfSection } from "@/components/ui/NeumorfSection";
import { NeumorfCard } from "@/components/ui/NeumorfCard";
import { NeumorfButton } from "@/components/ui/NeumorfButton";
import { ThemeToggleWrapper } from "@/components/theme/ThemeToggleWrapper";
import { MovingDotCard } from "@/components/sections/MovingDotCard";
import { Hero3DVideo } from "@/components/sections/Hero3DVideo";
import { ContactForm } from "@/components/forms/ContactForm";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <Hero3DVideo />
      {/* Fondo general */}
      <div className="min-h-screen flex flex-col items-center">
        {/* HERO */}
        <header className="w-full pt-10 md:pt-14 pb-6">
          <NeumorfSection className="flex flex-col gap-10 md:flex-row md:items-center">
            {/* Lado texto */}
            <div className="flex-1 space-y-6">
              <div className="badge-pill">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span >Estudio de interfaces neumórficas + automatización</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
                NeumorStudio 
              </h1>
              
              <ThemeToggleWrapper/>
              <MovingDotCard></MovingDotCard>

              <p className="text-base md:text-lg text-slate-600 max-w-xl">
                Diseñamos webs con estética <strong>neumórfica</strong>, capturamos
                tus <strong>leads</strong> y automatizamos las respuestas para que
                tú te centres en tu negocio, no en perseguir formularios.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <NeumorfButton className="neumor-pill">
                  Quiero una web neumórfica
                </NeumorfButton>
                <span className="text-xs md:text-sm text-slate-500">
                  Diseño + leads + automatización en un solo sistema.
                </span>
              </div>
            </div>

            {/* Lado “visual” / tarjeta */}
            <div className="flex-1 mt-4 md:mt-0">
              <NeumorfCard className="max-w-md mx-auto">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">
                  Vista previa
                </p>
                <h2 className="text-lg font-semibold mb-2">
                  Un estudio, tres piezas:
                </h2>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Interfaz neumórfica que se siente suave y premium.</li>
                  <li>• Sistema de captación de leads conectado a base de datos.</li>
                  <li>• Respuestas automáticas con n8n (tu mini-ManyChat propio).</li>
                </ul>
              </NeumorfCard>
            </div>
          </NeumorfSection>
        </header>

        {/* SECCIÓN: QUÉ HACEMOS */}
        <NeumorfSection id="servicios" className="space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-2xl font-semibold">
              ¿Qué hace NeumorStudio por tu negocio?
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl mx-auto">
              No solo es una web bonita. Es una máquina que transforma visitas en
              oportunidades: diseño, captación y automatización conectados.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <NeumorfCard>
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Diseño neumórfico
              </h3>
              <p className="text-xs md:text-sm text-slate-600">
                Interfaces con profundidad, sombras suaves y una estética que
                diferencia tu marca frente a plantillas genéricas.
              </p>
            </NeumorfCard>

            <NeumorfCard>
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Captación de leads
              </h3>
              <p className="text-xs md:text-sm text-slate-600">
                Formularios pensados para convertir: claros, directos y conectados
                a una base de datos donde no se pierde nada.
              </p>
            </NeumorfCard>

            <NeumorfCard>
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Automatización de respuestas
              </h3>
              <p className="text-xs md:text-sm text-slate-600">
                Respuestas automáticas montadas con n8n para dar una primera
                atención 24/7 y filtrar contactos antes de que lleguen a ti.
              </p>
            </NeumorfCard>
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
            <NeumorfCard>
              <span className="badge-pill">
                1
              </span>
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Diagnóstico rápido
              </h3>
              <p className="text-xs md:text-sm text-slate-600">
                Cuéntame qué vendes, a quién y cómo captas clientes ahora mismo.
                Definimos juntos la estructura de la web.
              </p>
            </NeumorfCard>

            <NeumorfCard>
              <span className="badge-pill">
                2
              </span>
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Diseño + sistema de leads
              </h3>
              <p className="text-xs md:text-sm text-slate-600">
                Creamos tu interfaz neumórfica y conectamos formularios a una base
                de datos estructurada lista para escalar.
              </p>
            </NeumorfCard>

            <NeumorfCard>
              <span className="badge-pill">
                3
              </span>
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Automatización y lanzamiento
              </h3>
              <p className="text-xs md:text-sm text-slate-600">
                Configuramos las respuestas automáticas iniciales y dejamos todo
                listo para que puedas medir y mejorar.
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
  );
}
