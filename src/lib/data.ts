export interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image?: string
}

export const eventData: Event[] = [
  {
    id: 1,
    title: "Jazz in the Park",
    description:
      "Enjoy an evening of live jazz music in the heart of the city park. Bring your blankets and picnic baskets!",
    date: "2025-05-15",
    time: "6:00 PM - 9:00 PM",
    location: "Central Park",
    category: "Music",
    image: "/placeholder.svg?height=300&width=400&text=Jazz+Event",
  },
  {
    id: 2,
    title: "Contemporary Art Exhibition",
    description: "Featuring works from emerging artists exploring themes of identity and technology in modern society.",
    date: "2025-05-18",
    time: "10:00 AM - 6:00 PM",
    location: "Modern Art Gallery",
    category: "Art",
    image: "/placeholder.svg?height=300&width=400&text=Art+Exhibition",
  },
  {
    id: 3,
    title: "International Food Festival",
    description:
      "Sample cuisines from around the world with over 30 food vendors, cooking demonstrations, and cultural performances.",
    date: "2025-05-20",
    time: "11:00 AM - 8:00 PM",
    location: "Riverfront Plaza",
    category: "Food",
    image: "/placeholder.svg?height=300&width=400&text=Food+Festival",
  },
  {
    id: 4,
    title: "Classical Symphony Orchestra",
    description: "The city's symphony orchestra performs masterpieces by Mozart, Beethoven, and Tchaikovsky.",
    date: "2025-05-22",
    time: "7:30 PM - 10:00 PM",
    location: "Grand Concert Hall",
    category: "Music",
    image: "/placeholder.svg?height=300&width=400&text=Symphony+Concert",
  },
  {
    id: 5,
    title: "Street Art Festival",
    description:
      "Watch as talented street artists transform blank walls into stunning murals throughout the downtown area.",
    date: "2025-05-25",
    time: "12:00 PM - 6:00 PM",
    location: "Downtown District",
    category: "Art",
    image: "/placeholder.svg?height=300&width=400&text=Street+Art",
  },
  {
    id: 6,
    title: "Artisanal Wine & Cheese Tasting",
    description: "Discover perfect pairings with local artisanal cheeses and wines from boutique vineyards.",
    date: "2025-05-28",
    time: "5:00 PM - 8:00 PM",
    location: "Vintage Cellar",
    category: "Food",
    image: "/placeholder.svg?height=300&width=400&text=Wine+Tasting",
  },
]
