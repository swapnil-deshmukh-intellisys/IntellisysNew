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
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    step: '02',
    title: 'Architecture & Design',
    description:
      'Our architects design the technical blueprint while our UX team creates wireframes and prototypes. Every decision is documented and reviewed with you before a single line of code is written.',
    icon: 'PencilSquareIcon',
    duration: '1-2 weeks',
    output: 'Tech Spec + Figma Prototype',
    color: 'text-violet-500',
    bg: 'bg-violet-50',
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
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
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
    color: 'text-amber-500',
    bg: 'bg-amber-50',
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
    <section className="section-padding bg-background-muted relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16"><h2 className="font-heading font-800 text-display-md text-foreground mb-4">
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
          <div className="absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-violet-200 via-emerald-200 to-amber-200 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`relative bg-background-card rounded-3xl border ${step.border} p-7 shadow-md-card hover:shadow-lg-card transition-all duration-400 hover:-translate-y-1 ${
                  isVisible ? 'animate-fade-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                {/* Step Number Bubble */}
                <div className={`w-12 h-12 ${step.bg} border-2 ${step.border} rounded-2xl flex items-center justify-center mb-6 relative z-10 bg-white`}>
                  <span className={`font-heading font-900 text-heading-lg ${step.color}`}>{step.step}</span>
                </div>

                {/* Icon */}
                <div className={`w-10 h-10 ${step.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon name={step.icon as any} size={20} className={step.color} />
                </div>

                <h3 className="font-heading font-700 text-heading-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-body-sm text-foreground-secondary leading-relaxed mb-5">
                  {step.description}
                </p>

                {/* Meta */}
                <div className="space-y-2 pt-4 border-t border-border">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
