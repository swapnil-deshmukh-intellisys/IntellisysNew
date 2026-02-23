import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function MapSection() {
  const mapLink = 'https://maps.app.goo.gl/eFdceVnpjysspftaA';
  const mapEmbedUrl = 'https://www.google.com/maps?q=18.5946784,73.7095365&z=16&output=embed';

  return (
    <section className="section-padding bg-background relative">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-heading font-800 text-display-md text-foreground mb-3">
            Find Us in{' '}
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Pune
            </span>
          </h2>
          <p className="font-body text-body-lg text-foreground-secondary">
            Visit our office location on Google Maps.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-border shadow-lg-card h-[400px] bg-background-muted">
          <iframe
            title="Intellisys IT Solutions location map"
            src={mapEmbedUrl}
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-2xl border border-border shadow-xl-card px-6 py-4 text-left max-w-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="font-body text-caption text-success font-600">Open Now</span>
            </div>
            <p className="font-heading font-800 text-heading-xl text-foreground">Intellisys IT Solutions</p>
            <p className="font-body text-body-sm text-foreground-secondary mt-1">Pune, Maharashtra</p>
            <p className="font-body text-body-sm text-foreground-secondary mt-2">
              Gera Imperim Rise, 328-B, Wipro Circle,<br />
              Opp. to Wipro Company, Hinjawadi Phase II,<br />
              Hinjawadi Rajiv Gandhi Infotech Park,<br />
              Pune, Maharashtra 411057
            </p>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-primary font-heading font-600 text-body-sm hover:gap-2.5 transition-all duration-200"
            >
              Get Directions
              <Icon name="ArrowTopRightOnSquareIcon" size={12} />
            </a>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: 'BuildingOffice2Icon', label: 'Rajiv Gandhi Infotech Park, Hinjawadi', distance: 'Approx. 3 km' },
            { icon: 'AirplaneIcon', label: 'Pune International Airport (PNQ)', distance: 'Approx. 26 km' },
            { icon: 'BuildingLibraryIcon', label: 'Pune Junction Railway Station', distance: 'Approx. 20 km' },
            { icon: 'MapIcon', label: 'Shivajinagar (City Center)', distance: 'Approx. 17 km' },
          ].map((item) => (
            <div key={item.label} className="bg-background-card rounded-2xl border border-border p-4 shadow-sm-card">
              <Icon name={item.icon as any} size={18} className="text-primary mb-2" />
              <p className="font-heading font-600 text-body-sm text-foreground">{item.label}</p>
              <p className="font-body text-caption text-foreground-muted">{item.distance}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
