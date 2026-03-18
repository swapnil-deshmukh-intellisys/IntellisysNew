import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sitemap | Intellisys IT Solutions Pvt. Ltd.',
  description: 'Browse the main public pages and service pages available on the Intellisys IT Solutions website.',
};

const pageGroups = [
  {
    title: 'Main Pages',
    links: [
      { label: 'Homepage', href: '/homepage' },
      { label: 'Services', href: '/services' },
      { label: 'Technologies', href: '/technologies' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: 'Service Pages',
    links: [
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'Mobile App Development', href: '/services/mobile-app-development' },
      { label: 'Full Stack Development', href: '/services/full-stack-development' },
      { label: 'Cloud Solutions', href: '/services/cloud-solutions' },
      { label: 'Cybersecurity', href: '/services/cybersecurity' },
      { label: 'UI/UX Design', href: '/services/ui-ux-design' },
      { label: 'Software Testing', href: '/services/software-testing' },
    ],
  },
  {
    title: 'Legal Pages',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Header />
      <main className="bg-[#FEFEFE]">
        <section className="border-b border-slate-200/80 bg-[#FEFEFE] pt-28 pb-12 sm:pt-32 sm:pb-14">
          <div className="container-custom">
            <span className="font-body text-caption uppercase tracking-[0.28em] text-slate-500">
              Sitemap
            </span>
            <h1 className="mt-4 font-heading text-[2.5rem] font-700 leading-[0.95] text-slate-900 sm:text-6xl">
              Website Sitemap
            </h1>
            <p className="mt-6 max-w-3xl font-body text-body-lg leading-relaxed text-slate-600">
              Browse the key public pages and service pages available on the Intellisys IT
              Solutions website.
            </p>
          </div>
        </section>

        <section className="section-padding bg-[#FEFEFE]">
          <div className="container-custom">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pageGroups.map((group) => (
                <section
                  key={group.title}
                  className="rounded-[2rem] border border-slate-200 bg-white px-6 py-6 shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)] sm:px-8 sm:py-8"
                >
                  <h2 className="font-heading text-2xl font-700 text-slate-900">{group.title}</h2>
                  <ul className="mt-5 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="font-body text-body-base text-slate-600 transition-colors duration-200 hover:text-slate-900"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

