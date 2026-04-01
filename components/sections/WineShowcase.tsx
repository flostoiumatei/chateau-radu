'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { WINE_SHOWCASE, MOTION } from '@/lib/constants';
import { SectionLabel } from '@/components/ui/SectionLabel';

// Artistic golden ring animation
function GoldenRing({ delay = 0, size = 'md' }: { delay?: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-32 h-32 md:w-40 md:h-40',
    md: 'w-48 h-48 md:w-64 md:h-64',
    lg: 'w-64 h-64 md:w-80 md:h-80',
  };

  return (
    <m.div
      className={`${sizes[size]} rounded-full border border-gold/30 absolute`}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: MOTION.easing }}
    />
  );
}

// Abstract wine drop SVG
function WineDrop({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 0 C30 0 0 50 0 70 C0 86.57 13.43 100 30 100 C46.57 100 60 86.57 60 70 C60 50 30 0 30 0Z"
        fill="url(#goldGradient)"
      />
      <defs>
        <linearGradient id="goldGradient" x1="30" y1="0" x2="30" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d4a843" />
          <stop offset="1" stopColor="#b8922a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function WineShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  // Start with true to prevent flash of desktop version on mobile
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform values for each frame (optimized for 200vh)
  const frame0Opacity = useTransform(scrollYProgress, [0, 0.15, 0.35], [0, 1, 0]);
  const frame1Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6], [0, 1, 0]);
  const frame2Opacity = useTransform(scrollYProgress, [0.55, 0.7, 0.85], [0, 1, 0]);
  const frame3Opacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const frameOpacities = [frame0Opacity, frame1Opacity, frame2Opacity, frame3Opacity];

  const dropScale = useTransform(scrollYProgress, [0.2, 0.8], [0.5, 1]);
  const dropOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  // Mobile version - vertical stack
  if (isMobile || shouldReduceMotion) {
    return (
      <section id="wine" className="bg-cream section-padding">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <SectionLabel>Savoare 2025</SectionLabel>
          </div>

          {/* Bottle image */}
          <div className="flex justify-center mb-16">
            <Image
              src="/images/bottle-hero.png"
              alt="Savoare 2025 — Château Radu Muscat Ottonel"
              width={192}
              height={384}
              className="w-48 h-auto object-contain drop-shadow-xl"
              quality={85}
            />
          </div>

          {/* Frames as cards */}
          <div className="space-y-16">
            {WINE_SHOWCASE.frames.map((frame) => (
              <div key={frame.id} className="text-center max-w-md mx-auto">
                <h3 className="font-display text-burgundy text-fluid-2xl mb-4">
                  {frame.title}
                </h3>
                {'description' in frame && frame.description && (
                  <p className="font-body text-ink/80 text-fluid-base">
                    {frame.description}
                  </p>
                )}
                {'specs' in frame && frame.specs && (
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {frame.specs.map((spec) => (
                      <div key={spec.label} className="text-left p-4 bg-parchment rounded border-l-2 border-gold">
                        <span className="font-brand text-xs text-gold tracking-wider uppercase">
                          {spec.label}
                        </span>
                        <p className="font-display text-burgundy text-xl mt-1">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop version - sticky scroll
  return (
    <section
      id="wine"
      ref={containerRef}
      className="relative bg-cream"
      style={{ height: '200vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <GoldenRing size="lg" delay={0} />
          <GoldenRing size="md" delay={0.2} />
          <GoldenRing size="sm" delay={0.4} />
        </div>

        {/* Central drop animation */}
        <m.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ scale: dropScale, opacity: dropOpacity }}
        >
          <WineDrop className="w-20 h-32 opacity-60" />
        </m.div>

        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left: Bottle image */}
            <div className="flex justify-center relative">
              <m.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: MOTION.duration.slow, ease: MOTION.easing }}
              >
                <Image
                  src="/images/bottle-hero.png"
                  alt="Savoare 2025 — Château Radu Muscat Ottonel"
                  width={288}
                  height={576}
                  className="w-72 h-auto object-contain drop-shadow-2xl"
                  quality={85}
                />
              </m.div>
            </div>

            {/* Right: Content frames */}
            <div className="relative h-[400px]">
              {WINE_SHOWCASE.frames.map((frame, index) => (
                <m.div
                  key={frame.id}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{
                    opacity: frameOpacities[index],
                  }}
                >
                  <SectionLabel className="mb-4">Savoare 2025</SectionLabel>
                  <h3 className="font-display text-burgundy text-fluid-4xl mb-6">
                    {frame.title}
                  </h3>
                  {'description' in frame && frame.description && (
                    <p className="font-body text-ink/80 text-fluid-lg max-w-md">
                      {frame.description}
                    </p>
                  )}
                  {'specs' in frame && frame.specs && (
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      {frame.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="p-4 bg-parchment/50 border-l-2 border-gold"
                        >
                          <span className="font-brand text-xs text-gold tracking-wider uppercase">
                            {spec.label}
                          </span>
                          <p className="font-display text-burgundy text-2xl mt-1">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
