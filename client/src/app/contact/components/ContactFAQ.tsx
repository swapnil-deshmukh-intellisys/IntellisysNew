'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const faqs = [
  {
    q: 'How quickly can you start on my project?',
    a: 'For most projects, we can assemble a dedicated team and begin within 1-2 weeks of signing the contract. Urgent projects can sometimes be started within 3-5 business days depending on team availability.',
  },
  {
    q: 'Do you sign NDAs before discussing project details?',
    a: 'Absolutely. We sign a mutual NDA before any technical discussions begin. Your idea, IP, and business information are fully protected from day one.',
  },
  {
    q: 'What is your pricing model?',
    a: "We offer three models: Fixed Price (for well-defined projects), Time & Material (for evolving requirements), and Dedicated Team (for long-term partnerships). We'll recommend the best fit during our consultation.",
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes. Every project includes 30 days of free post-launch support. After that, we offer flexible maintenance contracts ranging from 4 to 40 hours per month depending on your needs.',
  },
  {
    q: 'Can I see examples of your previous work?',
    a: "Yes - we'll share a curated portfolio relevant to your industry during our consultation call. Some projects are under NDA, but we can discuss architecture and outcomes in detail.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-10 sm:py-12 bg-[#FEFEFE] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      <div className="container-custom relative">
        <div className="mb-8 text-center">
          <p className="font-body text-caption uppercase  text-foreground-muted mb-2">
            Help Center
          </p>
          <h2 className="font-heading font-800 text-display-sm text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mx-auto max-w-5xl grid gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={faq.q}
                className="relative rounded-2xl border border-border bg-background-card p-5 shadow-md-card overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-primary to-secondary" />
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full rounded-xl pl-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 font-body text-caption text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-heading text-heading-base font-700 text-foreground">
                          {faq.q}
                        </h3>
                        <div
                          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isOpen
                              ? 'rotate-180 bg-primary text-white shadow-blue-sm'
                              : 'border border-border bg-white text-foreground-muted'
                          }`}
                        >
                          <Icon name="ChevronDownIcon" size={16} />
                        </div>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-400 ${
                          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="pr-2 pt-2 font-body text-body-sm leading-relaxed text-foreground-secondary">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
