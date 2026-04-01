'use client';

import { useRef, useEffect, useState } from 'react';
import { m, useMotionValue, useReducedMotion, animate } from 'framer-motion';
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
          isCurrentVintage ? 'text-gold' : 'text-burgundy/60'
        }`}
      >
        {vintage.year}
      </h3>

      {/* Note */}
      <p className="font-body text-ink/70 text-sm md:text-base leading-relaxed">
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
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateConstraints = () => {
      if (scrollRef.current && containerRef.current) {
        const scrollWidth = scrollRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        setConstraints({
          left: -(scrollWidth - containerWidth + 32), // 32px for padding
          right: 0,
        });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  // Center on current vintage on mount
  useEffect(() => {
    const currentIndex = VINTAGES.findIndex((v) => v.status === 'current');
    if (currentIndex > 0 && containerRef.current && !shouldReduceMotion) {
      const cardWidth = 320; // approximate card width + gap
      const targetX = -(currentIndex * cardWidth - containerRef.current.clientWidth / 2 + cardWidth / 2);
      const clampedX = Math.max(constraints.left, Math.min(constraints.right, targetX));

      animate(x, clampedX, {
        duration: MOTION.duration.slow,
        ease: MOTION.easing,
        delay: 0.5,
      });
    }
  }, [constraints, shouldReduceMotion, x]);

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
            <p className="font-body text-ink/60 text-fluid-base mt-4 max-w-md mx-auto">
              Fiecare an aduce o expresie unică. Glisați pentru a explora.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <m.div
          ref={scrollRef}
          className="flex gap-6 px-4 md:px-8 py-4"
          style={{ x }}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          {/* Spacer for centering */}
          <div className="flex-shrink-0 w-[calc(50vw-160px)] md:w-[calc(50vw-200px)]" />

          {VINTAGES.map((vintage, index) => (
            <VintageCard key={vintage.year} vintage={vintage} index={index} />
          ))}

          {/* Spacer for centering */}
          <div className="flex-shrink-0 w-[calc(50vw-160px)] md:w-[calc(50vw-200px)]" />
        </m.div>

        {/* Drag hint (mobile) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 pointer-events-none md:hidden">
          <m.span
            className="font-body text-xs text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: isDragging ? 0 : 1 }}
            transition={{ duration: MOTION.duration.fast }}
          >
            ← Glisați pentru a explora →
          </m.span>
        </div>
      </div>

      {/* Timeline indicator dots */}
      <ScrollReveal className="mt-8">
        <div className="flex justify-center gap-3">
          {VINTAGES.map((vintage) => (
            <div
              key={vintage.year}
              className={`w-2 h-2 rounded-full transition-all ${
                vintage.status === 'current'
                  ? 'bg-gold w-8'
                  : 'bg-burgundy/30'
              }`}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
