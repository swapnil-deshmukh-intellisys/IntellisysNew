import { getServerSession } from '@/lib/auth';

export async function Topbar() {
  const session = await getServerSession();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-slate-500">Welcome</p>
          <h2 className="truncate text-base font-semibold text-slate-900 sm:text-lg">{session?.displayName || session?.email || 'Admin User'}</h2>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="btn-secondary w-full sm:w-auto" type="submit">Logout</button>
        </form>
      </div>
    </header>
  );
}
