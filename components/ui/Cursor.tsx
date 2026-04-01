'use client';

import { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { MOTION } from '@/lib/constants';

export function Cursor() {
  const { cursorState, cursorText } = useAppStore();
  const shouldReduceMotion = useReducedMotion();

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Mouse position state (using refs for performance)
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  // Check if touch device
  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Apply/remove custom cursor class on body
  useEffect(() => {
    if (!isTouchDevice && !shouldReduceMotion) {
      document.body.classList.add('custom-cursor');
    } else {
      document.body.classList.remove('custom-cursor');
    }

    return () => {
      document.body.classList.remove('custom-cursor');
    };
  }, [isTouchDevice, shouldReduceMotion]);

  // Track mouse movement and animation
  useEffect(() => {
    if (isTouchDevice || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Animation loop with lerp
    const animateLoop = () => {
      if (!dotRef.current || !ringRef.current) {
        animationFrameId.current = requestAnimationFrame(animateLoop);
        return;
      }

      // Lerp factor (0.15 = smooth, 0.3 = responsive)
      const dotLerp = 0.25;
      const ringLerp = 0.12;

      // Update dot position (faster)
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * dotLerp;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * dotLerp;

      // Update ring position (slower, trailing effect)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ringLerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ringLerp;

      // Apply transforms
      dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px)`;
      ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;

      animationFrameId.current = requestAnimationFrame(animateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isTouchDevice, shouldReduceMotion, isVisible]);

  // Set up hover detection for interactive elements
  useEffect(() => {
    if (isTouchDevice || shouldReduceMotion) return;

    const { setCursorState, setCursorText } = useAppStore.getState();

    const handleMouseEnterLink = () => setCursorState('hover');
    const handleMouseLeaveLink = () => {
      setCursorState('default');
      setCursorText('');
    };

    const handleMouseEnterImage = () => {
      setCursorState('explore');
      setCursorText('Explore');
    };

    // Find all interactive elements
    const links = document.querySelectorAll('a, button, [role="button"]');
    const images = document.querySelectorAll('img, [data-cursor="explore"]');

    links.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterLink);
      el.addEventListener('mouseleave', handleMouseLeaveLink);
    });

    images.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterImage);
      el.addEventListener('mouseleave', handleMouseLeaveLink);
    });

    return () => {
      links.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterLink);
        el.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
      images.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterImage);
        el.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
    };
  }, [isTouchDevice, shouldReduceMotion]);

  // Don't render on touch devices or reduced motion
  if (isTouchDevice || shouldReduceMotion) {
    return null;
  }

  // Ring size based on state
  const getRingSize = () => {
    switch (cursorState) {
      case 'hover':
        return 60;
      case 'explore':
        return 80;
      default:
        return 32;
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
      {/* Dot (small center point) */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${MOTION.duration.fast}s`,
        }}
      >
        <m.div
          className="bg-gold rounded-full"
          animate={{
            width: cursorState === 'hover' || cursorState === 'explore' ? 0 : 8,
            height: cursorState === 'hover' || cursorState === 'explore' ? 0 : 8,
          }}
          transition={{ duration: MOTION.duration.fast }}
        />
      </div>

      {/* Ring (larger outer circle) */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${MOTION.duration.fast}s`,
        }}
      >
        <m.div
          className="rounded-full border-2 border-burgundy flex items-center justify-center"
          animate={{
            width: getRingSize(),
            height: getRingSize(),
            backgroundColor:
              cursorState === 'hover'
                ? 'rgba(184, 146, 42, 0.15)'
                : cursorState === 'explore'
                ? 'rgba(90, 26, 42, 0.8)'
                : 'transparent',
            borderColor:
              cursorState === 'explore' ? 'var(--color-gold)' : 'var(--color-burgundy)',
          }}
          transition={{ duration: MOTION.duration.fast, ease: MOTION.easing }}
        >
          {/* Text for explore state */}
          <AnimatePresence>
            {cursorState === 'explore' && cursorText && (
              <m.span
                className="font-brand text-xs tracking-wider text-cream"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: MOTION.duration.fast }}
              >
                {cursorText}
              </m.span>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </div>
  );
}
