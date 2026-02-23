'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

// Floating geometric shapes data
const floatingShapes = [
  { id: 1, size: 80, x: '8%', y: '20%', delay: '0s', duration: '7s', opacity: 0.15, type: 'hexagon' },
  { id: 2, size: 50, x: '88%', y: '15%', delay: '1s', duration: '9s', opacity: 0.12, type: 'triangle' },
  { id: 3, size: 120, x: '75%', y: '60%', delay: '2s', duration: '11s', opacity: 0.08, type: 'circle' },
  { id: 4, size: 40, x: '15%', y: '70%', delay: '0.5s', duration: '8s', opacity: 0.18, type: 'square' },
  { id: 5, size: 60, x: '50%', y: '80%', delay: '3s', duration: '10s', opacity: 0.1, type: 'hexagon' },
  { id: 6, size: 30, x: '92%', y: '45%', delay: '1.5s', duration: '6s', opacity: 0.2, type: 'triangle' },
];

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  delay: `${Math.random() * 4}s`,
  duration: `${3 + Math.random() * 4}s`,
  size: Math.random() > 0.5 ? 3 : 2,
}));

const techBadges = [
  { icon: 'CloudIcon', label: 'AWS Certified', color: '#FF9900' },
  { icon: 'ShieldCheckIcon', label: 'ISO 27001', color: '#10B981' },
  { icon: 'CpuChipIcon', label: 'AI-Powered', color: '#8B5CF6' },
  { icon: 'GlobeAltIcon', label: '50+ Countries', color: '#0EA5E9' },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    const el = heroRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const ShapeComponent = ({ shape }: { shape: typeof floatingShapes[0] }) => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: shape.x,
      top: shape.y,
      width: shape.size,
      height: shape.size,
      opacity: shape.opacity,
      animationDelay: shape.delay,
      animationDuration: shape.duration,
    };

    if (shape.type === 'circle') {
      return (
        <div
          style={baseStyle}
          className="animate-float rounded-full border-2 border-primary-light"
        />
      );
    }
    if (shape.type === 'hexagon') {
      return (
        <div style={baseStyle} className="animate-float-diagonal">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
              stroke="rgba(59,130,246,0.8)"
              strokeWidth="2"
              fill="rgba(37,99,235,0.1)"
            />
          </svg>
        </div>
      );
    }
    if (shape.type === 'triangle') {
      return (
        <div style={baseStyle} className="animate-float">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="50,5 95,90 5,90"
              stroke="rgba(14,165,233,0.8)"
              strokeWidth="2"
              fill="rgba(14,165,233,0.08)"
            />
          </svg>
        </div>
      );
    }
    return (
      <div
        style={baseStyle}
        className="animate-float border-2 border-secondary/60 rounded-lg"
        style={{ ...baseStyle, transform: 'rotate(45deg)' }}
      />
    );
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero"
      aria-label="Hero section"
    >
      {/* ── Layer 1: Animated Grid Pattern ── */}
      <div className="absolute inset-0 hero-grid-pattern opacity-40" />

      {/* ── Layer 2: Radial Glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.2) 0%, transparent 70%)',
            transform: mounted ? `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` : 'none',
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.15) 0%, transparent 70%)',
            transform: mounted ? `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` : 'none',
            transition: 'transform 0.4s ease-out',
          }}
        />
      </div>

      {/* ── Layer 3: Floating Geometric Shapes ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingShapes.map((shape) => (
          <ShapeComponent key={shape.id} shape={shape} />
        ))}
      </div>

      {/* ── Layer 4: Particle System ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted && particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-primary-light animate-particle"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* ── Layer 5: Orbiting Ring ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="w-[700px] h-[700px] rounded-full border border-primary/10 animate-spin-slow"
          style={{
            transform: mounted ? `rotate(${mousePos.x * 0.5}deg)` : 'none',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-secondary/8 animate-spin-reverse" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 container-custom w-full pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/15 mb-8"
            style={{
              animation: 'fade-up 0.6s ease-out 0.2s both',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="font-body text-caption text-white/80 tracking-wider uppercase">
              Trusted by 200+ Companies Across India
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="font-heading font-900 text-white mb-6 leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              animation: 'fade-up 0.7s ease-out 0.3s both',
            }}
          >
            Engineering the{' '}
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #60A5FA 0%, #38BDF8 50%, #34D399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Digital Future
            </span>
            {' '}of Your Business
          </h1>

          {/* Subheadline */}
          <p
            className="font-body text-body-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ animation: 'fade-up 0.7s ease-out 0.4s both' }}
          >
            From custom web and mobile applications to cloud infrastructure and cybersecurity — 
            Intellisys IT Solutions delivers full-spectrum technology services that scale with your ambitions.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            style={{ animation: 'fade-up 0.7s ease-out 0.5s both' }}
          >
            <Link
              href="/contact"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-primary text-white font-heading font-700 text-body-base rounded-2xl shadow-blue-lg hover:shadow-blue-lg hover:scale-105 transition-all duration-300 active:scale-95 animate-pulse-glow"
            >
              Start Your Project
              <Icon name="ArrowRightIcon" size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-3 px-8 py-4 glass border border-white/20 text-white font-heading font-600 text-body-base rounded-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <Icon name="PlayCircleIcon" size={18} />
              Explore Services
            </Link>
          </div>

          {/* Tech Badges */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mb-20"
            style={{ animation: 'fade-up 0.7s ease-out 0.6s both' }}
          >
            {techBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-4 py-2 glass border border-white/10 rounded-full"
              >
                <Icon name={badge.icon as any} size={14} style={{ color: badge.color }} />
                <span className="font-body text-caption text-white/70">{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Floating UI Cards */}
          <div className="relative h-64 hidden md:block" style={{ animation: 'fade-up 0.8s ease-out 0.7s both' }}>
            {/* Card 1: Active Projects */}
            <div
              className="absolute left-0 top-0 glass-dark rounded-2xl p-4 border border-primary/20 shadow-dark-card animate-float w-48"
              style={{ animationDelay: '0s' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="font-body text-caption text-white/60">Active Projects</span>
              </div>
              <div className="font-heading font-800 text-display-md text-white">47</div>
              <div className="flex items-center gap-1 mt-1">
                <Icon name="ArrowTrendingUpIcon" size={12} className="text-success" />
                <span className="font-body text-caption text-success">+12 this month</span>
              </div>
            </div>

            {/* Card 2: Tech Stack */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-8 glass-dark rounded-2xl p-4 border border-secondary/20 shadow-dark-card animate-float w-56"
              style={{ animationDelay: '1.5s' }}
            >
              <p className="font-body text-caption text-white/50 mb-3">Technologies We Use</p>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'Node.js', 'AWS', 'Python', 'Flutter'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-primary/20 border border-primary/30 rounded-md font-mono text-caption text-primary-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3: Client Satisfaction */}
            <div
              className="absolute right-0 top-4 glass-dark rounded-2xl p-4 border border-accent/20 shadow-dark-card animate-float w-44"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Icon key={s} name="StarIcon" size={12} className="text-accent" variant="solid" />
                ))}
              </div>
              <div className="font-heading font-800 text-display-sm text-white">4.9/5</div>
              <p className="font-body text-caption text-white/50 mt-1">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-body text-caption text-white/40 uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>

      {/* ── Bottom Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}