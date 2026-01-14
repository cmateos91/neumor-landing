import "../docs.css";

export const metadata = {
  title: "Stack Tecnológico | NeumorStudio Docs",
  description: "Tecnologías utilizadas en NeumorStudio Plantillas y justificación de cada elección",
};

export default function TechStackPage() {
  return (
    <article className="docs-content">
      <h1>Stack Tecnológico</h1>
      <p className="docs-lead">
        Detalle de las tecnologías utilizadas en NeumorStudio Plantillas y la justificación de cada elección.
      </p>

      <h2>Resumen del stack</h2>
      <table>
        <thead>
          <tr>
            <th>Capa</th>
            <th>Tecnología</th>
            <th>Versión</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Runtime</td><td>Node.js</td><td>18+ (recomendado 20 LTS)</td></tr>
          <tr><td>Package Manager</td><td>pnpm</td><td>10.26.0</td></tr>
          <tr><td>Monorepo</td><td>Turborepo</td><td>2.3.3</td></tr>
          <tr><td>Lenguaje</td><td>TypeScript</td><td>5.7.2</td></tr>
          <tr><td>UI Framework</td><td>React</td><td>19.0.0</td></tr>
          <tr><td>Admin Framework</td><td>Next.js</td><td>15.1.3</td></tr>
          <tr><td>Sites Framework</td><td>Astro</td><td>5.16.6</td></tr>
          <tr><td>CSS</td><td>Tailwind CSS</td><td>4.0.0</td></tr>
          <tr><td>Backend</td><td>Supabase</td><td>2.47.10+</td></tr>
          <tr><td>Automatización</td><td>n8n</td><td>Latest</td></tr>
        </tbody>
      </table>

      <h2>Frameworks principales</h2>

      <h3>Next.js 15</h3>
      <p><strong>Uso:</strong> Panel de administración</p>
      <p><strong>Características aprovechadas:</strong></p>
      <ul>
        <li>App Router con layouts anidados</li>
        <li>Server Components para reducir JavaScript del cliente</li>
        <li>Server Actions para operaciones CRUD sin API tradicional</li>
        <li>Middleware para protección de rutas</li>
        <li>Soporte nativo para React 19</li>
      </ul>
      <p>
        <strong>Justificación:</strong> Next.js proporciona el ecosistema más maduro para aplicaciones
        React con renderizado del servidor. La versión 15 con Server Actions simplifica significativamente
        la comunicación cliente-servidor.
      </p>

      <h3>Astro 5</h3>
      <p><strong>Uso:</strong> Sitios web públicos de cada negocio</p>
      <p><strong>Características aprovechadas:</strong></p>
      <ul>
        <li>Zero-JS por defecto con hidratación selectiva</li>
        <li>SSR mediante <code>@astrojs/node</code> adapter</li>
        <li>Soporte multi-framework (puede usar React si es necesario)</li>
        <li>Componentes <code>.astro</code> para templates</li>
      </ul>
      <p>
        <strong>Justificación:</strong> Astro genera sitios extremadamente rápidos al enviar HTML puro.
        El SSR permite contenido dinámico (configuración por cliente) sin sacrificar rendimiento.
      </p>

      <h3>React 19</h3>
      <p><strong>Uso:</strong> Componentes interactivos en admin y potencialmente en templates</p>
      <p><strong>Características aprovechadas:</strong></p>
      <ul>
        <li>Server Components (via Next.js)</li>
        <li>Hooks modernos</li>
        <li>Concurrent rendering</li>
      </ul>
      <p><strong>Justificación:</strong> Estándar de la industria con el mejor ecosistema de componentes disponible.</p>

      <h2>Herramientas de desarrollo</h2>

      <h3>Turborepo</h3>
      <p><strong>Propósito:</strong> Orquestación de builds en monorepo</p>
      <p><strong>Beneficios:</strong></p>
      <ul>
        <li>Cache de builds entre ejecuciones</li>
        <li>Ejecución paralela de tareas</li>
        <li>Dependencias entre workspaces resueltas automáticamente</li>
      </ul>

      <h3>pnpm</h3>
      <p><strong>Propósito:</strong> Gestión de dependencias</p>
      <p><strong>Beneficios:</strong></p>
      <ul>
        <li>Espacio en disco optimizado (symlinks)</li>
        <li>Instalación más rápida que npm/yarn</li>
        <li>Soporte nativo para workspaces</li>
        <li>Stricto por defecto (evita phantom dependencies)</li>
      </ul>

      <h3>TypeScript 5.7</h3>
      <p><strong>Propósito:</strong> Tipado estático</p>
      <p><strong>Configuración:</strong></p>
      <ul>
        <li><code>strict: true</code> habilitado</li>
        <li>Module resolution: <code>bundler</code></li>
        <li>Target: ES2017</li>
      </ul>

      <h2>Estilos</h2>

      <h3>Tailwind CSS 4</h3>
      <p><strong>Propósito:</strong> Framework de utilidades CSS</p>
      <pre><code>{`// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
}`}</code></pre>
      <p>
        <strong>Justificación:</strong> Tailwind 4 introduce mejoras de rendimiento significativas y
        sintaxis simplificada. El sistema de utilidades permite desarrollo rápido sin escribir CSS personalizado.
      </p>

      <h3>Sistema Neumórfico</h3>
      <p><strong>Propósito:</strong> Estética visual distintiva</p>
      <p><strong>Implementación:</strong> Clases CSS personalizadas en <code>neumorphic.css</code></p>
      <p><strong>Clases principales:</strong></p>
      <ul>
        <li><code>.neumor-raised</code> - Efecto de elemento elevado</li>
        <li><code>.neumor-inset</code> - Efecto de elemento hundido</li>
        <li><code>.neumor-btn</code> - Botones interactivos</li>
        <li><code>.neumor-card</code> - Tarjetas con sombras suaves</li>
      </ul>

      <h2>Backend y datos</h2>

      <h3>Supabase</h3>
      <p><strong>Propósito:</strong> Backend serverless completo</p>
      <table>
        <thead>
          <tr>
            <th>Componente</th>
            <th>Uso</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>PostgreSQL</td><td>Base de datos relacional</td></tr>
          <tr><td>Auth</td><td>Autenticación de usuarios</td></tr>
          <tr><td>RLS</td><td>Row Level Security para multi-tenancy</td></tr>
          <tr><td>Realtime</td><td>Sincronización en tiempo real</td></tr>
        </tbody>
      </table>
      <p>
        <strong>Justificación:</strong> Supabase elimina la necesidad de mantener un servidor propio.
        PostgreSQL proporciona capacidades SQL completas y RLS permite seguridad a nivel de base de datos.
      </p>

      <h3>n8n</h3>
      <p><strong>Propósito:</strong> Automatización de workflows</p>
      <p><strong>Uso:</strong></p>
      <ul>
        <li>Recepción de webhooks desde formularios</li>
        <li>Procesamiento de reservas y leads</li>
        <li>Envío de notificaciones (email, WhatsApp)</li>
        <li>Recordatorios programados</li>
      </ul>
      <p>
        <strong>Justificación:</strong> n8n permite crear workflows visuales sin código.
        Self-hosted mantiene control sobre los datos y evita dependencia de servicios externos.
      </p>

      <h2>Versiones mínimas requeridas</h2>
      <table>
        <thead>
          <tr>
            <th>Herramienta</th>
            <th>Versión mínima</th>
            <th>Recomendada</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Node.js</td><td>18.0.0</td><td>20 LTS</td></tr>
          <tr><td>pnpm</td><td>8.0.0</td><td>10.x</td></tr>
          <tr><td>Git</td><td>2.30.0</td><td>Latest</td></tr>
        </tbody>
      </table>
    </article>
  );
}
