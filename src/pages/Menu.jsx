import React, { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { MENU } from '@/data/menu';
import { cn } from '@/lib/utils';
import Reveal from '@/components/Reveal';

export default function Menu() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(MENU[0].id);

  const goTo = (id) => {
    setActive(id);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <section className="border-b border-border/60 bg-secondary/60">
        <Reveal>
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="eyebrow">{t('menu.eyebrow')}</p>
          <h1 className="display mt-4 max-w-3xl text-[2.4rem] text-primary sm:text-5xl lg:text-[3.6rem]">
            {t('menu.title')}
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">{t('menu.text')}</p>
        </div>
        </Reveal>
      </section>

      <div className="sticky top-[73px] z-30 border-b border-border/60 bg-background/95 backdrop-blur md:hidden">
        <div className="flex gap-2 overflow-x-auto px-5 py-3">
          {MENU.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => goTo(category.id)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] transition-colors',
                active === category.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground',
              )}
            >
              {category.title[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[220px_1fr] lg:gap-16">
        <nav className="hidden lg:block">
          <div className="sticky top-28 space-y-1 border-l border-border pl-6">
            {MENU.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => goTo(category.id)}
                className={cn(
                  'block w-full py-2 text-left font-body text-sm transition-colors',
                  active === category.id ? 'text-primary' : 'text-muted-foreground hover:text-primary',
                )}
              >
                {category.title[lang]}
              </button>
            ))}
            <p className="pt-6 text-xs leading-relaxed text-muted-foreground">{t('menu.note')}</p>
          </div>
        </nav>

        <div className="space-y-20">
          {MENU.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-32">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
                <h2 className="display text-[1.9rem] text-primary sm:text-[2.35rem]">
                  {category.title[lang]}
                </h2>
                {category.note && (
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {category.note[lang]}
                  </p>
                )}
              </div>

              <ul className="mt-8 space-y-7">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="font-display text-xl text-foreground sm:text-[1.4rem]">{item.name}</h3>
                      <span className="shrink-0 font-body text-sm text-primary">{item.price}</span>
                    </div>
                    <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">{item.desc[lang]}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="text-xs text-muted-foreground lg:hidden">{t('menu.note')}</p>
        </div>
      </div>
    </div>
  );
}