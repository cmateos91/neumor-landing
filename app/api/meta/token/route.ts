// app/api/meta/token/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clienteId = searchParams.get('clienteId');
  const secret = searchParams.get('secret');

  // Seguridad: Solo n8n o sistemas con el SECRET pueden leer esto
  if (secret !== process.env.CORE_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Buscar token
  let { data, error } = await supabaseAdmin
    .from('fb_tokens')
    .select('*')
    .eq('cliente_id', clienteId)
    .eq('provider', 'meta')
    .single();

  if (error || !data) return NextResponse.json({ error: 'Token no encontrado' }, { status: 404 });

  // AUTO-REFRESH: Si quedan menos de 10 días, refrescar
  const now = new Date();
  const expiresAt = new Date(data.expires_at);
  const daysDiff = (expiresAt.getTime() - now.getTime()) / (1000 * 3600 * 24);

  if (daysDiff < 10) {
    try {
      const refreshUrl = `https://graph.facebook.com/${process.env.META_API_VERSION}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.META_APP_ID}&client_secret=${process.env.META_APP_SECRET}&fb_exchange_token=${data.access_token}`;
      const res = await fetch(refreshUrl);
      const refreshData = await res.json();

      if (refreshData.access_token) {
        const newExpiresAt = new Date(Date.now() + (refreshData.expires_in || 5184000) * 1000);
        await supabaseAdmin.from('fb_tokens').update({
            access_token: refreshData.access_token,
            expires_at: newExpiresAt.toISOString(),
            updated_at: new Date().toISOString()
        }).eq('id', data.id);
        data.access_token = refreshData.access_token; // Usar el nuevo
      }
    } catch (e) {
      console.error('Error auto-refreshing token:', e);
    }
  }

  return NextResponse.json(data);
}