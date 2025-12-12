// app/api/meta/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { exchangeCodeForAccessToken, getLongLivedToken, getMetaUserProfile } from '@/lib/metaOAuth';

// Cliente Supabase con permisos de ADMIN (Service Role)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code || !state) {
    return NextResponse.json({ error: 'Callback inválido' }, { status: 400 });
  }

  try {
    // 1. Decodificar el state para saber quién es el cliente
    const stateJson = Buffer.from(state, 'base64').toString('utf-8');
    const { clienteId, redirectAfterAuth } = JSON.parse(stateJson);

    // 2. Canjear Code por Token de Corta Duración
    const shortTokenData = await exchangeCodeForAccessToken(code);

    // 3. Canjear Token Corto por Token de Larga Duración (60 días)
    const longTokenData = await getLongLivedToken(shortTokenData.access_token);

    // 4. Obtener datos del usuario Meta
    const userProfile = await getMetaUserProfile(longTokenData.access_token);

    // 5. Calcular fecha de expiración
    // expires_in suelen ser segundos (aprox 60 días). Si no viene, asumimos 60 días.
    const expiresInSeconds = longTokenData.expires_in || 5184000; 
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

    // 6. Guardar en Supabase (Upsert)
    const { error } = await supabaseAdmin
      .from('fb_tokens')
      .upsert({
        cliente_id: clienteId,
        provider: 'meta',
        meta_user_id: userProfile.id,
        access_token: longTokenData.access_token,
        token_type: longTokenData.token_type,
        expires_at: expiresAt.toISOString(),
      }, { onConflict: 'cliente_id, provider' });

    if (error) throw error;

    // 7. Redirigir de vuelta al panel del restaurante
    // Añadimos un parámetro para que el frontend sepa que fue exitoso
    const successUrl = new URL(redirectAfterAuth);
    successUrl.searchParams.append('connected', 'true');
    
    return NextResponse.redirect(successUrl.toString());

  } catch (error: any) {
    console.error('Error en Meta Callback:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}