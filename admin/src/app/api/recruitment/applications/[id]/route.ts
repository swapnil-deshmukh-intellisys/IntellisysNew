import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';
import { logAudit } from '@/lib/audit';
import {
  RECRUITMENT_ATTACHMENTS_BUCKET,
  LEGACY_ATTACHMENTS_BUCKET,
  createSignedUrlWithFallback,
} from '@/lib/storage';

export async function GET(req: NextRequest, context: any) {
  const params = await context.params;
  const guard = requireApiRole(req, ['super_admin', 'admin', 'recruiter', 'viewer']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (error) return fail(error.message, 500);
  if (!data) return fail('Application not found', 404);

  let attachmentUrl: string | null = null;
  if (data.attachment_path) {
    const signed = await createSignedUrlWithFallback(
      supabase.storage,
      [data.attachment_bucket, RECRUITMENT_ATTACHMENTS_BUCKET, LEGACY_ATTACHMENTS_BUCKET].filter(Boolean),
      data.attachment_path
    );
    attachmentUrl = signed.signedUrl;
  }

  let linkedJobTitle: string | null = null;
  if (data.job_id) {
    const { data: job } = await supabase
      .from('jobs')
      .select('id, title')
      .eq('id', data.job_id)
      .maybeSingle();

    linkedJobTitle = job?.title ? String(job.title) : null;
  }

  return ok({
    row: {
      ...data,
      attachment_url: attachmentUrl,
      linked_job_title: linkedJobTitle,
    },
  });
}

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
    updated_at: new Date().toISOString(),
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
