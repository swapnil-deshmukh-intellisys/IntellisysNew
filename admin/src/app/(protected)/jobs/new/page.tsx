'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { useToast } from '@/components/ToastProvider';

export default function NewJobPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const [isMobile, setIsMobile] = useState(false);
  const [form, setForm] = useState({
    title: '', category: 'Engineering', location: '', type: 'Full-time', experience: '', tags: '', summary: '', salary: '', department: '', status: 'draft'
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const syncViewport = () => setIsMobile(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);
    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, []);

  const submit = async () => {
    const payload = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) };
    const res = await fetch('/api/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) {
      const data = await res.json();
      pushToast('success', 'Job saved successfully.');
      router.push(`/jobs/${data.row.id}/edit`);
    } else {
      const data = await res.json().catch(() => ({}));
      pushToast('error', data.error || 'Failed to create job.');
    }
  };

  const formFields = (
    <div className="card p-4 grid sm:grid-cols-2 gap-3">
        {[
          ['title', 'Title'], ['category', 'Category'], ['location', 'Location'], ['type', 'Type'], ['experience', 'Experience'], ['salary', 'Salary'], ['department', 'Department']
        ].map(([key, label]) => (
          <div key={key}>
            <label className="text-sm font-medium">{label}</label>
            <input className="input mt-1" value={(form as any)[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Tags (comma separated)</label>
          <input className="input mt-1" value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Summary</label>
          <textarea className="input mt-1 min-h-28" value={form.summary} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} />
        </div>
      </div>
  );

  const actionBar = (
    <div className="bg-white border-t border-slate-200 p-3 md:p-0 md:mt-4 flex gap-2 justify-end">
        <button className="btn-secondary min-h-11">Preview</button>
        <button className="btn-primary min-h-11" onClick={submit}>Publish</button>
      </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Create Role</p>
              <h1 className="mt-1 text-xl font-semibold text-slate-900">New Role</h1>
              <p className="mt-1 text-sm text-slate-500">Draft, preview, publish workflow</p>
            </div>
            <button
              type="button"
              className="btn-secondary shrink-0 min-h-11 px-4"
              onClick={() => router.push('/recruitment/jobs')}
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 pb-28">
            {formFields}
          </div>

          <div className="border-t border-slate-200 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex gap-2 justify-end">
              <button className="btn-secondary min-h-11">Preview</button>
              <button className="btn-primary min-h-11" onClick={submit}>Publish</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Create Role" subtitle="Draft, preview, publish workflow" actions={<button className="btn-primary" onClick={submit}>Save Draft</button>} />
      {formFields}
      <div className="mt-4">
        {actionBar}
      </div>
    </div>
  );
}
