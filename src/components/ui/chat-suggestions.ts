// Pool of suggested questions shown as clickable chips in the AI chat widget.
// Sourced from the personal markdown corpus the AI agent uses (profile, CV, 10 projects).
// Edit freely — values are picked randomly on panel open and after each AI reply.

export const FAQ_POOL: string[] = [
  // — Profile & background —
  "Tell me about yourself",
  "What's your role at Amartha?",
  "What's your background?",
  "Years of experience?",
  "Tools you use daily?",
  "Core technical skills?",

  // — Stats / impact —
  "Total users impacted?",
  "Course completion rate?",
  "Biggest achievement?",

  // — AI Learning Assistant (peped-BE) —
  "Tell me about the AI Learning Assistant",
  "What is peped-BE?",
  "Why Qdrant and LangGraph?",
  "How do you prevent AI hallucination?",

  // — Agent Network —
  "What is the Agent Network project?",
  "What is Poket digital wallet?",

  // — Anti-Harassment —
  "Tell me about the Anti-Harassment course",
  "Anti-Harassment course results?",

  // — Other Amartha projects —
  "What is AmarthaFin Mockup?",
  "What is Training Client Protection?",
  "What is the ASA project?",
  "What is BTS?",
  "Tell me about the Modal Cycle video",

  // — Academic / personal projects —
  "What is Dunia Geometri?",
  "Dunia Geometri impact?",
  "Tell me about Botani Quest",
  "Why pixel-art for Botani Quest?",

  // — Methodology / approach —
  "Your design approach?",
  "Experience with Moodle and SCORM?",
  "How do you apply ADDIE?",
  "How do you use Bloom's Taxonomy?",
  "How do you blend ID with AI?",
]

/** Pick `count` unique random questions from the pool. */
export function pickRandomFAQs(count = 4, exclude: string[] = []): string[] {
  const available = FAQ_POOL.filter(q => !exclude.includes(q))
  const shuffled = [...available].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
