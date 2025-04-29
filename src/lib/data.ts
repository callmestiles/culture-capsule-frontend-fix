import axios from "axios"

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
    id: events?._id || Math.floor(Math.random() * 10000),
    title: events?.title || "Event Title",
    description: events?.description || "Event Description",
    date: events?.startDate || "2023-10-01",
    time: events?.time || "6:00 PM - 8:00 PM",
    location: events?.location || "Event Location",
    category: events?.category || "Event Category",
    image: events?.imageUrl.length > 0 ? events.imageUrl[0] : "https://picsum.photos/200",
  }
})