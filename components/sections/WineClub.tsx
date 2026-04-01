'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';
import { newsletterSchema, type NewsletterFormData } from '@/lib/validations/newsletter';
import { WINE_CLUB_COPY, MOTION } from '@/lib/constants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'already_subscribed' | 'error';

export function WineClub() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      if (result.alreadySubscribed) {
        setStatus('already_subscribed');
      } else {
        setStatus('success');
        reset();
      }
    } catch {
      setStatus('error');
    }
  };

  const showForm = status === 'idle' || status === 'loading' || status === 'error';

  return (
    <section className="bg-burgundy-deep noise-overlay section-padding overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-gold) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* Header */}
        <ScrollReveal>
          <SectionLabel light>{WINE_CLUB_COPY.label}</SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display italic text-cream text-fluid-4xl mt-4 mb-4">
            {WINE_CLUB_COPY.heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="font-body text-cream/85 text-fluid-base mb-10 max-w-md mx-auto">
            {WINE_CLUB_COPY.subheading}
          </p>
        </ScrollReveal>

        {/* Form or Success State */}
        <AnimatePresence mode="wait">
          {showForm ? (
            <m.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: shouldReduceMotion ? 0 : MOTION.duration.medium }}
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  {...register('email')}
                  placeholder={WINE_CLUB_COPY.placeholder}
                  disabled={status === 'loading'}
                  className={`w-full bg-transparent border px-4 py-3 font-body text-cream placeholder:text-cream/40 focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-gold-light'
                      : 'border-gold/40 focus:border-gold'
                  }`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <m.p
                    id="email-error"
                    className="absolute -bottom-6 left-0 text-xs text-gold-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    role="alert"
                  >
                    {errors.email.message}
                  </m.p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary px-8 py-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <m.span
                    className="inline-block"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 className="w-5 h-5" />
                  </m.span>
                ) : (
                  <span>{WINE_CLUB_COPY.button}</span>
                )}
              </button>
            </m.form>
          ) : (
            <m.div
              key="success"
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: MOTION.duration.medium }}
            >
              <m.div
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <Check className="w-8 h-8 text-gold" />
              </m.div>
              <p className="font-display italic text-cream text-fluid-xl">
                {status === 'already_subscribed'
                  ? WINE_CLUB_COPY.alreadySubscribed
                  : WINE_CLUB_COPY.success}
              </p>
            </m.div>
          )}
        </AnimatePresence>

        {/* Error message */}
        {status === 'error' && (
          <m.p
            className="mt-4 text-sm text-gold-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {WINE_CLUB_COPY.error}
          </m.p>
        )}
      </div>
    </section>
  );
}
