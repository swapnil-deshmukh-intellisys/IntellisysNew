export function FilterBar({ children }: { children: React.ReactNode }) {
  return <div className="card mb-4 grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:p-4 xl:grid-cols-4">{children}</div>;
}
