"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

export function Footer() {
  const [year, setYear] = useState(2026)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="border-t border-border bg-bg-primary mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-text-primary">
              © {year} Ferdy Fadhil Lazuardi. All rights reserved.
            </p>
            <p className="text-sm text-text-secondary mt-1">
              Learning Designer
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex gap-6 text-sm text-text-secondary">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-text-primary transition-colors">Projects</Link>
            <Link href="/#contact" className="hover:text-text-primary transition-colors">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

