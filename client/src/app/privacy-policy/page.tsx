import type { Metadata } from 'next';
import LegalPageTemplate from '@/components/LegalPageTemplate';

export const metadata: Metadata = {
  title: 'Privacy Policy | Intellisys IT Solutions Pvt. Ltd.',
  description:
    'Read the Privacy Policy for Intellisys IT Solutions, including how we collect, use, and protect website and inquiry data.',
};

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'We collect information you provide directly through our website forms, email communication, and recruitment submissions. This may include your name, company, contact details, project requirements, resume data, and any files you choose to upload.',
      'We may also collect limited technical information such as browser type, device information, IP address, and pages visited to help us operate, secure, and improve the website experience.',
    ],
  },
  {
    title: 'How We Use Information',
    body: [
      'We use submitted information to respond to inquiries, prepare proposals, evaluate job applications, communicate with candidates, and deliver requested services or consultations.',
      'We also use operational data to monitor website performance, maintain security, prevent abuse, and improve our content and service delivery workflows.',
    ],
  },
  {
    title: 'Sharing and Disclosure',
    body: [
      'We do not sell personal information. We may share information with trusted internal team members, hosting providers, communication tools, or service partners only where necessary to operate the website, evaluate submissions, or deliver services.',
      'We may disclose information where required by law, legal process, or to protect the rights, safety, and security of Intellisys IT Solutions, our clients, or website users.',
    ],
  },
  {
    title: 'Data Retention',
    body: [
      'We retain inquiry, application, and operational records only for as long as reasonably necessary for business, legal, recruitment, security, and service continuity purposes.',
      'Where data is no longer required, we aim to delete, archive, or anonymize it according to internal operational needs and applicable obligations.',
    ],
  },
  {
    title: 'Your Choices',
    body: [
      'You may contact us to request updates, corrections, or deletion of information you have submitted, subject to any legal or contractual obligations that require us to retain records.',
      'If you do not want us to retain project or recruitment information beyond initial review, you can state that in your communication and we will handle the request in line with applicable obligations.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageTemplate
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      intro="This page explains how Intellisys IT Solutions collects, uses, stores, and protects information submitted through our website and business communication channels."
      sections={sections}
    />
  );
}
