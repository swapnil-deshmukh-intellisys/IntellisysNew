'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const allServices = [
  {
    id: 'custom-software-development',
    title: 'Custom Software Development',
    shortDesc: 'Scalable, secure, and high-performance web and enterprise applications.',
    longDesc:
      'Design and development of scalable, secure, and high-performance web and enterprise applications tailored to your business needs.',
    icon: 'GlobeAltIcon',
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderHover: 'hover:border-blue-200',
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
    gradient: 'from-sky-500 to-blue-500',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    borderHover: 'hover:border-sky-200',
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
    gradient: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    borderHover: 'hover:border-purple-200',
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
    gradient: 'from-emerald-500 to-green-500',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
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
    gradient: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    borderHover: 'hover:border-violet-200',
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
    gradient: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
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
    gradient: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    borderHover: 'hover:border-cyan-200',
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
    gradient: 'from-indigo-500 to-sky-500',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    borderHover: 'hover:border-indigo-200',
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
    gradient: 'from-teal-500 to-emerald-500',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    borderHover: 'hover:border-teal-200',
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

  return (
    <section id="services-grid" className="section-padding bg-background relative">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-800 text-display-md text-foreground mb-4">
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
            Explore all 9 services to see capabilities, deliverables, and timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allServices.map((service, index) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                id={service.id}
                ref={(el) => {
                  if (el) refs.current.set(service.id, el);
                }}
                className={`bg-background-card rounded-3xl border transition-all duration-400 overflow-hidden ${
                  isExpanded ? 'border-primary/30 shadow-blue' : `border-border shadow-md-card ${service.borderHover}`
                } ${visibleItems.has(service.id) ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${(index % 2) * 0.1}s` }}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : service.id)}
                  className="w-full text-left p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <Icon name={service.icon as any} size={26} className={service.iconColor} />
                      </div>
                      <div>
                        <h3 className="font-heading font-700 text-display-sm text-foreground mb-2">{service.title}</h3>
                        <p className="font-body text-body-sm text-foreground-secondary">{service.shortDesc}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1.5">
                            <Icon name="ClockIcon" size={12} className="text-foreground-muted" />
                            <span className="font-body text-caption text-foreground-muted">{service.timeline}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Icon name="UsersIcon" size={12} className="text-foreground-muted" />
                            <span className="font-body text-caption text-foreground-muted">{service.teamSize}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isExpanded ? 'bg-primary text-white rotate-180' : 'bg-background-muted text-foreground-muted'
                      }`}
                    >
                      <Icon name="ChevronDownIcon" size={16} />
                    </div>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-7 pb-7 border-t border-border pt-6">
                    <p className="font-body text-body-base text-foreground-secondary leading-relaxed mb-6">{service.longDesc}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-heading font-700 text-heading-lg text-foreground mb-3 flex items-center gap-2">
                          <Icon name="ListBulletIcon" size={16} className="text-primary" />
                          Capabilities
                        </h4>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <Icon name="CheckCircleIcon" size={14} className="text-success mt-0.5 flex-shrink-0" />
                              <span className="font-body text-body-sm text-foreground-secondary">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-heading font-700 text-heading-lg text-foreground mb-3 flex items-center gap-2">
                          <Icon name="DocumentCheckIcon" size={16} className="text-primary" />
                          Deliverables
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((d) => (
                            <span key={d} className={`px-3 py-1.5 bg-gradient-to-r ${service.gradient} text-white font-body text-caption rounded-xl`}>
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
          })}
        </div>
      </div>
    </section>
  );
}
