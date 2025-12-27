'use server'

import { supabase } from '@/lib/supabase'

const N8N_WEBHOOK_URL = 'https://n8n.neumorstudio.com/webhook/coming-soon'

export async function subscribeToComing(email: string) {
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Email no válido' }
  }

  // Verificar si ya existe
  const { data: existing, error: checkError } = await supabase
    .from('early_subscribers')
    .select('email')
    .eq('email', email.toLowerCase())
    .maybeSingle()

  if (checkError) {
    console.error('Error verificando email:', checkError)
    return { success: false, error: 'Error al verificar el email' }
  }

  if (existing) {
    return { success: false, error: 'Ya estás en la lista' }
  }

  // Insertar nuevo suscriptor
  const { error } = await supabase
    .from('early_subscribers')
    .insert([{ email: email.toLowerCase() }])

  if (error) {
    console.error('Error insertando suscriptor:', error)
    return { success: false, error: 'Error al guardar el email' }
  }

  // Enviar email de bienvenida via n8n (no bloqueante)
  fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.toLowerCase() })
  }).catch(err => console.error('Error enviando a n8n:', err))

  return { success: true }
}
