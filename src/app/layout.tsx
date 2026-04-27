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
  title: 'Ferdy Fadhil Lazuardi | Learning Designer',
  description: 'Portfolio of Ferdy Fadhil Lazuardi — Educational Technology graduate & Learning Designer merging creative multimedia design with AI to deliver engaging, scalable digital learning experiences.',
  icons: {
    icon: '/logo_web/Logo_DigitalLayers.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${scribbled.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans bg-transparent relative"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
