'use client';

import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { NAV_LINKS, BRAND, MOTION } from '@/lib/constants';

export function MobileMenu() {
  const { menuOpen, setMenuOpen } = useAppStore();
  const shouldReduceMotion = useReducedMotion();

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
      }
    }, 300);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: MOTION.duration.fast,
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: MOTION.duration.fast,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.duration.medium,
        ease: MOTION.easing,
      },
    },
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <m.div
          className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-burgundy) 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}
            />
          </div>

          {/* Navigation links */}
          <nav className="relative z-10 flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <m.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="font-display italic text-burgundy text-3xl md:text-4xl hover:text-gold transition-colors"
                variants={itemVariants}
              >
                {link.label}
              </m.a>
            ))}
          </nav>

          {/* Tagline */}
          <m.div
            className="absolute bottom-12 left-0 right-0 text-center"
            variants={itemVariants}
          >
            <span className="font-display italic text-burgundy/60 text-lg">
              {BRAND.taglineFr}
            </span>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
