import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';
import BrandIcon, { type BrandName } from '@/components/ui/BrandIcon';
import AppImage from '@/components/ui/AppImage';
import { servicePageOrder, servicePages, type ServiceSlug } from '../servicePagesData';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

const serviceVisuals: Record<ServiceSlug, { heroImage: string; heroAlt: string; brands: BrandName[] }> = {
  'website-development': {
    heroImage: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1400&q=80',
    heroAlt: 'Team discussing website architecture and user flow on large displays',
    brands: ['nextjs', 'react', 'nodejs', 'python', 'docker'],
  },
  'mobile-app-development': {
    heroImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80',
    heroAlt: 'Mobile application prototypes shown on modern smartphones',
    brands: ['flutter', 'react', 'android', 'ios', 'nodejs'],
  },
  'full-stack-development': {
    heroImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1400&q=80',
    heroAlt: 'Full stack engineering workstation with code and architecture dashboards',
    brands: ['nextjs', 'react', 'nodejs', 'python', 'docker'],
  },
  'cloud-solutions': {
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    heroAlt: 'Cloud infrastructure visualization with connected data systems',
    brands: ['aws', 'google-cloud', 'microsoft-azure', 'kubernetes', 'terraform'],
  },
  cybersecurity: {
    heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80',
    heroAlt: 'Cybersecurity operations center with threat monitoring screens',
    brands: ['aws', 'google-cloud', 'docker', 'kubernetes', 'python'],
  },
  'ui-ux-design': {
    heroImage: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80',
    heroAlt: 'Product designers collaborating on interface wireframes and prototypes',
    brands: ['react', 'nextjs', 'flutter', 'ios', 'android'],
  },
  'software-testing': {
    heroImage: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&q=80',
    heroAlt: 'Quality assurance team reviewing release metrics and test results',
    brands: ['react', 'nodejs', 'python', 'docker', 'kubernetes'],
  },
};

