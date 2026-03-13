import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const consultationPoints = [
  'Free 45-minute technical consultation',
  'Response within 24 hours',
  'Architecture and delivery guidance',
  'NDA available before discussion',
];

export default function ServicesCTA() {
  const engagementCards = [
    {
      icon: 'ClockIcon',
      title: 'Fast Response',
      description: 'Initial response, scheduling, and next-step alignment within 24 hours.',
      metric: '24h',
      metricLabel: 'response window',
    },
    {
      icon: 'CurrencyRupeeIcon',
      title: 'Zero-Cost Discovery',
      description: 'Consultation, scoping discussion, and delivery guidance without upfront cost.',
      metric: 'Rs 0',
      metricLabel: 'consultation fee',
    },
    {
      icon: 'UserGroupIcon',
      title: 'Dedicated Ownership',
      description: 'A technical lead and project contact stay aligned with your scope from the start.',
      metric: '1 team',
      metricLabel: 'aligned for delivery',
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'NDA-Ready',
      description: 'Sensitive product, platform, and business information can be discussed securely.',
      metric: 'Secure',
      metricLabel: 'discussion flow',
    },
  ];

  return (
    <section className="section-padding bg-[#FEFEFE] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      <div className="container-custom relative">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/92 p-6 shadow-[0_12px_26px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.85)] sm:p-8 lg:p-9">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
            <div className="absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />
            <div className="relative z-10 flex h-full flex-col">
              <p className="mb-3 font-mono text-caption uppercase tracking-[0.18em] text-primary">Free Technical Consultation</p>
              <h2 className="font-heading font-800 text-3xl leading-tight text-foreground sm:text-4xl lg:text-display-md mb-4 sm:mb-5">
                Let's Discuss Your
                <br />
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
              <p className="mb-6 max-w-2xl font-body text-sm leading-relaxed text-foreground-secondary sm:mb-7 sm:text-body-lg">
                Book a focused session with a senior engineer to clarify scope, architecture, timelines, and the
                most practical path to delivery. No sales pitch, just direct technical guidance.
              </p>

              <ul className="mb-7 grid gap-3 sm:mb-8 sm:grid-cols-2">
                {consultationPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Icon name="CheckIcon" size={14} className="text-primary" />
                    </div>
                    <span className="font-body text-sm text-foreground-secondary">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:[&>*]:flex-1">
                <Link
                  href="/contact"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-7 py-3.5 font-heading text-sm font-700 text-white shadow-blue transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-lg sm:px-8 sm:text-body-base"
                >
                  Book Free Consultation
                  <Icon name="ArrowRightIcon" size={18} />
                </Link>
                <a
                  href="tel:+919112817771"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/75 px-6 py-3.5 font-heading text-sm font-600 text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-white sm:px-7 sm:text-body-base"
                >
                  <Icon name="PhoneIcon" size={18} className="text-primary" />
                  +91 91128 17771
                </a>
              </div>

              <p className="mt-4 font-body text-sm text-foreground-muted">
                No obligation. NDA available before sharing product details.
              </p>
            </div>
          </div>

          <div className="h-full">
            <div className="grid h-full grid-cols-1 gap-5 sm:grid-cols-2">
              {engagementCards.map((card, index) => (
                <div
                  key={card.title}
                  className="group relative overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white/92 p-5 shadow-[0_12px_26px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.85)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
                  <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />

                  <div className="relative z-10 mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white transition-transform group-hover:scale-110">
                      <Icon name={card.icon as any} size={18} className="text-slate-700" />
                    </div>
                    <div className="min-w-0 text-right">
                      <p className="font-body text-body-sm leading-relaxed text-slate-700">{card.metric}</p>
                      <p className="mt-1 font-body text-caption text-slate-500">{card.metricLabel}</p>
                    </div>
                  </div>

                  <div className="relative z-10 lg:min-h-[5rem]">
                    <h3 className="mb-2 font-heading text-xl font-700 leading-tight text-foreground sm:text-heading-xl">
                      {card.title}
                    </h3>
                  </div>
                  <p className="relative z-10 mb-4 font-body text-body-sm leading-relaxed text-foreground-secondary lg:min-h-[4.5rem]">
                    {card.description}
                  </p>
                  <div className="relative z-10 inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="font-body text-body-sm leading-relaxed text-slate-700">Practical engagement support</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
