"use client";

import FundamentalTemplate from "@/components/templates/FundamentalTemplate";

export default function SocialSciencePage() {
  const cards = [
    { title: "Political", image: "/images/politic.jpg" },
    { title: "Sociology", image: "/images/sociology.jpg" },
    { title: "Physchology", image: "/images/physchology.jpg" },
    { title: "Economics", image: "/images/economics.jpg" },
    { title: "Antrhopology", image: "/images/antrhopology.jpg" },
  ];

  return (

    <FundamentalTemplate
          title="What is Social Science"
          description="Social science is a broad field studying human behavior, societies, cultures, and their interactions, using scientific methods to understand how people live, organize, and influence the world."
          cards={cards}
        />
  );
}
