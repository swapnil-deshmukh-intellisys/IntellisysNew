import React from 'react';
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
  return (
    <section className="section-padding bg-[#FEFEFE] relative">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-9 sm:mb-10">
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
            <span className="sm:hidden">Focused services for product, cloud, and talent growth.</span>
            <span className="hidden sm:inline">Our service portfolio includes all offerings for product, platform, cloud, and talent growth.</span>
          </p>
        </div>

        <div className="mt-1 sm:mt-2 lg:mt-3">
          <div className="px-4 sm:px-6 lg:px-0 py-0 sm:py-1 lg:py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, index) => (
                  <div
                    key={service.id}
                    id={service.id}
                    className="group relative h-full animate-fade-up"
                    style={{ animationDelay: `${index * 0.07}s`, animationFillMode: 'both' }}
                  >
                    <div className="relative h-full translate-x-0 translate-y-0 transition-transform duration-400 group-hover:-translate-y-1">
                      <div className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-2xl bg-[linear-gradient(145deg,rgba(186,194,205,0.96)_0%,rgba(205,213,223,0.94)_45%,rgba(221,227,235,0.92)_100%)] border border-slate-300/70" />

                      <div className="relative z-10 flex flex-col h-full overflow-hidden p-6 border border-white/85 rounded-2xl bg-[linear-gradient(145deg,rgba(255,255,255,0.82)_0%,rgba(244,247,251,0.74)_45%,rgba(232,238,246,0.78)_100%)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(255,255,255,0.22)]">
                        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/45" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),transparent)]" />
                        <div className="pointer-events-none absolute -left-5 top-[-10%] h-[145%] w-20 rotate-[28deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.02)_100%)] opacity-80" />
                        <div className="pointer-events-none absolute right-7 top-[-20%] h-[138%] w-px rotate-[28deg] bg-white/85 opacity-85 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                        <div className="pointer-events-none absolute left-10 top-[8%] h-px w-[78%] rotate-[28deg] bg-white/70 opacity-75 shadow-[0_0_8px_rgba(255,255,255,0.45)]" />

                        <div className="relative z-10 mb-4 flex items-start justify-between gap-4">
                          <h3 className="font-heading font-700 text-xl sm:text-heading-xl text-slate-900">
                            {service.title}
                          </h3>
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-[#FEFEFE] shadow-[0_8px_18px_rgba(148,163,184,0.12)]">
                            <Icon name={service.icon as any} size={22} className="text-slate-700" />
                          </div>
                        </div>

                        <div className="relative z-10">
                          <p className="font-body text-sm sm:text-body-sm mb-2.5 leading-relaxed lg:min-h-[4.25rem] text-slate-700">
                            {service.description}
                          </p>
                        </div>

                        <div className="relative z-10 flex flex-wrap gap-1.5 mb-4 mt-auto">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 lg:px-2.5 lg:py-1.5 rounded-lg font-mono text-xs lg:text-xs bg-[#FEFEFE] border border-slate-300 text-slate-700 whitespace-nowrap"
                            >
                              {resolveBrandName(tag) ? <BrandIcon name={resolveBrandName(tag)!} size={15} /> : null}
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href="/services"
                          className="relative z-10 inline-flex items-center gap-1.5 font-heading font-700 text-body-sm uppercase tracking-wide text-slate-500 hover:text-slate-700 hover:gap-2.5 transition-all duration-200"
                          aria-label={`Learn more about ${service.title}`}
                        >
                          {`Explore ${service.title}`} <Icon name="ArrowRightIcon" size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            <div className="text-center mt-7 sm:mt-8">
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
