import React from 'react';
import { useLang } from '@/lib/i18n';
import { REVIEWS, TA_RATING, TA_COUNT, GOOGLE_RATING, GOOGLE_COUNT, REVIEWS_TOTAL } from '@/data/site';
import { Star, Award } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { cn } from '@/lib/utils';

function Stars({ n, className }) {
  return (
    <div className={cn('flex gap-0.5', className)} aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) =>
      <Star
        key={i}
        className={cn("h-4 w-4 lucide", i < n ? 'fill-accent text-accent' : 'fill-muted text-muted-foreground/40')} />

      )}
    </div>);

}

function SourceCard({ label, rating, count }) {
  const { t } = useLang();
  return (
    <div className="rounded-2xl border border-border bg-card p-5 text-left">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <div className="mt-3 flex items-baseline gap-2.5">
        <span className="font-display text-3xl text-primary">{rating}</span>
        <Stars n={Math.round(rating)} />
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">{t('rev.basedOn', { n: count })}</p>
    </div>);

}

export default function Reviews() {
  const { t, lang } = useLang();
  const avg = ((TA_RATING + GOOGLE_RATING) / 2).toFixed(1);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={t('rev.eyebrow')} title={t('rev.title')} align="center" />

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-border bg-secondary/40 p-8 text-center sm:p-12">
          <Stars n={Math.round(parseFloat(avg))} className="justify-center" />
          <p className="mt-4 font-display text-5xl text-primary sm:text-6xl hidden">{avg}</p>
          <p className="mt-2 text-sm text-muted-foreground hidden">{t('rev.basedOn', { n: REVIEWS_TOTAL })}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <SourceCard label="TripAdvisor" rating={TA_RATING} count={TA_COUNT} />
            <SourceCard label="Google" rating={GOOGLE_RATING} count={GOOGLE_COUNT} />
          </div>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2">
            <Award className="h-4 w-4 text-accent" />
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">
              {t('rev.travellers')}
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) =>
          <article
            key={i}
            className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
            
              <div className="flex items-center justify-between">
                <Stars n={r.rating} />
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-secondary-foreground">
                  {r.source}
                </span>
              </div>
              <p className="mt-4 font-display text-5xl leading-none text-accent/30">“</p>
              <p className="-mt-3 text-sm leading-relaxed text-foreground">{r.text[lang]}</p>
              <p className="mt-4 text-xs font-medium text-muted-foreground">— {r.author}</p>
            </article>
          )}
        </div>
      </div>
    </section>);

}