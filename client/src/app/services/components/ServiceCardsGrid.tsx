'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const allServices = [
  {
    id: 'custom-software-development',
    title: 'Custom Software Development',
    shortDesc: 'Scalable, secure, and high-performance web and enterprise applications.',
    longDesc:
      'Design and development of scalable, secure, and high-performance web and enterprise applications tailored to your business needs.',
    icon: 'GlobeAltIcon',
    gradient: 'from-primary to-secondary',
    bg: 'bg-primary/10',
    iconColor: 'text-primary',
    borderHover: 'hover:border-primary/30',
    features: [
      'Custom Web Application Development',
      'Enterprise Software Solutions',
      'Secure Architecture and Development',
      'API Development and Integration',
      'Performance Optimization',
      'Scalable Deployment Design',
    ],
    deliverables: ['Solution Architecture', 'Production Code', 'Technical Documentation', 'Deployment Plan'],
    timeline: '4-12 weeks',
    teamSize: '3-8 engineers',
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    shortDesc: 'Cloud migration, deployment, optimization, and infrastructure management.',
    longDesc:
      'Cloud migration, deployment, optimization, and infrastructure management for enhanced scalability and performance.',
    icon: 'CloudIcon',
    gradient: 'from-secondary to-primary',
    bg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    borderHover: 'hover:border-secondary/30',
    features: [
      'Cloud Readiness Assessment',
      'Cloud Migration and Deployment',
      'Infrastructure Optimization',
      'Cost Optimization',
      'Monitoring and Alerting',
      'Managed Infrastructure Support',
    ],
    deliverables: ['Cloud Architecture', 'Migration Plan', 'Optimized Infrastructure', 'Runbook'],
    timeline: '3-10 weeks',
    teamSize: '2-5 engineers',
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    shortDesc: 'Android and iOS apps with intuitive UX and robust backend integration.',
    longDesc:
      'Development of Android and iOS applications with intuitive user experiences and robust backend integration.',
    icon: 'DevicePhoneMobileIcon',
    gradient: 'from-accent to-primary',
    bg: 'bg-accent/10',
    iconColor: 'text-accent',
    borderHover: 'hover:border-accent/30',
    features: [
      'Android App Development',
      'iOS App Development',
      'Cross-platform Apps',
      'Backend API Integration',
      'Push Notifications and Analytics',
      'Store Release Support',
    ],
    deliverables: ['iOS and Android Builds', 'Backend Integration', 'App Assets', 'Release Checklist'],
    timeline: '6-14 weeks',
    teamSize: '4-8 engineers',
  },
  {
    id: 'web-application-maintenance',
    title: 'Web Application Maintenance',
    shortDesc: 'Monitoring, optimization, bug fixing, and security updates.',
    longDesc:
      'Continuous monitoring, performance optimization, bug fixing, and security updates for existing web applications.',
    icon: 'WrenchScrewdriverIcon',
    gradient: 'from-secondary to-accent',
    bg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    borderHover: 'hover:border-emerald-200',
    features: [
      'Continuous Monitoring',
      'Performance Optimization',
      'Bug Fixing',
      'Security Updates',
      'Dependency Upgrades',
      'Stability Improvements',
    ],
    deliverables: ['Maintenance Reports', 'Patch Logs', 'Uptime Improvements', 'Security Update Summary'],
    timeline: 'Ongoing',
    teamSize: '2-4 engineers',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    shortDesc: 'User-centered interface design for seamless digital experiences.',
    longDesc:
      'User-centered interface design focused on usability, accessibility, and seamless digital experiences.',
    icon: 'PaintBrushIcon',
    gradient: 'from-primary to-accent',
    bg: 'bg-accent/10',
    iconColor: 'text-accent',
    borderHover: 'hover:border-accent/30',
    features: [
      'User Research',
      'Information Architecture',
      'Wireframes and Prototypes',
      'Accessibility-first Design',
      'Design System Setup',
      'Developer Handoff',
    ],
    deliverables: ['UI Kit', 'Interactive Prototype', 'Design System', 'UX Recommendations'],
    timeline: '2-8 weeks',
    teamSize: '2-4 designers',
  },
  {
    id: 'e-publishing-solutions',
    title: 'E-Publishing Solutions',
    shortDesc: 'Digital publishing platforms and content management capabilities.',
    longDesc:
      'Digital publishing platforms and content management systems with accessibility and distribution capabilities.',
    icon: 'BookOpenIcon',
    gradient: 'from-primary to-secondary',
    bg: 'bg-primary/10',
    iconColor: 'text-primary',
    borderHover: 'hover:border-orange-200',
    features: [
      'Publishing Platform Development',
      'CMS Workflows',
      'Accessibility Compliance',
      'Multi-format Distribution',
      'Editorial Dashboard',
      'Role-based Access',
    ],
    deliverables: ['Publishing Portal', 'CMS Configuration', 'Distribution Tools', 'Editorial Controls'],
    timeline: '4-10 weeks',
    teamSize: '3-6 engineers',
  },
  {
    id: 'it-staffing',
    title: 'IT Staffing',
    shortDesc: 'Skilled IT professionals for short-term and long-term requirements.',
    longDesc:
      'Providing skilled IT professionals for short-term and long-term project requirements.',
    icon: 'UserGroupIcon',
    gradient: 'from-secondary to-primary',
    bg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    borderHover: 'hover:border-secondary/30',
    features: [
      'Contract Staffing',
      'Dedicated Resource Allocation',
      'Rapid Candidate Onboarding',
      'Project-based Hiring Support',
      'Technical Screening',
      'Role-specific Talent Matching',
    ],
    deliverables: ['Qualified Profiles', 'Staffing Plan', 'Onboarding Support', 'Performance Tracking'],
    timeline: '1-4 weeks',
    teamSize: 'As required',
  },
  {
    id: 'it-consulting-and-sourcing',
    title: 'IT Consulting and Sourcing',
    shortDesc: 'Technology consulting and talent sourcing for digital teams.',
    longDesc:
      'Technology consulting and talent sourcing to help organizations build strong digital teams.',
    icon: 'LightBulbIcon',
    gradient: 'from-accent to-secondary',
    bg: 'bg-accent/10',
    iconColor: 'text-accent',
    borderHover: 'hover:border-accent/30',
    features: [
      'Technology Strategy Consulting',
      'Architecture Advisory',
      'Delivery Process Consulting',
      'Talent Sourcing',
      'Team Scaling Support',
      'Vendor Evaluation',
    ],
    deliverables: ['Consulting Roadmap', 'Technology Recommendations', 'Talent Pipeline', 'Execution Plan'],
    timeline: '2-6 weeks',
    teamSize: '2-5 consultants',
  },
  {
    id: 'internship-programs',
    title: 'Internship Programs',
    shortDesc: 'Practical training for students and fresh graduates.',
    longDesc:
      'Practical training programs for students and fresh graduates to gain industry exposure and technical expertise.',
    icon: 'AcademicCapIcon',
    gradient: 'from-secondary to-accent',
    bg: 'bg-accent/10',
    iconColor: 'text-accent',
    borderHover: 'hover:border-accent/30',
    features: [
      'Hands-on Project Training',
      'Mentor-led Learning',
      'Industry Best Practices',
      'Code Reviews and Feedback',
      'Career Guidance',
      'Portfolio Development',
    ],
    deliverables: ['Training Curriculum', 'Project Experience', 'Mentor Feedback', 'Completion Certificate'],
    timeline: '4-12 weeks',
    teamSize: 'Mentor-led cohorts',
  },
];

