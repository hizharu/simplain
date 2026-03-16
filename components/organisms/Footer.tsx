import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative w-full pt-24 pb-16 mt-10">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/footer-image.jpg"
          alt="Footer background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Back to top */}
      <Link href="#main-home">
        <button className="cursor-pointer absolute top-5 right-5 z-30 text-xs font-bold bg-white/90 text-black rounded-full px-4 py-2 hover:bg-white transition shadow-lg active:scale-95">
          ↑ Back to top
        </button>
      </Link>

      <div className="container mx-auto px-5 relative z-20">
        <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-7 sm:p-10 text-white border border-white/20 max-w-4xl shadow-2xl">
          <div className="grid sm:grid-cols-2 gap-8">

            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-1">SimPlain</h3>
              <p className="text-sm text-white/65 mb-6 leading-relaxed">
                Simple explanations for curious minds.<br />
                Learning made accessible for everyone.
              </p>
              <button className="flex items-center gap-2 bg-white text-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-50 transition shadow-md active:scale-95">
                Subscribe to our email
              </button>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">Connect</h4>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  { label: "simplain@edu.com", icon: "✉" },
                  { label: "Youtube", icon: "▶" },
                  { label: "Instagram", icon: "◈" },
                  { label: "Reference", icon: "⊕" },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="flex items-center gap-2.5 text-white/70 hover:text-white transition cursor-pointer"
                  >
                    <span className="text-white/40 text-xs">{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/35">
            <span>© 2025 SimPlain. All rights reserved.</span>
            <span>Made with ♥ for learners</span>
          </div>
        </div>
      </div>
    </footer>
  )
}