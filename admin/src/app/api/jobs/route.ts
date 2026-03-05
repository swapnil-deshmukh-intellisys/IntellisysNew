import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  const guard = requireApiRole(req, ['super_admin', 'admin', 'recruiter', 'editor', 'viewer']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const status = req.nextUrl.searchParams.get('status');
  const supabase = createServiceClient();

  let query = supabase.from('jobs').select('*').order('updated_at', { ascending: false }).limit(100);
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) return fail(error.message, 500);
  return ok({ rows: data || [] });
}

export async function POST(req: NextRequest) {
  const guard = requireApiRole(req, ['super_admin', 'admin', 'recruiter']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const payload = await req.json();
  const supabase = createServiceClient();
  const { data, error } = await supabase.from('jobs').insert(payload).select('*').single();
  if (error) return fail(error.message, 500);

  await logAudit({
    actorUserId: guard.session.userId,
    actorRole: guard.session.role,
    action: 'job_created',
    entityType: 'job',
    entityId: data.id,
    metadata: { status: data.status, title: data.title },
  });

  return ok({ row: data }, 201);
}