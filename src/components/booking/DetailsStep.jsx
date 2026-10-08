import React from 'react';
import { format, parseISO } from 'date-fns';
import { it as itLocale } from 'date-fns/locale';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { slotLabel } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function DetailsStep({ form, setField, date, time, guests, onSubmit, submitting, error, onBack }) {
  const { t, lang } = useLang();
  const locale = lang === 'it' ? itLocale : undefined;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <h2 className="display text-[1.7rem] text-primary sm:text-[2rem]">{t('booking.step3')}</h2>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
        <span>{format(parseISO(date), 'EEEE d MMMM', { locale })}</span>
        <span>{slotLabel(time)}</span>
        <span>
          {guests} {t('booking.people')}
        </span>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="booking-name">{t('booking.name')}</Label>
          <Input
            id="booking-name"
            value={form.name}
            onChange={(event) => setField('name', event.target.value)}
            placeholder={t('booking.namePh')}
            className="mt-2 h-11 bg-card"
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor="booking-email">{t('booking.email')}</Label>
          <Input
            id="booking-email"
            type="email"
            value={form.email}
            onChange={(event) => setField('email', event.target.value)}
            placeholder="you@email.com"
            className="mt-2 h-11 bg-card"
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="booking-phone">{t('booking.phone')}</Label>
          <Input
            id="booking-phone"
            value={form.phone}
            onChange={(event) => setField('phone', event.target.value)}
            placeholder={t('booking.phonePh')}
            className="mt-2 h-11 bg-card"
            autoComplete="tel"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="booking-notes">{t('booking.notes')}</Label>
          <Textarea
            id="booking-notes"
            value={form.notes}
            onChange={(event) => setField('notes', event.target.value)}
            placeholder={t('booking.notesHint')}
            className="mt-2 bg-card"
            rows={3}
          />
        </div>
      </div>

      {error && (
        <p className="mt-6 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
      )}

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Button
          type="button"
          variant="ghost"
          className="rounded-full px-5 text-muted-foreground"
          onClick={onBack}
          disabled={submitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('booking.back')}
        </Button>
        <Button type="submit" size="lg" className="rounded-full px-8" disabled={submitting}>
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitting ? t('booking.submitting') : t('booking.submit')}
        </Button>
      </div>
    </form>
  );
}