'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    step: '01',
    title: 'Discovery & Scoping',
    description:
      'We begin with a deep-dive workshop to understand your business goals, technical requirements, and success metrics. You receive a detailed project brief and effort estimate within 48 hours.',
    icon: 'MagnifyingGlassIcon',
    duration: '1-3 days',
    output: 'Project Brief + Estimate',
    color: 'text-primary',
    badgeColor: 'bg-sky-600',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
  {
    step: '02',
    title: 'Architecture & Design',
    description:
      'Our architects design the technical blueprint while our UX team creates wireframes and prototypes. Every decision is documented and reviewed with you before a single line of code is written.',
    icon: 'PencilSquareIcon',
    duration: '1-2 weeks',
    output: 'Tech Spec + Figma Prototype',
    color: 'text-accent',
    badgeColor: 'bg-violet-600',
    bg: 'bg-accent/10',
    border: 'border-violet-100',
  },
  {
    step: '03',
    title: 'Agile Development',
    description:
      'Two-week sprints with daily standups, weekly demos, and complete transparency. You have access to a live staging environment at all times and can provide feedback in real-time.',
    icon: 'CodeBracketSquareIcon',
    duration: '4-16 weeks',
    output: 'Working Software + Sprint Reports',
    color: 'text-secondary',
    badgeColor: 'bg-emerald-600',
    bg: 'bg-secondary/10',
    border: 'border-emerald-100',
  },
  {
    step: '04',
    title: 'Testing & Launch',
    description:
      'Comprehensive QA testing, security audits, performance benchmarking, and a staged rollout to production. We stay on-call for 30 days post-launch to ensure everything runs smoothly.',
    icon: 'RocketLaunchIcon',
    duration: '1-2 weeks',
    output: 'Production Deployment + 30-day Support',
    color: 'text-accent',
    badgeColor: 'bg-amber-500',
    bg: 'bg-accent/10',
    border: 'border-amber-100',
  },
];

export default function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-10 sm:py-12 bg-[#FEFEFE] relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"><h2 className="font-heading font-800 text-display-md text-foreground mb-4">
            Our{' '}
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Delivery Process
            </span>
          </h2>
          <p className="font-body text-body-lg text-foreground-secondary">
            A proven 4-step framework that delivers quality software on time, every time.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`group relative h-full ${
                  isVisible ? 'animate-fade-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <div className="relative h-full translate-x-0 translate-y-0 transition-transform duration-400 group-hover:-translate-y-1">
                  <div className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-3xl bg-[linear-gradient(145deg,rgba(186,194,205,0.96)_0%,rgba(205,213,223,0.94)_45%,rgba(221,227,235,0.92)_100%)] border border-slate-300/70" />

                  <div className="relative h-full flex flex-col overflow-hidden rounded-3xl border border-white/85 p-7 bg-[linear-gradient(145deg,rgba(255,255,255,0.82)_0%,rgba(244,247,251,0.74)_45%,rgba(232,238,246,0.78)_100%)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(255,255,255,0.22)]">
                    <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/45" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),transparent)]" />
                    <div className="pointer-events-none absolute -left-5 top-[-10%] h-[145%] w-20 rotate-[28deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.02)_100%)] opacity-80" />
                    <div className="pointer-events-none absolute right-7 top-[-20%] h-[138%] w-px rotate-[28deg] bg-white/85 opacity-85 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                    <div className="pointer-events-none absolute left-10 top-[8%] h-px w-[78%] rotate-[28deg] bg-white/70 opacity-75 shadow-[0_0_8px_rgba(255,255,255,0.45)]" />

                    {/* Step Number */}
                    <div className="relative z-10 mb-5">
                      <div className={`w-12 h-12 ${step.badgeColor} rounded-2xl flex items-center justify-center shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)]`}>
                        <span className="font-heading font-900 text-heading-lg text-white">{step.step}</span>
                      </div>
                    </div>

                    <h3 className="relative z-10 font-heading font-700 text-heading-xl text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="relative z-10 font-body text-body-sm text-foreground-secondary leading-relaxed mb-5">
                      {step.description}
                    </p>

                    {/* Meta */}
                    <div className="relative z-10 space-y-2 pt-4 border-t border-border mt-auto">
                      <div className="flex items-center gap-2">
                        <Icon name="ClockIcon" size={12} className="text-foreground-muted" />
                        <span className="font-body text-caption text-foreground-muted">Duration: {step.duration}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="DocumentCheckIcon" size={12} className="text-foreground-muted mt-0.5 flex-shrink-0" />
                        <span className="font-body text-caption text-foreground-muted">{step.output}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

