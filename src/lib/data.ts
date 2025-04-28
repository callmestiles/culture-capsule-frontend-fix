import axios from "axios"
import { ImageOff } from "lucide-react"

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

const eventRealData = async () => {
  try {
    const response = await axios.get(
      "https://culture-capsule-backend.onrender.com/api/events"
    )
    return response.data
  } catch (error) {
    console.error("Error fetching events:", error)
    return "";
  }
}
const response = await eventRealData();

export const eventData: Event[] = response.events.map(events => {
  return {
    id: events._id,
    title: events.title,
    description: events.description,
    date: events.startDate,
    time: events.time || "6:00 PM - 8:00 PM",
    location: events.location,
    category: events.category,
    image: events.imageUrl.length > 0 ? events.imageUrl[0] : "https://picsum.photos/200",
  }
})