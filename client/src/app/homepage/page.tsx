import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import ServicesOverview from './components/ServicesOverview';
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

export const metadata: Metadata = {
  title: 'Intellisys IT Solutions Pvt. Ltd. | Enterprise IT Services & Software Development',
  description:
    'Leading IT services company in Mumbai, India. Custom web development, mobile apps, cloud solutions, cybersecurity, and UI/UX design for startups, SMEs, and enterprises.',
  keywords: [
    'IT services India',
    'software development company Mumbai',
    'web development',
    'mobile app development',
    'cloud solutions',
    'cybersecurity',
    'Intellisys IT',
  ],
  openGraph: {
    title: 'Intellisys IT Solutions Pvt. Ltd.',
    description: 'Engineering the Digital Future of Your Business',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function HomepagePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesOverview />
        <WhyChooseUs />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}