"use client";
import { useState, useEffect } from 'react';

interface QuizTimerProps {
  initialTime: number; // in seconds
  onTimeOut: () => void;
  isActive?: boolean;
  className?: string;
}

export default function QuizTimer({ 
  initialTime, 
  onTimeOut, 
  isActive = true,
  className = '' 
}: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            onTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, timeLeft, onTimeOut]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = (): string => {
    if (timeLeft > 60) return 'text-green-400';
    if (timeLeft > 30) return 'text-yellow-400';
    return 'text-red-400 animate-pulse';
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getTimerColor()} ${className}`}>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
    </div>
  );
}