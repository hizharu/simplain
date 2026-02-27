"use client";

import FundamentalTemplate from "@/components/templates/FundamentalTemplate";

export default function FormalSciencePage() {
  const cards = [
    { title: "Mathematics", image: "/images/math.jpg" },
    { title: "Statistics", image: "/images/statistics.jpg" },
    { title: "Logic", image: "/images/logic.jpg" },
    { title: "Computer Science", image: "/images/compsci.jpg" },
    { title: "System Theory", image: "/images/system.jpg" },
  ];

  return (

    <FundamentalTemplate
      title="What is Formal Science"
      description="A formal science is a discipline that uses abstract structures,
            symbols, and logical systems to create knowledge, focusing on rules
            and deduction rather than empirical observation of the physical
            world, providing foundational tools for other sciences through
            modeling and rigorous problem-solving."
      cards={cards}
    />
  );
}
