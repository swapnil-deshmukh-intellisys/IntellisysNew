import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-22 bg-[#fff7ef]">
      <Image
        src="/assets/images/hero2.png"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={82}
        className="object-cover object-center"
      />
      <div className="container-custom relative z-10 py-7 md:py-8 lg:py-10">
        <div className="grid lg:grid-cols-[0.58fr_0.42fr] gap-8 lg:gap-10 items-center">
          <div className="w-full max-w-4xl">
            <h1
              className="font-heading font-bold leading-[1.02] text-slate-950 [text-shadow:0_1px_0_rgba(15,23,42,0.10)]"
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
                href="/contact#contact-form"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#ff7a00] px-6 py-3 font-heading font-700 text-body-sm text-white shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff8c1a]"
              >
                Start Your Project
                <Icon name="ArrowRightIcon" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-300 bg-transparent px-5 py-3 font-heading font-600 text-body-sm text-slate-800 transition-all duration-300 hover:bg-white/60"
              >
                <Icon name="InformationCircleIcon" size={18} />
                Explore Services
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center -mt-8 xl:-mt-12">
            <div className="hero-symbol-wrap relative w-full max-w-[32rem] aspect-square">
              <div className="absolute inset-0 rounded-full bg-white/14 blur-3xl scale-90 pointer-events-none" />
              <Image
                src="/assets/images/symbol2.svg"
                alt="Team at the office"
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

