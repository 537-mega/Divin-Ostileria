import React from 'react';
import { cn } from '@/lib/utils';

export default function SectionHeading({ eyebrow, title, text, align = 'left', className }) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="display mt-4 text-[2.1rem] text-primary sm:text-4xl lg:text-[3rem]">{title}</h2>
      {text && <p className="mt-5 text-muted-foreground">{text}</p>}
    </div>
  );
}