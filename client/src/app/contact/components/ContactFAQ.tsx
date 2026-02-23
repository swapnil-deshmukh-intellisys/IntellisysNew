'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const faqs = [
  {
    q: 'How quickly can you start on my project?',
    a: 'For most projects, we can assemble a dedicated team and begin within 1â€“2 weeks of signing the contract. Urgent projects can sometimes be started within 3â€“5 business days depending on team availability.',
  },
  {
    q: 'Do you sign NDAs before discussing project details?',
    a: 'Absolutely. We sign a mutual NDA before any technical discussions begin. Your idea, IP, and business information are fully protected from day one.',
  },
  {
    q: 'What is your pricing model?',
    a: 'We offer three models: Fixed Price (for well-defined projects), Time & Material (for evolving requirements), and Dedicated Team (for long-term partnerships). We\'ll recommend the best fit during our consultation.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes. Every project includes 30 days of free post-launch support. After that, we offer flexible maintenance contracts ranging from 4 to 40 hours per month depending on your needs.',
  },
  {
    q: 'Can I see examples of your previous work?',
    a: 'Yes â€” we\'ll share a curated portfolio relevant to your industry during our consultation call. Some projects are under NDA, but we can discuss architecture and outcomes in detail.',
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-background-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full mb-6 shadow-sm-card">
              <Icon name="QuestionMarkCircleIcon" size={14} className="text-primary" />
              <span className="font-body text-caption text-primary font-600 uppercase tracking-wider">
                Common Questions
              </span>
            </div>
            <h2 className="font-heading font-800 text-display-md text-foreground mb-6">
              Before You{' '}
              <span
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Reach Out
              </span>
            </h2>
            <p className="font-body text-body-lg text-foreground-secondary mb-8 leading-relaxed">
              Here are answers to the most common questions we receive from 
              prospective clients. Still have questions? Just ask.
            </p>

            {/* Quick Contact */}
            <div className="bg-background-card rounded-2xl border border-border p-6 shadow-md-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                  <Icon name="ChatBubbleLeftEllipsisIcon" size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-heading font-700 text-heading-lg text-foreground">Prefer to chat?</p>
                  <p className="font-body text-body-sm text-foreground-muted">Our team responds in minutes</p>
                </div>
              </div>
              <a
                href="tel:+919112817771"
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-primary text-white font-heading font-600 text-body-sm rounded-xl shadow-blue-sm hover:shadow-blue transition-all duration-300"
              >
                <Icon name="PhoneIcon" size={16} />
                Call +91 91128 17771 / 84211 74213
              </a>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="space-y-3">
            {faqs?.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq?.q}
                  className={`bg-background-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-primary/30 shadow-blue-sm' : 'border-border shadow-sm-card hover:border-primary/20'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-600 text-heading-lg text-foreground">
                      {faq?.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen ? 'bg-primary text-white rotate-180' : 'bg-background-muted text-foreground-muted'
                      }`}
                    >
                      <Icon name="ChevronDownIcon" size={16} />
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-6 pb-6 font-body text-body-base text-foreground-secondary leading-relaxed">
                      {faq?.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
