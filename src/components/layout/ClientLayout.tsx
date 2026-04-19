"use client"

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PATH_ORDER = ['/', '/projects', '/about'];

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const prevIndex = React.useRef(0);

  const currentIndex = React.useMemo(() => {
    const index = PATH_ORDER.findIndex(p => p === '/' ? pathname === '/' : pathname.startsWith(p));
    return index === -1 ? 0 : index;
  }, [pathname]);

  const direction = React.useMemo(() => {
    if (currentIndex > prevIndex.current) return 1;
    if (currentIndex < prevIndex.current) return -1;
    return 0;
  }, [currentIndex]);

  React.useEffect(() => {
    prevIndex.current = currentIndex;
  }, [currentIndex]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const variants = {
    initial: (dir: number) => mounted ? { opacity: 0, x: dir > 0 ? 20 : dir < 0 ? -20 : 0 } : false,
    animate: { opacity: 1, x: 0 },
    exit: (dir: number) => mounted ? { opacity: 0, x: dir > 0 ? -20 : dir < 0 ? 20 : 0 } : false
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.main
        key={pathname}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-grow"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
