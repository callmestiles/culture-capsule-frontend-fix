import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import axios from "axios";

const CapsuleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [capsule, setCapsule] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const response = await axios.get(
          `https://culture-capsule-backend.onrender.com/api/posts/${id}`
        );
        setCapsule(response.data);
      } catch (error) {
        console.error("Error fetching capsule data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCapsule();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-capsule-bg dark:bg-gray-900 text-center pt-28 text-capsule-text dark:text-white">
        <Navbar />
        <p>Loading...</p>
        <Footer />
      </div>
    );
  }

  if (!capsule) {
    return (
      <div className="min-h-screen bg-capsule-bg dark:bg-gray-900">
        <Navbar />
        <div className="pt-28 pb-20 text-center">
          <h1 className="text-3xl font-serif mb-4 text-capsule-text dark:text-white">
            Capsule not found
          </h1>
          <Button onClick={() => navigate("/featured")}>
            Return to Featured Capsules
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-capsule-bg dark:bg-gray-900">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="capsule-container">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-capsule-text dark:text-white"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Button>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card overflow-hidden">
            <div className="relative h-[50vh] overflow-hidden">
              <img
                src={capsule?.post?.images[0] || "https://picsum.photos/200"}
                alt={capsule?.post?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="inline-block px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-sm font-medium text-capsule-text dark:text-white mb-4">
                  {capsule?.post?.category}
                </div>
                <h1 className="text-4xl sm:text-5xl font-serif font-semibold mb-4 text-white">
                  {capsule?.post?.title}
                </h1>
                <div className="flex items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>
                      {t("by")}{" "}
                      {capsule?.post?.author?.firstName +
                        " " +
                        capsule?.post?.author?.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{capsule?.post?.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-12">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed mb-6 text-capsule-text dark:text-gray-300">
                  {capsule?.post?.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CapsuleDetail;
