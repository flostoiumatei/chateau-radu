'use client';

import { useState, useEffect } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { AGE_GATE_COPY, BRAND, MOTION } from '@/lib/constants';

export function AgeGate() {
  const { ageVerified, setAgeVerified } = useAppStore();
  const [birthYear, setBirthYear] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Check hydration and show gate
  useEffect(() => {
    // Small delay to ensure hydration
    const timer = setTimeout(() => {
      if (!ageVerified) {
        setIsVisible(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [ageVerified]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const year = parseInt(birthYear, 10);
    const currentYear = new Date().getFullYear();

    // Validate year format
    if (isNaN(year) || birthYear.length !== 4) {
      setError(AGE_GATE_COPY.invalidYear);
      return;
    }

    // Check if year is reasonable (between 1900 and current year)
    if (year < 1900 || year > currentYear) {
      setError(AGE_GATE_COPY.invalidYear);
      return;
    }

    // Check age (must be 18+)
    const age = currentYear - year;
    if (age < 18) {
      setError(AGE_GATE_COPY.error);
      return;
    }

    // Success - animate out and set verified
    setIsExiting(true);
    setTimeout(() => {
      setAgeVerified(true);
      setIsVisible(false);
    }, shouldReduceMotion ? 0 : 1200);
  };

  // Don't render if already verified or not yet checked
  if (ageVerified || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <m.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-burgundy-deep noise-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{
            opacity: { duration: MOTION.duration.fast },
            y: { duration: MOTION.duration.cinematic, ease: MOTION.easing },
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-gold) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Content */}
          <m.div
            className="relative z-10 flex flex-col items-center px-6 text-center max-w-md"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: MOTION.duration.medium, ease: MOTION.easing }}
          >
            {/* Logo / Brand */}
            <m.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: MOTION.duration.medium }}
            >
              <span className="font-brand text-gold text-fluid-3xl sm:text-fluid-4xl tracking-wide sm:tracking-wider whitespace-nowrap">
                {BRAND.name}
              </span>
              <div className="mt-2">
                <span className="font-display italic text-cream/90 text-fluid-base">
                  {BRAND.taglineFr}
                </span>
              </div>
            </m.div>

            {/* Divider */}
            <m.div
              className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: MOTION.duration.medium }}
            />

            {/* Heading */}
            <m.h1
              className="font-display text-cream text-fluid-2xl mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: MOTION.duration.medium }}
            >
              {AGE_GATE_COPY.heading}
            </m.h1>

            <m.p
              className="font-body text-cream/85 text-fluid-base mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: MOTION.duration.medium }}
            >
              {AGE_GATE_COPY.subheading}
            </m.p>

            {/* Form */}
            <m.form
              onSubmit={handleSubmit}
              className="w-full max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: MOTION.duration.medium }}
            >
              <div className="mb-6">
                <label
                  htmlFor="birthYear"
                  className="block font-brand text-xs tracking-[0.2em] text-gold uppercase mb-2"
                >
                  {AGE_GATE_COPY.label}
                </label>
                <input
                  type="text"
                  id="birthYear"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  value={birthYear}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setBirthYear(value);
                    setError('');
                  }}
                  placeholder={AGE_GATE_COPY.placeholder}
                  className="w-full bg-transparent border border-gold/40 px-4 py-3 text-center font-body text-cream text-lg tracking-wider placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors"
                  aria-describedby={error ? 'birthYearError' : undefined}
                />
                {error && (
                  <m.p
                    id="birthYearError"
                    className="mt-2 text-sm text-gold-light"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                  >
                    {error}
                  </m.p>
                )}
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-4"
                aria-label={AGE_GATE_COPY.button}
              >
                <span>{AGE_GATE_COPY.button}</span>
              </button>
            </m.form>

            {/* Legal text */}
            <m.p
              className="mt-8 text-xs text-cream/70 max-w-xs leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: MOTION.duration.medium }}
            >
              {AGE_GATE_COPY.legal}
            </m.p>
          </m.div>
        </m.div>
      )}

      {/* Exiting animation */}
      {isExiting && (
        <m.div
          className="fixed inset-0 z-[9999] bg-burgundy-deep"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{
            duration: MOTION.duration.cinematic,
            ease: MOTION.easing,
          }}
        />
      )}
    </AnimatePresence>
  );
}
