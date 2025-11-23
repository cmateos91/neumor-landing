'use server'

import { supabase } from '@/lib/supabase'

export type LeadData = {
  nombre: string
  email: string
  tipo_negocio: string
  mensaje?: string
}

export async function crearLead(data: LeadData) {
  // Verificar si el email ya existe
  const { data: existingLead, error: checkError } = await supabase
    .from('cliente_potencial')
    .select('email')
    .eq('email', data.email)

  if (checkError) {
    return { success: false, error: 'Error al verificar el email' }
  }

  if (existingLead && existingLead.length > 0) {
    return { success: false, error: 'Este email ya está registrado' }
  }

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
    return { success: false, error: error.message }
  }

  return { success: true }
}
