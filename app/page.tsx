'use client';

import dynamic from 'next/dynamic';
import { Nav } from '@/components/navigation/Nav';
import { AgeGate } from '@/components/age-gate/AgeGate';
import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { Terroir } from '@/components/sections/Terroir';
import { Pairing } from '@/components/sections/Pairing';
import { BrandGallery } from '@/components/sections/BrandGallery';
import { WineClub } from '@/components/sections/WineClub';
import { Reservation } from '@/components/sections/Reservation';
import { Contact } from '@/components/sections/Contact';

// Dynamically import heavy components to reduce initial bundle size
const WineShowcase = dynamic(
  () => import('@/components/sections/WineShowcase').then((mod) => mod.WineShowcase),
  { ssr: true }
);

const TastingNotes = dynamic(
  () => import('@/components/sections/TastingNotes').then((mod) => mod.TastingNotes),
  { ssr: true }
);

const VintageTimeline = dynamic(
  () => import('@/components/sections/VintageTimeline').then((mod) => mod.VintageTimeline),
  { ssr: true }
);

const Cursor = dynamic(
  () => import('@/components/ui/Cursor').then((mod) => mod.Cursor),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      {/* Age verification gate */}
      <AgeGate />

      {/* Custom cursor (desktop only) */}
      <Cursor />

      {/* Navigation */}
      <Nav />

      {/* Main content */}
      <main id="main-content">
        {/* Hero section */}
        <Hero />

        {/* Wine Showcase (sticky scroll) */}
        <WineShowcase />

        {/* Story / Parallax section */}
        <Story />

        {/* Brand Gallery */}
        <BrandGallery />

        {/* Tasting Notes (interactive wheel) */}
        <TastingNotes />

        {/* Vintage Timeline (horizontal scroll) */}
        <VintageTimeline />

        {/* Terroir */}
        <Terroir />

        {/* Food Pairing */}
        <Pairing />

        {/* Wine Club / Newsletter */}
        <WineClub />

        {/* Reservation form */}
        <Reservation />

        {/* Contact & Footer */}
        <Contact />
      </main>
    </>
  );
}
