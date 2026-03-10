import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';
import { logAudit } from '@/lib/audit';

export async function PATCH(req: NextRequest, context: any) {
  const params = await context.params;
  const guard = requireApiRole(req, ['super_admin']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const body = await req.json();
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('admin_profiles')
    .update({ role: body.role, is_active: body.is_active })
    .eq('user_id', params.id)
    .select('*')
    .single();

  if (error) return fail(error.message, 500);

  await logAudit({
    actorUserId: guard.session.userId,
    actorRole: guard.session.role,
    action: 'user_role_updated',
    entityType: 'admin_profile',
    entityId: params.id,
    metadata: { role: body.role, is_active: body.is_active },
  });

  return ok({ row: data });
}
