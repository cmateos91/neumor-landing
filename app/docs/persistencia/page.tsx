import "../docs.css";

export const metadata = {
  title: "Persistencia de Datos | NeumorStudio Docs",
  description: "Modelo de datos y almacenamiento en NeumorStudio Plantillas",
};

export default function PersistenciaPage() {
  return (
    <article className="docs-content">
      <h1>Persistencia de Datos</h1>
      <p className="docs-lead">
        NeumorStudio Plantillas utiliza Supabase (PostgreSQL) como sistema de almacenamiento principal.
      </p>

      <h2>Diagrama de entidades</h2>
      <div className="docs-diagram">{`┌─────────────┐
│   clients   │
│─────────────│
│ id (PK)     │
│ email       │
│ business_   │
│   name      │
│ business_   │
│   type      │
└──────┬──────┘
       │ 1:N
       ▼
┌─────────────┐         ┌─────────────────────┐
│  websites   │         │ notification_       │
│─────────────│         │     settings        │
│ id (PK)     │ 1:1     │─────────────────────│
│ client_id   │◄───────►│ website_id (FK)     │
│ domain      │         │ email_booking_      │
│ theme       │         │   confirmation      │
│ config      │         │ reminder_24h        │
└──────┬──────┘         └─────────────────────┘
       │ 1:N
       ├─────────────────────┬─────────────────────┐
       ▼                     ▼                     ▼
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│  bookings   │       │    leads    │       │ activity_   │
│─────────────│       │─────────────│       │    log      │
│ id (PK)     │       │ id (PK)     │       │─────────────│
│ website_id  │       │ website_id  │       │ website_id  │
│ customer_   │       │ name        │       │ event_type  │
│   name      │       │ email       │       │ event_data  │
│ status      │       │ status      │       │ created_at  │
└─────────────┘       └─────────────┘       └─────────────┘`}</div>

      <h2>Tablas principales</h2>

      <h3>clients</h3>
      <p>Almacena información de los clientes (negocios) que utilizan la plataforma.</p>
      <table>
        <thead>
          <tr>
            <th>Columna</th>
            <th>Tipo</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>id</code></td><td>uuid</td><td>Identificador único (PK)</td></tr>
          <tr><td><code>email</code></td><td>text</td><td>Email principal del negocio</td></tr>
          <tr><td><code>business_name</code></td><td>text</td><td>Nombre del negocio</td></tr>
          <tr><td><code>business_type</code></td><td>enum</td><td>Tipo: restaurant, clinic, salon, gym, store</td></tr>
          <tr><td><code>phone</code></td><td>text</td><td>Teléfono de contacto</td></tr>
          <tr><td><code>created_at</code></td><td>timestamptz</td><td>Fecha de creación</td></tr>
        </tbody>
      </table>

      <h3>websites</h3>
      <p>Configuración de cada sitio web. Un cliente puede tener múltiples sitios.</p>
      <table>
        <thead>
          <tr>
            <th>Columna</th>
            <th>Tipo</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>id</code></td><td>uuid</td><td>Identificador único (PK)</td></tr>
          <tr><td><code>client_id</code></td><td>uuid</td><td>Referencia a clients (FK)</td></tr>
          <tr><td><code>domain</code></td><td>text</td><td>Dominio del sitio</td></tr>
          <tr><td><code>theme</code></td><td>enum</td><td>Tema visual: dark, light, colorful, rustic, elegant</td></tr>
          <tr><td><code>config</code></td><td>jsonb</td><td>Configuración completa del sitio</td></tr>
          <tr><td><code>is_active</code></td><td>boolean</td><td>Si el sitio está activo</td></tr>
        </tbody>
      </table>

      <p><strong>Estructura de <code>config</code> (JSONB):</strong></p>
      <pre><code>{`{
  "hero": {
    "title": "Nombre del Restaurante",
    "subtitle": "La mejor experiencia gastronómica",
    "variant": "modern"
  },
  "menu": { "variant": "tabs" },
  "features": { "variant": "cards" },
  "reviews": { "variant": "carousel" },
  "footer": { "variant": "full" },
  "contact": {
    "email": "contacto@restaurante.com",
    "phone": "+34 123 456 789",
    "address": "Calle Principal 123"
  },
  "schedule": {
    "monday": { "open": "12:00", "close": "23:00" }
  }
}`}</code></pre>

      <h3>bookings</h3>
      <p>Reservas realizadas a través de los sitios web.</p>
      <table>
        <thead>
          <tr>
            <th>Columna</th>
            <th>Tipo</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>id</code></td><td>uuid</td><td>Identificador único (PK)</td></tr>
          <tr><td><code>website_id</code></td><td>uuid</td><td>Referencia a websites (FK)</td></tr>
          <tr><td><code>customer_name</code></td><td>text</td><td>Nombre del cliente</td></tr>
          <tr><td><code>customer_email</code></td><td>text</td><td>Email del cliente</td></tr>
          <tr><td><code>customer_phone</code></td><td>text</td><td>Teléfono del cliente</td></tr>
          <tr><td><code>booking_date</code></td><td>date</td><td>Fecha de la reserva</td></tr>
          <tr><td><code>booking_time</code></td><td>time</td><td>Hora de la reserva</td></tr>
          <tr><td><code>guests</code></td><td>integer</td><td>Número de personas</td></tr>
          <tr><td><code>status</code></td><td>enum</td><td>Estado: pending, confirmed, cancelled, completed</td></tr>
          <tr><td><code>source</code></td><td>enum</td><td>Origen: website, phone, walkin, other</td></tr>
        </tbody>
      </table>

      <h3>leads</h3>
      <p>Contactos y prospectos capturados.</p>
      <table>
        <thead>
          <tr>
            <th>Columna</th>
            <th>Tipo</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>id</code></td><td>uuid</td><td>Identificador único (PK)</td></tr>
          <tr><td><code>website_id</code></td><td>uuid</td><td>Referencia a websites (FK)</td></tr>
          <tr><td><code>name</code></td><td>text</td><td>Nombre del contacto</td></tr>
          <tr><td><code>email</code></td><td>text</td><td>Email del contacto</td></tr>
          <tr><td><code>phone</code></td><td>text</td><td>Teléfono del contacto</td></tr>
          <tr><td><code>message</code></td><td>text</td><td>Mensaje enviado</td></tr>
          <tr><td><code>source</code></td><td>enum</td><td>Origen: website, instagram, facebook, google, other</td></tr>
          <tr><td><code>status</code></td><td>enum</td><td>Estado: new, contacted, converted, lost</td></tr>
        </tbody>
      </table>

      <h2>Row Level Security (RLS)</h2>
      <p>El aislamiento de datos se implementa mediante políticas RLS de PostgreSQL.</p>

      <h3>Política en bookings</h3>
      <pre><code>{`-- Los usuarios solo ven reservas de sus propios websites
CREATE POLICY "bookings_select_policy"
ON bookings FOR SELECT
USING (
  website_id IN (
    SELECT id FROM websites
    WHERE client_id = auth.uid()
  )
);

-- Solo pueden insertar en sus websites
CREATE POLICY "bookings_insert_policy"
ON bookings FOR INSERT
WITH CHECK (
  website_id IN (
    SELECT id FROM websites
    WHERE client_id = auth.uid()
  )
);`}</code></pre>

      <h2>Tipos TypeScript</h2>
      <p>Los tipos están definidos en <code>packages/supabase/src/types.ts</code>:</p>
      <pre><code>{`export interface Client {
  id: string
  email: string
  business_name: string
  business_type: BusinessType
  phone?: string
  created_at: string
  updated_at: string
}

export interface Website {
  id: string
  client_id: string
  domain: string
  theme: Theme
  config: WebsiteConfig
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  website_id: string
  customer_name: string
  customer_email?: string
  customer_phone: string
  booking_date: string
  booking_time: string
  guests: number
  notes?: string
  status: BookingStatus
  source: BookingSource
  created_at: string
  updated_at: string
}`}</code></pre>

      <h2>Índices recomendados</h2>
      <pre><code>{`-- Búsqueda de reservas por fecha
CREATE INDEX idx_bookings_date ON bookings (website_id, booking_date);

-- Búsqueda de leads por estado
CREATE INDEX idx_leads_status ON leads (website_id, status);

-- Activity log por fecha
CREATE INDEX idx_activity_log_created ON activity_log (website_id, created_at DESC);`}</code></pre>

      <h2>Migraciones</h2>
      <p>Las migraciones se gestionan con Supabase CLI:</p>
      <pre><code>{`# Crear nueva migración
cd packages/supabase
supabase migration new nombre_migracion

# Aplicar migraciones
supabase db push`}</code></pre>
    </article>
  );
}
