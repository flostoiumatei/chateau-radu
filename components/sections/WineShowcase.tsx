'use client';

import { useRef, useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

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

  // Transform values for each frame
  const frame0Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 0]);
  const frame1Opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.5], [0, 1, 0]);
  const frame2Opacity = useTransform(scrollYProgress, [0.5, 0.65, 0.75], [0, 1, 0]);
  const frame3Opacity = useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 1, 1]);
  const frameOpacities = [frame0Opacity, frame1Opacity, frame2Opacity, frame3Opacity];

  const dropScale = useTransform(scrollYProgress, [0.3, 0.7], [0.5, 1]);
  const dropOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // Mobile version - vertical stack
  if (isMobile || shouldReduceMotion) {
    return (
      <section id="wine" className="bg-cream section-padding">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <SectionLabel>Savoare 2025</SectionLabel>
          </div>

          {/* Artistic drop */}
          <div className="flex justify-center mb-16">
            <WineDrop className="w-16 h-24 opacity-80" />
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
      style={{ height: '400vh' }}
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
            {/* Left: Abstract visual */}
            <div className="flex justify-center relative">
              <div className="relative w-64 h-64">
                {/* Animated concentric circles */}
                <m.div
                  className="absolute inset-0 rounded-full border-2 border-gold/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />
                <m.div
                  className="absolute inset-4 rounded-full border border-gold/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />
                <m.div
                  className="absolute inset-8 rounded-full border border-burgundy/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-brand text-gold text-xs tracking-[0.3em] uppercase block mb-2">
                      MUSCAT
                    </span>
                    <span className="font-display italic text-burgundy text-3xl block">
                      Savoare
                    </span>
                    <span className="font-brand text-gold text-xs tracking-[0.3em] uppercase block mt-2">
                      2025
                    </span>
                  </div>
                </div>
              </div>
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
