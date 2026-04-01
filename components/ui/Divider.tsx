'use client';

import { m, useReducedMotion } from 'framer-motion';
import { MOTION } from '@/lib/constants';

interface DividerProps {
  className?: string;
  animated?: boolean;
}

export function Divider({ className = '', animated = true }: DividerProps) {
  const shouldReduceMotion = useReducedMotion();

  const svgContent = (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-48 h-6 ${className}`}
    >
      {/* Left vine */}
      <path
        d="M0 12 Q 20 12 30 8 Q 40 4 50 8 Q 60 12 70 10"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-gold"
      />
      {/* Left leaf */}
      <path
        d="M45 6 Q 50 2 55 6 Q 50 10 45 6"
        fill="currentColor"
        className="text-gold"
      />
      {/* Center ornament */}
      <circle cx="100" cy="12" r="3" fill="currentColor" className="text-gold" />
      <circle
        cx="100"
        cy="12"
        r="6"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-gold"
      />
      {/* Right vine */}
      <path
        d="M200 12 Q 180 12 170 8 Q 160 4 150 8 Q 140 12 130 10"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-gold"
      />
      {/* Right leaf */}
      <path
        d="M155 6 Q 150 2 145 6 Q 150 10 155 6"
        fill="currentColor"
        className="text-gold"
      />
      {/* Connecting lines */}
      <path
        d="M70 10 Q 85 8 94 12"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-gold"
      />
      <path
        d="M130 10 Q 115 8 106 12"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-gold"
      />
    </svg>
  );

  if (shouldReduceMotion || !animated) {
    return <div className="flex justify-center">{svgContent}</div>;
  }

  return (
    <m.div
      className="flex justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: MOTION.duration.medium, ease: MOTION.easing }}
    >
      {svgContent}
    </m.div>
  );
}
