'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const reasons = [
{
  icon: 'BoltIcon',
  title: 'Rapid Delivery',
  description: 'Agile sprints with 2-week delivery cycles. MVP to production in 6–8 weeks.',
  metric: '6–8 weeks',
  metricLabel: 'avg. MVP delivery',
  color: 'text-amber-500',
  bg: 'bg-amber-50'
},
{
  icon: 'ShieldCheckIcon',
  title: 'Enterprise Security',
  description: 'ISO 27001 certified processes. Every project ships with security audits built in.',
  metric: 'ISO 27001',
  metricLabel: 'certified',
  color: 'text-emerald-500',
  bg: 'bg-emerald-50'
},
{
  icon: 'UserGroupIcon',
  title: 'Dedicated Teams',
  description: 'Your own pod of engineers, designers, and a project manager — no shared resources.',
  metric: '100%',
  metricLabel: 'dedicated team',
  color: 'text-blue-500',
  bg: 'bg-blue-50'
},
{
  icon: 'ChartBarIcon',
  title: 'Transparent Reporting',
  description: 'Real-time dashboards, weekly sprint reviews, and complete code ownership.',
  metric: 'Weekly',
  metricLabel: 'progress reports',
  color: 'text-violet-500',
  bg: 'bg-violet-50'
}];


const techPartners = [
{ name: 'AWS', icon: 'CloudIcon' },
{ name: 'Google Cloud', icon: 'ServerStackIcon' },
{ name: 'Microsoft Azure', icon: 'CircleStackIcon' },
{ name: 'Kubernetes', icon: 'CubeIcon' },
{ name: 'Docker', icon: 'ArchiveBoxIcon' },
{ name: 'Terraform', icon: 'WrenchScrewdriverIcon' }];


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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image + Floating Cards */}
          <div className="relative">
            <div
              className={`relative rounded-3xl overflow-hidden shadow-xl-card ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1539c59d0-1771170881858.png"
                alt="Intellisys IT Solutions engineering team collaborating on software development in Mumbai office"
                className="w-full h-[480px] object-cover" />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
            </div>

            {/* Floating Card 1 */}
            <div className="absolute -bottom-6 -right-6 bg-background-card rounded-2xl p-5 shadow-lg-card border border-border animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <Icon name="CheckBadgeIcon" size={22} className="text-emerald-500" />
                </div>
                <div>
                  <div className="font-heading font-800 text-display-sm text-foreground">98%</div>
                  <div className="font-body text-caption text-foreground-muted">On-time Delivery</div>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute -top-6 -left-6 bg-background-dark rounded-2xl p-4 shadow-dark-card border border-white/10 animate-float" style={{ animationDelay: '2s' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="font-body text-caption text-white/60">Currently Active</span>
              </div>
              <div className="font-heading font-700 text-heading-xl text-white">47 Projects</div>
              <div className="font-body text-caption text-white/40">across 12 industries</div>
            </div>
          </div>

          {/* Right: Content */}
          <div className={isVisible ? 'animate-slide-in-right' : 'opacity-0'}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full mb-6">
              <Icon name="StarIcon" size={14} className="text-primary" />
              <span className="font-body text-caption text-primary font-600 uppercase tracking-wider">
                Why Intellisys IT
              </span>
            </div>

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

            <p className="font-body text-body-lg text-foreground-secondary mb-10 leading-relaxed">
              With over 11 years of engineering excellence, our team of 50+ specialists has helped 
              200+ companies across India and Southeast Asia transform their technology.
            </p>

            {/* Reasons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
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

            {/* Tech Partners */}
            <div>
              <p className="font-body text-caption text-foreground-muted uppercase tracking-wider mb-4">
                Technology Partners
              </p>
              <div className="flex flex-wrap gap-3">
                {techPartners.map((partner) =>
                <div
                  key={partner.name}
                  className="flex items-center gap-2 px-3 py-2 bg-background-muted border border-border rounded-xl hover:border-primary/30 hover:bg-primary-50 transition-all duration-200">
                  
                    <Icon name={partner.icon as any} size={14} className="text-foreground-secondary" />
                    <span className="font-body text-body-sm text-foreground-secondary">{partner.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}