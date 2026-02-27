import Image from "next/image"

interface Props {
  title: string
  image: string
  index: number
}

export default function FundamentalCard({ title, image, index }: Props) {
  return (
    <div
      className="relative min-w-[160px] md:min-w-[200px] h-[260px] md:h-[360px]
      rounded-2xl overflow-hidden shadow-xl bg-black/20
      transition-transform duration-300 hover:-translate-y-2"
      style={{ transform: `translateY(${index * 8}px)` }}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-sm md:text-base font-medium">
          {title}
        </h3>
      </div>
    </div>
  )
}
