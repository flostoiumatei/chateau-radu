'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HERO_COPY, MOTION } from '@/lib/constants';
import { Divider } from '@/components/ui/Divider';

// Kinetic text animation for the main title
function AnimatedTitle({ text }: { text: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span>{text}</span>;
  }

  return (
    <>
      {text.split('').map((char, index) => (
        <m.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: MOTION.duration.medium,
            delay: 0.5 + index * 0.05,
            ease: MOTION.easing,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </m.span>
      ))}
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleScrollDown = () => {
    const nextSection = document.querySelector('#wine');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.duration.medium,
        ease: MOTION.easing,
      },
    },
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Solid burgundy background */}
      <div className="absolute inset-0 bg-burgundy-deep" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Split layout container */}
      <div className="relative z-10 min-h-[100svh] flex flex-col lg:flex-row">

        {/* Left: Text content */}
        <m.div
          className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-16 py-16 lg:py-0"
          style={shouldReduceMotion ? {} : { y: contentY, opacity }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-lg text-center lg:text-left">
            {/* Ornament text */}
            <m.p
              className="font-display italic text-gold text-fluid-sm tracking-[0.05em] sm:tracking-[0.2em] mb-6"
              variants={itemVariants}
            >
              {HERO_COPY.ornament}
            </m.p>

            {/* Main title with letter animation */}
            <h1 className="font-brand text-cream text-[11vw] sm:text-[8vw] lg:text-fluid-hero tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.15em] leading-tight mb-4 whitespace-nowrap">
              <AnimatedTitle text={HERO_COPY.title} />
            </h1>

            {/* Vintage year */}
            <m.p
              className="font-brand text-gold text-fluid-2xl tracking-[0.2em] sm:tracking-[0.5em] mb-4"
              variants={itemVariants}
            >
              {HERO_COPY.vintage}
            </m.p>

            {/* Wine name */}
            <m.p
              className="font-display italic text-cream text-fluid-3xl mb-2"
              variants={itemVariants}
            >
              {HERO_COPY.wineName}
            </m.p>

            {/* Grape variety */}
            <m.p
              className="font-brand text-cream/85 text-fluid-xs tracking-[0.15em] sm:tracking-[0.4em] uppercase mb-8"
              variants={itemVariants}
            >
              {HERO_COPY.grape}
            </m.p>

            {/* Ornamental divider */}
            <m.div className="mb-8" variants={itemVariants}>
              <Divider className="text-gold" />
            </m.div>

            {/* Tagline */}
            <m.p
              className="font-display italic text-cream/90 text-fluid-lg mb-8 lg:mb-12"
              variants={itemVariants}
            >
              {HERO_COPY.tagline}
            </m.p>

            {/* CTAs */}
            <m.div
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <a
                href="#wine"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollDown();
                }}
                className="btn-primary min-w-[180px] whitespace-nowrap text-xs sm:text-sm"
              >
                <span>{HERO_COPY.ctaPrimary}</span>
              </a>
              <a
                href="#reservation"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.querySelector('#reservation');
                  if (section) {
                    section.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
                  }
                }}
                className="btn-secondary min-w-[180px] whitespace-nowrap text-xs sm:text-sm"
              >
                {HERO_COPY.ctaSecondary}
              </a>
            </m.div>
          </div>
        </m.div>

        {/* Right: Bottle image */}
        <m.div
          className="relative w-full lg:w-[45%] min-h-[50vh] lg:min-h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: MOTION.duration.cinematic, delay: 0.2 }}
        >
          {/* Gradient fade from burgundy into image */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-burgundy-deep via-burgundy-deep/40 to-transparent lg:block hidden" />
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-burgundy-deep via-transparent to-burgundy-deep/60 lg:hidden" />

          <m.div
            className="relative w-full h-full min-h-[50vh] lg:min-h-full"
            style={shouldReduceMotion ? {} : { scale: imageScale }}
          >
            <Image
              src="/images/bottle-hero.png"
              alt={`${HERO_COPY.wineName} ${HERO_COPY.vintage} — ${HERO_COPY.title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              priority
              quality={85}
            />
          </m.div>
        </m.div>
      </div>

      {/* Scroll indicator */}
      <m.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-gold/80 hover:text-gold transition-colors scroll-indicator"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: MOTION.duration.medium }}
        aria-label="Derulează în jos"
      >
        <ChevronDown className="w-8 h-8" />
      </m.button>
    </section>
  );
}
