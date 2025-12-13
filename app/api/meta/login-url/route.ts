// app/api/meta/login-url/route.ts
import { NextResponse } from 'next/server';
import { buildMetaLoginUrl } from '@/lib/metaOAuth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clienteId = searchParams.get('clienteId');
  const redirectAfterAuth = searchParams.get('redirectAfterAuth');

  if (!clienteId || !redirectAfterAuth) {
    return NextResponse.json({ error: 'Faltan parámetros required' }, { status: 400 });
  }

  // Construye la URL de Facebook usando las variables de entorno del CORE
  const url = buildMetaLoginUrl({ clienteId, redirectAfterAuth });

  return NextResponse.json({ url });
}