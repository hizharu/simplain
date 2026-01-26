"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link"

export default function NaturalSciencePage() {
  const cards = [
    { title: "Physics", image: "/images/physics.jpg" },
    { title: "Astroonomy", image: "/images/astronomy.jpg" },
    { title: "Chemistry", image: "/images/chemistry.jpg" },
    { title: "Biology", image: "/images/biology.jpg" }, 
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-[#62A2F3] to-[#41BBD9] text-white overflow-hidden">
      <div className="container mx-auto px-6 py-10">
        {/*header*/}
        <div className="mb-12 max-w-xl">
        <Link
         href="/" className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition">
            <ArrowLeft size={18} />
        </Link>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            <span className="block text-5xl">π</span>
            What is <br /> Natural Science
          </h1>

          <p className="mt-6 text-sm md:text-base text-white/80 leading-relaxed">
            Natural science is the study of the physical and natural world, using systematic observation, experimentation, and empirical evidence to understand, explain, and predict natural phenomena
          </p>
        </div>

        {/*card*/}
        <div className="relative ">
          <div className="flex gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-6 md:pb-0 ">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative min-w-[160px] md:min-w-[200px] h-[260px] md:h-[360px]
                rounded-2xl overflow-hidden shadow-xl bg-black/20
                transition-transform duration-300 hover:-translate-y-2"
                style={{ transform: `translateY(${index * 8}px)` }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-sm md:text-base font-medium">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
