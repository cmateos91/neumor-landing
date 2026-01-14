import "../docs.css";

export const metadata = {
  title: "Funcionalidades | NeumorStudio Docs",
  description: "Descripción detallada de las funcionalidades implementadas en NeumorStudio Plantillas",
};

export default function FuncionalidadesPage() {
  return (
    <article className="docs-content">
      <h1>Funcionalidades</h1>
      <p className="docs-lead">
        Descripción detallada de las funcionalidades implementadas en NeumorStudio Plantillas.
      </p>

      <h2>Panel de Administración</h2>

      <h3>Autenticación</h3>
      <p><strong>Ubicación:</strong> <code>apps/admin/src/app/login/</code> y <code>apps/admin/src/middleware.ts</code></p>
      <table>
        <thead>
          <tr>
            <th>Funcionalidad</th>
            <th>Estado</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Login con email/password</td>
            <td><span className="docs-badge docs-badge-success">Implementado</span></td>
            <td>Autenticación mediante Supabase Auth</td>
          </tr>
          <tr>
            <td>Cambio de contraseña obligatorio</td>
            <td><span className="docs-badge docs-badge-success">Implementado</span></td>
            <td>Primer login requiere cambio de contraseña</td>
          </tr>
          <tr>
            <td>Protección de rutas</td>
            <td><span className="docs-badge docs-badge-success">Implementado</span></td>
            <td>Middleware bloquea acceso sin sesión válida</td>
          </tr>
          <tr>
            <td>Cierre de sesión</td>
            <td><span className="docs-badge docs-badge-success">Implementado</span></td>
            <td>Invalida sesión en cliente y servidor</td>
          </tr>
        </tbody>
      </table>

      <h3>Dashboard principal</h3>
      <p><strong>Ubicación:</strong> <code>apps/admin/src/app/dashboard/page.tsx</code></p>
      <p>Muestra métricas y estadísticas del negocio:</p>
      <ul>
        <li>Total de reservas (por período)</li>
        <li>Total de leads capturados</li>
        <li>Actividad reciente</li>
        <li>Accesos rápidos a secciones</li>
      </ul>

      <h3>Gestión de reservas</h3>
      <p><strong>Ubicación:</strong> <code>apps/admin/src/app/dashboard/reservas/</code></p>
      <table>
        <thead>
          <tr>
            <th>Funcionalidad</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Listado de reservas</td><td>Tabla con filtrado y paginación</td></tr>
          <tr><td>Filtro por estado</td><td>pending, confirmed, cancelled, completed</td></tr>
          <tr><td>Confirmar reserva</td><td>Cambia estado y envía notificación</td></tr>
          <tr><td>Cancelar reserva</td><td>Cambia estado y notifica al cliente</td></tr>
          <tr><td>Ver detalles</td><td>Modal con información completa</td></tr>
          <tr><td>Historial</td><td>Registro de cambios de cada reserva</td></tr>
        </tbody>
      </table>

      <h3>Gestión de leads</h3>
      <p><strong>Ubicación:</strong> <code>apps/admin/src/app/dashboard/leads/</code></p>
      <table>
        <thead>
          <tr>
            <th>Funcionalidad</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Listado de leads</td><td>Tabla con información de contacto</td></tr>
          <tr><td>Filtro por estado</td><td>new, contacted, converted, lost</td></tr>
          <tr><td>Filtro por origen</td><td>website, instagram, facebook, google, other</td></tr>
          <tr><td>Actualizar estado</td><td>Seguimiento del embudo de conversión</td></tr>
          <tr><td>Notas</td><td>Agregar notas de seguimiento</td></tr>
        </tbody>
      </table>

      <h3>Newsletter</h3>
      <p><strong>Ubicación:</strong> <code>apps/admin/src/app/dashboard/newsletter/</code></p>
      <table>
        <thead>
          <tr>
            <th>Funcionalidad</th>
            <th>Estado</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Envío manual</td>
            <td><span className="docs-badge docs-badge-success">Implementado</span></td>
            <td>Crear y enviar newsletters</td>
          </tr>
          <tr>
            <td>Plantillas</td>
            <td><span className="docs-badge docs-badge-success">Implementado</span></td>
            <td>Templates predefinidos</td>
          </tr>
          <tr>
            <td>Generación IA</td>
            <td><span className="docs-badge docs-badge-success">Implementado</span></td>
            <td>Asistencia para redacción</td>
          </tr>
          <tr>
            <td>Métricas</td>
            <td><span className="docs-badge docs-badge-warning">No implementado</span></td>
            <td>Tracking de apertura/clicks</td>
          </tr>
        </tbody>
      </table>

      <h3>Configuración</h3>
      <p><strong>Ubicación:</strong> <code>apps/admin/src/app/dashboard/configuracion/</code></p>
      <p>Ajustes del negocio:</p>
      <ul>
        <li>Nombre del negocio</li>
        <li>Email de contacto</li>
        <li>Teléfono/WhatsApp</li>
        <li>Dirección</li>
        <li>Horarios de atención</li>
        <li>Webhook URL para n8n</li>
      </ul>

      <h3>Personalización</h3>
      <p><strong>Ubicación:</strong> <code>apps/admin/src/app/dashboard/personalizacion/</code></p>
      <table>
        <thead>
          <tr>
            <th>Funcionalidad</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Selector de tema</td><td>dark, light, colorful, rustic, elegant</td></tr>
          <tr><td>Variantes de componentes</td><td>Elegir estilo de cada sección</td></tr>
          <tr><td>Preview en vivo</td><td>Ver cambios antes de aplicar</td></tr>
          <tr><td>Guardar configuración</td><td>Persiste en Supabase</td></tr>
        </tbody>
      </table>

      <p><strong>Variantes disponibles por componente:</strong></p>
      <table>
        <thead>
          <tr>
            <th>Componente</th>
            <th>Variantes</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Hero</td><td>classic, modern, bold, minimal</td></tr>
          <tr><td>Menu</td><td>tabs, grid, list, carousel</td></tr>
          <tr><td>Features</td><td>cards, icons, banner</td></tr>
          <tr><td>Reviews</td><td>grid, carousel, minimal</td></tr>
          <tr><td>Footer</td><td>full, minimal, centered</td></tr>
          <tr><td>OpenStatus</td><td>pulse, morph, liquid, time</td></tr>
        </tbody>
      </table>

      <h2>Sitios Web Públicos (Plantillas)</h2>

      <h3>Tipos de plantilla</h3>
      <table>
        <thead>
          <tr>
            <th>Plantilla</th>
            <th>Rubro</th>
            <th>Características específicas</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Restaurant</td><td>Restaurantes</td><td>Menú, reservas, horarios</td></tr>
          <tr><td>Clinic</td><td>Clínicas médicas</td><td>Servicios, citas, especialistas</td></tr>
          <tr><td>Salon</td><td>Salones de belleza</td><td>Servicios, reservas, galería</td></tr>
          <tr><td>Gym</td><td>Gimnasios</td><td>Clases, membresías, horarios</td></tr>
          <tr><td>Store</td><td>Tiendas</td><td>Productos, contacto, ubicación</td></tr>
        </tbody>
      </table>

      <h3>Preview Mode</h3>
      <p><strong>Activación:</strong> <code>?preview=1</code> en la URL</p>
      <p><strong>Parámetros disponibles:</strong></p>
      <ul>
        <li><code>theme</code> - Cambiar tema (dark, light, etc.)</li>
        <li><code>v_hero</code> - Variante de hero</li>
        <li><code>v_menu</code> - Variante de menú</li>
        <li><code>v_features</code> - Variante de features</li>
        <li><code>v_reviews</code> - Variante de reviews</li>
        <li><code>v_footer</code> - Variante de footer</li>
      </ul>
      <p><strong>Ejemplo:</strong></p>
      <pre><code>https://sitio.com/?preview=1&theme=dark&v_hero=modern</code></pre>

      <h2>CLI de Onboarding</h2>
      <p><strong>Ubicación:</strong> <code>packages/cli/src/create-client.ts</code></p>
      <p><strong>Comando:</strong> <code>pnpm create-client</code></p>

      <h3>Flujo del CLI</h3>
      <ol>
        <li><strong>Banner de bienvenida</strong> - ASCII art de NeumorStudio</li>
        <li><strong>Datos del negocio</strong> - Nombre, tipo, email, teléfono</li>
        <li><strong>Configuración del sitio</strong> - Dominio, tema, título</li>
        <li><strong>Creación en Supabase</strong> - Registros y usuario admin</li>
        <li><strong>Configuración n8n</strong> - Webhook URL</li>
        <li><strong>Resumen final</strong> - Credenciales y próximos pasos</li>
      </ol>

      <h2>Automatizaciones (n8n)</h2>

      <h3>Workflow: restaurant-booking.json</h3>
      <p><strong>Trigger:</strong> Webhook POST desde formulario de reserva</p>
      <p><strong>Acciones:</strong></p>
      <ol>
        <li>Parsear datos del formulario</li>
        <li>Insertar en tabla <code>bookings</code></li>
        <li>Consultar <code>notification_settings</code></li>
        <li>Si email activo → enviar confirmación</li>
        <li>Si WhatsApp activo → enviar mensaje</li>
        <li>Registrar en <code>activity_log</code></li>
      </ol>

      <h3>Workflow: lead-capture.json</h3>
      <p><strong>Trigger:</strong> Webhook POST desde formulario de contacto</p>
      <p><strong>Acciones:</strong></p>
      <ol>
        <li>Parsear datos del formulario</li>
        <li>Insertar en tabla <code>leads</code></li>
        <li>Notificar al administrador</li>
        <li>Registrar en <code>activity_log</code></li>
      </ol>

      <h3>Workflow: booking-reminder.json</h3>
      <p><strong>Trigger:</strong> Cron (ejecución programada)</p>
      <p><strong>Acciones:</strong></p>
      <ol>
        <li>Consultar reservas para mañana</li>
        <li>Filtrar por <code>reminder_24h = true</code></li>
        <li>Enviar recordatorio por canal configurado</li>
        <li>Registrar en <code>activity_log</code></li>
      </ol>

      <h2>Funcionalidades pendientes</h2>
      <table>
        <thead>
          <tr>
            <th>Funcionalidad</th>
            <th>Prioridad</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Tests automatizados</td><td>Alta</td><td>Unitarios e integración</td></tr>
          <tr><td>CI/CD pipeline</td><td>Alta</td><td>GitHub Actions</td></tr>
          <tr><td>Métricas de newsletter</td><td>Media</td><td>Open rate, click rate</td></tr>
          <tr><td>Analytics de sitio</td><td>Media</td><td>Visitas, conversiones</td></tr>
          <tr><td>Multi-idioma</td><td>Baja</td><td>i18n para plantillas</td></tr>
          <tr><td>Pagos online</td><td>Baja</td><td>Stripe/PayPal integration</td></tr>
        </tbody>
      </table>
    </article>
  );
}
