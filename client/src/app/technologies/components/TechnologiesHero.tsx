import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function TechnologiesHero() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-grid-pattern opacity-30 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.42) 0%, transparent 72%)' }}
      />

      {/* Floating shapes */}
      <div className="absolute top-16 right-24 w-16 h-16 border border-primary/30 rounded-2xl rotate-12 animate-float opacity-30 hidden lg:block" />
      <div
        className="absolute bottom-24 left-20 w-10 h-10 border border-secondary/30 rounded-full animate-float opacity-20 hidden lg:block"
        style={{ animationDelay: '2s' }}
      />

      <div className="container-custom relative z-10 text-center">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 mb-8" aria-label="Breadcrumb">
          <Link href="/homepage" className="font-body text-body-sm text-white/40 hover:text-white/70 transition-colors">
            Home
          </Link>
          <Icon name="ChevronRightIcon" size={12} className="text-white/30" />
          <span className="font-body text-body-sm text-white/70">Technologies</span>
        </nav>

        <h1
          className="font-heading font-900 text-white mb-6 leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          Modern Stack for
          {' '}
          <span
            style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Real-World Impact
          </span>
        </h1>

        <p className="font-body text-body-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          From cloud-native infrastructure to AI and frontend frameworks, we carefully select
          technologies that are stable today and relevant tomorrow.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#tech-stack"
            className="flex items-center gap-2 px-8 py-4 glass border border-white/20 text-white font-heading font-600 text-body-base rounded-2xl hover:bg-white/15 transition-all duration-300"
          >
            Explore Technology Stack
            <Icon name="ChevronDownIcon" size={18} />
          </a>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white font-heading font-700 text-body-base rounded-2xl shadow-blue-lg hover:scale-105 transition-all duration-300"
          >
            Discuss Your Project
            <Icon name="ArrowRightIcon" size={18} />
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute inset-x-0 bottom-0 h-2 bg-background/70 blur-sm" />
      </div>
    </section>
  );
}
