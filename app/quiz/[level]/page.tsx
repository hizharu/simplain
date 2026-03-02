"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { quizQuestions } from "@/data/quizQuestions"
import QuizCard from "@/components/organisms/QuizCard"

interface PageProps {
  params: Promise<{
    concept: string
    level: string
  }>
}

// Timer configuration per level (in seconds)
const TIME_LIMITS = {
  easy: 120,    // 2 minutes
  medium: 100,  // 1.40 minutes
  hard: 80     // 1.20 minutes
};

export default function QuizPage({ params }: PageProps) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { level } = unwrappedParams;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMITS[level as keyof typeof TIME_LIMITS] || 300);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showTimeOutModal, setShowTimeOutModal] = useState(false);

  const filtered = quizQuestions.filter((q) => q.level === level);
  const total = filtered.length;
  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time's up!
            setIsTimerActive(false);
            setShowTimeOutModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get timer color based on time left
  const getTimerColor = (): string => {
    if (timeLeft > 60) return 'text-green-400';
    if (timeLeft > 30) return 'text-yellow-400';
    return 'text-red-400 animate-pulse';
  };

  // Handle timeout - fail the quiz
  const handleTimeOut = () => {
    // You can save the failed attempt to your state/database here
    // For now, redirect to result page with failed status
    router.push('/quiz/result?status=failed&level=' + level);
  };

  if (filtered.length === 0) {
    return <div className="text-white">No questions found</div>;
  }

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    } else {
      // Quiz completed successfully
      router.push('/quiz/complete?status=completed&level=' + level);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelected(null);
    }
  };

  // Show timeout modal
  if (showTimeOutModal) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Time's Up!</h2>
          <p className="text-gray-600 mb-6">
            You ran out of time. Better luck next time!
          </p>
          <button
            onClick={() => router.push('/quiz/result?status=failed&level=' + level)}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            See Results
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-slowZoom"
        style={{ backgroundImage: `url('/images/quiz-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm" />

      <div className="mt-14 relative z-10 flex min-h-screen flex-col items-center px-4 py-6 text-white">
        
        {/* Timer and Progress Header */}
        <div className="w-full max-w-4xl mb-4">
          <div className="flex justify-between items-center mb-2">
            {/* Level Badge */}
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-semibold capitalize">{level} Level</span>
            </div>
            
            {/* Timer Display */}
            <div className={`flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full ${getTimerColor()}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2.5">
            <div 
              className="bg-blue-400 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-white/70">
            <span>Question {currentIndex + 1} of {total}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <QuizCard
          question={filtered[currentIndex]}
          selected={selected}
          onSelect={(i) => setSelected(i)}
          onNext={handleNext}
          onBack={handleBack}
          isFirst={currentIndex === 0}
          isLast={currentIndex === total - 1}
        />
      </div>
    </main>
  )
}