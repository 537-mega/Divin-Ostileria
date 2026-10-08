import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { VENUE, HOURS } from '@/data/site';

const NAV = [
  { to: '/', key: 'nav.home' },
  { to: '/menu', key: 'nav.menu' },
  { to: '/booking', key: 'nav.booking' },
  { to: '/contact', key: 'nav.contact' },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr] md:gap-10">
          <div>
            <p className="font-display text-3xl leading-none">Divin Ostilia</p>
            <p className="mt-3 text-[0.6rem] uppercase tracking-[0.34em] text-primary-foreground/60">
              Wine Bar · Rione Celio · Roma
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
              {t('hero.walk')}
            </p>
          </div>

          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-primary-foreground/55">
              {t('footer.visit')}
            </p>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={VENUE.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-start gap-2 text-primary-foreground/85 transition-colors hover:text-primary-foreground"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {VENUE.street}
                    <br />
                    {VENUE.city}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={VENUE.phoneHref}
                  className="inline-flex items-center gap-2 text-primary-foreground/85 transition-colors hover:text-primary-foreground"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  {VENUE.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-primary-foreground/55">
              {t('footer.hours')}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/85">
              {HOURS.map((row) => (
                <li key={row.key} className="flex justify-between gap-4">
                  <span>{t(row.key)}</span>
                  <span className="text-primary-foreground">{row.time}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-7 space-y-2 text-sm">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer.legal')}</p>
          <div className="flex items-center gap-6">
            <a
              href={VENUE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-primary-foreground"
            >
              {t('footer.map')}
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <Link to="/staff" className="transition-colors hover:text-primary-foreground">
              {t('nav.staff')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}