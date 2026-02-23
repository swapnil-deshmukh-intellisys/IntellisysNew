'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const services = [
  {
    id: 'web-dev',
    title: 'Website Development',
    description: 'High-performance, SEO-optimized websites and web applications built with modern frameworks.',
    icon: 'GlobeAltIcon',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    tags: ['React', 'Next.js', 'Node.js'],
    size: 'lg', // large bento card
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Native and cross-platform iOS & Android apps that users love.',
    icon: 'DevicePhoneMobileIcon',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    tags: ['Flutter', 'React Native'],
    size: 'sm',
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    description: 'Scalable cloud architecture on AWS, GCP, and Azure.',
    icon: 'CloudIcon',
    color: 'from-sky-500 to-teal-500',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    tags: ['AWS', 'GCP', 'Azure'],
    size: 'sm',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'End-to-end product development — from database architecture to polished frontend.',
    icon: 'CodeBracketIcon',
    color: 'from-emerald-500 to-green-500',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    tags: ['MERN', 'PostgreSQL', 'GraphQL'],
    size: 'md',
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    description: 'Protect your digital assets with enterprise-grade security solutions.',
    icon: 'ShieldCheckIcon',
    color: 'from-red-500 to-rose-500',
    bg: 'bg-red-50',
    iconColor: 'text-red-600',
    tags: ['VAPT', 'SOC 2', 'ISO 27001'],
    size: 'md',
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'User-centered design systems that convert visitors into customers.',
    icon: 'PaintBrushIcon',
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    tags: ['Figma', 'Design Systems'],
    size: 'sm',
  },
  {
    id: 'testing',
    title: 'Software Testing',
    description: 'Comprehensive QA and automation testing for bulletproof software.',
    icon: 'BeakerIcon',
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    tags: ['Selenium', 'Jest', 'Cypress'],
    size: 'sm',
  },
];

export default function ServicesOverview() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const refs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );
    refs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-background-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full mb-4 shadow-sm-card">
            <Icon name="CpuChipIcon" size={14} className="text-primary" />
            <span className="font-body text-caption text-primary font-600 uppercase tracking-wider">
              Our Services
            </span>
          </div>
          <h2 className="font-heading font-800 text-display-md text-foreground mb-4">
            Full-Spectrum{' '}
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              IT Solutions
            </span>
          </h2>
          <p className="font-body text-body-lg text-foreground-secondary">
            From concept to deployment, we cover every layer of your technology stack.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Large card — spans 2 columns */}
          <div
            id={services[0].id}
            ref={(el) => { if (el) refs.current.set(services[0].id, el); }}
            className={`lg:col-span-2 bg-background-card rounded-3xl border border-border shadow-md-card hover:shadow-lg-card transition-all duration-400 hover:-translate-y-1 group overflow-hidden ${
              visibleItems.has(services[0].id) ? 'animate-slide-in-left' : 'opacity-0'
            }`}
          >
            <div className="p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className={`w-14 h-14 ${services[0].bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={services[0].icon as any} size={26} className={services[0].iconColor} />
                </div>
                <h3 className="font-heading font-700 text-display-sm text-foreground mb-3">
                  {services[0].title}
                </h3>
                <p className="font-body text-body-base text-foreground-secondary mb-6 leading-relaxed">
                  {services[0].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {services[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-50 border border-primary-100 rounded-full font-mono text-caption text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-primary font-heading font-600 text-body-sm hover:gap-3 transition-all duration-200"
                >
                  Learn More <Icon name="ArrowRightIcon" size={14} />
                </Link>
              </div>
              {/* Visual accent */}
              <div className="flex-shrink-0 w-full md:w-48 h-48 md:h-auto">
                <div className={`h-full min-h-[160px] rounded-2xl bg-gradient-to-br ${services[0].color} opacity-10 group-hover:opacity-20 transition-opacity duration-300 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name={services[0].icon as any} size={64} className="text-white opacity-30" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small cards */}
          {services.slice(1).map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              ref={(el) => { if (el) refs.current.set(service.id, el); }}
              className={`bg-background-card rounded-3xl border border-border shadow-md-card hover:shadow-lg-card transition-all duration-400 hover:-translate-y-1 group p-6 ${
                visibleItems.has(service.id) ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className={`w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={service.icon as any} size={22} className={service.iconColor} />
              </div>
              <h3 className="font-heading font-700 text-heading-xl text-foreground mb-2">
                {service.title}
              </h3>
              <p className="font-body text-body-sm text-foreground-secondary mb-4 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-background-muted border border-border rounded-md font-mono text-caption text-foreground-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-primary font-heading font-600 text-body-sm hover:gap-2.5 transition-all duration-200"
              >
                Learn More <Icon name="ArrowRightIcon" size={12} />
              </Link>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-primary text-white font-heading font-700 text-body-base rounded-2xl shadow-blue hover:shadow-blue-lg transition-all duration-300 hover:scale-105"
          >
            View All Services
            <Icon name="ArrowRightIcon" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}