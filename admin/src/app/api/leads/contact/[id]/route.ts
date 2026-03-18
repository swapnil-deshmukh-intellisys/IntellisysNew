import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';
import { logAudit } from '@/lib/audit';
import {
  CONTACT_ATTACHMENTS_BUCKET,
  LEGACY_ATTACHMENTS_BUCKET,
  createSignedUrlWithFallback,
} from '@/lib/storage';

export async function GET(req: NextRequest, context: any) {
  const params = await context.params;
  const guard = requireApiRole(req, ['super_admin', 'admin', 'sales_ops', 'viewer']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (error) return fail(error.message, 500);
  if (!data) return fail('Inquiry not found', 404);

  let attachmentUrl: string | null = null;
  if (data.attachment_path) {
    const signed = await createSignedUrlWithFallback(
      supabase.storage,
      [data.attachment_bucket, CONTACT_ATTACHMENTS_BUCKET, LEGACY_ATTACHMENTS_BUCKET].filter(Boolean),
      data.attachment_path
    );
    attachmentUrl = signed.signedUrl;
  }

  return ok({
    row: {
      ...data,
      attachment_url: attachmentUrl,
    },
  });
}

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
    updated_at: new Date().toISOString(),
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
