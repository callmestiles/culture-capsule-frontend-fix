export interface User {
  id: string
  name: string
  bio: string
  profileImage: string | null
  posts: number
  likes: number
  contributions: number
  username: string
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


export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string | null
  socialLinks: SocialLink[]
}

export interface SocialLink {
  platform: string
  url: string
}
