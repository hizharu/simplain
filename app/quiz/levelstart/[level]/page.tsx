"use client";
import { use, useState } from "react";
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface PageProps {
  params: Promise<{
    level: string
  }>
}

export default function LevelStartPage({ params }: PageProps) {
  const router = useRouter()
  const unwrappedParams = use(params);
  const { level } = unwrappedParams;

  const levelConfig = {
    easy: {
      name: "Easy",
      bgColor: "from-green-400 to-green-600",
      description: "Perfect for beginners! Start your journey here."
    },
    medium: {
      name: "Medium",
      bgColor: "from-yellow-400 to-orange-500",
      description: "Getting tougher! Test your knowledge."
    },
    hard: {
      name: "Hard",
      bgColor: "from-red-500 to-red-700",
      description: "Only for the brave! Are you ready?"
    }
  };

  const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.easy;

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-b ${config.bgColor}`}>
      <div className="mt-16 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl w-[380px] px-8 py-12 text-center border border-white/20">
        
        {/* Level Icon/Illustration */}
        <div className="mb-4 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {config.name[0]}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-2">
          {config.name} Level
        </h1>

        {/* Description */}
        <p className="text-white/80 mb-6">
          {config.description}
        </p>

        {/* Stats Preview */}
        <div className="bg-white/10 rounded-xl p-4 mb-6">
          <div className="flex justify-between text-white/90 text-sm mb-2">
            <span>Questions:</span>
            <span className="font-bold">10</span>
          </div>
          <div className="flex justify-between text-white/90 text-sm mb-2">
            <span>Time:</span>
            <span className="font-bold">2 min</span>
          </div>
          <div className="flex justify-between text-white/90 text-sm">
            <span>XP Reward:</span>
            <span className="font-bold">+100</span>
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={() => router.push(`/quiz/${level}`)}
          className="cursor-pointer w-full rounded-full bg-white py-3 text-lg font-semibold text-blue-600 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
        >
          Play Quiz
        </button>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="cursor-pointer mt-4 text-white/70 hover:text-white text-sm transition-colors"
        >
          ← Go Back
        </button>
      </div>
    </div>
  )
}