import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesHero from './components/ServicesHero';
import ServiceCardsGrid from './components/ServiceCardsGrid';
import ProcessSection from './components/ProcessSection';
import ServicesCTA from './components/ServicesCTA';

export const metadata: Metadata = {
  title: 'IT Services | Intellisys IT Solutions Pvt. Ltd.',
  description:
    'Explore our full range of IT services: website development, mobile apps, full stack development, cloud solutions, cybersecurity, UI/UX design, and software testing. Mumbai, India.',
  keywords: [
    'IT services Mumbai',
    'web development company India',
    'mobile app development',
    'cloud solutions India',
    'cybersecurity services',
    'software testing',
    'UI UX design',
  ],
  openGraph: {
    title: 'IT Services | Intellisys IT Solutions',
    description: 'Full-spectrum technology services that scale with your business.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServiceCardsGrid />
        <ProcessSection />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  );
}