import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { createReservation } from '@/lib/availability';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function NewBookingForm({ slots, date, onChanged }) {
  const { t } = useLang();
  const open = (slots || []).filter((slot) => !slot.closed);
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    const slotTime = time || open[0]?.time;
    if (!name.trim()) {
      setError(t('staff.nameRequired'));
      return;
    }
    const slot = (slots || []).find((item) => item.time === slotTime);
    if (!slot || slot.closed || slot.left < Number(guests)) {
      setError(t('staff.unavailable'));
      return;
    }

    setSaving(true);
    try {
      const result = await createReservation({
        date,
        time: slotTime,
        guests: Number(guests),
        name,
        phone,
        email,
        notes,
        source: 'staff',
      });
      if (result.error) {
        setError(t('staff.unavailable'));
        return;
      }
      setName('');
      setPhone('');
      setEmail('');
      setNotes('');
      setGuests(2);
      setTime('');
      onChanged();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-[1.5rem] border border-border bg-card p-6 md:p-7">
      <h2 className="display text-2xl text-primary">{t('staff.newBooking')}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t('staff.newBookingText')}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="staff-time">{t('staff.time')}</Label>
          <select
            id="staff-time"
            value={time || open[0]?.time || ''}
            onChange={(event) => setTime(event.target.value)}
            className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {open.map((slot) => (
              <option key={slot.time} value={slot.time}>
                {slot.time} · {slot.left} {t('staff.guests').toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="staff-guests">{t('staff.guests')}</Label>
          <Input
            id="staff-guests"
            type="number"
            min={1}
            max={20}
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            className="mt-2 h-10"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="staff-name">{t('staff.name')}</Label>
          <Input
            id="staff-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 h-10"
          />
        </div>
        <div>
          <Label htmlFor="staff-phone">{t('staff.phone')}</Label>
          <Input
            id="staff-phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-2 h-10"
          />
        </div>
        <div>
          <Label htmlFor="staff-email">{t('staff.email')}</Label>
          <Input
            id="staff-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 h-10"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="staff-notes">{t('staff.notes')}</Label>
          <Input
            id="staff-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="mt-2 h-10"
          />
        </div>
      </div>

      {error && <p className="mt-5 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}

      <Button type="submit" className="mt-6 w-full rounded-full" disabled={saving || open.length === 0}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {saving ? t('staff.saving') : t('staff.save')}
      </Button>
    </form>
  );
}