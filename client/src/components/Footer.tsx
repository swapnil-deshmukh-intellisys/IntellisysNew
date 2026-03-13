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
    <footer className="bg-background-dark relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-gradient-radial-blue opacity-18 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-gradient-radial-teal opacity-12 pointer-events-none" />
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      <div className="relative container-custom pt-7 pb-7">
        <div className="mb-4 flex justify-center">
          <Link href="/homepage" className="inline-flex items-center group">
            <Image
              src="/assets/images/logo.gif"
              alt="Intellisys IT Solutions"
              width={660}
              height={156}
              unoptimized
              className="h-20 sm:h-24 w-auto"
            />
          </Link>
        </div>

        <div className="border-t border-white/10 pt-7">
          <div className="mb-9 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            {/* Left Section */}
            <div className="w-full lg:max-w-md">
              <p className="font-body text-body-sm text-white/55 leading-relaxed mb-4">
                Delivering enterprise-grade IT solutions to startups, SMEs, and global enterprises
                since 2015. Your trusted technology partner in India.
              </p>
              <div className="space-y-2.5 mb-4">
                {contactInfo.map((item) => (
                  <div key={item.text} className="flex items-start gap-2.5">
                    <Icon
                      name={item.icon as any}
                      size={16}
                      className="text-primary-light mt-0.5 flex-shrink-0"
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
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-auto lg:ml-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6">
                {/* Services Column */}
                <div className="order-3">
                  <h4 className="font-heading font-700 text-body-base text-white mb-4 uppercase tracking-wider">
                    Services
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="font-body text-body-sm text-white/50 hover:text-primary-light transition-colors duration-200 flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company Column */}
                <div className="order-1">
                  <h4 className="font-heading font-700 text-body-base text-white mb-4 uppercase tracking-wider">
                    Company
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="font-body text-body-sm text-white/50 hover:text-primary-light transition-colors duration-200 flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal Column */}
                <div className="order-2">
                  <h4 className="font-heading font-700 text-body-base text-white mb-4 uppercase tracking-wider">
                    Legal
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="font-body text-body-sm text-white/50 hover:text-primary-light transition-colors duration-200 flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Certifications */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <h4 className="font-heading font-700 text-body-sm text-white mb-3 uppercase tracking-wider">
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['ISO 9001', 'AWS Partner', 'CMMI L3', 'SOC 2'].map((cert) => (
                        <span
                          key={cert}
                          className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-mono text-caption text-white/50"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-caption text-white/30">
            (c) {currentYear} Intellisys IT Solutions Pvt. Ltd. All rights reserved. CIN:
            U72200MH2015PTC123456
          </p>
          <div className="flex items-center gap-5">
            <span className="font-body text-caption text-white/30">
              Made with care in Pune, India
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-body text-caption text-white/30">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
