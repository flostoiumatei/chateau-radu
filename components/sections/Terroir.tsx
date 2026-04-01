'use client';

import { useRef, useEffect, useState } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { TERROIR_COPY, MOTION } from '@/lib/constants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

// Romania outline SVG with vine region marked
function RomaniaMap() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto max-w-md mx-auto">
      <defs>
        <filter id="map-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="topo" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M0 10 Q 5 5 10 10 Q 15 15 20 10"
            stroke="var(--color-gold)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
        </pattern>
      </defs>

      {/* Romania simplified outline */}
      <path
        d="M80 100 Q 100 80 140 70 Q 180 60 220 70 Q 260 80 300 100 Q 340 120 350 160 Q 340 200 300 220 Q 260 240 220 230 Q 180 240 140 230 Q 100 220 80 180 Q 60 140 80 100"
        fill="url(#topo)"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Topographic contour lines */}
      <path
        d="M120 120 Q 160 100 200 110 Q 240 120 280 130"
        stroke="var(--color-gold)"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M100 150 Q 150 130 200 140 Q 250 150 300 160"
        stroke="var(--color-gold)"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M110 180 Q 160 160 200 170 Q 240 180 290 190"
        stroke="var(--color-gold)"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      />

      {/* Vine region marker */}
      <m.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: MOTION.duration.medium }}
      >
        <circle
          cx="200"
          cy="150"
          r="25"
          fill="var(--color-burgundy)"
          stroke="var(--color-gold)"
          strokeWidth="2"
          filter="url(#map-glow)"
        />
        <circle cx="200" cy="150" r="35" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.4" />
        <circle cx="200" cy="150" r="45" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.2" />

        {/* Pin icon */}
        <path
          d="M200 140 L200 160"
          stroke="var(--color-gold)"
          strokeWidth="2"
        />
        <circle cx="200" cy="137" r="5" fill="var(--color-gold)" />
      </m.g>

      {/* Region label */}
      <text
        x="200"
        y="200"
        textAnchor="middle"
        className="font-brand text-xs tracking-wider"
        fill="var(--color-gold)"
      >
        REGIUNEA VITICOLĂ
      </text>
    </svg>
  );
}

export function Terroir() {
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative bg-cream section-padding overflow-hidden">
      {/* Large background text */}
      <m.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={shouldReduceMotion || isMobile ? {} : { y: backgroundY, opacity: textOpacity }}
      >
        <span className="font-brand text-[15vw] md:text-[20vw] text-burgundy/[0.03] tracking-[0.3em] select-none whitespace-nowrap">
          TERROIR
        </span>
      </m.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Map */}
          <ScrollReveal direction={isMobile ? 'up' : 'left'}>
            <RomaniaMap />
          </ScrollReveal>

          {/* Right: Content */}
          <div>
            <ScrollReveal>
              <SectionLabel>{TERROIR_COPY.label}</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-display italic text-burgundy text-fluid-4xl mt-4 mb-6">
                {TERROIR_COPY.heading}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-body text-ink/70 text-fluid-base leading-relaxed mb-10">
                {TERROIR_COPY.description}
              </p>
            </ScrollReveal>

            {/* Stats cards */}
            <div className="space-y-6">
              {TERROIR_COPY.stats.map((stat, index) => (
                <ScrollReveal key={stat.title} delay={0.3 + index * 0.1}>
                  <div className="flex items-start gap-6 p-4 bg-parchment/50 border-l-2 border-gold">
                    <div className="flex-shrink-0">
                      <span className="font-brand text-gold text-2xl md:text-3xl">
                        {stat.value}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-brand text-burgundy text-sm tracking-wider uppercase mb-1">
                        {stat.title}
                      </h3>
                      <p className="font-body text-ink/60 text-sm">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
