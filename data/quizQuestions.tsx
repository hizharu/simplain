export interface Question {
  level: "easy" | "medium" | "hard"
  concept: "natural" | "formal" | "social"
  question: string
  options: string[]
  correctIndex: number
}

export const quizQuestions: Question[] = [
   {
    level: "easy",
    concept: "natural",
    question: "What planet do we live on?",
    options: ["Mars", "Earth", "Venus", "Jupiter"],
    correctIndex: 1,
  },
  {
    level: "easy",
    concept: "natural",
    question: "Water freezes at what temperature (°C)?",
    options: ["0", "10", "50", "100"],
    correctIndex: 0,
  },
  {
    level: "easy",
    concept: "natural",
    question: "What gas do humans breathe in to survive?",
    options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Helium"],
    correctIndex: 2,
  },
  {
    level: "easy",
    concept: "natural",
    question: "Which organ pumps blood in our body?",
    options: ["Lungs", "Brain", "Heart", "Liver"],
    correctIndex: 2,
  },
  {
    level: "easy",
    concept: "natural",
    question: "Plants make food through a process called?",
    options: ["Respiration", "Photosynthesis", "Digestion", "Evaporation"],
    correctIndex: 1,
  },

  {
    level: "medium",
    concept: "natural",
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctIndex: 2,
  },
  {
    level: "medium",
    concept: "natural",
    question: "Which layer protects Earth from UV radiation?",
    options: ["Troposphere", "Ozone Layer", "Stratosphere", "Mesosphere"],
    correctIndex: 1,
  },
  {
    level: "medium",
    concept: "natural",
    question: "Speed is distance divided by?",
    options: ["Mass", "Time", "Force", "Energy"],
    correctIndex: 1,
  },
  {
    level: "medium",
    concept: "natural",
    question: "What particle has a negative charge?",
    options: ["Proton", "Neutron", "Electron", "Photon"],
    correctIndex: 2,
  },
  {
    level: "medium",
    concept: "natural",
    question: "DNA stands for?",
    options: [
      "Deoxyribonucleic Acid",
      "Dynamic Nuclear Atom",
      "Digital Network Array",
      "Double Nitrogen Acid"
    ],
    correctIndex: 0,
  },

    {
    level: "hard",
    concept: "natural",
    question: "What is the second law of thermodynamics about?",
    options: [
      "Energy conservation",
      "Entropy increase",
      "Force equals mass times acceleration",
      "Gravity attraction"
    ],
    correctIndex: 1,
  },
  {
    level: "hard",
    concept: "natural",
    question: "What type of bond shares electrons?",
    options: ["Ionic", "Covalent", "Metallic", "Hydrogen"],
    correctIndex: 1,
  },
  {
    level: "hard",
    concept: "natural",
    question: "Which organelle produces ATP?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Body"],
    correctIndex: 1,
  },
  {
    level: "hard",
    concept: "natural",
    question: "What is the SI unit of electric current?",
    options: ["Volt", "Watt", "Ampere", "Ohm"],
    correctIndex: 2,
  },
  {
    level: "hard",
    concept: "natural",
    question: "What phenomenon explains light bending in water?",
    options: ["Reflection", "Refraction", "Diffraction", "Dispersion"],
    correctIndex: 1,
  },


    {
    level: "easy",
    concept: "formal",
    question: "What is 5 + 7?",
    options: ["10", "11", "12", "13"],
    correctIndex: 2,
  },
  {
    level: "easy",
    concept: "formal",
    question: "Binary number 1 represents?",
    options: ["True", "False", "Zero", "Ten"],
    correctIndex: 0,
  },
  {
    level: "easy",
    concept: "formal",
    question: "What shape has 3 sides?",
    options: ["Square", "Triangle", "Circle", "Rectangle"],
    correctIndex: 1,
  },
  {
    level: "easy",
    concept: "formal",
    question: "What is 9 x 3?",
    options: ["18", "21", "27", "24"],
    correctIndex: 2,
  },
  {
    level: "easy",
    concept: "formal",
    question: "In programming, HTML is used for?",
    options: ["Styling", "Logic", "Structure", "Database"],
    correctIndex: 2,
  },

    {
    level: "medium",
    concept: "formal",
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "14"],
    correctIndex: 2,
  },
  {
    level: "medium",
    concept: "formal",
    question: "What data structure uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctIndex: 1,
  },
  {
    level: "medium",
    concept: "formal",
    question: "What is 2^5?",
    options: ["10", "16", "32", "64"],
    correctIndex: 2,
  },
  {
    level: "medium",
    concept: "formal",
    question: "Which symbol means AND in logic?",
    options: ["||", "&&", "!", "==="],
    correctIndex: 1,
  },
  {
    level: "medium",
    concept: "formal",
    question: "Time complexity of linear search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
  },

    {
    level: "hard",
    concept: "formal",
    question: "Binary search works on?",
    options: ["Unsorted array", "Sorted array", "Tree only", "Graph only"],
    correctIndex: 1,
  },
  {
    level: "hard",
    concept: "formal",
    question: "Derivative of x^2 is?",
    options: ["x", "2x", "x^2", "2"],
    correctIndex: 1,
  },
  {
    level: "hard",
    concept: "formal",
    question: "Which is a NP-complete problem?",
    options: ["Sorting", "Traveling Salesman", "Binary Search", "Addition"],
    correctIndex: 1,
  },
  {
    level: "hard",
    concept: "formal",
    question: "What is Big-O notation used for?",
    options: ["Memory type", "Speed of CPU", "Algorithm efficiency", "Database size"],
    correctIndex: 2,
  },
  {
    level: "hard",
    concept: "formal",
    question: "Recursion must have?",
    options: ["Loop", "Condition", "Base case", "Array"],
    correctIndex: 2,
  },

    {
    level: "easy",
    concept: "social",
    question: "Which system allows people to vote for leaders?",
    options: ["Monarchy", "Democracy", "Dictatorship", "Colonialism"],
    correctIndex: 1,
  },
  {
    level: "easy",
    concept: "social",
    question: "Money is used as?",
    options: ["Weapon", "Tool for exchange", "Decoration", "Energy"],
    correctIndex: 1,
  },
  {
    level: "easy",
    concept: "social",
    question: "Culture includes?",
    options: ["Food", "Language", "Traditions", "All of the above"],
    correctIndex: 3,
  },
  {
    level: "easy",
    concept: "social",
    question: "Supply and demand is part of?",
    options: ["Physics", "Biology", "Economics", "Chemistry"],
    correctIndex: 2,
  },
  {
    level: "easy",
    concept: "social",
    question: "Family is an example of?",
    options: ["Institution", "Government", "Company", "Market"],
    correctIndex: 0,
  },


]
