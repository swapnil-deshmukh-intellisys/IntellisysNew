'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import BrandIcon, { resolveBrandName } from '@/components/ui/BrandIcon';

const techCategories = [
  {
    category: 'Frontend',
    icon: 'WindowIcon',
    color: 'text-primary',
    bg: 'bg-primary/10',
    techs: ['React.js', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    icon: 'ServerStackIcon',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    techs: ['Node.js', 'Express.js', 'Python', 'Django', 'FastAPI', 'Go'],
  },
  {
    category: 'Mobile',
    icon: 'DevicePhoneMobileIcon',
    color: 'text-accent',
    bg: 'bg-accent/10',
    techs: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
  },
  {
    category: 'Database',
    icon: 'CircleStackIcon',
    color: 'text-primary',
    bg: 'bg-primary/10',
    techs: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'Supabase'],
  },
  {
    category: 'Cloud & DevOps',
    icon: 'CloudIcon',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    techs: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    category: 'AI & Data',
    icon: 'CpuChipIcon',
    color: 'text-accent',
    bg: 'bg-accent/10',
    techs: ['OpenAI API', 'LangChain', 'TensorFlow', 'PyTorch', 'Pandas', 'Apache Spark'],
  },
];

export default function TechStackSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-background relative" ref={sectionRef}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16"><h2 className="font-heading font-800 text-display-md text-foreground mb-4">
            Modern Tech.{' '}
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Proven Results.
            </span>
          </h2>
          <p className="font-body text-body-lg text-foreground-secondary">
            We work with the industry's leading technologies to build future-proof solutions.
          </p>
        </div>

        <div className="mt-8">
          <div className="px-4 sm:px-6 lg:px-0 py-2 sm:py-4 lg:py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {techCategories.map((cat, index) => (
                <div
                  key={cat.category}
                  className={`group relative transition-all duration-400 p-6 border border-white/70 rounded-2xl bg-[linear-gradient(145deg,#eef2f6_0%,#d9dee6_55%,#cfd6e1_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_16px_32px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_22px_38px_rgba(0,0,0,0.45)] ${
                    isVisible ? 'animate-fade-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <div className="relative z-10 w-12 h-12 rounded-xl border border-slate-300 bg-white/55 flex items-center justify-center mb-5 shadow-[0_6px_14px_rgba(15,23,42,0.12)]">
                    <Icon name={cat.icon as any} size={22} className="text-slate-700" />
                  </div>
                  <h3 className="relative z-10 font-heading font-700 text-xl sm:text-heading-xl text-slate-900 mb-2">{cat.category}</h3>
                  <p className="relative z-10 font-body text-sm sm:text-body-sm text-slate-700 mb-4 leading-relaxed">
                    Our {cat.category.toLowerCase()} stack combines proven tools and modern frameworks.
                  </p>
                  <div className="relative z-10 flex flex-wrap gap-1.5 mb-0">
                    {cat.techs.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/70 border border-slate-300 rounded-lg font-mono text-xs sm:text-sm text-slate-700"
                      >
                        {resolveBrandName(tech) ? <BrandIcon name={resolveBrandName(tech)!} size={16} /> : null}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 p-6 bg-background-muted rounded-2xl border border-border text-center">
          <p className="font-body text-body-base text-foreground-secondary">
            Don't see your preferred technology?{' '}
            <span className="font-heading font-600 text-primary">
              We adapt to your existing stack.
            </span>{' '}
            Our engineers are polyglots - we evaluate the best tool for each problem.
          </p>
        </div>
      </div>
    </section>
  );
}
