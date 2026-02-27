import FundamentalCard from "@/components/molecules/FundamentalCard"

interface Card {
  title: string
  image: string
}

interface Props {
  cards: Card[]
}

export default function FundamentalCardSection({ cards }: Props) {
  return (
    
    <div className="relative">
      <div className="flex gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-6 md:pb-0">
        {cards.map((card, index) => (
          <FundamentalCard
            key={index}
            title={card.title}
            image={card.image}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
