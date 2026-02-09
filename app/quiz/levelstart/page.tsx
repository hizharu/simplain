'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from "next/link";

export default function HardLevelIntroPage() {
  const router = useRouter()

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/backgrounds/hard-level-bg.png')",
      }}
    >
      {/* Content */}
      <div className="flex flex-col items-center text-center text-white px-4">

        {/* Title */}
        <h1 className="text-2xl font-semibold">
          Welcome to <span className="text-blue-900">hard</span> level
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-white/90">
          To play, click the &quot;Play Quiz&quot; button below
        </p>

        {/* Illustration */}
        <div className="my-6">
          <Image
            src="/illustrations/quiz-cat.png"
            alt="Quiz illustration"
            width={90}
            height={90}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-80 active:scale-95"
          >
            Cancel
          </button>

          <button
            onClick={() => router.push('/quiz/play/hard')}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90 active:scale-95"
          >
            Play Quiz
          </button>
        </div>
      </div>
    </div>
  )
}
