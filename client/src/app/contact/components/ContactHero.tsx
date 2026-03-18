import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#FEFEFE] pt-18 pb-10 sm:pt-22 sm:pb-12">
      <div className="absolute inset-0 hero-grid-pattern opacity-[0.04] pointer-events-none" />

      <div className="container-custom relative z-10 text-center">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 mb-5" aria-label="Breadcrumb">
          <Link href="/homepage" className="font-body text-body-sm text-slate-500 hover:text-slate-700 transition-colors">
            Home
          </Link>
          <Icon name="ChevronRightIcon" size={12} className="text-slate-400" />
          <span className="font-body text-body-sm text-slate-700">Contact</span>
        </nav>
        <h1
          className="font-heading font-bold text-foreground mb-4 leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          Start a{' '}
          <span
            style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Business Conversation
          </span>
        </h1>

        <p className="font-body text-body-lg text-foreground-secondary max-w-xl mx-auto leading-relaxed">
          Tell us about your business requirement, project scope, or technical challenge. 
          We&apos;ll respond with a practical next step and a free technical consultation.
        </p>
      </div>
    </section>
  );
}
