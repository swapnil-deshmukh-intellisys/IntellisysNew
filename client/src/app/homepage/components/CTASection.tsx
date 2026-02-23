import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CTASection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-custom">
        <div className="relative bg-gradient-hero rounded-4xl overflow-hidden px-8 py-20 text-center shadow-dark-xl border border-white/10">
          {/* Grid overlay */}
          <div className="absolute inset-0 hero-grid-pattern opacity-30 pointer-events-none" />
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-radial-blue opacity-50 pointer-events-none" />

          {/* Floating icons */}
          <div className="absolute top-10 left-16 opacity-10 animate-float hidden lg:block">
            <Icon name="CodeBracketIcon" size={64} className="text-primary-light" />
          </div>
          <div className="absolute bottom-10 right-16 opacity-10 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
            <Icon name="CpuChipIcon" size={56} className="text-secondary" />
          </div>
          <div className="absolute top-20 right-32 opacity-10 animate-float hidden xl:block" style={{ animationDelay: '1s' }}>
            <Icon name="CloudIcon" size={48} className="text-primary-light" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass border border-white/15 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-body text-caption text-white/70 uppercase tracking-wider">
                Free Consultation — No Commitment
              </span>
            </div>

            <h2 className="font-heading font-900 text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Ready to Build Something{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #60A5FA 0%, #38BDF8 50%, #34D399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Extraordinary?
              </span>
            </h2>

            <p className="font-body text-body-lg text-white/60 mb-12 leading-relaxed">
              Join 200+ companies that chose Intellisys IT Solutions as their technology partner. 
              Get a detailed project proposal within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/contact"
                className="group flex items-center gap-3 px-10 py-5 bg-white text-primary font-heading font-800 text-body-base rounded-2xl hover:bg-primary-50 transition-all duration-300 hover:scale-105 shadow-xl-card"
              >
                Get Free Consultation
                <Icon name="ArrowRightIcon" size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-3 px-10 py-5 glass border border-white/20 text-white font-heading font-600 text-body-base rounded-2xl hover:bg-white/15 transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {[
                { value: '200+', label: 'Projects Delivered' },
                { value: '4.9/5', label: 'Client Rating' },
                { value: '24hrs', label: 'Response Time' },
              ]?.map((item, i) => (
                <React.Fragment key={item?.label}>
                  {i > 0 && <div className="h-8 w-px bg-white/15 hidden sm:block" />}
                  <div className="text-center">
                    <div className="font-heading font-900 text-display-sm text-white">{item?.value}</div>
                    <div className="font-body text-caption text-white/40 uppercase tracking-wider">{item?.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}