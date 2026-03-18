import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';
import { siInstagram } from 'simple-icons';

const footerLinks = {
  company: [
    { label: 'Our Services', href: '/services' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact Us', href: '/contact' },
  ],
  services: [
    { label: 'Website Development', href: '/services/website-development' },
    { label: 'Mobile App Development', href: '/services/mobile-app-development' },
    { label: 'Full Stack Development', href: '/services/full-stack-development' },
    { label: 'Cloud Solutions', href: '/services/cloud-solutions' },
    { label: 'Cybersecurity', href: '/services/cybersecurity' },
    { label: 'UI/UX Design', href: '/services/ui-ux-design' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
};

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/intellisys-it-solutions-private-limited/',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/intellisys_it_solutions/',
    iconPath: siInstagram.path,
    iconColor: '#E4405F',
  },
];

const contactInfo = [
  {
    icon: 'MapPinIcon',
    text: 'Gera Imperim Rise, 328-B, Wipro Circle, Hinjawadi Phase II, Pune 411057',
  },
  { icon: 'PhoneIcon', text: '+91 84211 74213 / 91128 17771' },
  { icon: 'EnvelopeIcon', text: 'info@intellisysitsolutions.com' },
];

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="relative overflow-hidden bg-background-dark">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
      <div className="pointer-events-none absolute -left-8 top-[-10%] h-[145%] w-24 rotate-[28deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.01)_100%)] opacity-60" />
      <div className="pointer-events-none absolute right-12 top-[-20%] h-[138%] w-px rotate-[28deg] bg-white/20 opacity-70 shadow-[0_0_8px_rgba(255,255,255,0.08)]" />
      <div className="pointer-events-none absolute left-16 top-[8%] h-px w-[72%] rotate-[28deg] bg-white/12 opacity-70 shadow-[0_0_8px_rgba(255,255,255,0.06)]" />

      <div className="relative z-10 container-custom py-7 sm:py-8">
        <div className="mb-4 flex justify-center">
          <Link href="/homepage" className="inline-flex items-center group">
            <Image
              src="/assets/images/LogoLight.png"
              alt="Intellisys IT Solutions"
              width={572}
              height={135}
              className="h-14 sm:h-16 w-auto"
            />
          </Link>
        </div>

        <div className="border-t border-white/10 pt-7">
          <div className="mb-9 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="w-full lg:max-w-md">
              <p className="font-body text-body-sm text-white/55 leading-relaxed mb-4">
                Custom software, cloud platforms, and enterprise delivery teams based in Pune,
                serving startups, SMEs, and global businesses.
              </p>
              <div className="space-y-2.5 mb-4">
                {contactInfo.map((item) => (
                  <div key={item.text} className="flex items-start gap-2.5">
                    <Icon
                      name={item.icon as any}
                      size={16}
                      className="text-white/80 mt-0.5 flex-shrink-0"
                    />
                    <span className="font-body text-body-sm text-white/55">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center justify-center transition-transform duration-200 hover:scale-110"
                  >
                    {social.iconUrl ? (
                      <img src={social.iconUrl} alt={social.label} width={22} height={22} className="w-[22px] h-[22px]" />
                    ) : (
                      <svg role="img" aria-label={social.label} viewBox="0 0 24 24" width={22} height={22}>
                        <path d={social.iconPath} fill={social.iconColor} />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="font-heading font-700 text-body-sm text-white mb-3 uppercase tracking-wider">
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['ISO 9001', 'AWS Partner', 'CMMI L3', 'SOC 2'].map((cert) => (
                    <span
                      key={cert}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-body text-caption text-white/50"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto lg:ml-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6">
                <div className="order-1">
                  <h4 className="font-heading font-700 text-body-base text-white mb-4 uppercase tracking-wider">
                    Services
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="font-body text-body-sm text-white/50 hover:text-primary-light transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="order-2">
                  <h4 className="font-heading font-700 text-body-base text-white mb-4 uppercase tracking-wider">
                    Company
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="font-body text-body-sm text-white/50 hover:text-primary-light transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="order-3">
                  <h4 className="font-heading font-700 text-body-base text-white mb-4 uppercase tracking-wider">
                    Legal
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="font-body text-body-sm text-white/50 hover:text-primary-light transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-caption text-white/30">
            (c) {currentYear} Intellisys IT Solutions Pvt. Ltd. All rights reserved. CIN:
            U72200MH2015PTC123456
          </p>
          <span className="font-body text-caption text-white/30">Made with care in Pune, India</span>
        </div>
      </div>
    </footer>
  );
}
