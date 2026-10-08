const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };


import { SLOTS, SEAT_CAP, CLOSED_ALL } from '@/data/site';

// Availability is derived from anonymous seat counters (SeatHold), never from guest details.
export async function dayAvailability(date) {
  const [holds, closures] = await Promise.all([
    db.entities.SeatHold.filter({ date }),
    db.entities.Closure.filter({ date }),
  ]);

  const taken = {};
  (holds || []).forEach((hold) => {
    taken[hold.time] = (taken[hold.time] || 0) + (Number(hold.seats) || 0);
  });

  const closedAll = (closures || []).some((c) => !c.time || c.time === CLOSED_ALL);

  return SLOTS.map((time) => {
    const closed = closedAll || (closures || []).some((c) => c.time === time);
    const left = Math.max(0, SEAT_CAP - (taken[time] || 0));
    return { time, left, closed, available: !closed && left > 0 };
  });
}

export async function createReservation({ date, time, guests, name, email, phone, notes, source = 'online' }) {
  const party = Number(guests);
  const slots = await dayAvailability(date);
  const slot = slots.find((s) => s.time === time);

  if (!slot || !slot.available || slot.left < party) {
    return { error: 'unavailable', slots };
  }

  const booking = await db.entities.Booking.create({
    date,
    time,
    guests: party,
    name,
    email: email || '',
    phone: phone || '',
    notes: notes || '',
    status: 'confirmed',
    source,
  });

  await db.entities.SeatHold.create({
    date,
    time,
    seats: party,
    booking_id: booking.id,
  });

  return { booking };
}

export async function cancelReservation(booking) {
  const holds = await db.entities.SeatHold.filter({ date: booking.date, booking_id: booking.id });
  await db.entities.Booking.update(booking.id, { status: 'cancelled' });
  await Promise.all((holds || []).map((hold) => db.entities.SeatHold.delete(hold.id)));
}