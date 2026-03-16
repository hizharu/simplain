export interface Question {
  concept: string
  question: string
  options: string[]
  correctIndex: number
}

export interface QuizAnswer {
  questionIndex: number
  question: string
  options: string[]
  concept: string
  selectedIndex: number
  correctIndex: number
  isCorrect: boolean
  xpEarned: number
}

export interface ConceptScore {
  correct: number
  total: number
  xp: number
}

export interface QuizResult {
  level: string
  subject: string   // "formal" | "natural" | "social"
  answers: QuizAnswer[]
  scores: Record<string, ConceptScore>
  totalXP: number
  completedAt: string
}

// XP per answer
export const XP_RULES: Record<string, { correct: number; wrong: number }> = {
  easy:   { correct: 1, wrong: 0 },
  medium: { correct: 2, wrong: 1 },
  hard:   { correct: 4, wrong: 1 },
}

// Knowledge level thresholds
export const KNOWLEDGE_LEVELS = [
  { label: "Beginner",     minXP: 0 },
  { label: "Elementary",   minXP: 50 },
  { label: "Intermediate", minXP: 150 },
  { label: "Advanced",     minXP: 300 },
  { label: "Proficient",   minXP: 500 },
]

export function getKnowledgeLevel(totalXP: number): string {
  for (let i = KNOWLEDGE_LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= KNOWLEDGE_LEVELS[i].minXP) return KNOWLEDGE_LEVELS[i].label
  }
  return "Beginner"
}