const serviceCutoutImages: Record<string, string> = {
  'custom-software-development':
    'https://www.flexsin.com/blog/wp-content/uploads/2019/12/Custom-Software-Development.jpg',
  'cloud-solutions':
    'https://media.licdn.com/dms/image/v2/C4E12AQGkqpmFu5vN9g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1630381366351?e=2147483647&v=beta&t=mXPCq_FD-1qIVDzJIN5TIyE7BieZeu6KCPf1Hu6dO6U',
  'mobile-app-development':
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80',
  'web-application-maintenance':
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  'ui-ux-design':
    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
  'e-publishing-solutions':
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80',
  'it-staffing':
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
  'it-consulting-and-sourcing':
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
  'internship-programs':
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
};

const serviceOverlayTints: Record<string, string> = {
  'custom-software-development': 'rgba(37, 99, 235, 0.65)',
  'cloud-solutions': 'rgba(20, 184, 166, 0.65)',
  'mobile-app-development': 'rgba(79, 70, 229, 0.65)',
  'web-application-maintenance': 'rgba(71, 85, 105, 0.65)',
  'ui-ux-design': 'rgba(139, 92, 246, 0.65)',
  'e-publishing-solutions': 'rgba(59, 130, 246, 0.65)',
  'it-staffing': 'rgba(51, 65, 85, 0.65)',
  'it-consulting-and-sourcing': 'rgba(16, 185, 129, 0.65)',
  'internship-programs': 'rgba(79, 70, 229, 0.65)',
};

