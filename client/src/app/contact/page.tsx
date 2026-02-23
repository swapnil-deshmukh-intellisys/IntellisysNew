import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import ContactFAQ from './components/ContactFAQ';
import MapSection from './components/MapSection';

export const metadata: Metadata = {
  title: 'Contact Us | Intellisys IT Solutions Pvt. Ltd.',
  description:
    'Get in touch with Intellisys IT Solutions. Request a free consultation, project proposal, or technical advice. Mumbai office: +91 22 6789 0123. hello@intellisysit.in',
  keywords: [
    'contact Intellisys IT',
    'IT company Mumbai contact',
    'software development consultation',
    'free project proposal India',
  ],
  openGraph: {
    title: 'Contact Intellisys IT Solutions',
    description: 'Start your technology project with a free consultation. Response within 24 hours.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />

        {/* Main Contact Section */}
        <section className="section-padding bg-background relative">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Form — takes 2 columns */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              {/* Info — takes 1 column */}
              <div className="lg:col-span-1">
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>

        <ContactFAQ />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}