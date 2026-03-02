// app/quiz/page.tsx
import Link from "next/link";
import Image from "next/image";

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
];

export default function QuizSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-[48px] font-space font-semibold text-center mb-4">
          Let's test your knowledge here!
        </h1>
        <p className="text-center text-[24px] font-normal mb-12">
          Select The Level
        </p>
        
        <div className="mt-5 flex gap-10 flex-wrap justify-center">
          {levels.map((level, index) => (
            <Link
              href={`/quiz/${level.slug}`}
              key={index}
              className="group relative w-[260px] h-[380px] rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:scale-105"
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
    </div>
  );
}