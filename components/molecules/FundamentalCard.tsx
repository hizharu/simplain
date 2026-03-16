import Image from "next/image"

interface Props {
  title: string
  image: string
  index: number
}

export default function FundamentalCard({ title, image, index }: Props) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] cursor-pointer
        w-full aspect-[3/4]           
        sm:w-44 sm:h-64              
        md:w-52 md:h-72"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 176px, 208px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={index < 2}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <p className="text-white font-semibold text-sm sm:text-base leading-tight drop-shadow-sm">
          {title}
        </p>
      </div>
    </div>
  )
}