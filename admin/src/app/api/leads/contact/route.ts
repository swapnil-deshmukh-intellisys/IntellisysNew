import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';

export async function GET(req: NextRequest) {
  const guard = requireApiRole(req, ['super_admin', 'admin', 'sales_ops', 'viewer']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const supabase = createServiceClient();
  const q = req.nextUrl.searchParams.get('q');
  const status = req.nextUrl.searchParams.get('status');

  let query = supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (status) query = query.eq('status', status);
  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%`);

  const { data, error } = await query;
  if (error) return fail(error.message, 500);
  return ok({ rows: data || [] });
}