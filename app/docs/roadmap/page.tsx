import "../docs.css";

export const metadata = {
  title: "Roadmap | NeumorStudio Docs",
  description: "Estado actual del proyecto y próximos pasos recomendados",
};

export default function RoadmapPage() {
  return (
    <article className="docs-content">
      <h1>Roadmap</h1>
      <p className="docs-lead">
        Estado actual del proyecto y próximos pasos recomendados.
      </p>

      <h2>Estado actual</h2>

      <h3>Funcionalidades completadas</h3>
      <table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Funcionalidad</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Admin</td><td>Autenticación con Supabase</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Admin</td><td>Dashboard con métricas</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Admin</td><td>CRUD de reservas</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Admin</td><td>CRUD de leads</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Admin</td><td>Configuración de negocio</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Admin</td><td>Personalización de temas</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Admin</td><td>Integración Instagram</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Admin</td><td>Gestión de newsletters</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Templates</td><td>5 plantillas (restaurant, clinic, gym, salon, store)</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Templates</td><td>Sistema de variantes de componentes</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Templates</td><td>Preview mode</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>CLI</td><td>Onboarding de clientes</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Automatización</td><td>Workflow de reservas</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Automatización</td><td>Workflow de leads</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
          <tr><td>Automatización</td><td>Recordatorios 24h</td><td><span className="docs-badge docs-badge-success">Completo</span></td></tr>
        </tbody>
      </table>

      <h3>No implementado</h3>
      <table>
        <thead>
          <tr>
            <th>Funcionalidad</th>
            <th>Prioridad</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Tests automatizados</td><td><span className="docs-badge docs-badge-warning">Alta</span></td></tr>
          <tr><td>CI/CD pipeline</td><td><span className="docs-badge docs-badge-warning">Alta</span></td></tr>
          <tr><td>Rate limiting</td><td><span className="docs-badge docs-badge-warning">Alta</span></td></tr>
          <tr><td>Autenticación de webhooks</td><td><span className="docs-badge docs-badge-warning">Alta</span></td></tr>
          <tr><td>Logging de seguridad</td><td><span className="docs-badge docs-badge-info">Media</span></td></tr>
          <tr><td>2FA</td><td><span className="docs-badge docs-badge-info">Media</span></td></tr>
          <tr><td>Analytics de sitio</td><td><span className="docs-badge docs-badge-info">Media</span></td></tr>
          <tr><td>Multi-idioma</td><td>Baja</td></tr>
          <tr><td>Pagos online</td><td>Baja</td></tr>
        </tbody>
      </table>

      <h2>Próximos pasos recomendados</h2>

      <h3>Fase 1: Estabilización</h3>
      <p><strong>Objetivo:</strong> Asegurar la calidad y seguridad del código actual.</p>
      <ol>
        <li><strong>Implementar tests</strong>
          <ul>
            <li>Unit tests para Server Actions</li>
            <li>Integration tests para flujos críticos</li>
            <li>E2E tests para formularios</li>
          </ul>
        </li>
        <li><strong>Configurar CI/CD</strong>
          <ul>
            <li>GitHub Actions para lint y tests</li>
            <li>Preview deployments en PRs</li>
            <li>Deploy automático a staging/producción</li>
          </ul>
        </li>
        <li><strong>Seguridad básica</strong>
          <ul>
            <li>Rate limiting en login y formularios</li>
            <li>Validación de webhooks n8n</li>
            <li>Logging de eventos de seguridad</li>
          </ul>
        </li>
      </ol>

      <h3>Fase 2: Mejoras de producto</h3>
      <p><strong>Objetivo:</strong> Incrementar el valor para los usuarios finales.</p>
      <ol>
        <li><strong>Métricas de newsletter</strong>
          <ul>
            <li>Tracking de apertura</li>
            <li>Tracking de clicks</li>
            <li>Dashboard de métricas</li>
          </ul>
        </li>
        <li><strong>Analytics de sitio</strong>
          <ul>
            <li>Integración con Google Analytics o Plausible</li>
            <li>Dashboard de visitas en admin</li>
            <li>Conversiones de formularios</li>
          </ul>
        </li>
        <li><strong>Mejoras de UX en admin</strong>
          <ul>
            <li>Filtros avanzados en listados</li>
            <li>Exportación de datos</li>
            <li>Notificaciones en tiempo real</li>
          </ul>
        </li>
      </ol>

      <h3>Fase 3: Escalabilidad</h3>
      <p><strong>Objetivo:</strong> Preparar el sistema para crecimiento.</p>
      <ol>
        <li><strong>Optimización de rendimiento</strong>
          <ul>
            <li>Caché de consultas frecuentes</li>
            <li>Optimización de imágenes</li>
            <li>CDN para assets estáticos</li>
          </ul>
        </li>
        <li><strong>Multi-idioma</strong>
          <ul>
            <li>Sistema de traducciones</li>
            <li>Selector de idioma en templates</li>
            <li>Admin en múltiples idiomas</li>
          </ul>
        </li>
        <li><strong>2FA y seguridad avanzada</strong>
          <ul>
            <li>Autenticación de dos factores</li>
            <li>Auditoría de sesiones</li>
            <li>Alertas de seguridad</li>
          </ul>
        </li>
      </ol>

      <h2>Backlog técnico</h2>

      <h3>Deuda técnica identificada</h3>
      <table>
        <thead>
          <tr>
            <th>Área</th>
            <th>Descripción</th>
            <th>Impacto</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Templates</td><td>READMEs genéricos sin customizar</td><td>Bajo</td></tr>
          <tr><td>Supabase</td><td>Migraciones no versionadas completamente</td><td>Medio</td></tr>
          <tr><td>Admin</td><td>Algunos componentes sin tipado estricto</td><td>Bajo</td></tr>
          <tr><td>n8n</td><td>Workflows sin documentación de parámetros</td><td>Medio</td></tr>
          <tr><td>Tests</td><td>Cobertura de tests: 0%</td><td>Alto</td></tr>
        </tbody>
      </table>

      <h3>Mejoras de código sugeridas</h3>
      <ol>
        <li><strong>Extraer lógica común de templates</strong> - Los 5 templates comparten mucho código</li>
        <li><strong>Centralizar validación</strong> - Crear schemas Zod compartidos</li>
        <li><strong>Mejorar tipado de config</strong> - El campo <code>config</code> de websites usa tipo genérico</li>
        <li><strong>Separar concerns en admin</strong> - Algunos componentes mezclan UI y lógica</li>
      </ol>

      <h2>Métricas de éxito</h2>
      <table>
        <thead>
          <tr>
            <th>Métrica</th>
            <th>Actual</th>
            <th>Objetivo</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Cobertura de tests</td><td>0%</td><td>80%</td></tr>
          <tr><td>Tiempo de build</td><td>~2min</td><td>&lt;1min</td></tr>
          <tr><td>Lighthouse score (templates)</td><td>~85</td><td>&gt;95</td></tr>
          <tr><td>Errores en producción/mes</td><td>N/A</td><td>&lt;5</td></tr>
          <tr><td>Tiempo de onboarding cliente</td><td>~30min</td><td>&lt;15min</td></tr>
        </tbody>
      </table>
    </article>
  );
}
