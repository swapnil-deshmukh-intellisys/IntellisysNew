'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { useToast } from '@/components/ToastProvider';

export default function EditJobPage() {
  const params = useParams<{ id: string }>();
  const { pushToast } = useToast();
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      const row = (data.rows || []).find((x: any) => x.id === params.id);
      setForm({ ...row, tags: Array.isArray(row?.tags) ? row.tags.join(', ') : '' });
    })();
  }, [params.id]);

  const save = async (nextStatus?: string) => {
    if (!form) return;
    const payload = { ...form, tags: String(form.tags || '').split(',').map((t) => t.trim()).filter(Boolean), status: nextStatus || form.status };
    const res = await fetch(`/api/jobs/${params.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) {
      setForm((p: any) => ({ ...p, status: payload.status }));
      pushToast('success', `Job ${payload.status === 'published' ? 'published' : 'saved'} successfully.`);
    } else {
      const data = await res.json().catch(() => ({}));
      pushToast('error', data.error || 'Failed to save job.');
    }
  };

  if (!form) return <div className="card p-4">Loading...</div>;

  return (
    <div>
      <PageHeader
        title="Edit Job"
        subtitle={`Role ID: ${params.id}`}
        actions={<>
          <button className="btn-secondary" onClick={() => save('draft')}>Save Draft</button>
          <button className="btn-primary" onClick={() => save('published')}>Publish</button>
          <button className="btn-danger" onClick={() => save('closed')}>Close Role</button>
        </>}
      />
      <div className="card p-4 grid sm:grid-cols-2 gap-3">
        {['title','category','location','type','experience','salary','department','status'].map((key) => (
          <div key={key}>
            <label className="text-sm font-medium capitalize">{key}</label>
            <input className="input mt-1" value={form[key] || ''} onChange={(e) => setForm((p: any) => ({ ...p, [key]: e.target.value }))} />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Tags</label>
          <input className="input mt-1" value={form.tags || ''} onChange={(e) => setForm((p: any) => ({ ...p, tags: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Summary</label>
          <textarea className="input mt-1 min-h-28" value={form.summary || ''} onChange={(e) => setForm((p: any) => ({ ...p, summary: e.target.value }))} />
        </div>
      </div>
    </div>
  );
}
