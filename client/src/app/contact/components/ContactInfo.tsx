'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { siInstagram } from 'simple-icons';

const contactCards = [
  {
    icon: 'PhoneIcon',
    title: 'Call Us',
    lines: [
      '+91 84211 74213',
    ],
    action: { label: 'Call Now', href: 'tel:+918421174213' },
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
  {
    label: 'Instagram',
    iconPath: siInstagram.path,
    iconTitle: siInstagram.title,
    href: 'https://www.instagram.com/intellisys_it_solutions/',
    color: 'hover:bg-pink-600',
  },
  {
    label: 'LinkedIn',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
    iconTitle: 'LinkedIn',
    href: 'https://www.linkedin.com/company/intellisys-it-solutions-private-limited/',
    color: 'hover:bg-primary',
  },
];

export default function ContactInfo() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@intellisysitsolutions.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91 84211 74213');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Contact Cards */}
      {contactCards.map((card) => {
        const isCallCard = card.title === 'Call Us';
        const isGlassCard = card.title === 'Email Us';
        return (
        <div key={card.title} className="group relative h-full">
          {isGlassCard ? (
            <div className="relative h-full translate-x-0 translate-y-0 transition-transform duration-400 group-hover:-translate-y-1">
              <div className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-3xl bg-[linear-gradient(145deg,rgba(186,194,205,0.96)_0%,rgba(205,213,223,0.94)_45%,rgba(221,227,235,0.92)_100%)] border border-slate-300/70" />
              <div className="relative h-full overflow-hidden p-6 border border-white/85 rounded-3xl bg-[linear-gradient(145deg,rgba(255,255,255,0.82)_0%,rgba(244,247,251,0.74)_45%,rgba(232,238,246,0.78)_100%)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(255,255,255,0.22)]">
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/45" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),transparent)]" />
                <div className="pointer-events-none absolute -left-5 top-[-10%] h-[145%] w-20 rotate-[28deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.02)_100%)] opacity-80" />
                <div className="pointer-events-none absolute right-7 top-[-20%] h-[138%] w-px rotate-[28deg] bg-white/85 opacity-85 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                <div className="pointer-events-none absolute left-10 top-[8%] h-px w-[78%] rotate-[28deg] bg-white/70 opacity-75 shadow-[0_0_8px_rgba(255,255,255,0.45)]" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl border border-slate-300 bg-[#FEFEFE] flex items-center justify-center flex-shrink-0 shadow-[0_8px_18px_rgba(148,163,184,0.12)]">
                    <Icon name={card.icon as any} size={22} className="text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-700 text-heading-xl mb-2 text-slate-900">{card.title}</h3>
                    <div className="space-y-0.5 mb-4">
                      {card.lines.map((line) => (
                        <p key={line} className="font-body text-body-sm text-slate-700">
                          {line}
                        </p>
                      ))}
                    </div>
                    <a
                      href={card.action.href}
                      target={card.action.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 font-heading font-600 text-body-sm text-slate-700 hover:gap-2.5 transition-all duration-200"
                    >
                      {card.action.label}
                      <Icon name="ArrowRightIcon" size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : isCallCard ? (
            <div className="relative h-full translate-x-0 translate-y-0 transition-transform duration-400 group-hover:-translate-y-1">
              <div className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-3xl bg-[linear-gradient(145deg,rgba(20,20,24,0.98)_0%,rgba(33,33,40,0.96)_45%,rgba(48,48,56,0.94)_100%)] border border-white/10" />
              <div className="relative h-full overflow-hidden p-6 border border-white/10 rounded-3xl bg-background-dark shadow-dark-card">
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
                <div className="pointer-events-none absolute -left-5 top-[-10%] h-[145%] w-20 rotate-[28deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.01)_100%)] opacity-60" />
                <div className="pointer-events-none absolute right-7 top-[-20%] h-[138%] w-px rotate-[28deg] bg-white/20 opacity-70 shadow-[0_0_8px_rgba(255,255,255,0.08)]" />
                <div className="pointer-events-none absolute left-10 top-[8%] h-px w-[78%] rotate-[28deg] bg-white/12 opacity-70 shadow-[0_0_8px_rgba(255,255,255,0.06)]" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/10 border border-white/30">
                    <Icon name={card.icon as any} size={22} className="text-white/85" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-700 text-heading-xl mb-2 text-white">{card.title}</h3>
                    <div className="space-y-0.5 mb-4">
                      {card.lines.map((line) => (
                        <p key={line} className="font-body text-body-sm text-white/70">
                          {line}
                        </p>
                      ))}
                    </div>
                    <a
                      href={card.action.href}
                      target={card.action.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 font-heading font-600 text-body-sm text-white/80 hover:gap-2.5 transition-all duration-200"
                    >
                      {card.action.label}
                      <Icon name="ArrowRightIcon" size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`rounded-3xl border p-6 shadow-md-card hover:shadow-lg-card transition-all duration-300 hover:-translate-y-0.5 ${
                isCallCard ? 'bg-background-dark border-white/10 text-white' : `bg-background-card ${card.border}`
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    isCallCard ? 'bg-white/10 border border-white/30' : card.bg
                  }`}
                >
                  <Icon
                    name={card.icon as any}
                    size={22}
                    className={isCallCard ? 'text-white/85' : card.color}
                  />
                </div>
                <div className="flex-1">
                  <h3 className={`font-heading font-700 text-heading-xl mb-2 ${isCallCard ? 'text-white' : 'text-foreground'}`}>
                    {card.title}
                  </h3>
                  <div className="space-y-0.5 mb-4">
                    {card.lines.map((line) => (
                      <p
                        key={line}
                        className={`font-body text-body-sm ${isCallCard ? 'text-white/70' : 'text-foreground-secondary'}`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  <a
                    href={card.action.href}
                    target={card.action.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`inline-flex items-center gap-1.5 font-heading font-600 text-body-sm hover:gap-2.5 transition-all duration-200 ${
                      isCallCard ? 'text-white/80' : card.color
                    }`}
                  >
                    {card.action.label}
                    <Icon name="ArrowRightIcon" size={12} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        );
      })}

      {/* Business Hours */}
      <div className="group relative h-full">
        <div className="relative h-full translate-x-0 translate-y-0 transition-transform duration-400 group-hover:-translate-y-1">
          <div className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-3xl bg-[linear-gradient(145deg,rgba(20,20,24,0.98)_0%,rgba(33,33,40,0.96)_45%,rgba(48,48,56,0.94)_100%)] border border-white/10" />
          <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 p-6 bg-background-dark shadow-dark-card">
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
            <div className="pointer-events-none absolute -left-5 top-[-10%] h-[145%] w-20 rotate-[28deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.01)_100%)] opacity-60" />
            <div className="pointer-events-none absolute right-7 top-[-20%] h-[138%] w-px rotate-[28deg] bg-white/20 opacity-70 shadow-[0_0_8px_rgba(255,255,255,0.08)]" />
            <div className="pointer-events-none absolute left-10 top-[8%] h-px w-[78%] rotate-[28deg] bg-white/12 opacity-70 shadow-[0_0_8px_rgba(255,255,255,0.06)]" />
            <div className="relative z-10 flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary/20 border border-white/30 rounded-xl flex items-center justify-center">
                <Icon name="ClockIcon" size={18} className="text-white/85" />
              </div>
              <h3 className="font-heading font-700 text-heading-xl text-white">Business Hours</h3>
            </div>
            <div className="relative z-10 space-y-3">
              {businessHours.map((item) => (
                <div key={item.day} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="font-body text-body-sm text-white/60">{item.day}</span>
                  <span className="font-heading font-600 text-body-sm text-white">{item.hours}</span>
                </div>
              ))}
            </div>
            <div className="relative z-10 mt-5 pt-5 border-t border-white/10 flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="font-body text-caption text-white/50">
                Emergency support available 24/7 for active projects
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Copy Email */}
      <div className="group relative h-full">
        <div className="relative h-full translate-x-0 translate-y-0 transition-transform duration-400 group-hover:-translate-y-1">
          <div className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-2xl bg-[linear-gradient(145deg,rgba(186,194,205,0.96)_0%,rgba(205,213,223,0.94)_45%,rgba(221,227,235,0.92)_100%)] border border-slate-300/70" />
          <div className="relative h-full overflow-hidden p-4 border border-white/85 rounded-2xl bg-[linear-gradient(145deg,rgba(255,255,255,0.82)_0%,rgba(244,247,251,0.74)_45%,rgba(232,238,246,0.78)_100%)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(255,255,255,0.22)] flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/45" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),transparent)]" />
            <div className="pointer-events-none absolute -left-5 top-[-10%] h-[145%] w-20 rotate-[28deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.02)_100%)] opacity-80" />
            <div className="pointer-events-none absolute right-6 top-[-20%] h-[138%] w-px rotate-[28deg] bg-white/85 opacity-85 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            <div className="pointer-events-none absolute left-8 top-[10%] h-px w-[72%] rotate-[28deg] bg-white/70 opacity-75 shadow-[0_0_8px_rgba(255,255,255,0.45)]" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-slate-300 bg-[#FEFEFE] flex items-center justify-center shadow-[0_8px_18px_rgba(148,163,184,0.12)]">
                <Icon name="EnvelopeIcon" size={16} className="text-slate-700" />
              </div>
              <span className="font-mono text-body-sm text-slate-700 break-all">info@intellisysitsolutions.com</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="relative z-10 inline-flex self-start items-center gap-1.5 px-3 py-1.5 bg-[#FEFEFE] border border-slate-300 rounded-lg font-heading font-600 text-caption text-slate-700 transition-all duration-200"
              aria-label="Copy email address"
            >
              <Icon name={copiedEmail ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={12} className={copiedEmail ? 'text-success' : ''} />
              {copiedEmail ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Copy Phone */}
      <div className="group relative h-full">
        <div className="relative h-full translate-x-0 translate-y-0 transition-transform duration-400 group-hover:-translate-y-1">
          <div className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-2xl bg-[linear-gradient(145deg,rgba(186,194,205,0.96)_0%,rgba(205,213,223,0.94)_45%,rgba(221,227,235,0.92)_100%)] border border-slate-300/70" />
          <div className="relative h-full overflow-hidden p-4 border border-white/85 rounded-2xl bg-[linear-gradient(145deg,rgba(255,255,255,0.82)_0%,rgba(244,247,251,0.74)_45%,rgba(232,238,246,0.78)_100%)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(255,255,255,0.22)] flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/45" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),transparent)]" />
            <div className="pointer-events-none absolute -left-5 top-[-10%] h-[145%] w-20 rotate-[28deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.02)_100%)] opacity-80" />
            <div className="pointer-events-none absolute right-6 top-[-20%] h-[138%] w-px rotate-[28deg] bg-white/85 opacity-85 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            <div className="pointer-events-none absolute left-8 top-[10%] h-px w-[72%] rotate-[28deg] bg-white/70 opacity-75 shadow-[0_0_8px_rgba(255,255,255,0.45)]" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-slate-300 bg-[#FEFEFE] flex items-center justify-center shadow-[0_8px_18px_rgba(148,163,184,0.12)]">
                <Icon name="PhoneIcon" size={16} className="text-slate-700" />
              </div>
              <span className="font-mono text-body-sm text-slate-700">+91 84211 74213</span>
            </div>
            <button
              onClick={handleCopyPhone}
              className="relative z-10 inline-flex self-start items-center gap-1.5 px-3 py-1.5 bg-[#FEFEFE] border border-slate-300 rounded-lg font-heading font-600 text-caption text-slate-700 transition-all duration-200"
              aria-label="Copy phone number"
            >
              <Icon name={copiedPhone ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={12} className={copiedPhone ? 'text-success' : ''} />
              {copiedPhone ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="text-center">
        <p className="font-body text-caption text-foreground-muted uppercase tracking-wider mb-3">
          Connect with us
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="inline-flex items-center justify-center text-foreground-secondary transition-transform duration-200 hover:scale-110"
            >
              {social.iconUrl ? (
                <img
                  src={social.iconUrl}
                  alt={social.iconTitle}
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px]"
                />
              ) : (
                <svg
                  role="img"
                  aria-label={social.iconTitle}
                  viewBox="0 0 24 24"
                  width={22}
                  height={22}
                >
                  <path
                    d={social.iconPath}
                    fill={
                      social.label === 'Instagram'
                        ? '#E4405F'
                        : 'currentColor'
                    }
                  />
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

