// Pool of suggested questions shown as clickable chips in the AI chat widget.
// Sourced from the personal markdown corpus the AI agent uses (profile, CV, 10 projects).
// Edit freely — values are picked randomly on panel open and after each AI reply.

export const FAQ_POOL: string[] = [
  // — Standout / high-level —
  "What makes you different from other learning designers?",
  "Which project had the biggest impact?",
  "How do you measure training success?",
  "What's your tech stack?",
  "How do you increase completion rate?",
  "Tell me about a project that didn't work",

  // — Projects —
  "Tell me about Modal Cycle Zero",
  "What's the AI Learning Assistant project?",
  "Explain Training Client Protection (TCP)",
  "What's BTS / Belajar Tulang Skuy?",
  "Show me your Anti-Harassment course",

  // — Methodology —
  "How do you use Bloom's Taxonomy?",
  "ADDIE vs SAM — when do you pick which?",
  "How do you apply Cognitive Load Theory?",
  "Walk me through your design process",
  "How do you design for adult learners?",

  // — Metrics —
  "What's your average completion rate?",
  "How many users have you reached?",
  "What's your highest N-Gain?",
  "How do you boost learner engagement?",

  // — Alternative phrasings —
  "Tell me about yourself",
  "Which project are you most proud of?",
  "How do you measure the impact of your training programs?",
  "What are your essential tools as an L&D professional?",
]

/** Pick `count` unique random questions from the pool. */
export function pickRandomFAQs(count = 4, exclude: string[] = []): string[] {
  const available = FAQ_POOL.filter(q => !exclude.includes(q))
  const shuffled = [...available].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
