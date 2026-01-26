'use client'

import Link from 'next/link'
import { useState } from 'react'

const options = [
  'By thinking about a goal one time',
  'By forcing yourself to change instantly',
  'By copying what other people do once',
  'By repeating the same action consistently over time',
]

export default function QuizPage() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/*backgrimage*/}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-slowZoom"
        style={{
          backgroundImage: `url('/images/quiz-bg.jpg')`,
        }}
      />

      {/*overlay*/}
      <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm" />

      {/*content main*/}
      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 py-6 text-white">
        {/*button back*/}
        <div  className="flex w-full max-w-5xl items-center justify-between">
          <Link href= "/#quiz-section" className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm hover:bg-white/20 transition">
            ← Back
          </Link>
        </div>

        {/*quiz card*/}
        <section className="mt-16 w-full max-w-xl animate-fadeUp">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs">
            Level : Easy
          </span>

          <h1 className="mb-8 text-center text-2xl font-semibold leading-snug md:text-3xl">
            How do habits usually form?
          </h1>

          <div className="flex flex-col gap-4">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`rounded-xl px-5 py-4 text-left text-sm font-medium transition-all
                  ${
                    selected === i
                      ? 'bg-white text-blue-900 scale-[1.02]'
                      : 'bg-white/90 text-blue-900 hover:-translate-y-0.5 hover:shadow-lg'
                  }
                `}>
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              disabled={selected === null}
              className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-blue-900 transition
              hover:scale-105 disabled:opacity-50 disabled:hover:scale-100">
              Next →
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
