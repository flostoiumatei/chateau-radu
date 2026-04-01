'use client';

import { useRef, useEffect, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { VINTAGES, MOTION } from '@/lib/constants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

function VintageCard({ vintage, index }: { vintage: typeof VINTAGES[number]; index: number }) {
  const isCurrentVintage = vintage.status === 'current';

  const statusColors = {
    coming_soon: 'border-muted/40 bg-parchment/50',
    sold_out: 'border-gold/30 bg-parchment/70',
    current: 'border-gold bg-cream shadow-lg',
  };

  const badgeColors = {
    coming_soon: 'bg-muted/20 text-muted',
    sold_out: 'bg-burgundy/10 text-burgundy',
    current: 'bg-gold text-burgundy-deep',
  };

  return (
    <m.div
      className={`flex-shrink-0 w-72 md:w-80 p-6 md:p-8 border-2 transition-all ${statusColors[vintage.status]}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: MOTION.duration.medium }}
      whileHover={{ y: -4, transition: { duration: MOTION.duration.fast } }}
    >
      {/* Badge */}
      <span
        className={`inline-block px-3 py-1 font-brand text-xs tracking-wider uppercase mb-4 ${badgeColors[vintage.status]}`}
      >
        {vintage.badge}
      </span>

      {/* Year */}
      <h3
        className={`font-brand text-5xl md:text-6xl mb-4 ${
          isCurrentVintage ? 'text-gold' : 'text-burgundy/75'
        }`}
      >
        {vintage.year}
      </h3>

      {/* Note */}
      <p className="font-body text-ink/80 text-sm md:text-base leading-relaxed">
        {vintage.note}
      </p>

      {/* Current indicator */}
      {isCurrentVintage && (
        <div className="mt-6 pt-4 border-t border-gold/30">
          <span className="font-display italic text-gold text-sm">
            Millésime curent
          </span>
        </div>
      )}
    </m.div>
  );
}

export function VintageTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(
    VINTAGES.findIndex((v) => v.status === 'current')
  );

  // Scroll to current vintage on mount
  useEffect(() => {
    if (scrollRef.current && !shouldReduceMotion) {
      const currentIndex = VINTAGES.findIndex((v) => v.status === 'current');
      if (currentIndex >= 0) {
        const cardWidth = 304; // w-72 = 288px + gap
        const containerWidth = scrollRef.current.clientWidth;
        const scrollTarget = currentIndex * cardWidth - containerWidth / 2 + cardWidth / 2;

        setTimeout(() => {
          scrollRef.current?.scrollTo({
            left: Math.max(0, scrollTarget),
            behavior: 'smooth',
          });
        }, 500);
      }
    }
  }, [shouldReduceMotion]);

  // Track active card on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = 304;
      const scrollLeft = el.scrollLeft + el.clientWidth / 2;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(0, index), VINTAGES.length - 1));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="bg-cream section-padding overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionLabel>Millésimes</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display italic text-burgundy text-fluid-4xl mt-4">
              Recolte memorabile
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-ink/75 text-fluid-base mt-4 max-w-md mx-auto">
              Fiecare an aduce o expresie unică. Glisați pentru a explora.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Native horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-6 px-4 md:px-8 py-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Spacer for centering */}
        <div className="flex-shrink-0 w-[calc(50vw-160px)] md:w-[calc(50vw-200px)]" />

        {VINTAGES.map((vintage, index) => (
          <div key={vintage.year} className="snap-center">
            <VintageCard vintage={vintage} index={index} />
          </div>
        ))}

        {/* Spacer for centering */}
        <div className="flex-shrink-0 w-[calc(50vw-160px)] md:w-[calc(50vw-200px)]" />
      </div>

      {/* Indicator dots */}
      <ScrollReveal className="mt-8">
        <div className="flex justify-center gap-3">
          {VINTAGES.map((vintage, index) => (
            <div
              key={vintage.year}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex
                  ? 'bg-gold w-8'
                  : 'bg-burgundy/30 w-2'
              }`}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
