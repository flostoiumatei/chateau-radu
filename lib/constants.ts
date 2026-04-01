// ==============================
// CHÂTEAU RADU BRAND CONSTANTS
// ==============================

export const BRAND = {
  name: 'Château Radu',
  taglineFr: 'Le vin est la poésie de la terre',
  taglineRo: 'Din mâinile bunicului, în paharul tău',
  wine: 'Savoare',
  grape: 'Muscat Ottonel',
  vintage: '2025',
  bottleNote: 'Mis en bouteille avec âme et patience',
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
  ornament: 'Le vin est la poésie de la terre',
  title: 'Château Radu',
  vintage: '2025',
  wineName: 'Savoare',
  grape: 'MUSCAT OTTONEL',
  tagline: 'Din mâinile bunicului, în paharul tău',
  ctaPrimary: 'Descoperă povestea',
  ctaSecondary: 'Rezervă o degustare',
} as const;

// ==============================
// STORY SECTION COPY
// ==============================

export const STORY_COPY = {
  label: 'POVESTEA NOASTRĂ',
  heading: 'Unde începe totul',
  body1: 'Era o dimineață de toamnă când bunicul a îngenuncheat în pământul rece și a sădit prima viță de Muscat Ottonel. Își ținea răsadurile ca pe niște copii — le vorbea, le cânta, le dădea nume. Spunea că pământul ascultă. Că dacă pui suflet în rădăcini, el își va aminti. Château Radu nu este doar un nume pe o etichetă. Este numele lui — și tot ce ne-a lăsat moștenire.',
  body2: 'Suntem trei surori — două gemene și cea mai mare. Cea mare ține cheia cramei; ea știe la ce temperatură respiră vinul și când e momentul să-l lași în pace. Una dintre gemene are nasul — simte ploaia în butoi și soarele în must. Cealaltă vede ce alții nu pot: ea desenează etichetele, alege cuvintele, transformă un vin în poveste. Trei fire diferite, același țesut.',
  body3: '« Faceți un vin care să-i facă pe oameni să rămână la masă. » Așa ne-a spus bunicul într-o seară, cu paharul în mână și ochii spre vie. Nu am înțeles atunci. Înțelegem acum. Savoare nu este doar un nume — este o promisiune. Să savurezi încet. Să rămâi. Să simți că timpul se oprește, măcar pentru o clipă.',
  frenchAccent: '« Le temps ne compte plus quand le vin est bon »',
  sistersNote: '« Puneți suflet în rădăcini, și pământul își va aminti. »',
  stats: [
    { value: '2', label: 'Generații' },
    { value: '4', label: 'Hectare' },
    { value: '1987', label: 'Prima Vie' },
  ],
} as const;

// ==============================
// TASTING NOTES COPY
// ==============================

export const TASTING_COPY = {
  label: 'NOTE DE DEGUSTARE',
  heading: 'Cum vorbește vinul',
  visual: {
    title: 'Vizual',
    description: 'Ține paharul spre lumină. Vezi aurul pal, cu un licăr verzui care tremură la margine — ca dimineața în vie, înainte să se ridice ceața.',
    intensity: 70,
  },
  aroma: {
    title: 'Buchet',
    description: 'Închide ochii și inspiră. Flori albe, trandafir muscat, piersică albă care abia s-a copt. Și undeva, în adâncime — o notă de litchi pe care o simți doar dacă ai răbdare.',
    intensity: 90,
  },
  taste: {
    title: 'La Gust',
    description: 'Prima sorbitură e prospețime pură. A doua dezvăluie o dulceață fină care nu insistă. A treia — un final mineral care rămâne, ca amintirea unei seri perfecte.',
    intensity: 85,
  },
  servingTemp: '8 – 10°C',
  sensoryWheel: [
    { segment: 'Vizual', description: 'Auriu pal, limpede, cu reflexe verzui care joacă în lumină.' },
    { segment: 'Aromatic', description: 'Flori albe, trandafir muscat, piersică albă, litchi discret.' },
    { segment: 'Gust', description: 'Prospețime elegantă, dulceață reziduală care nu insistă.' },
    { segment: 'Finișeu', description: 'Final mineral și aromatic — lung, lin, ca o seară de vară.' },
    { segment: 'Textură', description: 'Corp mediu, aciditate bine integrată, mătăsos și elegant.' },
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
    note: 'Anul în care am îndrăznit. Primul must, primele greșeli, primele lecții. Bunicul ar fi zâmbit.',
    badge: 'În curând',
  },
  {
    year: '2024',
    status: 'sold_out',
    note: 'Anul în care am știut. S-a dus din mână în mână, de la masă la masă, până nu a mai rămas nici o sticlă.',
    badge: 'Epuizat',
  },
  {
    year: '2025',
    status: 'current',
    note: 'Anul în care am ajuns. Expresia cea mai pură a cine suntem — trei surori, un pământ, o promisiune ținută.',
    badge: 'Disponibil',
  },
] as const;

