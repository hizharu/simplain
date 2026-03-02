import Image from "next/image";
import Link from "next/link";


export default function ContentSection() {
const levels = [
  {
    title: "Easy Level",
    slug: "easy",
    subtitle: "Welcome to the world",
    image: "/images/quiz-easy.webp",
  },
  {
    title: "Medium Level",
    slug: "medium",
    subtitle: "Intermediate knowledge test",
    image: "/images/quiz-medium.webp",
  },
  {
    title: "Hard Level",
    slug: "hard",
    subtitle: "Are you know anything? Prove here !",
    image: "/images/quiz-hard.webp",
  },
]



    return(
      
            <section className="mt-70 place-items-center">
      <div id="fundamental-section" >
        <h1 className="text-center text-white font-medium font-space text-[48px]">
          Make yourself understand <br />
          the complex things with us
        </h1>
      </div>
      <p className="text-center text-white font-normal font-inter text-[24px]">
         Tap one of the fundamental lesson <br />for more information about that
      </p>
      <div className="font-semibold flex justify-center gap-16 mt-16">
      <Link 
        href="/fundamental/formal-science" className="group flex flex-col items-center gap-3 text-white hover:scale-105 transition">
        <Image src="/icons/math.png" alt="Formal Sciences" width={64} height={64}/>
        <span className="text-sm font-medium">Formal Sciences</span>
      </Link>
      <Link 
        href="/fundamental/natural-science" className="group flex flex-col items-center gap-3 text-white hover:scale-105 transition">
        <Image src="/icons/nature.png" alt="Natural Sciences" width={64} height={64}/>
        <span className="text-sm font-medium">Natural Sciences</span>
      </Link>
      <Link 
        href="/fundamental/social-science" className="group flex flex-col items-center gap-3 text-white hover:scale-105 transition">
        <Image src="/icons/social.png" alt="Social Sciences" width={64} height={64}/>
        <span className="text-sm font-medium">Social Sciences</span>
      </Link>
    </div>
    <button className="flex flex-col items-center justify-center mt-20 group cursor-pointer transition-transform hover:scale-110">
      <h5 className="text-white font-space font-medium text-sm mb-2">
        Let's explore
      </h5>
      <div>
        <Image
          src="/down.svg"
          alt="Scroll"
          width={24}
          height={24}
        />
      </div>
    </button>
      <div className="mt-50">
        <h1 id="explain-section" className="mb-14 text-center text-[48px] font-semibold text-white">
          Pick one topic to ask and start <br /> from zero
        </h1>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            // 2. Ensure every object has an 'href'
            { title: "Technology", image: "/topics/technology.jpg", href: '/explain/' },
            { title: "Life & Mind", image: "/topics/life-mind.jpg", href: '/explain/' },
            { title: "Everyday Science", image: "/topics/everyday-science.jpg", href: '/explain/' },
            { title: "Society & World", image: "/topics/society-world.jpg", href: '/explain/' },
          ].map((topic) => (
            <Link
              href={topic.href} // 3. Pass the href here
              key={topic.title}
              // 4. Move your design classes here so the Link acts as the container
              className="group relative h-72 overflow-hidden rounded-2xl cursor-pointer block"
            >
              <Image
                src={topic.image}
                alt={topic.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white text-center">
                  {topic.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
<div className="mt-60 text-white">
  <h1 id="quiz-section" className="text-[48px] text-space font-semibold text-center" >Let's test your knowledge here!</h1>
  <p className="text-center text-[24px] font-normal">Select The Level</p>
    <div className="mt-5 flex gap-10 flex-wrap justify-center">
      {levels.map((level, index) => (
  <Link
    href={`/quiz/levelstart/${level.slug}`}  // Changed from /quiz/${level.slug}
    key={index}
    className="group relative w-[260px] h-[380px] rounded-2xl overflow-hidden ..."
  >

  <Image
                src={level.image}
                alt={level.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors" />
              <div className="absolute top-4 left-4 right-4">
                <h3 className="text-sm font-semibold">
                  {level.title}
                </h3>
                <p className="text-xs opacity-80 mt-1">
                  {level.subtitle}
                </p>
              </div>
      </Link>
    ))}
  </div>
</div>
</section>
    )
}