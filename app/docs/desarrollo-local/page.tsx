import "../docs.css";

export const metadata = {
  title: "Desarrollo Local | NeumorStudio Docs",
  description: "Guía para configurar el entorno de desarrollo de NeumorStudio Plantillas",
};

export default function DesarrolloLocalPage() {
  return (
    <article className="docs-content">
      <h1>Desarrollo Local</h1>
      <p className="docs-lead">
        Guía para configurar el entorno de desarrollo de NeumorStudio Plantillas.
      </p>

      <h2>Requisitos previos</h2>

      <h3>Software requerido</h3>
      <table>
        <thead>
          <tr>
            <th>Herramienta</th>
            <th>Versión mínima</th>
            <th>Verificación</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Node.js</td><td>18.0.0 (recomendado 20 LTS)</td><td><code>node --version</code></td></tr>
          <tr><td>pnpm</td><td>8.0.0 (recomendado 10.x)</td><td><code>pnpm --version</code></td></tr>
          <tr><td>Git</td><td>2.30.0</td><td><code>git --version</code></td></tr>
        </tbody>
      </table>

      <h3>Instalación de pnpm</h3>
      <p>Si no tienes pnpm instalado:</p>
      <pre><code>{`# Con npm
npm install -g pnpm

# Con corepack (Node.js 16.13+)
corepack enable
corepack prepare pnpm@latest --activate`}</code></pre>

      <h3>Servicios externos</h3>
      <table>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Propósito</th>
            <th>Requerido</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Supabase</td><td>Base de datos y autenticación</td><td>Sí</td></tr>
          <tr><td>n8n</td><td>Automatizaciones</td><td>Para funcionalidad completa</td></tr>
        </tbody>
      </table>

      <h2>Configuración inicial</h2>

      <h3>1. Clonar el repositorio</h3>
      <pre><code>{`git clone <url-del-repositorio>
cd neumor-plantillas`}</code></pre>

      <h3>2. Instalar dependencias</h3>
      <pre><code>pnpm install</code></pre>
      <p>Este comando instala todas las dependencias de todos los workspaces gracias a la configuración del monorepo.</p>

      <h3>3. Configurar variables de entorno</h3>
      <pre><code>cp .env.example .env</code></pre>
      <p>Editar <code>.env</code> con los valores correspondientes.</p>

      <h2>Variables de entorno</h2>

      <h3>Variables requeridas</h3>
      <pre><code>{`# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...`}</code></pre>

      <p><strong>Obtener credenciales de Supabase:</strong></p>
      <ol>
        <li>Ir a <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a></li>
        <li>Crear un proyecto o acceder a uno existente</li>
        <li>Settings → API → Copiar URL y llaves</li>
      </ol>

      <h3>Variables opcionales</h3>
      <pre><code>{`# n8n - Automatizaciones
N8N_WEBHOOK_URL=https://n8n.tudominio.com/webhook/...
N8N_API_KEY=tu-api-key

# Templates específicos
PUBLIC_WEBSITE_ID=id-de-prueba
PUBLIC_RESERVATION_WEBHOOK_URL=https://n8n.tudominio.com/webhook/reservas

# Newsletter
NEWSLETTER_FROM_EMAIL=noreply@tudominio.com
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxx`}</code></pre>

      <h2>Comandos de desarrollo</h2>

      <h3>Ejecutar todo el monorepo</h3>
      <pre><code>pnpm dev</code></pre>
      <p>Inicia todas las aplicaciones en modo desarrollo.</p>

      <h3>Ejecutar aplicaciones específicas</h3>
      <pre><code>{`# Solo el panel de administración
pnpm dev:admin
# Puerto: 3001

# Solo la plantilla de restaurante
pnpm dev:restaurant
# Puerto: 3000

# Admin + Restaurant
pnpm dev:web`}</code></pre>

      <h3>Otros comandos útiles</h3>
      <pre><code>{`# Build de producción
pnpm build

# Linting
pnpm lint

# Type checking
pnpm type-check

# Formatear código
pnpm format

# Limpiar caches y node_modules
pnpm clean

# CLI de onboarding
pnpm create-client`}</code></pre>

      <h2>Estructura de puertos</h2>
      <table>
        <thead>
          <tr>
            <th>Aplicación</th>
            <th>Puerto</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Admin</td><td>3001</td><td>http://localhost:3001</td></tr>
          <tr><td>Restaurant</td><td>3000</td><td>http://localhost:3000</td></tr>
          <tr><td>Clinic</td><td>3002</td><td>http://localhost:3002</td></tr>
          <tr><td>Gym</td><td>3003</td><td>http://localhost:3003</td></tr>
          <tr><td>Salon</td><td>3004</td><td>http://localhost:3004</td></tr>
          <tr><td>Store</td><td>3005</td><td>http://localhost:3005</td></tr>
        </tbody>
      </table>

      <h2>Flujo de trabajo recomendado</h2>

      <h3>Desarrollo de nuevas funcionalidades</h3>
      <pre><code>{`# 1. Crear rama desde main
git checkout -b feature/nombre-funcionalidad

# 2. Iniciar desarrollo
pnpm dev

# 3. Hacer cambios y verificar
pnpm lint
pnpm type-check

# 4. Commit y push
git add .
git commit -m "descripción del cambio"
git push origin feature/nombre-funcionalidad`}</code></pre>

      <h3>Trabajar en una aplicación específica</h3>
      <pre><code>{`# Filtrar por nombre del workspace
pnpm --filter admin dev
pnpm --filter restaurant dev`}</code></pre>

      <h3>Agregar dependencias</h3>
      <pre><code>{`# A un workspace específico
pnpm --filter admin add nombre-paquete

# A un paquete compartido
pnpm --filter @neumorstudio/ui add nombre-paquete

# Como dependencia de desarrollo
pnpm --filter admin add -D nombre-paquete`}</code></pre>

      <h2>Solución de problemas</h2>

      <h3>Error: &quot;Cannot find module&quot;</h3>
      <p>Ejecutar instalación limpia:</p>
      <pre><code>{`pnpm clean
pnpm install`}</code></pre>

      <h3>Error: &quot;Port already in use&quot;</h3>
      <p>Matar proceso en el puerto:</p>
      <pre><code>{`# Linux/macOS
lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill

# O usar otro puerto
PORT=3010 pnpm dev:admin`}</code></pre>

      <h3>Supabase: &quot;Invalid API key&quot;</h3>
      <p>Verificar que las variables de entorno estén configuradas correctamente y que el proyecto de Supabase esté activo.</p>

      <h3>Turborepo cache issues</h3>
      <p>Limpiar cache de Turbo:</p>
      <pre><code>{`rm -rf node_modules/.cache/turbo
pnpm dev`}</code></pre>

      <h2>Herramientas recomendadas</h2>

      <h3>VS Code Extensions</h3>
      <ul>
        <li>ESLint</li>
        <li>Prettier</li>
        <li>Tailwind CSS IntelliSense</li>
        <li>Astro</li>
        <li>TypeScript Importer</li>
      </ul>
    </article>
  );
}
