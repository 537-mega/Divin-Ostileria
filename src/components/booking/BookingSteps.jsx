import React from 'react';
import { CalendarDays, Clock, Users } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const ICONS = [Users, CalendarDays, Clock];

export default function BookingSteps({ step, labels }) {
  const { t } = useLang();

  return (
    <div>
      <p className="eyebrow">{t('booking.stepOf', { n: step + 1 })}</p>
      <ol className="mt-5 grid grid-cols-3 gap-3">
        {labels.map((label, index) => {
          const Icon = ICONS[index];
          const done = index < step;
          const current = index === step;
          return (
            <li key={label} className="flex flex-col gap-2">
              <span
                className={cn(
                  'h-[3px] w-full rounded-full transition-colors',
                  done || current ? 'bg-primary' : 'bg-border',
                )}
              />
              <span
                className={cn(
                  'flex items-center gap-2 text-xs transition-colors sm:text-sm',
                  current ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}