const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { useLang } from '@/lib/i18n';
import { IMAGES } from '@/data/site';
import SectionHeading from '@/components/SectionHeading';
import { Image } from '@/components/ui/image';

export default function Gallery() {
  const { t } = useLang();

  return (
    <section className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="text-[0.6875rem] uppercase tracking-[0.28em] text-accent">{t('gal.eyebrow')}</p>
          <h2 className="display mt-4 text-[2.1rem] sm:text-4xl lg:text-[3rem]">{t('gal.title')}</h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-[1.4fr_1fr] md:gap-5">
          <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem] md:aspect-auto md:h-full md:min-h-[420px]">
            <Image
              src={IMAGES.interior}
              alt="Bottle-lined shelves in the low warm light of the bar"
              className="h-full w-full object-cover"
              fittingType="fill" />
            
          </div>
          <div className="grid gap-4 md:gap-5">
            <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem]">
              <Image src="https://media.db.com/images/public/6ac6bb1199a347f195803d0f/cc2415cfd_home_1_img.jpg"

              alt="A tagliere of prosciutto, pecorino and olives"
              className="h-full w-full object-cover"
              fittingType="fill" />
              
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem]">
              <Image src="https://media.db.com/images/public/6ac6bb1199a347f195803d0f/147be8276_divin-ostilia-wine-bar.jpg"

              alt="A bowl of Roman pasta"
              className="h-full w-full object-cover"
              fittingType="fill" />
              
            </div>
          </div>
        </div>
      </div>
    </section>);

}