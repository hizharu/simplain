/**
 * Compress an image File using canvas before uploading.
 * @param file     Original File object
 * @param maxWidth Max width/height in pixels (default 256)
 * @param quality  JPEG quality 0–1 (default 0.7)
 * @returns        Compressed File
 */
export async function compressImage(
  file: File,
  maxWidth = 256,
  quality = 0.7
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)

      // Calculate new size maintaining aspect ratio
      let { width, height } = img
      if (width > height && width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      } else if (height > maxWidth) {
        width = Math.round((width * maxWidth) / height)
        height = maxWidth
      }

      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext("2d")
      if (!ctx) return reject(new Error("Canvas context unavailable"))
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Compression failed"))
          const compressed = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          })
          resolve(compressed)
        },
        "image/jpeg",
        quality
      )
    }

    img.onerror = () => reject(new Error("Image load error"))
    img.src = url
  })
}