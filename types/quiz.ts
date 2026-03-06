export interface Question {
  level: "easy" | "medium" | "hard"
  concept: "formal" | "natural" | "social"
  question: string
  options: string[]
  correctIndex: number
}

export interface QuizAnswer {
  questionIndex: number
  question: string
  options: string[]
  concept: "formal" | "natural" | "social"
  selectedIndex: number | null
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
  level: "easy" | "medium" | "hard"
  answers: QuizAnswer[]
  scores: {
    formal: ConceptScore
    natural: ConceptScore
    social: ConceptScore
  }
  totalXP: number
  completedAt: string
}

// Tambahkan tipe untuk knowledge level
export type KnowledgeLevel = "Beginner" | "Elementary" | "Intermediate" | "Advanced" | "Proficient"

export const KNOWLEDGE_LEVELS = [
  { label: "Beginner" as KnowledgeLevel,     minXP: 0    },
  { label: "Elementary" as KnowledgeLevel,   minXP: 50   },
  { label: "Intermediate" as KnowledgeLevel, minXP: 150  },
  { label: "Advanced" as KnowledgeLevel,     minXP: 300  },
  { label: "Proficient" as KnowledgeLevel,   minXP: 500  },
] as const

export function getKnowledgeLevel(totalXP: number): KnowledgeLevel {
  let level: KnowledgeLevel = KNOWLEDGE_LEVELS[0].label
  for (const tier of KNOWLEDGE_LEVELS) {
    if (totalXP >= tier.minXP) level = tier.label
  }
  return level
}

// XP rules per level
export const XP_RULES = {
  easy:   { correct: 1, wrong: 0 },
  medium: { correct: 2, wrong: 1 },
  hard:   { correct: 4, wrong: 1 },
} as const
