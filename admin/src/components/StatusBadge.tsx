export function StatusBadge({ value }: { value: string }) {
  const map: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-cyan-100 text-cyan-800',
    qualified: 'bg-indigo-100 text-indigo-800',
    won: 'bg-emerald-100 text-emerald-800',
    lost: 'bg-rose-100 text-rose-800',
    spam: 'bg-slate-200 text-slate-700',
    screening: 'bg-amber-100 text-amber-800',
    interview: 'bg-violet-100 text-violet-800',
    shortlisted: 'bg-teal-100 text-teal-800',
    hired: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    archived: 'bg-slate-200 text-slate-700',
    draft: 'bg-slate-200 text-slate-700',
    published: 'bg-emerald-100 text-emerald-800',
    paused: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-red-100 text-red-800',
  };

  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${map[value] || 'bg-slate-100 text-slate-700'}`}>{value}</span>;
}