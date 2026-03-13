import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const coreValues = [
  {
    title: 'Business-First Thinking',
    description:
      'We start with the commercial objective, then shape the product, platform, or delivery model around it.',
    icon: 'BriefcaseIcon',
  },
  {
    title: 'Engineering Discipline',
    description:
      'Architecture, clean implementation, testing, and long-term maintainability are treated as baseline requirements.',
    icon: 'CpuChipIcon',
  },
  {
    title: 'Transparent Delivery',
    description:
      'Clients get clear visibility into scope, milestones, risks, and decisions throughout the engagement.',
    icon: 'ChartBarSquareIcon',
  },
];

const capabilityAreas = [
  'Custom software and platform development',
  'Cloud deployment and modernization',
  'Mobile application delivery',
  'UI/UX design and product workflows',
  'Support, maintenance, and scaling',
  'IT staffing and consulting support',
];

const operatingModel = [
  {
    title: 'Discover',
    copy: 'Align on objectives, current constraints, technical reality, and delivery priorities.',
  },
  {
    title: 'Design',
    copy: 'Define architecture, product flows, interfaces, and execution approach before heavy build begins.',
  },
  {
    title: 'Deliver',
    copy: 'Ship in structured iterations with measurable progress, feedback loops, and release readiness.',
  },
  {
    title: 'Support',
    copy: 'Stabilize, optimize, and extend the solution once it is in use by real teams and customers.',
  },
];

