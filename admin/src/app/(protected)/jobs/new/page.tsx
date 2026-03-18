'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { useToast } from '@/components/ToastProvider';

export default function NewJobPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const [form, setForm] = useState({
    title: '', category: 'Engineering', location: '', type: 'Full-time', experience: '', tags: '', summary: '', salary: '', department: '', status: 'draft'
  });

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

  return (
    <div>
      <PageHeader title="Create Role" subtitle="Draft, preview, publish workflow" actions={<button className="btn-primary" onClick={submit}>Save Draft</button>} />
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
      <div className="fixed lg:static bottom-16 inset-x-0 lg:inset-auto bg-white border-t lg:border-0 border-slate-200 p-3 lg:p-0 mt-4 flex gap-2 justify-end">
        <button className="btn-secondary min-h-11">Preview</button>
        <button className="btn-primary min-h-11" onClick={submit}>Publish</button>
      </div>
    </div>
  );
}
