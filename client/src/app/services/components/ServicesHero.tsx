import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ServicesHero() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial-blue opacity-40 pointer-events-none" />

      {/* Floating shapes */}
      <div className="absolute top-20 right-20 w-16 h-16 border border-primary/30 rounded-2xl rotate-12 animate-float opacity-30 hidden lg:block" />
      <div className="absolute bottom-20 left-20 w-10 h-10 border border-secondary/30 rounded-full animate-float opacity-20 hidden lg:block" style={{ animationDelay: '2s' }} />

      <div className="container-custom relative z-10 text-center">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 mb-8" aria-label="Breadcrumb">
          <Link href="/homepage" className="font-body text-body-sm text-white/40 hover:text-white/70 transition-colors">
            Home
          </Link>
          <Icon name="ChevronRightIcon" size={12} className="text-white/30" />
          <span className="font-body text-body-sm text-white/70">Services</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-4 py-2 glass border border-white/15 rounded-full mb-6">
          <Icon name="CpuChipIcon" size={14} className="text-primary-light" />
          <span className="font-body text-caption text-white/70 uppercase tracking-wider">
            7 Service Domains · 50+ Expert Engineers
          </span>
        </div>

        <h1
          className="font-heading font-900 text-white mb-6 leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          Technology Services That{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #60A5FA 0%, #38BDF8 50%, #34D399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Scale With You
          </span>
        </h1>

        <p className="font-body text-body-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          From greenfield startups to enterprise transformations — our end-to-end IT services 
          cover every phase of your digital journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white font-heading font-700 text-body-base rounded-2xl shadow-blue-lg hover:scale-105 transition-all duration-300"
          >
            Request a Proposal
            <Icon name="ArrowRightIcon" size={18} />
          </Link>
          <a
            href="#services-grid"
            className="flex items-center gap-2 px-8 py-4 glass border border-white/20 text-white font-heading font-600 text-body-base rounded-2xl hover:bg-white/15 transition-all duration-300"
          >
            Browse Services
            <Icon name="ChevronDownIcon" size={18} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}