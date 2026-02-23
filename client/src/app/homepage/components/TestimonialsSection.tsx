'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
{
  id: 1,
  quote: "Intellisys IT delivered our entire e-commerce platform in 8 weeks - ahead of schedule and under budget. The code quality was exceptional and their team felt like an extension of our own.",
  author: "Priya Mehta",
  role: "CTO",
  company: "ShopKart India Pvt. Ltd.",
  location: "Bengaluru",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd12b7c4-1770812045708.png",
  rating: 5,
  metric: "8 weeks",
  metricLabel: "delivery"
},
{
  id: 2,
  quote: "We moved our entire infrastructure to AWS with Intellisys's help. Zero downtime migration, 40% cost reduction, and our platform now handles 10x the traffic. Outstanding work.",
  author: "Arjun Sharma",
  role: "VP Engineering",
  company: "FinBridge Technologies",
  location: "Mumbai",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e1073bc1-1767880718853.png",
  rating: 5,
  metric: "40%",
  metricLabel: "cost reduction"
},
{
  id: 3,
  quote: "The mobile app they built for us has a 4.8 star rating on both app stores with 50,000+ downloads. Their UI/UX team really understands what users want. Highly recommended.",
  author: "Sneha Krishnan",
  role: "Product Manager",
  company: "HealthPulse Solutions",
  location: "Chennai",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_102b90abe-1770960125698.png",
  rating: 5,
  metric: "4.8 *",
  metricLabel: "app store rating"
}];


export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setIsVisible(true);},
      { threshold: 0.2 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials?.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const active = testimonials?.[activeIndex];

  return (
    <section
      className="section-padding bg-background-dark relative overflow-hidden"
      ref={sectionRef}>
      
      {/* Background */}
      <div className="absolute inset-0 hero-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial-blue opacity-30 pointer-events-none" />
      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-16"><h2 className="font-heading font-800 text-display-md text-white">
            Trusted by{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60A5FA 0%, #38BDF8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
              
              Industry Leaders
            </span>
          </h2>
        </div>

        {/* Main Testimonial Card */}
        <div
          className={`max-w-4xl mx-auto ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          
          <div className="bg-gradient-to-br from-white/8 to-white/3 rounded-4xl border border-white/10 backdrop-blur-xl p-8 md:p-12 shadow-dark-xl">
            {/* Quote Icon */}
            <div className="w-14 h-14 bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-center mb-8">
              <Icon name="ChatBubbleBottomCenterTextIcon" size={24} className="text-primary-light" />
            </div>

            {/* Quote */}
            <blockquote className="font-heading font-500 text-display-sm text-white/90 leading-relaxed mb-10 italic">
              "{active?.quote}"
            </blockquote>

            {/* Author Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/20 flex-shrink-0">
                  <AppImage
                    src={active?.avatar}
                    alt={`${active?.author}, ${active?.role} at ${active?.company}`}
                    className="w-full h-full object-cover" />
                  
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: active?.rating })?.map((_, i) =>
                    <Icon key={i} name="StarIcon" size={14} className="text-accent" variant="solid" />
                    )}
                  </div>
                  <p className="font-heading font-700 text-heading-lg text-white">{active?.author}</p>
                  <p className="font-body text-body-sm text-white/50">
                    {active?.role}, {active?.company}
                  </p>
                  <p className="font-body text-caption text-white/30">{active?.location}</p>
                </div>
              </div>

              {/* Metric */}
              <div className="text-right">
                <div className="font-heading font-900 text-display-lg text-white">{active?.metric}</div>
                <div className="font-body text-caption text-white/40 uppercase tracking-wider">{active?.metricLabel}</div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials?.map((_, i) =>
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full ${
              i === activeIndex ?
              'w-8 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'}`
              }
              aria-label={`View testimonial ${i + 1}`} />

            )}
          </div>
        </div>

        {/* Client Logos Strip */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <p className="text-center font-body text-caption text-white/30 uppercase tracking-widest mb-8">
            Trusted by companies across India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {['Tata Consultancy', 'Infosys', 'Wipro', 'HCL Tech', 'Tech Mahindra', 'Persistent']?.map((company) =>
            <span key={company} className="font-heading font-700 text-heading-lg text-white tracking-tight">
                {company}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>);

}
