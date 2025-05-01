export interface User {
  id: string
  name: string
  bio: string
  profileImage: string | null
  posts: number
  likes: number
  contributions: number
  userName: string
}

export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  image: string | null
  category: string
  date: string
  likes: number
  dislikes: number
  comments: number
}
