import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';

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
  const paths = rows
    .map((r: any) => r.attachment_path)
    .filter((p: unknown): p is string => typeof p === 'string' && p.length > 0);

  const urlMap = new Map<string, string>();
  if (paths.length > 0) {
    const { data: signed, error: signedErr } = await supabase.storage
      .from('contact-attachments')
      .createSignedUrls(paths, 60 * 30);

    if (!signedErr && signed) {
      signed.forEach((item, idx) => {
        if (item.signedUrl) urlMap.set(paths[idx], item.signedUrl);
      });
    }
  }

  const enriched = rows.map((r: any) => ({
    ...r,
    attachment_url: r.attachment_path ? urlMap.get(r.attachment_path) || null : null,
  }));

  return ok({ rows: enriched });
}
