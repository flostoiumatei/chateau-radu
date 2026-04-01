// ==============================
// CHÂTEAU RADU BRAND CONSTANTS
// ==============================

export const BRAND = {
  name: 'Château Radu',
  taglineFr: 'Avec amour et passion',
  taglineRo: 'Cu dragoste și pasiune',
  wine: 'Savoare',
  grape: 'Muscat Ottonel',
  vintage: '2025',
  bottleNote: 'Mis en bouteille avec amour et passion',
} as const;

export const COLORS = {
  cream: '#f5efe4',
  parchment: '#ece4d4',
  burgundy: '#5a1a2a',
  burgundyDeep: '#3d0f1c',
  gold: '#b8922a',
  goldLight: '#d4a843',
  ink: '#1e1209',
  muted: '#7a6a58',
  surface: 'rgba(245, 239, 228, 0.85)',
} as const;

export const MOTION = {
  easing: [0.25, 0.1, 0.25, 1] as const,
  duration: {
    fast: 0.3,
    medium: 0.6,
    slow: 1.0,
    cinematic: 1.6,
  },
} as const;

// ==============================
// NAVIGATION
// ==============================

export const NAV_LINKS = [
  { label: 'Despre', href: '#story' },
  { label: 'Degustare', href: '#tasting' },
  { label: 'Savoare', href: '#wine' },
  { label: 'Rezervare', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
] as const;

// ==============================
// HERO SECTION COPY
// ==============================

export const HERO_COPY = {
  ornament: 'Mis en bouteille avec amour et passion',
  title: 'Château Radu',
  vintage: '2025',
  wineName: 'Savoare',
  grape: 'MUSCAT OTTONEL',
  tagline: 'Cu dragoste și pasiune',
  ctaPrimary: 'Descoperă',
  ctaSecondary: 'Rezervă o degustare',
} as const;

// ==============================
// STORY SECTION COPY
// ==============================

export const STORY_COPY = {
  label: 'POVESTEA NOASTRĂ',
  heading: 'Un vin născut din pasiune',
  body1: 'Château Radu s-a născut dintr-o viziune singulară: să ducă soiul Muscat Ottonel la cea mai înaltă expresie a sa, captând sufletul fiecărei recolte printr-o atenție meticuloasă față de vie și de pivniță.',
  body2: 'Cuvée-ul Savoare — savoare în română — celebrează bogăția aromatică a acestui soi delicat, vinificat cu o grijă ce respectă caracterul natural al fructului. Elegant, vibrant, inconfundabil.',
  frenchAccent: '« Mis en bouteille avec amour et passion »',
  stats: [
    { value: '100%', label: 'Muscat Ottonel' },
    { value: '2025', label: 'Primul Millésime' },
    { value: '750ml', label: 'Format Tradițional' },
  ],
} as const;

// ==============================
// TASTING NOTES COPY
// ==============================

export const TASTING_COPY = {
  label: 'NOTE DE DEGUSTARE',
  heading: 'Experiența senzorială',
  visual: {
    title: 'Vizual',
    description: 'Robă aurie pală, limpede, cu reflexe verzui caracteristice unui Muscat Ottonel tânăr.',
    intensity: 70,
  },
  aroma: {
    title: 'Buchet',
    description: 'Flori albe, trandafir muscat, piersică albă și o notă delicată de litchi. Extraordinar de expresiv.',
    intensity: 90,
  },
  taste: {
    title: 'La Gust',
    description: 'Prospețime elegantă, dulceață reziduală fină, final mineral și aromatic, lung și plăcut.',
    intensity: 85,
  },
  servingTemp: '8 – 10°C',
  sensoryWheel: [
    { segment: 'Vizual', description: 'Robă aurie pală, limpede, cu reflexe verzui caracteristice.' },
    { segment: 'Aromatic', description: 'Flori albe, trandafir muscat, piersică albă, litchi.' },
    { segment: 'Gust', description: 'Prospețime elegantă, dulceață reziduală fină.' },
    { segment: 'Finișeu', description: 'Final mineral și aromatic, lung și plăcut.' },
    { segment: 'Textură', description: 'Corp mediu, aciditate bine integrată, elegant.' },
    { segment: 'Pairing', description: 'Fructe de mare, brânzeturi fine, deserturi ușoare.' },
  ],
} as const;

// ==============================
// VINTAGE TIMELINE DATA
// ==============================

export const VINTAGES = [
  {
    year: '2023',
    status: 'coming_soon',
    note: 'Primul an de experimentare. În curând vom dezvălui povestea.',
    badge: 'În curând',
  },
  {
    year: '2024',
    status: 'sold_out',
    note: 'Ediție limitată, complet epuizată. Un an memorabil.',
    badge: 'Epuizat',
  },
  {
    year: '2025',
    status: 'current',
    note: 'Cuvée-ul Savoare. Expresia perfectă a viziunii noastre.',
    badge: 'Disponibil',
  },
] as const;

// ==============================
// TERROIR COPY
// ==============================

export const TERROIR_COPY = {
  label: 'TERROIR',
  heading: 'Sufletul Terasei',
  description: 'Vinurile noastre sunt expresia autentică a pământului românesc, cultivate cu respect pentru tradiție și natură.',
  stats: [
    {
      title: 'Altitudine',
      value: '350m',
      description: 'Deasupra nivelului mării, pentru răcoare și complexitate.',
    },
    {
      title: 'Sol',
      value: 'Argilos-Calcaros',
      description: 'Minerale esențiale pentru structură și finețe.',
    },
    {
      title: 'Microclimat',
      value: 'Continental',
      description: 'Nopți răcoroase, zile însorite — ideal pentru aromă.',
    },
  ],
} as const;

// ==============================
// FOOD PAIRING DATA
// ==============================

export const PAIRINGS = [
  {
    id: 'seafood',
    category: 'Fructe de Mare',
    icon: '🦐',
    description: 'Prospețimea Muscat-ului completează perfect aromele marine delicate.',
    suggestions: ['Stridii proaspete', 'Tartar de ton', 'Creveți la grătar'],
  },
  {
    id: 'cheese',
    category: 'Brânzeturi',
    icon: '🧀',
    description: 'Brânzeturile fine și cremose găsesc în Savoare un partener ideal.',
    suggestions: ['Brie de Meaux', 'Burrata', 'Chèvre proaspăt'],
  },
  {
    id: 'desserts',
    category: 'Deserturi',
    icon: '🍰',
    description: 'Dulceața reziduală se armonizează cu deserturi ușoare și fructate.',
    suggestions: ['Tarte cu fructe', 'Panna cotta', 'Sorbete de piersici'],
  },
  {
    id: 'appetizers',
    category: 'Aperitive',
    icon: '🥗',
    description: 'Aperitive elegante pentru începutul unei experiențe culinare.',
    suggestions: ['Bruschette', 'Carpaccio', 'Salată cu nuci'],
  },
  {
    id: 'fish',
    category: 'Pește',
    icon: '🐟',
    description: 'Peștele alb și preparat simplu subliniază eleganța vinului.',
    suggestions: ['Doradă la cuptor', 'Păstrăv la grătar', 'Ceviche'],
  },
  {
    id: 'vegetables',
    category: 'Legume',
    icon: '🥬',
    description: 'Preparate vegetariene rafinate, în armonie cu prospețimea vinului.',
    suggestions: ['Sparanghel alb', 'Risotto cu ciuperci', 'Legume la grătar'],
  },
] as const;

// ==============================
// WINE CLUB COPY
// ==============================

export const WINE_CLUB_COPY = {
  label: 'CERCUL CHÂTEAU RADU',
  heading: 'Intrați în cercul nostru',
  subheading: 'Fiți primii care află de noile recolte, degustări exclusive și momente speciale. Réservé aux passionnés.',
  placeholder: 'adresa@email.ro',
  button: 'Abonează-te',
  success: 'Bine ați venit în cerc. Avec plaisir.',
  alreadySubscribed: 'Ești deja abonat!',
  error: 'A apărut o eroare. Vă rugăm încercați din nou.',
} as const;

// ==============================
// RESERVATION COPY
// ==============================

export const RESERVATION_COPY = {
  label: 'DEGUSTĂRI PRIVATE',
  heading: 'Rezervați o experiență',
  subheading: 'Pentru degustări private, evenimente de grup sau parteneriate, suntem bucuroși să vă primim.',
  button: 'Trimite cererea',
  success: 'Cererea dvs. a fost înregistrată. Vă vom contacta în curând. Merci.',
  error: 'A apărut o eroare. Vă rugăm încercați din nou.',
  fields: {
    name: 'Nume complet',
    email: 'Adresă email',
    phone: 'Telefon',
    date: 'Data preferată',
    guests: 'Număr persoane',
    message: 'Mesaj (opțional)',
  },
  guestOptions: [1, 2, 3, 4, 5, 6, 7, 8],
} as const;

// ==============================
// CONTACT COPY
// ==============================

export const CONTACT_COPY = {
  label: 'CONTACT',
  heading: 'Scrieți-ne',
  subheading: 'Suntem aici pentru orice întrebare sau colaborare.',
  button: 'Trimite mesajul',
  success: 'Mesajul a fost trimis cu succes. Vă mulțumim!',
  error: 'A apărut o eroare. Vă rugăm încercați din nou.',
  fields: {
    name: 'Numele dvs.',
    email: 'Email',
    message: 'Mesajul dvs.',
  },
} as const;

// ==============================
// FOOTER COPY
// ==============================

export const FOOTER_COPY = {
  logo: 'CHÂTEAU RADU',
  tagline: 'Avec amour et passion',
  copyright: '© 2025 Château Radu · Savoare · Muscat Ottonel · Toate drepturile rezervate',
  legal: 'Consumul excesiv de alcool dăunează sănătății. A se consuma cu moderație.',
  ageWarning: '+18',
  links: [
    { label: 'Despre', href: '#story' },
    { label: 'Degustare', href: '#tasting' },
    { label: 'Rezervare', href: '#reservation' },
    { label: 'Contact', href: '#contact' },
    { label: 'Politică de confidențialitate', href: '/privacy' },
  ],
} as const;

// ==============================
// AGE GATE COPY
// ==============================

export const AGE_GATE_COPY = {
  heading: 'Vă rugăm confirmați vârsta',
  subheading: 'Pentru a accesa acest site, trebuie să aveți cel puțin 18 ani.',
  label: 'Anul nașterii',
  placeholder: 'ex: 1990',
  button: 'Intră pe site',
  legal: 'Prin intrare, acceptați că vinul este destinat exclusiv adulților.',
  error: 'Trebuie să aveți cel puțin 18 ani pentru a accesa acest site.',
  invalidYear: 'Vă rugăm introduceți un an valid.',
} as const;

// ==============================
// WINE SHOWCASE DATA
// ==============================

export const WINE_SHOWCASE = {
  frames: [
    {
      id: 'reveal',
      title: 'Descoperă',
      description: 'Savoare se dezvăluie. O expresie pură a soiului Muscat Ottonel.',
    },
    {
      id: 'label',
      title: 'Eticheta',
      description: 'Design inspirat din tradiția vinurilor de castel, cu accente moderne și elegante.',
    },
    {
      id: 'pour',
      title: 'Esența',
      description: 'Culoare aurie pală, reflexe verzui — semne ale prospețimii și tinereții.',
    },
    {
      id: 'specs',
      title: 'Specificații',
      specs: [
        { label: 'Volum alcoolic', value: '12.5%' },
        { label: 'Aciditate', value: '5.8 g/l' },
        { label: 'Zahăr rezidual', value: '4 g/l' },
        { label: 'Conținut', value: '750 ml' },
      ],
    },
  ],
} as const;

// ==============================
// SEO METADATA
// ==============================

export const SEO = {
  title: 'Château Radu | Savoare 2025 — Muscat Ottonel Premium',
  description: 'Descoperă Savoare 2025, un Muscat Ottonel de excepție creat cu dragoste și pasiune. Château Radu — vinuri românești premium.',
  keywords: 'vin romanesc, muscat ottonel, chateau radu, savoare, vin premium, degustare vin, vin alb',
  ogImage: '/og-image.jpg',
  siteUrl: 'https://chateau-radu.ro',
} as const;
