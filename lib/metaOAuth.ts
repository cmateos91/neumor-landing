// lib/metaOAuth.ts
const META_API_URL = 'https://graph.facebook.com';
const VERSION = process.env.META_API_VERSION || 'v21.0';

interface MetaTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const buildMetaLoginUrl = (params: { clienteId: string; redirectAfterAuth: string }) => {
  const { clienteId, redirectAfterAuth } = params;
  
  // Permisos completos para que n8n funcione
  const scopes = [
    'public_profile', 
    'pages_show_list', 
    'pages_read_engagement', 
    'pages_manage_posts',
    'pages_messaging', // Vital para chats
    'instagram_basic',
    'instagram_content_publish',
    'instagram_manage_comments',
    'instagram_manage_messages'
  ].join(',');

  // El 'state' lleva los datos de vuelta (quién es el cliente y a dónde volver)
  const stateObj = { clienteId, redirectAfterAuth };
  const state = Buffer.from(JSON.stringify(stateObj)).toString('base64');

  const url = new URL(`https://www.facebook.com/${VERSION}/dialog/oauth`);
  url.searchParams.append('client_id', process.env.META_APP_ID!);
  url.searchParams.append('redirect_uri', process.env.META_REDIRECT_URI!);
  url.searchParams.append('scope', scopes);
  url.searchParams.append('state', state);
  url.searchParams.append('response_type', 'code');

  return url.toString();
};

export const exchangeCodeForAccessToken = async (code: string): Promise<MetaTokenResponse> => {
  const url = new URL(`${META_API_URL}/${VERSION}/oauth/access_token`);
  url.searchParams.append('client_id', process.env.META_APP_ID!);
  url.searchParams.append('redirect_uri', process.env.META_REDIRECT_URI!); // Debe ser idéntica a la del login
  url.searchParams.append('client_secret', process.env.META_APP_SECRET!);
  url.searchParams.append('code', code);

  const res = await fetch(url.toString());
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data;
};

export const getLongLivedToken = async (shortToken: string): Promise<MetaTokenResponse> => {
  const url = new URL(`${META_API_URL}/${VERSION}/oauth/access_token`);
  url.searchParams.append('grant_type', 'fb_exchange_token');
  url.searchParams.append('client_id', process.env.META_APP_ID!);
  url.searchParams.append('client_secret', process.env.META_APP_SECRET!);
  url.searchParams.append('fb_exchange_token', shortToken);

  const res = await fetch(url.toString());
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data;
};

export const getMetaUserProfile = async (accessToken: string) => {
  const res = await fetch(`${META_API_URL}/${VERSION}/me?fields=id,name&access_token=${accessToken}`);
  return res.json();
};