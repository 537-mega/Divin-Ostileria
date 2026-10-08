import React from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { slotLabel, SEAT_CAP } from '@/data/site';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SlotsStep({ slots, loading, guests, time, setTime, onBack, onNext }) {
  const { t } = useLang();
  const list = slots || [];
  const anyAvailable = list.some((slot) => slot.available && slot.left >= guests);

  return (
    <div>
      <h2 className="display text-[1.7rem] text-primary sm:text-[2rem]">{t('booking.timeTitle')}</h2>
      <p className="mt-3 max-w-lg text-sm text-muted-foreground">{t('booking.timeNote')}</p>

      {loading && (
        <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t('booking.loading')}
        </p>
      )}

      {!loading && !anyAvailable && (
        <p className="mt-8 rounded-xl bg-secondary/70 p-5 text-sm text-foreground">{t('booking.none')}</p>
      )}

      {!loading && (
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
          {list.map((slot) => {
            const canFit = slot.available && slot.left >= guests;
            const selected = time === slot.time;
            return (
              <button
                key={slot.time}
                type="button"
                disabled={!canFit}
                onClick={() => setTime(slot.time)}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-xl border px-2 py-3.5 text-center transition-colors',
                  selected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : canFit
                      ? 'border-border text-foreground hover:border-primary hover:text-primary'
                      : 'cursor-not-allowed border-border bg-secondary/40 text-muted-foreground opacity-60',
                )}
              >
                <span className="font-body text-sm">{slotLabel(slot.time)}</span>
                {slot.closed ? (
                  <span className="text-[0.6rem] uppercase tracking-[0.12em]">{t('booking.closed')}</span>
                ) : slot.left < SEAT_CAP ? (
                  <span className={cn('text-[0.6rem]', selected ? 'text-primary-foreground/80' : 'text-accent')}>
                    {slot.left === 0 ? t('booking.full') : t('booking.seatsLeft', { n: slot.left })}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-10 flex items-center gap-4">
        <Button variant="ghost" className="rounded-full px-5 text-muted-foreground" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('booking.back')}
        </Button>
        <Button size="lg" className="rounded-full px-8" disabled={!time} onClick={onNext}>
          {t('booking.continue')}
        </Button>
      </div>
    </div>
  );
}