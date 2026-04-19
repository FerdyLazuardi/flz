"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Home, Briefcase, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  { name: "Get in touch", href: "#contact", icon: Mail },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("")

  React.useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Detect if we are at the bottom for "Get in touch" on Home page
      if (pathname === "/") {
        const contactEl = document.getElementById("contact")
        if (contactEl) {
          const rect = contactEl.getBoundingClientRect()
          // If the contact section has entered the viewport significantly
          if (rect.top <= window.innerHeight * 0.5) {
            setActiveSection("#contact")
            return
          }
        }
      }
      setActiveSection("")
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      if (pathname !== "/") {
        window.location.href = `/${href}`
      } else {
        const targetId = href.replace("#", "")
        const elem = document.getElementById(targetId)
        if (elem) {
          const yOffset = -100 // Navbar height offset
          const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: "smooth" })
        }
      }
    }
  }

  const renderLinkContent = (name: string, isActive: boolean) => (
    <span className="relative inline-block py-1 px-1">
      <span className="relative z-10 transition-colors duration-300">
        {name}
      </span>
      {isActive && (
        <motion.span 
          layoutId="nav-stabilo-mark"
          className="absolute bottom-1 left-[-10%] -z-10 h-[40%] w-[120%] bg-[#fef08a] dark:bg-[#ca8a04]/80 rounded-sm"
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
            mass: 1
          }}
        />
      )}
    </span>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">
      <motion.div
        animate={mounted ? {
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0)",
          borderBottomColor: isScrolled ? "rgba(229, 231, 235, 1)" : "rgba(229, 231, 235, 0)",
          backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
          boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.05)" : "none",
        } : {}}
        transition={{ duration: 0.4 }}
        className="w-full border-b transition-all pointer-events-auto"
      >
        <div className="px-6 sm:px-10 lg:px-16 mx-auto max-w-[1800px] flex h-20 items-center justify-center relative">
          
          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("#")
              const isActive = isHash 
                ? (activeSection === link.href)
                : (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))) && activeSection === ""

              if (isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-[10px] font-black transition-colors uppercase tracking-[0.3em] hover:text-text-primary cursor-pointer ${
                      isActive ? "text-text-primary" : "text-text-secondary"
                    }`}
                  >
                    {renderLinkContent(link.name, isActive)}
                  </a>
                )
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === "/" && pathname === "/") {
                      e.preventDefault()
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  }}
                  scroll={false}
                  className={`text-[10px] font-black transition-colors uppercase tracking-[0.3em] hover:text-text-primary ${
                    isActive ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {renderLinkContent(link.name, isActive)}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden absolute right-6 sm:right-10">
            <Sheet>
              <SheetTrigger 
                render={
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                }
              />
              <SheetContent side="bottom" className="rounded-t-3xl h-[50vh] border-b-0 bg-bg-surface/95 backdrop-blur-xl p-6">
                <SheetHeader className="text-left mb-8">
                  <SheetTitle className="font-heading text-3xl font-extrabold tracking-tight">Navigation</SheetTitle>
                  <SheetDescription className="text-base text-text-secondary">Explore my portfolio and projects.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-3">
                  {navLinks.map((link, idx) => {
                    const isHash = link.href.startsWith("#")
                    const isActive = isHash ? activeSection === link.href : pathname === link.href
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
                          onClick={(e) => link.href.startsWith("#") && handleNavClick(e as any, link.href)}
                          className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                            isActive
                              ? "bg-[#fef08a] text-black font-bold"
                              : "hover:bg-bg-elevated text-text-primary"
                          }`}
                        >
                          <div className={`p-2 rounded-xl ${isActive ? "bg-black/10" : "bg-bg-elevated"}`}>
                            <Icon className={`h-5 w-5 ${isActive ? "text-black" : "text-text-secondary"}`} />
                          </div>
                          <span className="text-xl">{link.name}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
