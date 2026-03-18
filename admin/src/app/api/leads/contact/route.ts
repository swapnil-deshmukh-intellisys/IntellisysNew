import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';
import {
  CONTACT_ATTACHMENTS_BUCKET,
  LEGACY_ATTACHMENTS_BUCKET,
} from '@/lib/storage';

export async function GET(req: NextRequest) {
  const guard = requireApiRole(req, ['super_admin', 'admin', 'sales_ops', 'viewer']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const supabase = createServiceClient();
  const q = req.nextUrl.searchParams.get('q');
  const status = req.nextUrl.searchParams.get('status');

  let query = supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (status) query = query.eq('status', status);
  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%`);

  const { data, error } = await query;
  if (error) return fail(error.message, 500);

  const rows = data || [];
  const enriched = await Promise.all(
    rows.map(async (r: any) => {
      if (!r.attachment_path) return { ...r, attachment_url: null };

      const bucketCandidates = [r.attachment_bucket, CONTACT_ATTACHMENTS_BUCKET, LEGACY_ATTACHMENTS_BUCKET].filter(Boolean);
      for (const bucket of bucketCandidates) {
        const { data: signed, error: signedErr } = await supabase.storage
          .from(bucket)
          .createSignedUrl(r.attachment_path, 60 * 30);

        if (!signedErr && signed?.signedUrl) {
          return { ...r, attachment_url: signed.signedUrl, attachment_bucket: bucket };
        }
      }

      return { ...r, attachment_url: null };
    })
  );

  return ok({ rows: enriched });
}
