import type { Metadata } from 'next';
import LegalPageTemplate from '@/components/LegalPageTemplate';

export const metadata: Metadata = {
  title: 'Cookie Policy | Intellisys IT Solutions Pvt. Ltd.',
  description:
    'Read the Cookie Policy for Intellisys IT Solutions, including how website analytics and browser storage may be used.',
};

const sections = [
  {
    title: 'What Cookies Are',
    body: [
      'Cookies are small text files stored in your browser that help websites remember preferences, improve usability, and understand how visitors interact with pages and features.',
      'Some browser storage mechanisms may function similarly to cookies even if they are implemented through different technical means.',
    ],
  },
  {
    title: 'How We Use Cookies',
    body: [
      'We may use cookies or similar storage technologies to support essential website behavior, basic analytics, performance monitoring, and service improvement.',
      'These tools help us understand which pages are being used, identify technical issues, and improve navigation and inquiry flows over time.',
    ],
  },
  {
    title: 'Third Party Tools',
    body: [
      'Where third-party analytics, hosting, embedded content, or communication tools are used, those services may set their own cookies or similar identifiers subject to their own policies.',
      'We aim to keep third-party usage limited to tools that support website operation, measurement, and service delivery.',
    ],
  },
  {
    title: 'Managing Cookies',
    body: [
      'You can control cookies through your browser settings, including blocking, deleting, or limiting storage. Disabling some cookies may affect site behavior or reduce functionality.',
      'If your organization has strict privacy controls, you can access the website with browser restrictions enabled and contact us directly by email or phone if any form interaction becomes limited.',
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageTemplate
      eyebrow="Cookie Policy"
      title="Cookie Policy"
      intro="This page explains how Intellisys IT Solutions may use cookies and related browser storage technologies to support website functionality and performance."
      sections={sections}
    />
  );
}
