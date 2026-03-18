'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const testimonials = [
  {
    id: 1,
    quote:
      'Intellisys built a seamless booking platform that increased our online bookings by 35% in the first two months. Performance is smooth, and user experience is significantly improved.',
    author: 'Narendra G.',
    role: 'Camping Project',
    company: 'Ethereal Hills',
    location: 'India',
    rating: '4.9',
  },
  {
    id: 2,
    quote:
      'They quickly understood our agro workflow and delivered a scalable system that improved operational efficiency by 30%. The platform is stable and easy for our team to manage daily.',
    author: 'Yash U.',
    role: 'Agro Project',
    company: 'Client Review',
    location: 'India',
    rating: '4.8',
  },
  {
    id: 3,
    quote:
      'Good execution and support throughout. Our manual work reduced by around 25%, though a few iterations were needed to fine-tune the system for our exact processes.',
    author: 'R. Jadhav',
    role: 'Agro Project',
    company: 'Client Review',
    location: 'India',
    rating: '4.8',
  },
  {
    id: 4,
    quote:
      'Fast and reliable platform handling high-volume transactions with zero downtime. We saw a 40% improvement in execution speed and overall system responsiveness.',
    author: 'Vishal A.',
    role: 'Trading Project',
    company: 'Client Review',
    location: 'India',
    rating: '5.0',
  },
  {
    id: 5,
    quote:
      'Our website now attracts 2x more qualified leads. The professional presentation of our land portfolio significantly improved trust and conversion from serious buyers.',
    author: 'Gajanan S.',
    role: 'Real Estate Project',
    company: 'Client Review',
    location: 'India',
    rating: '5.0',
  },
  {
    id: 6,
    quote:
      'The HRMS system reduced manual HR workload by 50% and improved employee tracking efficiency. Clean UI and smooth adoption across all departments.',
    author: 'Kunal V.',
    role: 'HRMS Application',
    company: 'Client Review',
    location: 'India',
    rating: '4.9',
  },
  {
    id: 7,
    quote:
      'They helped us increase client acquisition by 45% within a quarter. Practical strategy, strong execution, and clear focus on results.',
    author: 'Rohit V.',
    role: 'Business Development',
    company: 'Client Review',
    location: 'India',
    rating: '5.0',
  },
  {
    id: 8,
    quote:
      'Lead flow improved by around 30% with better positioning and targeting. Results were consistent, though it took some time to fully optimize campaigns.',
    author: 'Abhishek S.',
    role: 'Marketing / Business Development',
    company: 'Client Review',
    location: 'India',
    rating: '4.8',
  },
  {
    id: 9,
    quote:
      'Delivered a secure fintech platform and helped scale our business by 2x in under 6 months. Strong technical and strategic execution.',
    author: 'Surekha B.',
    role: 'Fintech + Business Development',
    company: 'Client Review',
    location: 'India',
    rating: '5.0',
  },
  {
    id: 10,
    quote:
      'Our billing errors dropped to zero, and processing time improved by 60%. The system is accurate, secure, and handles transactions flawlessly.',
    author: 'Suraj B.',
    role: 'Fintech / Billing System',
    company: 'Client Review',
    location: 'India',
    rating: '5.0',
  },
  {
    id: 11,
    quote:
      'Digitized our operations and increased outreach by 35%. Strong understanding of both business and tech, though timelines had minor delays.',
    author: 'Madhav K.',
    role: 'Agro + Business Development',
    company: 'Client Review',
    location: 'India',
    rating: '4.8',
  },
  {
    id: 12,
    quote:
      'Their business development support helped us improve conversion rates by 38% and close deals faster. Clear strategy, consistent follow-ups, and strong execution throughout.',
    author: 'Rameshwar B.',
    role: 'Business Development',
    company: 'Client Review',
    location: 'India',
    rating: '4.9',
  },
];

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef(false);
  const isManualRef = useRef(false);

  const renderRatingStars = (rating: string) => {
    const numericRating = Number(rating);
    const fillWidth = `${Math.max(0, Math.min(100, (numericRating / 5) * 100))}%`;

    return (
      <div className="relative inline-flex">
        <div className="flex items-center gap-0.5 text-white/20">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Icon key={`outline-${starIndex}`} name="StarIcon" size={12} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: fillWidth }}>
          <div className="flex items-center gap-0.5 text-[#ffb347]">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <Icon key={`filled-${starIndex}`} name="StarIcon" size={12} variant="solid" />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');

  const scrollCards = (direction: 'left' | 'right') => {
    const node = trackRef.current;
    if (!node) return;
    isPausedRef.current = true;
    isManualRef.current = true;

    const card = node.querySelector<HTMLElement>('[data-testimonial-card]');
    const cardWidth = card?.offsetWidth ?? 360;
    const gap = 20;
    const amount = cardWidth + gap;

    node.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    let frame = 0;
    let lastTime = 0;
    const speed = 0.03;
    const resetPoint = node.scrollWidth / 2;
    node.scrollLeft = resetPoint;

    const tick = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!isPausedRef.current) {
        node.scrollLeft -= delta * speed;

        if (node.scrollLeft <= 0) {
          node.scrollLeft += resetPoint;
        }
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="section-padding bg-background-dark relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
      <div className="pointer-events-none absolute -left-8 top-[-10%] h-[145%] w-24 rotate-[28deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.01)_100%)] opacity-60" />
      <div className="pointer-events-none absolute right-12 top-[-20%] h-[138%] w-px rotate-[28deg] bg-white/20 opacity-70 shadow-[0_0_8px_rgba(255,255,255,0.08)]" />
      <div className="pointer-events-none absolute left-16 top-[8%] h-px w-[72%] rotate-[28deg] bg-white/12 opacity-70 shadow-[0_0_8px_rgba(255,255,255,0.06)]" />

      <div className="container-custom relative">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-9">
          <div className="text-center sm:text-left">
            <h2 className="font-heading font-800 text-4xl md:text-5xl text-white leading-tight">
              Trusted by{' '}
              <span
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Industry Leaders
              </span>
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollCards('left')}
              aria-label="Previous testimonials"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white text-slate-900 transition-colors hover:bg-white/90"
            >
              <Icon name="ChevronLeftIcon" size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollCards('right')}
              aria-label="Next testimonials"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white text-slate-900 transition-colors hover:bg-white/90"
            >
              <Icon name="ChevronRightIcon" size={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            if (!isManualRef.current) {
              isPausedRef.current = false;
            }
          }}
          onTouchStart={() => {
            isPausedRef.current = true;
          }}
          onTouchEnd={() => {
            if (!isManualRef.current) {
              isPausedRef.current = false;
            }
          }}
          onFocusCapture={() => {
            isPausedRef.current = true;
          }}
          onBlurCapture={() => {
            if (!isManualRef.current) {
              isPausedRef.current = false;
            }
          }}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Client testimonials"
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              data-testimonial-card
              className="w-[calc(100vw-3rem)] max-w-[340px] shrink-0 snap-start md:w-[380px] rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              aria-hidden={index >= testimonials.length}
            >
              <div className="mb-4 flex h-12 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/8">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="text-[#ff8a2b]"
                >
                  <path
                    d="M9.2 6.5C6.9 7.8 5.6 10 5.4 13h2.8c0 2.7-1.5 4.3-4.2 4.7V15c1.1-.3 1.7-1 1.8-2.1H4.2c0-3.3 1.8-5.8 5-7.2V6.5Zm10 0c-2.3 1.3-3.6 3.5-3.8 6.5h2.8c0 2.7-1.5 4.3-4.2 4.7V15c1.1-.3 1.7-1 1.8-2.1h-1.6c0-3.3 1.8-5.8 5-7.2V6.5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="mb-5 min-h-[6.5rem] font-body text-body-sm leading-relaxed text-white/80 md:min-h-[7rem]">
                "{item.quote}"
              </p>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 font-heading text-sm font-800 text-white">
                    {getInitials(item.author)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-700 text-white text-sm truncate">{item.author}</p>
                    <p className="font-body text-xs text-white/60 truncate">
                      {item.role}, {item.company}
                    </p>
                    <p className="font-body text-xs text-white/40">{item.location}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="mb-1 font-heading font-800 text-base text-white">{item.rating}/5</div>
                  <div className="flex items-center justify-end">{renderRatingStars(item.rating)}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => scrollCards('left')}
            aria-label="Previous testimonials"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white text-slate-900 transition-colors hover:bg-white/90"
          >
            <Icon name="ChevronLeftIcon" size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollCards('right')}
            aria-label="Next testimonials"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white text-slate-900 transition-colors hover:bg-white/90"
          >
            <Icon name="ChevronRightIcon" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
