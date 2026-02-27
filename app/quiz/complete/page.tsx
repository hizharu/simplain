'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function QuizCompletePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#62A2F3] to-[#41BBD9]">
      <div className="bg-white rounded-2xl shadow-xl w-[320px] px-6 py-8 text-center">

        {/* GIF Icon */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/gifs/celebration.gif"
            alt="Quiz completed"
            width={64}
            height={64}
            priority
          />
        </div>

        <h1 className="text-xl font-semibold text-gray-900">
          Congratulations!
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          You did it!
          <br />
          Let’s check the results
        </p>

        <button
          onClick={() => router.push('/quiz/result')}
          className="cursor-pointer mt-6 w-full rounded-full bg-blue-500 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600 active:scale-95"
        >
          Check result
        </button>
      </div>
    </div>
  )
}
