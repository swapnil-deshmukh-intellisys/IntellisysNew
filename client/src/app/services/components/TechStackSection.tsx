'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import BrandIcon, { resolveBrandName } from '@/components/ui/BrandIcon';

const techCategories = [
  {
    category: 'Frontend',
    icon: 'WindowIcon',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    techs: ['React.js', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    icon: 'ServerStackIcon',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    techs: ['Node.js', 'Express.js', 'Python', 'Django', 'FastAPI', 'Go'],
  },
  {
    category: 'Mobile',
    icon: 'DevicePhoneMobileIcon',
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    techs: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
  },
  {
    category: 'Database',
    icon: 'CircleStackIcon',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    techs: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'Supabase'],
  },
  {
    category: 'Cloud & DevOps',
    icon: 'CloudIcon',
    color: 'text-sky-500',
    bg: 'bg-sky-50',
    techs: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    category: 'AI & Data',
    icon: 'CpuChipIcon',
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    techs: ['OpenAI API', 'LangChain', 'TensorFlow', 'PyTorch', 'Pandas', 'Apache Spark'],
  },
];

export default function TechStackSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

        {/* Tech Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((cat, index) => (
            <div
              key={cat.category}
              className={`bg-background-card rounded-3xl border transition-all duration-300 p-6 cursor-pointer ${
                activeCategory === cat.category
                  ? 'border-primary/30 shadow-blue'
                  : 'border-border shadow-md-card hover:shadow-lg-card hover:border-primary/20'
              } ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={() => setActiveCategory(activeCategory === cat.category ? null : cat.category)}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 ${cat.bg} rounded-xl flex items-center justify-center`}>
                  <Icon name={cat.icon as any} size={20} className={cat.color} />
                </div>
                <h3 className="font-heading font-700 text-heading-xl text-foreground">{cat.category}</h3>
                <div className="ml-auto">
                  <Icon
                    name="ChevronDownIcon"
                    size={16}
                    className={`text-foreground-muted transition-transform duration-300 ${
                      activeCategory === cat.category ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background-muted border border-border rounded-xl font-mono text-caption text-foreground-secondary hover:bg-primary-50 hover:border-primary/20 hover:text-primary transition-colors duration-200"
                  >
                    {resolveBrandName(tech) ? <BrandIcon name={resolveBrandName(tech)!} size={13} /> : null}
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
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
