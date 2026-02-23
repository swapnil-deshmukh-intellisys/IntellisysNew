'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface ServiceDropdownItem {
  label: string;
  description: string;
  icon: string;
  href: string;
}

const serviceItems: ServiceDropdownItem[] = [
  { label: 'Website Development', description: 'Custom web solutions', icon: 'GlobeAltIcon', href: '/services' },
  { label: 'Mobile App Development', description: 'iOS & Android apps', icon: 'DevicePhoneMobileIcon', href: '/services' },
  { label: 'Full Stack Development', description: 'End-to-end development', icon: 'CodeBracketIcon', href: '/services' },
  { label: 'Cloud Solutions', description: 'AWS, GCP & Azure', icon: 'CloudIcon', href: '/services' },
  { label: 'Cybersecurity', description: 'Protect your systems', icon: 'ShieldCheckIcon', href: '/services' },
  { label: 'UI/UX Design', description: 'User-centered design', icon: 'PaintBrushIcon', href: '/services' },
  { label: 'Software Testing', description: 'QA & automation', icon: 'BeakerIcon', href: '/services' },
];

const navLinks = [
  { label: 'Home', href: '/homepage' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const currentPath = pathname ?? '';
  const isActive = (href: string) => currentPath === href || (href !== '/homepage' && currentPath.startsWith(href));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md-card border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/homepage" className="flex items-center gap-3 group" aria-label="Intellisys IT Solutions - Home">
              <div className="relative">
                <div className={`absolute inset-0 rounded-xl bg-gradient-primary opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300`} />
                <div className="relative bg-gradient-primary p-2 rounded-xl shadow-blue-sm">
                  <AppLogo
                    size={28}
                    iconName="CpuChipIcon"
                    className="text-white"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-heading font-800 text-lg leading-tight tracking-tight transition-colors duration-300 ${
                    scrolled ? 'text-foreground' : 'text-white'
                  }`}
                >
                  Intellisys IT
                </span>
                <span
                  className={`font-body text-[10px] font-500 tracking-widest uppercase transition-colors duration-300 ${
                    scrolled ? 'text-foreground-muted' : 'text-white/60'
                  }`}
                >
                  Solutions Pvt. Ltd.
                </span>
              </div>
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
                          ? 'text-primary bg-primary-50'
                          : scrolled
                          ? 'text-foreground-secondary hover:text-foreground hover:bg-background-muted'
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
                    className={`px-4 py-2 rounded-lg font-body font-500 text-body-sm transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-primary bg-primary-50'
                        : scrolled
                        ? 'text-foreground-secondary hover:text-foreground hover:bg-background-muted'
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
              className="lg:hidden p-2 rounded-lg transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-foreground' : 'bg-white'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-foreground' : 'bg-white'} ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-foreground' : 'bg-white'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-background-dark/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-dark-xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="font-heading font-700 text-heading-xl text-foreground">Menu</span>
              <button
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
                        ? 'bg-primary-50 text-primary' :'text-foreground-secondary hover:bg-background-muted hover:text-foreground'
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
