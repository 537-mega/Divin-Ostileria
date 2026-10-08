const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { X } from 'lucide-react';

import { useLang } from '@/lib/i18n';
import { CLOSED_ALL } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ClosurePanel({ date, closures, slots, onChanged }) {
  const { t } = useLang();
  const [time, setTime] = useState(CLOSED_ALL);
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);

  const add = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await db.entities.Closure.create({ date, time, reason });
      setReason('');
      onChanged();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    setSaving(true);
    try {
      await db.entities.Closure.delete(id);
      onChanged();
    } finally {
      setSaving(false);
    }
  };

  const label = (closure) => (closure.time === CLOSED_ALL ? t('staff.allDay') : closure.time);

  return (
    <section className="rounded-[1.5rem] border border-border bg-card p-6 md:p-7">
      <h2 className="display text-2xl text-primary">{t('staff.closuresTitle')}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t('staff.closuresText')}</p>

      {closures.length > 0 && (
        <ul className="mt-6 space-y-2">
          {closures.map((closure) => (
            <li
              key={closure.id}
              className="flex items-center justify-between gap-4 rounded-lg bg-secondary/70 px-4 py-3"
            >
              <span className="min-w-0 text-sm text-foreground">
                <span className="font-display text-lg text-primary">{label(closure)}</span>
                {closure.reason && <span className="ml-3 text-xs text-muted-foreground">{closure.reason}</span>}
              </span>
              <button
                type="button"
                onClick={() => remove(closure.id)}
                disabled={saving}
                aria-label={t('staff.remove')}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={add} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="closure-time">{t('staff.time')}</Label>
          <select
            id="closure-time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value={CLOSED_ALL}>{t('staff.allDay')}</option>
            {slots.map((slot) => (
              <option key={slot.time} value={slot.time}>
                {slot.time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="closure-reason">{t('staff.reason')}</Label>
          <Input
            id="closure-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder={t('staff.reasonPh')}
            className="mt-2 h-10"
          />
        </div>
        <Button type="submit" variant="outline" className="w-full rounded-full" disabled={saving}>
          {t('staff.addClosure')}
        </Button>
      </form>
    </section>
  );
}