'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { m, AnimatePresence } from 'framer-motion';
import { Loader2, Check, Mail, MapPin, Phone } from 'lucide-react';
import { contactSchema, type ContactFormData } from '@/lib/validations/contact';
import { CONTACT_COPY, FOOTER_COPY, MOTION } from '@/lib/constants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section id="contact" className="bg-parchment section-padding overflow-hidden">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Contact info */}
            <div>
              <ScrollReveal>
                <SectionLabel>{CONTACT_COPY.label}</SectionLabel>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="font-display italic text-burgundy text-fluid-4xl mt-4 mb-4">
                  {CONTACT_COPY.heading}
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="font-body text-ink/70 text-fluid-base mb-10">
                  {CONTACT_COPY.subheading}
                </p>
              </ScrollReveal>

              {/* Contact details */}
              <div className="space-y-6">
                <ScrollReveal delay={0.3}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-brand text-xs text-gold tracking-wider uppercase mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:contact@chateau-radu.ro"
                        className="font-body text-ink hover:text-burgundy transition-colors"
                      >
                        contact@chateau-radu.ro
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-brand text-xs text-gold tracking-wider uppercase mb-1">
                        Telefon
                      </h3>
                      <a
                        href="tel:+40700000000"
                        className="font-body text-ink hover:text-burgundy transition-colors"
                      >
                        +40 700 000 000
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.5}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-brand text-xs text-gold tracking-wider uppercase mb-1">
                        Adresă
                      </h3>
                      <p className="font-body text-ink">
                        Château Radu Estate<br />
                        Regiunea viticolă, România
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Right: Form */}
            <ScrollReveal delay={0.3} direction="right">
              <AnimatePresence mode="wait">
                {status !== 'success' ? (
                  <m.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-cream p-6 md:p-8 border border-gold/20"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name */}
                    <div className="input-group mb-6">
                      <input
                        id="contact-name"
                        type="text"
                        {...register('name')}
                        placeholder=" "
                        disabled={status === 'loading'}
                        className={`input-luxury ${errors.name ? 'border-burgundy' : ''}`}
                      />
                      <label htmlFor="contact-name">{CONTACT_COPY.fields.name}</label>
                      {errors.name && (
                        <p className="text-xs text-burgundy mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="input-group mb-6">
                      <input
                        id="contact-email"
                        type="email"
                        {...register('email')}
                        placeholder=" "
                        disabled={status === 'loading'}
                        className={`input-luxury ${errors.email ? 'border-burgundy' : ''}`}
                      />
                      <label htmlFor="contact-email">{CONTACT_COPY.fields.email}</label>
                      {errors.email && (
                        <p className="text-xs text-burgundy mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="input-group mb-6">
                      <textarea
                        id="contact-message"
                        rows={5}
                        {...register('message')}
                        placeholder=" "
                        disabled={status === 'loading'}
                        className={`input-luxury resize-none ${errors.message ? 'border-burgundy' : ''}`}
                      />
                      <label htmlFor="contact-message">{CONTACT_COPY.fields.message}</label>
                      {errors.message && (
                        <p className="text-xs text-burgundy mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Error message */}
                    {status === 'error' && (
                      <m.p
                        className="text-sm text-burgundy mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {CONTACT_COPY.error}
                      </m.p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full btn-primary py-4 disabled:opacity-70"
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
                        <span>{CONTACT_COPY.button}</span>
                      )}
                    </button>
                  </m.form>
                ) : (
                  <m.div
                    key="success"
                    className="bg-cream p-8 border border-gold/20 text-center h-full flex flex-col items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: MOTION.duration.medium }}
                  >
                    <m.div
                      className="w-16 h-16 mb-6 rounded-full bg-gold/20 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <Check className="w-8 h-8 text-gold" />
                    </m.div>
                    <p className="font-display italic text-burgundy text-fluid-xl">
                      {CONTACT_COPY.success}
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-burgundy-deep text-cream py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Logo & tagline */}
            <div>
              <h3 className="font-brand text-2xl tracking-wider mb-2">
                {FOOTER_COPY.logo}
              </h3>
              <p className="font-display italic text-gold text-sm">
                {FOOTER_COPY.tagline}
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              {FOOTER_COPY.links.slice(0, 4).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-cream/70 hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Legal */}
            <div>
              <p className="font-body text-xs text-cream/50 leading-relaxed">
                {FOOTER_COPY.legal}
              </p>
              <p className="font-brand text-gold text-sm mt-2">
                {FOOTER_COPY.ageWarning}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gold/20 mb-8" />

          {/* Copyright */}
          <div className="text-center">
            <p className="font-body text-xs text-cream/50">
              {FOOTER_COPY.copyright}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
