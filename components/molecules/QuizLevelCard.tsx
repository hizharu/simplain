// components/molecules/QuizLevelCard.tsx
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string
  subtitle: string
  image: string
}

export default function QuizLevelCard({ title, subtitle, image }: Props) {
  return (
    <Link href="/quiz/" className="group relative w-[260px] h-[380px] rounded-2xl overflow-hidden">
      <Image src={image} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute top-4 left-4 text-white">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-xs opacity-80">{subtitle}</p>
      </div>
    </Link>
  );
}