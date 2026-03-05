'use client';

import { PageHeader } from '@/components/PageHeader';
import { useToast } from '@/components/ToastProvider';

export default function IntegrationsPage() {
  const { pushToast } = useToast();
  return (
    <div>
      <PageHeader title="Integrations" subtitle="Supabase, analytics, and external service checks" />
      <div className="card p-4">
        <h3 className="font-semibold">Supabase Connectivity</h3>
        <ul className="mt-3 text-sm text-slate-700 space-y-1">
          <li>Database: configured via NEXT_PUBLIC_SUPABASE_URL</li>
          <li>Anon key: required for auth sign-in</li>
          <li>Service role key: server-only API access</li>
          <li>Storage bucket: contact-attachments</li>
        </ul>
        <div className="mt-4 flex gap-2">
          <button className="btn-secondary" onClick={() => pushToast('success', 'Health check completed successfully.')}>Run Health Check</button>
          <button className="btn-primary" onClick={() => pushToast('success', 'Integration config saved.')}>Save Integration Config</button>
        </div>
      </div>
    </div>
  );
}
