import { NextResponse } from 'next/server'

export async function GET() {
  const appId = process.env.NEXT_PUBLIC_FB_APP_ID
  const redirectUri = process.env.FB_REDIRECT_URI
  
  // Permisos solicitados
  const scopes = [
    'pages_manage_posts',
    'pages_read_engagement',
    'instagram_basic',
    'pages_show_list',
    'business_management'
  ].join(',')

  if (!appId || !redirectUri) {
    return NextResponse.json({ error: 'Faltan variables de entorno FB' }, { status: 500 })
  }

  const facebookAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code`

  return NextResponse.redirect(facebookAuthUrl)
}