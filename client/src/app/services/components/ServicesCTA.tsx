import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const consultationPoints = [
  'Detailed project scoping at no cost',
  'Technical architecture recommendations',
  'Realistic timeline and budget estimates',
  'Team structure suggestions',
];

export default function ServicesCTA() {
  return (
    <section className="section-padding bg-background-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full mb-6 shadow-sm-card">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-body text-caption text-foreground-secondary font-600 uppercase tracking-wider">
                Free Consultation Available
              </span>
            </div>
            <h2 className="font-heading font-800 text-display-md text-foreground mb-6">
              Let's Discuss Your{' '}
              <span
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Next Project
              </span>
            </h2>
            <p className="font-body text-body-lg text-foreground-secondary mb-8 leading-relaxed">
              Book a free 45-minute consultation with one of our senior engineers. 
              No sales pitch â€” just honest technical advice for your specific challenge.
            </p>
            <ul className="space-y-3 mb-10">
              {consultationPoints.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckIcon" size={12} className="text-primary" />
                  </div>
                  <span className="font-body text-body-base text-foreground-secondary">{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-primary text-white font-heading font-700 text-body-base rounded-2xl shadow-blue hover:shadow-blue-lg transition-all duration-300 hover:scale-105"
              >
                Book Free Consultation
                <Icon name="ArrowRightIcon" size={18} />
              </Link>
              <a
                href="tel:+919112817771"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-background-card border border-border text-foreground font-heading font-600 text-body-base rounded-2xl hover:border-primary/30 hover:shadow-md-card transition-all duration-300"
              >
                <Icon name="PhoneIcon" size={18} className="text-primary" />
                Call +91 91128 17771 / 84211 74213
              </a>
            </div>
          </div>

          {/* Right: Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: 'ClockIcon', title: '24-hour', subtitle: 'Proposal turnaround', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: 'CurrencyRupeeIcon', title: 'â‚¹0', subtitle: 'Consultation cost', color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { icon: 'UserGroupIcon', title: 'Dedicated', subtitle: 'Project manager', color: 'text-violet-500', bg: 'bg-violet-50' },
              { icon: 'ShieldCheckIcon', title: 'NDA', subtitle: 'Signed upfront', color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-background-card rounded-2xl border border-border p-6 shadow-md-card hover:shadow-lg-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon name={item.icon as any} size={20} className={item.color} />
                </div>
                <div className="font-heading font-800 text-display-sm text-foreground">{item.title}</div>
                <div className="font-body text-body-sm text-foreground-muted mt-1">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
