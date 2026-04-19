"use client"

import { motion } from "framer-motion"
import { Sparkles, MessageCircle, Mail, Phone, Hand } from "lucide-react"

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="white" />
    <path d="M19 0h-14c-2.761 0-4 2.239-4 5v14c0 2.761 1.239 5 4 5h14c2.762 0 4-2.239 4-5v-14c0-2.761-1.238-5-4-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#0A66C2" transform="scale(0.75) translate(5, 5)" />
  </svg>
)

export function CollaborationGraphic() {
  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center">
      {/* Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-accent/20 rounded-full blur-[60px]"
      />

      {/* Central Core */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="relative w-52 h-52 border-2 border-dashed border-accent/20 rounded-full flex items-center justify-center"
      >
        {/* Middle Container with Counter-Rotation to stay upright */}
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-28 h-28 bg-accent text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-accent/30"
        >
          <motion.div
            animate={{ rotate: [0, 20, -20, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          >
            <Hand className="w-12 h-12 fill-white/10" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Elements: Communication & Socials */}
      
      {/* Gmail / Mail */}
      <motion.div
        animate={{ 
          y: [-12, 12, -12],
          x: [8, -8, 8]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 right-8 bg-white dark:bg-bg-elevated p-3.5 rounded-2xl shadow-xl border border-border z-10"
      >
        <Mail className="w-5 h-5 text-[#EA4335]" />
      </motion.div>

      {/* WhatsApp / Phone */}
      <motion.div
        animate={{ 
          y: [12, -12, 12],
          x: [-8, 8, -8]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-12 left-8 bg-white dark:bg-bg-elevated p-3.5 rounded-2xl shadow-xl border border-border z-10"
      >
        <Phone className="w-5 h-5 text-[#25D366] fill-[#25D366]/10" />
      </motion.div>

      {/* LinkedIn */}
      <motion.div
        animate={{ 
          y: [-10, 10, -10],
          x: [-10, 10, -10]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/4 -left-2 bg-white dark:bg-bg-elevated p-3 rounded-xl shadow-lg border border-border z-10"
      >
        <LinkedInIcon className="w-5 h-5 text-[#0A66C2] fill-[#0A66C2]/10" />
      </motion.div>

      {/* Chat Bubble */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          y: [5, -5, 5]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-1/4 -right-2 bg-white dark:bg-bg-elevated p-3 rounded-xl shadow-lg border border-border z-10"
      >
        <MessageCircle className="w-5 h-5 text-accent fill-accent/10" />
      </motion.div>

      {/* Sparkles */}
      <motion.div
        animate={{ 
          opacity: [0.4, 1, 0.4],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 left-1/2 -translate-x-1/2"
      >
        <Sparkles className="w-6 h-6 text-accent" />
      </motion.div>

      {/* Rotating Ring Path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <motion.circle 
          cx="50%" cy="50%" r="140" 
          fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  )
}
