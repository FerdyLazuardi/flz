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
  title: 'Ferdy Fadhil Lazuardi | Learning Designer × AI',
  description: 'Portfolio of Ferdy Fadhil Lazuardi — Educational Technology graduate & Learning Designer merging creative multimedia design with AI to deliver engaging, scalable digital learning experiences.',
};

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { CustomCursor } from '@/components/ui/custom-cursor';

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
        {/* Global Fixed Parallax Background */}
        <div className="fixed inset-0 -z-50 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        {/* Subtle global gradient orb */}
        <div className="fixed top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[80rem] h-[80rem] opacity-20 pointer-events-none -z-40">
          <div className="absolute inset-0 rounded-[100%] bg-gradient-to-tr from-blue-100 via-purple-100 to-transparent blur-[120px]" />
        </div>
        
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
          <Navbar />
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
