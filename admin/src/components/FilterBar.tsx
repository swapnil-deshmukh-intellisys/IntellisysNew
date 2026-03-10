export function FilterBar({ children }: { children: React.ReactNode }) {
  return <div className="card p-3 sm:p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">{children}</div>;
}