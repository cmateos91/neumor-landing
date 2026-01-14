import "../docs.css";

export const metadata = {
  title: "Mantenimiento | NeumorStudio Docs",
  description: "Guía para el mantenimiento continuo de NeumorStudio Plantillas",
};

export default function MantenimientoPage() {
  return (
    <article className="docs-content">
      <h1>Mantenimiento</h1>
      <p className="docs-lead">
        Guía para el mantenimiento continuo de NeumorStudio Plantillas.
      </p>

      <h2>Tareas rutinarias</h2>

      <h3>Actualizaciones de dependencias</h3>
      <p><strong>Frecuencia recomendada:</strong> Mensual</p>
      <pre><code>{`# Verificar actualizaciones disponibles
pnpm outdated

# Actualizar dependencias menores (patch/minor)
pnpm update

# Para actualizaciones mayores
pnpm update next@latest --filter admin

# Verificar funcionamiento
pnpm lint
pnpm type-check
pnpm build`}</code></pre>

      <p><strong>Dependencias críticas a monitorear:</strong></p>
      <table>
        <thead>
          <tr>
            <th>Paquete</th>
            <th>Importancia</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>next</td><td>Alta</td><td>Cambios de API frecuentes</td></tr>
          <tr><td>astro</td><td>Alta</td><td>Nuevas features importantes</td></tr>
          <tr><td>@supabase/supabase-js</td><td>Alta</td><td>Compatibilidad con Supabase</td></tr>
          <tr><td>react</td><td>Alta</td><td>Cambios en React 19</td></tr>
          <tr><td>tailwindcss</td><td>Media</td><td>Tailwind 4 tiene sintaxis diferente</td></tr>
        </tbody>
      </table>

      <h3>Limpieza de caché</h3>
      <p><strong>Frecuencia:</strong> Cuando hay problemas de build o comportamiento extraño</p>
      <pre><code>{`# Limpiar cache de Turborepo
rm -rf node_modules/.cache/turbo

# Limpiar cache de Next.js
rm -rf apps/admin/.next

# Limpieza completa
pnpm clean
pnpm install`}</code></pre>

      <h3>Verificación de Supabase</h3>
      <p><strong>Frecuencia:</strong> Semanal</p>
      <ol>
        <li>Verificar estado del proyecto en dashboard de Supabase</li>
        <li>Revisar logs de errores</li>
        <li>Verificar uso de storage/bandwidth</li>
        <li>Confirmar que backups están funcionando</li>
      </ol>

      <h3>Monitoreo de n8n</h3>
      <p><strong>Frecuencia:</strong> Semanal</p>
      <ol>
        <li>Verificar que workflows están activos</li>
        <li>Revisar ejecuciones fallidas</li>
        <li>Verificar cola de webhooks</li>
        <li>Actualizar credenciales si es necesario</li>
      </ol>

      <h2>Resolución de problemas comunes</h2>

      <h3>Build falla sin cambios</h3>
      <p><strong>Síntomas:</strong> El build falla aunque no hubo cambios de código.</p>
      <p><strong>Causas comunes:</strong> Cache corrupto, dependencias desactualizadas, cambios en APIs externas.</p>
      <p><strong>Solución:</strong></p>
      <pre><code>{`pnpm clean
pnpm install
pnpm build`}</code></pre>

      <h3>Supabase devuelve 401</h3>
      <p><strong>Síntomas:</strong> Errores de autenticación en llamadas a Supabase.</p>
      <p><strong>Causas comunes:</strong> Token expirado, anon key incorrecta, RLS blocking request.</p>
      <p><strong>Solución:</strong></p>
      <ol>
        <li>Verificar variables de entorno</li>
        <li>Verificar que el proyecto Supabase está activo</li>
        <li>Revisar políticas RLS en la tabla afectada</li>
      </ol>

      <h3>Webhooks n8n no responden</h3>
      <p><strong>Síntomas:</strong> Formularios no guardan datos.</p>
      <p><strong>Causas comunes:</strong> Workflow desactivado, URL de webhook incorrecta, n8n caído.</p>
      <p><strong>Solución:</strong></p>
      <ol>
        <li>Verificar estado de n8n</li>
        <li>Verificar que el workflow está activo</li>
        <li>Revisar logs de ejecución</li>
        <li>Verificar URL en variables de entorno</li>
      </ol>

      <h3>Estilos neumórficos no aplican</h3>
      <p><strong>Síntomas:</strong> Componentes sin sombras neumórficas.</p>
      <p><strong>Causas comunes:</strong> CSS no importado, PostCSS no procesando, variables CSS no definidas.</p>
      <p><strong>Solución:</strong></p>
      <ol>
        <li>Verificar import de <code>neumorphic.css</code></li>
        <li>Verificar configuración de PostCSS</li>
        <li>Verificar que <code>tailwind.config</code> extiende la config base</li>
      </ol>

      <h2>Procedimientos de emergencia</h2>

      <h3>Rollback de deployment</h3>
      <p>Si un deployment causa problemas:</p>
      <pre><code>{`# 1. Identificar el último commit estable
# 2. Revertir en producción
git revert HEAD
git push origin main

# 3. Re-deployar desde el provider
# 4. Investigar y corregir antes de re-deployar`}</code></pre>

      <h3>Supabase caído</h3>
      <p>Si Supabase no responde:</p>
      <ol>
        <li>Verificar status en <a href="https://status.supabase.com" target="_blank" rel="noopener noreferrer">status.supabase.com</a></li>
        <li>Si es outage global, esperar resolución</li>
        <li>Si es problema del proyecto: verificar límites de uso, contactar soporte</li>
        <li>Comunicar a usuarios afectados</li>
      </ol>

      <h3>n8n caído</h3>
      <p>Si n8n no procesa webhooks:</p>
      <ol>
        <li>Verificar estado del servidor</li>
        <li>Reiniciar servicio n8n</li>
        <li>Los webhooks se perderán mientras esté caído</li>
        <li>Considerar sistema de cola para evitar pérdidas</li>
      </ol>

      <h2>Checklist de mantenimiento mensual</h2>
      <ul>
        <li>☐ Actualizar dependencias menores</li>
        <li>☐ Revisar y limpiar logs</li>
        <li>☐ Verificar backups de Supabase</li>
        <li>☐ Revisar ejecuciones fallidas en n8n</li>
        <li>☐ Verificar uso de recursos (storage, bandwidth)</li>
        <li>☐ Revisar issues abiertos</li>
        <li>☐ Actualizar documentación si hubo cambios</li>
      </ul>

      <h2>Checklist de mantenimiento trimestral</h2>
      <ul>
        <li>☐ Actualizar dependencias mayores (con testing)</li>
        <li>☐ Auditoría de seguridad básica</li>
        <li>☐ Revisar y actualizar políticas RLS</li>
        <li>☐ Limpiar datos de prueba/obsoletos</li>
        <li>☐ Revisar rendimiento (Lighthouse, Core Web Vitals)</li>
        <li>☐ Evaluar deuda técnica acumulada</li>
        <li>☐ Actualizar roadmap</li>
      </ul>

      <h2>Documentación oficial</h2>
      <table>
        <thead>
          <tr>
            <th>Recurso</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Next.js</td><td><a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">nextjs.org/docs</a></td></tr>
          <tr><td>Astro</td><td><a href="https://docs.astro.build" target="_blank" rel="noopener noreferrer">docs.astro.build</a></td></tr>
          <tr><td>Supabase</td><td><a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer">supabase.com/docs</a></td></tr>
          <tr><td>n8n</td><td><a href="https://docs.n8n.io" target="_blank" rel="noopener noreferrer">docs.n8n.io</a></td></tr>
          <tr><td>Tailwind CSS</td><td><a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer">tailwindcss.com/docs</a></td></tr>
          <tr><td>Turborepo</td><td><a href="https://turbo.build/repo/docs" target="_blank" rel="noopener noreferrer">turbo.build/repo/docs</a></td></tr>
        </tbody>
      </table>
    </article>
  );
}
