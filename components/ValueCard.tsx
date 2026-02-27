import Image from "next/image";

interface ValueCardProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function ValueCard({
  image,
  title,
  subtitle,
  description,
}: ValueCardProps) {
  return (
    <div className="relative w-[260px] h-[420px] rounded-2xl overflow-hidden shadow-xl bg-white">
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 p-5 text-white">
        <p className="text-xs opacity-80">{subtitle}</p>
        <h3 className="text-lg font-semibold mt-1">{title}</h3>
        <p className="text-sm mt-2 leading-snug opacity-90">
          {description}
        </p>
      </div>
    </div>
  );
}
