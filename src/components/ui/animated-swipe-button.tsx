import * as React from "react"
import Link from "next/link"

interface AnimatedSwipeButtonProps {
  href: string
  color?: string
  initialColor?: string
  text: string
  icon?: React.ReactNode
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  textColorClass?: string
  noSwipe?: boolean
}

export function AnimatedSwipeButton({ 
  href, 
  color = 'var(--accent)',
  initialColor,
  text, 
  icon,
  size = 'lg',
  className = '',
  textColorClass,
  noSwipe = false
}: AnimatedSwipeButtonProps) {
  
  const isSolid = !!initialColor;
  const defaultTextClass = isSolid ? 'text-white border-transparent' : 'text-text-primary border-border bg-transparent';
  const appliedTextClass = textColorClass || defaultTextClass;
  
  const sizeClass = size === 'sm' ? 'px-5 py-2.5 text-sm' : 
                    size === 'md' ? 'px-6 py-3 text-base' : 
                    'px-8 py-4 text-lg';
  
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.endsWith('.pdf');
  const LinkComponent = isExternal ? 'a' : Link;

  const hoverClasses = noSwipe 
    ? "transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02]" 
    : "hover:text-white hover:border-transparent transition-colors duration-200 ease-out";

  return (
    <LinkComponent
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex items-center justify-center gap-2 border-2 ${sizeClass} rounded-full font-bold shadow-sm hover:shadow-md ${hoverClasses} ${appliedTextClass} ${className}`}
      style={isSolid ? { borderColor: initialColor } : {}}
    >
      {!noSwipe && (
        <div 
          className="absolute inset-0 w-full h-full -z-10 rounded-full overflow-hidden"
          style={isSolid ? { backgroundColor: initialColor } : {}}
        >
          <div 
            className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-[150%] -translate-y-1/2 rotate-45 transition-transform duration-700 ease-out group-hover:-translate-x-1/2"
            style={{ backgroundColor: color }}
          />
        </div>
      )}
      {icon && <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">{icon}</span>}
      <span className="relative z-10">{text}</span>
    </LinkComponent>
  )
}
