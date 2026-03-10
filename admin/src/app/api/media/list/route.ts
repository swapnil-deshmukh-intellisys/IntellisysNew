import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';

export async function GET(req: NextRequest) {
  const guard = requireApiRole(req, ['super_admin', 'admin', 'editor', 'viewer']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const bucket = req.nextUrl.searchParams.get('bucket') || 'contact-attachments';
  const folder = req.nextUrl.searchParams.get('folder') || '';

  const supabase = createServiceClient();
  const { data, error } = await supabase.storage.from(bucket).list(folder, { limit: 200, sortBy: { column: 'updated_at', order: 'desc' } });
  if (error) return fail(error.message, 500);

  return ok({ rows: data || [] });
}