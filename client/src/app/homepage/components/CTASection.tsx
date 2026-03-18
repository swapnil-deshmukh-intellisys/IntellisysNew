import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CTASection() {
  return (
    <section className="section-padding bg-[#FEFEFE] relative overflow-hidden">
      <div className="container-custom">
        <div className="relative overflow-hidden px-6 py-7 sm:px-8 sm:py-8 text-center">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-heading font-900 text-foreground mb-4 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Ready to Build Something{' '}
              <span
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Extraordinary?
              </span>
            </h2>

            <p className="font-body text-body-lg text-foreground-secondary mb-5 sm:mb-6 leading-relaxed">
              Share your goals, architecture, and delivery constraints. We will respond with a practical next step and a clear proposal scope.
            </p>

            <div className="flex items-center justify-center">
              <Link
                href="/contact#contact-form"
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-heading font-800 text-body-sm rounded-2xl transition-all duration-300 hover:scale-[1.03] shadow-xl-card"
              >
                Get Free Consultation
                <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
