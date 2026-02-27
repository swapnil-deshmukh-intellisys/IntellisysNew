import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ContactHero() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 hero-grid-pattern opacity-30 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.32) 0%, transparent 72%)' }}
      />

      {/* Floating shapes */}
      <div className="absolute top-24 left-16 w-12 h-12 border border-primary/30 rounded-xl rotate-12 animate-float opacity-20 hidden lg:block" />
      <div className="absolute bottom-16 right-24 w-8 h-8 border border-secondary/30 rounded-full animate-float opacity-20 hidden lg:block" style={{ animationDelay: '3s' }} />

      <div className="container-custom relative z-10 text-center">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 mb-8" aria-label="Breadcrumb">
          <Link href="/homepage" className="font-body text-body-sm text-white/40 hover:text-white/70 transition-colors">
            Home
          </Link>
          <Icon name="ChevronRightIcon" size={12} className="text-white/30" />
          <span className="font-body text-body-sm text-white/70">Contact</span>
        </nav>
        <h1
          className="font-heading font-900 text-white mb-6 leading-tight"
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

        <p className="font-body text-body-lg text-white/60 max-w-xl mx-auto leading-relaxed">
          Tell us about your project and we'll get back to you with a detailed proposal 
          and a free technical consultation.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute inset-x-0 bottom-0 h-2 bg-background/70 blur-sm" />
      </div>
    </section>
  );
}
