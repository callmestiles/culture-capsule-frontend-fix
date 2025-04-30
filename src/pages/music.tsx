import React, { useEffect } from "react";
import { Guitar, Music, CassetteTape } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedImage from "@/components/AnimatedImage";
import CollectionCard from "@/components/CollectionCard";
import { useLanguage } from "@/contexts/LanguageContext";
import axios from "axios";

const MusicPage = () => {
  const { t } = useLanguage();
  let musicData = [];
  const [historicalData, setHistoricalData] = React.useState([]);
  const getResponse = async () => {
    try {
      const response = await axios.get(
        "https://culture-capsule-backend.onrender.com/api/posts?language=en"
      );
      const data = response.data.posts;
      console.log("Data fetched:", data);
      const transformedData = data
        .filter((item) => item.category === "Music and Dance")
        .map((item) => ({
          title: item.title,
          category: "Historical Events",
          contributor: `${item.author.firstName} ${item.author.lastName}`,
          date: new Date(item.createdAt).toLocaleDateString(),
          imageSrc: item.images[0] || "https://placehold.co/400?text=!",
          href: `/capsule/${item._id}`,
          noOfLikes: item.likes.length || 0,
          noOfDislikes: item.dislikes.length || 0,
        }));

      setHistoricalData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  musicData = historicalData.concat(musicData);

  useEffect(() => {
    getResponse();
  }, []);
  return (
    <div className="min-h-screen bg-capsule-bg">
      <Navbar backgroundColor="bg-capsule-paper" />

      <main>
        <section
          className="relative bg-capsule-paper flex flex-col justify-center "
          style={{ minHeight: "calc(100vh - 5rem)" }}
        >
          <div className="absolute inset-0 opacity-[0.04] bg-noise-pattern mix-blend-multiply" />
          <div className="capsule-container">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
                  {t("music_pill")}
                </div>
                <h1 className="sm:text-5xl lg:text-6xl md:text-5xl font-serif font-semibold mb-4 text-capsule-text">
                  {t("music_title")}
                </h1>
                <p className="text-capsule-text/80 leading-relaxed mb-6">
                  {t("music_description")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Guitar size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      {t("music_icon_one")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Music size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      {t("music_icon_two")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <CassetteTape size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      {t("music_icon_three")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <AnimatedImage
                  src="/images/history.jpg"
                  alt="Historical monuments in North Cyprus"
                  className="rounded-xl shadow-capsule"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Historical Events */}
        <section className="py-20 bg-white relative">
          <div className="absolute inset-0 opacity-[0.02] bg-noise-pattern mix-blend-multiply" />

          <div className="capsule-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
                {t("music_sectionone_pill")}
              </div>

              <h2 className="text-3xl text-black sm:text-4xl font-serif font-semibold mb-4">
                {t("music_sectionone_title")}
              </h2>

              <p className="text-capsule-text/80 leading-relaxed">
                {t("music_sectionone_description")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {musicData.map((event, index) => (
                <CollectionCard
                  key={event.title}
                  title={event.title}
                  category={event.category}
                  contributor={event.contributor}
                  date={event.date}
                  imageSrc={event.imageSrc}
                  href={event.href}
                  className="animate-fade-in opacity-0"
                  index={index} // Adjust the index for the href
                  likes={event.noOfLikes}
                  dislikes={event.noOfDislikes}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-20 bg-capsule-paper relative">
          <div className="absolute inset-0 opacity-[0.04] bg-noise-pattern mix-blend-multiply" />

          <div className="capsule-container">
            <div className="bg-white rounded-2xl shadow-capsule overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
                    {t("history_sectiontwo_pill")}
                  </div>

                  <h3 className="text-2xl text-black lg:text-3xl font-serif font-semibold mb-4">
                    {musicData[0]?.title || "The Turkish Intervention of 1974"}
                  </h3>

                  <p className="text-capsule-text/80 leading-relaxed mb-6">
                    {musicData[0]?.description ||
                      "The Turkish intervention of 1974 in Cyprus was a significant event that led to the division of the island into two parts: the Republic of Cyprus and the Turkish Republic of Northern Cyprus. This intervention was a response to a coup d'état that aimed to unite Cyprus with Greece, which was opposed by Turkey."}
                  </p>
                  <div className="mt-6">
                    <a
                      href="#read-more"
                      className="inline-flex items-center gap-2 bg-capsule-accent text-white px-6 py-3 rounded-lg hover:bg-capsule-accent/90 transition-colors"
                    >
                      <span>{t("history_sectiontwo_button")}</span>
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
                    src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Historical photograph of the 1974 intervention"
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

export default MusicPage;
