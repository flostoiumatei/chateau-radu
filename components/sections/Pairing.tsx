'use client';

import { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PAIRINGS, MOTION } from '@/lib/constants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function Pairing() {
  const [activeCategory, setActiveCategory] = useState<typeof PAIRINGS[number]['id']>(PAIRINGS[0].id);
  const shouldReduceMotion = useReducedMotion();

  const activePairing = PAIRINGS.find((p) => p.id === activeCategory);

  return (
    <section className="bg-parchment section-padding overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionLabel>Asocieri</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display italic text-burgundy text-fluid-4xl mt-4">
              Savoare la masă
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-ink/60 text-fluid-base mt-4 max-w-lg mx-auto">
              Descoperă combinațiile perfecte pentru a pune în valoare aromele unice ale vinului nostru.
            </p>
          </ScrollReveal>
        </div>

        {/* Category tabs */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {PAIRINGS.map((pairing) => (
              <button
                key={pairing.id}
                onClick={() => setActiveCategory(pairing.id)}
                className={`px-4 py-2 font-brand text-xs tracking-wider uppercase transition-all relative
                  ${
                    activeCategory === pairing.id
                      ? 'text-burgundy'
                      : 'text-muted hover:text-burgundy'
                  }
                `}
              >
                {pairing.category}
                {/* Gold underline */}
                {activeCategory === pairing.id && (
                  <m.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                    layoutId="pairing-underline"
                    transition={{ duration: MOTION.duration.fast }}
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Content area */}
        <AnimatePresence mode="wait">
          {activePairing && (
            <m.div
              key={activePairing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: shouldReduceMotion ? 0 : MOTION.duration.medium }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Icon and description */}
              <div className="text-center md:text-left">
                <span className="text-6xl md:text-7xl mb-6 block">
                  {activePairing.icon}
                </span>
                <h3 className="font-display italic text-burgundy text-fluid-2xl mb-4">
                  {activePairing.category}
                </h3>
                <p className="font-body text-ink/70 text-fluid-base leading-relaxed">
                  {activePairing.description}
                </p>
              </div>

              {/* Suggestions */}
              <div className="bg-cream/70 p-6 md:p-8">
                <h4 className="font-brand text-gold text-xs tracking-wider uppercase mb-6">
                  Recomandări
                </h4>
                <ul className="space-y-4">
                  {activePairing.suggestions.map((suggestion, index) => (
                    <m.li
                      key={suggestion}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : index * 0.1,
                        duration: MOTION.duration.fast,
                      }}
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                      <span className="font-body text-ink/80">{suggestion}</span>
                    </m.li>
                  ))}
                </ul>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Visual pairing cards grid */}
        <ScrollReveal delay={0.4} className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PAIRINGS.map((pairing) => (
              <button
                key={pairing.id}
                onClick={() => setActiveCategory(pairing.id)}
                className={`p-4 text-center transition-all border ${
                  activeCategory === pairing.id
                    ? 'border-gold bg-cream shadow-md'
                    : 'border-transparent bg-cream/50 hover:bg-cream'
                }`}
              >
                <span className="text-3xl block mb-2">{pairing.icon}</span>
                <span className="font-brand text-xs tracking-wider text-burgundy/80">
                  {pairing.category}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
