import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  const appId = process.env.NEXT_PUBLIC_FB_APP_ID
  const appSecret = process.env.FB_APP_SECRET

  try {
    // 1. Obtener el token actual de la DB
    const { data: tokens } = await supabase
      .from('fb_tokens')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)

    if (!tokens || tokens.length === 0) {
      return NextResponse.json({ error: 'No hay tokens guardados' }, { status: 404 })
    }

    const currentToken = tokens[0].access_token

    // 2. Solicitar renovación a Facebook (Code Exchange)
    // Nota: FB no siempre garantiza un token nuevo si el actual es muy reciente, pero refresca la caducidad
    const refreshRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${currentToken}`
    )
    const refreshData = await refreshRes.json()

    if (refreshData.error) throw new Error(refreshData.error.message)

    // 3. Actualizar en Supabase
    const { error: updateError } = await supabase.from('fb_tokens').insert([
      {
        access_token: refreshData.access_token,
        token_type: refreshData.token_type,
        expires_in: refreshData.expires_in
      }
    ])

    if (updateError) throw updateError

    return NextResponse.json({ success: true, message: 'Token renovado' })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}