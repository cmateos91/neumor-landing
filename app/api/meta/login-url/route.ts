// app/api/meta/login-url/route.ts
import { NextResponse } from 'next/server';
import { buildMetaLoginUrl } from '@/lib/metaOAuth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clienteId = searchParams.get('clienteId');
  const redirectAfterAuth = searchParams.get('redirectAfterAuth'); // Url de vuelta al admin del restaurante

  if (!clienteId || !redirectAfterAuth) {
    return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
  }

  const url = buildMetaLoginUrl({ clienteId, redirectAfterAuth });

  return NextResponse.json({ url });
}