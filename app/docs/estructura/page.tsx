import "../docs.css";

export const metadata = {
  title: "Estructura del Proyecto | NeumorStudio Docs",
  description: "Estructura de carpetas y organización del monorepo NeumorStudio Plantillas",
};

export default function EstructuraPage() {
  return (
    <article className="docs-content">
      <h1>Estructura del Proyecto</h1>
      <p className="docs-lead">
        NeumorStudio Plantillas utiliza una arquitectura de monorepo gestionada con pnpm workspaces y Turborepo.
      </p>

      <h2>Vista general</h2>
      <pre><code>{`neumor-plantillas/
├── apps/                    # Aplicaciones desplegables
│   ├── admin/               # Panel de administración (Next.js 15)
│   └── templates/           # Plantillas de sitios (Astro 5)
│       ├── restaurant/
│       ├── clinic/
│       ├── gym/
│       ├── salon/
│       └── store/
│
├── packages/                # Paquetes compartidos
│   ├── cli/                 # CLI de onboarding
│   ├── supabase/            # Cliente y tipos de Supabase
│   ├── ui/                  # Componentes reutilizables
│   ├── config/              # Configuraciones compartidas
│   │   ├── tailwind/
│   │   ├── typescript/
│   │   └── eslint/
│   └── n8n-templates/       # Workflows de automatización
│
├── docs/                    # Documentación
├── turbo.json               # Configuración de Turborepo
├── pnpm-workspace.yaml      # Definición de workspaces
└── package.json             # Scripts globales`}</code></pre>

      <h2>Directorio apps/</h2>
      <p>Contiene las aplicaciones que se despliegan de forma independiente.</p>

      <h3>apps/admin/</h3>
      <p>Panel de administración construido con Next.js 15.</p>
      <pre><code>{`admin/
├── src/
│   ├── app/                    # App Router
│   │   ├── layout.tsx          # Layout raíz
│   │   ├── page.tsx            # Redirect a /login
│   │   ├── login/              # Autenticación
│   │   ├── change-password/    # Cambio de contraseña
│   │   ├── dashboard/          # Rutas protegidas
│   │   │   ├── layout.tsx      # Sidebar y navegación
│   │   │   ├── page.tsx        # Dashboard principal
│   │   │   ├── reservas/       # Gestión de reservas
│   │   │   ├── leads/          # Gestión de leads
│   │   │   ├── newsletter/     # Automatización email
│   │   │   ├── configuracion/  # Ajustes del negocio
│   │   │   ├── personalizacion/# Temas y variantes
│   │   │   └── instagram/      # Integración Instagram
│   │   └── api/                # Route Handlers
│   ├── lib/
│   │   ├── supabase.ts         # Cliente browser
│   │   ├── supabase-server.ts  # Cliente servidor
│   │   ├── actions.ts          # Server Actions
│   │   └── data.ts             # Funciones de datos
│   └── middleware.ts           # Protección de rutas
└── package.json`}</code></pre>

      <p><strong>Responsabilidades:</strong></p>
      <ul>
        <li>Autenticación de administradores</li>
        <li>CRUD de reservas y leads</li>
        <li>Configuración de automatizaciones</li>
        <li>Personalización de temas del sitio público</li>
      </ul>

      <h3>apps/templates/</h3>
      <p>Plantillas Astro para diferentes tipos de negocio. Todas comparten la misma estructura base.</p>
      <pre><code>{`restaurant/  (ejemplo, las demás son idénticas)
├── src/
│   ├── pages/
│   │   └── index.astro         # Página principal
│   ├── components/
│   │   ├── Header.astro
│   │   ├── ReservationForm.astro
│   │   ├── Hero/               # 4 variantes
│   │   ├── Menu/               # 4 variantes
│   │   ├── Features/           # 3 variantes
│   │   ├── Reviews/            # 3 variantes
│   │   ├── Footer/             # 3 variantes
│   │   └── OpenStatus/         # 4 variantes
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── supabase.ts
│   └── styles/
│       ├── global.css
│       └── neuglass.css
├── astro.config.mjs
└── package.json`}</code></pre>

      <h2>Directorio packages/</h2>
      <p>Contiene código compartido entre aplicaciones.</p>

      <h3>packages/cli/</h3>
      <p>Herramienta de línea de comandos para crear nuevos clientes.</p>
      <pre><code>{`cli/
├── src/
│   └── create-client.ts    # Script principal
├── dist/                   # Código compilado
└── package.json`}</code></pre>

      <p><strong>Uso:</strong> <code>pnpm create-client</code></p>

      <h3>packages/supabase/</h3>
      <p>Gestión centralizada de Supabase.</p>
      <pre><code>{`supabase/
├── src/
│   ├── index.ts            # Exports principales
│   ├── types.ts            # Tipos manuales
│   ├── client.ts           # Cliente browser
│   ├── server.ts           # Cliente servidor
│   └── database.types.ts   # Tipos generados
├── migrations/             # Migraciones SQL
└── package.json`}</code></pre>

      <h3>packages/ui/</h3>
      <p>Componentes reutilizables entre aplicaciones.</p>
      <pre><code>{`ui/
├── src/
│   ├── buttons/
│   ├── cards/
│   ├── forms/
│   ├── navigation/
│   ├── themes/
│   └── index.ts
└── package.json`}</code></pre>

      <h3>packages/config/</h3>
      <p>Configuraciones compartidas para consistencia entre aplicaciones.</p>
      <pre><code>{`config/
├── tailwind/
│   ├── index.js            # Config base de Tailwind
│   ├── neumorphic.css      # Sistema de diseño completo
│   └── package.json
├── typescript/
│   ├── tsconfig.json       # Config base TypeScript
│   └── package.json
└── eslint/
    ├── .eslintrc.js        # Reglas de linting
    └── package.json`}</code></pre>

      <h3>packages/n8n-templates/</h3>
      <p>Workflows predefinidos para n8n.</p>
      <pre><code>{`n8n-templates/
├── workflows/
│   ├── restaurant-booking.json   # Reservas
│   ├── lead-capture.json         # Captura de leads
│   └── booking-reminder.json     # Recordatorios 24h
└── package.json`}</code></pre>

      <h2>Archivos de configuración raíz</h2>

      <h3>pnpm-workspace.yaml</h3>
      <p>Define qué directorios son workspaces:</p>
      <pre><code>{`packages:
  - "apps/*"
  - "apps/templates/*"
  - "packages/*"
  - "packages/config/*"`}</code></pre>

      <h3>turbo.json</h3>
      <p>Configura el build pipeline:</p>
      <pre><code>{`{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "type-check": {}
  }
}`}</code></pre>

      <h2>Convenciones de nombres</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Convención</th>
            <th>Ejemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Componentes Astro</td>
            <td>PascalCase</td>
            <td><code>Hero.astro</code></td>
          </tr>
          <tr>
            <td>Componentes React</td>
            <td>PascalCase</td>
            <td><code>Button.tsx</code></td>
          </tr>
          <tr>
            <td>Utilidades</td>
            <td>camelCase</td>
            <td><code>supabase.ts</code></td>
          </tr>
          <tr>
            <td>Rutas Next.js</td>
            <td>kebab-case</td>
            <td><code>/dashboard/reservas</code></td>
          </tr>
          <tr>
            <td>Variables de entorno</td>
            <td>SCREAMING_SNAKE</td>
            <td><code>NEXT_PUBLIC_SUPABASE_URL</code></td>
          </tr>
          <tr>
            <td>Paquetes internos</td>
            <td>@neumorstudio/nombre</td>
            <td><code>@neumorstudio/supabase</code></td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}
