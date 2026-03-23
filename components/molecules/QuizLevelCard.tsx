"use client"
import Image from "next/image"
import Link from "next/link"

interface Props {
  title: string
  subtitle: string
  image: string
  slug: string
  index?: number
}

const levelConfig: Record<string, {
  badge: string
  badgeColor: string
  glowColor: string
  accentColor: string
  questions: number
  time: string
}> = {
  easy: {
    badge: "Beginner",
    badgeColor: "bg-emerald-400/90 text-emerald-950",
    glowColor: "group-hover:shadow-emerald-400/25",
    accentColor: "from-emerald-400/60",
    questions: 15,
    time: "20 min",
  },
  medium: {
    badge: "Intermediate",
    badgeColor: "bg-amber-400/90 text-amber-950",
    glowColor: "group-hover:shadow-amber-400/25",
    accentColor: "from-amber-400/60",
    questions: 15,
    time: "18 min",
  },
  hard: {
    badge: "Advanced",
    badgeColor: "bg-red-400/90 text-red-950",
    glowColor: "group-hover:shadow-red-400/25",
    accentColor: "from-red-400/60",
    questions: 15,
    time: "16 min",
  },
}

export default function QuizLevelCard({ title, subtitle, image, slug, index = 0 }: Props) {
  const config = levelConfig[slug] ?? levelConfig.easy

  return (
    <Link
      href={`/quiz/levelstart/${slug}`}
      className={`group relative flex-shrink-0 snap-center overflow-hidden rounded-3xl shadow-xl
        transition-all duration-500 ease-out
        hover:-translate-y-3 hover:shadow-2xl ${config.glowColor}
        active:scale-[0.97] cursor-pointer block`}
      style={{
        width: "clamp(150px, 40vw, 240px)",
        height: "clamp(240px, 55vw, 360px)",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 40vw, 240px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

      {/* Accent color overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-t ${config.accentColor} to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />

      {/* Shimmer line on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top — difficulty badge */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between">
        <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm ${config.badgeColor}`}>
          {config.badge}
        </span>

        {/* Arrow icon — appears on hover */}
        <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Bottom — title, subtitle, meta */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="flex items-center gap-1 text-[10px] text-white/70 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {config.questions} questions
          </span>
          <span className="flex items-center gap-1 text-[10px] text-white/70 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {config.time}
          </span>
        </div>

        <h3 className="text-white font-bold text-base leading-tight mb-1 drop-shadow-sm">
          {title}
        </h3>
        <p className="text-white/60 text-xs leading-snug">{subtitle}</p>

        {/* Start prompt */}
        <div className="mt-3 flex items-center gap-1.5 text-white/50 group-hover:text-white/90 transition-colors duration-300">
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wide">Tap to start</span>
        </div>
      </div>
    </Link>
  )
}