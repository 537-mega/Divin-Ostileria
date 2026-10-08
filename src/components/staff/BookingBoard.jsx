import React from 'react';
import { Phone, Mail, StickyNote } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function BookingBoard({ bookings, slots, onCancel, busyId }) {
  const { t } = useLang();

  const used = (slots || []).filter((slot) => slot.booked > 0 || slot.closed);

  return (
    <section className="rounded-[1.5rem] border border-border bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="display text-2xl text-primary">{t('staff.boardTitle')}</h2>
        <p className="text-xs text-muted-foreground">
          {bookings.length} {t('staff.totalTables').toLowerCase()}
        </p>
      </div>

      {used.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {used.map((slot) => (
            <span
              key={slot.time}
              className={cn(
                'rounded-full px-3 py-1.5 font-body text-[0.7rem]',
                slot.closed ? 'bg-secondary text-muted-foreground' : 'bg-primary/10 text-primary',
              )}
            >
              {slot.time} ·{' '}
              {slot.closed ? t('staff.closed') : t('staff.slotUsage', { booked: slot.booked, cap: slot.left + slot.booked })}
            </span>
          ))}
        </div>
      )}

      {bookings.length === 0 ? (
        <p className="mt-8 rounded-xl bg-secondary/60 p-5 text-sm text-muted-foreground">{t('staff.empty')}</p>
      ) : (
        <ul className="mt-8 divide-y divide-border">
          {bookings.map((booking) => (
            <li key={booking.id} className="flex flex-wrap items-start justify-between gap-5 py-5">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl text-primary">{booking.time}</span>
                  <span className="text-sm text-foreground">{booking.name}</span>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {booking.source === 'staff' ? t('staff.byStaff') : t('staff.online')}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {booking.guests} {t('staff.guests').toLowerCase()}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  {booking.phone && (
                    <a href={`tel:${booking.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                      <Phone className="h-3.5 w-3.5" />
                      {booking.phone}
                    </a>
                  )}
                  {booking.email && (
                    <a href={`mailto:${booking.email}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                      <Mail className="h-3.5 w-3.5" />
                      {booking.email}
                    </a>
                  )}
                </div>
                {booking.notes && (
                  <p className="mt-2 inline-flex items-start gap-1.5 text-xs text-foreground/80">
                    <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {booking.notes}
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                disabled={busyId === booking.id}
                onClick={() => onCancel(booking)}
              >
                {busyId === booking.id ? t('staff.cancelling') : t('staff.cancel')}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}