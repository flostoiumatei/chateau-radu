'use client';

import { ReactNode } from 'react';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { MOTION } from '@/lib/constants';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{
          ease: MOTION.easing,
          duration: MOTION.duration.medium,
        }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
