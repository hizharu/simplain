import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Props {
  title: string
  description: string   
}

export default function FundamentalHeader({ title, description }: Props) {
  return (
    <div className="mb-12 max-w-xl">
      <Link
        href="/#fundamental-section"
        className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition"
      >
        <ArrowLeft size={18} />
      </Link>

      <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
        <span className="block text-5xl"></span>
        {title}
      </h1>

      <p className="mt-6 text-sm md:text-base text-white/80 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
