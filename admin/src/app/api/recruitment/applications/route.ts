import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';
import {
  RECRUITMENT_ATTACHMENTS_BUCKET,
  LEGACY_ATTACHMENTS_BUCKET,
} from '@/lib/storage';

export async function GET(req: NextRequest) {
  const guard = requireApiRole(req, ['super_admin', 'admin', 'recruiter', 'viewer']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const status = req.nextUrl.searchParams.get('status');
  const supabase = createServiceClient();

  let query = supabase
    .from('job_applications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) return fail(error.message, 500);

  const rows = data || [];
  const jobIds = Array.from(
    new Set(
      rows
        .map((r: any) => r.job_id)
        .filter((id: unknown): id is string => typeof id === 'string' && id.length > 0)
    )
  );

  const jobTitleMap = new Map<string, string>();
  if (jobIds.length > 0) {
    const { data: jobs } = await supabase
      .from('jobs')
      .select('id, title')
      .in('id', jobIds);

    (jobs || []).forEach((job: any) => {
      if (job?.id && job?.title) jobTitleMap.set(String(job.id), String(job.title));
    });
  }

  const enriched = await Promise.all(
    rows.map(async (r: any) => {
      let attachmentUrl: string | null = null;
      if (r.attachment_path) {
        const bucketCandidates = [r.attachment_bucket, RECRUITMENT_ATTACHMENTS_BUCKET, LEGACY_ATTACHMENTS_BUCKET].filter(Boolean);
        for (const bucket of bucketCandidates) {
          const { data: signed, error: signedErr } = await supabase.storage
            .from(bucket)
            .createSignedUrl(r.attachment_path, 60 * 30);

          if (!signedErr && signed?.signedUrl) {
            attachmentUrl = signed.signedUrl;
            break;
          }
        }
      }

      return {
        ...r,
        linked_job_title: r.job_id ? jobTitleMap.get(String(r.job_id)) || null : null,
        attachment_url: attachmentUrl,
      };
    })
  );

  return ok({ rows: enriched });
}
