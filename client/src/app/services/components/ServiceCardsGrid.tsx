'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const allServices = [
  {
    id: 'web-dev',
    title: 'Website Development',
    shortDesc: 'Custom, high-performance websites and web applications.',
    longDesc:
      'We build everything from marketing sites to complex SaaS platforms. Our web development team specializes in React, Next.js, and modern JAMstack architectures that load fast, rank well on Google, and scale to millions of users.',
    icon: 'GlobeAltIcon',
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderHover: 'hover:border-blue-200',
    features: [
      'React & Next.js Development',
      'Progressive Web Apps (PWA)',
      'E-commerce Platforms',
      'CMS Integration (Headless)',
      'API Development & Integration',
      'Performance Optimization',
    ],
    deliverables: ['Responsive Design', 'SEO Optimized', 'Core Web Vitals A+', 'Security Hardened'],
    timeline: '4–10 weeks',
    teamSize: '3–6 engineers',
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    shortDesc: 'Native and cross-platform iOS & Android applications.',
    longDesc:
      'Our mobile team delivers beautiful, performant apps using Flutter and React Native. From consumer apps to enterprise mobility solutions, we\'ve shipped 60+ apps with an average App Store rating of 4.7 stars.',
    icon: 'DevicePhoneMobileIcon',
    gradient: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    borderHover: 'hover:border-purple-200',
    features: [
      'Flutter Cross-Platform Apps',
      'React Native Development',
      'Native iOS (Swift)',
      'Native Android (Kotlin)',
      'Push Notifications & Analytics',
      'App Store Optimization',
    ],
    deliverables: ['iOS & Android', 'Offline Support', 'Biometric Auth', 'CI/CD Pipeline'],
    timeline: '6–14 weeks',
    teamSize: '4–8 engineers',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    shortDesc: 'End-to-end product development from database to UI.',
    longDesc:
      'We take your idea from a blank canvas to a production-ready product. Our full-stack teams handle everything — architecture, database design, backend APIs, frontend interfaces, and DevOps pipelines.',
    icon: 'CodeBracketIcon',
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    borderHover: 'hover:border-emerald-200',
    features: [
      'MERN / MEAN Stack',
      'Microservices Architecture',
      'REST & GraphQL APIs',
      'Database Design (SQL/NoSQL)',
      'Authentication & Authorization',
      'Real-time Features (WebSockets)',
    ],
    deliverables: ['Full Source Code', 'API Documentation', 'Admin Dashboard', 'Monitoring Setup'],
    timeline: '8–20 weeks',
    teamSize: '5–10 engineers',
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    shortDesc: 'Scalable cloud infrastructure on AWS, GCP & Azure.',
    longDesc:
      'We design, migrate, and optimize cloud infrastructure for performance and cost. Our certified cloud architects have executed 80+ zero-downtime migrations and consistently deliver 30–50% infrastructure cost reductions.',
    icon: 'CloudIcon',
    gradient: 'from-sky-500 to-blue-500',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    borderHover: 'hover:border-sky-200',
    features: [
      'Cloud Migration (Lift & Shift)',
      'Kubernetes & Docker Orchestration',
      'Infrastructure as Code (Terraform)',
      'CI/CD Pipeline Setup',
      'Cost Optimization Audits',
      'Multi-cloud Strategy',
    ],
    deliverables: ['Architecture Diagram', 'IaC Templates', 'Runbooks', '99.99% SLA'],
    timeline: '3–12 weeks',
    teamSize: '2–5 architects',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    shortDesc: 'Enterprise-grade security for your digital assets.',
    longDesc:
      'Our security team conducts thorough vulnerability assessments, penetration testing, and implements compliance frameworks. We\'ve secured 100+ applications and helped companies achieve SOC 2, ISO 27001, and GDPR compliance.',
    icon: 'ShieldCheckIcon',
    gradient: 'from-red-500 to-rose-500',
    bg: 'bg-red-50',
    iconColor: 'text-red-600',
    borderHover: 'hover:border-red-200',
    features: [
      'VAPT (Vulnerability Assessment)',
      'Penetration Testing',
      'SOC 2 & ISO 27001 Compliance',
      'Security Code Review',
      'Incident Response Planning',
      'Zero Trust Architecture',
    ],
    deliverables: ['Security Audit Report', 'Remediation Plan', 'Compliance Docs', 'Security Training'],
    timeline: '2–6 weeks',
    teamSize: '2–4 specialists',
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    shortDesc: 'User-centered design that converts visitors into customers.',
    longDesc:
      'Our design team creates intuitive, beautiful interfaces backed by user research and A/B testing data. We\'ve designed products used by 5M+ users and consistently improve conversion rates by 25–40% post-redesign.',
    icon: 'PaintBrushIcon',
    gradient: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    borderHover: 'hover:border-violet-200',
    features: [
      'User Research & Personas',
      'Information Architecture',
      'Wireframing & Prototyping',
      'Design System Creation',
      'Usability Testing',
      'Motion Design',
    ],
    deliverables: ['Figma Design Files', 'Design System', 'Prototype', 'Handoff Documentation'],
    timeline: '3–8 weeks',
    teamSize: '2–4 designers',
  },
  {
    id: 'testing',
    title: 'Software Testing & QA',
    shortDesc: 'Comprehensive QA and automation for bulletproof software.',
    longDesc:
      'Our QA engineers embed into your development process to catch bugs before they reach production. We build automated test suites that run on every commit, reducing post-release defects by up to 80%.',
    icon: 'BeakerIcon',
    gradient: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    borderHover: 'hover:border-orange-200',
    features: [
      'Automated Test Suites',
      'API Testing (Postman/Newman)',
      'Performance Testing (JMeter)',
      'Security Testing',
      'Cross-browser Testing',
      'CI/CD Quality Gates',
    ],
    deliverables: ['Test Strategy Doc', 'Automated Suite', 'Bug Reports', 'Coverage Reports'],
    timeline: '2–8 weeks',
    teamSize: '2–5 QA engineers',
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
        {/* Header */}
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
            Click any service to see detailed capabilities, deliverables, and timelines.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allServices.map((service, index) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                id={service.id}
                ref={(el) => { if (el) refs.current.set(service.id, el); }}
                className={`bg-background-card rounded-3xl border transition-all duration-400 overflow-hidden ${
                  isExpanded ? 'border-primary/30 shadow-blue' : `border-border shadow-md-card ${service.borderHover}`
                } ${visibleItems.has(service.id) ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${(index % 2) * 0.1}s` }}
              >
                {/* Card Header */}
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
                        <h3 className="font-heading font-700 text-display-sm text-foreground mb-2">
                          {service.title}
                        </h3>
                        <p className="font-body text-body-sm text-foreground-secondary">
                          {service.shortDesc}
                        </p>
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
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isExpanded ? 'bg-primary text-white rotate-180' : 'bg-background-muted text-foreground-muted'
                    }`}>
                      <Icon name="ChevronDownIcon" size={16} />
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-7 pb-7 border-t border-border pt-6">
                    {/* Description */}
                    <p className="font-body text-body-base text-foreground-secondary leading-relaxed mb-6">
                      {service.longDesc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      {/* Features */}
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

                      {/* Deliverables */}
                      <div>
                        <h4 className="font-heading font-700 text-heading-lg text-foreground mb-3 flex items-center gap-2">
                          <Icon name="DocumentCheckIcon" size={16} className="text-primary" />
                          Deliverables
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((d) => (
                            <span
                              key={d}
                              className={`px-3 py-1.5 bg-gradient-to-r ${service.gradient} text-white font-body text-caption rounded-xl`}
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
          })}
        </div>
      </div>
    </section>
  );
}