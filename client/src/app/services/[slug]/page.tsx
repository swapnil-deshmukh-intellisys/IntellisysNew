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
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-[#FEFEFE] pt-18 sm:pt-20 pb-10 sm:pb-12">
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
              <div>
                <h1 className="font-heading font-bold text-foreground mb-5 leading-tight text-[clamp(2.1rem,5vw,3.8rem)]">
                  {service.title}
                </h1>
                <p className="font-body text-body-lg text-foreground-secondary max-w-2xl leading-relaxed mb-5">{service.subtitle}</p>
                <p className="font-body text-body-base text-foreground-secondary max-w-2xl leading-relaxed">{service.description}</p>

                <div className="flex flex-col sm:flex-row gap-3 mt-7">
                  <Link
                    href="/contact#contact-form"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white font-heading font-700 text-body-sm rounded-2xl shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)] transition-all duration-300 hover:scale-[1.03]"
                  >
                    Start This Service
                    <Icon name="ArrowRightIcon" size={16} />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-slate-300 bg-white/85 text-foreground font-heading font-600 text-body-sm rounded-2xl hover:border-primary/30 hover:bg-white transition-all duration-300"
                  >
                    Compare Services
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="relative mx-auto w-full max-w-[560px] h-[360px] sm:h-[440px]">
                  <div className="relative h-full overflow-hidden rounded-[2rem] border border-slate-200 shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)]">
                    <AppImage
                      src={visual.heroImage}
                      alt={visual.heroAlt}
                      fill
                      sizes="(max-width: 768px) 95vw, 50vw"
                      className="h-full w-full object-cover"
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#FEFEFE] py-7 border-b border-slate-200/70">
          <div className="container-custom">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              <span className="font-heading font-700 text-body-sm text-slate-600 uppercase tracking-[0.14em]">Core Stack</span>
              {visual.brands.map((brand) => (
                <span key={brand} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)]">
                  <BrandIcon name={brand} size={16} />
                  <span className="font-body text-body-sm text-slate-700 capitalize">{brand.replace('-', ' ')}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12 bg-[#FEFEFE]">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <p className="font-body text-caption text-primary uppercase  mb-2">Results and Scope</p>
                <h2 className="font-heading font-900 text-display-md text-foreground leading-tight">
                  Business Outcomes and Delivery Assets
                </h2>
                <p className="font-body text-body-base text-foreground-secondary mt-3 max-w-3xl">
                  Clear goals, pure results, and the right support to take the project from planning to launch.
                </p>
              </div>
            </div>

            <div className="relative grid lg:grid-cols-2 gap-7">
              <article className="relative rounded-[2rem] border border-slate-900/10 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_42%,#0b1224_100%)] p-7 sm:p-8 shadow-dark-card overflow-hidden">
                <h3 className="font-heading font-900 text-3xl text-white mb-2">Business Outcomes</h3>
                <p className="font-body text-body-sm text-white/70 mb-6 max-w-xl">
                  Outcomes tied directly to product velocity, reliability, and measurable business performance.
                </p>

                <ul className="space-y-3">
                  {service.outcomes.map((item, idx) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-white/12 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5 font-body text-caption text-white">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-body text-body-base text-white/85 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="relative rounded-[2rem] border border-border bg-background-card p-7 sm:p-8 shadow-md-card overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />

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

        <section className="py-10 sm:py-12 bg-[#FEFEFE]">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <p className="font-body text-caption text-primary uppercase  mb-2">Execution Model</p>
                <h2 className="font-heading font-900 text-display-md text-foreground">Delivery Framework</h2>
                <p className="font-body text-body-base text-foreground-secondary mt-3 max-w-3xl">
                  A predictable pathway from discovery to release, with visible checkpoints and measurable progress.
                </p>
              </div>
            </div>

            <div className="relative grid md:grid-cols-2 xl:grid-cols-4 gap-5">
              {service.process.map((item) => (
                <article key={item.step} className="relative rounded-3xl bg-background-card border border-border p-6 shadow-md-card hover:shadow-lg-card transition-all duration-300 overflow-hidden">
                  <span className="inline-flex px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-body text-caption mb-4">
                    Step {item.step}
                  </span>
                  <h3 className="font-heading font-800 text-heading-lg text-foreground mb-2">{item.title}</h3>
                  <p className="font-body text-body-sm text-foreground-secondary leading-relaxed">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12 bg-[#FEFEFE]">
          <div className="container-custom">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-7 items-stretch">
              <aside className="relative flex h-full flex-col rounded-[2rem] bg-[linear-gradient(155deg,#0f172a_0%,#111827_55%,#0b1323_100%)] border border-white/10 p-6 shadow-dark-card overflow-hidden">
                <p className="font-body text-caption text-white/65 uppercase  mb-2">Support Desk</p>
                <h2 className="font-heading font-900 text-display-sm text-white mb-3">FAQs</h2>
                <p className="font-body text-body-sm text-white leading-relaxed mb-5">
                  Key questions teams usually ask before engagement, timelines, and operating model alignment.
                </p>
                <div className="relative w-full flex-1 min-h-[18rem] rounded-2xl overflow-hidden border border-white/20">
                  <AppImage
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80"
                    alt="Team discussing delivery roadmap and service FAQs"
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </aside>

              <div className="grid h-full gap-4 auto-rows-fr">
                {service.faq.map((item, idx) => (
                  <article key={item.q} className="relative h-full rounded-2xl border border-border bg-background-card p-5 shadow-md-card overflow-hidden flex items-center">
                    <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-primary to-secondary" />
                    <div className="pl-3 w-full">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-body text-caption flex items-center justify-center flex-shrink-0 mt-0.5">
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

        <section className="py-10 sm:py-12 bg-[#FEFEFE]">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <p className="font-body text-caption text-primary uppercase  mb-2">Continue Exploring</p>
                <h2 className="font-heading font-900 text-display-sm text-foreground">Related Services</h2>
              </div>
              <Link href="/services" className="font-heading font-600 text-body-sm text-primary hover:text-primary-dark transition-colors">
                Browse Full Portfolio
              </Link>
            </div>

            <div className="relative grid md:grid-cols-3 gap-4 mb-8">
              {relatedServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group rounded-2xl border border-border bg-background-card p-5 shadow-md-card hover:shadow-lg-card hover:border-primary/20 transition-all duration-300"
                >
                  <div className="mb-4 relative w-full aspect-square max-h-40 rounded-2xl overflow-hidden border border-primary/20">
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
              <h3 className="font-heading font-800 text-display-sm text-white mb-3 relative">Want this service tailored to your business?</h3>
              <p className="font-body text-body-base text-white/70 max-w-2xl mx-auto mb-6 relative">
                Tell us your current architecture, delivery timelines, and constraints. We will propose a practical roadmap.
              </p>
              <Link
                href="/contact#contact-form"
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

