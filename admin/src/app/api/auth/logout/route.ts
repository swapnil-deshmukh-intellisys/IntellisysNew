import { NextResponse } from 'next/server';
import { getSessionCookieName } from '@/lib/session';

export async function POST() {
  const res = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_ADMIN_BASE_URL || 'http://localhost:4030'));
  res.cookies.set(getSessionCookieName(), '', { path: '/', expires: new Date(0) });
  return res;
}