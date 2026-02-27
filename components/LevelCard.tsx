import Image from "next/image";

function LevelCard({ title, subtitle, image }: any) {
  return (
    <div className="group relative w-65 h-95 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-4 left-4 right-4 text-white">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs opacity-80 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
