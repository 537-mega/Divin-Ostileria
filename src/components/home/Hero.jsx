const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import { IMAGES, VENUE } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative flex min-h-[82vh] items-end overflow-hidden bg-foreground">
      <div className="absolute inset-0">
        <Image src="https://media.db.com/images/public/6ac6bb1199a347f195803d0f/77e59d936_Hero_IMG.jpg"

        alt="Divin Ostilia wine bar on Via Ostilia"
        className="h-full w-full opacity-65"
        fittingType="fill" />
        
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:px-8 md:pb-24">
        
        <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/70">
          Wine Bar · Rione Celio · Roma
        </p>
        <h1 className="display mt-5 text-[3.4rem] leading-[0.95] text-white sm:text-7xl lg:text-[6.5rem]">
          Divin Ostilia
        </h1>
        <p className="mt-6 max-w-md text-white/85">{t('hero.text')}</p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/booking">{t('hero.reserve')}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-white/40 bg-white/5 px-8 text-white hover:bg-white/15 hover:text-white">
            
            <Link to="/menu">{t('hero.menu')}</Link>
          </Button>
        </div>
        <p className="mt-10 text-sm text-white/70">
          {VENUE.street} · {t('hero.walk')}
        </p>
      </motion.div>
    </section>);

}