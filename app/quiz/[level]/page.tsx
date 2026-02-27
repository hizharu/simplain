"use client";
import { use, useState } from "react";
import { quizQuestions } from "@/data/quizQuestions"
import QuizCard from "@/components/organisms/QuizCard"

interface PageProps {
  params: Promise<{
    concept: string
    level: string
  }>
}

export default function QuizPage({ params }: PageProps) {
  const { level } = use(params);

  const filtered = quizQuestions.filter((q) => q.level === level);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  // ✅ Definisikan total dan progress di sini
  const total = filtered.length;
  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

  if (filtered.length === 0) {
    return <div className="text-white">No questions found</div>;
  }

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelected(null);
    }
  };
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-slowZoom"
        style={{ backgroundImage: `url('/images/quiz-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm" />

      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 py-6 text-white">

         <QuizCard
                question={filtered[currentIndex]}
                selected={selected}
                onSelect={(i) => setSelected(i)}
                onNext={handleNext}
                onBack={handleBack}
                isFirst={currentIndex === 0}
                isLast={currentIndex === total - 1}
                progress={progress}
              />
            </div>
    </main>
  )
}
