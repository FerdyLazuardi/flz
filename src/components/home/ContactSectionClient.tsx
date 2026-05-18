"use client"

import dynamic from "next/dynamic"

const ContactSection = dynamic(
  () => import("@/components/home/ContactSection").then(m => ({ default: m.ContactSection })),
  { ssr: false }
)

export function ContactSectionClient() {
  return <ContactSection />
}
