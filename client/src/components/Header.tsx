'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface ServiceDropdownItem {
  label: string;
  description: string;
  icon: string;
  href: string;
}

const serviceItems: ServiceDropdownItem[] = [
  {
    label: 'Website Development',
    description: 'Custom web solutions',
    icon: 'GlobeAltIcon',
    href: '/services/website-development',
  },
  {
    label: 'Mobile App Development',
    description: 'iOS & Android apps',
    icon: 'DevicePhoneMobileIcon',
    href: '/services/mobile-app-development',
  },
  {
    label: 'Full Stack Development',
    description: 'End-to-end development',
    icon: 'CodeBracketIcon',
    href: '/services/full-stack-development',
  },
  {
    label: 'Cloud Solutions',
    description: 'AWS, GCP & Azure',
    icon: 'CloudIcon',
    href: '/services/cloud-solutions',
  },
  {
    label: 'Cybersecurity',
    description: 'Protect your systems',
    icon: 'ShieldCheckIcon',
    href: '/services/cybersecurity',
  },
  {
    label: 'UI/UX Design',
    description: 'User-centered design',
    icon: 'PaintBrushIcon',
    href: '/services/ui-ux-design',
  },
  {
    label: 'Software Testing',
    description: 'QA & automation',
    icon: 'BeakerIcon',
    href: '/services/software-testing',
  },
];