export async function generateStaticParams() {
  return servicePageOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages[slug as ServiceSlug];
  if (!service) return {};

  return {
    title: `${service.navLabel} | Intellisys IT Solutions`,
    description: service.description,
    openGraph: {
      title: `${service.navLabel} | Intellisys IT Solutions`,
      description: service.subtitle,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicePages[slug as ServiceSlug];
  if (!service) notFound();

  const visual = serviceVisuals[slug as ServiceSlug];
  const relatedServices = service.related.map((relatedSlug) => servicePages[relatedSlug]);

  return (
    <>
      <Header />
      <main>
        <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 hero-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute -top-20 -left-10 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-10 w-72 h-72 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

          <div className="container-custom relative z-10">
            <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
              <Link href="/homepage" className="font-body text-body-sm text-white/45 hover:text-white/75 transition-colors">
                Home
              </Link>
              <Icon name="ChevronRightIcon" size={12} className="text-white/30" />
              <Link href="/services" className="font-body text-body-sm text-white/45 hover:text-white/75 transition-colors">
                Services
              </Link>
              <Icon name="ChevronRightIcon" size={12} className="text-white/30" />
              <span className="font-body text-body-sm text-white/75">{service.navLabel}</span>
            </nav>

            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
              <div>
                <span className="inline-flex px-3 py-1.5 rounded-full bg-white/12 border border-white/20 font-mono text-caption text-white/80 tracking-wider uppercase mb-5">
                  {service.navLabel}
                </span>
                <h1 className="font-heading font-900 text-white mb-5 leading-tight text-[clamp(2.1rem,5vw,3.8rem)]">
                  {service.title}
                </h1>
                <p className="font-body text-body-lg text-white/75 max-w-2xl leading-relaxed mb-5">{service.subtitle}</p>
                <p className="font-body text-body-base text-white/80 max-w-2xl leading-relaxed">{service.description}</p>

                <div className="flex flex-col sm:flex-row gap-3 mt-9">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-primary text-white font-heading font-700 text-body-base rounded-2xl shadow-blue hover:shadow-blue-lg transition-all duration-300 hover:scale-[1.03]"
                  >
                    Start This Service
                    <Icon name="ArrowRightIcon" size={16} />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/25 text-white font-heading font-600 text-body-base rounded-2xl hover:bg-white/10 transition-all duration-300"
                  >
                    Compare Services
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="relative mx-auto w-full max-w-[560px] h-[360px] sm:h-[440px]">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/25 to-secondary/25 blur-2xl rounded-[34%_66%_57%_43%/39%_36%_64%_61%]" />
                  <div className="relative h-full rounded-[34%_66%_57%_43%/39%_36%_64%_61%] overflow-hidden border border-white/25 shadow-dark-xl">
                    <AppImage
                      src={visual.heroImage}
                      alt={visual.heroAlt}
                      fill
                      sizes="(max-width: 768px) 95vw, 50vw"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                  </div>

                  <div className="absolute -left-2 sm:-left-8 top-4 sm:top-8 rounded-xl border border-white/25 bg-white/12 backdrop-blur px-3 py-2 sm:px-4 sm:py-3">
                    <p className="font-heading text-white font-700 text-body-base">{service.heroStats[0]?.value}</p>
                    <p className="font-body text-white/70 text-caption uppercase tracking-wider">{service.heroStats[0]?.label}</p>
                  </div>

                  <div className="absolute -right-2 sm:-right-8 bottom-8 sm:bottom-12 rounded-xl border border-white/25 bg-white/12 backdrop-blur px-3 py-2 sm:px-4 sm:py-3">
                    <p className="font-heading text-white font-700 text-body-base">{service.heroStats[1]?.value}</p>
                    <p className="font-body text-white/70 text-caption uppercase tracking-wider">{service.heroStats[1]?.label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background-dark py-7 border-y border-white/10">
          <div className="container-custom">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              <span className="font-heading font-700 text-body-sm text-white/70 uppercase tracking-[0.14em]">Core Stack</span>
              {visual.brands.map((brand) => (
                <span key={brand} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-[0_6px_16px_rgba(0,0,0,0.18)]">
                  <BrandIcon name={brand} size={16} />
                  <span className="font-body text-body-sm text-slate-700 capitalize">{brand.replace('-', ' ')}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <p className="font-mono text-caption text-primary uppercase tracking-[0.18em] mb-2">Results and Scope</p>
                <h2 className="font-heading font-900 text-display-md text-foreground leading-tight">
                  Business Outcomes and Delivery Assets
                </h2>
                <p className="font-body text-body-base text-foreground-secondary mt-3 max-w-3xl">
                  Clear impact metrics and concrete handoff assets, designed to keep execution aligned from kickoff to launch.
                </p>
              </div>
            </div>

            <div className="relative grid lg:grid-cols-2 gap-7">
              <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative w-16 h-44">
                  <div className="absolute inset-0 rounded-[46%_54%_63%_37%/37%_43%_57%_63%] border border-primary/25 bg-gradient-to-b from-primary/10 to-secondary/10 shadow-[0_10px_30px_rgba(0,0,0,0.12)]" />
                  <div className="absolute inset-0 scale-x-[-1] translate-x-8 rounded-[46%_54%_63%_37%/37%_43%_57%_63%] border border-secondary/25 bg-gradient-to-b from-secondary/10 to-primary/10" />
                </div>
              </div>
              <article className="relative rounded-[2rem] border border-slate-900/10 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_42%,#0b1224_100%)] p-7 sm:p-8 shadow-dark-card overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                <h3 className="font-heading font-900 text-3xl text-white mb-2">Business Outcomes</h3>
                <p className="font-body text-body-sm text-white/70 mb-6 max-w-xl">
                  Outcomes tied directly to product velocity, reliability, and measurable business performance.
                </p>

                <ul className="space-y-3">
                  {service.outcomes.map((item, idx) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-white/12 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5 font-mono text-caption text-white">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-body text-body-base text-white/85 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="relative rounded-[2rem] border border-border bg-background-card p-7 sm:p-8 shadow-md-card overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

                <div className="mb-5">
                  <h3 className="font-heading font-900 text-3xl text-foreground mb-2">What You Get</h3>
                  <p className="font-body text-body-sm text-foreground-secondary max-w-lg">
                    Practical deliverables your team can implement, monitor, and scale confidently.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {service.deliverables.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-white/90 border border-slate-200 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                    >
                      <div className="inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="font-body text-body-sm text-slate-700 leading-relaxed">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background-muted">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <div>
                <p className="font-mono text-caption text-primary uppercase tracking-[0.18em] mb-2">Execution Model</p>
                <h2 className="font-heading font-900 text-display-md text-foreground">Delivery Framework</h2>
                <p className="font-body text-body-base text-foreground-secondary mt-3 max-w-3xl">
                  A predictable pathway from discovery to release, with visible checkpoints and measurable progress.
                </p>
              </div>
            </div>

            <div className="relative grid md:grid-cols-2 xl:grid-cols-4 gap-5">
              <div className="hidden xl:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative w-16 h-36">
                  <div className="absolute inset-0 rounded-[55%_45%_43%_57%/62%_39%_61%_38%] border border-primary/25 bg-primary/10" />
                  <div className="absolute inset-0 scale-x-[-1] translate-x-7 rounded-[55%_45%_43%_57%/62%_39%_61%_38%] border border-secondary/25 bg-secondary/10" />
                </div>
              </div>
              {service.process.map((item) => (
                <article key={item.step} className="relative rounded-3xl bg-background-card border border-border p-6 shadow-md-card hover:shadow-lg-card transition-all duration-300 overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                  <span className="inline-flex px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-mono text-caption mb-4">
                    Step {item.step}
                  </span>
                  <h3 className="font-heading font-800 text-heading-lg text-foreground mb-2">{item.title}</h3>
                  <p className="font-body text-body-sm text-foreground-secondary leading-relaxed">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-7 items-start">
              <aside className="relative rounded-[2rem] bg-[linear-gradient(155deg,#0f172a_0%,#111827_55%,#0b1323_100%)] border border-white/10 p-7 shadow-dark-card overflow-hidden">
                <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                <p className="font-mono text-caption text-white/65 uppercase tracking-[0.18em] mb-2">Support Desk</p>
                <h2 className="font-heading font-900 text-display-sm text-white mb-3">FAQs</h2>
                <p className="font-body text-body-sm text-white/72 leading-relaxed mb-6">
                  Key questions teams usually ask before engagement, timelines, and operating model alignment.
                </p>
                <div className="relative w-full h-40 rounded-[20%_80%_44%_56%/54%_34%_66%_46%] overflow-hidden border border-white/20">
                  <AppImage
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80"
                    alt="Team discussing delivery roadmap and service FAQs"
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </aside>

              <div className="space-y-4">
                {service.faq.map((item, idx) => (
                  <article key={item.q} className="relative rounded-2xl border border-border bg-background-card p-5 shadow-md-card overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-primary to-secondary" />
                    <div className="pl-3">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-caption flex items-center justify-center flex-shrink-0 mt-0.5">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="font-heading font-700 text-heading-base text-foreground mb-2">{item.q}</h3>
                          <p className="font-body text-body-sm text-foreground-secondary leading-relaxed">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background-muted">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <p className="font-mono text-caption text-primary uppercase tracking-[0.18em] mb-2">Continue Exploring</p>
                <h2 className="font-heading font-900 text-display-sm text-foreground">Related Services</h2>
              </div>
              <Link href="/services" className="font-heading font-600 text-body-sm text-primary hover:text-primary-dark transition-colors">
                Browse Full Portfolio
              </Link>
            </div>

            <div className="relative grid md:grid-cols-3 gap-4 mb-10">
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-10 pointer-events-none">
                <div className="w-full h-full opacity-45 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2)_0%,transparent_70%)]" />
              </div>
              {relatedServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group rounded-2xl border border-border bg-background-card p-5 shadow-md-card hover:shadow-lg-card hover:border-primary/20 transition-all duration-300"
                >
                  <div className="mb-4 relative w-full h-28 rounded-[18%_82%_42%_58%/56%_38%_62%_44%] overflow-hidden border border-primary/20">
                    <AppImage
                      src={serviceVisuals[item.slug].heroImage}
                      alt={`${item.navLabel} visual`}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-heading font-800 text-heading-lg text-foreground mb-2">{item.navLabel}</h3>
                  <p className="font-body text-body-sm text-foreground-secondary leading-relaxed">{item.subtitle}</p>
                  <span className="inline-flex items-center gap-1.5 mt-4 font-heading font-600 text-body-sm text-primary">
                    Explore
                    <Icon name="ArrowRightIcon" size={14} />
                  </span>
                </Link>
              ))}
            </div>

            <div className="rounded-3xl bg-gradient-dark border border-border-card p-8 text-center overflow-hidden relative">
              <div className="absolute -top-8 -left-8 w-36 h-36 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-8 w-40 h-40 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
              <h3 className="font-heading font-800 text-display-sm text-white mb-3 relative">Want this service tailored to your business?</h3>
              <p className="font-body text-body-base text-white/70 max-w-2xl mx-auto mb-6 relative">
                Tell us your current architecture, delivery timelines, and constraints. We will propose a practical roadmap.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground font-heading font-700 text-body-base rounded-2xl hover:bg-background-muted transition-all duration-300 relative"
              >
                Talk to Our Team
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
