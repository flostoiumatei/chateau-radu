'use client';

import { useRef, useEffect, useState } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { WINE_SHOWCASE, MOTION } from '@/lib/constants';
import { SectionLabel } from '@/components/ui/SectionLabel';

// SVG Wine Bottle Component
function WineBottle({ fillLevel = 0, showLabel = false, className = '' }: {
  fillLevel?: number;
  showLabel?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bottle outline */}
      <defs>
        <clipPath id="bottle-clip">
          <path d="M50 0 H70 V60 Q90 80 90 120 V360 Q90 380 60 380 Q30 380 30 360 V120 Q30 80 50 60 Z" />
        </clipPath>
        <linearGradient id="wine-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#d4a843" />
          <stop offset="100%" stopColor="#b8922a" />
        </linearGradient>
        <linearGradient id="bottle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2a4a2a" />
          <stop offset="50%" stopColor="#3d5a3d" />
          <stop offset="100%" stopColor="#2a4a2a" />
        </linearGradient>
      </defs>

      {/* Bottle body */}
      <path
        d="M50 0 H70 V60 Q90 80 90 120 V360 Q90 380 60 380 Q30 380 30 360 V120 Q30 80 50 60 Z"
        fill="url(#bottle-gradient)"
        stroke="var(--color-gold)"
        strokeWidth="1"
        opacity="0.9"
      />

      {/* Wine fill */}
      <g clipPath="url(#bottle-clip)">
        <m.rect
          x="30"
          y={380 - (260 * fillLevel / 100)}
          width="60"
          height={260 * fillLevel / 100}
          fill="url(#wine-gradient)"
          initial={{ height: 0, y: 380 }}
          animate={{
            height: 260 * fillLevel / 100,
            y: 380 - (260 * fillLevel / 100)
          }}
          transition={{ duration: 1, ease: MOTION.easing }}
        />
      </g>

      {/* Label area */}
      {showLabel && (
        <g>
          <rect
            x="38"
            y="180"
            width="44"
            height="80"
            fill="var(--color-cream)"
            stroke="var(--color-gold)"
            strokeWidth="0.5"
          />
          <text
            x="60"
            y="205"
            textAnchor="middle"
            className="font-brand"
            fill="var(--color-burgundy)"
            fontSize="5"
            letterSpacing="0.5"
          >
            CHÂTEAU
          </text>
          <text
            x="60"
            y="215"
            textAnchor="middle"
            className="font-brand"
            fill="var(--color-burgundy)"
            fontSize="6"
            letterSpacing="0.5"
          >
            RADU
          </text>
          <text
            x="60"
            y="235"
            textAnchor="middle"
            className="font-display"
            fill="var(--color-gold)"
            fontSize="8"
            fontStyle="italic"
          >
            Savoare
          </text>
          <text
            x="60"
            y="250"
            textAnchor="middle"
            className="font-brand"
            fill="var(--color-burgundy)"
            fontSize="4"
            letterSpacing="1"
          >
            2025
          </text>
        </g>
      )}

      {/* Bottle neck highlight */}
      <path
        d="M55 5 V55"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="3"
      />

      {/* Cork */}
      <rect
        x="52"
        y="-10"
        width="16"
        height="15"
        rx="2"
        fill="#8B7355"
        stroke="var(--color-gold)"
        strokeWidth="0.5"
      />
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
  const bottleY = useTransform(scrollYProgress, [0, 0.15], [100, 0]);
  const bottleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const labelOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const fillLevel = useTransform(scrollYProgress, [0.4, 0.6], [0, 80]);
  const specsOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  // Pre-calculate opacity transforms for each frame (to avoid hooks in callbacks)
  const frame0Opacity = useTransform(scrollYProgress, [0, 0.125, 0.25], [0, 1, 0]);
  const frame1Opacity = useTransform(scrollYProgress, [0.25, 0.375, 0.5], [0, 1, 0]);
  const frame2Opacity = useTransform(scrollYProgress, [0.5, 0.625, 0.75], [0, 1, 0]);
  const frame3Opacity = useTransform(scrollYProgress, [0.75, 0.875, 1], [0, 1, 1]);
  const frameOpacities = [frame0Opacity, frame1Opacity, frame2Opacity, frame3Opacity];

  // Mobile version - vertical stack
  if (isMobile || shouldReduceMotion) {
    return (
      <section id="wine" className="bg-cream section-padding">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel>Savoare 2025</SectionLabel>
          </div>

          <div className="flex flex-col items-center gap-16">
            {/* Bottle */}
            <div className="w-32 mx-auto">
              <WineBottle fillLevel={80} showLabel={true} className="w-full h-auto" />
            </div>

            {/* Frames as cards */}
            {WINE_SHOWCASE.frames.map((frame) => (
              <div key={frame.id} className="text-center max-w-md">
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
                      <div key={spec.label} className="text-left p-4 bg-parchment rounded">
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
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left: Bottle */}
            <m.div
              className="flex justify-center"
              style={{ y: bottleY, opacity: bottleOpacity }}
            >
              <div className="w-48 lg:w-56">
                <m.div style={{ opacity: labelOpacity }}>
                  <WineBottle
                    fillLevel={fillLevel.get()}
                    showLabel={labelOpacity.get() > 0.5}
                    className="w-full h-auto"
                  />
                </m.div>
              </div>
            </m.div>

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
                      <m.div
                        className="grid grid-cols-2 gap-4 mt-8"
                        style={{ opacity: specsOpacity }}
                      >
                        {frame.specs.map((spec) => (
                          <div
                            key={spec.label}
                            className="p-4 bg-parchment/50 border border-gold/20"
                          >
                            <span className="font-brand text-xs text-gold tracking-wider uppercase">
                              {spec.label}
                            </span>
                            <p className="font-display text-burgundy text-2xl mt-1">
                              {spec.value}
                            </p>
                          </div>
                        ))}
                      </m.div>
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
