import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { VENUE } from '@/data/site';
import { Button } from '@/components/ui/button';

export default function ClosingCta() {
  const { t } = useLang();

  return (
    <section className="bg-secondary/70 py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <h2 className="display text-[2.1rem] text-primary sm:text-4xl lg:text-[3rem]">{t('cta.title')}</h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">{t('cta.text')}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/booking">{t('hero.reserve')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-primary/25 px-8">
            <a href={VENUE.phoneHref}>
              <Phone className="mr-2 h-4 w-4" />
              {t('cta.call')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}