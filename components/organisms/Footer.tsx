import Image from "next/image"
import Link from "next/link"
import { 
  FaEnvelope, 
  FaYoutube, 
  FaInstagram, 
  FaLink 
} from "react-icons/fa";

export default function Footer() {

  const contacts = [
    { 
      label: "simplain@edu.com", 
      icon: FaEnvelope,
      href: "mailto:simplain@edu.com"
    },
    { 
      label: "Youtube", 
      icon: FaYoutube,
      href: "https://youtu.be/dQw4w9WgXcQ?si=skIMrOIkbmTKdI0S"
    },
    { 
      label: "Instagram", 
      icon: FaInstagram,
      href: "https://www.instagram.com/aprrzal/"
    },
    { 
      label: "Reference", 
      icon: FaLink,
      href: "https://dribbble.com/shots/25134285-Syngri-Hero-section"
    },
  ];

  return (
    <footer className="relative w-full pt-24 pb-16 mt-20">

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
        <button 
          onClick={() => {
            document
              .getElementById("main-home")
              ?.scrollIntoView({ behavior: "smooth" })
          }}
          className="cursor-pointer absolute top-5 right-5 z-30 text-xs font-bold bg-white/90 text-black rounded-full px-4 py-2 hover:bg-white transition shadow-lg active:scale-95"
        >
          ↑ Back to top
        </button>
      </Link>

      <div className="container mx-auto px-5 relative z-20">
        <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-7 sm:p-10 text-white border border-white/20 max-w-4xl shadow-2xl">

          <div className="grid sm:grid-cols-2 gap-8">

            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-1">
                SimPlain
              </h3>

              <p className="text-sm text-white/65 mb-6 leading-relaxed">
                Simple explanations for curious minds.<br />
                Learning made accessible for everyone.
              </p>

              <a 
                href="https://substack.com/@simplainedu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-50 transition shadow-md active:scale-95"
              >
                Subscribe to our email
              </a>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">
                Connect
              </h4>

              <div className="flex flex-col gap-3 text-sm">

                {contacts.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2.5 text-white/70 hover:text-white transition cursor-pointer"
                    >

                      <Icon className="w-4 h-4 text-white/50" />

                      {item.label}

                    </Link>
                  );
                })}

              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/35">

            <span>
              © 2025 SimPlain. All rights reserved.
            </span>

            <span>
              by Hizharu
            </span>

          </div>

        </div>
      </div>

    </footer>
  )
}
