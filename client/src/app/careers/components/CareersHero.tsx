import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CareersHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-slate-200/70 pt-28 pb-20 sm:pt-32 sm:pb-24"
      style={{
        backgroundImage: 'url(/assets/images/herocareer.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 hero-grid-pattern opacity-[0.04] pointer-events-none" />

      <div className="container-custom relative z-10 text-center">
        <nav className="flex items-center justify-center gap-2 mb-10" aria-label="Breadcrumb">
          <Link
            href="/homepage"
            className="font-body text-body-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            Home
          </Link>
          <Icon name="ChevronRightIcon" size={12} className="text-slate-400" />
          <span className="font-body text-body-sm text-slate-700">Careers</span>
        </nav>

        <div className="max-w-3xl mx-auto">
          <h1
            className="font-heading font-900 text-foreground mb-4 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}
          >
            Open Positions
          </h1>
          <p className="font-body text-body-lg text-foreground-secondary leading-relaxed">
            Browse active openings and apply directly. If no role is a fit, send your resume and we
            will map your profile to upcoming opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
