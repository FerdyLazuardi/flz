import * as React from "react"
import Link from "next/link"

interface SolidGlowButtonProps {
  href: string
  color: string // Base hex color for background and glow
  text: string
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SolidGlowButton({ 
  href, 
  color,
  text, 
  icon,
  size = 'lg',
  className = ''
}: SolidGlowButtonProps) {
  
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');
  const LinkComponent = isExternal ? 'a' : Link;

  const sizeClass = size === 'sm' ? 'px-5 py-2.5 text-sm' : 
                    size === 'md' ? 'px-6 py-3 text-base' : 
                    'px-8 py-4 text-lg';

  return (
    <LinkComponent
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex items-center justify-center gap-2 ${sizeClass} rounded-full font-bold text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] ${className}`}
      style={{
        backgroundColor: color,
        // Even softer base shadow
        boxShadow: `0 2px 8px 0 ${color}25`
      }}
    >
      {/* The Glow Layer - Activates on hover - Now much softer */}
      <div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          boxShadow: `0 4px 12px 0 ${color}35`
        }}
      />
      {icon && <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">{icon}</span>}
      <span className="relative z-10">{text}</span>
    </LinkComponent>
  )
}
