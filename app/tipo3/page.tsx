import "../globals.css";
import "./tipo3.css";

import Link from "next/link";
import { ParticleHero } from "./ParticleHero";
import { NeumorfSection } from "@/components/ui/NeumorfSection";
import { NeumorfButton } from "@/components/ui/NeumorfButton";
import { ContactForm } from "@/components/forms/ContactForm";

export default function Tipo3Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="tipo3-hero">
        <div className="tipo3-hint">
          Mueve el cursor para interactuar - Haz clic para explosión
        </div>
        <div className="tipo3-hero__canvas">
          <ParticleHero />
        </div>
        <div className="tipo3-hero__copy">
          <div className="badge-pill">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>100K partículas WebGPU</span>
          </div>
          <h1>
            Visualización de alto rendimiento
            <span>que responde a tu cursor.</span>
          </h1>
          <p>
            100,000 partículas GPGPU con física en tiempo real, morphing de texto
            y efectos de repulsión interactivos. Todo procesado en tu GPU.
          </p>
          <div className="tipo3-hero__ctas">
            <Link href="#contacto">
              <NeumorfButton className="neumor-pill">Hablemos</NeumorfButton>
            </Link>
            <span className="tipo3-hero__note">
              Compute shaders, additive blending y simulación física en WebGPU.
            </span>
          </div>
        </div>
      </section>

      <NeumorfSection id="contacto" className="pb-16">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              ¿Quieres un hero WebGPU de alto impacto?
            </h2>
            <p className="text-sm md:text-base text-slate-600 mb-4">
              Creamos experiencias visuales inmersivas con partículas, física y
              efectos que impresionan desde el primer segundo.
            </p>
            <ul className="text-xs md:text-sm text-slate-600 space-y-1">
              <li>• 100K+ partículas renderizadas en GPU</li>
              <li>• Interactividad fluida con cursor</li>
              <li>• Fallback elegante para navegadores sin WebGPU</li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </NeumorfSection>
    </main>
  );
}
