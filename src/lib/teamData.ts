import type { TeamMember } from "./types"
import danImg from "/images/dan.png";
import dunaImg from "/images/duna.png";
import nesrinImg from "/images/nesrin.png";
import immaImg from "/images/imma.png";
import deneoImg from "/images/deneo.png";
import ayImg from "/images/ay.png";
import cemImg from "/images/cem.png";


export const missionStatement = `Culture Capsule is dedicated to preserving and celebrating the rich cultural heritage of North Cyprus. We believe that cultural heritage is not just about the past—it's a living, breathing part of our identity that connects generations and communities. Through documentation, education, and community engagement, we work to ensure that the unique traditions, stories, and artifacts of North Cyprus are preserved for future generations to appreciate and learn from.`

export const teamMembers: TeamMember[] = [
    {
        id: "1",
        name: "Cem Kalyoncu",
        role: "Supervisor",
        bio: "Cem is a cultural heritage expert with a deep understanding of North Cyprus's history and traditions. He oversees our projects, ensuring that we adhere to best practices in cultural preservation. Cem's leadership and vision guide our team in documenting and celebrating the rich tapestry of our cultural heritage.",
        image: cemImg,
        socialLinks: [
        {
            platform: "twitter",
            url: "https://twitter.com",
        },
        {
            platform: "linkedin",
            url: "https://linkedin.com",
        },
        ],
    },
  {
    id: "2",
    name: "Siphesihle Deneo",
    role: "UI Designer",
    bio: "Siphesihle is a UI designer with a passion for creating user-friendly interfaces. With a background in graphic design and a keen eye for detail, she ensures that our digital platforms are not only functional but also visually appealing. Siphesihle's work enhances the user experience, making it easier for people to engage with our cultural heritage.",
    image: deneoImg,
    socialLinks: [
      {
        platform: "twitter",
        url: "https://twitter.com",
      },
      {
        platform: "linkedin",
        url: "https://linkedin.com",
      },
    ],
  },
  {
    id: "3",
    name: "Dunamis Olukayode",
    role: "Backend Developer",
    bio: "Dunamis is a backend developer with a focus on building robust and scalable systems. He has a degree in computer science and extensive experience in server-side programming. Dunamis ensures that our digital archives are secure, efficient, and accessible to researchers and the public.",
    image: dunaImg,
    socialLinks: [
      {
        platform: "twitter",
        url: "https://twitter.com",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/dunamis-olukayode-33318b246/",
      },
    ],
  },
  {
    id: "4",
    name: "Daniel Adegoke",
    role: "Frontend Developer",
    bio: "Daniel is a frontend developer with a knack for creating interactive and engaging web applications. He has a background in web development and a passion for user experience design. Daniel works closely with Siphesihle to ensure that our digital platforms are both functional and visually appealing.",
    image: danImg,
    socialLinks: [
      {
        platform: "instagram",
        url: "https://instagram.com",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/mofopefoluwa-daniel-adegoke-abc/",
      },
    ],
  },
  {
    id: "5",
    name: "Immaculata Umoh",
    role: "AI Engineer",
    bio: "Immaculata is an AI engineer specializing in machine learning and data analysis. With a background in artificial intelligence, she develops algorithms to analyze and categorize cultural artifacts. Her work helps us better understand the significance of our collections and makes them more accessible to researchers.",
    image: immaImg,
    socialLinks: [
      {
        platform: "twitter",
        url: "https://twitter.com",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/immaculata-umoh-75408522b/",
      },
    ],
  },
  {
    id: "6",
    name: "Ayooluwa Owolabi",
    role: "Mobile App Developer",
    bio: "Ayo is a mobile app developer with a passion for creating applications that enhance user engagement. With experience in both iOS and Android development, Ayo is responsible for our mobile platform, which allows users to explore cultural heritage on the go. His work ensures that our resources are accessible to everyone.",
    image: ayImg || "/placeholder.svg?height=400&width=400&text=Ayşe",
    socialLinks: [
      {
        platform: "instagram",
        url: "https://instagram.com",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/ayooluwa-o-0b0532237/",
      },
    ],
  },
  {
    id: "7",
    name: "Nersin Kara",
    role: "Head of Research",
    bio: "Nersin is a cultural anthropologist with a deep understanding of North Cyprus's history and traditions. She leads our research initiatives, collaborating with local communities to document their stories and practices. Nersin's work ensures that our archives reflect the rich diversity of cultural heritage in North Cyprus.",
    image: nesrinImg,
    socialLinks: [
      {
        platform: "instagram",
        url: "https://instagram.com",
      },
      {
        platform: "linkedin",
        url: "https://linkedin.com",
      },
    ],
  },
]

