import { NeumorfSection } from "@/components/ui/NeumorfSection";
import { NeumorfCard } from "@/components/ui/NeumorfCard";
import { NeumorfButton } from "@/components/ui/NeumorfButton";
import { ThemeToggleWrapper } from "@/components/theme/ThemeToggleWrapper";
import { MovingDotCard } from "@/components/sections/MovingDotCard";
// Importamos los nuevos componentes interactivos
import { SmoothScroll } from "@/components/utils/SmoothScroll";
import { Hero3DScene } from "@/components/sections/Hero3DVideo"; // Ajusta la ruta si guardaste el archivo con otro nombre
import { ContactForm } from "@/components/forms/ContactForm";
import { ScrollFloat } from "@/components/utils/ScrollFloat";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 overflow-hidden">
        
        {/* Fondo general */}
        <div className="min-h-screen flex flex-col items-center w-full">
          
          {/* HERO */}
          <header className="w-full pt-10 md:pt-14 pb-6">
            <NeumorfSection className="flex flex-col gap-10 md:flex-row md:items-center">
              {/* Lado texto */}
              <div className="flex-1 space-y-6 z-10">
                <ScrollFloat>
                  <div className="badge-pill mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Estudio de interfaces neumórficas + automatización</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#E5E7EB]">
                    NeumorStudio
                  </h1>
                </ScrollFloat>
                
                <ScrollFloat delay={0.1}>
                  <ThemeToggleWrapper/>
                </ScrollFloat>
                
                <ScrollFloat delay={0.2}>
                  {/* Tarjeta animada original (escalada un poco para encajar) */}
                  <div className="scale-90 origin-left">
                     <MovingDotCard />
                  </div>
                </ScrollFloat>

                <ScrollFloat delay={0.3}>
                  <p className="text-base md:text-lg text-slate-600 max-w-xl">
                    Diseñamos webs con estética <strong>neumórfica</strong>, capturamos
                    tus <strong>leads</strong> y automatizamos las respuestas con tecnología moderna.
                  </p>
                </ScrollFloat>

                <ScrollFloat delay={0.4}>
                  <div className="flex flex-wrap items-center gap-4">
                    <NeumorfButton className="neumor-pill">
                      Quiero una web neumórfica
                    </NeumorfButton>
                  </div>
                </ScrollFloat>
              </div>

              {/* Lado 3D INTERACTIVO (Sin tarjeta envolvente para que flote libre) */}
              <div className="flex-1 mt-4 md:mt-0 w-full flex justify-center items-center">
                <Hero3DScene />
              </div>
              
            </NeumorfSection>
          </header>

          {/* SECCIÓN: QUÉ HACEMOS */}
          <NeumorfSection id="servicios" className="space-y-6">
             <ScrollFloat>
               <div className="text-center mb-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] dark:text-[#E5E7EB]">
                    ¿Qué hace NeumorStudio por tu negocio?
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl mx-auto">
                    No solo es una web bonita. Es una máquina que transforma visitas en oportunidades.
                  </p>
               </div>
             </ScrollFloat>

             <div className="grid gap-6 md:grid-cols-3">
                <ScrollFloat delay={0.1} className="h-full">
                  <NeumorfCard className="h-full">
                    <h3 className="font-semibold mb-2 text-sm md:text-base">Diseño neumórfico</h3>
                    <p className="text-xs md:text-sm text-slate-600">
                      Interfaces con profundidad y sombras suaves.
                    </p>
                  </NeumorfCard>
                </ScrollFloat>
                
                <ScrollFloat delay={0.2} className="h-full">
                  <NeumorfCard className="h-full">
                    <h3 className="font-semibold mb-2 text-sm md:text-base">Captación de leads</h3>
                    <p className="text-xs md:text-sm text-slate-600">
                      Formularios pensados para convertir.
                    </p>
                  </NeumorfCard>
                </ScrollFloat>

                <ScrollFloat delay={0.3} className="h-full">
                  <NeumorfCard className="h-full">
                    <h3 className="font-semibold mb-2 text-sm md:text-base">Automatización</h3>
                    <p className="text-xs md:text-sm text-slate-600">
                      Respuestas automáticas 24/7.
                    </p>
                  </NeumorfCard>
                </ScrollFloat>
             </div>
          </NeumorfSection>

          {/* FORMULARIO DE CONTACTO */}
          <NeumorfSection id="contacto" className="pb-16">
             <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] items-start">
               <ScrollFloat>
                 <div>
                   <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[#1A1A1A] dark:text-[#E5E7EB]">
                     ¿Hablamos de tu proyecto?
                   </h2>
                   <p className="text-sm md:text-base text-slate-600 mb-4">
                      Déjame unos datos básicos y te responderé con una propuesta concreta.
                   </p>
                 </div>
               </ScrollFloat>
               <ScrollFloat delay={0.2}>
                 <ContactForm />
               </ScrollFloat>
             </div>
          </NeumorfSection>

        </div>
      </main>
    </SmoothScroll>
  );
}