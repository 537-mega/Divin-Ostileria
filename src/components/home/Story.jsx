const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { useLang } from '@/lib/i18n';
import { IMAGES } from '@/data/site';
import { Image } from '@/components/ui/image';

export default function Story() {
  const { t } = useLang();

  const facts = [
  { label: t('story.fact1Label'), value: t('story.fact1') },
  { label: t('story.fact2Label'), value: t('story.fact2') },
  { label: t('story.fact3Label'), value: t('story.fact3') }];

  return (
    <section className="bg-secondary/70 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:gap-20 md:px-8">
        <div className="order-2 md:order-1">
          <p className="eyebrow">{t('story.eyebrow')}</p>
          <h2 className="display mt-4 text-[2.1rem] text-primary sm:text-4xl lg:text-[3rem]">
            {t('story.title')}
          </h2>
          <p className="mt-6 text-muted-foreground">{t('story.p1')}</p>
          <p className="mt-5 text-muted-foreground">{t('story.p2')}</p>

          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
            {facts.map((fact) =>
            <div key={fact.label}>
                <dt className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-display text-xl text-primary">{fact.value}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="order-1 md:order-2">
          <div className="aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src="https://media.db.com/images/public/6ac6bb1199a347f195803d0f/12fd416b1_Screenshot_2026-10-08_100541.png"

            alt="The warm interior of the wine bar at night"
            className="h-full w-full object-cover opacity-80"
            fittingType="fill" />
            
          </div>
        </div>
      </div>
    </section>);

}