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
    <section className="section-padding bg-[#FEFEFE] relative" ref={sectionRef}>
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
                  className={`group relative h-full ${
                    isVisible ? 'animate-fade-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <div className="relative h-full translate-x-0 translate-y-0 transition-transform duration-400 group-hover:-translate-y-1">
                    <div className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-2xl bg-[linear-gradient(145deg,rgba(186,194,205,0.96)_0%,rgba(205,213,223,0.94)_45%,rgba(221,227,235,0.92)_100%)] border border-slate-300/70" />

                    <div className="relative h-full flex flex-col overflow-hidden p-6 border border-white/85 rounded-2xl bg-[linear-gradient(145deg,rgba(255,255,255,0.82)_0%,rgba(244,247,251,0.74)_45%,rgba(232,238,246,0.78)_100%)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(255,255,255,0.22)]">
                      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/45" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),transparent)]" />
                      <div className="pointer-events-none absolute -left-5 top-[-10%] h-[145%] w-20 rotate-[28deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.02)_100%)] opacity-80" />
                      <div className="pointer-events-none absolute right-7 top-[-20%] h-[138%] w-px rotate-[28deg] bg-white/85 opacity-85 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                      <div className="pointer-events-none absolute left-10 top-[8%] h-px w-[78%] rotate-[28deg] bg-white/70 opacity-75 shadow-[0_0_8px_rgba(255,255,255,0.45)]" />

                      <div className="relative z-10 mb-4 flex items-start justify-between gap-4">
                        <h3 className="font-heading font-700 text-xl sm:text-heading-xl text-slate-900">
                          {cat.category}
                        </h3>
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-[#FEFEFE] shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)]">
                          <Icon name={cat.icon as any} size={22} className="text-slate-700" />
                        </div>
                      </div>
                      <p className="relative z-10 font-body text-sm sm:text-body-sm text-slate-700 mb-4 leading-relaxed">
                        Our {cat.category.toLowerCase()} stack combines proven tools and modern frameworks.
                      </p>
                      <div className="relative z-10 mt-auto flex flex-wrap gap-1.5 mb-0">
                        {cat.techs.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FEFEFE] font-mono border border-slate-300 rounded-lg font-body text-xs sm:text-sm text-slate-700"
                          >
                            {resolveBrandName(tech) ? <BrandIcon name={resolveBrandName(tech)!} size={16} /> : null}
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
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

