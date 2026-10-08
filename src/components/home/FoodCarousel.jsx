import React from 'react';
import { useLang } from '@/lib/i18n';
import { FOOD_SLIDES } from '@/data/site';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext } from
'@/components/ui/carousel';
import { Image } from '@/components/ui/image';
import SectionHeading from '@/components/SectionHeading';

export default function FoodCarousel() {
  const { t, lang } = useLang();

  return (
    <section className="bg-secondary/40 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={t('kitchen.eyebrow')} title={t('kitchen.title')} />

        <div className="mt-10">
          <Carousel opts={{ loop: true, align: 'start' }} className="mx-auto max-w-6xl">
            <CarouselContent className="-ml-3">
              {FOOD_SLIDES.map((slide, i) =>
              <CarouselItem key={i} className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3">
                  <div className="group relative h-52 overflow-hidden rounded-xl bg-secondary sm:h-56 lg:h-60">
                    <Image
                    src={slide.image}
                    alt={slide.caption[lang]}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-[1.05]"
                    fittingType="fill" />
                  
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-100" />
                    <p className="absolute bottom-3 left-4 font-display text-lg text-white sm:text-xl">
                      {slide.caption[lang]}
                    </p>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="!left-2 h-9 w-9 border-border bg-background/90 shadow" />
            <CarouselNext className="!right-2 h-9 w-9 border-border bg-background/90 shadow" />
          </Carousel>
        </div>
      </div>
    </section>);

}