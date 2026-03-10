import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';
import { logAudit } from '@/lib/audit';

export async function PATCH(req: NextRequest, context: any) {
  const params = await context.params;
  const guard = requireApiRole(req, ['super_admin', 'admin', 'sales_ops']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const body = await req.json();
  const allowed = {
    status: body.status,
    assigned_to: body.assigned_to,
    priority: body.priority,
    source: body.source,
    last_contacted_at: body.last_contacted_at,
  };

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('contact_inquiries')
    .update(allowed)
    .eq('id', params.id)
    .select('*')
    .single();

  if (error) return fail(error.message, 500);

  await logAudit({
    actorUserId: guard.session.userId,
    actorRole: guard.session.role,
    action: 'contact_inquiry_updated',
    entityType: 'contact_inquiry',
    entityId: params.id,
    metadata: allowed,
  });

  return ok({ row: data });
}
