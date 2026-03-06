interface AvatarProps {
  src: string
  alt: string
  size?: "sm" | "md" | "lg"
}

export default function Avatar({ src, alt, size = "md" }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`${sizes[size]} rounded-full object-cover ring-2 ring-white shadow-md`}
    />
  )
}