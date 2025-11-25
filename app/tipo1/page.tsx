'use client';

import { useEffect, useRef, useState } from 'react';
import './tipo1.css';

export default function Tipo1Page() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  // Cursor personalizado
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';

      animationId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseFloat(entry.target.getAttribute('data-delay') || '0');
          setTimeout(() => {
            entry.target.classList.add('animated');
          }, delay * 1000);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animation]').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    const counters = document.querySelectorAll('[data-count]');

    const observerOptions = { threshold: 0.5 };

    const animateCounter = (element: Element) => {
      const target = parseInt(element.getAttribute('data-count') || '0');
      const duration = 2000;
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);

        element.textContent = current.toString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target.toString();
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (navbar) {
        if (currentScroll > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 500) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonials autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const portfolioItems = [
    { category: 'web', gradient: 'gradient-1', tag: 'Web Design', title: 'E-commerce Premium', desc: 'Tienda online de moda con experiencia de compra inmersiva' },
    { category: 'branding', gradient: 'gradient-2', tag: 'Branding', title: 'TechStart Identity', desc: 'Identidad visual completa para startup tecnologica', large: true },
    { category: 'marketing', gradient: 'gradient-3', tag: 'Marketing', title: 'Campana Social', desc: 'Estrategia de redes que aumento engagement 300%' },
    { category: 'web', gradient: 'gradient-4', tag: 'Web Design', title: 'Dashboard SaaS', desc: 'Panel de control intuitivo para plataforma empresarial' },
    { category: 'branding', gradient: 'gradient-5', tag: 'Branding', title: 'Restaurant Luxe', desc: 'Branding elegante para restaurante de alta cocina' },
    { category: 'web', gradient: 'gradient-6', tag: 'Web Design', title: 'App Landing Page', desc: 'Landing de alto impacto con conversion del 12%', large: true },
  ];

  const testimonials = [
    { initials: 'MG', name: 'Maria Garcia', role: 'CEO, TechStart', text: 'NeumorStudio transformo completamente nuestra presencia digital. Su enfoque creativo y atencion al detalle supero todas nuestras expectativas.' },
    { initials: 'CR', name: 'Carlos Rodriguez', role: 'Marketing Director, InnovateLab', text: 'Increible trabajo en nuestras redes sociales. En 3 meses triplicamos nuestros seguidores y el engagement aumento un 400%.' },
    { initials: 'AL', name: 'Ana Lopez', role: 'Fundadora, DigitalFirst', text: 'El diseno neumorfico que crearon para nuestra web nos diferencia de toda la competencia. Profesionales de principio a fin.' },
  ];

  const filteredPortfolio = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="tipo1-page">
      {/* Cursor personalizado */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={followerRef}></div>

      {/* Navegacion */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <a href="#" className="logo">
            <div className="logo-icon">
              <span className="logo-n">N</span>
            </div>
            <span className="logo-text">NeumorStudio</span>
          </a>
          <ul className="nav-links">
            <li><a href="#inicio" className="nav-link active">Inicio</a></li>
            <li><a href="#servicios" className="nav-link">Servicios</a></li>
            <li><a href="#portfolio" className="nav-link">Portfolio</a></li>
            <li><a href="#nosotros" className="nav-link">Nosotros</a></li>
            <li><a href="#contacto" className="nav-link">Contacto</a></li>
          </ul>
          <button className="cta-button neu-button">
            <span>Empezar Proyecto</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="inicio">
        <div className="hero-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge neu-inset">
            <span className="badge-dot"></span>
            <span>Agencia Digital Premium</span>
          </div>
          <h1 className="hero-title">
            <span className="title-line">Transformamos</span>
            <span className="title-line highlight">Ideas</span>
            <span className="title-line">en Experiencias</span>
            <span className="title-line gradient-text">Digitales</span>
          </h1>
          <p className="hero-description">
            Disenamos y desarrollamos sitios web unicos, gestionamos tu presencia en redes sociales
            y creamos estrategias de captacion que convierten visitantes en clientes.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary neu-button">
              <span>Ver Nuestro Trabajo</span>
              <div className="btn-shine"></div>
            </button>
            <button className="btn-secondary neu-button-outline">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
              <span>Ver Showreel</span>
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item neu-card">
              <span className="stat-number" data-count="150">0</span>
              <span className="stat-label">Proyectos</span>
            </div>
            <div className="stat-item neu-card">
              <span className="stat-number" data-count="98">0</span>
              <span className="stat-suffix">%</span>
              <span className="stat-label">Satisfaccion</span>
            </div>
            <div className="stat-item neu-card">
              <span className="stat-number" data-count="5">0</span>
              <span className="stat-label">Anos Exp.</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-cards">
            <div className="floating-card card-1 neu-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18"/>
                  <path d="M9 21V9"/>
                </svg>
              </div>
              <span>Diseno Web</span>
            </div>
            <div className="floating-card card-2 neu-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </div>
              <span>Marketing</span>
            </div>
            <div className="floating-card card-3 neu-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <span>Clientes</span>
            </div>
            <div className="floating-card card-4 neu-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </div>
              <span>Redes</span>
            </div>
          </div>
          <div className="hero-mockup neu-card-elevated">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="mockup-url neu-inset">neumorstudio.com</div>
            </div>
            <div className="mockup-content">
              <div className="mockup-sidebar neu-inset">
                <div className="sidebar-item active"></div>
                <div className="sidebar-item"></div>
                <div className="sidebar-item"></div>
                <div className="sidebar-item"></div>
              </div>
              <div className="mockup-main">
                <div className="mockup-card neu-card"></div>
                <div className="mockup-card neu-card"></div>
                <div className="mockup-card neu-card"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse neu-inset">
            <div className="wheel"></div>
          </div>
          <span>Scroll para explorar</span>
        </div>
      </section>

      {/* Marquee de clientes */}
      <section className="clients-marquee">
        <div className="marquee-track">
          <div className="marquee-content">
            {['TechCorp', 'StartupX', 'InnovateLab', 'DigitalFirst', 'FutureMedia', 'CloudNine'].map((client, i) => (
              <span key={i}>
                <span className="client-name">{client}</span>
                <span className="separator">*</span>
              </span>
            ))}
            {['TechCorp', 'StartupX', 'InnovateLab', 'DigitalFirst', 'FutureMedia', 'CloudNine'].map((client, i) => (
              <span key={`dup-${i}`}>
                <span className="client-name">{client}</span>
                <span className="separator">*</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="services" id="servicios">
        <div className="container">
          <div className="section-header">
            <span className="section-tag neu-inset" data-animation="fade-up">Nuestros Servicios</span>
            <h2 className="section-title" data-animation="fade-up" data-delay="0.1">
              Soluciones digitales<br/>
              <span className="gradient-text">completas</span> para tu negocio
            </h2>
            <p className="section-description" data-animation="fade-up" data-delay="0.2">
              Ofrecemos un ecosistema completo de servicios digitales disenados para
              impulsar tu marca hacia el exito.
            </p>
          </div>

          <div className="services-grid">
            {[
              { num: '01', icon: 'web', title: 'Diseno & Desarrollo Web', desc: 'Creamos sitios web a medida con diseno neumorfico, animaciones fluidas y experiencias de usuario excepcionales que convierten visitantes en clientes.', features: ['Diseno UI/UX personalizado', 'Desarrollo responsive', 'Optimizacion SEO', 'CMS intuitivo'] },
              { num: '02', icon: 'social', title: 'Gestion de Redes Sociales', desc: 'Gestionamos tu presencia digital con estrategias de contenido que aumentan el engagement y construyen comunidades fieles a tu marca.', features: ['Estrategia de contenido', 'Community management', 'Diseno de publicaciones', 'Analisis y reportes'], featured: true },
              { num: '03', icon: 'leads', title: 'Captacion de Clientes', desc: 'Desarrollamos embudos de conversion efectivos y campanas de marketing que generan leads cualificados para tu negocio.', features: ['Funnels de conversion', 'Email marketing', 'Campanas PPC', 'Landing pages'] },
              { num: '04', icon: 'branding', title: 'Branding & Identidad', desc: 'Construimos identidades de marca memorables que conectan emocionalmente con tu audiencia y te diferencian de la competencia.', features: ['Diseno de logotipo', 'Manual de marca', 'Identidad visual', 'Papeleria corporativa'] },
            ].map((service, i) => (
              <div key={i} className={`service-card neu-card ${service.featured ? 'featured' : ''}`} data-animation="fade-up" data-delay={`${0.1 * (i + 1)}`}>
                {service.featured && <div className="featured-badge">Popular</div>}
                <div className="service-number">{service.num}</div>
                <div className="service-icon neu-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {service.icon === 'web' && <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 8l3 3-3 3"/><path d="M13 14h4"/></>}
                    {service.icon === 'social' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></>}
                    {service.icon === 'leads' && <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>}
                    {service.icon === 'branding' && <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>}
                  </svg>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.desc}</p>
                <ul className="service-features">
                  {service.features.map((f, j) => (
                    <li key={j}><span className="check-icon"></span>{f}</li>
                  ))}
                </ul>
                <a href="#" className="service-link">
                  <span>Explorar servicio</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="process">
        <div className="container">
          <div className="section-header">
            <span className="section-tag neu-inset" data-animation="fade-up">Nuestro Proceso</span>
            <h2 className="section-title" data-animation="fade-up" data-delay="0.1">
              Como llevamos tu proyecto<br/>
              <span className="gradient-text">al siguiente nivel</span>
            </h2>
          </div>

          <div className="process-timeline">
            <div className="timeline-line"></div>
            {[
              { num: '01', title: 'Descubrimiento', desc: 'Analizamos tu negocio, competencia y objetivos para crear una estrategia personalizada.' },
              { num: '02', title: 'Diseno', desc: 'Creamos wireframes y prototipos interactivos que visualizan la solucion perfecta.' },
              { num: '03', title: 'Desarrollo', desc: 'Transformamos el diseno en codigo limpio y optimizado con las ultimas tecnologias.' },
              { num: '04', title: 'Lanzamiento', desc: 'Desplegamos tu proyecto y proporcionamos soporte continuo para su exito.' },
            ].map((step, i) => (
              <div key={i} className="process-step" data-animation={i % 2 === 0 ? 'fade-right' : 'fade-left'} data-delay={`${0.1 * (i + 1)}`}>
                <div className="step-marker neu-card"><span>{step.num}</span></div>
                <div className="step-content neu-card">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="portfolio" id="portfolio">
        <div className="container">
          <div className="section-header">
            <span className="section-tag neu-inset" data-animation="fade-up">Portfolio</span>
            <h2 className="section-title" data-animation="fade-up" data-delay="0.1">
              Proyectos que hablan<br/>
              <span className="gradient-text">por si solos</span>
            </h2>
          </div>

          <div className="portfolio-filter" data-animation="fade-up" data-delay="0.2">
            {['all', 'web', 'branding', 'marketing'].map(filter => (
              <button
                key={filter}
                className={`filter-btn neu-button ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'all' ? 'Todos' : filter === 'web' ? 'Web Design' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filteredPortfolio.map((item, i) => (
              <div key={i} className={`portfolio-item neu-card ${item.large ? 'large' : ''}`} data-category={item.category}>
                <div className="portfolio-image">
                  <div className={`image-placeholder ${item.gradient}`}></div>
                  <div className="portfolio-overlay">
                    <span className="portfolio-tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <a href="#" className="portfolio-link neu-button"><span>Ver proyecto</span></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-tag neu-inset" data-animation="fade-up">Testimonios</span>
            <h2 className="section-title" data-animation="fade-up" data-delay="0.1">
              Lo que dicen<br/>
              <span className="gradient-text">nuestros clientes</span>
            </h2>
          </div>

          <div className="testimonials-slider" data-animation="fade-up" data-delay="0.2">
            <div className="testimonial-track" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-card neu-card">
                  <div className="testimonial-content">
                    <div className="quote-icon">&ldquo;</div>
                    <p>{t.text}</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar neu-inset"><span>{t.initials}</span></div>
                    <div className="author-info">
                      <h4>{t.name}</h4>
                      <span>{t.role}</span>
                    </div>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, j) => <span key={j} className="star">&#9733;</span>)}
                  </div>
                </div>
              ))}
            </div>

            <div className="slider-controls">
              <button className="slider-btn prev neu-button" onClick={() => setCurrentTestimonial(prev => prev === 0 ? 2 : prev - 1)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <div className="slider-dots">
                {[0, 1, 2].map(i => (
                  <span key={i} className={`dot ${currentTestimonial === i ? 'active' : ''}`} onClick={() => setCurrentTestimonial(i)}></span>
                ))}
              </div>
              <button className="slider-btn next neu-button" onClick={() => setCurrentTestimonial(prev => (prev + 1) % 3)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="about" id="nosotros">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <span className="section-tag neu-inset" data-animation="fade-up">Sobre Nosotros</span>
              <h2 className="section-title" data-animation="fade-up" data-delay="0.1">
                Somos creativos<br/>
                <span className="gradient-text">apasionados</span> por el diseno
              </h2>
              <p className="about-description" data-animation="fade-up" data-delay="0.2">
                NeumorStudio nacio de la pasion por crear experiencias digitales que marcan la diferencia.
                Combinamos creatividad, tecnologia y estrategia para transformar marcas y conectar con audiencias.
              </p>
              <div className="about-features" data-animation="fade-up" data-delay="0.3">
                {[
                  { icon: 'clock', title: 'Entrega Puntual', desc: 'Cumplimos con los plazos establecidos, siempre.' },
                  { icon: 'doc', title: 'Proceso Transparente', desc: 'Comunicacion clara en cada etapa del proyecto.' },
                  { icon: 'gear', title: 'Soporte Continuo', desc: 'Te acompanamos despues del lanzamiento.' },
                ].map((f, i) => (
                  <div key={i} className="feature-item">
                    <div className="feature-icon neu-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {f.icon === 'clock' && <><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></>}
                        {f.icon === 'doc' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></>}
                        {f.icon === 'gear' && <><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>}
                      </svg>
                    </div>
                    <div className="feature-text">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-visual" data-animation="fade-left" data-delay="0.2">
              <div className="visual-card main-card neu-card-elevated">
                <div className="card-content">
                  <div className="team-grid">
                    {['NS', 'DL', 'MR', '+5'].map((t, i) => (
                      <div key={i} className="team-member neu-inset"><span>{t}</span></div>
                    ))}
                  </div>
                  <p className="team-label">Equipo creativo</p>
                </div>
              </div>
              <div className="visual-card floating-stat neu-card">
                <span className="stat-value">150+</span>
                <span className="stat-text">Proyectos completados</span>
              </div>
              <div className="visual-card floating-badge neu-card">
                <div className="badge-icon">&#9733;</div>
                <span>Top Rated Agency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card neu-card-elevated" data-animation="fade-up">
            <div className="cta-bg">
              <div className="cta-orb orb-1"></div>
              <div className="cta-orb orb-2"></div>
            </div>
            <div className="cta-content">
              <h2>Listo para transformar<br/>tu presencia digital?</h2>
              <p>Agenda una consulta gratuita y descubre como podemos ayudarte a alcanzar tus objetivos.</p>
              <div className="cta-buttons">
                <button className="neu-btn-glow">
                  <span>Agendar Consulta</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <button className="neu-btn-3d">
                  <span>Ver Planes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="contact" id="contacto">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <span className="section-tag neu-inset" data-animation="fade-up">Contacto</span>
              <h2 className="section-title" data-animation="fade-up" data-delay="0.1">
                Hablemos de tu<br/>
                <span className="gradient-text">proximo proyecto</span>
              </h2>
              <p className="contact-description" data-animation="fade-up" data-delay="0.2">
                Estamos aqui para escucharte. Cuentanos tu idea y juntos la haremos realidad.
              </p>

              <div className="contact-details" data-animation="fade-up" data-delay="0.3">
                {[
                  { icon: 'mail', label: 'Email', value: 'hola@neumorstudio.com', href: 'mailto:hola@neumorstudio.com' },
                  { icon: 'phone', label: 'Telefono', value: '+34 612 345 678', href: 'tel:+34612345678' },
                  { icon: 'location', label: 'Ubicacion', value: 'Madrid, Espana' },
                ].map((item, i) => (
                  <div key={i} className="contact-item">
                    <div className="contact-icon neu-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {item.icon === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></>}
                        {item.icon === 'phone' && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>}
                        {item.icon === 'location' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>}
                      </svg>
                    </div>
                    <div>
                      <span className="label">{item.label}</span>
                      {item.href ? <a href={item.href}>{item.value}</a> : <span>{item.value}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-links" data-animation="fade-up" data-delay="0.4">
                {['instagram', 'twitter', 'linkedin', 'dribbble'].map((social, i) => (
                  <a key={i} href="#" className="neu-social-icon" aria-label={social}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {social === 'instagram' && <><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>}
                      {social === 'twitter' && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>}
                      {social === 'linkedin' && <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>}
                      {social === 'dribbble' && <><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></>}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <form className="contact-form neu-card" data-animation="fade-left" data-delay="0.2" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Nombre completo</label>
                <input type="text" id="name" name="name" className="neu-input" placeholder="Tu nombre" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="neu-input" placeholder="tu@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="service">Servicio de interes</label>
                <select id="service" name="service" className="neu-input">
                  <option value="">Selecciona un servicio</option>
                  <option value="web">Diseno Web</option>
                  <option value="social">Redes Sociales</option>
                  <option value="marketing">Marketing Digital</option>
                  <option value="branding">Branding</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea id="message" name="message" className="neu-input" rows={4} placeholder="Cuentanos sobre tu proyecto..." required></textarea>
              </div>
              <div className="form-group checkbox-group">
                <label className="neu-checkbox">
                  <input type="checkbox" required />
                  <span className="checkmark"></span>
                  <span className="checkbox-label">Acepto la <a href="#">politica de privacidad</a> y los <a href="#">terminos de servicio</a></span>
                </label>
              </div>
              <button type="submit" className="neu-btn-glow full-width">
                <span>Enviar mensaje</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Showcase de Componentes */}
      <section className="components-showcase">
        <div className="container">
          <div className="section-header">
            <span className="section-tag neu-inset" data-animation="fade-up">UI Components</span>
            <h2 className="section-title" data-animation="fade-up" data-delay="0.1">
              Diseno neumorfico<br/>
              <span className="gradient-text">a tu medida</span>
            </h2>
            <p className="section-description" data-animation="fade-up" data-delay="0.2">
              Creamos interfaces unicas con elementos 3D, efectos de luz y sombra que dan vida a tu marca.
            </p>
          </div>

          <div className="showcase-grid" data-animation="fade-up" data-delay="0.3">
            {/* Toggles Demo */}
            <div className="showcase-item neu-card">
              <h4>Toggles Interactivos</h4>
              <div className="showcase-content">
                <label className="neu-toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
                <label className="neu-toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            {/* Progress Demo */}
            <div className="showcase-item neu-card">
              <h4>Barras de Progreso</h4>
              <div className="showcase-content progress-demo">
                <div className="neu-progress">
                  <div className="neu-progress-bar" style={{ width: '75%' }}></div>
                </div>
                <div className="neu-progress">
                  <div className="neu-progress-bar" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>

            {/* Loaders Demo */}
            <div className="showcase-item neu-card">
              <h4>Loaders Elegantes</h4>
              <div className="showcase-content loaders-row">
                <div className="neu-loader-pulse"></div>
                <div className="neu-loader-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="neu-loader-spinner"></div>
              </div>
            </div>

            {/* Radio Buttons Demo */}
            <div className="showcase-item neu-card">
              <h4>Selectores de Opcion</h4>
              <div className="showcase-content radio-group">
                <label className="neu-radio">
                  <input type="radio" name="demo-radio" defaultChecked />
                  <span className="neu-radio-mark"></span>
                  <span>Opcion A</span>
                </label>
                <label className="neu-radio">
                  <input type="radio" name="demo-radio" />
                  <span className="neu-radio-mark"></span>
                  <span>Opcion B</span>
                </label>
              </div>
            </div>

            {/* 3D Card Demo */}
            <div className="showcase-item showcase-item-large neu-card-3d">
              <div className="card-inner">
                <div className="card-face card-front">
                  <div className="showcase-3d-content">
                    <div className="icon-3d neu-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h4>Tarjetas 3D</h4>
                    <p>Hover para ver el efecto</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glassmorphism Demo */}
            <div className="showcase-item neu-glass">
              <h4>Glassmorphism</h4>
              <div className="showcase-content">
                <p>Combinacion de efectos cristal y neumorficos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#" className="logo">
                <div className="logo-icon"><span className="logo-n">N</span></div>
                <span className="logo-text">NeumorStudio</span>
              </a>
              <p>Transformamos ideas en experiencias digitales que conectan, inspiran y convierten.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Servicios</h4>
                <ul>
                  <li><a href="#">Diseno Web</a></li>
                  <li><a href="#">Redes Sociales</a></li>
                  <li><a href="#">Marketing Digital</a></li>
                  <li><a href="#">Branding</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Empresa</h4>
                <ul>
                  <li><a href="#">Sobre Nosotros</a></li>
                  <li><a href="#">Portfolio</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Contacto</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#">Privacidad</a></li>
                  <li><a href="#">Terminos</a></li>
                  <li><a href="#">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 NeumorStudio. Todos los derechos reservados.</p>
            <p>Hecho con pasion en Madrid</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
