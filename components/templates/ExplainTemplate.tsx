import ExplainHeader from "@/components/organisms/ExplainHeader"
import ExplainAnswerBox from "@/components/organisms/ExplainAnswerBox"
import ExplainInputBar from "@/components/organisms/ExplainInputBar"
import ExplainSuggestions from "@/components/organisms/ExplainSuggestions"

interface Props {
  question: string
  setQuestion: (value: string) => void
  answer: string
  onExplain: () => void
  suggestions: string[]
}

export default function ExplainTemplate({
  question,
  setQuestion,
  answer,
  onExplain,
  suggestions,
}: Props) {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#62A2F3] to-[#41BBD9] flex flex-col items-center px-4 pt-32 pb-24 text-white">
      <ExplainHeader />
      <ExplainAnswerBox answer={answer} />
      <ExplainInputBar
        question={question}
        setQuestion={setQuestion}
        onExplain={onExplain}
      />
      <ExplainSuggestions
        suggestions={suggestions}
        setQuestion={setQuestion}
      />
    </main>
  )
}
