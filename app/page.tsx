"use client";

import Image from "next/image";


export default function Home() {
const levels = [
    {
      title: "Easy Level",
      subtitle: "Welcome to the world",
      image: "/images/quiz-easy.webp",
    },
    {
      title: "Medium Level",
      subtitle: "Intermediate knowledge test",
      image: "/images/quiz-medium.webp",
    },
    {
      title: "Hard Level",
      subtitle: "Are you know anything? Prove here !",
      image: "/images/quiz-hard.webp",
    },
  ];

  return ( <main>
    <header>
      <nav className="bg-dark">
        <ul className="bg-white/20 container mx-auto h-15 w-175 rounded-full flex items-center justify-center gap-12 text-white fixed top-4 left-1/2 -translate-x-1/2 z-50">

            <li className="cursor-pointer">Logo</li>
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Fundamental</li>
            <li className="cursor-pointer">Explain Me</li>
            <li className="cursor-pointer">Quiz</li>
            <li className="cursor-pointer">Account</li>
        </ul>
      </nav>
    </header>

<section className="mt-30 pt-20 px-6 mx-auto relative overflow-hidden">
  <div className="container mx-auto relative">
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
        <button className="flex items-center justify-center gap-2 px-4.5 py-2.25 rounded-full bg-white text-black text-[14px] font-medium mt-10 hover:bg-gray-100 transition">
          Get Started
        </button>
      </div>
      <div className="relative mt-10 mr-10 lg:mt-0">
        <div className="relative w-full h-80 lg:h-96 flex justify-center lg:justify-end">
          <Image
            src="/images/hero-img.png" // Update with your actual image path
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
    <section className="mt-90 place-items-center">
      <div>
        <h1 className="text-center text-white font-medium font-space text-[48px]">
          Make yourself understand <br />
          the complex things with us
        </h1>
      </div>
      <p className="text-center text-white font-normal font-inter text-[24px]">
         Tap one of the fundamental lesson <br />for more information about that
      </p>
      <div className="font-semibold flex justify-center gap-16 mt-16">
      <button className="cursor-pointer flex flex-col items-center gap-3 text-white hover:scale-105 transition">
        <Image
          src="/icons/math.png"
          alt="Formal Sciences"
          width={64}
          height={64}
        />
        <span className="text-sm font-medium">Formal Sciences</span>
      </button>
      <button className="cursor-pointer flex flex-col items-center gap-3 text-white hover:scale-105 transition">
        <Image
          src="/icons/nature.png"
          alt="Natural Sciences"
          width={64}
          height={64}
        />
        <span className="text-sm font-medium">Natural Sciences</span>
      </button>
      <button className="cursor-pointer flex flex-col items-center gap-3 text-white hover:scale-105 transition">
        <Image
          src="/icons/social.png"
          alt="Social Sciences"
          width={64}
          height={64}
        />
        <span className="text-sm font-medium">Social Sciences</span>
      </button>
    </div>
    <button className="flex flex-col items-center justify-center mt-20 group cursor-pointer transition-transform hover:scale-110">
      <h5 className="text-white font-space font-medium text-sm mb-2">
        Let's explore
      </h5>
      <div>
        <Image
          src="/down.svg"
          alt="Scroll"
          width={24}
          height={24}
        />
      </div>
    </button>
      <div className="mt-50">
        <h1 className="mb-14 text-center text-[48px] font-semibold text-white">
          Pick one topic to ask and start <br /> from zero
        </h1>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            //ini bagian kostumisasi pengambilan data
            { title: "Technology", image: "/topics/technology.jpg" },
            { title: "Life & Mind", image: "/topics/life-mind.jpg" },
            { title: "Everyday Science", image: "/topics/everyday-science.jpg" },
            { title: "Society & World", image: "/topics/society-world.jpg" },
          ].map((topic) => (
            <div
              key={topic.title}
              //noted design ini
              className="group relative h-72 overflow-hidden rounded-2xl cursor-pointer"
            >
              <Image
                src={topic.image}
                alt={topic.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white text-center">
                  {topic.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    <div className="mt-60 text-white">
      <h1 className="text-[48px] text-space font-semibold text-center ">Let's test your knowladge here !</h1>
      <p className="text-center text-[24px] font-normal ">Select The Level</p>
      <div className="mt-5 flex gap-10 flex-wrap justify-center">
        {levels.map((level, index) => (
          <div
            key={index}
            className="group relative w-[260px] h-[380px] rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg cursor-pointer transition-shadow duration-300 ease-out hover:shadow-xl"
          >
            {/* Image */}
            <Image
              src={level.image}
              alt={level.title}
              fill
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25" />

            {/* Text */}
            <div className="absolute top-4 left-4 right-4">
              <h3 className="text-sm font-semibold">
                {level.title}
              </h3>
              <p className="text-xs opacity-80 mt-1">
                {level.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
    <footer className="mt-50 relative w-full pt-32 pb-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/footer-image.jpg"
          alt="Footer background"
          fill
          className="object-cover"
        />
      </div>
      <button
        className="absolute top-6 right-6 z-30 text-xs bg-white text-black rounded-full px-3 py-1 hover:bg-gray-100 transition">
        Back to the top
      </button>
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
  </main>
  );
}