'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const contactCards = [
  {
    icon: 'MapPinIcon',
    title: 'Visit Our Office',
    lines: [
      'Gera Imperim Rise, 328-B, Wipro Circle,',
      'Opp. to Wipro Company, Hinjawadi Phase II,',
      'Hinjawadi Rajiv Gandhi Infotech Park,',
      'Pune, Maharashtra 411057',
    ],
    action: { label: 'Get Directions', href: 'https://maps.app.goo.gl/eFdceVnpjysspftaA' },
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
  {
    icon: 'PhoneIcon',
    title: 'Call Us',
    lines: [
      '+91 91128 17771',
      '+91 84211 74213',
    ],
    action: { label: 'Call Now', href: 'tel:+919112817771' },
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-emerald-100',
  },
  {
    icon: 'EnvelopeIcon',
    title: 'Email Us',
    lines: [
      'info@intellisysitsolutions.com',
    ],
    action: { label: 'Send Email', href: 'mailto:info@intellisysitsolutions.com' },
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-violet-100',
  },
];

const businessHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM IST' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM IST' },
  { day: 'Sunday', hours: 'Emergency Support Only' },
];

const socialLinks = [
  { label: 'LinkedIn', icon: 'GlobeAltIcon', href: 'https://linkedin.com', color: 'hover:bg-primary' },
  { label: 'Twitter / X', icon: 'ChatBubbleLeftRightIcon', href: 'https://twitter.com', color: 'hover:bg-secondary' },
  { label: 'GitHub', icon: 'CodeBracketIcon', href: 'https://github.com', color: 'hover:bg-gray-800' },
  { label: 'YouTube', icon: 'PlayCircleIcon', href: 'https://youtube.com', color: 'hover:bg-red-600' },
];

export default function ContactInfo() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@intellisysitsolutions.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Contact Cards */}
      {contactCards.map((card) => (
        <div
          key={card.title}
          className={`bg-background-card rounded-3xl border ${card.border} p-6 shadow-md-card hover:shadow-lg-card transition-all duration-300 hover:-translate-y-0.5`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
              <Icon name={card.icon as any} size={22} className={card.color} />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-700 text-heading-xl text-foreground mb-2">{card.title}</h3>
              <div className="space-y-0.5 mb-4">
                {card.lines.map((line) => (
                  <p key={line} className="font-body text-body-sm text-foreground-secondary">
                    {line}
                  </p>
                ))}
              </div>
              <a
                href={card.action.href}
                target={card.action.href.startsWith('http') ? '_blank' : undefined}
                rel={card.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`inline-flex items-center gap-1.5 font-heading font-600 text-body-sm ${card.color} hover:gap-2.5 transition-all duration-200`}
              >
                {card.action.label}
                <Icon name="ArrowRightIcon" size={12} />
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Business Hours */}
      <div className="bg-background-dark rounded-3xl border border-white/10 p-6 shadow-dark-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Icon name="ClockIcon" size={18} className="text-primary-light" />
          </div>
          <h3 className="font-heading font-700 text-heading-xl text-white">Business Hours</h3>
        </div>
        <div className="space-y-3">
          {businessHours.map((item) => (
            <div key={item.day} className="flex items-center justify-between">
              <span className="font-body text-body-sm text-white/60">{item.day}</span>
              <span className="font-heading font-600 text-body-sm text-white">{item.hours}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="font-body text-caption text-white/50">
            Emergency support available 24/7 for active projects
          </span>
        </div>
      </div>

      {/* Quick Copy Email */}
      <div className="bg-background-elevated rounded-2xl border border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon name="EnvelopeIcon" size={16} className="text-primary" />
          <span className="font-mono text-body-sm text-foreground-secondary">info@intellisysitsolutions.com</span>
        </div>
        <button
          onClick={handleCopyEmail}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border rounded-lg font-heading font-600 text-caption text-foreground-secondary hover:bg-primary-50 hover:text-primary hover:border-primary/30 transition-all duration-200"
          aria-label="Copy email address"
        >
          <Icon name={copiedEmail ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={12} className={copiedEmail ? 'text-success' : ''} />
          {copiedEmail ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Social Links */}
      <div>
        <p className="font-body text-caption text-foreground-muted uppercase tracking-wider mb-3">
          Connect with us
        </p>
        <div className="flex gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`w-11 h-11 bg-background-muted border border-border rounded-xl flex items-center justify-center text-foreground-secondary ${social.color} hover:text-white hover:border-transparent transition-all duration-200 hover:scale-110`}
            >
              <Icon name={social.icon as any} size={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

