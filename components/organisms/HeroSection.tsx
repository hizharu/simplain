import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section id="main-home" className="relative min-h-[100svh] flex items-center overflow-hidden px-5 pt-28 pb-16">

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-widest text-white/80 uppercase">
                AI-Powered Learning
              </span>
            </div>

            <h1 className="text-white text-[38px] sm:text-[52px] lg:text-[60px] font-bold leading-[1.1] tracking-tight mb-5">
              Let&apos;s explain it{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Simply</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-white/20 rounded-sm -z-0" />
              </span>
            </h1>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0">
              Simple explanations, real-life examples, and insights that actually stick,
              because this world is full of{" "}
              <span className="text-white font-semibold">complex things.</span>
            </p>

            {/* Buttons */}
            <div className="flex gap-3 justify-center lg:justify-start flex-wrap">
              <Link href="/explain">
                <button className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-700 text-sm font-bold hover:bg-blue-50 transition shadow-lg shadow-blue-900/20 active:scale-95">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
              <Link href="/#quiz-section">
                <button className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 border border-white/30 text-white text-sm font-semibold hover:bg-white/25 transition active:scale-95">
                  Try a Quiz ✦
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
              {[
                { value: "3", label: "Science areas" },
                { value: "AI", label: "Powered" },
                { value: "∞", label: "Questions" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-white text-2xl font-bold">{stat.value}</p>
                  <p className="text-white/45 text-[11px] font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Image ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:h-[440px]">
              <Image
                src="/images/herosection.png"
                alt="Simple explanations concept"
                fill
                className="object-contain object-center lg:object-right "
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}