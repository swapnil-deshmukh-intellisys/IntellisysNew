import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';

export async function GET(req: NextRequest) {
  const guard = requireApiRole(req, ['super_admin', 'admin']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const supabase = createServiceClient();
  const { data, error } = await supabase.from('admin_profiles').select('*').order('created_at', { ascending: false });
  if (error) return fail(error.message, 500);

  return ok({ rows: data || [] });
}