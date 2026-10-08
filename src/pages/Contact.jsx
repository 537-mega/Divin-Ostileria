import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Footprints, Train, Bus, Navigation } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { VENUE, HOURS } from '@/data/site';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/Reveal';

export default function Contact() {
  const { t } = useLang();

  const howToGet = [
    { icon: Footprints, text: t('contact.how1') },
    { icon: Train, text: t('contact.how2') },
    { icon: Bus, text: t('contact.how3') },
  ];

  return (
    <div>
      <section className="border-b border-border/60 bg-secondary/60">
        <Reveal>
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h1 className="display mt-4 text-[2.4rem] text-primary sm:text-5xl lg:text-[3.4rem]">
            {t('contact.title')}
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">{t('contact.text')}</p>
        </div>
        </Reveal>
      </section>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <dl className="space-y-9">
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {t('contact.addressTitle')}
                </dt>
                <dd className="mt-2 font-display text-2xl text-foreground">{VENUE.street}</dd>
                <dd className="text-sm text-muted-foreground">{VENUE.city}</dd>
                <dd className="mt-3">
                  <a
                    href={VENUE.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary underline underline-offset-4"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    {t('contact.maps')}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {t('contact.phoneTitle')}
                </dt>
                <dd className="mt-2">
                  <a href={VENUE.phoneHref} className="font-display text-2xl text-primary">
                    {VENUE.phone}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <div className="flex-1">
                <dt className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {t('contact.hoursTitle')}
                </dt>
                <dd className="mt-3 max-w-sm space-y-2.5">
                  {HOURS.map((row) => (
                    <span key={row.key} className="flex justify-between gap-6 border-b border-dashed border-border pb-2 text-sm text-foreground">
                      <span>{t(row.key)}</span>
                      <span className="text-primary">{row.time}</span>
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-12 rounded-2xl bg-secondary/70 p-6">
            <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
              {t('contact.howTitle')}
            </p>
            <ul className="mt-5 space-y-4">
              {howToGet.map((row) => (
                <li key={row.text} className="flex gap-3 text-sm text-foreground">
                  <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {row.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/booking">{t('contact.book')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-primary/25 px-8">
              <a href={VENUE.phoneHref}>
                <Phone className="mr-2 h-4 w-4" />
                {t('contact.call')}
              </a>
            </Button>
          </div>
        </div>

        <div className="min-h-[380px] overflow-hidden rounded-[1.75rem] border border-border lg:min-h-[520px]">
          <iframe
            title={t('contact.mapTitle')}
            src={VENUE.embedUrl}
            className="h-full min-h-[380px] w-full lg:min-h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}