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

  const supabase = createServiceClient();
  const q = req.nextUrl.searchParams.get('q');

  let query = supabase.from('resumes').select('*').order('created_at', { ascending: false }).limit(100);
  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,preferred_role.ilike.%${q}%`);

  const { data, error } = await query;
  if (error) return fail(error.message, 500);

  const rows = data || [];
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
        attachment_url: attachmentUrl,
      };
    })
  );

  return ok({ rows: enriched });
}
