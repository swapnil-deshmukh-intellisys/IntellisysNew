import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CareersHero() {
  return (
    <section className="relative pt-32 pb-28 lg:pb-32 bg-gradient-hero overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0 hero-grid-pattern opacity-25 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[420px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.42) 0%, transparent 72%)',
        }}
      />

      {/* Floating shapes */}
      <div className="absolute top-20 right-20 w-16 h-16 border-2 border-red-500 rounded-full animate-float opacity-90 hidden lg:block bg-red-500/10 shadow-[0_0_28px_rgba(239,68,68,0.5)]" />
      <div
        className="absolute bottom-20 left-0 w-10 h-10 border border-secondary/30 rounded-full animate-hero-sweep opacity-20 hidden lg:block"
      />

      <div className="container-custom relative z-10">
        <nav className="flex items-center gap-2 mb-10" aria-label="Breadcrumb">
          <Link
            href="/homepage"
            className="font-body text-body-sm text-white/40 hover:text-white/70 transition-colors"
          >
            Home
          </Link>
          <Icon name="ChevronRightIcon" size={12} className="text-white/30" />
          <span className="font-body text-body-sm text-white/70">Careers</span>
        </nav>

        <div className="max-w-3xl">
          <h1
            className="font-heading font-900 text-white mb-4 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}
          >
            Open Positions
          </h1>
          <p className="font-body text-body-lg text-white/65 leading-relaxed">
            Browse active openings and apply directly. If no role is a fit, send your resume and we
            will map your profile to upcoming opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
