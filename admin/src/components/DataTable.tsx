'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

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
  rowHref?: (row: T) => string | null;
}

export function DataTable<T>({ columns, rows, rowKey, mobileCard, rowHref }: DataTableProps<T>) {
  const router = useRouter();

  const isInteractiveTarget = (target: EventTarget | null) => {
    return target instanceof HTMLElement && Boolean(target.closest('a,button,input,select,textarea,label'));
  };

  const openRow = (href: string | null) => {
    if (href) router.push(href);
  };

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
            {rows.map((row) => {
              const href = rowHref ? rowHref(row) : null;
              return (
              <tr
                key={rowKey(row)}
                className={`border-b border-slate-100 ${href ? 'cursor-pointer transition hover:bg-slate-50 focus-within:bg-slate-50' : ''}`}
                onClick={(e) => {
                  if (!href || isInteractiveTarget(e.target)) return;
                  openRow(href);
                }}
                onKeyDown={(e) => {
                  if (!href || e.target !== e.currentTarget) return;
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openRow(href);
                  }
                }}
                tabIndex={href ? 0 : -1}
              >
                {columns.map((col) => {
                  const value = row[col.key];
                  return (
                    <td key={String(col.key)} className={`px-4 py-3 align-top ${col.className || ''}`}>
                      {col.render ? col.render(value, row) : (value as React.ReactNode)}
                    </td>
                  );
                })}
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {rows.map((row) => {
          const href = rowHref ? rowHref(row) : null;
          return (
            <div
              key={rowKey(row)}
              className={`card p-4 ${href ? 'cursor-pointer transition hover:border-brand-200 hover:bg-slate-50' : ''}`}
              onClick={(e) => {
                if (!href || isInteractiveTarget(e.target)) return;
                openRow(href);
              }}
              onKeyDown={(e) => {
                if (!href || e.target !== e.currentTarget) return;
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openRow(href);
                }
              }}
              tabIndex={href ? 0 : -1}
            >
              {mobileCard(row)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
