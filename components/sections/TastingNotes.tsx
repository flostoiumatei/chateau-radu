'use client';

import { useState, useRef, useEffect } from 'react';
import { m, useReducedMotion, AnimatePresence, useInView } from 'framer-motion';
import { TASTING_COPY, MOTION } from '@/lib/constants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

// Intensity bar component
function IntensityBar({ value, color = 'gold' }: { value: number; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="h-2 bg-cream/10 rounded-full overflow-hidden">
      <m.div
        className={`h-full rounded-full ${color === 'gold' ? 'bg-gold' : 'bg-gold-light'}`}
        initial={{ width: 0 }}
        animate={{ width: isInView || shouldReduceMotion ? `${value}%` : 0 }}
        transition={{ duration: MOTION.duration.slow, ease: MOTION.easing, delay: 0.3 }}
      />
    </div>
  );
}

// Temperature arc component
function TemperatureArc({ temperature }: { temperature: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  // Parse temperature range (e.g., "8 – 10°C" -> 9)
  const avgTemp = 9;
  const minTemp = 0;
  const maxTemp = 20;
  const rotation = ((avgTemp - minTemp) / (maxTemp - minTemp)) * 180 - 90;

  return (
    <div ref={ref} className="relative w-32 h-16 mx-auto">
      {/* Arc background */}
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <path
          d="M 5 50 A 45 45 0 0 1 95 50"
          fill="none"
          stroke="var(--color-cream)"
          strokeWidth="4"
          strokeOpacity="0.2"
        />
        <path
          d="M 5 50 A 45 45 0 0 1 95 50"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="4"
          strokeDasharray="141"
          strokeDashoffset="70"
        />
      </svg>

      {/* Needle */}
      <m.div
        className="absolute bottom-0 left-1/2 origin-bottom"
        style={{ width: 2, height: 35 }}
        initial={{ rotate: -90 }}
        animate={{ rotate: isInView || shouldReduceMotion ? rotation : -90 }}
        transition={{ duration: MOTION.duration.slow, ease: MOTION.easing, delay: 0.5 }}
      >
        <div className="w-full h-full bg-gold rounded-full" />
      </m.div>

      {/* Temperature display */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
        <span className="font-brand text-gold text-lg">{temperature}</span>
      </div>
    </div>
  );
}

// Sensory wheel component
function SensoryWheel({
  segments,
  activeSegment,
  onSegmentHover,
  onSegmentClick,
}: {
  segments: typeof TASTING_COPY.sensoryWheel;
  activeSegment: number | null;
  onSegmentHover: (index: number | null) => void;
  onSegmentClick: (index: number) => void;
}) {
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {segments.map((segment, index) => {
        const angle = (index * 60 - 90) * (Math.PI / 180);
        const nextAngle = ((index + 1) * 60 - 90) * (Math.PI / 180);
        const innerRadius = 35;
        const outerRadius = 85;

        const x1 = 100 + innerRadius * Math.cos(angle);
        const y1 = 100 + innerRadius * Math.sin(angle);
        const x2 = 100 + outerRadius * Math.cos(angle);
        const y2 = 100 + outerRadius * Math.sin(angle);
        const x3 = 100 + outerRadius * Math.cos(nextAngle);
        const y3 = 100 + outerRadius * Math.sin(nextAngle);
        const x4 = 100 + innerRadius * Math.cos(nextAngle);
        const y4 = 100 + innerRadius * Math.sin(nextAngle);

        const midAngle = ((index * 60 + 30) - 90) * (Math.PI / 180);
        const labelRadius = 60;
        const labelX = 100 + labelRadius * Math.cos(midAngle);
        const labelY = 100 + labelRadius * Math.sin(midAngle);

        const isActive = activeSegment === index;

        return (
          <g
            key={segment.segment}
            onMouseEnter={() => onSegmentHover(index)}
            onMouseLeave={() => onSegmentHover(null)}
            onClick={() => onSegmentClick(index)}
            className="cursor-pointer"
          >
            <m.path
              d={`M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`}
              fill={isActive ? 'var(--color-gold)' : 'var(--color-burgundy)'}
              stroke="var(--color-cream)"
              strokeWidth="1"
              strokeOpacity="0.3"
              initial={false}
              animate={{
                scale: isActive ? 1.02 : 1,
                filter: isActive ? 'url(#glow)' : 'none',
              }}
              transition={{ duration: MOTION.duration.fast }}
              style={{ transformOrigin: '100px 100px' }}
            />
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-brand text-[7px] tracking-wider pointer-events-none"
              fill={isActive ? 'var(--color-burgundy-deep)' : 'var(--color-cream)'}
            >
              {segment.segment.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Center circle */}
      <circle
        cx="100"
        cy="100"
        r="30"
        fill="var(--color-burgundy-deep)"
        stroke="var(--color-gold)"
        strokeWidth="1"
      />
      <text
        x="100"
        y="100"
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-display text-[10px] italic"
        fill="var(--color-gold)"
      >
        Savoare
      </text>
    </svg>
  );
}

export function TastingNotes() {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tastingCards = [
    { ...TASTING_COPY.visual, key: 'visual' },
    { ...TASTING_COPY.aroma, key: 'aroma' },
    { ...TASTING_COPY.taste, key: 'taste' },
  ];

  return (
    <section id="tasting" className="bg-burgundy-deep noise-overlay section-padding overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionLabel light>{TASTING_COPY.label}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display italic text-cream text-fluid-4xl mt-4">
              {TASTING_COPY.heading}
            </h2>
          </ScrollReveal>
        </div>

        {/* Interactive wheel and description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal direction={isMobile ? 'up' : 'left'}>
            <SensoryWheel
              segments={TASTING_COPY.sensoryWheel}
              activeSegment={activeSegment}
              onSegmentHover={setActiveSegment}
              onSegmentClick={setActiveSegment}
            />
          </ScrollReveal>

          <ScrollReveal direction={isMobile ? 'up' : 'right'} delay={0.2}>
            <div className="min-h-[150px]">
              <AnimatePresence mode="wait">
                {activeSegment !== null ? (
                  <m.div
                    key={activeSegment}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: MOTION.duration.fast }}
                    className="text-center lg:text-left"
                  >
                    <h3 className="font-brand text-gold text-fluid-xl tracking-wider uppercase mb-4">
                      {TASTING_COPY.sensoryWheel[activeSegment].segment}
                    </h3>
                    <p className="font-body text-cream/80 text-fluid-base leading-relaxed">
                      {TASTING_COPY.sensoryWheel[activeSegment].description}
                    </p>
                  </m.div>
                ) : (
                  <m.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center lg:text-left"
                  >
                    <p className="font-display italic text-cream/60 text-fluid-lg">
                      Explorați fiecare segment al roții senzoriale pentru a descoperi nuanțele vinului Savoare.
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>

        {/* Tasting cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tastingCards.map((card, index) => (
            <ScrollReveal key={card.key} delay={index * 0.1}>
              <div className="bg-burgundy/50 border border-gold/20 p-6 md:p-8">
                <h3 className="font-brand text-gold text-fluid-sm tracking-[0.2em] uppercase mb-4">
                  {card.title}
                </h3>
                <p className="font-body text-cream/80 text-fluid-base mb-6 min-h-[80px]">
                  {card.description}
                </p>
                <IntensityBar value={card.intensity} />
                <span className="font-body text-cream/50 text-xs mt-2 block text-right">
                  Intensitate: {card.intensity}%
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Serving temperature */}
        <ScrollReveal>
          <div className="text-center pt-8 border-t border-gold/20">
            <span className="font-brand text-gold text-fluid-xs tracking-[0.2em] uppercase block mb-6">
              Temperatură de servire
            </span>
            <TemperatureArc temperature={TASTING_COPY.servingTemp} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
