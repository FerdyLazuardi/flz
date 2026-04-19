"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Home, Briefcase, User } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "About", href: "/about", icon: User },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // Explicit tracking for pill to avoid Framer layoutId scroll jumps on fixed nav
  const [pillStyle, setPillStyle] = React.useState({ left: 0, width: 0, opacity: 0 })
  const navRefs = React.useRef<(HTMLAnchorElement | null)[]>([])

  React.useEffect(() => {
    if (!mounted) return
    const activeIndex = navLinks.findIndex(link => pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)))
    const activeEl = navRefs.current[activeIndex]
    if (activeEl) {
       setPillStyle({ left: activeEl.offsetLeft, width: activeEl.offsetWidth, opacity: 1 })
    } else {
       setPillStyle(prev => ({ ...prev, opacity: 0 }))
    }
  }, [pathname, mounted])

  React.useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <motion.div
        animate={mounted ? {
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0)",
          borderBottomColor: isScrolled ? "rgba(229, 231, 235, 1)" : "rgba(229, 231, 235, 0)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
          boxShadow: isScrolled ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : "none",
        } : {}}
        transition={{ duration: 0.3 }}
        className="w-full border-b transition-all"
      >
        <div className="px-6 sm:px-10 lg:px-16 mx-auto max-w-[1800px] flex h-16 items-center justify-between relative">
          {/* Left side placeholder */}
          <div className="flex-1"></div>

          {/* Desktop Navigation (Perfectly Centered) */}
          <nav className="hidden md:flex items-center gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-surface/40 backdrop-blur-sm p-1 rounded-full border border-border/50">
            {/* Absolute custom pill indicator that is immune to window scroll */}
            <motion.div
              className="absolute inset-y-1 bg-[#0a0a0a] rounded-full -z-10"
              initial={false}
              animate={{
                left: pillStyle.left,
                width: pillStyle.width,
                opacity: pillStyle.opacity
              }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />

            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  ref={(el) => { navRefs.current[idx] = el }}
                  scroll={false}
                  className={`relative z-10 px-4 py-1.5 text-sm transition-colors rounded-full font-medium ${
                    isActive ? "text-white" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Right side (Mobile Menu & CTA) */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="hidden md:block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-[#0a0a0a] text-white hover:bg-[#0a0a0a]/90 rounded-full px-7 py-2.5 font-medium h-auto"
                  onClick={() => {
                    if (pathname !== "/") {
                      window.location.href = "/#contact"
                    } else {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Get in touch
                </Button>
              </motion.div>
            </div>
            
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger 
                  render={
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  }
                />
                <SheetContent side="bottom" className="rounded-t-3xl h-[60vh] border-b-0 bg-bg-surface/95 backdrop-blur-xl">
                  <SheetHeader className="text-left mb-8">
                    <SheetTitle className="font-heading text-3xl font-extrabold tracking-tight">Navigation</SheetTitle>
                    <SheetDescription className="text-base text-text-secondary">Explore my portfolio and projects.</SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-3">
                    {navLinks.map((link, idx) => {
                      const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                      const Icon = link.icon
                      return (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Link
                            href={link.href}
                            scroll={false}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                              isActive
                                ? "bg-accent/10 text-accent font-bold shadow-sm shadow-accent/5"
                                : "hover:bg-bg-elevated text-text-primary"
                            }`}
                          >
                            <div className={`p-2 rounded-xl ${isActive ? "bg-accent/20" : "bg-bg-elevated"}`}>
                              <Icon className={`h-5 w-5 ${isActive ? "text-accent" : "text-text-secondary"}`} />
                            </div>
                            <span className="text-xl">{link.name}</span>
                          </Link>
                        </motion.div>
                      )
                    })}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button 
                        className="w-full mt-6 bg-[#0a0a0a] text-white hover:bg-[#0a0a0a]/90 rounded-2xl py-5 font-bold text-lg h-auto shadow-lg shadow-black/10"
                        onClick={() => {
                          if (pathname !== "/") {
                            window.location.href = "/#contact"
                          } else {
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                          }
                        }}
                      >
                        Get in touch
                      </Button>
                    </motion.div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
