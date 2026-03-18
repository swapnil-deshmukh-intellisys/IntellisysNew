import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';

const ServicesOverview = dynamic(() => import('./components/ServicesOverview'));
const WhyChooseUs = dynamic(() => import('./components/WhyChooseUs'));
const TestimonialsSection = dynamic(() => import('./components/TestimonialsSection'));
const CTASection = dynamic(() => import('./components/CTASection'));

export const metadata: Metadata = {
  title: 'Intellisys IT Solutions Pvt. Ltd. | Enterprise IT Services & Software Development',
  description:
    'Leading IT services company in Pune, India. Custom web development, mobile apps, cloud solutions, cybersecurity, and UI/UX design for startups, SMEs, and enterprises.',
  keywords: [
    'IT services India',
    'software development company Pune',
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
        <ServicesOverview />
        <WhyChooseUs />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
