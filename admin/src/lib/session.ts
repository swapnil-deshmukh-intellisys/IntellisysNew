import crypto from 'crypto';
import type { AdminSessionPayload } from '@/types';
import { ADMIN_SESSION_COOKIE } from '@/lib/cookie';

const SESSION_TTL_SECONDS = 60 * 60 * 12;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is required');
  return secret;
}

export function getSessionCookieName() {
  return ADMIN_SESSION_COOKIE;
}

export function signSession(payload: Omit<AdminSessionPayload, 'exp'>) {
  const body: AdminSessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(body)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSecret())
    .update(encoded)
    .digest('base64url');
  return `${encoded}.${signature}`;
}

export function verifySession(token?: string | null): AdminSessionPayload | null {
  if (!token) return null;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return null;
  const expected = crypto
    .createHmac('sha256', getSecret())
    .update(encoded)
    .digest('base64url');
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString()) as AdminSessionPayload;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}
