import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createAnonClient, createServiceClient } from '@/lib/supabase';
import { signSession, getSessionCookieName } from '@/lib/session';
import { fail, ok } from '@/lib/http';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) return fail('Email and password are required', 400);

  const anon = createAnonClient();
  const { data: signIn, error: signInError } = await anon.auth.signInWithPassword({ email, password });
  if (signInError || !signIn.user) return fail('Invalid credentials', 401);

  const svc = createServiceClient();
  const { data: profile, error } = await svc
    .from('admin_profiles')
    .select('role, display_name, is_active')
    .eq('user_id', signIn.user.id)
    .single();

  if (error || !profile || !profile.is_active) return fail('Admin access not granted', 403);

  const token = signSession({
    userId: signIn.user.id,
    email: signIn.user.email || email,
    role: profile.role,
    displayName: profile.display_name || signIn.user.email || 'Admin',
  });

  const res = ok({ success: true });
  res.cookies.set(getSessionCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return res;
}