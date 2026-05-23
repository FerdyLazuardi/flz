"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

// ─── Configure your AI agent here ────────────────────────────────────────────
const AI_AGENT_URL = "" // ← paste your AI agent URL here
// Expected request:  POST AI_AGENT_URL  { message: string }
// Expected response: { reply: string }
// ─────────────────────────────────────────────────────────────────────────────

const SUGGESTIONS = [
  "Ask me anything about Ferdy's work...",
  "What tools does Ferdy use?",
  "Tell me about his e-learning projects.",
  "What's Ferdy's design process?",
  "How does he integrate AI into learning?",
  "What's his experience with Moodle?",
]

const TYPING_SPEED = 55
const DELETING_SPEED = 28
const PAUSE_AFTER_TYPE = 2000
const PAUSE_AFTER_DELETE = 400

type Bubble = { id: number; type: "user" | "ai" | "error"; text: string }

export function AIChatWidget() {
  const pathname = usePathname()

  const [panelOpen, setPanelOpen] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const [bubbles, setBubbles] = React.useState<Bubble[]>([
    { id: 0, type: "ai", text: "Hi! I'm Ferdy's AI. Ask me about his projects, skills, or experience." },
  ])
  const [thinking, setThinking] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  // Typewriter state
  const [typedText, setTypedText] = React.useState("")
  const [showCursor, setShowCursor] = React.useState(true)
  const typingRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const suggIdxRef = React.useRef(0)
  const charIdxRef = React.useRef(0)
  const isDeletingRef = React.useRef(false)
  const typingActiveRef = React.useRef(true)

  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const nextId = React.useRef(1)

  // Don't render on studio route
  if (pathname.startsWith("/studio")) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    function typeLoop() {
      if (!typingActiveRef.current) return
      const current = SUGGESTIONS[suggIdxRef.current]
      if (!isDeletingRef.current) {
        charIdxRef.current++
        setTypedText(current.slice(0, charIdxRef.current))
        if (charIdxRef.current === current.length) {
          isDeletingRef.current = true
          typingRef.current = setTimeout(typeLoop, PAUSE_AFTER_TYPE)
          return
        }
        typingRef.current = setTimeout(typeLoop, TYPING_SPEED)
      } else {
        charIdxRef.current--
        setTypedText(current.slice(0, charIdxRef.current))
        if (charIdxRef.current === 0) {
          isDeletingRef.current = false
          suggIdxRef.current = (suggIdxRef.current + 1) % SUGGESTIONS.length
          typingRef.current = setTimeout(typeLoop, PAUSE_AFTER_DELETE)
          return
        }
        typingRef.current = setTimeout(typeLoop, DELETING_SPEED)
      }
    }
    typeLoop()
    return () => { if (typingRef.current) clearTimeout(typingRef.current) }
  }, [])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (panelOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [bubbles, thinking, panelOpen])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const handleHide = () => {
      setHidden(true)
      if (panelOpen) {
        setPanelOpen(false)
        setInputValue("")
      }
    }
    const handleShow = () => setHidden(false)
    window.addEventListener("app:hide-chat", handleHide)
    window.addEventListener("app:show-chat", handleShow)
    return () => {
      window.removeEventListener("app:hide-chat", handleHide)
      window.removeEventListener("app:show-chat", handleShow)
    }
  }, [panelOpen])

  function stopTyping() {
    typingActiveRef.current = false
    if (typingRef.current) clearTimeout(typingRef.current)
    setTypedText("")
    setShowCursor(false)
  }

  function restartTyping() {
    typingActiveRef.current = true
    charIdxRef.current = 0
    isDeletingRef.current = false
    setShowCursor(true)
    function typeLoop() {
      if (!typingActiveRef.current) return
      const current = SUGGESTIONS[suggIdxRef.current]
      if (!isDeletingRef.current) {
        charIdxRef.current++
        setTypedText(current.slice(0, charIdxRef.current))
        if (charIdxRef.current === current.length) {
          isDeletingRef.current = true
          typingRef.current = setTimeout(typeLoop, PAUSE_AFTER_TYPE)
          return
        }
        typingRef.current = setTimeout(typeLoop, TYPING_SPEED)
      } else {
        charIdxRef.current--
        setTypedText(current.slice(0, charIdxRef.current))
        if (charIdxRef.current === 0) {
          isDeletingRef.current = false
          suggIdxRef.current = (suggIdxRef.current + 1) % SUGGESTIONS.length
          typingRef.current = setTimeout(typeLoop, PAUSE_AFTER_DELETE)
          return
        }
        typingRef.current = setTimeout(typeLoop, DELETING_SPEED)
      }
    }
    typeLoop()
  }

  function openPanel() {
    stopTyping()
    setPanelOpen(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  function closePanel() {
    setPanelOpen(false)
    setInputValue("")
    setTimeout(restartTyping, 500)
  }

  async function sendMessage() {
    const text = inputValue.trim()
    if (!text || thinking) return
    const id = nextId.current++
    setBubbles(prev => [...prev, { id, type: "user", text }])
    setInputValue("")
    setThinking(true)

    try {
      if (!AI_AGENT_URL) throw new Error("No URL configured")
      const res = await fetch(AI_AGENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const reply = data.reply ?? data.message ?? data.text ?? JSON.stringify(data)
      setBubbles(prev => [...prev, { id: nextId.current++, type: "ai", text: reply }])
    } catch {
      setBubbles(prev => [...prev, { id: nextId.current++, type: "error", text: "Sorry, something went wrong. Please try again." }])
    } finally {
      setThinking(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") sendMessage()
  }

  return (
    <>
      {/* Answer panel — always rendered with backdrop-filter active to avoid flicker.
          When closed: slides offscreen via transform. When open: slides into view.
          Never animates opacity/visibility on the glass container itself. */}
      <div
        className="fixed left-1/2 w-[min(560px,calc(100%-48px))] bottom-[88px] max-sm:bottom-[72px] max-sm:w-[calc(100%-32px)]"
        style={{
          zIndex: 9999,
          transform: hidden
            ? "translateX(-50%) translateY(calc(100vh + 200px)) scale(0.96)"
            : panelOpen
            ? "translateX(-50%) translateY(0px) scale(1)"
            : "translateX(-50%) translateY(calc(100vh + 200px)) scale(0.96)",
          opacity: hidden ? 0 : 1,
          pointerEvents: panelOpen && !hidden ? "auto" : "none",
          // Smoother easing: spring-like cubic-bezier for open, gentle ease-in for close
          transition: hidden
            ? "transform 0.45s cubic-bezier(0.5, 0, 0.75, 0), opacity 0.35s ease-out"
            : panelOpen
            ? "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out"
            : "transform 0.5s cubic-bezier(0.5, 0, 0.75, 0), opacity 0.3s ease-out",
          willChange: "transform, opacity",
          transformOrigin: "bottom center",
        }}
      >
        {/* Inner wrapper — never animates opacity, glass stays solid */}
        <div>
        <div className="bg-white/55 dark:bg-black/30 backdrop-blur-2xl border border-white/80 dark:border-white/20 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-black/5 dark:border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)] shrink-0 animate-pulse" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-text-primary leading-tight">Ferdy&apos;s AI Assistant</p>
              <p className="text-[11px] text-text-secondary mt-0.5 max-sm:text-[10px]">Ask anything about my work, skills, or experience</p>
            </div>
            <button
              onClick={closePanel}
              className="w-6 h-6 rounded-full bg-black/6 hover:bg-black/12 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-[12px] text-text-secondary transition-colors shrink-0"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-2 p-4 min-h-[160px] max-h-[360px] max-sm:max-h-[280px] max-sm:min-h-[120px] max-sm:p-3 overflow-y-auto">
            {bubbles.map(b => (
              <div
                key={b.id}
                className={[
                  "max-w-[82%] px-3.5 py-2.5 rounded-[18px] text-[13px] leading-relaxed max-sm:text-[12px] max-sm:px-3 max-sm:py-2",
                  "animate-[bubbleIn_0.22s_cubic-bezier(0.22,1,0.36,1)]",
                  b.type === "user"
                    ? "bg-foreground text-background self-end rounded-br-[4px]"
                    : b.type === "error"
                    ? "bg-red-50 text-red-600 self-start rounded-bl-[4px] dark:bg-red-900/20 dark:text-red-400"
                    : "bg-muted text-text-primary self-start rounded-bl-[4px]",
                ].join(" ")}
              >
                {b.text}
              </div>
            ))}

            {thinking && (
              <div className="self-start flex items-center gap-2 px-3.5 py-2.5 bg-muted rounded-[18px] rounded-bl-[4px] animate-[bubbleIn_0.22s_cubic-bezier(0.22,1,0.36,1)] max-sm:px-3 max-sm:py-2">
                <span className="flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-text-secondary opacity-60"
                      style={{ animation: `bounce 1.2s infinite ${i * 0.2}s` }}
                    />
                  ))}
                </span>
                <span className="text-[12px] text-text-secondary italic max-sm:text-[11px]">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        </div>
      </div>

      {/* Chat bar — always fixed, never animates position */}
      <div
        className={[
          "fixed bottom-6 left-1/2 -translate-x-1/2",
          "w-[min(560px,calc(100%-48px))] max-sm:bottom-4 max-sm:w-[calc(100%-32px)]",
          "bg-white/55 dark:bg-black/30 backdrop-blur-xl border border-white/75 dark:border-white/20 rounded-full",
          "shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
          "flex items-center gap-2.5 px-3.5 py-2.5 max-sm:px-2.5 max-sm:py-2 max-sm:gap-2",
          "cursor-text",
        ].join(" ")}
        style={{
          zIndex: 10000,
          transform: hidden
            ? "translate(-50%, calc(100% + 32px)) scale(0.96)"
            : "translate(-50%, 0) scale(1)",
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "auto",
          transition: hidden
            ? "transform 0.45s cubic-bezier(0.5, 0, 0.75, 0), opacity 0.35s ease-out, box-shadow 0.3s ease"
            : "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out, box-shadow 0.3s ease",
          willChange: "transform, opacity",
        }}
        onClick={() => { if (!panelOpen && !hidden) openPanel() }}
      >
        {/* Chat icon */}
        <div className="w-8 h-8 max-sm:w-6 max-sm:h-6 flex items-center justify-center shrink-0">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground max-sm:w-[14px] max-sm:h-[14px]">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        {/* Typewriter placeholder (collapsed) */}
        {!panelOpen && (
          <span className="flex-1 text-[13px] max-sm:text-[12px] text-text-secondary select-none overflow-hidden whitespace-nowrap flex items-center min-h-[20px]">
            {typedText}
            {showCursor && (
              <span className="inline-block w-[1.5px] h-[14px] bg-text-secondary ml-[1px] align-middle animate-[blink_0.8s_step-end_infinite]" />
            )}
          </span>
        )}

        {/* Real input (expanded) */}
        {panelOpen && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent border-none outline-none text-[13px] max-sm:text-[12px] text-text-primary placeholder:text-text-secondary font-sans"
            onClick={e => e.stopPropagation()}
          />
        )}

        {/* Send icon */}
        <div
          className={[
            "w-8 h-8 max-sm:w-6 max-sm:h-6 flex items-center justify-center shrink-0 transition-opacity cursor-pointer",
            inputValue.trim().length > 0 ? "opacity-100" : "opacity-40",
          ].join(" ")}
          onClick={e => { e.stopPropagation(); sendMessage() }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground max-sm:w-[12px] max-sm:h-[12px]">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
