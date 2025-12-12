import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase' // Usamos tu cliente existente

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error || !code) {
    return NextResponse.json({ error: 'Permiso denegado o error en Facebook' }, { status: 400 })
  }

  const appId = process.env.NEXT_PUBLIC_FB_APP_ID
  const appSecret = process.env.FB_APP_SECRET
  const redirectUri = process.env.FB_REDIRECT_URI

  try {
    // 1. Intercambiar code por Access Token de corta duración (1 hora)
    const tokenRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`
    )
    const tokenData = await tokenRes.json()

    if (tokenData.error) throw new Error(tokenData.error.message)

    const shortLivedToken = tokenData.access_token

    // 2. Intercambiar token corto por uno de LARGA duración (60 días)
    // Esto es crucial para que N8N no falle a la hora.
    const longLivedRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`
    )
    const longLivedData = await longLivedRes.json()

    const finalToken = longLivedData.access_token || shortLivedToken
    const expiresIn = longLivedData.expires_in || tokenData.expires_in // Segundos

    // 3. Guardar en Supabase
    // Limpiamos tokens anteriores para no acumular basura, asumimos un solo usuario admin por ahora
    await supabase.from('fb_tokens').delete().neq('id', '00000000-0000-0000-0000-000000000000') 

    const { error: dbError } = await supabase.from('fb_tokens').insert([
      {
        access_token: finalToken,
        token_type: tokenData.token_type,
        expires_in: expiresIn
      }
    ])

    if (dbError) {
      console.error('Error guardando en Supabase:', dbError)
      return NextResponse.json({ error: 'Error de base de datos' }, { status: 500 })
    }

    // 4. Redirigir al panel
    return NextResponse.redirect(new URL('/panel?connected=1', request.url))

  } catch (err: any) {
    console.error('Error en OAuth:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}