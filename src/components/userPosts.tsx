import { ThumbsUp, ThumbsDown, MessageSquare, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/types";
import { a } from "node_modules/framer-motion/dist/types.d-DDSxwf0n";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clear } from "console";

interface UserPostsProps {
  posts: Post[];
}

export function UserPosts({ posts }: UserPostsProps) {
  const { toast } = useToast();
  const Navigate = useNavigate();
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const deletePost = async (postId: string) => {
    try {
      const response = await axios.delete(
        `https://culture-capsule-backend.onrender.com/api/posts/${postId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.data.success) {
        toast({
          title: "Failed to delete post",
          description: "Please try again later.",
        });
        throw new Error("Failed to delete post");
      } else {
        toast({
          title: "Post deleted",
          description: "Your post has been successfully deleted.",
        });
        setTimeout(() => {
          Navigate(0);
        }, 2000);
      }

      // Optionally, you can refresh the posts list or update the UI after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Failed to delete post",
        description: error.message,
      });
    }
  };

  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <p className="text-gray-500">No posts found in this category.</p>
        <a href="/contribute">
          <button className="mt-4 rounded-md bg-[rgb(82,104,45)] px-4 py-2 text-sm font-medium text-white hover:bg-[rgb(65,85,35)]">
            Create New Post
          </button>
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden hover:shadow-md">
          <div className="relative h-48 w-full">
            <img
              src={
                post.image || "/placeholder.svg?height=200&width=300&text=Post"
              }
              alt={post.title}
              className="h-full w-full object-cover"
            />
            <Badge className="absolute left-3 top-3 bg-[rgb(82,104,45)]">
              {post.category}
            </Badge>
          </div>
          <CardContent className="p-4">
            <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-1">
              {post.title}
            </h3>
            <p className="mb-4 text-gray-600 line-clamp-2">{post.excerpt}</p>

            <div className="mb-3 flex items-center text-sm text-gray-500">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-[rgb(82,104,45)]" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{post.dislikes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{post.comments}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={"capsule/" + post.id}
                  className="text-sm font-medium text-[rgb(82,104,45)] hover:underline"
                >
                  View Post
                </a>
                <button
                  className="text-sm font-medium text-[rgb(255,0,0)] hover:underline"
                  onClick={() => deletePost(post.id)}
                >
                  Delete Post
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
