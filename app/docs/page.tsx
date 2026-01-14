import "./docs.css";

export const metadata = {
  title: "Documentación | NeumorStudio Plantillas",
  description: "Documentación técnica del sistema SaaS multi-tenant NeumorStudio Plantillas",
};

export default function DocsIntroPage() {
  return (
    <article className="docs-content">
      <h1>NeumorStudio Plantillas</h1>
      <p className="docs-lead">
        Sistema SaaS multi-tenant para la creación y gestión de sitios web con estética neumórfica.
      </p>

      <h2>¿Qué es NeumorStudio Plantillas?</h2>
      <p>
        NeumorStudio Plantillas es una plataforma completa que permite desplegar sitios web
        personalizables para diferentes tipos de negocios (restaurantes, clínicas, salones,
        gimnasios, tiendas), junto con un panel de administración centralizado y automatizaciones
        de notificaciones.
      </p>

      <p>El sistema está diseñado para:</p>
      <ul>
        <li><strong>Agencias y freelancers</strong> que necesitan entregar sitios web funcionales rápidamente</li>
        <li><strong>Negocios locales</strong> que requieren presencia web con gestión de reservas y leads</li>
        <li><strong>Desarrolladores</strong> que buscan una base sólida para proyectos multi-tenant</li>
      </ul>

      <h2>Características principales</h2>
      <table>
        <thead>
          <tr>
            <th>Característica</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Multi-tenant</strong></td>
            <td>Aislamiento de datos por cliente mediante Row Level Security</td>
          </tr>
          <tr>
            <td><strong>Plantillas modulares</strong></td>
            <td>5 tipos de negocio con múltiples variantes de componentes</td>
          </tr>
          <tr>
            <td><strong>Panel de administración</strong></td>
            <td>Gestión completa de reservas, leads y configuración</td>
          </tr>
          <tr>
            <td><strong>Automatizaciones</strong></td>
            <td>Notificaciones por email y WhatsApp via n8n</td>
          </tr>
          <tr>
            <td><strong>Personalización en vivo</strong></td>
            <td>Preview mode para ajustar temas y variantes</td>
          </tr>
          <tr>
            <td><strong>CLI de onboarding</strong></td>
            <td>Herramienta interactiva para crear nuevos clientes</td>
          </tr>
        </tbody>
      </table>

      <h2>Tipos de negocio soportados</h2>
      <ul>
        <li><strong>Restaurant</strong>: Sitios para restaurantes con sistema de reservas</li>
        <li><strong>Clinic</strong>: Sitios para clínicas con gestión de citas</li>
        <li><strong>Salon</strong>: Sitios para salones de belleza</li>
        <li><strong>Gym</strong>: Sitios para gimnasios y centros fitness</li>
        <li><strong>Store</strong>: Sitios para tiendas con captura de leads</li>
      </ul>

      <h2>Estado actual del proyecto</h2>
      <p>
        El proyecto se encuentra en <span className="docs-badge docs-badge-success">producción activa</span> con
        las siguientes capacidades operativas:
      </p>
      <ul>
        <li>Panel de administración completamente funcional</li>
        <li>5 plantillas Astro con SSR habilitado</li>
        <li>Sistema de autenticación implementado</li>
        <li>Automatizaciones de reservas y leads configurables</li>
        <li>CLI para onboarding de clientes</li>
      </ul>

      <h3>Componentes pendientes</h3>
      <ul>
        <li>Tests automatizados (unitarios e integración)</li>
        <li>CI/CD pipeline</li>
        <li>Documentación de API de workflows n8n</li>
        <li>Monitoring y error tracking</li>
      </ul>

      <h2>Navegación de la documentación</h2>
      <table>
        <thead>
          <tr>
            <th>Sección</th>
            <th>Contenido</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a href="/docs/arquitectura">Arquitectura</a></td>
            <td>Visión general del sistema y decisiones técnicas</td>
          </tr>
          <tr>
            <td><a href="/docs/tech-stack">Stack Tecnológico</a></td>
            <td>Tecnologías utilizadas y justificación</td>
          </tr>
          <tr>
            <td><a href="/docs/funcionalidades">Funcionalidades</a></td>
            <td>Detalle de cada funcionalidad del sistema</td>
          </tr>
          <tr>
            <td><a href="/docs/desarrollo-local">Desarrollo Local</a></td>
            <td>Configuración del entorno de desarrollo</td>
          </tr>
          <tr>
            <td><a href="/docs/persistencia">Persistencia</a></td>
            <td>Modelo de datos y almacenamiento</td>
          </tr>
          <tr>
            <td><a href="/docs/seguridad">Seguridad</a></td>
            <td>Consideraciones y medidas de seguridad</td>
          </tr>
          <tr>
            <td><a href="/docs/roadmap">Roadmap</a></td>
            <td>Estado actual y próximos pasos</td>
          </tr>
          <tr>
            <td><a href="/docs/mantenimiento">Mantenimiento</a></td>
            <td>Guía para mantenimiento del sistema</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}
