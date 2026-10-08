import React from 'react';
import { format, parseISO } from 'date-fns';
import { it as itLocale } from 'date-fns/locale';
import { useLang } from '@/lib/i18n';
import { MAX_PARTY, addDaysISO, todayISO } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function PartyStep({ guests, setGuests, date, setDate, onNext }) {
  const { t, lang } = useLang();
  const locale = lang === 'it' ? itLocale : undefined;
  const quickDays = [0, 1, 2, 3].map((offset) => addDaysISO(offset));

  const label = (iso, offset) => {
    if (offset === 0) return t('staff.today');
    return format(parseISO(iso), 'EEE d MMM', { locale });
  };

  return (
    <div>
      <h2 className="display text-[1.7rem] text-primary sm:text-[2rem]">{t('booking.guestsTitle')}</h2>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {Array.from({ length: MAX_PARTY }, (_, i) => i + 1).map((count) => (
          <button
            key={count}
            type="button"
            onClick={() => setGuests(count)}
            className={cn(
              'h-12 w-12 rounded-full border font-body text-sm transition-colors',
              guests === count
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-foreground hover:border-primary hover:text-primary',
            )}
          >
            {count}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{t('booking.guestsNote')}</p>

      <div className="mt-10">
        <h2 className="display text-[1.7rem] text-primary sm:text-[2rem]">{t('booking.dateTitle')}</h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {quickDays.map((iso, index) => (
            <button
              key={iso}
              type="button"
              onClick={() => setDate(iso)}
              className={cn(
                'rounded-full border px-4 py-2.5 text-sm transition-colors',
                date === iso
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-foreground hover:border-primary hover:text-primary',
              )}
            >
              {label(iso, index)}
            </button>
          ))}
        </div>

        <div className="mt-5 max-w-xs">
          <Label htmlFor="booking-date" className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {t('staff.date')}
          </Label>
          <input
            id="booking-date"
            type="date"
            value={date}
            min={todayISO()}
            max={addDaysISO(60)}
            onChange={(event) => setDate(event.target.value)}
            className="mt-2 flex h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <Button size="lg" className="rounded-full px-8" disabled={!date} onClick={onNext}>
          {t('booking.continue')}
        </Button>
      </div>
    </div>
  );
}