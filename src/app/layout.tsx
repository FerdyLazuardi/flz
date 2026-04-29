import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, Gloria_Hallelujah } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const scribbled = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ferdy-fadhil-lazuardi.my.id'),
  alternates: {
    canonical: 'https://ferdy-fadhil-lazuardi.my.id',
  },
  title: {
    default: 'Ferdy Fadhil Lazuardi | Learning Designer & Instructional Designer',
    template: '%s | Ferdy Fadhil Lazuardi',
  },
  description: 'Official portfolio of Ferdy Fadhil Lazuardi — Learning Designer & Instructional Designer bridging pedagogy with advanced technology to create impactful digital learning experiences.',
  keywords: ['Ferdy Fadhil Lazuardi', 'Ferdy Lazuardi', 'Learning Designer', 'Educational Technology', 'Instructional Designer', 'Multimedia Designer', 'Instructional Technology', 'Digital Learning'],
  openGraph: {
    title: 'Ferdy Fadhil Lazuardi | Learning Designer & Instructional Designer',
    description: 'Portfolio of Ferdy Fadhil Lazuardi — Learning Designer & Instructional Designer merging creative multimedia design with AI to deliver engaging digital learning experiences.',
    url: 'https://ferdy-fadhil-lazuardi.my.id',
    siteName: 'Ferdy Fadhil Lazuardi',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ferdy Fadhil Lazuardi | Learning Designer & Instructional Designer',
    description: 'Official portfolio of Ferdy Fadhil Lazuardi — Learning Designer & Instructional Designer bridging pedagogy with advanced technology.',
  },
  icons: {
    icon: [
      { url: '/logo_web/Logo_DigitalLayers.svg', type: 'image/svg+xml' },
      { url: '/logo_web/Logo_DigitalLayers_WhiteBg.svg', type: 'image/svg+xml', sizes: '48x48' },
      { url: '/logo_web/Logo_DigitalLayers_WhiteBg.svg', type: 'image/svg+xml', sizes: '192x192' },
    ],
    shortcut: '/logo_web/Logo_DigitalLayers.svg',
    apple: '/logo_web/Logo_DigitalLayers_WhiteBg.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ferdy Fadhil Lazuardi',
    alternateName: 'Ferdy Lazuardi',
    url: 'https://ferdy-fadhil-lazuardi.my.id',
    image: 'https://ferdy-fadhil-lazuardi.my.id/logo_web/Logo_DigitalLayers_WhiteBg.svg',
    jobTitle: ['Learning Designer', 'Instructional Designer'],
    description: 'Learning Designer & Instructional Designer focused on creating engaging, objective-driven learning materials that empower employees and learners to grow.',
    sameAs: [
      'https://www.linkedin.com/in/ferdy10/',
      'https://www.behance.net/ferdylazuardi',
      'https://medium.com/@ferdy.lazuardi',
      'https://github.com/FerdyLazuardi'
    ]
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ferdy Fadhil Lazuardi',
    url: 'https://ferdy-fadhil-lazuardi.my.id',
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${scribbled.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col font-sans bg-transparent relative"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
