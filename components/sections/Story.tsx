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

  // Extract number from value (e.g., "100%" -> 100)
  const numericValue = parseInt(value.replace(/\D/g, ''), 10);

  // Initialize display value based on reduced motion preference
  const [displayValue, setDisplayValue] = useState(() =>
    shouldReduceMotion ? value : '0'
  );

  useEffect(() => {
    // Skip animation if reduced motion is preferred
    if (shouldReduceMotion) {
      return;
    }

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

// Sister card component
function SisterCard({ sister, index }: { sister: typeof STORY_COPY.sisters[number]; index: number }) {
  const isGemela = sister.description.includes('Geamănă');

  return (
    <ScrollReveal delay={0.2 + index * 0.15}>
      <m.div
        className="relative text-center p-6 bg-cream/5 border border-gold/20 backdrop-blur-sm"
        whileHover={{ scale: 1.02, borderColor: 'var(--color-gold)' }}
        transition={{ duration: MOTION.duration.fast }}
      >
        {/* Twin indicator */}
        {isGemela && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="px-3 py-1 bg-gold text-burgundy-deep text-[10px] font-brand tracking-wider uppercase">
              Geamănă
            </span>
          </div>
        )}

        {/* Sister initial in decorative circle */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-gold/40 flex items-center justify-center">
          <span className="font-display italic text-gold text-3xl">
            {sister.name.charAt(0)}
          </span>
        </div>

        <h3 className="font-brand text-cream text-lg tracking-wider mb-1">
          {sister.name}
        </h3>
        <p className="font-display italic text-gold text-sm mb-3">
          {sister.role}
        </p>
        <p className="font-body text-cream/80 text-sm">
          {sister.description.replace('Geamănă · ', '')}
        </p>
      </m.div>
    </ScrollReveal>
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
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="story" ref={containerRef} className="relative overflow-hidden">
      {/* Panel 1: Povestea - Introducere */}
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

          <ScrollReveal delay={0.2}>
            <p className="font-body text-cream/90 text-fluid-lg leading-relaxed max-w-2xl mx-auto">
              {STORY_COPY.body1}
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Panel 2: Gemenele și Viziunea */}
      <div className="relative min-h-screen flex items-center bg-cream">
        <m.div
          className="absolute inset-0"
          style={shouldReduceMotion || isMobile ? {} : { y: parallaxY2 }}
        >
          {/* Subtle background text */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="font-brand text-[12vw] md:text-[15vw] text-burgundy/[0.04] tracking-[0.2em] select-none whitespace-nowrap">
              SURORI
            </span>
          </div>
        </m.div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center">
          <ScrollReveal>
            <blockquote className="font-display italic text-burgundy text-fluid-2xl md:text-fluid-3xl leading-relaxed mb-8">
              &ldquo;{STORY_COPY.body2}&rdquo;
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-ink/85 text-fluid-base leading-relaxed max-w-2xl mx-auto mb-8">
              {STORY_COPY.body3}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-display italic text-gold text-fluid-xl">
              {STORY_COPY.frenchAccent}
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Panel 3: Cele 3 Surori */}
      <div className="relative min-h-screen flex items-center bg-burgundy-deep noise-overlay">
        <m.div
          className="absolute inset-0"
          style={shouldReduceMotion || isMobile ? {} : { y: parallaxY3 }}
        >
          {/* Background gradient circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-burgundy/20 rounded-full blur-3xl" />
        </m.div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-24">
          <div className="text-center mb-12">
            <ScrollReveal>
              <SectionLabel light>CELE TREI SURORI</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display italic text-gold text-fluid-4xl mt-4 mb-2">
                Elena, Maria & Ana
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="font-display italic text-cream/80 text-fluid-base">
                {STORY_COPY.sistersNote}
              </p>
            </ScrollReveal>
          </div>

          {/* Sisters grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {STORY_COPY.sisters.map((sister, index) => (
              <SisterCard key={sister.name} sister={sister} index={index} />
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-8 md:gap-12 pt-8 border-t border-gold/20">
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
                  <span className="font-brand text-gold text-fluid-hero block">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <span className="font-brand text-cream/80 text-fluid-sm tracking-[0.2em] uppercase mt-2 block">
                    {stat.label}
                  </span>
                </m.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Panel 4: Savoare - Cuvée */}
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
          <ScrollReveal delay={0.2}>
            <p className="font-body text-ink/85 text-fluid-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Vinul care ne unește. Un Muscat Ottonel de excepție, creat cu dragoste de trei surori pentru cei care știu să savureze momentele prețioase ale vieții.
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
