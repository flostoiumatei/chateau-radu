'use client';

import { m, useReducedMotion } from 'framer-motion';
import { MOTION } from '@/lib/constants';

interface SectionLabelProps {
  children: string;
  className?: string;
  light?: boolean;
}

export function SectionLabel({ children, className = '', light = false }: SectionLabelProps) {
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <span
      className={`
        font-brand text-xs tracking-[0.3em] uppercase
        ${light ? 'text-gold-light' : 'text-gold'}
        ${className}
      `}
    >
      {children}
    </span>
  );

  if (shouldReduceMotion) {
    return content;
  }

  return (
    <m.span
      className={`
        inline-block font-brand text-xs tracking-[0.3em] uppercase
        ${light ? 'text-gold-light' : 'text-gold'}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: MOTION.duration.medium, ease: MOTION.easing }}
    >
      {children}
    </m.span>
  );
}
