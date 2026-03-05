import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';
import { logAudit } from '@/lib/audit';

export async function PATCH(req: NextRequest, context: any) {
  const params = await context.params;
  const guard = requireApiRole(req, ['super_admin', 'admin', 'recruiter']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const payload = await req.json();
  const supabase = createServiceClient();
  const { data, error } = await supabase.from('jobs').update(payload).eq('id', params.id).select('*').single();
  if (error) return fail(error.message, 500);

  await logAudit({
    actorUserId: guard.session.userId,
    actorRole: guard.session.role,
    action: 'job_updated',
    entityType: 'job',
    entityId: params.id,
    metadata: payload,
  });

  return ok({ row: data });
}

export async function DELETE(req: NextRequest, context: any) {
  const params = await context.params;
  const guard = requireApiRole(req, ['super_admin', 'admin']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const supabase = createServiceClient();
  const { error } = await supabase.from('jobs').delete().eq('id', params.id);
  if (error) return fail(error.message, 500);

  await logAudit({
    actorUserId: guard.session.userId,
    actorRole: guard.session.role,
    action: 'job_deleted',
    entityType: 'job',
    entityId: params.id,
  });

  return ok({ success: true });
}
