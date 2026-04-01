'use client';

import { m, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { MOTION } from '@/lib/constants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function BrandGallery() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-parchment section-padding overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionLabel>VIZIUNEA NOASTRĂ</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display italic text-burgundy text-fluid-4xl mt-4 mb-4">
              Bienvenue au Château
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-ink/80 text-fluid-base max-w-xl mx-auto">
              O poveste de pasiune, tradiție și eleganță — în fiecare sticlă de Savoare.
            </p>
          </ScrollReveal>
        </div>

        {/* Brand Image */}
        <ScrollReveal delay={0.3}>
          <m.div
            className="relative aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-sm shadow-2xl"
            whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
            transition={{ duration: MOTION.duration.medium }}
          >
            <Image
              src="/images/brand-hero.png"
              alt="Château Radu - Savoare 2025 Brand Identity"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
            />

            {/* Subtle gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-burgundy-deep/60 to-transparent" />

            {/* Caption */}
            <div className="absolute bottom-6 left-6 right-6 text-center md:text-left">
              <span className="font-brand text-cream text-xs tracking-[0.2em] uppercase">
                Château Radu · Savoare · 2025
              </span>
            </div>
          </m.div>
        </ScrollReveal>

        {/* Three Circles Symbol */}
        <ScrollReveal delay={0.4}>
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-0">
              <div className="w-8 h-8 rounded-full border-2 border-gold/60 -mr-2" />
              <div className="w-8 h-8 rounded-full border-2 border-gold bg-gold/10 z-10" />
              <div className="w-8 h-8 rounded-full border-2 border-gold/60 -ml-2" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <p className="text-center font-display italic text-burgundy/70 text-sm mt-4">
            Trei surori. Două gemene. O singură pasiune.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
