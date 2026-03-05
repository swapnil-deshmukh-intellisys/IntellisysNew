import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, getSessionCookieName } from '@/lib/session';
import type { Role } from '@/types';

export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  return verifySession(token);
}

export function getSessionFromRequest(req: NextRequest) {
  const token = req.cookies.get(getSessionCookieName())?.value;
  return verifySession(token);
}

export function hasRole(role: Role, allowed: Role[]) {
  return allowed.includes(role);
}

type GuardError = { error: string; status: 401 | 403 };
type GuardOk = { session: NonNullable<ReturnType<typeof verifySession>> };

export function requireApiRole(req: NextRequest, allowed: Role[]) {
  const session = getSessionFromRequest(req);
  if (!session) return { error: 'Unauthorized', status: 401 as const } satisfies GuardError;
  if (!hasRole(session.role, allowed)) return { error: 'Forbidden', status: 403 as const } satisfies GuardError;
  return { session } satisfies GuardOk;
}
