'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ==============================
// TYPES
// ==============================

type CursorState = 'default' | 'hover' | 'explore' | 'hidden';

interface AppState {
  // Age verification
  ageVerified: boolean;
  setAgeVerified: (verified: boolean) => void;

  // Mobile menu
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;

  // Custom cursor
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  cursorText: string;
  setCursorText: (text: string) => void;

  // Navigation
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Language (UI only, POC)
  language: 'ro' | 'fr';
  setLanguage: (lang: 'ro' | 'fr') => void;
}

// ==============================
// STORE
// ==============================

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Age verification - persisted
      ageVerified: false,
      setAgeVerified: (verified) => set({ ageVerified: verified }),

      // Mobile menu - not persisted
      menuOpen: false,
      setMenuOpen: (open) => set({ menuOpen: open }),
      toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),

      // Custom cursor - not persisted
      cursorState: 'default',
      setCursorState: (cursorState) => set({ cursorState }),
      cursorText: '',
      setCursorText: (cursorText) => set({ cursorText }),

      // Navigation - not persisted
      activeSection: '',
      setActiveSection: (activeSection) => set({ activeSection }),

      // Language - persisted
      language: 'ro',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'chateau-radu-storage',
      partialize: (state) => ({
        ageVerified: state.ageVerified,
        language: state.language,
      }),
    }
  )
);

// ==============================
// SELECTORS (for performance)
// ==============================

export const useAgeVerified = () => useAppStore((state) => state.ageVerified);
export const useSetAgeVerified = () => useAppStore((state) => state.setAgeVerified);

export const useMenuOpen = () => useAppStore((state) => state.menuOpen);
export const useSetMenuOpen = () => useAppStore((state) => state.setMenuOpen);
export const useToggleMenu = () => useAppStore((state) => state.toggleMenu);

export const useCursorState = () => useAppStore((state) => state.cursorState);
export const useSetCursorState = () => useAppStore((state) => state.setCursorState);
export const useCursorText = () => useAppStore((state) => state.cursorText);
export const useSetCursorText = () => useAppStore((state) => state.setCursorText);

export const useActiveSection = () => useAppStore((state) => state.activeSection);
export const useSetActiveSection = () => useAppStore((state) => state.setActiveSection);

export const useLanguage = () => useAppStore((state) => state.language);
export const useSetLanguage = () => useAppStore((state) => state.setLanguage);
