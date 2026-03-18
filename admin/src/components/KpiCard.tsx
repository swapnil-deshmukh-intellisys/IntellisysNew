export function KpiCard({
  label,
  value,
  helper,
  clickable = false,
}: {
  label: string;
  value: string | number;
  helper?: string;
  clickable?: boolean;
}) {
  return (
    <div className={`card p-4 sm:p-5 ${clickable ? 'transition hover:border-brand-300 hover:bg-brand-50/40' : ''}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 sm:text-xs">{label}</p>
      <p className="mt-2 text-[28px] font-bold leading-none text-brand-900 sm:text-[32px]">{value}</p>
      {helper ? <p className="mt-2 text-[12px] leading-5 text-slate-500">{helper}</p> : null}
    </div>
  );
}
