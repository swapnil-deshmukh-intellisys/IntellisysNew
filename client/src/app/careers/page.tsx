import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CareersHero from './components/CareersHero';
import OpenPositionsSection from './components/OpenPositionsSection';

export const metadata: Metadata = {
  title: 'Careers | Intellisys IT Solutions Pvt. Ltd.',
  description:
    'Join Intellisys IT Solutions and build impactful software for enterprises and startups. Explore open roles in engineering, design, product, and delivery.',
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <CareersHero />
        {/* <WhyJoinSection />
        <LifeAtIntellisys /> */}
        <OpenPositionsSection />
        {/* <HiringProcessSection />
        <CareersCTASection />
        <CareersFAQ /> */}
      </main>
      <Footer />
    </>
  );
}