export default function ServiceCardsGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
      { threshold: 0.1 }
    );
    refs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const renderServiceCard = (service: (typeof allServices)[number], index: number) => {
    const isExpanded = expandedId === service.id;
    const tint = serviceOverlayTints[service.id] ?? 'rgba(37, 99, 235, 0.65)';

    return (
      <div
        key={service.id}
        id={service.id}
        ref={(el) => {
          if (el) refs.current.set(service.id, el);
        }}
        className={`group relative rounded-3xl border transition-all duration-400 overflow-hidden ${
          isExpanded
            ? 'border-white/45 shadow-[0_26px_50px_rgba(2,6,23,0.45)] -translate-y-1'
            : 'border-white/25 shadow-[0_14px_30px_rgba(2,6,23,0.33)] hover:-translate-y-1.5 hover:border-white/40 hover:shadow-[0_24px_44px_rgba(2,6,23,0.42)]'
        } ${visibleItems.has(service.id) ? 'animate-fade-up' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 0.08}s` }}
      >
        <div className="absolute inset-0">
          <AppImage
            src={serviceCutoutImages[service.id]}
            alt={`${service.title} background`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0" style={{ backgroundColor: tint }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.75)_100%)]" />
        </div>

        <button
          onClick={() => setExpandedId(isExpanded ? null : service.id)}
          className="relative z-10 w-full text-left p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-expanded={isExpanded}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl border border-white/45 bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                  <Icon name={service.icon as any} size={26} className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/25 bg-white/10 flex-shrink-0">
                  <Icon name="SparklesIcon" size={12} className="text-white/80" />
                  <span className="font-mono text-caption text-white/80 uppercase tracking-wider">Service</span>
                </div>
              </div>
              <h3 className="font-heading font-800 text-display-sm text-white mb-2 leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">
                {service.title}
              </h3>
              <p className="font-body text-body-sm text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">{service.shortDesc}</p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Icon name="ClockIcon" size={12} className="text-white/75" />
                  <span className="font-body text-caption text-white/75">{service.timeline}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="UsersIcon" size={12} className="text-white/75" />
                  <span className="font-body text-caption text-white/75">{service.teamSize}</span>
                </div>
              </div>
            </div>
            <div
              className={`w-8 h-8 rounded-xl border border-white/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isExpanded ? 'bg-white/20 text-white rotate-180' : 'bg-white/10 text-white/80'
              }`}
            >
              <Icon name="ChevronDownIcon" size={16} />
            </div>
          </div>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="relative z-10 px-7 pb-7 border-t border-white/25 pt-6 bg-black/15 backdrop-blur-[1px]">
            <p className="font-body text-body-base text-white/90 leading-relaxed mb-6 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
              {service.longDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-heading font-700 text-heading-lg text-white mb-3 flex items-center gap-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                  <Icon name="ListBulletIcon" size={16} className="text-white/85" />
                  Capabilities
                </h4>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Icon name="CheckCircleIcon" size={14} className="text-green-300 mt-0.5 flex-shrink-0" />
                      <span className="font-body text-body-sm text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-heading font-700 text-heading-lg text-white mb-3 flex items-center gap-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                  <Icon name="DocumentCheckIcon" size={16} className="text-white/85" />
                  Deliverables
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <span
                      key={d}
                      className="px-3 py-1.5 bg-white/18 border border-white/30 backdrop-blur-sm text-white font-body text-caption rounded-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-heading font-600 text-body-sm rounded-xl shadow-blue-sm hover:shadow-blue transition-all duration-300 hover:scale-105"
            >
              Get a Quote for {service.title}
              <Icon name="ArrowRightIcon" size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="services-grid" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="container-custom relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-caption text-primary uppercase tracking-[0.18em] mb-2">Explore Expertise</p>
          <h2 className="font-heading font-900 text-display-md text-foreground mb-4 leading-tight">
            Our{' '}
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Service Portfolio
            </span>
          </h2>
          <p className="font-body text-body-lg text-foreground-secondary">
            Explore all 9 services with clear scope, capabilities, deliverables, and execution timelines.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative w-16 h-52">
              <div className="absolute inset-0 rounded-[46%_54%_63%_37%/37%_43%_57%_63%] border border-primary/25 bg-gradient-to-b from-primary/10 to-secondary/10 shadow-[0_10px_30px_rgba(0,0,0,0.12)]" />
              <div className="absolute inset-0 scale-x-[-1] translate-x-8 rounded-[46%_54%_63%_37%/37%_43%_57%_63%] border border-secondary/25 bg-gradient-to-b from-secondary/10 to-primary/10" />
            </div>
          </div>

          {allServices.map((service, index) => renderServiceCard(service, index))}
        </div>
      </div>
    </section>
  );
}
