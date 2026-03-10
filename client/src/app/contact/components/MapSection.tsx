'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function MapSection() {
  const mapLink = 'https://maps.app.goo.gl/eFdceVnpjysspftaA';
  const mapEmbedUrl = 'https://www.google.com/maps?q=18.5946784,73.7095365&z=16&output=embed';
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const hasOfficialDarkMap = Boolean(googleMapsApiKey);

  useEffect(() => {
    if (!hasOfficialDarkMap || !mapRef.current) return;

    let disposed = false;

    const loadMap = async () => {
      if (!(window as any).google?.maps) {
        await new Promise<void>((resolve, reject) => {
          const existingScript = document.querySelector(
            'script[data-google-maps-loader="true"]'
          ) as HTMLScriptElement | null;

          if (existingScript) {
            existingScript.addEventListener('load', () => resolve(), { once: true });
            existingScript.addEventListener('error', () => reject(new Error('Google Maps script failed to load')), {
              once: true,
            });
            return;
          }

          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=weekly`;
          script.async = true;
          script.defer = true;
          script.dataset.googleMapsLoader = 'true';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Google Maps script failed to load'));
          document.head.appendChild(script);
        });
      }

      if (disposed || !mapRef.current) return;

      const mapsLib = (await (window as any).google.maps.importLibrary('maps')) as any;
      const coreLib = (await (window as any).google.maps.importLibrary('core')) as any;

      const map = new mapsLib.Map(mapRef.current, {
        center: { lat: 18.5946784, lng: 73.7095365 },
        zoom: 16,
        mapTypeId: 'roadmap',
        colorScheme: coreLib.ColorScheme.DARK,
        disableDefaultUI: true,
        clickableIcons: false,
        gestureHandling: 'greedy',
      });

      new (window as any).google.maps.Marker({
        position: { lat: 18.5946784, lng: 73.7095365 },
        map,
        title: 'Intellisys IT Solutions',
      });
    };

    loadMap().catch((error) => {
      console.error('Failed to initialize official Google dark mode map:', error);
    });

    return () => {
      disposed = true;
    };
  }, [googleMapsApiKey, hasOfficialDarkMap]);

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

        <div className="relative rounded-3xl overflow-hidden border border-border shadow-lg-card h-[320px] sm:h-[400px] bg-background-muted">
          {hasOfficialDarkMap ? (
            <div
              ref={mapRef}
              className="absolute inset-0 w-full h-full"
              aria-label="Google map in official dark mode"
            />
          ) : (
            <iframe
              title="Intellisys IT Solutions location map"
              src={mapEmbedUrl}
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}

          <div className="absolute top-3 left-3 right-3 sm:top-4 sm:right-4 sm:left-auto z-10 bg-white/95 backdrop-blur-sm rounded-2xl border border-border shadow-xl-card px-4 sm:px-6 py-4 text-left max-w-none sm:max-w-sm">
            <p className="font-heading font-800 text-heading-lg sm:text-heading-xl text-foreground">Intellisys IT Solutions</p>
            <p className="font-body text-body-sm text-foreground-secondary mt-1">Pune, Maharashtra</p>
            <p className="hidden sm:block font-body text-body-sm text-foreground-secondary mt-2">
              Gera Imperim Rise, 328-B, Wipro Circle,
              <br />
              Opp. to Wipro Company, Hinjawadi Phase II,
              <br />
              Hinjawadi Rajiv Gandhi Infotech Park,
              <br />
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

          {!hasOfficialDarkMap && (
            <div className="absolute left-3 bottom-3 z-10 rounded-lg bg-black/75 text-white text-[11px] font-body px-3 py-2">
              Add <code className="font-mono">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to enable official Google dark mode.
            </div>
          )}
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
