import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/homepage' },
    { label: 'Our Services', href: '/services' },
    { label: 'Careers', href: '/homepage' },
    { label: 'Contact Us', href: '/contact' },
  ],
  services: [
    { label: 'Website Development', href: '/services' },
    { label: 'Mobile App Development', href: '/services' },
    { label: 'Full Stack Development', href: '/services' },
    { label: 'Cloud Solutions', href: '/services' },
    { label: 'Cybersecurity', href: '/services' },
    { label: 'UI/UX Design', href: '/services' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/homepage' },
    { label: 'Terms of Service', href: '/homepage' },
    { label: 'Cookie Policy', href: '/homepage' },
    { label: 'Sitemap', href: '/homepage' },
  ],
};

const socialLinks = [
  { label: 'LinkedIn', icon: 'GlobeAltIcon', href: 'https://linkedin.com' },
  { label: 'Twitter', icon: 'ChatBubbleLeftRightIcon', href: 'https://twitter.com' },
  { label: 'GitHub', icon: 'CodeBracketIcon', href: 'https://github.com' },
  { label: 'YouTube', icon: 'PlayCircleIcon', href: 'https://youtube.com' },
];

const contactInfo = [
  { icon: 'MapPinIcon', text: 'Gera Imperim Rise, 328-B, Wipro Circle, Hinjawadi Phase II, Pune 411057' },
  { icon: 'PhoneIcon', text: '+91 91128 17771 / 84211 74213' },
  { icon: 'EnvelopeIcon', text: 'info@intellisysitsolutions.com' },
];

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-background-dark relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 hero-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial-blue opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial-teal opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      <div className="relative container-custom pt-20 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/homepage" className="inline-flex flex-col mb-6 group">
              <span className="font-heading font-800 text-heading-xl text-white block">Intellisys IT</span>
              <span className="font-body text-caption text-white/40 tracking-widest uppercase">Solutions Pvt. Ltd.</span>
            </Link>
            <p className="font-body text-body-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              Delivering enterprise-grade IT solutions to startups, SMEs, and global enterprises since 2015. 
              Your trusted technology partner in India.
            </p>
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <Icon name={item.icon as any} size={16} className="text-primary-light mt-0.5 flex-shrink-0" />
                  <span className="font-body text-body-sm text-white/50">{item.text}</span>
                </div>
              ))}
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-200 hover:scale-110"
                >
                  <Icon name={social.icon as any} size={16} className="text-white/60 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-700 text-body-base text-white mb-5 uppercase tracking-wider">
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
          <div className="lg:col-span-2">
            <h4 className="font-heading font-700 text-body-base text-white mb-5 uppercase tracking-wider">
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
          <div className="lg:col-span-3">
            <h4 className="font-heading font-700 text-body-base text-white mb-5 uppercase tracking-wider">
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
            <div className="mt-8">
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

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-caption text-white/30">
            (c) {currentYear} Intellisys IT Solutions Pvt. Ltd. All rights reserved. CIN: U72200MH2015PTC123456
          </p>
          <div className="flex items-center gap-6">
            <span className="font-body text-caption text-white/30">Made with care in Pune, India</span>
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
