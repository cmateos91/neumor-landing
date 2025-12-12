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

  // Seguridad básica: Verificar API Secret compartida
  if (secret !== process.env.CORE_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!clienteId) {
    return NextResponse.json({ error: 'Missing clienteId' }, { status: 400 });
  }

  // Buscar token
  const { data, error } = await supabaseAdmin
    .from('fb_tokens')
    .select('*')
    .eq('cliente_id', clienteId)
    .eq('provider', 'meta')
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Token no encontrado' }, { status: 404 });
  }

  // Verificar caducidad (Opcional: aquí podrías implementar lógica de refresco si fuera necesario)
  if (new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ error: 'Token expirado' }, { status: 401 });
  }

  return NextResponse.json({
    access_token: data.access_token,
    meta_user_id: data.meta_user_id,
    page_id: data.page_id, // Puedes llenar esto más tarde manualmente o con otro flujo
    expires_at: data.expires_at
  });
}