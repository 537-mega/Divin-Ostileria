import React from 'react';
import Hero from '@/components/home/Hero';
import Story from '@/components/home/Story';
import Signatures from '@/components/home/Signatures';
import FoodCarousel from '@/components/home/FoodCarousel';
import Gallery from '@/components/home/Gallery';
import Proximity from '@/components/home/Proximity';
import Reviews from '@/components/home/Reviews';
import ClosingCta from '@/components/home/ClosingCta';
import Reveal from '@/components/Reveal';

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal><Story /></Reveal>
      <Reveal><Signatures /></Reveal>
      <Reveal><FoodCarousel /></Reveal>
      <Reveal><Gallery /></Reveal>
      <Reveal><Proximity /></Reveal>
      <Reveal><Reviews /></Reveal>
      <Reveal><ClosingCta /></Reveal>
    </>
  );
}