const navLinks = [
  { label: 'Home', href: '/homepage' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

const transparentHeaderMatchers = [
  '/homepage',
  '/about',
  '/services',
  '/contact',
  '/careers',
  '/technologies',
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 20);
          setShowHeader((prev) => {
            if (currentScrollY < 10) return true;
            if (currentScrollY > lastScrollY && currentScrollY > 60) {
              // scrolling down
              return false;
            } else if (currentScrollY < lastScrollY) {
              // scrolling up
              return true;
            }
            return prev;
          });
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const currentPath = pathname ?? '';
  const allowTransparentHeader =
    transparentHeaderMatchers.includes(currentPath) ||
    currentPath.startsWith('/services/');
  const transparentAtTop = allowTransparentHeader && !scrolled;
  const forceLightSurfaceHeader = transparentAtTop && (currentPath === '/services' || currentPath === '/technologies');
  const useLightLogo = !transparentAtTop && !forceLightSurfaceHeader;
  const useDarkLogo = transparentAtTop || forceLightSurfaceHeader;
  const useDarkNav = transparentAtTop || forceLightSurfaceHeader;
  const isActive = (href: string) =>
    currentPath === href || (href !== '/homepage' && currentPath.startsWith(href));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          transparentAtTop
            ? 'bg-transparent'
            : scrolled
            ? 'bg-black/95 backdrop-blur-xl shadow-md-card border-b border-white/10'
            : 'bg-black/95 backdrop-blur-xl shadow-md-card border-b border-white/10'
        } ${showHeader ? 'translate-y-0' : '-translate-y-full'}${transparentAtTop ? ' border-b-0 border-none shadow-none' : ''}`}
        style={{ willChange: 'transform' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/homepage"
              prefetch
              className="flex items-center min-w-0 -ml-4 md:-ml-3"
              aria-label="Intellisys IT Solutions - Home"
            >
              <Image
                src={
                  useLightLogo
                    ? "/assets/images/LogoLight.png"
                    : useDarkLogo
                      ? "/assets/images/LogoDark.png"
                      : "/assets/images/logo.gif"
                }
                alt="Intellisys IT Solutions"
                width={572}
                height={135}
                priority
                unoptimized={false}
                className={`h-auto ${
                  transparentAtTop
                    ? 'w-[8.6rem] md:w-auto md:h-[7.2rem]'
                    : 'w-[9.46rem] md:w-auto md:h-[3.96rem]'
                }`}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} className="group relative">
                    <Link
                      href={link.href}
                      prefetch={false}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-body font-500 text-body-sm transition-all duration-200 ${
                        isActive(link.href)
                          ? useDarkNav
                            ? 'text-slate-950 bg-slate-900/10'
                            : 'text-white bg-white/15'
                          : useDarkNav
                            ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-900/8'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                      <Icon
                        name="ChevronDownIcon"
                        size={14}
                        className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      />
                    </Link>

                    {/* Dropdown */}
                    <div className="pointer-events-none absolute top-full left-1/2 z-[110] mt-2 w-[520px] -translate-x-1/2 translate-y-1 overflow-hidden rounded-2xl border border-border bg-white opacity-0 shadow-xl-card transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        <div className="p-2 grid grid-cols-2 gap-1">
                          {serviceItems.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              prefetch={false}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-background-elevated transition-colors duration-150 group"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                                <Icon name={item.icon as any} size={16} className="text-primary" />
                              </div>
                              <div>
                                <p className="font-heading font-600 text-body-sm text-foreground group-hover:text-primary transition-colors">
                                  {item.label}
                                </p>
                                <p className="font-body text-caption text-foreground-muted mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-border px-4 py-3 bg-background-muted">
                          <Link
                            href="/services"
                            prefetch={false}
                            className="flex items-center justify-center gap-2 text-primary font-heading font-600 text-body-sm hover:gap-3 transition-all duration-200"
                          >
                            View All Services
                            <Icon name="ArrowRightIcon" size={14} />
                          </Link>
                        </div>
                      </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    prefetch={false}
                    className={`px-4 py-2 rounded-lg font-body font-500 text-body-sm transition-all duration-200 ${
                      isActive(link.href)
                        ? useDarkNav
                          ? 'text-slate-950 bg-slate-900/10'
                          : 'text-white bg-white/15'
                        : useDarkNav
                          ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-900/8'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact#contact-form"
                className="px-5 py-2.5 bg-gradient-primary text-white font-heading font-600 text-body-sm rounded-xl shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                For Business Inquiries
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg transition-colors ml-2 relative z-[130] flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setMobileOpen((prev) => !prev);
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 rounded-full transition-all duration-300 ${useDarkNav ? 'bg-slate-950' : 'bg-white'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
                />
                <span
                  className={`block h-0.5 rounded-full transition-all duration-300 ${useDarkNav ? 'bg-slate-950' : 'bg-white'} ${mobileOpen ? 'opacity-0' : ''}`}
                />
                <span
                  className={`block h-0.5 rounded-full transition-all duration-300 ${useDarkNav ? 'bg-slate-950' : 'bg-white'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-[120] lg:hidden">
          <div
            className="absolute inset-0 bg-background-dark/95 backdrop-blur-xl"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-dark-xl transition-transform duration-300">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-heading font-700 text-heading-xl text-foreground">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-background-muted transition-colors"
                  aria-label="Close menu"
                >
                  <Icon name="XMarkIcon" size={20} className="text-foreground-secondary" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-6 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.hasDropdown ? (
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-body font-500 text-body-base transition-colors ${
                          isActive(link.href)
                            ? 'bg-primary-50 text-primary'
                            : 'text-foreground-secondary hover:bg-background-muted hover:text-foreground'
                        }`}
                        aria-expanded={mobileServicesOpen}
                      >
                        {link.label}
                        <Icon
                          name="ChevronRightIcon"
                          size={16}
                          className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-90' : ''}`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        prefetch={false}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-body font-500 text-body-base transition-colors ${
                          isActive(link.href)
                            ? 'bg-primary-50 text-primary'
                            : 'text-foreground-secondary hover:bg-background-muted hover:text-foreground'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                    {link.hasDropdown ? (
                      <div className={`mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-200 ${mobileServicesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <Link
                          href="/services"
                          prefetch={false}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-primary hover:bg-primary-50 transition-colors text-body-sm font-body font-600"
                        >
                          <Icon name="Squares2X2Icon" size={14} />
                          View All Services
                        </Link>
                        {serviceItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            prefetch={false}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground-muted hover:text-primary hover:bg-primary-50 transition-colors text-body-sm font-body"
                          >
                            <Icon name={item.icon as any} size={14} />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </nav>

              <div className="p-6 border-t border-border">
                <Link
                  href="/contact#contact-form"
                  prefetch={false}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-primary text-white font-heading font-600 text-body-base rounded-xl shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)]"
                >
                  For Business Inquiries
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

