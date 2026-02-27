'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const stats = [
  {
    value: 200,
    suffix: '+',
    label: 'Projects Delivered',
    sublabel: 'Across 12 industries',
    icon: 'RocketLaunchIcon',
    color: 'from-primary to-secondary',
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Client Retention',
    sublabel: 'Long-term partnerships',
    icon: 'HeartIcon',
    color: 'from-accent to-secondary',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    value: 11,
    suffix: '+',
    label: 'Years of Excellence',
    sublabel: 'Since 2015',
    icon: 'TrophyIcon',
    color: 'from-accent to-primary',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Expert Engineers',
    sublabel: 'Full-stack specialists',
    icon: 'UsersIcon',
    color: 'from-secondary to-accent',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
  },
];

function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="font-heading font-900 text-display-xl text-foreground tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent pointer-events-none" />

      <div className="container-custom relative">
        {/* Section Label */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-800 text-display-md text-foreground">
            Proven Track Record of{' '}
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Excellence
            </span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative bg-background-card rounded-3xl p-8 border border-border shadow-md-card hover:shadow-lg-card transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
              style={{
                animation: isVisible ? `fade-up 0.6s ease-out ${index * 0.1}s both` : 'none',
              }}
            >
              {/* Gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-t-3xl`} />

              {/* Icon */}
              <div className={`w-12 h-12 ${stat.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={stat.icon as any} size={22} className={stat.iconColor} />
              </div>

              {/* Counter */}
              <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />

              {/* Label */}
              <p className="font-heading font-700 text-heading-lg text-foreground mt-2 mb-1">
                {stat.label}
              </p>
              <p className="font-body text-body-sm text-foreground-muted">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
