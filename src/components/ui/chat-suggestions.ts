// Pool of suggested questions shown as clickable chips in the AI chat widget.
// Sourced from the personal markdown corpus the AI agent uses (profile, CV, 10 projects).
// Edit freely — values are picked randomly on panel open and after each AI reply.

export const FAQ_POOL: string[] = [
  // — Profile & background —
  "Ceritain background lo dong",
  "Apa peran lo di Amartha sekarang?",
  "Kenapa lo bilang lo \"sit at the intersection of design and engineering\"?",
  "Apa skill teknis utama yang lo kuasai?",
  "Tools apa aja yang lo pakai sehari-hari?",
  "Berapa lama lo udah jadi Learning Designer?",

  // — Stats / impact —
  "Berapa user yang udah lo impact?",
  "Berapa completion rate course-course lo?",
  "Apa pencapaian terbesar lo sejauh ini?",

  // — AI Learning Assistant (peped-BE) —
  "Ceritain project AI Learning Assistant di Amartha LMS",
  "Apa itu peped-BE dan gimana cara kerjanya?",
  "Gimana arsitektur Agentic RAG yang lo bangun?",
  "Kenapa pilih Qdrant dan LangGraph untuk RAG?",
  "Gimana cara lo handle hallucination di chatbot?",

  // — Agent Network —
  "Apa itu project Agent Network AmarthaLink?",
  "Gimana strategi konten Agent Network?",
  "Apa itu Poket digital wallet?",

  // — Anti-Harassment —
  "Ceritain training Anti-Harassment yang lo desain",
  "Apa hasil dari Anti-Harassment course?",
  "Gimana lo translate kebijakan jadi training engaging?",

  // — Other Amartha projects —
  "Apa itu AmarthaFin Mockup?",
  "Apa itu Training Client Protection?",
  "Apa itu ASA project?",
  "Ceritain BTS sama Modal project",

  // — Academic / personal projects —
  "Apa itu Dunia Geometri?",
  "Hasil testing Dunia Geometri gimana?",
  "Ceritain tentang Botani Quest",
  "Kenapa pilih pixel-art untuk Botani Quest?",

  // — Methodology / approach —
  "Gimana pendekatan ADDIE & TNA yang lo pakai?",
  "Gimana cara lo apply Bloom's Taxonomy di course design?",
  "Apa pengalaman lo dengan Moodle dan SCORM?",
  "Gimana lo bikin learning yang engaging tapi tetap measurable?",
  "Gimana lo gabungin instructional design sama AI?",
]

/** Pick `count` unique random questions from the pool. */
export function pickRandomFAQs(count = 4, exclude: string[] = []): string[] {
  const available = FAQ_POOL.filter(q => !exclude.includes(q))
  const shuffled = [...available].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
