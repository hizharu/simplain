import FundamentalHeader from "@/components/organisms/FundamentalHeader"
import FundamentalCardSection from "@/components/organisms/FundamentalCardSection"

interface Card {
  title: string
  image: string
}

interface Props {
  title: string
  description: string
  cards: Card[]
}

export default function FundamentalTemplate({ title, description, cards }: Props) {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#62A2F3] to-[#41BBD9] text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 pt-28 pb-12">
        <FundamentalHeader title={title} description={description} />
        <FundamentalCardSection cards={cards} />
      </div>
    </main>
  )
}