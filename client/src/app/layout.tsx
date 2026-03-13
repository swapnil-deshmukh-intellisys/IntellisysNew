import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Intellisys IT Solutions Pvt. Ltd. | Enterprise IT Services & Software Development',
  description:
    'Intellisys IT Solutions Pvt. Ltd. delivers custom software development, cloud solutions, mobile apps, cybersecurity, UI/UX design, and enterprise technology services in India.',
  icons: {
    icon: [
      { url: '/assets/images/LogoDark.png', type: 'image/png' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
