import Image from 'next/image'
import Link from "next/link";

export default function QuizResultPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#62A2F3] to-[#41BBD9] text-white px-4">

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-6">
        Quiz Result
      </h1>

      {/* Illustration */}
      <div className="mb-4">
        <Image
          src="/result-image/pini.png"
          alt="Result illustration"
          width={80}
          height={80}
        />
      </div>

      {/* XP */}
      <p className="text-lg font-medium mb-8">
        XP <span className="font-bold">+100</span>
      </p>

      {/* Score List */}
      <div className="space-y-4 w-full max-w-xs">

        {/* Formal Science */}
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

        {/* Natural Science */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/result-image/naturalscience.png"
              alt="Natural Science"
              width={32}
              height={32}
            />
            <span className="text-sm">Natural Science</span>
          </div>
          <span className="text-sm font-semibold">+16</span>
        </div>

        {/* Social Science */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/result-image/socialscience.png"
              alt="Social Science"
              width={32}
              height={32}
            />
            <span className="text-sm">Social Science</span>
          </div>
          <span className="text-sm font-semibold">+18</span>
        </div>

      </div>

      {/* Button */}
      
      <button
        className="mt-10 rounded-full bg-white px-6 py-2 text-sm font-medium text-blue-600 transition hover:scale-105 active:scale-95"
      >
        <Link href="/#quiz-section">Okay</Link>
      </button>
    </div>
  )
}
