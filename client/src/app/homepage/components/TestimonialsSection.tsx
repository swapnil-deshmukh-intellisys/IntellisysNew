'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
  {
    id: 1,
    quote:
      "Intellisys IT delivered our entire e-commerce platform in 8 weeks - ahead of schedule and under budget. The code quality was exceptional and their team felt like an extension of our own.",
    author: 'Priya Mehta',
    role: 'CTO',
    company: 'ShopKart India Pvt. Ltd.',
    location: 'Bengaluru',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1cd12b7c4-1770812045708.png',
    metric: '8 weeks',
    metricLabel: 'delivery',
  },
  {
    id: 2,
    quote:
      "We moved our entire infrastructure to AWS with Intellisys's help. Zero downtime migration, 40% cost reduction, and our platform now handles 10x the traffic. Outstanding work.",
    author: 'Arjun Sharma',
    role: 'VP Engineering',
    company: 'FinBridge Technologies',
    location: 'Mumbai',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e1073bc1-1767880718853.png',
    metric: '40%',
    metricLabel: 'cost reduction',
  },
  {
    id: 3,
    quote:
      'The mobile app they built for us has a 4.8 star rating on both app stores with 50,000+ downloads. Their UI/UX team really understands what users want. Highly recommended.',
    author: 'Sneha Krishnan',
    role: 'Product Manager',
    company: 'HealthPulse Solutions',
    location: 'Chennai',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_102b90abe-1770960125698.png',
    metric: '4.8',
    metricLabel: 'app store rating',
  },
];

const movingCards = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-background-dark relative overflow-hidden">
      <div className="absolute inset-0 hero-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial-blue opacity-30 pointer-events-none" />

      <div className="container-custom relative">
        <div className="text-center mb-12">
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

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background-dark to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background-dark to-transparent z-10" />

          <div className="reviews-track flex gap-5 w-max py-2">
            {movingCards.map((item, idx) => (
              <article
                key={`${item.id}-${idx}`}
                className="w-[340px] md:w-[380px] bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
              >
                <p className="font-body text-body-sm text-white/80 leading-relaxed mb-5">"{item.quote}"</p>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 flex-shrink-0">
                      <AppImage
                        src={item.avatar}
                        alt={`${item.author}, ${item.role}`}
                        className="w-full h-full object-cover"
                      />
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
                    <div className="font-heading font-800 text-xl text-white">{item.metric}</div>
                    <div className="font-body text-[10px] uppercase tracking-wide text-white/45">{item.metricLabel}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .reviews-track {
          animation: reviews-ltr 34s linear infinite;
        }

        @keyframes reviews-ltr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
}

