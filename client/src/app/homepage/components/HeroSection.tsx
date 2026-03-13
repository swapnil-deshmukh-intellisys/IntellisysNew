'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-20 md:pt-24 lg:pt-28"
      style={{
        backgroundImage: 'url(/assets/images/hero2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container-custom relative z-10 py-10 md:py-12 lg:py-14">
        <div className="grid lg:grid-cols-[0.58fr_0.42fr] gap-8 lg:gap-10 items-center">
          <div className="w-full max-w-4xl">
            <h1
              className="font-heading font-900 leading-[0.95] tracking-[-0.04em] text-slate-950"
              style={{ fontSize: 'clamp(2.7rem, 5.8vw, 4.9rem)' }}
            >
              Engineering the
              <br />
              <span className="text-[#ff7a00]">Digital Future</span>
              <br />
              of Business
            </h1>

            <p className="mt-5 max-w-2xl font-body text-body-lg leading-relaxed text-slate-700">
              Custom software, cloud platforms, and scalable digital infrastructure built for ambitious companies.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#ff7a00] px-8 py-4 font-heading font-700 text-body-lg text-white shadow-[0_18px_34px_rgba(249,115,22,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff8c1a]"
              >
                Start Your Project
                <Icon name="ArrowRightIcon" size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-3 rounded-full border border-slate-300 bg-transparent px-8 py-4 font-heading font-600 text-body-lg text-slate-800 transition-all duration-300 hover:bg-white/60"
              >
                <Icon name="InformationCircleIcon" size={20} />
                Explore Services
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center -mt-16 xl:-mt-20">
            <div className="hero-symbol-wrap relative w-full max-w-[32rem] aspect-square">
              <div className="absolute inset-0 rounded-full bg-white/14 blur-3xl scale-90 pointer-events-none" />
              <Image
                src="/assets/images/symbol2.svg"
                alt="Team at the office"
                fill
                priority
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.16)]"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-symbol-wrap {
          animation: heroSymbolFloat 6s ease-in-out infinite;
        }

        @keyframes heroSymbolFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </section>
  );
}
