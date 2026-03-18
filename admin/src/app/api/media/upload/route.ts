import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';
import { logAudit } from '@/lib/audit';
import { CONTACT_ATTACHMENTS_BUCKET } from '@/lib/storage';

export async function POST(req: NextRequest) {
  const guard = requireApiRole(req, ['super_admin', 'admin', 'editor', 'recruiter']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const form = await req.formData();
  const file = form.get('file');
  const bucket = String(form.get('bucket') || CONTACT_ATTACHMENTS_BUCKET);
  const folder = String(form.get('folder') || 'uploads');

  if (!(file instanceof File)) return fail('File is required', 400);

  const bytes = await file.arrayBuffer();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${folder}/${Date.now()}-${safeName}`;

  const supabase = createServiceClient();
  const { error } = await supabase.storage.from(bucket).upload(path, bytes, { contentType: file.type || 'application/octet-stream' });
  if (error) return fail(error.message, 500);

  await supabase.from('media_assets').insert({
    bucket,
    path,
    file_name: file.name,
    mime_type: file.type,
    size_bytes: file.size,
    uploaded_by: guard.session.userId,
  });

  await logAudit({
    actorUserId: guard.session.userId,
    actorRole: guard.session.role,
    action: 'media_uploaded',
    entityType: 'media_asset',
    entityId: path,
    metadata: { bucket, fileName: file.name },
  });

  return ok({ path }, 201);
}
