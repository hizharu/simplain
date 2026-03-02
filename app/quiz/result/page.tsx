// In app/quiz/result/page.tsx
"use client";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'
import Link from "next/link";

export default function QuizResultPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const level = searchParams.get('level');
  
  const isFailed = status === 'failed';

  return (
    <div className="mt-5 min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#62A2F3] to-[#41BBD9] text-white px-4">

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-6">
        {isFailed ? 'Quiz Failed' : 'Quiz Result'}
      </h1>

      {/* Illustration - different for failed state */}
      <div className="mb-4">
        <Image
          src={isFailed ? "/result-image/sad-face.png" : "/result-image/pini.png"}
          alt="Result illustration"
          width={80}
          height={80}
        />
      </div>

      {/* Message */}
      <p className="text-lg font-medium mb-8">
        {isFailed ? (
          <>Better luck next time!</>
        ) : (
          <>XP <span className="font-bold">+100</span></>
        )}
      </p>

      {/* Only show scores if not failed */}
      {!isFailed && (
        <div className="space-y-4 w-full max-w-xs">
          {/* Your existing score list */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/result-image/formalscience.png"
                alt="Formal Science"
                width={32}
                height={32}
              />
              <span className="text-sm">Formal Science</span>
            </div>
            <span className="text-sm font-semibold">+10</span>
          </div>
          {/* ... rest of scores */}
        </div>
      )}
      
      <button
        className="mt-10 rounded-full bg-white px-6 py-2 text-sm font-medium text-blue-600 transition hover:scale-105 active:scale-95"
      >
        <Link href="/#quiz-section">
          {isFailed ? 'Try Again' : 'Okay'}
        </Link>
      </button>
    </div>
  )
}