"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface Props {
  params: Promise<{ level: string }>
}

const subjects = [
  {
    id: "formal",
    label: "Formal Science",
    description: "Mathematics, Logic, Statistics & Computer Science",
    image: "/topics/technology.jpg",
    icon: "/icons/math.png",
    color: "from-blue-500/80 to-indigo-600/80",
  },
  {
    id: "natural",
    label: "Natural Science",
    description: "Physics, Chemistry, Biology & Earth Science",
    image: "/topics/everyday-science.jpg",
    icon: "/icons/nature.png",
    color: "from-emerald-500/80 to-teal-600/80",
  },
  {
    id: "social",
    label: "Social Science",
    description: "History, Economics, Psychology & Sociology",
    image: "/topics/society-world.jpg",
    icon: "/icons/social.png",
    color: "from-orange-500/80 to-rose-500/80",
  },
]

const levelMeta: Record<string, { label: string; color: string; description: string }> = {
  easy:   { label: "Easy",   color: "text-emerald-400", description: "Perfect for beginners — 15 questions, plenty of time" },
  medium: { label: "Medium", color: "text-yellow-400",  description: "A solid challenge — 15 questions, moderate time" },
  hard:   { label: "Hard",   color: "text-red-400",     description: "For the brave — 15 questions, limited time" },
}

export default function LevelStartPage({ params }: Props) {
  const { level } = use(params)
  const router = useRouter()
  const meta = levelMeta[level] ?? levelMeta.easy

  return (
    <main className="min-h-screen bg-[#62A2F3] flex flex-col items-center px-5 pt-28 pb-16">

      {/* Back button */}
      <div className="w-full max-w-3xl mb-8">
        <Link href="/#quiz-section" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-12 max-w-xl">
        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-4">
          <span className={`text-sm font-bold ${meta.color}`}>{meta.label} Level</span>
          <span className="text-white/30">·</span>
          <span className="text-xs text-white/60">15 questions</span>
        </div>

        <h1 className="text-white text-3xl sm:text-4xl font-bold mb-3 leading-tight">
          Choose your subject
        </h1>
        <p className="text-white/60 text-sm sm:text-base">
          {meta.description}
        </p>
      </div>

      {/* Subject cards */}
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => router.push(`/quiz/${level}/${subject.id}`)}
            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden text-left shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
          >
            {/* Background image */}
            <Image
              src={subject.image}
              alt={subject.label}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${subject.color} opacity-80`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Image src={subject.icon} alt={subject.label} width={28} height={28} />
              </div>

              {/* Label */}
              <div>
                <h3 className="text-white font-bold text-lg leading-tight mb-1">
                  {subject.label}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed">
                  {subject.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-3 flex items-center gap-1 text-white/60 group-hover:text-white group-hover:gap-2 transition-all text-xs font-medium">
                  Start quiz
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom hint */}
      <p className="mt-10 text-white/30 text-xs text-center">
        Each subject contains 15 questions at {meta.label.toLowerCase()} difficulty
      </p>
    </main>
  )
}