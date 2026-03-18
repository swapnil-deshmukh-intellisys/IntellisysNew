import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import BrandIcon from '@/components/ui/BrandIcon';
import type { BrandName } from '@/components/ui/BrandIcon';

const reasons = [
{
  icon: 'BoltIcon',
  title: 'Rapid Delivery',
  description: 'Agile sprints with 2-week delivery cycles. MVP to production in 6–8 weeks.',
  metric: '6–8 weeks',
  metricLabel: 'avg. MVP delivery',
  note: 'T&C apply',
  color: 'text-accent',
  bg: 'bg-accent/10'
},
{
  icon: 'ShieldCheckIcon',
  title: 'Enterprise Security',
  description: 'ISO 27001 certified processes. Every project ships with security audits built in.',
  metric: 'ISO 27001',
  metricLabel: 'certified',
  note: 'T&C apply',
  color: 'text-secondary',
  bg: 'bg-secondary/10'
},
{
  icon: 'UserGroupIcon',
  title: 'Dedicated Teams',
  description: 'Your own pod of engineers, designers, and a project manager — no shared resources.',
  metric: '100%',
  metricLabel: 'dedicated team',
  note: 'T&C apply',
  color: 'text-primary',
  bg: 'bg-primary/10'
},
{
  icon: 'ChartBarIcon',
  title: 'Transparent Reporting',
  description: 'Real-time dashboards, weekly sprint reviews, and complete code ownership.',
  metric: 'Weekly',
  metricLabel: 'progress reports',
  note: 'T&C apply',
  color: 'text-accent',
  bg: 'bg-accent/10'
}];


const techPartners: Array<{ name: string; icon: BrandName }> = [
{ name: 'AWS', icon: 'aws' },
{ name: 'Google Cloud', icon: 'google-cloud' },
{ name: 'Microsoft Azure', icon: 'microsoft-azure' },
{ name: 'Kubernetes', icon: 'kubernetes' },
{ name: 'Docker', icon: 'docker' },
{ name: 'Terraform', icon: 'terraform' }];


export default function WhyChooseUs() {
  return (
    <section className="section-padding pt-2 sm:pt-3 lg:pt-4 bg-[#FEFEFE] relative overflow-hidden">
      <div className="container-custom">
        <div className="animate-slide-in-right text-center max-w-4xl mx-auto mb-9 sm:mb-10">
          <h2 className="font-heading font-800 text-display-md text-foreground mb-6">
            We Don't Just Build Software.{' '}
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
              
              We Build Businesses.
            </span>
          </h2>

          {/* <p className="font-body text-body-lg text-foreground-secondary leading-relaxed">
            With over 11 years of engineering excellence, our team of 50+ specialists has helped 
            200+ companies across India and Southeast Asia transform their technology.
          </p> */}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start lg:items-stretch">
          {/* Left: Image + Floating Cards */}
          <div className="relative lg:h-full">
            <div
              className="relative h-[400px] sm:h-[400px] lg:h-full rounded-3xl overflow-hidden shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)] animate-slide-in-left">

                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1539c59d0-1771170881858.png"
                  alt="Intellisys IT Solutions engineering team collaborating on software development in Pune office"
                  className="w-full h-full object-cover object-top" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
            </div>

          </div>

          {/* Right: Content */}
          <div className="animate-slide-in-right lg:h-full">
            {/* Reasons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((reason, i) =>
              <div
                key={reason.title}
                className="group relative overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white/92 p-5 shadow-[1px_1px_3px_rgba(15,23,42,0.07),2px_3px_5px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[1px_2px_4px_rgba(15,23,42,0.08),3px_4px_6px_rgba(15,23,42,0.06)]"
                style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />

                  <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <Icon name={reason.icon as any} size={18} className="text-slate-700" />
                    </div>
                    <div className="text-right min-w-0">
                      <p className="font-body text-body-sm text-slate-700 leading-relaxed">{reason.metric}</p>
                      <p className="font-body text-caption text-slate-500 mt-1">{reason.metricLabel}</p>
                    </div>
                  </div>
                  <div className="relative z-10 lg:min-h-[5rem]">
                    <h4 className="font-heading font-700 text-xl sm:text-heading-xl text-foreground mb-2 leading-tight">
                      {reason.title}
                    </h4>
                  </div>
                  <p className="relative z-10 font-body text-body-sm text-foreground-secondary leading-relaxed mb-4 lg:min-h-[4.5rem]">
                    {reason.description}
                  </p>
                  <p className="relative z-10 -mt-1 mb-4 font-body text-[11px] uppercase tracking-[0.12em] text-slate-500">
                    {reason.note}
                  </p>
                  <div className="relative z-10 inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="font-body text-body-sm text-slate-700 leading-relaxed">
                      Business-focused delivery model
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Full-width Tech Partners */}
        <div className="animate-slide-in-right mt-9 sm:mt-10">
          <p className="font-heading font-700 text-sm sm:text-base md:text-lg text-foreground-muted uppercase tracking-[0.14em] text-center mb-5">
            Technology Partners
          </p>
          <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden px-6 sm:px-8 lg:px-10">
            <div
              className="flex items-center w-max"
              style={{ animation: 'tech-partners-rtl 22s linear infinite' }}
            >
              {[0, 1, 2].map((copy) =>
              <div
                key={copy}
                className="flex items-center gap-3 pr-3 flex-shrink-0"
                aria-hidden={copy > 0}
              >
                  {techPartners.map((partner) =>
                  <div
                    key={`${copy}-${partner.name}`}
                    className="flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 bg-background-muted border border-border rounded-xl hover:border-primary/30 hover:bg-primary-50 transition-all duration-200">
                    
                      <BrandIcon name={partner.icon} size={18} />
                      <span className="font-body text-body-base text-foreground-secondary">{partner.name}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

