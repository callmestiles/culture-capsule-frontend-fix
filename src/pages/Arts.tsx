import React from "react";
import { Palette, Brush, Scissors } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedImage from "@/components/AnimatedImage";
import CollectionCard from "@/components/CollectionCard";
import { useLanguage } from "@/contexts/LanguageContext";
import axios from "axios";
import { useEffect } from "react";

const Arts = () => {
  const { t } = useLanguage();
  let artsCollection = [];
  const [artsData, setArtsData] = React.useState([]);
  const getResponse = async () => {
    try {
      const response = await axios.get(
        `https://culture-capsule-backend.onrender.com/api/posts/category/Arts and Crafts?language=${localStorage.getItem(
          "language"
        )}`
      );
      const data = response.data.posts;
      const transformedData = data.map((item) => ({
        title: item.title,
        category: "Arts & Crafts", // Assuming category is not available in the response, you can set it to a default value or fetch it from another source
        contributor: `${item.author.firstName} ${item.author.lastName}`,
        date: new Date(item.createdAt).toLocaleDateString(),
        imageSrc: item.images[0] || "https://placehold.co/400?text=!",
        href: `/capsule/${item._id}`,
        noOfLikes: item.likes.length || 0,
        noOfDislikes: item.dislikes.length || 0,
      }));
      setArtsData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  artsCollection = artsData.concat(artsCollection);

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
                  {t("arts_pill")}
                </div>
                <h1 className="sm:text-5xl lg:text-6xl font-serif font-semibold mb-4 text-capsule-text">
                  {t("arts_title")}
                </h1>
                <p className="text-capsule-text/80 leading-relaxed mb-6">
                  {t("arts_description")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Palette size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      {t("arts_icon_one")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Brush size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      {t("arts_icon_two")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Scissors size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      {t("arts_icon_three")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <AnimatedImage
                  src="/images/artsOne.jpg"
                  alt="Traditional arts and crafts of North Cyprus"
                  className="rounded-xl shadow-capsule"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Arts Collections */}
        <section className="py-20 bg-white relative">
          <div className="absolute inset-0 opacity-[0.02] bg-noise-pattern mix-blend-multiply" />

          <div className="capsule-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
                {t("arts_pill")}
              </div>

              <h2 className="text-3xl text-black sm:text-4xl font-serif font-semibold mb-4">
                {t("arts_title")}
              </h2>

              <p className="text-capsule-text/80 leading-relaxed">
                {t("arts_description")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {artsCollection.map((recipe, index) => (
                <CollectionCard
                  key={recipe.title}
                  title={recipe.title}
                  category={recipe.category}
                  contributor={recipe.contributor}
                  date={recipe.date}
                  imageSrc={recipe.imageSrc}
                  href={recipe.href}
                  className="animate-fade-in opacity-0"
                  likes={recipe.noOfLikes}
                  dislikes={recipe.noOfDislikes}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Art */}
        <section className="py-20 bg-capsule-paper relative">
          <div className="absolute inset-0 opacity-[0.04] bg-noise-pattern mix-blend-multiply" />

          <div className="capsule-container">
            <div className="bg-white rounded-2xl shadow-capsule overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
                    {t("arts_pill")}
                  </div>

                  <h3 className="text-2xl text-black lg:text-3xl font-serif font-semibold mb-4">
                    Leftkoniko Pottery: A Dying Artform
                  </h3>

                  <p className="text-capsule-text/80 leading-relaxed mb-6">
                    Leftkoniko pottery is one of North Cyprus's most distinctive
                    craft traditions, characterized by its earthy red clay and
                    geometric patterns that tell stories of village life,
                    nature, and mythology. This ancient craft has been passed
                    down through generations, with techniques dating back to the
                    Bronze Age.
                  </p>

                  <p className="text-capsule-text/80 leading-relaxed mb-6">
                    Today, only a handful of master potters remain who practice
                    this traditional craft. This collection documents their
                    techniques, stories, and finished works to ensure this
                    cultural treasure is preserved for future generations.
                  </p>

                  <div className="mt-4">
                    <a
                      href="#view-collection"
                      className="inline-flex items-center gap-2 bg-capsule-accent text-white px-6 py-3 rounded-lg hover:bg-capsule-accent/90 transition-colors"
                    >
                      <span>{t("arts_sectiontwo_button")}</span>
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
                    src="https://images.unsplash.com/photo-1619065513237-828bf1956fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
                    alt="Traditional Leftkoniko pottery"
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

export default Arts;
