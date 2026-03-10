import Link from 'next/link';

export default function HomeRedirectPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="card p-6 text-center">
        <h1 className="text-xl font-semibold">Intellisys Admin</h1>
        <p className="mt-2 text-sm text-slate-600">Use the login page to access the admin panel.</p>
        <Link href="/login" className="btn-primary mt-4">Open Login</Link>
      </div>
    </main>
  );
}