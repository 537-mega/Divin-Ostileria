import React from 'react';
import { useLang } from '@/lib/i18n';
import { SIGNATURES } from '@/data/site';
import SectionHeading from '@/components/SectionHeading';
import { Image } from '@/components/ui/image';

export default function Signatures() {
  const { t } = useLang();

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={t('sig.eyebrow')} title={t('sig.title')} />

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {SIGNATURES.map((card) => (
            <article key={card.key} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
                <Image
                  src={card.image}
                  alt={card.alt}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  fittingType="fill"
                />
              </div>
              <h3 className="mt-6 font-display text-2xl text-primary">{t(`sig.${card.key}.title`)}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{t(`sig.${card.key}.text`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}