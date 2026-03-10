'use client';

import { PageHeader } from '@/components/PageHeader';
import { useToast } from '@/components/ToastProvider';

export default function GeneralSettingsPage() {
  const { pushToast } = useToast();
  return (
    <div>
      <PageHeader title="General Settings" subtitle="Global admin defaults and behavior" />
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-semibold">Application Defaults</h3>
          <div className="mt-3 space-y-3 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Enable autosave in CMS editor</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Require review before publish</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> Disable public jobs feed fallback</label>
          </div>
          <button className="btn-primary mt-4" onClick={() => pushToast('success', 'Settings saved.')}>Save Settings</button>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold">Notification Rules</h3>
          <p className="mt-2 text-sm text-slate-600">Set notification channels for new leads and applications.</p>
          <div className="mt-3 space-y-2">
            <input className="input" placeholder="Ops email distribution list" />
            <input className="input" placeholder="Slack webhook URL" />
            <button className="btn-secondary">Test Notification</button>
          </div>
        </div>
      </div>
    </div>
  );
}
