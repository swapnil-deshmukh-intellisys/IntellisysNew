import { getServerSession } from '@/lib/auth';

export async function Topbar() {
  const session = await getServerSession();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Welcome</p>
          <h2 className="font-semibold">{session?.displayName || session?.email || 'Admin User'}</h2>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="btn-secondary" type="submit">Logout</button>
        </form>
      </div>
    </header>
  );
}
