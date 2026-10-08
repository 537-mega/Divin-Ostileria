const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronLeft, ChevronRight, LogOut, Loader2 } from 'lucide-react';

import { useLang } from '@/lib/i18n';
import { cancelReservation } from '@/lib/availability';
import { SLOTS, SEAT_CAP, CLOSED_ALL, todayISO, addDaysISO } from '@/data/site';
import BookingBoard from '@/components/staff/BookingBoard';
import NewBookingForm from '@/components/staff/NewBookingForm';
import ClosurePanel from '@/components/staff/ClosurePanel';
import { Button } from '@/components/ui/button';
import { LanguageSwitch } from '@/components/Header';

export default function Staff() {
  const { t } = useLang();
  const [date, setDate] = useState(todayISO());
  const [bookings, setBookings] = useState([]);
  const [closures, setClosures] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [user, setUser] = useState(null);

  const load = useCallback(async (day) => {
    const [bookingList, holds, closureList] = await Promise.all([
      db.entities.Booking.filter({ date: day, status: 'confirmed' }, 'time', 200),
      db.entities.SeatHold.filter({ date: day }),
      db.entities.Closure.filter({ date: day }),
    ]);

    const taken = {};
    (holds || []).forEach((hold) => {
      taken[hold.time] = (taken[hold.time] || 0) + (Number(hold.seats) || 0);
    });

    const closedAll = (closureList || []).some((closure) => !closure.time || closure.time === CLOSED_ALL);

    setSlots(
      SLOTS.map((time) => {
        const closed = closedAll || (closureList || []).some((closure) => closure.time === time);
        const booked = taken[time] || 0;
        return { time, booked, closed, left: Math.max(0, SEAT_CAP - booked) };
      }),
    );
    setBookings(bookingList || []);
    setClosures(closureList || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    load(date);
  }, [date, load]);

  useEffect(() => {
    const refresh = () => load(date);
    const unsubBookings = db.entities.Booking.subscribe(refresh);
    const unsubHolds = db.entities.SeatHold.subscribe(refresh);
    return () => {
      unsubBookings();
      unsubHolds();
    };
  }, [date, load]);

  useEffect(() => {
    db.auth
      .me()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const cancel = async (booking) => {
    setBusyId(booking.id);
    try {
      await cancelReservation(booking);
      await load(date);
    } finally {
      setBusyId(null);
    }
  };

  const totalGuests = bookings.reduce((sum, booking) => sum + (Number(booking.guests) || 0), 0);

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div>
            <p className="font-display text-xl text-primary">{t('staff.title')}</p>
            <p className="text-xs text-muted-foreground">{t('staff.text')}</p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitch />
            <Button asChild variant="ghost" size="sm" className="rounded-full text-muted-foreground">
              <Link to="/">{t('staff.backToSite')}</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border text-muted-foreground"
              onClick={() => db.auth.logout('/')}
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              {t('staff.signout')}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setDate(addDaysISO(-1))}
            aria-label={t('staff.prev')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              aria-label={t('staff.date')}
              className="h-10 rounded-full border border-border bg-background pl-10 pr-4 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <button
            type="button"
            onClick={() => setDate(addDaysISO(1))}
            aria-label={t('staff.next')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-primary"
            onClick={() => setDate(todayISO())}
          >
            {t('staff.today')}
          </Button>

          <div className="ml-auto flex items-center gap-6 text-right">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                {t('staff.totalTables')}
              </p>
              <p className="font-display text-2xl text-primary">{bookings.length}</p>
            </div>
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                {t('staff.totalGuests')}
              </p>
              <p className="font-display text-2xl text-primary">{totalGuests}</p>
            </div>
            {user?.email && (
              <p className="hidden text-xs text-muted-foreground lg:block">{user.email}</p>
            )}
          </div>
        </div>

        {loading ? (
          <p className="mt-12 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t('staff.loading')}
          </p>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
            <BookingBoard bookings={bookings} slots={slots} onCancel={cancel} busyId={busyId} />
            <div className="space-y-6">
              <NewBookingForm slots={slots} date={date} onChanged={() => load(date)} />
              <ClosurePanel date={date} closures={closures} slots={slots} onChanged={() => load(date)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}