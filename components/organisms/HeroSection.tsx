import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="mt-12  pt-20 px-6 mx-auto relative overflow-hidden">
      <div id="main-home"  className="container mx-auto relative p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="relative z-10">
            <h1 className="text-white text-[48px] font-medium leading-tight">
              Let’s explain it <span className="text-black">simply</span>
            </h1>
            <p className="text-[18px] text-white font-normal leading-relaxed font-inter mt-4">
              Guide you with simple explanations, real-life examples, <br />
              and insights that actually stick <br/>
              Because this world is full of the <span className="text-black">complex things</span>
            </p>
            <button className="cursor-pointer flex items-center justify-center gap-2 px-4.5 py-2.25 rounded-full bg-white text-black text-[14px] font-medium mt-10 hover:bg-gray-100 transition">
              Get Started
            </button>
          </div>
          <div className="relative mt-10 mr-10 lg:mt-0">
            <div className="relative w-full h-80 lg:h-96 flex justify-center lg:justify-end">
              <Image
                src="/images/herosection.png"
                alt="Illustration showing simple explanations concept"
                fill
                className="object-contain object-right"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
