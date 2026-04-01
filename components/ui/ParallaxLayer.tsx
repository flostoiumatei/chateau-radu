'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0.5 = slower than scroll, 1.5 = faster than scroll
  direction?: 'up' | 'down';
}

export function ParallaxLayer({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
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
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const yRange = isMobile ? 50 * speed : 100 * speed;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [multiplier * yRange, multiplier * -yRange]
  );

  if (shouldReduceMotion || isMobile) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <m.div ref={ref} style={{ y }} className={className}>
      {children}
    </m.div>
  );
}
