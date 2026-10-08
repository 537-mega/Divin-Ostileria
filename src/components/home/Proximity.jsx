const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { Navigation } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { IMAGES, VENUE } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

export default function Proximity() {
  const { t } = useLang();

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-[1fr_1.1fr] md:gap-20 md:px-8">
        <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary">
          <Image src="https://media.db.com/images/public/6ac6bb1199a347f195803d0f/7cf3b6796_photo0jpg.jpg"

          alt="Looking out of the bar onto a Roman cobbled street at golden hour"
          className="h-full w-full object-cover"
          fittingType="fill" />
          
        </div>

        <div>
          <p className="eyebrow">{t('prox.eyebrow')}</p>
          <h2 className="display mt-4 text-[2.1rem] text-primary sm:text-4xl lg:text-[3rem]">
            {t('prox.title')}
          </h2>
          <p className="mt-6 text-muted-foreground">{t('prox.text')}</p>

          <address className="mt-8 not-italic">
            <p className="font-display text-2xl text-foreground">{VENUE.street}</p>
            <p className="text-sm text-muted-foreground">{VENUE.city}</p>
          </address>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-7">
              <a href={VENUE.mapsUrl} target="_blank" rel="noreferrer">
                <Navigation className="mr-2 h-4 w-4" />
                {t('prox.cta')}
              </a>
            </Button>
            <Button asChild variant="ghost" className="rounded-full px-7 text-primary hover:bg-secondary">
              <a href={VENUE.phoneHref}>{VENUE.phone}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>);

}