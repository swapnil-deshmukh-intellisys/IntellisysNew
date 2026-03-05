import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';
import { logAudit } from '@/lib/audit';

export async function PATCH(req: NextRequest, context: any) {
  const params = await context.params;
  const guard = requireApiRole(req, ['super_admin', 'admin', 'recruiter']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const body = await req.json();
  const payload = {
    status: body.status,
    assigned_to: body.assigned_to,
    rating: body.rating,
    stage_updated_at: new Date().toISOString(),
  };

  const supabase = createServiceClient();
  const { data, error } = await supabase.from('job_applications').update(payload).eq('id', params.id).select('*').single();
  if (error) return fail(error.message, 500);

  await logAudit({
    actorUserId: guard.session.userId,
    actorRole: guard.session.role,
    action: 'job_application_updated',
    entityType: 'job_application',
    entityId: params.id,
    metadata: payload,
  });

  return ok({ row: data });
}
