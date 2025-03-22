import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import FeaturedCollections from "@/components/FeaturedCollections";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Index: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Add fade-in animation to elements with animate-fade-in class
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-fade-in");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-capsule-bg">
      <Navbar />
      <Hero />
      <CategorySection />
      <FeaturedCollections />

      <section id="contribute" className="py-20 bg-capsule-paper relative">
        <div className="absolute inset-0 opacity-[0.04] bg-noise-pattern mix-blend-multiply" />

        <div className="capsule-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-capsule-sand rounded-full text-sm font-medium mb-4 animate-fade-in opacity-0">
              {t("join_mission")}
            </div>

            <h2
              className="text-3xl text-black sm:text-4xl font-serif font-semibold mb-6 animate-fade-in opacity-0"
              style={{ animationDelay: "0.1s" }}
            >
              {t("help_preserve")}
            </h2>

            <p
              className="text-lg text-black text-capsule-text/80 mb-8 animate-fade-in opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              {t("contributions_matter")}
            </p>

            <Link
              to="/contribute"
              className="px-6 py-3 bg-capsule-accent hover:bg-capsule-accent/90 text-white rounded-md font-medium transition-all transform hover:translate-y-[-2px] hover:shadow-md inline-block animate-fade-in opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              {t("start_contributing")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
