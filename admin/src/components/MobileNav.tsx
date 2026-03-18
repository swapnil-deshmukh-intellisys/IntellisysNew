'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mobileQuickNav } from '@/lib/nav';

function NavIcon({ name, active }: { name: string; active: boolean }) {
  const className = active ? 'text-brand-700' : 'text-slate-500';

  if (name === 'Home') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`h-5 w-5 ${className}`}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V20h13V9.5" />
      </svg>
    );
  }

  if (name === 'Leads') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`h-5 w-5 ${className}`}>
        <path d="M12 21a8 8 0 1 0-8-8" />
        <path d="M12 7v5l3 2" />
        <path d="M5 5h4" />
      </svg>
    );
  }

  if (name === 'Applications') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`h-5 w-5 ${className}`}>
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    );
  }

  if (name === 'Talent') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`h-5 w-5 ${className}`}>
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`h-5 w-5 ${className}`}>
      <path d="M4 7h16" />
      <path d="M7 4v16" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/98 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
      <div className="grid grid-cols-5 gap-1 px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-2">
        {mobileQuickNav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-[64px] flex-col items-center justify-center rounded-xl px-1 py-2 text-center ${
                active ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-600'
              }`}
            >
              <NavIcon name={item.shortLabel} active={active} />
              <span className="mt-1.5 block whitespace-pre-line text-[12px] font-medium leading-none tracking-tight">
                {item.shortLabel.replace(' ', '\n')}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
