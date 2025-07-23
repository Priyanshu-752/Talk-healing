"use client"

import Link from 'next/link'

interface IconProps {
  className?: string;
}

const RibbonIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22" />
    <path d="m12 18 2.57-3.5" />
    <path d="M6.243 9.016a7 7 0 0 1 11.507-.009" />
    <path d="M9.35 14.53 12 11.22" />
    <path d="M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z" />
  </svg>
)

const topics = [
  
  {
    title: "Hypertension (High Blood Pressure)",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Diabetes",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Coronary Artery Disease",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Stroke",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Cancer",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Asthma",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Alzheimer's Disease",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Chronic Obstructive Pulmonary Disease",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Arthritis",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Influenza (Flu)",
    url: "#",
    icon: RibbonIcon,
  },
]

export function TopicsCard() {
  return (
    <><div className="bg-white rounded-2xl shadow-md p-6 max-w-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">Topics</h2>
          {topics.map((topic, index) => (
              <Link
                  key={index}
                  href={`/topic/${topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="flex items-center group"
              >
                  <div className="w-full p-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <topic.icon className="w-5 h-5 text-gray-500" />
                      <span>{topic.title}</span>
                  </div>
              </Link>
          ))}
      </div></>
  )
}

export default TopicsCard;