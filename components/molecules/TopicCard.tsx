// components/molecules/TopicCard.tsx
import Image from "next/image";
import Link from "next/link";

export default function TopicCard({ title, image, href }) {
  return (
    <Link href={href} className="group relative h-72 overflow-hidden rounded-2xl block">
      <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition" />
      <div className="absolute inset-0 bg-black/40" />
      <h3 className="absolute bottom-4 left-4 text-white font-semibold">{title}</h3>
    </Link>
  );
}
