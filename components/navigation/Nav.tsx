'use client';

import { useEffect, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { NAV_LINKS, MOTION } from '@/lib/constants';
import { MobileMenu } from './MobileMenu';

export function Nav() {
  const { menuOpen, setMenuOpen, language, setLanguage } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <>
      <m.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: MOTION.duration.medium, ease: MOTION.easing }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-brand text-burgundy text-lg md:text-xl tracking-wider hover:text-gold transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
              }}
              aria-label="Château Radu - Acasă"
            >
              CHÂTEAU RADU
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-body text-sm text-ink/80 hover:text-gold transition-colors tracking-wide"
                >
                  {link.label}
                </a>
              ))}

              {/* Language Toggle */}
              <div className="flex items-center gap-2 ml-4 border-l border-muted/30 pl-4">
                <button
                  onClick={() => setLanguage('ro')}
                  className={`text-sm font-body transition-colors ${
                    language === 'ro' ? 'text-gold' : 'text-muted hover:text-ink'
                  }`}
                  aria-label="Română"
                >
                  RO
                </button>
                <span className="text-muted/50">|</span>
                <button
                  onClick={() => setLanguage('fr')}
                  className={`text-sm font-body transition-colors ${
                    language === 'fr' ? 'text-gold' : 'text-muted hover:text-ink'
                  }`}
                  aria-label="Français"
                >
                  FR
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
              aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'}
              aria-expanded={menuOpen}
            >
              <div className="relative w-6 h-5">
                <m.span
                  className="absolute left-0 w-full h-[2px] bg-burgundy origin-center"
                  animate={{
                    top: menuOpen ? '50%' : '0%',
                    rotate: menuOpen ? 45 : 0,
                    translateY: menuOpen ? '-50%' : 0,
                  }}
                  transition={{ duration: MOTION.duration.fast, ease: MOTION.easing }}
                />
                <m.span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-burgundy"
                  animate={{
                    opacity: menuOpen ? 0 : 1,
                    scaleX: menuOpen ? 0 : 1,
                  }}
                  transition={{ duration: MOTION.duration.fast, ease: MOTION.easing }}
                />
                <m.span
                  className="absolute left-0 w-full h-[2px] bg-burgundy origin-center"
                  animate={{
                    bottom: menuOpen ? '50%' : '0%',
                    rotate: menuOpen ? -45 : 0,
                    translateY: menuOpen ? '50%' : 0,
                  }}
                  transition={{ duration: MOTION.duration.fast, ease: MOTION.easing }}
                />
              </div>
            </button>
          </nav>
        </div>
      </m.header>

      {/* Mobile Menu Overlay */}
      <MobileMenu />
    </>
  );
}
