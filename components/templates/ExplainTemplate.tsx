import ExplainHeader from "@/components/organisms/ExplainHeader"
import ExplainAnswerBox from "@/components/organisms/ExplainAnswerBox"
import ExplainInputBar from "@/components/organisms/ExplainInputBar"
import ExplainSuggestions from "@/components/organisms/ExplainSuggestions"

interface Props {
  question: string
  setQuestion: (value: string) => void
  answer: string
  loading: boolean
  onExplain: () => void
  suggestions: string[]
}

export default function ExplainTemplate({
  question,
  setQuestion,
  answer,
  loading,
  onExplain,
  suggestions,
}: Props) {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#62A2F3] to-[#41BBD9] flex flex-col items-center px-4 pt-28 pb-24 text-white overflow-hidden">

      {/* ── Decorative background blobs (CSS only, zero perf cost) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* top-left blob */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        {/* bottom-right blob */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl" />
        {/* floating circles */}
        <div className="absolute top-1/4 right-8 w-6 h-6 rounded-full bg-white/20 animate-bounce" style={{ animationDuration: "3s" }} />
        <div className="absolute top-1/3 left-6 w-4 h-4 rounded-full bg-white/15 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 right-12 w-3 h-3 rounded-full bg-white/20 animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <ExplainHeader />
        <ExplainAnswerBox answer={answer} loading={loading} />
        <ExplainInputBar
          question={question}
          setQuestion={setQuestion}
          onExplain={onExplain}
          loading={loading}
        />
        <ExplainSuggestions suggestions={suggestions} setQuestion={setQuestion} />
      </div>
    </main>
  )
}