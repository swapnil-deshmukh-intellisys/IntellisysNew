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
    color: 'from-primary to-secondary',
    bg: 'bg-primary/10',
    iconColor: 'text-primary',
    tags: ['Web', 'Enterprise', 'API'],
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Migration, deployment, optimization, and infrastructure management.',
    icon: 'CloudIcon',
    color: 'from-secondary to-accent',
    bg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    tags: ['AWS', 'Azure', 'GCP'],
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    description: 'Android and iOS applications with robust backend integration.',
    icon: 'DevicePhoneMobileIcon',
    color: 'from-accent to-primary',
    bg: 'bg-accent/10',
    iconColor: 'text-accent',
    tags: ['Android', 'iOS', 'Cross-platform'],
  },
  {
    id: 'web-application-maintenance',
    title: 'Web Application Maintenance',
    description: 'Monitoring, optimization, bug fixing, and security updates.',
    icon: 'WrenchScrewdriverIcon',
    color: 'from-secondary to-accent',
    bg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    tags: ['Monitoring', 'Security', 'Support'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centered design focused on usability and accessibility.',
    icon: 'PaintBrushIcon',
    color: 'from-primary to-accent',
    bg: 'bg-accent/10',
    iconColor: 'text-accent',
    tags: ['Research', 'Prototype', 'Design System'],
  },
  {
    id: 'e-publishing-solutions',
    title: 'E-Publishing Solutions',
    description: 'Digital publishing platforms with CMS and distribution capabilities.',
    icon: 'BookOpenIcon',
    color: 'from-primary to-secondary',
    bg: 'bg-primary/10',
    iconColor: 'text-primary',
    tags: ['CMS', 'Distribution', 'Accessibility'],
  },
  {
    id: 'it-staffing',
    title: 'IT Staffing',
    description: 'Skilled IT professionals for short-term and long-term requirements.',
    icon: 'UserGroupIcon',
    color: 'from-secondary to-primary',
    bg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    tags: ['Contract', 'Dedicated', 'Rapid Onboarding'],
  },
  {
    id: 'it-consulting-and-sourcing',
    title: 'IT Consulting and Sourcing',
    description: 'Technology consulting and talent sourcing for digital teams.',
    icon: 'LightBulbIcon',
    color: 'from-accent to-secondary',
    bg: 'bg-accent/10',
    iconColor: 'text-accent',
    tags: ['Consulting', 'Sourcing', 'Scaling'],
  },
  {
    id: 'internship-programs',
    title: 'Internship Programs',
    description: 'Practical training for students and fresh graduates.',
    icon: 'AcademicCapIcon',
    color: 'from-secondary to-accent',
    bg: 'bg-accent/10',
    iconColor: 'text-accent',
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
    <section className="section-padding bg-background relative">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-heading font-800 text-3xl sm:text-4xl lg:text-display-md leading-tight text-foreground mb-3 sm:mb-4">
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
          <p className="font-body text-sm sm:text-body-lg text-foreground-secondary px-2 sm:px-0">
            <span className="sm:hidden">9 focused services for product, cloud, and talent growth.</span>
            <span className="hidden sm:inline">Our service portfolio includes 9 focused offerings for product, platform, cloud, and talent growth.</span>
          </p>
        </div>

        {/* Dark container holding service cards, similar to Technologies layout */}
        <div className="relative mt-4 sm:mt-6 lg:mt-8 rounded-3xl bg-background-dark overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.05),transparent_45%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_22%,transparent_78%,rgba(255,255,255,0.04))] pointer-events-none" />

          <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  ref={(el) => {
                    if (el) refs.current.set(service.id, el);
                  }}
                  className={`group relative border border-[#ff8a3d]/70 bg-[linear-gradient(155deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03)_42%,rgba(255,255,255,0.01))] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_18px_40px_rgba(0,0,0,0.45),0_0_22px_rgba(255,138,61,0.2)] transition-all duration-400 hover:-translate-y-1 hover:border-[#ffb074] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_24px_52px_rgba(0,0,0,0.6),0_0_30px_rgba(255,138,61,0.35)] p-6 [clip-path:polygon(0_0,58%_0,64%_8%,100%_8%,100%_100%,0_100%)] ${
                    visibleItems.has(service.id) ? 'animate-fade-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-50 bg-[linear-gradient(130deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.05)_34%,transparent_58%)]" />
                  <div className="pointer-events-none absolute inset-0 opacity-25 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.14),transparent_28%,transparent_78%,rgba(255,255,255,0.08))]" />
                  <div className="pointer-events-none absolute top-[8%] right-0 h-[1px] w-24 bg-[#ffb074]/90" />
                  <div className="pointer-events-none absolute bottom-0 left-0 h-[1px] w-20 bg-[#ff8a3d]/70" />

                  <div className={`relative z-10 w-12 h-12 ${service.bg} border border-sky-300/35 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_18px_rgba(56,189,248,0.3)]`}>
                    <Icon name={service.icon as any} size={22} className="text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                  </div>
                  <h3 className="relative z-10 font-heading font-700 text-xl sm:text-heading-xl text-white mb-2">{service.title}</h3>
                  <p className="relative z-10 font-body text-sm sm:text-body-sm text-white/70 mb-4 leading-relaxed">{service.description}</p>
                  <div className="relative z-10 flex flex-wrap gap-1.5 mb-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/15 rounded-lg font-mono text-xs sm:text-sm text-white/75"
                      >
                        {resolveBrandName(tag) ? <BrandIcon name={resolveBrandName(tag)!} size={16} /> : null}
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/services"
                    className="relative z-10 inline-flex items-center gap-1.5 text-primary-light font-heading font-700 text-body-sm uppercase tracking-wide hover:gap-2.5 transition-all duration-200"
                  >
                    Learn More <Icon name="ArrowRightIcon" size={12} />
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 sm:mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-primary text-white font-heading font-700 text-body-base rounded-2xl shadow-blue hover:shadow-blue-lg transition-all duration-300 hover:scale-105"
              >
                View All Services
                <Icon name="ArrowRightIcon" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
