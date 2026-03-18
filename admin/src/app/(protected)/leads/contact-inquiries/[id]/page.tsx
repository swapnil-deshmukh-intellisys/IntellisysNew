'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { useToast } from '@/components/ToastProvider';

export default function ContactInquiryDetailPage() {
  const { pushToast } = useToast();
  const params = useParams<{ id: string }>();
  const [row, setRow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/leads/contact/${params.id}`, { cache: 'no-store' });
      const data = await res.json().catch(() => ({}));
      const current = data.row || null;
      setRow(current);
      setStatus(current?.status || 'new');
      setPriority(current?.priority || 'medium');
      setLoading(false);
    })();
  }, [params.id]);

  const save = async () => {
    const res = await fetch(`/api/leads/contact/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, priority, last_contacted_at: new Date().toISOString() }),
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data.row) setRow((prev: any) => ({ ...prev, ...data.row, attachment_url: prev?.attachment_url || null }));
      pushToast('success', 'Inquiry saved successfully.');
    } else {
      const data = await res.json().catch(() => ({}));
      pushToast('error', data.error || 'Failed to save inquiry.');
    }
  };

  if (loading) return <div className="card p-4">Loading...</div>;
  if (!row) return <div className="card p-4">Inquiry not found.</div>;

  return (
    <div>
      <PageHeader
        title="Contact Inquiry"
        subtitle={row.email}
        actions={<button className="btn-primary" onClick={save}>Save Changes</button>}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_360px]">
        <div className="space-y-4">
          <section className="card p-5">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Business Lead</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">{row.name}</h2>
                <p className="mt-1 text-sm text-slate-600">{row.company || 'No company provided'}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge value={status || row.status || 'new'} />
                <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                  {priority || row.priority || 'medium'} priority
                </span>
              </div>
            </div>

            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</dt>
                <dd className="mt-1 text-sm text-slate-900 break-all">{row.email || '-'}</dd>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</dt>
                <dd className="mt-1 text-sm text-slate-900">{row.phone || '-'}</dd>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Requested Service</dt>
                <dd className="mt-1 text-sm text-slate-900">{row.service || '-'}</dd>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Lead Source</dt>
                <dd className="mt-1 text-sm text-slate-900">{row.source || 'website'}</dd>
              </div>
            </dl>
          </section>

          <section className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900">Project Message</h3>
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm leading-6 text-slate-700 whitespace-pre-wrap">{row.message || 'No message provided.'}</p>
            </div>
          </section>

          <section className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Attached Document</h3>
                <p className="mt-1 text-xs text-slate-500">Requirement file or brief uploaded with the inquiry.</p>
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              {row.attachment_url ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{row.attachment_path || 'Attached file'}</p>
                    <p className="mt-1 text-xs text-slate-500">File is ready to open in a new tab.</p>
                  </div>
                  <a
                    href={String(row.attachment_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Open Attachment
                  </a>
                </div>
              ) : row.attachment_path ? (
                <div>
                  <p className="text-sm text-slate-900">{row.attachment_path}</p>
                  <p className="mt-1 text-xs text-amber-700">The file path exists, but the document could not be opened from storage.</p>
                </div>
              ) : (
                <p className="text-sm text-slate-500">No attachment was submitted with this inquiry.</p>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900">Lead Controls</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</label>
                <select className="input mt-1" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {['new', 'contacted', 'qualified', 'won', 'lost', 'spam'].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Priority</label>
                <select className="input mt-1" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  {['low', 'medium', 'high', 'urgent'].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current Status</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <StatusBadge value={status || row.status || 'new'} />
                  <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                    {priority || row.priority || 'medium'} priority
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900">Timeline</h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Created</dt>
                <dd className="mt-1 text-slate-700">{new Date(row.created_at).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Last Contact</dt>
                <dd className="mt-1 text-slate-700">
                  {row.last_contacted_at ? new Date(row.last_contacted_at).toLocaleString() : 'Not contacted yet'}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Last Updated</dt>
                <dd className="mt-1 text-slate-700">{row.updated_at ? new Date(row.updated_at).toLocaleString() : '-'}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
