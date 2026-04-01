import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Cinzel, EB_Garamond } from 'next/font/google';
import { Providers } from '@/components/providers/Providers';
import { SEO, BRAND } from '@/lib/constants';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#5a1a2a',
  width: 'device-width',
  initialScale: 1,
};

// Font configurations
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

// Metadata
export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  metadataBase: new URL(SEO.siteUrl),
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: SEO.siteUrl,
    title: SEO.title,
    description: SEO.description,
    siteName: BRAND.name,
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: `${BRAND.name} - ${BRAND.wine} ${BRAND.vintage}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
    images: [SEO.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SEO.siteUrl}/#business`,
      name: BRAND.name,
      description: SEO.description,
      url: SEO.siteUrl,
      logo: `${SEO.siteUrl}/logo.png`,
      image: `${SEO.siteUrl}${SEO.ogImage}`,
      priceRange: '$$$$',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'RO',
        addressRegion: 'România',
      },
    },
    {
      '@type': 'Product',
      '@id': `${SEO.siteUrl}/#product`,
      name: `${BRAND.wine} ${BRAND.vintage}`,
      description: 'Muscat Ottonel premium din România',
      brand: {
        '@type': 'Brand',
        name: BRAND.name,
      },
      category: 'Wine',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'RON',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ro"
      className={`${cormorant.variable} ${cinzel.variable} ${ebGaramond.variable}`}
    >
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* GA4 slot (empty, ready for implementation) */}
        {/* <GoogleAnalytics gaId="G-XXXXXXXXXX" /> */}
      </head>
      <body className="min-h-screen bg-cream text-ink antialiased">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="skip-link font-brand text-sm tracking-wider"
        >
          Salt la conținut
        </a>

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
