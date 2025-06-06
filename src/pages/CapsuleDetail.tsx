import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import axios from "axios";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const CapsuleDetail: React.FC = () => {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [capsule, setCapsule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const response = await axios.get(
          `https://culture-capsule-backend.onrender.com/api/posts/${id}?language=${language}`
        );
        if (response.data.success) {
          setCapsule(response.data);

          // Check user interaction status if authenticated
          if (isAuthenticated) {
            try {
              const userResponse = await axios.get(
                `https://culture-capsule-backend.onrender.com/api/users/me`,
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                }
              );

              if (userResponse.data.success) {
                const userId = userResponse.data.user._id;
                const post = response.data.post;

                // Check if user has liked or disliked the post
                setLiked(post.likes.includes(userId));
                setDisliked(post.dislikes.includes(userId));
              }
            } catch (error) {
              console.error("Error fetching user interaction status:", error);
            }
          }

          // Set initial counts
          setLikeCount(response.data.post.likes.length);
          setDislikeCount(response.data.post.dislikes.length);
        } else {
          toast({
            variant: "destructive",
            title: t("Error"),
            description:
              response.data.message ||
              "Failed to fetch capsule data. Please try again later.",
          });
        }
      } catch (error) {
        console.error("Error fetching capsule data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCapsule();
  }, [id, language, toast, t, isAuthenticated]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(language, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast({
        title: t("Authentication Required"),
        description: t("Please log in to like posts"),
        variant: "destructive",
      });
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (liked) {
        // Unlike if already liked
        const response = await axios.post(
          `https://culture-capsule-backend.onrender.com/api/posts/${id}/unlike`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (response.data.success) {
          setLiked(false);
          setLikeCount(response.data.likes || likeCount - 1);
          setDislikeCount(response.data.dislikes || dislikeCount);

          // Visual feedback
          toast({
            title: t("Like removed"),
            description: t("You have removed your like from this post"),
          });
        }
      } else {
        // Like if not already liked
        const response = await axios.post(
          `https://culture-capsule-backend.onrender.com/api/posts/${id}/like`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (response.data.success) {
          setLiked(true);
          setDisliked(false); // remove dislike if it was active
          setLikeCount(response.data.likes || likeCount + 1);
          setDislikeCount(
            response.data.dislikes ||
              (disliked ? dislikeCount - 1 : dislikeCount)
          );

          // Visual feedback
          toast({
            title: t("Post liked"),
            description: t("You have liked this post"),
          });
        }
      }
    } catch (error) {
      console.error("Error (un)liking post:", error);
      toast({
        variant: "destructive",
        title: t("Error"),
        description: t("Failed to process your like action. Please try again."),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDislike = async () => {
    if (!isAuthenticated) {
      toast({
        title: t("Authentication Required"),
        description: t("Please log in to dislike posts"),
        variant: "destructive",
      });
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (disliked) {
        // Undislike if already disliked
        const response = await axios.post(
          `https://culture-capsule-backend.onrender.com/api/posts/${id}/undislike`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (response.data.success) {
          setDisliked(false);
          setLikeCount(response.data.likes || likeCount);
          setDislikeCount(response.data.dislikes || dislikeCount - 1);

          // Visual feedback
          toast({
            title: t("Dislike removed"),
            description: t("You have removed your dislike from this post"),
          });
        }
      } else {
        // Dislike if not already disliked
        const response = await axios.post(
          `https://culture-capsule-backend.onrender.com/api/posts/${id}/dislike`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (response.data.success) {
          setDisliked(true);
          setLiked(false); // remove like if it was active
          setDislikeCount(response.data.dislikes || dislikeCount + 1);
          setLikeCount(
            response.data.likes || (liked ? likeCount - 1 : likeCount)
          );

          // Visual feedback
          toast({
            title: t("Post disliked"),
            description: t("You have disliked this post"),
          });
        }
      }
    } catch (error) {
      console.error("Error (un)disliking post:", error);
      toast({
        variant: "destructive",
        title: t("Error"),
        description: t(
          "Failed to process your dislike action. Please try again."
        ),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-capsule-bg">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 sm:px-6 pt-24 pb-20 animate-pulse">
          <div className="h-8 w-24 bg-gray-200 rounded mb-6"></div>
          <div className="h-[400px] w-full bg-gray-200 rounded-xl mb-6"></div>
          <div className="h-8 w-1/3 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-1/4 bg-gray-200 rounded mb-10"></div>
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!capsule) {
    return (
      <div className="min-h-screen bg-capsule-bg">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20 text-center">
          <div className="mt-12 space-y-6">
            <h1 className="text-3xl font-serif mb-4 text-black">
              {t("Capsule not found")}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              {t(
                "The capsule you're looking for doesn't exist or has been removed."
              )}
            </p>
            <Button
              onClick={() => navigate("/featured")}
              className="bg-capsule-accent hover:bg-capsule-accent/90 text-white"
            >
              {t("Return to Featured Capsules")}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const readingTime = getReadingTime(capsule.post.content);
  const hasMultipleImages =
    capsule.post.images && capsule.post.images.length > 1;

  return (
    <div className="min-h-screen bg-capsule-bg">
      <Navbar />

      <main className="pt-8 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <Button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 group "
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>{t("Back")}</span>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white text-black max-w-3xl 2xl:max-w-4xl rounded-xl shadow-md overflow-hidden"
          >
            {/* Header Information */}
            <div className="p-6 sm:p-10 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-10 h-10 border-2 border-capsule-accent">
                  <AvatarImage src={capsule.post.author.profilePicture} />
                  <AvatarFallback>
                    {capsule.post.author.firstName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{capsule.post.author.username}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(capsule.post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>
                        {readingTime} {t("min-read")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <span className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
                {capsule.post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-semibold mb-2 text-black">
                {capsule.post.title}
              </h1>
            </div>

            {/* Images Section */}
            {capsule.post.images && capsule.post.images.length > 0 && (
              <div className="relative">
                {hasMultipleImages ? (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {capsule.post.images.map(
                        (image: string, index: number) => (
                          <CarouselItem key={index}>
                            <div className="relative">
                              <img
                                src={image}
                                alt={`${capsule.post.title} - Image ${
                                  index + 1
                                }`}
                                className="w-full h-auto max-h-[500px] object-contain mx-auto"
                              />
                              <div className="absolute bottom-4 right-6 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                {index + 1}/{capsule.post.images.length}
                              </div>
                            </div>
                          </CarouselItem>
                        )
                      )}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 z-10" />
                    <CarouselNext className="right-4 z-10" />
                  </Carousel>
                ) : (
                  <div className="w-full flex justify-center relative overflow-hidden bg-gray-100">
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        backgroundImage: `url(${capsule.post.images[0]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(15px)",
                        transform: "scale(1.1)",
                        opacity: 0.7,
                      }}
                    />
                    <img
                      src={capsule.post.images[0]}
                      alt={capsule.post.title}
                      className="relative z-1 max-w-full max-h-[300px] object-contain my-6"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Content Section */}
            <div className="p-6 sm:p-10">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-black">
                  {capsule.post.content}
                </p>
              </div>

              {/* Engagement Section */}
              <div className="border-t border-capsule-accent mt-10 pt-6">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-2 transition-all duration-200 ${
                        liked
                          ? "text-capsule-accent bg-capsule-accent/10"
                          : "text-gray-500 hover:text-white"
                      } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={handleLike}
                      disabled={isProcessing || !isAuthenticated}
                    >
                      <ThumbsUp
                        size={18}
                        className={`transition-transform ${
                          liked ? "fill-current scale-110" : ""
                        } ${isProcessing ? "animate-pulse" : ""}`}
                      />
                      <span>{likeCount}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-2 transition-all duration-200 ${
                        disliked
                          ? "text-red-500 bg-red-500/10"
                          : "text-gray-500 hover:text-white"
                      } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={handleDislike}
                      disabled={isProcessing || !isAuthenticated}
                    >
                      <ThumbsDown
                        size={18}
                        className={`transition-transform ${
                          disliked ? "fill-current scale-110" : ""
                        } ${isProcessing ? "animate-pulse" : ""}`}
                      />
                      <span>{dislikeCount}</span>
                    </Button>
                  </div>

                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: capsule.post.title,
                            text: "Check out this cultural capsule!",
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          toast({
                            title: t("Link copied"),
                            description: t(
                              "The link has been copied to your clipboard"
                            ),
                          });
                        }
                      }}
                    >
                      <Share2 size={16} />
                      <span>{t("Share")}</span>
                    </Button>
                  </div>
                </div>

                {!isAuthenticated && (
                  <p className="text-sm text-gray-500 mt-4">
                    {t("Please log in to like or dislike posts")}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CapsuleDetail;
