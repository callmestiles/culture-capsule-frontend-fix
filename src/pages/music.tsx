import React, { useState, useEffect } from "react";
import {
  Guitar,
  Music,
  CassetteTape,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedImage from "@/components/AnimatedImage";
import CollectionCard from "@/components/CollectionCard";
import CollectionCardSkeleton from "@/components/CollectionCardSkeleton";
import { NoImagePlaceholder1 } from "@/components/ImagePlaceholders";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import axios from "axios";

const MusicPage = () => {
  const { t, language } = useLanguage();
  const [musicData, setMusicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://culture-capsule-backend.onrender.com/api/posts/category/Music and Dance?language=${language}&page=${currentPage}&limit=${itemsPerPage}`
        );

        if (response.data.success) {
          if (response.data.pagination) {
            setCurrentPage(response.data.pagination.currentPage);
            setTotalPages(response.data.pagination.totalPages);
            setTotalItems(response.data.pagination.totalItems);
            setItemsPerPage(response.data.pagination.itemsPerPage);
          }

          let hasImages = true;

          const transformedData = response.data.posts.map((item) => {
            if (item.images.length === 0) {
              hasImages = false;
            }
            return {
              title: item.title,
              content: item.content,
              category: item.category,
              contributor: item.author.username,
              date: new Date(item.createdAt).toLocaleDateString(),
              imageSrc: item.images[0] || " ",
              hasImages: hasImages,
              href: `/capsule/${item._id}`,
              noOfLikes: item.likes.length || 0,
              noOfDislikes: item.dislikes.length || 0,
            };
          });

          setMusicData(transformedData);

          if (transformedData.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * transformedData.length
            );
            setFeaturedArticle(transformedData[randomIndex]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [language, currentPage, itemsPerPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const getPageNumbers = () => {
    let pages = [];
    const maxPagesToShow = 5;

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

  return (
    <div className="min-h-screen bg-capsule-bg">
      <Navbar backgroundColor="bg-capsule-paper" />

      <main>
        <section
          className="relative bg-capsule-paper flex flex-col justify-center"
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
                      <Music />
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
                  src="/images/music.jpg"
                  alt="Traditional music scene"
                  className="rounded-xl shadow-capsule"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Explore Rhythms */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-3 gap-6">
              {loading
                ? Array(itemsPerPage)
                    .fill(0)
                    .map((_, index) => <CollectionCardSkeleton key={index} />)
                : musicData.map((item, index) => (
                    <CollectionCard
                      key={`${item.title}-${index}`}
                      title={item.title}
                      category={item.category}
                      contributor={item.contributor}
                      date={item.date}
                      imageSrc={item.imageSrc}
                      href={item.href}
                      className="animate-fade-in opacity-0"
                      index={index}
                      likes={item.noOfLikes}
                      dislikes={item.noOfDislikes}
                      hasImages={item.hasImages}
                    />
                  ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg bg-red-300 flex items-center justify-center ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-capsule-text hover:bg-capsule-sand hover:text-white"
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        typeof page === "number" && handlePageChange(page)
                      }
                      disabled={page === "..."}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                        page === currentPage
                          ? "bg-capsule-sand text-white"
                          : page === "..."
                          ? "text-capsule-text cursor-default"
                          : "text-capsule-text hover:bg-capsule-sand/10"
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
                        : "text-capsule-text hover:bg-capsule-sand hover:text-white"
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
            <div className="text-center text-capsule-text/60 text-sm mt-4">
              {t("showing")}{" "}
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} {t("of")}{" "}
              {totalItems} {t("items")}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="py-20 bg-capsule-paper relative">
            <div className="capsule-container">
              <div className="bg-white rounded-2xl shadow-capsule overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
                      {t("music_sectiontwo_pill")}
                    </div>
                    <h3 className="text-2xl text-black lg:text-3xl font-serif font-semibold mb-4">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-capsule-text/80 leading-relaxed mb-6 line-clamp-6">
                      {featuredArticle.content}
                    </p>
                    <div className="mt-6">
                      <Link
                        to={featuredArticle.href}
                        className="inline-flex items-center gap-2 bg-capsule-accent text-white px-6 py-3 rounded-lg hover:bg-capsule-accent/90 transition-colors"
                      >
                        <span>{t("music_sectiontwo_button")}</span>
                        <ArrowRight />
                      </Link>
                    </div>
                  </div>
                  <div className="relative h-64 lg:h-auto">
                    {featuredArticle.hasImages ? (
                      <AnimatedImage
                        src={featuredArticle.imageSrc}
                        alt={featuredArticle.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <NoImagePlaceholder1 title={featuredArticle.title} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MusicPage;