export const metadata: Metadata = {
  title: 'About Us | Intellisys IT Solutions Pvt. Ltd.',
  description:
    'Learn about Intellisys IT Solutions, our engineering approach, operating model, and how we help businesses build reliable digital products.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-[#FEFEFE]">
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(180deg,#fefefe_0%,#f8fafc_100%)] pt-28 sm:pt-32">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />
          <div className="absolute -top-16 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="container-custom relative pb-16 sm:pb-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="mb-4 font-mono text-caption uppercase tracking-[0.18em] text-primary">About Intellisys</p>
                <h1 className="max-w-4xl font-heading text-4xl font-900 leading-tight text-foreground sm:text-5xl lg:text-display-lg">
                  We build digital systems that are structured for delivery, scale, and real business use.
                </h1>
                <p className="mt-6 max-w-2xl font-body text-body-lg leading-relaxed text-foreground-secondary">
                  Intellisys IT Solutions works with startups, growing companies, and established teams that need
                  practical engineering support across product development, cloud, design, and long-term delivery.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-7 py-3.5 font-heading text-body-base font-700 text-white shadow-blue transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-lg"
                  >
                    Talk to Our Team
                    <Icon name="ArrowRightIcon" size={18} />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/80 px-7 py-3.5 font-heading text-body-base font-600 text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-white"
                  >
                    Explore Services
                    <Icon name="ChevronRightIcon" size={18} />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:col-span-2">
                  <p className="font-mono text-caption uppercase tracking-[0.16em] text-primary">Snapshot</p>
                  <div className="mt-4 grid gap-5 sm:grid-cols-3">
                    <div>
                      <div className="font-heading text-3xl font-800 text-foreground">End-to-end</div>
                      <p className="mt-1 font-body text-body-sm text-foreground-muted">Strategy, build, launch, and support</p>
                    </div>
                    <div>
                      <div className="font-heading text-3xl font-800 text-foreground">Multi-domain</div>
                      <p className="mt-1 font-body text-body-sm text-foreground-muted">Web, mobile, cloud, staffing, and consulting</p>
                    </div>
                    <div>
                      <div className="font-heading text-3xl font-800 text-foreground">Delivery-led</div>
                      <p className="mt-1 font-body text-body-sm text-foreground-muted">Execution discipline from kickoff to release</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.94)_0%,rgba(243,246,250,0.92)_100%)] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon name="BuildingOffice2Icon" size={22} className="text-primary" />
                  </div>
                  <h2 className="mt-4 font-heading text-heading-xl font-800 text-foreground">Who We Work With</h2>
                  <p className="mt-3 font-body text-body-base leading-relaxed text-foreground-secondary">
                    Teams that need dependable execution, technical clarity, and a partner who can work beyond surface-level delivery.
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.94)_0%,rgba(243,246,250,0.92)_100%)] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10">
                    <Icon name="RocketLaunchIcon" size={22} className="text-secondary" />
                  </div>
                  <h2 className="mt-4 font-heading text-heading-xl font-800 text-foreground">How We Operate</h2>
                  <p className="mt-3 font-body text-body-base leading-relaxed text-foreground-secondary">
                    Clear scope, fast communication, structured execution, and decisions grounded in engineering reality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#FEFEFE]">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <div>
                <p className="font-mono text-caption uppercase tracking-[0.18em] text-primary">Who We Are</p>
                <h2 className="mt-3 font-heading text-display-md font-800 leading-tight text-foreground">
                  A delivery-focused technology partner, not just a vendor.
                </h2>
              </div>
              <div className="space-y-5 font-body text-body-lg leading-relaxed text-foreground-secondary">
                <p>
                  Intellisys is structured around practical software delivery. That means we do not stop at ideas,
                  mockups, or advisory decks. We work through the details that make products usable, systems stable,
                  and launches realistic.
                </p>
                <p>
                  Our engagements typically combine technical planning, hands-on implementation, iterative delivery,
                  and post-launch support so clients can move from requirement to working outcome without fragmenting
                  ownership across multiple teams.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F8FAFC] border-y border-slate-200/70">
          <div className="container-custom">
            <div className="max-w-3xl">
              <p className="font-mono text-caption uppercase tracking-[0.18em] text-primary">Core Values</p>
              <h2 className="mt-3 font-heading text-display-md font-800 text-foreground">The standards behind our work</h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  className="rounded-[1.75rem] border border-slate-200/80 bg-white p-7 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon name={value.icon as any} size={22} className="text-primary" />
                  </div>
                  <h3 className="mt-5 font-heading text-heading-xl font-800 text-foreground">{value.title}</h3>
                  <p className="mt-3 font-body text-body-base leading-relaxed text-foreground-secondary">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#FEFEFE]">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
              <div className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.95)_0%,rgba(244,247,251,0.92)_100%)] p-8">
                <p className="font-mono text-caption uppercase tracking-[0.18em] text-primary">Capabilities</p>
                <h2 className="mt-3 font-heading text-display-sm font-800 leading-tight text-foreground">
                  What we help teams build and improve
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {capabilityAreas.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-4"
                    >
                      <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Icon name="CheckIcon" size={14} className="text-primary" />
                      </div>
                      <span className="font-body text-body-base text-foreground-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
                <p className="font-mono text-caption uppercase tracking-[0.18em] text-primary">Operating Model</p>
                <h2 className="mt-3 font-heading text-display-sm font-800 leading-tight text-foreground">
                  How an engagement typically moves forward
                </h2>
                <div className="mt-7 space-y-4">
                  {operatingModel.map((item, index) => (
                    <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-200/80 bg-[#FEFEFE] p-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-primary font-heading text-body-base font-800 text-white">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-heading text-body-lg font-700 text-foreground">{item.title}</h3>
                        <p className="mt-1 font-body text-body-sm leading-relaxed text-foreground-secondary">{item.copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F8FAFC] border-t border-slate-200/70">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.96)_0%,rgba(244,247,251,0.92)_100%)] px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:px-8 sm:py-10 lg:px-12">
              <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="font-mono text-caption uppercase tracking-[0.18em] text-primary">Start a Conversation</p>
                  <h2 className="mt-3 font-heading text-display-md font-800 leading-tight text-foreground">
                    If you need a team that can actually move from scope to shipped product, talk to us.
                  </h2>
                  <p className="mt-4 max-w-2xl font-body text-body-lg leading-relaxed text-foreground-secondary">
                    We can help evaluate the problem, define the right approach, and structure a delivery plan that is
                    realistic for your timeline and team.
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:items-end">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-7 py-3.5 font-heading text-body-base font-700 text-white shadow-blue transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-lg"
                  >
                    Contact Intellisys
                    <Icon name="ArrowRightIcon" size={18} />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-3.5 font-heading text-body-base font-600 text-foreground transition-all duration-300 hover:border-primary/30"
                  >
                    View Our Services
                    <Icon name="ChevronRightIcon" size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
