import "../docs.css";

export const metadata = {
  title: "Arquitectura | NeumorStudio Docs",
  description: "Visión general de la arquitectura del sistema NeumorStudio Plantillas",
};

export default function ArquitecturaPage() {
  return (
    <article className="docs-content">
      <h1>Arquitectura del Sistema</h1>
      <p className="docs-lead">
        NeumorStudio Plantillas implementa una arquitectura multi-tenant con separación clara
        entre frontend público, panel de administración y servicios de backend.
      </p>

      <h2>Diagrama de arquitectura</h2>
      <div className="docs-diagram">{`┌─────────────────────────────────────────────────────────────┐
│                    USUARIOS FINALES                          │
│              (clientes de los negocios)                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                 SITIOS WEB PÚBLICOS                          │
│                      (Astro 5)                               │
│                                                              │
│  - SSR con Node.js adapter                                  │
│  - Carga configuración desde Supabase por website_id        │
│  - Formularios envían datos a webhooks n8n                  │
│  - Preview mode para personalización en tiempo real         │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┴────────────────┐
          ▼                                 ▼
┌──────────────────────┐         ┌─────────────────────────┐
│    n8n WORKFLOWS     │         │       SUPABASE          │
│                      │         │                         │
│  - Webhooks          │         │  - PostgreSQL           │
│  - Procesamiento     │◄───────►│  - Auth                 │
│  - Notificaciones    │         │  - Row Level Security   │
│  - Email/WhatsApp    │         │  - Realtime             │
└──────────────────────┘         └─────────────────────────┘
                                            ▲
                                            │
┌─────────────────────────────────────────────────────────────┐
│                   PANEL DE ADMIN                             │
│                    (Next.js 15)                              │
│                                                              │
│  - Server Components y Server Actions                       │
│  - Middleware de autenticación                              │
│  - Gestión de reservas, leads, configuración               │
│  - Personalización de temas                                 │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │
┌─────────────────────────────────────────────────────────────┐
│              ADMINISTRADORES DE NEGOCIOS                     │
│            (usuarios del panel de admin)                     │
└─────────────────────────────────────────────────────────────┘`}</div>

      <h2>Componentes principales</h2>

      <h3>Sitios Web Públicos (Astro)</h3>
      <p>
        Sitios estáticos con capacidad SSR que sirven como presencia web de cada negocio:
      </p>
      <ul>
        <li><strong>Renderizado:</strong> SSR con <code>@astrojs/node</code> para contenido dinámico</li>
        <li><strong>Datos:</strong> Carga configuración desde Supabase según <code>PUBLIC_WEBSITE_ID</code></li>
        <li><strong>Formularios:</strong> Envían datos a webhooks de n8n</li>
        <li><strong>Personalización:</strong> Sistema de variantes de componentes configurable</li>
      </ul>

      <h3>Panel de Administración (Next.js)</h3>
      <p>Aplicación web para gestión de cada negocio:</p>
      <ul>
        <li><strong>Autenticación:</strong> Supabase Auth con middleware de protección</li>
        <li><strong>Server Actions:</strong> Operaciones CRUD sin API routes tradicionales</li>
        <li><strong>Tiempo real:</strong> Sincronización con Supabase Realtime</li>
        <li><strong>Multi-tenant:</strong> Filtrado de datos por <code>website_id</code></li>
      </ul>

      <h3>Motor de Automatizaciones (n8n)</h3>
      <p>Orquestador de workflows para notificaciones:</p>
      <ul>
        <li><strong>Webhooks:</strong> Recepción de datos desde formularios</li>
        <li><strong>Procesamiento:</strong> Transformación y validación de datos</li>
        <li><strong>Notificaciones:</strong> Email y WhatsApp configurables</li>
        <li><strong>Logging:</strong> Registro de actividad en Supabase</li>
      </ul>

      <h3>Base de Datos (Supabase)</h3>
      <p>Backend serverless con PostgreSQL:</p>
      <ul>
        <li><strong>Row Level Security:</strong> Aislamiento de datos por cliente</li>
        <li><strong>Auth integrado:</strong> Gestión de usuarios y sesiones</li>
        <li><strong>Realtime:</strong> Sincronización en tiempo real</li>
        <li><strong>API automática:</strong> REST y GraphQL generados</li>
      </ul>

      <h2>Flujo de una reserva</h2>
      <div className="docs-diagram">{`1. Usuario completa formulario en sitio Astro
   └─> POST a webhook n8n con datos del formulario

2. n8n procesa la solicitud
   ├─> Inserta reserva en tabla bookings
   ├─> Consulta notification_settings del website
   ├─> Si email activo → envía confirmación
   ├─> Si WhatsApp activo → envía mensaje
   └─> Registra evento en activity_log

3. Admin ve la reserva en panel Next.js
   ├─> Puede confirmar/cancelar
   └─> Cambios actualizados en tiempo real

4. 24h antes (si configurado)
   └─> n8n ejecuta workflow de recordatorio`}</div>

      <h2>Decisiones arquitectónicas clave</h2>

      <h3>¿Por qué Astro para los sitios públicos?</h3>
      <ul>
        <li><strong>Performance:</strong> Genera HTML estático con hidratación selectiva</li>
        <li><strong>Flexibilidad:</strong> Soporta React, Vue, Svelte según necesidad</li>
        <li><strong>SSR opcional:</strong> Node adapter permite contenido dinámico</li>
        <li><strong>SEO nativo:</strong> HTML semántico sin JavaScript innecesario</li>
      </ul>

      <h3>¿Por qué Next.js para el admin?</h3>
      <ul>
        <li><strong>React ecosystem:</strong> Amplia disponibilidad de componentes</li>
        <li><strong>Server Components:</strong> Reduce bundle size del cliente</li>
        <li><strong>Server Actions:</strong> Simplifica operaciones de servidor</li>
        <li><strong>Middleware:</strong> Protección de rutas centralizada</li>
      </ul>

      <h3>¿Por qué Supabase como backend?</h3>
      <ul>
        <li><strong>Sin servidor propio:</strong> Reduce complejidad operativa</li>
        <li><strong>PostgreSQL completo:</strong> Capacidades SQL avanzadas</li>
        <li><strong>Auth integrado:</strong> Sin implementación manual</li>
        <li><strong>RLS nativo:</strong> Seguridad multi-tenant desde la base de datos</li>
      </ul>

      <h3>¿Por qué n8n para automatizaciones?</h3>
      <ul>
        <li><strong>Visual:</strong> Workflows editables sin código</li>
        <li><strong>Self-hosted:</strong> Control total sobre los datos</li>
        <li><strong>Extensible:</strong> Nodos personalizados posibles</li>
        <li><strong>Webhooks nativos:</strong> Integración directa con formularios</li>
      </ul>

      <h2>Modelo de multi-tenancy</h2>
      <p>El aislamiento de datos se implementa a nivel de base de datos:</p>
      <pre><code>{`-- Ejemplo de política RLS en tabla bookings
CREATE POLICY "Users can only see their website bookings"
ON bookings
FOR SELECT
USING (
  website_id IN (
    SELECT id FROM websites
    WHERE client_id = auth.uid()
  )
);`}</code></pre>

      <p>Cada cliente:</p>
      <ul>
        <li>Tiene un registro en <code>clients</code></li>
        <li>Puede tener múltiples <code>websites</code></li>
        <li>Solo accede a datos de sus propios websites</li>
        <li>La verificación ocurre en cada consulta SQL</li>
      </ul>
    </article>
  );
}
