import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest, context: any) {
  const params = await context.params;
  const guard = requireApiRole(req, ['super_admin', 'admin', 'editor', 'viewer']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const supabase = createServiceClient();
  const { data: page, error } = await supabase.from('cms_pages').select('*').eq('slug', params.slug).single();
  if (error) return fail(error.message, 500);

  const { data: sections } = await supabase
    .from('cms_sections')
    .select('*')
    .eq('page_slug', params.slug)
    .order('sort_order', { ascending: true });

  return ok({ page, sections: sections || [] });
}

export async function PATCH(req: NextRequest, context: any) {
  const params = await context.params;
  const guard = requireApiRole(req, ['super_admin', 'admin', 'editor']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const body = await req.json();
  const supabase = createServiceClient();

  const { data: page, error: pageErr } = await supabase
    .from('cms_pages')
    .upsert({
      slug: params.slug,
      title: body.title || params.slug,
      publish_status: body.publish_status || 'draft',
      seo: body.seo || {},
      updated_by: guard.session.userId,
    }, { onConflict: 'slug' })
    .select('*')
    .single();

  if (pageErr) return fail(pageErr.message, 500);

  if (Array.isArray(body.sections)) {
    await supabase.from('cms_sections').delete().eq('page_slug', params.slug);
    const sections = body.sections.map((section: any, index: number) => ({
      page_slug: params.slug,
      section_key: section.section_key || `section_${index + 1}`,
      section_type: section.section_type || 'generic',
      content: section.content || {},
      sort_order: index,
      updated_by: guard.session.userId,
    }));
    if (sections.length) await supabase.from('cms_sections').insert(sections);
  }

  await logAudit({
    actorUserId: guard.session.userId,
    actorRole: guard.session.role,
    action: 'cms_page_updated',
    entityType: 'cms_page',
    entityId: params.slug,
    metadata: { publish_status: body.publish_status || 'draft' },
  });

  return ok({ page });
}
