import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Props {
  title: string
  description: string
}

export default function FundamentalHeader({ title, description }: Props) {
  return (
    <div className="mb-10 max-w-xl">
      {/* Back button */}
      <Link
        href="/#fundamental-section"
        className="mb-6 inline-flex items-center gap-2 text-white/70 hover:text-white transition text-sm font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full"
      >
        <ArrowLeft size={15} />
        Back
      </Link>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mt-4">
        {title}
      </h1>

      <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed">
        {description}
      </p>
    </div>
  )
}