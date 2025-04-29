import React from "react";
import { Book, MessageCircle, Music } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedImage from "@/components/AnimatedImage";
import CollectionCard from "@/components/CollectionCard";
import { useLanguage } from "@/contexts/LanguageContext";
import axios from "axios";
import { useEffect } from "react";

const Folklore = () => {
  const { t } = useLanguage();
  let folkloreCollection = [];

  const [folkloreData, setFolkloreData] = React.useState([]);
  const getResponse = async () => {
    try {
      const response = await axios.get(
        `https://culture-capsule-backend.onrender.com/api/posts/category/Folklore and Stories?language=${localStorage.getItem(
          "language"
        )}`
      );
      const data = response.data.posts;
      const transformedData = data.map((item) => ({
        title: item.title,
        category: "Folklore & Stories", // Assuming category is not available in the response, you can set it to a default value or fetch it from another source
        contributor: `${item.author.firstName} ${item.author.lastName}`,
        date: new Date(item.createdAt).toLocaleDateString(),
        imageSrc: item.images[0] || "https://placehold.co/400?text=!",
        href: `/capsule/${item._id}`,
        noOfLikes: item.likes.length || 0,
        noOfDislikes: item.dislikes.length || 0,
      }));
      setFolkloreData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  folkloreCollection = folkloreData.concat(folkloreCollection);

  useEffect(() => {
    getResponse();
  }, []);
  return (
    <div className="min-h-screen bg-capsule-bg">
      <Navbar backgroundColor="bg-capsule-paper" />

      <main>
        {/* Hero Section */}
        <section
          className="relative bg-capsule-paper flex items-center"
          style={{ minHeight: "calc(100vh - 5rem)" }}
        >
          <div className="absolute inset-0 opacity-[0.04] bg-noise-pattern mix-blend-multiply" />
          <div className="capsule-container">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
                  {t("folklore_pill")}
                </div>
                <h1 className="sm:text-5xl lg:text-6xl font-serif font-semibold mb-4 text-capsule-text">
                  {t("folklore_title")}
                </h1>
                <p className="text-capsule-text/80 leading-relaxed mb-6">
                  {t("folklore_description")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Book size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      {t("folklore_icon_one")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <MessageCircle size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      {t("folklore_icon_two")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Music size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      {t("folklore_icon_three")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <AnimatedImage
                  src="https://images.unsplash.com/photo-1577083288073-40892c0860a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Traditional storytelling in North Cyprus"
                  className="rounded-xl shadow-capsule"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Folklore Collections */}
        <section className="py-20 bg-white relative">
          <div className="absolute inset-0 opacity-[0.02] bg-noise-pattern mix-blend-multiply" />

          <div className="capsule-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
                {t("folklore_pill")}
              </div>

              <h2 className="text-3xl text-black sm:text-4xl font-serif font-semibold mb-4">
                {t("folklore_title")}
              </h2>

              <p className="text-capsule-text/80 leading-relaxed">
                {t("folklore_description")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {folkloreCollection.map((folklore, index) => (
                <CollectionCard
                  key={folklore.title}
                  title={folklore.title}
                  category={folklore.category}
                  contributor={folklore.contributor}
                  date={folklore.date}
                  imageSrc={folklore.imageSrc}
                  href={folklore.href}
                  className="animate-fade-in opacity-0"
                  likes={folklore.noOfLikes}
                  dislikes={folklore.noOfDislikes}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Story */}
        <section className="py-20 bg-capsule-paper relative">
          <div className="absolute inset-0 opacity-[0.04] bg-noise-pattern mix-blend-multiply" />

          <div className="capsule-container">
            <div className="bg-white rounded-2xl shadow-capsule overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
                    {t("folklore_pill")}
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-serif font-semibold mb-4">
                    The Legend of the Five Finger Mountain
                  </h3>

                  <p className="text-capsule-text/80 leading-relaxed mb-6">
                    The distinctive Five Finger Mountain (Beşparmak) that
                    dominates the skyline of North Cyprus has inspired many
                    legends over the centuries. According to one of the most
                    popular tales, the mountain formation represents the
                    handprint of a giant who helped save Cyprus from invaders.
                  </p>

                  <p className="text-capsule-text/80 leading-relaxed mb-6">
                    As the story goes, a Byzantine giant named Digenis Akritas
                    was fighting against invading forces. In a moment of
                    desperation, he leaped from Asia Minor (modern-day Turkey)
                    and landed in Cyprus, leaving his handprint embedded in the
                    mountain range where his hand touched the ground.
                  </p>

                  <div className="mt-4">
                    <a
                      href="#read-story"
                      className="inline-flex items-center gap-2 bg-capsule-accent text-white px-6 py-3 rounded-lg hover:bg-capsule-accent/90 transition-colors"
                    >
                      <span>{t("folklore_sectiontwo_button")}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="relative h-64 lg:h-auto">
                  <AnimatedImage
                    src="https://images.unsplash.com/photo-1657214059233-5626b35eb349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80"
                    alt="Five Finger Mountain in North Cyprus"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Folklore;
