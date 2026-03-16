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
    <div>
      {/* Mobile: 2-column grid */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {cards.map((card, index) => (
          <FundamentalCard
            key={index}
            title={card.title}
            image={card.image}
            index={index}
          />
        ))}
      </div>

      {/* Tablet+: horizontal scroll row */}
      <div className="hidden sm:flex gap-5 md:gap-6 overflow-x-auto pb-4
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        snap-x snap-mandatory">
        {cards.map((card, index) => (
          <div key={index} className="flex-shrink-0 snap-start">
            <FundamentalCard
              title={card.title}
              image={card.image}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  )
}