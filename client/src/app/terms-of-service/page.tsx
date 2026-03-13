import type { Metadata } from 'next';
import LegalPageTemplate from '@/components/LegalPageTemplate';

export const metadata: Metadata = {
  title: 'Terms of Service | Intellisys IT Solutions Pvt. Ltd.',
  description:
    'Read the Terms of Service for using the Intellisys IT Solutions website and contacting us through our service and recruitment channels.',
};

const sections = [
  {
    title: 'Use of the Website',
    body: [
      'By accessing this website, you agree to use it for lawful business, informational, or recruitment purposes only. You must not misuse the site, attempt unauthorized access, or interfere with normal operation.',
      'We may suspend, limit, or update access to any part of the website where necessary to protect website integrity, users, business operations, or compliance requirements.',
    ],
  },
  {
    title: 'Content and Intellectual Property',
    body: [
      'Unless otherwise stated, website content, service descriptions, design assets, branding, and related materials are owned by or licensed to Intellisys IT Solutions and may not be copied or redistributed without permission.',
      'You may reference our public content for informational purposes, but you may not reuse substantial content, branding, or design assets in a misleading or commercial manner without written approval.',
    ],
  },
  {
    title: 'Inquiries and Proposals',
    body: [
      'Submitting a form, email, or inquiry does not by itself create a client relationship, partnership, hiring commitment, or contractual obligation.',
      'Any formal engagement, project scope, pricing, service commitment, timeline, or confidentiality obligation will be governed by a separate written agreement.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'We aim to keep website content accurate and current, but the website is provided on an informational basis without warranties of uninterrupted availability, completeness, or suitability for every use case.',
      'To the maximum extent permitted by law, Intellisys IT Solutions is not liable for indirect, incidental, or consequential loss arising from website use, temporary unavailability, or reliance on public website content.',
    ],
  },
  {
    title: 'Updates to These Terms',
    body: [
      'We may revise these terms when our website, service model, or legal obligations change. Updated terms will apply from the date they are published on this page.',
      'Continued use of the website after updates are published indicates acceptance of the revised terms.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPageTemplate
      eyebrow="Terms of Service"
      title="Terms of Service"
      intro="These terms describe the conditions for using the Intellisys IT Solutions website and interacting with our public service, contact, and recruitment channels."
      sections={sections}
    />
  );
}
