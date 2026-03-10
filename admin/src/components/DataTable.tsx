import React from 'react';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  mobileCard: (row: T) => React.ReactNode;
}

export function DataTable<T>({ columns, rows, rowKey, mobileCard }: DataTableProps<T>) {
  return (
    <div>
      <div className="hidden md:block overflow-x-auto card">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="text-left px-4 py-3 font-semibold text-slate-700">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={rowKey(row)} className="border-b border-slate-100">
                {columns.map((col) => {
                  const value = row[col.key];
                  return (
                    <td key={String(col.key)} className={`px-4 py-3 align-top ${col.className || ''}`}>
                      {col.render ? col.render(value, row) : (value as React.ReactNode)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {rows.map((row) => (
          <div key={rowKey(row)} className="card p-3">{mobileCard(row)}</div>
        ))}
      </div>
    </div>
  );
}