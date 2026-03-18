'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { useToast } from '@/components/ToastProvider';

export default function ContentPageEditor() {
  const params = useParams<{ slug: string }>();
  const { pushToast } = useToast();
  const [title, setTitle] = useState('');
  const [publishStatus, setPublishStatus] = useState('draft');
  const [sectionsJson, setSectionsJson] = useState('[\n  {\n    "section_key": "hero",\n    "section_type": "hero",\n    "content": {"heading": ""}\n  }\n]');

  const load = async () => {
    const res = await fetch(`/api/cms/pages/${params.slug}`, { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    setTitle(data.page?.title || params.slug);
    setPublishStatus(data.page?.publish_status || 'draft');
    setSectionsJson(JSON.stringify(data.sections || [], null, 2));
  };

  useEffect(() => { load(); }, [params.slug]);

  const save = async (nextStatus?: string) => {
    let parsed: any[] = [];
    try {
      parsed = JSON.parse(sectionsJson);
    } catch {
      pushToast('error', 'Invalid JSON. Please fix syntax before saving.');
      return;
    }
    const res = await fetch(`/api/cms/pages/${params.slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, publish_status: nextStatus || publishStatus, sections: parsed }),
    });
    if (res.ok) {
      if (nextStatus) setPublishStatus(nextStatus);
      pushToast('success', `Content saved (${nextStatus || publishStatus}).`);
    } else {
      const data = await res.json().catch(() => ({}));
      pushToast('error', data.error || 'Failed to save content.');
    }
  };

  return (
    <div>
      <PageHeader
        title={`Content: ${params.slug}`}
        subtitle="Inline section editing, reorder-ready JSON block editor"
        actions={<>
          <button className="btn-secondary" onClick={() => save('draft')}>Save Draft</button>
          <button className="btn-secondary" onClick={() => save('review')}>Send Review</button>
          <button className="btn-primary" onClick={() => save('published')}>Publish</button>
        </>}
      />
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
        <section className="card p-4">
          <label className="text-sm font-medium">Page Title</label>
          <input className="input mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label className="text-sm font-medium mt-4 block">Sections JSON</label>
          <textarea className="input mt-1 min-h-[360px] font-body text-xs" value={sectionsJson} onChange={(e) => setSectionsJson(e.target.value)} />
        </section>
        <aside className="space-y-4">
          <div className="card p-4">
            <p className="text-sm font-semibold">Workflow</p>
            <p className="mt-2 text-sm">Current state: <span className="font-semibold">{publishStatus}</span></p>
            <p className="mt-2 text-xs text-slate-600">Use Draft {'->'} Review {'->'} Publish workflow. Rollback is supported from DB version history.</p>
          </div>
          <div className="card p-4">
            <p className="text-sm font-semibold">Section Controls</p>
            <ul className="mt-2 text-xs text-slate-600 space-y-1">
              <li>Repeater sections: services, testimonials, FAQs, links.</li>
              <li>Button config: label, href, variant.</li>
              <li>Media references: use media library paths.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
