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
    <section className="section-padding bg-white relative" ref={sectionRef}>
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

        {/* Tech Categories Grid - dark panel behind cards to match Services section */}
        <div className="relative mt-8 rounded-3xl bg-background-dark overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.05),transparent_45%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_22%,transparent_78%,rgba(255,255,255,0.04))] pointer-events-none" />

          <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {techCategories.map((cat, index) => (
                <div
                  key={cat.category}
                  className={`group relative border border-[#ff8a3d]/70 bg-[linear-gradient(155deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03)_42%,rgba(255,255,255,0.01))] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_18px_40px_rgba(0,0,0,0.45),0_0_22px_rgba(255,138,61,0.2)] transition-all duration-400 hover:-translate-y-1 hover:border-[#ffb074] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_24px_52px_rgba(0,0,0,0.6),0_0_30px_rgba(255,138,61,0.35)] p-6 [clip-path:polygon(0_0,58%_0,64%_8%,100%_8%,100%_100%,0_100%)] ${
                    isVisible ? 'animate-fade-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-50 bg-[linear-gradient(130deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.05)_34%,transparent_58%)]" />
                  <div className="pointer-events-none absolute inset-0 opacity-25 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.14),transparent_28%,transparent_78%,rgba(255,255,255,0.08))]" />
                  <div className="pointer-events-none absolute top-[8%] right-0 h-[1px] w-24 bg-[#ffb074]/90" />
                  <div className="pointer-events-none absolute bottom-0 left-0 h-[1px] w-20 bg-[#ff8a3d]/70" />

                  <div className={`relative z-10 w-12 h-12 ${cat.bg} border border-sky-300/35 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_18px_rgba(56,189,248,0.3)]`}>
                    <Icon name={cat.icon as any} size={22} className="text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                  </div>
                  <h3 className="relative z-10 font-heading font-700 text-xl sm:text-heading-xl text-white mb-2">{cat.category}</h3>
                  <p className="relative z-10 font-body text-sm sm:text-body-sm text-white/70 mb-4 leading-relaxed">
                    Our {cat.category.toLowerCase()} stack combines proven tools and modern frameworks.
                  </p>
                  <div className="relative z-10 flex flex-wrap gap-1.5 mb-0">
                    {cat.techs.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/15 rounded-lg font-mono text-xs sm:text-sm text-white/75"
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
