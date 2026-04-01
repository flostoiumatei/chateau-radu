'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Loader2, Check, Calendar, Users } from 'lucide-react';
import { reservationSchema, type ReservationFormData } from '@/lib/validations/reservation';
import { RESERVATION_COPY, MOTION } from '@/lib/constants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// Floating label input component
function FloatingInput({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="input-group mb-6">
      <input
        {...props}
        placeholder=" "
        className={`input-luxury ${error ? 'border-burgundy' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : undefined}
      />
      <label htmlFor={props.id}>{label}</label>
      {error && (
        <m.p
          id={`${props.id}-error`}
          className="absolute -bottom-5 left-0 text-xs text-burgundy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
        >
          {error}
        </m.p>
      )}
    </div>
  );
}

export function Reservation() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [reservationId, setReservationId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
    },
  });

  const onSubmit = async (data: ReservationFormData) => {
    setStatus('loading');

    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      setReservationId(result.id);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <section id="reservation" className="bg-cream section-padding overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionLabel>{RESERVATION_COPY.label}</SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display italic text-burgundy text-fluid-4xl mt-4 mb-4">
              {RESERVATION_COPY.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-ink/70 text-fluid-base max-w-md mx-auto">
              {RESERVATION_COPY.subheading}
            </p>
          </ScrollReveal>
        </div>

        {/* Form or Success State */}
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <m.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : MOTION.duration.medium }}
            >
              <div className="bg-parchment/50 p-6 md:p-10 border border-gold/20">
                {/* Name & Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <FloatingInput
                    id="name"
                    type="text"
                    label={RESERVATION_COPY.fields.name}
                    {...register('name')}
                    error={errors.name?.message}
                    disabled={status === 'loading'}
                  />

                  <FloatingInput
                    id="email"
                    type="email"
                    label={RESERVATION_COPY.fields.email}
                    {...register('email')}
                    error={errors.email?.message}
                    disabled={status === 'loading'}
                  />
                </div>

                {/* Phone */}
                <FloatingInput
                  id="phone"
                  type="tel"
                  label={RESERVATION_COPY.fields.phone}
                  {...register('phone')}
                  error={errors.phone?.message}
                  disabled={status === 'loading'}
                />

                {/* Date & Guests row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  {/* Date picker */}
                  <div className="mb-6">
                    <label
                      htmlFor="preferredDate"
                      className="block font-brand text-xs text-gold tracking-[0.1em] uppercase mb-2"
                    >
                      {RESERVATION_COPY.fields.date}
                    </label>
                    <div className="relative">
                      <input
                        id="preferredDate"
                        type="date"
                        min={getMinDate()}
                        {...register('preferredDate')}
                        disabled={status === 'loading'}
                        className="input-luxury pl-10"
                      />
                      <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
                    </div>
                    {errors.preferredDate && (
                      <p className="text-xs text-burgundy mt-1">{errors.preferredDate.message}</p>
                    )}
                  </div>

                  {/* Guests select */}
                  <div className="mb-6">
                    <label
                      htmlFor="guests"
                      className="block font-brand text-xs text-gold tracking-[0.1em] uppercase mb-2"
                    >
                      {RESERVATION_COPY.fields.guests}
                    </label>
                    <div className="relative">
                      <Controller
                        name="guests"
                        control={control}
                        render={({ field }) => (
                          <select
                            id="guests"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            disabled={status === 'loading'}
                            className="input-luxury pl-10 appearance-none cursor-pointer"
                          >
                            {RESERVATION_COPY.guestOptions.map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? 'persoană' : 'persoane'}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      <Users className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="input-group mb-8">
                  <textarea
                    id="message"
                    rows={3}
                    {...register('message')}
                    placeholder=" "
                    disabled={status === 'loading'}
                    className="input-luxury resize-none"
                  />
                  <label htmlFor="message">{RESERVATION_COPY.fields.message}</label>
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <m.p
                    className="text-sm text-burgundy mb-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {RESERVATION_COPY.error}
                  </m.p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-primary py-4 disabled:opacity-70 disabled:cursor-not-allowed"
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
                    <span>{RESERVATION_COPY.button}</span>
                  )}
                </button>
              </div>
            </m.form>
          ) : (
            <m.div
              key="success"
              className="max-w-xl mx-auto text-center bg-parchment/50 p-10 border border-gold/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: MOTION.duration.medium }}
            >
              <m.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <Check className="w-10 h-10 text-gold" />
              </m.div>

              <p className="font-display italic text-burgundy text-fluid-xl mb-4">
                {RESERVATION_COPY.success}
              </p>

              {reservationId && (
                <p className="font-body text-muted text-sm">
                  Referință: <span className="font-mono text-burgundy">{reservationId.slice(0, 8)}</span>
                </p>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
