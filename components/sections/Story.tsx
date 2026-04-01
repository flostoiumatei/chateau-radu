'use client';

import { useRef, useEffect, useState } from 'react';
import { m, useScroll, useTransform, useReducedMotion, useMotionValue, animate } from 'framer-motion';
import { STORY_COPY, MOTION } from '@/lib/constants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const motionValue = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const numericValue = parseInt(value.replace(/\D/g, ''), 10);

  const [displayValue, setDisplayValue] = useState(() =>
    shouldReduceMotion ? value : '0'
  );

  useEffect(() => {
    if (shouldReduceMotion) return;

    const controls = animate(motionValue, numericValue, {
      duration: 2,
      ease: MOTION.easing,
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest).toString());
      },
    });

    return () => controls.stop();
  }, [motionValue, numericValue, shouldReduceMotion]);

  return (
    <span>
      {displayValue}
      {suffix || value.replace(/\d/g, '')}
    </span>
  );
}

// Decorative vine SVG element
function VineDecoration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 30 Q 25 10 50 30 T 100 30 T 150 30 T 200 30"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
        fill="none"
      />
      <circle cx="50" cy="30" r="4" fill="currentColor" fillOpacity="0.4" />
      <circle cx="100" cy="30" r="4" fill="currentColor" fillOpacity="0.4" />
      <circle cx="150" cy="30" r="4" fill="currentColor" fillOpacity="0.4" />
      {/* Grape clusters */}
      <g transform="translate(45, 35)">
        <circle cx="0" cy="0" r="2" fill="currentColor" fillOpacity="0.3" />
        <circle cx="4" cy="2" r="2" fill="currentColor" fillOpacity="0.3" />
        <circle cx="2" cy="5" r="2" fill="currentColor" fillOpacity="0.3" />
      </g>
      <g transform="translate(145, 35)">
        <circle cx="0" cy="0" r="2" fill="currentColor" fillOpacity="0.3" />
        <circle cx="4" cy="2" r="2" fill="currentColor" fillOpacity="0.3" />
        <circle cx="2" cy="5" r="2" fill="currentColor" fillOpacity="0.3" />
      </g>
    </svg>
  );
}

export function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section id="story" ref={containerRef} className="relative overflow-hidden">
      {/* Panel 1: Introducere */}
      <div className="relative min-h-screen flex items-center bg-burgundy-deep noise-overlay">
        {/* Vineyard pattern background */}
        <m.div
          className="absolute inset-0 opacity-5"
          style={shouldReduceMotion || isMobile ? {} : { y: parallaxY1 }}
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="vineyard" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="var(--color-gold)" />
              <circle cx="30" cy="30" r="2" fill="var(--color-gold)" />
              <circle cx="50" cy="10" r="2" fill="var(--color-gold)" />
              <circle cx="70" cy="30" r="2" fill="var(--color-gold)" />
              <circle cx="90" cy="10" r="2" fill="var(--color-gold)" />
              <path d="M10 10 Q 20 5 30 10" stroke="var(--color-gold)" fill="none" strokeWidth="0.5" />
              <path d="M50 10 Q 60 5 70 10" stroke="var(--color-gold)" fill="none" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#vineyard)" />
          </svg>
        </m.div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center">
          <ScrollReveal>
            <SectionLabel light>{STORY_COPY.label}</SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display italic text-cream text-fluid-4xl mt-6 mb-8">
              {STORY_COPY.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <VineDecoration className="w-48 mx-auto text-gold mb-8" />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-cream/90 text-fluid-lg leading-relaxed max-w-2xl mx-auto mb-8">
              {STORY_COPY.body1}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-display italic text-gold/70 text-fluid-base">
              « Les racines se souviennent »
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Panel 2: Citat și Viziune */}
      <div className="relative min-h-screen flex items-center bg-cream">
        <m.div
          className="absolute inset-0"
          style={shouldReduceMotion || isMobile ? {} : { y: parallaxY2 }}
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="font-brand text-[12vw] md:text-[15vw] text-burgundy/[0.04] tracking-[0.1em] md:tracking-[0.2em] select-none overflow-hidden">
              MOȘTENIRE
            </span>
          </div>
        </m.div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center">
          <ScrollReveal>
            <p className="font-body text-ink/85 text-fluid-lg leading-relaxed max-w-2xl mx-auto mb-10">
              {STORY_COPY.body2}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <blockquote className="font-display italic text-burgundy text-fluid-2xl md:text-fluid-3xl leading-relaxed mb-8">
              {STORY_COPY.body3}
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-display italic text-gold text-fluid-xl">
              {STORY_COPY.frenchAccent}
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Panel 3: Simbolul Surorilor */}
      <div className="relative py-32 bg-burgundy-deep noise-overlay">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-burgundy/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="font-display italic text-cream/80 text-fluid-lg mb-8">
                {STORY_COPY.sistersNote}
              </p>
            </ScrollReveal>

            {/* Three interlinked circles representing the sisters */}
            <ScrollReveal delay={0.2}>
              <div className="flex justify-center items-center gap-0 my-12">
                <m.div
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-gold/60 -mr-4"
                  whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0 }}
                />
                <m.div
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-gold bg-gold/10 z-10"
                  whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                />
                <m.div
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-gold/60 -ml-4"
                  whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 md:gap-12 pt-8 border-t border-gold/20">
            {STORY_COPY.stats.map((stat, index) => (
              <ScrollReveal
                key={stat.label}
                delay={0.3 + index * 0.1}
                className="text-center"
              >
                <m.div
                  className="inline-block"
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <span className="font-brand text-gold text-fluid-4xl md:text-fluid-5xl block">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <span className="font-brand text-cream/80 text-fluid-xs md:text-fluid-sm tracking-[0.1em] md:tracking-[0.2em] uppercase mt-2 block">
                    {stat.label}
                  </span>
                </m.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Panel 4: Savoare */}
      <div className="relative py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <SectionLabel>CUVÉE</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display italic text-burgundy text-fluid-5xl mt-4 mb-6">
              Savoare
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <VineDecoration className="w-48 mx-auto text-burgundy mb-6" />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-ink/85 text-fluid-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Vinul pentru care bunicul ar fi rămas toată seara la masă. Un Muscat Ottonel care nu se grăbește — se dezvăluie încet, ca o poveste bună, și te face să uiți de ceas.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="inline-flex items-center gap-4">
              <span className="w-12 h-px bg-gold"></span>
              <span className="font-brand text-gold text-sm tracking-[0.3em] uppercase">2025</span>
              <span className="w-12 h-px bg-gold"></span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
