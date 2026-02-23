'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import BrandIcon, { resolveBrandName } from '@/components/ui/BrandIcon';

const services = [
  {
    id: 'custom-software-development',
    title: 'Custom Software Development',
    description: 'Scalable, secure, and high-performance web and enterprise applications.',
    icon: 'GlobeAltIcon',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    tags: ['Web', 'Enterprise', 'API'],
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Migration, deployment, optimization, and infrastructure management.',
    icon: 'CloudIcon',
    color: 'from-sky-500 to-teal-500',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    tags: ['AWS', 'Azure', 'GCP'],
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    description: 'Android and iOS applications with robust backend integration.',
    icon: 'DevicePhoneMobileIcon',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    tags: ['Android', 'iOS', 'Cross-platform'],
  },
  {
    id: 'web-application-maintenance',
    title: 'Web Application Maintenance',
    description: 'Monitoring, optimization, bug fixing, and security updates.',
    icon: 'WrenchScrewdriverIcon',
    color: 'from-emerald-500 to-green-500',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    tags: ['Monitoring', 'Security', 'Support'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centered design focused on usability and accessibility.',
    icon: 'PaintBrushIcon',
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    tags: ['Research', 'Prototype', 'Design System'],
  },
  {
    id: 'e-publishing-solutions',
    title: 'E-Publishing Solutions',
    description: 'Digital publishing platforms with CMS and distribution capabilities.',
    icon: 'BookOpenIcon',
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    tags: ['CMS', 'Distribution', 'Accessibility'],
  },
  {
    id: 'it-staffing',
    title: 'IT Staffing',
    description: 'Skilled IT professionals for short-term and long-term requirements.',
    icon: 'UserGroupIcon',
    color: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    tags: ['Contract', 'Dedicated', 'Rapid Onboarding'],
  },
  {
    id: 'it-consulting-and-sourcing',
    title: 'IT Consulting and Sourcing',
    description: 'Technology consulting and talent sourcing for digital teams.',
    icon: 'LightBulbIcon',
    color: 'from-indigo-500 to-sky-500',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    tags: ['Consulting', 'Sourcing', 'Scaling'],
  },
  {
    id: 'internship-programs',
    title: 'Internship Programs',
    description: 'Practical training for students and fresh graduates.',
    icon: 'AcademicCapIcon',
    color: 'from-teal-500 to-emerald-500',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    tags: ['Training', 'Mentorship', 'Industry Exposure'],
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
        <div className="text-center max-w-2xl mx-auto mb-16">
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
            Our service portfolio includes 9 focused offerings for product, platform, cloud, and talent growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              ref={(el) => {
                if (el) refs.current.set(service.id, el);
              }}
              className={`bg-background-card rounded-3xl border border-border shadow-md-card hover:shadow-lg-card transition-all duration-400 hover:-translate-y-1 group p-6 ${
                visibleItems.has(service.id) ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <div className={`w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={service.icon as any} size={22} className={service.iconColor} />
              </div>
              <h3 className="font-heading font-700 text-heading-xl text-foreground mb-2">{service.title}</h3>
              <p className="font-body text-body-sm text-foreground-secondary mb-4 leading-relaxed">{service.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-background-muted border border-border rounded-md font-mono text-caption text-foreground-secondary"
                  >
                    {resolveBrandName(tag) ? <BrandIcon name={resolveBrandName(tag)!} size={12} /> : null}
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
