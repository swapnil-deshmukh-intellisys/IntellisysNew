import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TechStackSection from '@/app/services/components/TechStackSection';
import TechnologiesHero from './components/TechnologiesHero';

export const metadata: Metadata = {
  title: 'Technologies | Intellisys IT Solutions Pvt. Ltd.',
  description:
    'Explore the modern technology stack powering Intellisys IT solutions, including cloud platforms, frontend, backend, DevOps, and AI tools.',
};

export default function TechnologiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <TechnologiesHero />
        <section id="tech-stack">
          <TechStackSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
