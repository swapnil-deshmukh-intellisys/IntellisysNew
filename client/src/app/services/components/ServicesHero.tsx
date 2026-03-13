import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

export default function ServicesHero() {
  return (
    <section
      className="relative overflow-hidden pt-20 md:pt-24 lg:pt-28"
      style={{
        backgroundImage: 'url(/assets/images/hero3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container-custom relative z-10 py-10 md:py-12 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:gap-10">
          <div className="w-full max-w-4xl">
            <h1
              className="font-heading font-900 leading-[0.95] tracking-[-0.04em] text-slate-950"
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

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#ff7a00] px-8 py-4 font-heading font-700 text-body-lg text-white shadow-[0_18px_34px_rgba(249,115,22,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff8c1a]"
              >
                Request a Proposal
                <Icon
                  name="ArrowRightIcon"
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <a
                href="#services-grid"
                className="inline-flex items-center gap-3 rounded-full border border-slate-300 bg-transparent px-8 py-4 font-heading font-600 text-body-lg text-slate-800 transition-all duration-300 hover:bg-white/60"
              >
                <Icon name="InformationCircleIcon" size={20} />
                Browse Services
              </a>
            </div>
          </div>

          <div className="hidden justify-center lg:flex -mt-16 xl:-mt-20">
            <div className="relative aspect-square w-full max-w-[32rem] animate-float">
              <div className="pointer-events-none absolute inset-0 scale-90 rounded-full bg-white/14 blur-3xl" />
              <Image
                src="/assets/images/symbol3.svg"
                alt="Technology services illustration"
                fill
                priority
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.16)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
