'use server'

import { supabase } from '@/lib/supabase'

export type LeadData = {
  nombre: string
  email: string
  tipo_negocio: string
  mensaje?: string
}

export async function crearLead(data: LeadData) {
  // 1. Verificar si el email ya existe en Supabase
  const { data: existingLead, error: checkError } = await supabase
    .from('cliente_potencial')
    .select('email')
    .eq('email', data.email)

  if (checkError) {
    console.error('Error verificando email:', checkError);
    return { success: false, error: 'Error al verificar el email' }
  }

  if (existingLead && existingLead.length > 0) {
    return { success: false, error: 'Este email ya está registrado' }
  }

  // 2. Insertar lead en Supabase
  const { error } = await supabase
    .from('cliente_potencial')
    .insert([
      {
        nombre: data.nombre,
        email: data.email,
        tipo_negocio: data.tipo_negocio,
        mensaje: data.mensaje || null,
      }
    ])

  if (error) {
    console.error('Error insertando en Supabase:', error);
    return { success: false, error: error.message }
  }

  // 3. Disparar webhook de n8n
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL

  if (n8nWebhookUrl) {
    try {
      await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.nombre,  // 👈 IMPORTANTE!
          email: data.email,
          business_type: data.tipo_negocio,
          message: data.mensaje || "",
          source: "neumorstudio-landing",
          created_at: new Date().toISOString(),
        }),
      })
    } catch (webhookError) {
      console.error("Error llamando al webhook de n8n:", webhookError)
    }
  } else {
    console.warn("N8N_WEBHOOK_URL no está definida")
  }

  return { success: true }
}
