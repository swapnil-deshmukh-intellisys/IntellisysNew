'use client';

import React, { useState, useEffect, useRef } from 'react';
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
    href: '/services',
  },
  {
    label: 'Mobile App Development',
    description: 'iOS & Android apps',
    icon: 'DevicePhoneMobileIcon',
    href: '/services',
  },
  {
    label: 'Full Stack Development',
    description: 'End-to-end development',
    icon: 'CodeBracketIcon',
    href: '/services',
  },
  {
    label: 'Cloud Solutions',
    description: 'AWS, GCP & Azure',
    icon: 'CloudIcon',
    href: '/services',
  },
  {
    label: 'Cybersecurity',
    description: 'Protect your systems',
    icon: 'ShieldCheckIcon',
    href: '/services',
  },
  {
    label: 'UI/UX Design',
    description: 'User-centered design',
    icon: 'PaintBrushIcon',
    href: '/services',
  },
  {
    label: 'Software Testing',
    description: 'QA & automation',
    icon: 'BeakerIcon',
    href: '/services',
  },
];

const navLinks = [
  { label: 'Home', href: '/homepage' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const currentPath = pathname ?? '';
  const isActive = (href: string) =>
    currentPath === href || (href !== '/homepage' && currentPath.startsWith(href));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-xl shadow-md-card border-b border-white/10'
            : 'bg-transparent'
        } ${showHeader ? 'translate-y-0' : '-translate-y-full'}${scrolled ? '' : ' border-b-0 border-none shadow-none'}`}
        style={{ willChange: 'transform' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/homepage"
              prefetch
              className="flex items-center min-w-0 -ml-2 md:-ml-3"
              aria-label="Intellisys IT Solutions - Home"
            >
              <Image
                src="/assets/images/logo.gif"
                alt="Intellisys IT Solutions"
                width={572}
                height={135}
                priority
                unoptimized
                className="h-[6.5rem] md:h-[6.5rem] w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-body font-500 text-body-sm transition-all duration-200 ${
                        isActive(link.href)
                          ? 'text-white bg-white/15'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <Icon
                        name="ChevronDownIcon"
                        size={14}
                        className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white rounded-2xl shadow-xl-card border border-border overflow-hidden z-[110]">
                        <div className="p-2 grid grid-cols-2 gap-1">
                          {serviceItems.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              prefetch
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
                            prefetch
                            className="flex items-center justify-center gap-2 text-primary font-heading font-600 text-body-sm hover:gap-3 transition-all duration-200"
                          >
                            View All Services
                            <Icon name="ArrowRightIcon" size={14} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    prefetch
                    className={`px-4 py-2 rounded-lg font-body font-500 text-body-sm transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-white bg-white/15'
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
                href="/contact"
                className="px-5 py-2.5 bg-gradient-primary text-white font-heading font-600 text-body-sm rounded-xl shadow-blue-sm hover:shadow-blue transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Get a Free Quote
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
                  className={`block h-0.5 rounded-full transition-all duration-300 bg-white ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
                />
                <span
                  className={`block h-0.5 rounded-full transition-all duration-300 bg-white ${mobileOpen ? 'opacity-0' : ''}`}
                />
                <span
                  className={`block h-0.5 rounded-full transition-all duration-300 bg-white ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[120] lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-background-dark/95 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-dark-xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
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
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-body font-500 text-body-base transition-colors ${
                      isActive(link.href)
                        ? 'bg-primary-50 text-primary'
                        : 'text-foreground-secondary hover:bg-background-muted hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    {link.hasDropdown && <Icon name="ChevronRightIcon" size={16} />}
                  </Link>
                  {link.hasDropdown && (
                    <div className="mt-1 ml-4 space-y-1">
                      {serviceItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground-muted hover:text-primary hover:bg-primary-50 transition-colors text-body-sm font-body"
                        >
                          <Icon name={item.icon as any} size={14} />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="p-6 border-t border-border">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-primary text-white font-heading font-600 text-body-base rounded-xl shadow-blue-sm"
              >
                Get a Free Quote
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
