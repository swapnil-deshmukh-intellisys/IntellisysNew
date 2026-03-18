import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

export default function ServicesHero() {
  return (
    <section
      className="relative overflow-hidden pt-16 md:pt-20 lg:pt-22"
      style={{
        backgroundImage: 'url(/assets/images/hero3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container-custom relative z-10 py-7 md:py-8 lg:py-10">
        <div className="grid items-center gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:gap-10">
          <div className="w-full max-w-4xl">
            <h1
              className="font-heading font-bold leading-[1.02] tracking-[-0.04em] text-slate-950"
              style={{ fontSize: 'clamp(2.7rem, 5.8vw, 4.9rem)' }}
            >
              Technology Services
              <br />
              <span className="text-[#ff7a00]">That Scale</span>
              <br />
              With You
            </h1>

            <p className="mt-5 max-w-2xl font-body text-body-lg leading-relaxed text-slate-700">
              From greenfield startups to enterprise modernization, our services cover strategy,
              build, launch, and long-term support across the digital stack.
            </p>

            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact#contact-form"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#ff7a00] px-6 py-3 font-heading font-700 text-body-sm text-white shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff8c1a]"
              >
                Request a Proposal
                <Icon
                  name="ArrowRightIcon"
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <a
                href="#services-grid"
                className="inline-flex items-center gap-2.5 rounded-full border border-black bg-transparent px-5 py-3 font-heading font-600 text-body-sm text-black-800 transition-all duration-300 hover:bg-white/60"
              >
                <Icon name="InformationCircleIcon" size={18} />
                Browse Services
              </a>
            </div>
          </div>

          <div className="hidden justify-center lg:flex -mt-8 xl:-mt-12">
            <div className="relative aspect-square w-full max-w-[32rem] animate-float">
              <div className="pointer-events-none absolute inset-0 scale-90 rounded-full bg-white/14 blur-3xl" />
              <Image
                src="/assets/images/symbol3.svg"
                alt="Technology services illustration"
                fill
                priority
                className="object-contain drop-shadow-[1px_3px_5px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

