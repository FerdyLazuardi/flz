import { FloatingNav } from '@/components/layout/FloatingNav';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { ClientLayout } from '@/components/layout/ClientLayout';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col relative">
      {/* Global Fixed Parallax Background */}
      <div className="fixed inset-0 -z-50 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      {/* Subtle global gradient orb */}
      <div className="fixed top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[80rem] h-[80rem] opacity-20 pointer-events-none -z-40">
        <div className="absolute inset-0 rounded-[100%] bg-gradient-to-tr from-blue-100 via-purple-100 to-transparent blur-[120px]" />
      </div>
      
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
        <FloatingNav />
        <ClientLayout>{children}</ClientLayout>
      </ThemeProvider>
    </div>
  );
}
