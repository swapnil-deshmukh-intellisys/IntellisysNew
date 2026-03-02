'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import BrandIcon from '@/components/ui/BrandIcon';
import type { BrandName } from '@/components/ui/BrandIcon';

const reasons = [
{
  icon: 'BoltIcon',
  title: 'Rapid Delivery',
  description: 'Agile sprints with 2-week delivery cycles. MVP to production in 6–8 weeks.',
  metric: '6–8 weeks',
  metricLabel: 'avg. MVP delivery',
  color: 'text-accent',
  bg: 'bg-accent/10'
},
{
  icon: 'ShieldCheckIcon',
  title: 'Enterprise Security',
  description: 'ISO 27001 certified processes. Every project ships with security audits built in.',
  metric: 'ISO 27001',
  metricLabel: 'certified',
  color: 'text-secondary',
  bg: 'bg-secondary/10'
},
{
  icon: 'UserGroupIcon',
  title: 'Dedicated Teams',
  description: 'Your own pod of engineers, designers, and a project manager — no shared resources.',
  metric: '100%',
  metricLabel: 'dedicated team',
  color: 'text-primary',
  bg: 'bg-primary/10'
},
{
  icon: 'ChartBarIcon',
  title: 'Transparent Reporting',
  description: 'Real-time dashboards, weekly sprint reviews, and complete code ownership.',
  metric: 'Weekly',
  metricLabel: 'progress reports',
  color: 'text-accent',
  bg: 'bg-accent/10'
}];


const techPartners: Array<{ name: string; icon: BrandName }> = [
{ name: 'AWS', icon: 'aws' },
{ name: 'Google Cloud', icon: 'google-cloud' },
{ name: 'Microsoft Azure', icon: 'microsoft-azure' },
{ name: 'Kubernetes', icon: 'kubernetes' },
{ name: 'Docker', icon: 'docker' },
{ name: 'Terraform', icon: 'terraform' }];


export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setIsVisible(true);},
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-background relative overflow-hidden" ref={sectionRef}>
      <div className="container-custom">
        <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'} text-center max-w-4xl mx-auto mb-12`}>
          <h2 className="font-heading font-800 text-display-md text-foreground mb-6">
            We Don't Just Build Software.{' '}
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
              
              We Build Businesses.
            </span>
          </h2>

          <p className="font-body text-body-lg text-foreground-secondary leading-relaxed">
            With over 11 years of engineering excellence, our team of 50+ specialists has helped 
            200+ companies across India and Southeast Asia transform their technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start lg:items-end">
          {/* Left: Image + Floating Cards */}
          <div className="relative h-full lg:self-end">
            <div
              className={`relative h-[420px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden shadow-xl-card ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1539c59d0-1771170881858.png"
                alt="Intellisys IT Solutions engineering team collaborating on software development in Mumbai office"
                className="w-full h-full object-cover object-top" />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
            </div>

          </div>

          {/* Right: Content */}
          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'} h-full`}>
            {/* Reasons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((reason, i) =>
              <div
                key={reason.title}
                className="p-5 bg-background-card rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-md-card group"
                style={{ animationDelay: `${i * 0.1}s` }}>
                
                  <div className={`w-10 h-10 ${reason.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name={reason.icon as any} size={18} className={reason.color} />
                  </div>
                  <h4 className="font-heading font-700 text-heading-lg text-foreground mb-1">
                    {reason.title}
                  </h4>
                  <p className="font-body text-body-sm text-foreground-muted leading-relaxed mb-3">
                    {reason.description}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-heading font-800 text-heading-xl ${reason.color}`}>
                      {reason.metric}
                    </span>
                    <span className="font-body text-caption text-foreground-muted">
                      {reason.metricLabel}
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Full-width Tech Partners */}
        <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'} mt-14`}>
          <p className="font-heading font-700 text-sm sm:text-base md:text-lg text-foreground-muted uppercase tracking-[0.14em] text-center mb-5">
            Technology Partners
          </p>
          <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden px-6 sm:px-8 lg:px-10">
            <div className="tech-partners-track">
              {[0, 1, 2].map((copy) =>
              <div key={copy} className="tech-partners-group" aria-hidden={copy > 0}>
                  {techPartners.map((partner) =>
                  <div
                    key={`${copy}-${partner.name}`}
                    className="flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 bg-background-muted border border-border rounded-xl hover:border-primary/30 hover:bg-primary-50 transition-all duration-200">
                    
                      <BrandIcon name={partner.icon} size={18} />
                      <span className="font-body text-body-base text-foreground-secondary">{partner.name}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .tech-partners-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: tech-partners-rtl 22s linear infinite;
        }

        .tech-partners-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-right: 0.75rem;
          flex-shrink: 0;
        }

        @keyframes tech-partners-rtl {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
            }
            }
      `}</style>
    </section>);

}
