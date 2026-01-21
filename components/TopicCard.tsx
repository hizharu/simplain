'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Define the type for topic data
interface Topic {
  title: string;
  image: string;
  slug: string;
}

// Define props for the component (optional)
interface TopicGridProps {
  topics?: Topic[]; // Optional: allow passing custom topics
  title?: string;   // Optional: allow custom title
}

export default function TopicGrid({ 
  topics, 
  title = "" 
}: TopicGridProps) {
  const router = useRouter();
  
  // Default topics if none are provided
  const defaultTopics: Topic[] = [
    { 
      title: "Technology", 
      image: "/tech-bg.jpg", 
      slug: "technology" 
    },
    { 
      title: "Life & Mind", 
      image: "/mind-bg.jpg", 
      slug: "life-mind" 
    },
    { 
      title: "Everyday Science", 
      image: "/science-bg.jpg", 
      slug: "everyday-science" 
    },
    { 
      title: "Society & World", 
      image: "/world-bg.jpg", 
      slug: "society-world" 
    },
  ];

  // Use provided topics or default ones
  const displayTopics = topics || defaultTopics;

  const handleTopicClick = (slug: string) => {
    // Navigate to topic page
    router.push(`/topics/${slug}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayTopics.map((topic) => (
          <button
            key={topic.slug}
            onClick={() => handleTopicClick(topic.slug)}
            className="relative h-48 rounded-xl overflow-hidden group"
          >
            {/* Background Image */}
            <Image
              src={topic.image}
              alt={topic.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-end p-4">
              <span className="text-white text-xl font-bold">
                {topic.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}