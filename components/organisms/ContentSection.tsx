import Image from "next/image"
import Link from "next/link"

const levels = [
  { title: "Easy Level", slug: "easy", subtitle: "Welcome to the world", image: "/images/quiz-easy.webp" },
  { title: "Medium Level", slug: "medium", subtitle: "Intermediate knowledge test", image: "/images/quiz-medium.webp" },
  { title: "Hard Level", slug: "hard", subtitle: "Are you know anything? Prove here!", image: "/images/quiz-hard.webp" },
]

const topics = [
  { title: "Technology", image: "/topics/technology.jpg", href: "/explain/" },
  { title: "Life & Mind", image: "/topics/life-mind.jpg", href: "/explain/" },
  { title: "Everyday Science", image: "/topics/everyday-science.jpg", href: "/explain/" },
  { title: "Society & World", image: "/topics/society-world.jpg", href: "/explain/" },
]

const fundamentals = [
  { href: "/fundamental/formal-science", icon: "/icons/math.png", label: "Formal Sciences" },
  { href: "/fundamental/natural-science", icon: "/icons/nature.png", label: "Natural Sciences" },
  { href: "/fundamental/social-science", icon: "/icons/social.png", label: "Social Sciences" },
]

export default function ContentSection() {
  return (
    <section className="px-5">

      {/*Section divider line*/}
      <div className="max-w-xs mx-auto h-px bg-white/10 mb-0" />

      {/* fundamental*/}
      <div id="fundamental-section" className="pt-24 pb-20">

        <div className="flex justify-center mb-5">
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase bg-white/8 px-4 py-1.5 rounded-full border border-white/10">
            Foundation
          </span>
        </div>

        <h2 className="text-center text-white font-bold text-[28px] sm:text-[40px] lg:text-[48px] leading-[1.15] mb-4 max-w-2xl mx-auto">
          Make yourself understand <br className="hidden sm:block" />
          the complex things with us
        </h2>

        <p className="text-center text-white/55 text-[15px] sm:text-lg mb-12 max-w-sm mx-auto leading-relaxed">
          Tap one of the fundamental lessons for deeper knowledge
        </p>

        {/* Fundamental cards */}
        <div className="flex justify-center gap-4 sm:gap-10 flex-wrap">
          {fundamentals.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center gap-3 text-white w-[90px] sm:w-auto hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <div className="w-[72px] h-[72px] rounded-2xl bg-white/12 border border-white/20 flex items-center justify-center group-hover:bg-white/22 transition backdrop-blur-sm shadow-lg shadow-blue-900/20">
                <Image src={item.icon} alt={item.label} width={40} height={40} />
              </div>
              <span className="text-[13px] font-semibold text-white/85 text-center leading-tight">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="flex flex-col items-center mt-14 gap-2">
          <span className="text-white/30 text-xs font-medium tracking-wider">Scroll to explore</span>
          <div className="w-5 h-9 border-2 border-white/15 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/30 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Explain me */}
      <div className="py-20">
        <div className="flex justify-center mb-5">
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase bg-white/8 px-4 py-1.5 rounded-full border border-white/10">
            Explain Me
          </span>
        </div>

        <h2
          id="explain-section"
          className="text-center text-[28px] sm:text-[40px] lg:text-[48px] font-bold text-white mb-4 max-w-2xl mx-auto leading-[1.15]"
        >
          Pick one topic to ask <br className="hidden sm:block" />
          and start from zero
        </h2>

        <p className="text-center text-white/50 text-[15px] mb-10 max-w-xs mx-auto">
          Ask anything — explained like you&apos;re 12
        </p>

        {/* 2×2 on mobile, 4 cols on md+ */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4 px-0 sm:px-4">
          {topics.map((topic) => (
            <Link
              href={topic.href}
              key={topic.title}
              className="group relative overflow-hidden rounded-2xl cursor-pointer block shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
              style={{ height: "clamp(160px, 30vw, 280px)" }}
            >
              <Image
                src={topic.image}
                alt={topic.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <h3 className="text-[13px] sm:text-base font-bold text-white text-center leading-tight drop-shadow-sm">
                  {topic.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quiz */}
      <div className="py-20 pb-32">
        <div className="flex justify-center mb-5">
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase bg-white/8 px-4 py-1.5 rounded-full border border-white/10">
            Quiz
          </span>
        </div>

        <h2
          id="quiz-section"
          className="text-[28px] sm:text-[40px] lg:text-[48px] font-bold text-center text-white mb-3 leading-[1.15] max-w-xl mx-auto"
        >
          Let&apos;s test your <br className="sm:hidden" />knowledge here!
        </h2>
        <p className="text-center text-white/50 text-[15px] mb-10">
          Select the level
        </p>

        {/* Cards — horizontal scroll on mobile, row on desktop */}
        <div className="flex gap-4 sm:gap-6 justify-start sm:justify-center overflow-x-auto pb-4 px-1 snap-x snap-mandatory
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {levels.map((level, index) => (
            <Link
              href={`/quiz/levelstart/${level.slug}`}
              key={index}
              className="group relative flex-shrink-0 snap-center overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
              style={{
                width: "clamp(150px, 40vw, 260px)",
                height: "clamp(220px, 55vw, 380px)",
              }}
            >
              <Image
                src={level.image}
                alt={level.title}
                fill
                sizes="(max-width: 640px) 40vw, 260px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              {/* Badge */}
              <div className="absolute top-3 left-3 right-3">
                <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {level.title}
                </span>
              </div>

              {/* Subtitle */}
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white/70 text-xs leading-snug">{level.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll indicator dots — mobile only */}
        <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
          {levels.map((_, i) => (
            <div key={i} className={`rounded-full bg-white/30 transition-all ${i === 0 ? "w-4 h-1.5" : "w-1.5 h-1.5"}`} />
          ))}
        </div>
      </div>

    </section>
  )
}