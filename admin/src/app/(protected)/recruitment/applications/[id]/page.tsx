'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { useToast } from '@/components/ToastProvider';

export default function ApplicationDetailPage() {
  const { pushToast } = useToast();
  const params = useParams<{ id: string }>();
  const [row, setRow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('new');
  const [rating, setRating] = useState(3);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/recruitment/applications/${params.id}`, { cache: 'no-store' });
      const data = await res.json().catch(() => ({}));
      const current = data.row || null;
      setRow(current);
      setStatus(current?.status || 'new');
      setRating(current?.rating || 3);
      setLoading(false);
    })();
  }, [params.id]);

  const save = async () => {
    const res = await fetch(`/api/recruitment/applications/${params.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status, rating })
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data.row) setRow((prev: any) => ({ ...prev, ...data.row, attachment_url: prev?.attachment_url || null }));
      pushToast('success', 'Application stage updated.');
    } else {
      const data = await res.json().catch(() => ({}));
      pushToast('error', data.error || 'Failed to update application.');
    }
  };

  if (loading) return <div className="card p-4">Loading...</div>;
  if (!row) return <div className="card p-4">Application not found.</div>;

  return (
    <div>
      <PageHeader title="Application Detail" subtitle={row.email} actions={<button className="btn-primary" onClick={save}>Update Stage</button>} />
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <section className="card p-4">
          <h3 className="font-semibold">Candidate</h3>
          <dl className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
            <div><dt className="text-slate-500">Name</dt><dd>{row.name}</dd></div>
            <div><dt className="text-slate-500">Phone</dt><dd>{row.phone}</dd></div>
            <div><dt className="text-slate-500">Role</dt><dd>{row.linked_job_title || row.job_title || '-'}</dd></div>
            <div><dt className="text-slate-500">Applied</dt><dd>{new Date(row.created_at).toLocaleString()}</dd></div>
          </dl>
          <div className="mt-4">
            <p className="text-sm text-slate-500">Cover Note</p>
            <p className="mt-1 text-sm">{row.message || '-'}</p>
          </div>
        </section>
        <aside className="card p-4">
          <h3 className="font-semibold">Stage Control</h3>
          <div className="mt-3 space-y-3">
            <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
              {['new','screening','interview','shortlisted','hired','rejected','archived'].map((s)=><option key={s}>{s}</option>)}
            </select>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Candidate Rating</label>
              <div className="flex items-center gap-2">
                <input
                  className="input"
                  type="number"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
                <span className="shrink-0 text-sm text-slate-500">/ 5</span>
              </div>
            </div>
            {row.attachment_url ? (
              <a
                href={String(row.attachment_url)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Resume
              </a>
            ) : (
              <p className="text-xs text-slate-500">Attachment: {row.attachment_path || 'None'}</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
