import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Phone, Clock } from 'lucide-react';
import { useLang, LANGUAGES } from '@/lib/i18n';
import { VENUE, ROME_TIME } from '@/data/site';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV = [
  { to: '/', key: 'nav.home' },
  { to: '/menu', key: 'nav.menu' },
  { to: '/booking', key: 'nav.booking' },
  { to: '/contact', key: 'nav.contact' },
];

export function LanguageSwitch({ className }) {
  const { lang, setLang, t } = useLang();
  return (
    <div className={cn('flex items-center gap-1.5 font-body text-xs tracking-[0.16em]', className)} aria-label={t('nav.language')}>
      {LANGUAGES.map((language, index) => (
        <React.Fragment key={language.code}>
          {index > 0 && <span className="text-border">/</span>}
          <button
            type="button"
            onClick={() => setLang(language.code)}
            aria-label={language.name}
            className={cn(
              'px-0.5 py-1 transition-colors',
              lang === language.code
                ? 'text-primary underline decoration-accent decoration-2 underline-offset-[6px]'
                : 'text-muted-foreground hover:text-primary',
            )}
          >
            {language.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [romeTime, setRomeTime] = useState(ROME_TIME());

  const toggleMenu = () => {
    if (!open) setRomeTime(ROME_TIME());
    setOpen((value) => !value);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link to="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-[1.6rem] font-normal tracking-[0.01em] text-primary md:text-[1.75rem]">
            Divin Ostilia
          </span>
          <span className="mt-1 text-[0.5rem] uppercase tracking-[0.34em] text-muted-foreground">
            Wine Bar · Roma
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'relative font-body text-sm transition-colors',
                pathname === item.to ? 'text-primary' : 'text-foreground/75 hover:text-primary',
              )}
            >
              {t(item.key)}
              {pathname === item.to && (
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LanguageSwitch className="hidden sm:flex" />
          <a
            href={VENUE.phoneHref}
            className="hidden items-center gap-2 font-body text-xs text-muted-foreground transition-colors hover:text-primary lg:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {VENUE.phone}
          </a>
          <Button asChild size="sm" className="hidden rounded-full px-5 md:inline-flex">
            <Link to="/booking">{t('nav.reserve')}</Link>
          </Button>
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background px-5 pb-8 pt-6 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  'border-b border-border/50 py-3.5 font-display text-2xl transition-colors',
                  pathname === item.to ? 'text-primary' : 'text-foreground hover:text-primary',
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <Button asChild size="lg" className="mt-6 w-full rounded-full">
            <Link to="/booking" onClick={() => setOpen(false)}>
              {t('nav.reserve')}
            </Link>
          </Button>
          <div className="mt-6 flex items-center justify-between">
            <a href={VENUE.phoneHref} className="inline-flex items-center gap-2 text-sm text-primary">
              <Phone className="h-4 w-4" />
              {VENUE.phone}
            </a>
            <LanguageSwitch />
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {t('nav.romeTime')} · {romeTime}
          </p>
        </div>
      )}
    </header>
  );
}