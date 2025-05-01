import { useState, useEffect } from "react";
import {
  Landmark,
  BookOpen,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedImage from "@/components/AnimatedImage";
import CollectionCard from "@/components/CollectionCard";
import { useLanguage } from "@/contexts/LanguageContext";
import axios from "axios";
import { NoImagePlaceholder1 } from "@/components/ImagePlaceholders";
import { Link } from "react-router-dom";
import CollectionCardSkeleton from "@/components/CollectionCardSkeleton";

const History = () => {
  const { t, language } = useLanguage();
  const [historicalData, setHistoricalData] = useState([]);
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
          `https://culture-capsule-backend.onrender.com/api/posts/category/Historical%20Events?language=${language}&page=${currentPage}&limit=${itemsPerPage}`
        );
        console.log("Data fetched:", response.data);

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

          setHistoricalData(transformedData);

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
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    let pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page, last page, current page, and pages around current page
      let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
      const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

      // Adjust startPage if endPage is maxed out
      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (startPage > 1) {
        pages = [1, "...", ...pages.slice(2)];
      }

      if (endPage < totalPages) {
        pages = [...pages.slice(0, -2), "...", totalPages];
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-capsule-bg">
      <Navbar backgroundColor="bg-capsule-paper" />

      <main>
        <section
          className="relative bg-capsule-paper flex flex-col justify-center py-20"
          style={{ minHeight: "calc(100vh - 5rem)" }}
        >
          <div className="absolute inset-0 opacity-[0.04] bg-noise-pattern mix-blend-multiply" />
          <div className="capsule-container">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4 ">
                  {t("historical_event_pill")}
                </div>
                <h1 className="text-5xl lg:text-6xl md:text-5xl font-serif font-semibold mb-4 text-capsule-text">
                  {t("historical_event_title")}
                </h1>
                <p className="text-capsule-text/80 leading-relaxed mb-6">
                  {t("historical_event_description")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Landmark size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      {t("history_icon_one")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <BookOpen size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      {t("history_icon_two")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Clock size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      {t("history_icon_three")}
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
                {t("history_sectionone_pill")}
              </div>

              <h2 className="text-3xl text-black sm:text-4xl font-serif font-semibold mb-4">
                {t("history_sectionone_title")}
              </h2>

              <p className="text-capsule-text/80 leading-relaxed">
                {t("history_sectionone_description")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-3 gap-6">
              {loading
                ? Array(itemsPerPage)
                    .fill(0)
                    .map((_, index) => <CollectionCardSkeleton key={index} />)
                : historicalData.map((event, index) => (
                    <CollectionCard
                      key={`${event.title}-${index}`}
                      title={event.title}
                      category={event.category}
                      contributor={event.contributor}
                      date={event.date}
                      imageSrc={event.imageSrc}
                      href={event.href}
                      className="animate-fade-in opacity-0"
                      index={index}
                      likes={event.noOfLikes}
                      dislikes={event.noOfDislikes}
                      hasImages={event.hasImages}
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
                    className={`p-2 z-10 rounded-lg flex items-center justify-center  ${
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
                    className={`p-2 z-10 rounded-lg flex items-center justify-center ${
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
                      {t("history_sectiontwo_pill")}
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
                        <span>{t("history_sectiontwo_button")}</span>
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

export default History;
