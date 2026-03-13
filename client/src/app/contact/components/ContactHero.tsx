import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-[#FEFEFE] pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="absolute inset-0 hero-grid-pattern opacity-[0.04] pointer-events-none" />
      <div className="absolute top-24 left-16 hidden h-12 w-12 rounded-xl border border-primary/20 rotate-12 opacity-50 lg:block" />
      <div className="absolute bottom-16 right-24 hidden h-8 w-8 rounded-full border border-secondary/20 opacity-50 lg:block" style={{ animationDelay: '3s' }} />

      <div className="container-custom relative z-10 text-center">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 mb-8" aria-label="Breadcrumb">
          <Link href="/homepage" className="font-body text-body-sm text-slate-500 hover:text-slate-700 transition-colors">
            Home
          </Link>
          <Icon name="ChevronRightIcon" size={12} className="text-slate-400" />
          <span className="font-body text-body-sm text-slate-700">Contact</span>
        </nav>
        <h1
          className="font-heading font-900 text-foreground mb-6 leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          Let's Build Something{' '}
          <span
            style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Great Together
          </span>
        </h1>

        <p className="font-body text-body-lg text-foreground-secondary max-w-xl mx-auto leading-relaxed">
          Tell us about your project and we'll get back to you with a detailed proposal 
          and a free technical consultation.
        </p>
      </div>
    </section>
  );
}
