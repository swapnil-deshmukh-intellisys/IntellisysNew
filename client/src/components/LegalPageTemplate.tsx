import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageTemplateProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalPageTemplate({
  eyebrow,
  title,
  intro,
  sections,
}: LegalPageTemplateProps) {
  return (
    <>
      <Header />
      <main className="bg-[#FEFEFE]">
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#FEFEFE] pt-28 pb-12 sm:pt-32 sm:pb-14">
          <div className="container-custom">
            <div className="max-w-4xl">
              <span className="font-body text-caption uppercase tracking-[0.28em] text-slate-500">
                {eyebrow}
              </span>
              <h1 className="mt-4 font-heading text-[2.5rem] font-700 leading-[0.95] text-slate-900 sm:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl font-body text-body-lg leading-relaxed text-slate-600">
                {intro}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#FEFEFE]">
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
              <aside className="rounded-[2rem] border border-slate-200 bg-white px-6 py-6 shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)]">
                <p className="font-body text-caption uppercase tracking-[0.24em] text-slate-500">
                  On this page
                </p>
                <nav className="mt-5 space-y-3">
                  {sections.map((section) => (
                    <a
                      key={section.title}
                      href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="block font-body text-body-sm text-slate-600 transition-colors duration-200 hover:text-slate-900"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="font-body text-body-sm leading-relaxed text-slate-600">
                    Need a clarification or a custom compliance document?{' '}
                    <Link href="/contact" className="font-600 text-slate-900 underline-offset-4 hover:underline">
                      Contact us
                    </Link>
                    .
                  </p>
                </div>
              </aside>

              <div className="space-y-6">
                {sections.map((section) => {
                  const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

                  return (
                    <section
                      key={section.title}
                      id={id}
                      className="rounded-[2rem] border border-slate-200 bg-white px-6 py-6 shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)] sm:px-8 sm:py-8"
                    >
                      <h2 className="font-heading text-2xl font-700 text-slate-900">
                        {section.title}
                      </h2>
                      <div className="mt-4 space-y-4">
                        {section.body.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="font-body text-body-base leading-relaxed text-slate-600"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

