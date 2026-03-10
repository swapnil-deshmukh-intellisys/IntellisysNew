import type { Role } from '@/types';
import { createServiceClient } from '@/lib/supabase';

export async function logAudit(params: {
  actorUserId: string;
  actorRole: Role;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createServiceClient();
  await supabase.from('audit_logs').insert({
    actor_user_id: params.actorUserId,
    actor_role: params.actorRole,
    action: params.action,
    entity_type: params.entityType,
    entity_id: params.entityId,
    metadata: params.metadata || {},
  });
}