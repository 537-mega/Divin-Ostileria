import React, { useCallback, useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { dayAvailability, createReservation } from '@/lib/availability';
import BookingSteps from '@/components/booking/BookingSteps';
import PartyStep from '@/components/booking/PartyStep';
import SlotsStep from '@/components/booking/SlotsStep';
import DetailsStep from '@/components/booking/DetailsStep';
import SuccessPanel from '@/components/booking/SuccessPanel';
import { todayISO } from '@/data/site';

export default function Booking() {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState(null);

  const loadSlots = useCallback(async (day) => {
    setLoadingSlots(true);
    try {
      setSlots(await dayAvailability(day));
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (step === 1) loadSlots(date);
  }, [step, date, loadSlots]);

  const setField = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  const submit = async () => {
    setError('');
    if (!form.name.trim() || !form.email.trim()) {
      setError(t('booking.required'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError(t('booking.emailInvalid'));
      return;
    }
    if (!form.phone.trim()) {
      setError(t('booking.phoneInvalid'));
      return;
    }

    setSubmitting(true);
    try {
      const result = await createReservation({ date, time, guests, ...form });
      if (result.error === 'unavailable') {
        setSlots(result.slots || null);
        setTime('');
        setError(t('booking.taken'));
        setStep(1);
        return;
      }
      setBooking(result.booking);
      setStep(3);
    } catch (submitError) {
      setError(t('booking.failed'));
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setBooking(null);
    setTime('');
    setSlots(null);
    setForm({ name: '', email: '', phone: '', notes: '' });
    setError('');
    setStep(0);
  };

  const labels = [t('booking.step1'), t('booking.step2'), t('booking.step3')];

  return (
    <div>
      <section className="border-b border-border/60 bg-secondary/60">
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
          <p className="eyebrow">{t('booking.eyebrow')}</p>
          <h1 className="display mt-4 text-[2.3rem] text-primary sm:text-5xl">{t('booking.title')}</h1>
          <p className="mt-5 max-w-xl text-muted-foreground">{t('booking.text')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_24px_60px_-45px_rgba(128,0,32,0.5)] sm:p-9 md:p-11">
          {step < 3 && <BookingSteps step={step} labels={labels} />}

          <div className="mt-9">
            {step === 0 && (
              <PartyStep
                guests={guests}
                setGuests={setGuests}
                date={date}
                setDate={setDate}
                onNext={() => {
                  setTime('');
                  setError('');
                  setStep(1);
                }}
              />
            )}

            {step === 1 && (
              <SlotsStep
                slots={slots}
                loading={loadingSlots}
                guests={guests}
                time={time}
                setTime={setTime}
                onBack={() => setStep(0)}
                onNext={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <DetailsStep
                form={form}
                setField={setField}
                date={date}
                time={time}
                guests={guests}
                onSubmit={submit}
                submitting={submitting}
                error={error}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && booking && <SuccessPanel booking={booking} onReset={reset} />}
          </div>
        </div>
      </div>
    </div>
  );
}