import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { getUserPostsCount } from "@/lib/mockData";

interface UserPostsProps {
  posts: Post[];
}

export function UserPosts({ posts }: UserPostsProps) {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust as needed
  const totalPages = Math.ceil(getUserPostsCount() / itemsPerPage);
  const navigate = useNavigate();

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
        return;
      }

      toast({
        title: "Post deleted",
        description: "Your post has been successfully deleted.",
      });

      setTimeout(() => {
        navigate(0);
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error deleting post:", error);
      toast({
        title: "Failed to delete post",
        description: error.message,
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let pages = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
      const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (startPage > 1) pages = [1, "...", ...pages.slice(2)];
      if (endPage < totalPages)
        pages = [...pages.slice(0, -2), "...", totalPages];
    }

    return pages;
  };

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return posts.slice(start, start + itemsPerPage);
  }, [currentPage, posts]);

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
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-md">
            <div className="relative h-48 w-full">
              <img
                src={
                  post.image ||
                  "/placeholder.svg?height=200&width=300&text=Post"
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
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{formatDate(post.date)}</span>
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg flex items-center justify-center ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."}
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                  page === currentPage
                    ? "bg-[rgb(82,104,45)] text-white"
                    : page === "..."
                    ? "text-gray-500 cursor-default"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg flex items-center justify-center ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="text-center text-gray-500 text-sm mt-4">
        Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
        {Math.min(currentPage * itemsPerPage, getUserPostsCount())} of{" "}
        {getUserPostsCount()} posts
      </div>
    </>
  );
}
