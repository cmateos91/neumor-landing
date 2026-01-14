import "../docs.css";

export const metadata = {
  title: "Seguridad | NeumorStudio Docs",
  description: "Consideraciones de seguridad y medidas implementadas en NeumorStudio Plantillas",
};

export default function SeguridadPage() {
  return (
    <article className="docs-content">
      <h1>Consideraciones de Seguridad</h1>
      <p className="docs-lead">
        Análisis de las medidas de seguridad implementadas, suposiciones del sistema y áreas de mejora.
      </p>

      <h2>Medidas implementadas</h2>

      <h3>Autenticación</h3>
      <p><strong>Supabase Auth</strong></p>
      <p>El sistema utiliza Supabase Auth para gestión de usuarios:</p>
      <ul>
        <li>Autenticación basada en JWT</li>
        <li>Tokens de acceso con expiración</li>
        <li>Refresh tokens para renovación automática</li>
        <li>Almacenamiento seguro de contraseñas (bcrypt)</li>
      </ul>

      <h3>Protección de rutas</h3>
      <p><strong>Middleware de Next.js</strong></p>
      <p>El middleware intercepta todas las peticiones y verifica la autenticación:</p>
      <pre><code>{`// apps/admin/src/middleware.ts
export async function middleware(request: NextRequest) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}`}</code></pre>
      <p><strong>Rutas protegidas:</strong> <code>/dashboard/**</code></p>
      <p><strong>Rutas públicas:</strong> <code>/login</code>, <code>/change-password</code></p>

      <h3>Aislamiento de datos (Multi-tenancy)</h3>
      <p><strong>Row Level Security (RLS)</strong></p>
      <p>PostgreSQL RLS asegura que cada cliente solo acceda a sus propios datos:</p>
      <pre><code>{`CREATE POLICY "Users can only access their website bookings"
ON bookings
FOR ALL
USING (
  website_id IN (
    SELECT id FROM websites
    WHERE client_id = auth.uid()
  )
);`}</code></pre>
      <p><strong>Beneficios:</strong></p>
      <ul>
        <li>Seguridad a nivel de base de datos</li>
        <li>No depende de la aplicación</li>
        <li>Aplicado incluso en consultas directas</li>
      </ul>

      <h3>Variables de entorno</h3>
      <p><strong>Separación de credenciales:</strong></p>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Exposición</th>
            <th>Uso</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>NEXT_PUBLIC_SUPABASE_URL</code></td><td>Pública</td><td>Cliente browser</td></tr>
          <tr><td><code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></td><td>Pública</td><td>Cliente browser (limitada)</td></tr>
          <tr><td><code>SUPABASE_SERVICE_ROLE_KEY</code></td><td>Servidor</td><td>Server Actions (bypass RLS)</td></tr>
        </tbody>
      </table>

      <h2>Vulnerabilidades conocidas</h2>

      <h3>Validación de inputs</h3>
      <p><strong>Estado:</strong> <span className="docs-badge docs-badge-warning">Parcialmente implementado</span></p>
      <p>Los formularios realizan validación básica, pero no hay sanitización exhaustiva de todos los inputs antes de almacenarlos.</p>
      <p><strong>Recomendación:</strong> Implementar validación con Zod en Server Actions:</p>
      <pre><code>{`import { z } from 'zod'

const BookingSchema = z.object({
  customer_name: z.string().min(2).max(100),
  customer_email: z.string().email().optional(),
  customer_phone: z.string().regex(/^\\+?[\\d\\s-]+$/),
  booking_date: z.string().datetime(),
  guests: z.number().min(1).max(20)
})`}</code></pre>

      <h3>Rate limiting</h3>
      <p><strong>Estado:</strong> <span className="docs-badge docs-badge-warning">No implementado</span></p>
      <p>No hay protección contra ataques de fuerza bruta o abuso de endpoints.</p>
      <p><strong>Recomendación:</strong> Implementar rate limiting en:</p>
      <ul>
        <li>Login (máximo 5 intentos por minuto)</li>
        <li>Formularios públicos (máximo 10 envíos por minuto por IP)</li>
        <li>API routes (según criticidad)</li>
      </ul>

      <h3>Webhooks n8n</h3>
      <p><strong>Estado:</strong> <span className="docs-badge docs-badge-warning">Sin autenticación</span></p>
      <p>Los webhooks de n8n son públicos y aceptan cualquier petición.</p>
      <p><strong>Recomendación:</strong></p>
      <ul>
        <li>Agregar token secreto en headers</li>
        <li>Validar origen de peticiones</li>
        <li>Implementar firma HMAC</li>
      </ul>
      <pre><code>{`// Ejemplo de validación
const signature = req.headers['x-webhook-signature']
const expectedSignature = crypto
  .createHmac('sha256', WEBHOOK_SECRET)
  .update(JSON.stringify(req.body))
  .digest('hex')

if (signature !== expectedSignature) {
  throw new Error('Invalid signature')
}`}</code></pre>

      <h2>Áreas no cubiertas</h2>
      <table>
        <thead>
          <tr>
            <th>Área</th>
            <th>Estado</th>
            <th>Prioridad</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Logging de seguridad</td><td>No implementado</td><td>Alta</td></tr>
          <tr><td>Alertas de acceso sospechoso</td><td>No implementado</td><td>Media</td></tr>
          <tr><td>2FA</td><td>No implementado</td><td>Media</td></tr>
          <tr><td>Auditoría de sesiones</td><td>No implementado</td><td>Media</td></tr>
          <tr><td>Encriptación de datos sensibles</td><td>No implementado</td><td>Baja</td></tr>
        </tbody>
      </table>

      <h2>Recomendaciones</h2>

      <h3>Corto plazo (alta prioridad)</h3>
      <ol>
        <li><strong>Implementar rate limiting</strong> - Usar <code>@upstash/ratelimit</code> o similar</li>
        <li><strong>Validar webhooks</strong> - Agregar autenticación a endpoints n8n</li>
        <li><strong>Logging de seguridad</strong> - Registrar intentos de login fallidos</li>
      </ol>

      <h3>Mediano plazo</h3>
      <ol>
        <li><strong>Implementar 2FA</strong> - TOTP con aplicación autenticadora</li>
        <li><strong>Auditoría de sesiones</strong> - Lista de sesiones activas</li>
        <li><strong>Sanitización de inputs</strong> - Validación exhaustiva con Zod</li>
      </ol>

      <h2>Checklist de seguridad para deployment</h2>
      <p>Antes de desplegar a producción:</p>
      <ul>
        <li>☐ HTTPS habilitado</li>
        <li>☐ Variables de entorno configuradas (no en código)</li>
        <li>☐ RLS habilitado en Supabase</li>
        <li>☐ Políticas RLS verificadas</li>
        <li>☐ <code>.env</code> no incluido en el repositorio</li>
        <li>☐ Service role key solo en servidor</li>
        <li>☐ Dominios permitidos configurados en Supabase</li>
        <li>☐ Backups automáticos habilitados</li>
        <li>☐ Monitoring configurado</li>
      </ul>
    </article>
  );
}
