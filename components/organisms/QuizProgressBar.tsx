interface Props {
  progress: number
}

export default function QuizProgressBar({ progress }: Props) {
  return (
    <div className="mt-4 w-full max-w-xl">
      <div className="h-2 rounded-full bg-white/20">
        <div
          className="h-2 rounded-full bg-white transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
