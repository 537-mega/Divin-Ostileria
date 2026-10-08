import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { it as itLocale } from 'date-fns/locale';
import { Check } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { VENUE, slotLabel } from '@/data/site';
import { Button } from '@/components/ui/button';

export default function SuccessPanel({ booking, onReset }) {
  const { t, lang } = useLang();
  const locale = lang === 'it' ? itLocale : undefined;

  const rows = [
    { label: t('booking.date'), value: format(parseISO(booking.date), 'EEEE d MMMM yyyy', { locale }) },
    { label: t('booking.time'), value: slotLabel(booking.time) },
    { label: t('booking.people'), value: String(booking.guests) },
    { label: t('booking.name'), value: booking.name },
  ];

  return (
    <div>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check className="h-6 w-6" />
      </span>
      <h2 className="display mt-6 text-[1.9rem] text-primary sm:text-[2.4rem]">{t('booking.successTitle')}</h2>
      <p className="mt-4 max-w-lg text-muted-foreground">{t('booking.successText')}</p>

      <dl className="mt-9 divide-y divide-border border-y border-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-6 py-3.5">
            <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{row.label}</dt>
            <dd className="text-right font-body text-sm text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Button size="lg" className="rounded-full px-8" onClick={onReset}>
          {t('booking.another')}
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full border-primary/25 px-8">
          <Link to="/menu">{t('booking.seeMenu')}</Link>
        </Button>
      </div>

      <p className="mt-7 text-sm text-muted-foreground">
        {t('booking.callUs')} ·{' '}
        <a href={VENUE.phoneHref} className="text-primary underline underline-offset-4">
          {VENUE.phone}
        </a>
      </p>
    </div>
  );
}