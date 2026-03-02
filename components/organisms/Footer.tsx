import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-50 relative w-full pt-32 pb-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/footer-image.jpg"
          alt="Footer background"
          fill
          className="object-cover"
        />
      </div>
      <Link
      href="#main-home">
      <button 
      className="cursor-pointer absolute top-6 right-6 z-30 text-sm font-semibold bg-white text-black rounded-full px-3 py-1 hover:bg-gray-100 transition">
        Back to the top
      </button>
      </Link>
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-10 text-white max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10"> 
            <div>
              <h3 className="text-xl font-semibold mb-2">SimPlain</h3>
              <p className="text-sm opacity-80 mb-6">
                Simple explanations for curious minds
              </p>
              <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                Subscribe to our email
              </button>
              <div className="mt-5 flex flex-col gap-2 text-sm opacity-90">
                <span>simplain@edu.com</span>
                <span>Youtube</span>
                <span>Instagram</span>
                <span>Reference</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    )
}    
    