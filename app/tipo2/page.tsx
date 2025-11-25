'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './tipo2.css';

gsap.registerPlugin(ScrollTrigger);

export default function Tipo2Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      id: 'hero',
      tag: 'Bienvenido',
      title: 'NeumorStudio',
      subtitle: 'Experiencias Digitales del Futuro',
      description: 'Transformamos tu vision en realidades digitales inmersivas con diseno de vanguardia.'
    },
    {
      id: 'services',
      tag: 'Servicios',
      title: 'Lo Que Hacemos',
      subtitle: 'Soluciones Integrales',
      description: 'Desde el concepto hasta el lanzamiento, creamos experiencias que cautivan y convierten.'
    },
    {
      id: 'portfolio',
      tag: 'Portfolio',
      title: 'Nuestro Trabajo',
      subtitle: 'Proyectos Destacados',
      description: 'Cada proyecto es una historia de exito. Descubre como hemos ayudado a marcas a destacar.'
    },
    {
      id: 'process',
      tag: 'Proceso',
      title: 'Como Trabajamos',
      subtitle: 'Metodologia Probada',
      description: 'Un proceso transparente y colaborativo que garantiza resultados excepcionales.'
    },
    {
      id: 'contact',
      tag: 'Contacto',
      title: 'Empecemos',
      subtitle: 'Tu Proyecto Nos Espera',
      description: 'Agenda una consulta gratuita y descubre el potencial de tu marca.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.panel');
      const totalPanels = panels.length;

      // Configuracion inicial: primer panel visible, resto oculto
      panels.forEach((panel, i) => {
        gsap.set(panel, {
          opacity: i === 0 ? 1 : 0,
          visibility: i === 0 ? 'visible' : 'hidden',
          zIndex: totalPanels - i
        });
      });

      // Animacion de entrada del primer panel
      const firstContent = panels[0].querySelectorAll('.panel-tag, .panel-title, .panel-subtitle, .panel-description, .panel-cta, .panel-visual');
      gsap.fromTo(firstContent,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );

      // ScrollTrigger para cada transicion entre paneles
      panels.forEach((panel, i) => {
        if (i < totalPanels - 1) {
          const nextPanel = panels[i + 1];
          const nextContent = nextPanel.querySelectorAll('.panel-tag, .panel-title, .panel-subtitle, .panel-description, .panel-cta, .panel-visual');
          const currentContent = panel.querySelectorAll('.panel-tag, .panel-title, .panel-subtitle, .panel-description, .panel-cta, .panel-visual');

          // Timeline para la transicion
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: `.trigger-${i}`,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
              onEnter: () => setActiveSection(i + 1),
              onLeaveBack: () => setActiveSection(i)
            }
          });

          // Fase 1: Contenido actual se desvanece hacia arriba
          tl.to(currentContent, {
            y: -50,
            opacity: 0,
            stagger: 0.02,
            ease: 'power2.in',
            duration: 0.4
          });

          // Fase 2: Panel actual se oculta, siguiente aparece
          tl.to(panel, {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.1
          }, 0.35);

          tl.to(nextPanel, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.1
          }, 0.35);

          // Resetear contenido del siguiente panel
          gsap.set(nextContent, { y: 60, opacity: 0 });

          // Fase 3: Contenido siguiente aparece desde abajo
          tl.fromTo(nextContent,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out', duration: 0.5 },
            0.4
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const goToSection = (index: number) => {
    const triggers = document.querySelectorAll('.scroll-trigger');
    if (index === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (triggers[index - 1]) {
      triggers[index - 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="tipo2-page" ref={containerRef}>
      {/* Fondo unico estatico */}
      <div className="global-background">
        <div className="bg-gradient"></div>
        <div className="bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="bg-grid"></div>
        <div className="bg-noise"></div>
      </div>

      {/* Navegacion */}
      <nav className="tipo2-nav">
        <div className="nav-logo">
          <span className="logo-icon">N</span>
          <span className="logo-text">NeumorStudio</span>
        </div>
        <div className="nav-dots">
          {sections.map((section, i) => (
            <button
              key={section.id}
              className={`dot ${activeSection === i ? 'active' : ''}`}
              onClick={() => goToSection(i)}
              aria-label={section.tag}
            >
              <span className="dot-tooltip">{section.tag}</span>
            </button>
          ))}
        </div>
        <button className="nav-cta">Contactar</button>
      </nav>

      {/* Indicador de seccion */}
      <div className="section-counter">
        <span className="counter-current">{String(activeSection + 1).padStart(2, '0')}</span>
        <span className="counter-divider"></span>
        <span className="counter-total">{String(sections.length).padStart(2, '0')}</span>
      </div>

      {/* Contenedor de paneles (position fixed, apilados) */}
      <div className="panels-wrapper">
        {sections.map((section, index) => (
          <div key={section.id} className="panel">
            <div className="panel-inner">
              <div className="panel-left">
                <span className="panel-tag">{section.tag}</span>
                <h1 className="panel-title">{section.title}</h1>
                <h2 className="panel-subtitle">{section.subtitle}</h2>
                <p className="panel-description">{section.description}</p>

                {section.id === 'hero' && (
                  <div className="panel-cta">
                    <button className="btn-primary">
                      <span>Ver Proyectos</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                    <button className="btn-outline">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <polygon points="5,3 19,12 5,21"/>
                      </svg>
                      <span>Showreel</span>
                    </button>
                  </div>
                )}

                {section.id === 'contact' && (
                  <div className="panel-cta">
                    <button className="btn-primary large">
                      <span>Agendar Consulta Gratuita</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="panel-right">
                <div className="panel-visual">
                  {section.id === 'hero' && <HeroVisual />}
                  {section.id === 'services' && <ServicesVisual />}
                  {section.id === 'portfolio' && <PortfolioVisual />}
                  {section.id === 'process' && <ProcessVisual />}
                  {section.id === 'contact' && <ContactVisual />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint (solo visible al inicio) */}
      <div className={`scroll-hint ${activeSection > 0 ? 'hidden' : ''}`}>
        <div className="hint-icon">
          <div className="hint-wheel"></div>
        </div>
        <span>Scroll</span>
      </div>

      {/* Triggers invisibles para scroll */}
      <div className="scroll-triggers">
        {sections.slice(0, -1).map((_, i) => (
          <div key={i} className={`scroll-trigger trigger-${i}`}></div>
        ))}
      </div>
    </div>
  );
}

// Componentes visuales separados
function HeroVisual() {
  return (
    <div className="visual-hero">
      <div className="device-browser">
        <div className="browser-dots"><span></span><span></span><span></span></div>
        <div className="browser-body">
          <div className="browser-shimmer"></div>
        </div>
      </div>
      <div className="device-phone">
        <div className="phone-notch"></div>
        <div className="phone-body"></div>
      </div>
      <div className="floating-stat">
        <span className="stat-number">150+</span>
        <span className="stat-text">Proyectos</span>
      </div>
    </div>
  );
}

function ServicesVisual() {
  const services = [
    { icon: 'M3 3h18v18H3zM3 9h18M9 21V9', label: 'Web' },
    { icon: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0', label: 'Social' },
    { icon: 'M22 12h-4l-3 9L9 3l-3 9H2', label: 'Marketing' },
    { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', label: 'Branding' }
  ];

  return (
    <div className="visual-services">
      {services.map((s, i) => (
        <div key={i} className="service-item">
          <div className="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d={s.icon}/>
            </svg>
          </div>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function PortfolioVisual() {
  return (
    <div className="visual-portfolio">
      <div className="portfolio-stack">
        <div className="stack-card card-1"></div>
        <div className="stack-card card-2"></div>
        <div className="stack-card card-3"></div>
      </div>
    </div>
  );
}

function ProcessVisual() {
  const steps = ['Descubrir', 'Disenar', 'Desarrollar', 'Lanzar'];
  return (
    <div className="visual-process">
      {steps.map((step, i) => (
        <div key={i} className="process-step">
          <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
          <div className="step-line"></div>
          <span className="step-name">{step}</span>
        </div>
      ))}
    </div>
  );
}

function ContactVisual() {
  return (
    <div className="visual-contact">
      <div className="contact-box">
        <div className="contact-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <path d="M22 6l-10 7L2 6"/>
          </svg>
          <span>hola@neumorstudio.com</span>
        </div>
        <div className="contact-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>+34 612 345 678</span>
        </div>
        <div className="contact-social">
          {['Ig', 'Tw', 'Li', 'Be'].map((s, i) => (
            <a key={i} href="#" className="social-link">{s}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
