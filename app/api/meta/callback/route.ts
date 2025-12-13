// app/api/meta/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { exchangeCodeForAccessToken, getLongLivedToken, getMetaUserProfile } from '@/lib/metaOAuth';

// Cliente ADMIN para escribir en fb_tokens (protegido por RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.json({ error: `Meta Error: ${error}` }, { status: 400 });
  }
  if (!code || !state) {
    return NextResponse.json({ error: 'Callback inválido: falta code o state' }, { status: 400 });
  }

  try {
    // 1. Decodificar el state para saber quién es el cliente
    const stateJson = Buffer.from(state, 'base64').toString('utf-8');
    const { clienteId, redirectAfterAuth } = JSON.parse(stateJson);

    // 2. Canjear Code -> Token Corto
    const shortTokenData = await exchangeCodeForAccessToken(code);

    // 3. Token Corto -> Token Largo (60 días)
    const longTokenData = await getLongLivedToken(shortTokenData.access_token);

    // 4. Obtener ID de usuario de Meta
    const userProfile = await getMetaUserProfile(longTokenData.access_token);

    // 5. Calcular expiración
    const expiresInSeconds = longTokenData.expires_in || 5184000; 
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

    // 6. Guardar/Actualizar en Supabase CORE
    const { error: dbError } = await supabaseAdmin
      .from('fb_tokens')
      .upsert({
        cliente_id: clienteId,
        provider: 'meta',
        meta_user_id: userProfile.id,
        access_token: longTokenData.access_token,
        token_type: longTokenData.token_type,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString()
      }, { onConflict: 'cliente_id, provider' });

    if (dbError) throw new Error(`Supabase Error: ${dbError.message}`);

    // 7. Éxito: Redirigir al panel del restaurante
    const successUrl = new URL(redirectAfterAuth);
    successUrl.searchParams.append('connected', 'true');
    
    return NextResponse.redirect(successUrl.toString());

  } catch (error: any) {
    console.error('Error Callback:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}