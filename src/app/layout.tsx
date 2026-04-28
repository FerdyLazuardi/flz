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
  title: {
    default: 'Ferdy Fadhil Lazuardi | Learning Designer & Instructional Designer',
    template: '%s | Ferdy Fadhil Lazuardi',
  },
  description: 'Portfolio of Ferdy Fadhil Lazuardi (Ferdy Lazuardi) — Educational Technology graduate, Learning Designer & Instructional Designer merging creative multimedia design with AI to deliver engaging, scalable digital learning experiences.',
  keywords: ['Ferdy Fadhil Lazuardi', 'Ferdy Lazuardi', 'Learning Designer', 'Educational Technology', 'Instructional Designer', 'Multimedia Designer'],
  openGraph: {
    title: 'Ferdy Fadhil Lazuardi | Learning Designer & Instructional Designer',
    description: 'Portfolio of Ferdy Fadhil Lazuardi (Ferdy Lazuardi) — Educational Technology graduate, Learning Designer & Instructional Designer merging creative multimedia design with AI to deliver engaging, scalable digital learning experiences.',
    url: 'https://ferdy-fadhil-lazuardi.my.id',
    siteName: 'Ferdy Fadhil Lazuardi',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/logo_web/Logo_DigitalLayers.svg',
    shortcut: '/logo_web/Logo_DigitalLayers.svg',
    apple: '/logo_web/Logo_DigitalLayers.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Person', 'WebSite'],
    name: 'Ferdy Fadhil Lazuardi',
    alternateName: 'Ferdy Lazuardi',
    url: 'https://ferdy-fadhil-lazuardi.my.id',
    jobTitle: ['Learning Designer', 'Instructional Designer'],
    description: 'Learning Designer & Instructional Designer focused on creating engaging, objective-driven learning materials that empower employees and learners to grow.',
    sameAs: [
      'https://www.linkedin.com/in/ferdy10/',
      'https://www.behance.net/ferdylazuardi'
    ]
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
