// src/app/page.tsx
import { Hero3DVideo, Logo3DMini } from "@/components/sections/Hero3DVideo";
import { ContactForm } from "@/components/forms/ContactForm";
import { NeumorfSection } from "@/components/ui/NeumorfSection";
import { NeumorfCard } from "@/components/ui/NeumorfCard";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <Logo3DMini />
      <Hero3DVideo />
      {/* Contenido principal */}
      <div className="min-h-screen flex flex-col items-center">
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