// ==============================
// TERROIR COPY
// ==============================

export const TERROIR_COPY = {
  label: 'TERROIR',
  heading: 'Pământul care ascultă',
  description: 'Există un loc în dealurile României unde dimineața miroase a lut umed și seara aduce brize care șoptesc printre rândurile de viță. Aici, solul ține minte fiecare ploaie. Aici, soarele știe exact când să se retragă. Bunicul spunea: « Ce terroir — c\'est magnifique. » Avea dreptate.',
  stats: [
    {
      title: 'Altitudine',
      value: '350m',
      description: 'Unde ceața dimineții întâlnește primul rază de soare — răcoarea care dă complexitate.',
    },
    {
      title: 'Sol',
      value: 'Argilos-Calcaros',
      description: 'Argila ține apa ca o mamă. Calcarul dă mineralitatea care tremură pe limbă.',
    },
    {
      title: 'Microclimat',
      value: 'Continental',
      description: 'Nopți răcoroase care păstrează aroma, zile calde care coc strugurii cu răbdare.',
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
  heading: 'Rămâi la masă cu noi',
  subheading: 'Primești vești despre recolte noi, degustări private și poveștile din spatele fiecărei sticle. Pentru cei care știu că un vin bun merită răbdare.',
  placeholder: 'adresa@email.ro',
  button: 'Intră în cerc',
  success: 'Bine ai venit la masa noastră.',
  alreadySubscribed: 'Ești deja la masa noastră.',
  error: 'A apărut o eroare. Vă rugăm încercați din nou.',
} as const;

// ==============================
// RESERVATION COPY
// ==============================

export const RESERVATION_COPY = {
  label: 'DEGUSTĂRI PRIVATE',
  heading: 'Veniți la noi acasă',
  subheading: 'O degustare la Château Radu nu este un eveniment — este o seară între prieteni. Veniți, și vă vom povesti tot ce vinul nu poate spune singur.',
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
  tagline: 'Le vin est la poésie de la terre',
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
      title: 'Prima turnare',
      description: 'Primul pahar este o promisiune. Savoare se dezvăluie treptat — mai întâi parfumul, apoi lumina, apoi liniștea care se așterne la masă.',
    },
    {
      id: 'label',
      title: 'Eticheta',
      description: 'Desenată de mâna care vede ce alții nu pot. Fiecare linie poartă amprenta surorii artiste — cea care transformă un vin în poveste vizuală.',
    },
    {
      id: 'pour',
      title: 'Culoarea',
      description: 'Auriu pal cu reflexe verzui — culoarea dimineților de toamnă în vie, când roua încă strălucește pe ciorchini.',
    },
    {
      id: 'specs',
      title: 'Detalii',
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
  description: 'Descoperă Savoare 2025 — un Muscat Ottonel născut din pământul românesc, crescut de trei surori, purtat de povestea bunicului. Château Radu.',
  keywords: 'vin romanesc, muscat ottonel, chateau radu, savoare, vin premium, degustare vin, vin alb',
  ogImage: '/og-image.jpg',
  siteUrl: 'https://chateau-radu.ro',
} as const;
