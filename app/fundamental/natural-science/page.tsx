"use client";

import FundamentalTemplate from "@/components/templates/FundamentalTemplate";

export default function NaturalSciencePage() {
  const cards = [
    { title: "Physics", image: "/images/physics.jpg" },
    { title: "Astroonomy", image: "/images/astronomy.jpg" },
    { title: "Chemistry", image: "/images/chemistry.jpg" },
    { title: "Biology", image: "/images/biology.jpg" }, 
  ];

  return (

    <FundamentalTemplate
          title="What is Natural Science"
          description="Natural science is the study of the physical and natural world, using systematic observation, experimentation, and empirical evidence to understand, explain, and predict natural phenomenal."
          cards={cards}
        />
  );
}
