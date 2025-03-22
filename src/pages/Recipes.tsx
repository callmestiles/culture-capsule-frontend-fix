import React from "react";
import { Utensils, Clock, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedImage from "@/components/AnimatedImage";
import CollectionCard from "@/components/CollectionCard";

const Recipes = () => {
  const localRecipes = [
    {
      title: "Traditional Hellim Cheese Making Process",
      category: "Local Recipes",
      contributor: "Ayşe Yılmaz",
      date: "Jun 15, 2023",
      imageSrc:
        "https://images.unsplash.com/photo-1505253716291-6997be06f64b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      href: "#recipe-1",
    },
    {
      title: "Authentic Şeftali Kebab",
      category: "Local Recipes",
      contributor: "Mehmet Özgür",
      date: "May 22, 2023",
      imageSrc:
        "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      href: "#recipe-2",
    },
    {
      title: "Homemade Molehiya Soup",
      category: "Local Recipes",
      contributor: "Elena Papadopoulos",
      date: "Apr 18, 2023",
      imageSrc:
        "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      href: "#recipe-3",
    },
    {
      title: "Traditional Pilavuna Pastries",
      category: "Local Recipes",
      contributor: "Maria Demetriou",
      date: "Mar 7, 2023",
      imageSrc:
        "https://images.unsplash.com/photo-1608835291093-394b0c943a75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      href: "#recipe-4",
    },
    {
      title: "Cypriot Mezze Platter",
      category: "Local Recipes",
      contributor: "Hasan Çelik",
      date: "Feb 12, 2023",
      imageSrc:
        "https://images.unsplash.com/photo-1543826173-1beeb97525d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      href: "#recipe-5",
    },
    {
      title: "Traditional Lokma Dessert",
      category: "Local Recipes",
      contributor: "Sophia Andreou",
      date: "Jan 5, 2023",
      imageSrc:
        "https://images.unsplash.com/photo-1567051183542-96707f287a07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      href: "#recipe-6",
    },
  ];

  return (
    <div className="min-h-screen bg-capsule-bg">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative bg-capsule-paper">
          <div className="absolute inset-0 opacity-[0.04] bg-noise-pattern mix-blend-multiply" />
          <div className="capsule-container">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 bg-capsule-sand rounded-full text-sm font-medium mb-4">
                  Culinary Heritage
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-capsule-text">
                  Flavors of North Cyprus
                </h1>
                <p className="text-capsule-text/80 leading-relaxed mb-6">
                  Discover the rich culinary traditions of North Cyprus through
                  authentic recipes, cooking techniques, and stories that have
                  been passed down through generations.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Utensils size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      Traditional Recipes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Clock size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      Preparation Time
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Users size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-black font-medium">
                      Serving Size
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <AnimatedImage
                  src="/images/food.jpg"
                  alt="Traditional North Cyprus cuisine"
                  className="rounded-xl shadow-capsule"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Recipe Collections */}
        <section className="py-20 bg-white relative">
          <div className="absolute inset-0 opacity-[0.02] bg-noise-pattern mix-blend-multiply" />

          <div className="capsule-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 bg-capsule-sand rounded-full text-sm font-medium mb-4">
                Explore Recipes
              </div>

              <h2 className="text-3xl text-black sm:text-4xl font-serif font-semibold mb-4">
                Traditional Culinary Treasures
              </h2>

              <p className="text-capsule-text/80 leading-relaxed">
                Explore our collection of authentic North Cyprus recipes,
                carefully documented and preserved by local chefs, families, and
                culinary enthusiasts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {localRecipes.map((recipe, index) => (
                <CollectionCard
                  key={recipe.title}
                  title={recipe.title}
                  category={recipe.category}
                  contributor={recipe.contributor}
                  date={recipe.date}
                  imageSrc={recipe.imageSrc}
                  href={recipe.href}
                  className="animate-fade-in opacity-0"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Recipe */}
        <section className="py-20 bg-capsule-paper relative">
          <div className="absolute inset-0 opacity-[0.04] bg-noise-pattern mix-blend-multiply" />

          <div className="capsule-container">
            <div className="bg-white rounded-2xl shadow-capsule overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 bg-capsule-sand rounded-full text-sm font-medium mb-4">
                    Featured Recipe
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-serif font-semibold mb-4">
                    Traditional Hellim Cheese: From Farm to Table
                  </h3>

                  <p className="text-capsule-text/80 leading-relaxed mb-6">
                    Hellim (Halloumi) cheese is one of the most iconic culinary
                    treasures of North Cyprus. This semi-hard, unripened, and
                    brined cheese made from a mixture of goat's and sheep's milk
                    has a high melting point, making it perfect for grilling or
                    frying.
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-capsule-sand rounded-lg p-4 text-center">
                      <p className="text-xs text-capsule-text/60 mb-1">
                        Prep Time
                      </p>
                      <p className="font-medium">2 hours</p>
                    </div>
                    <div className="bg-capsule-sand rounded-lg p-4 text-center">
                      <p className="text-xs text-capsule-text/60 mb-1">
                        Difficulty
                      </p>
                      <p className="font-medium">Moderate</p>
                    </div>
                    <div className="bg-capsule-sand rounded-lg p-4 text-center">
                      <p className="text-xs text-capsule-text/60 mb-1">
                        Origin
                      </p>
                      <p className="font-medium">Karpaz</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <a
                      href="#view-recipe"
                      className="inline-flex items-center gap-2 bg-capsule-accent text-white px-6 py-3 rounded-lg hover:bg-capsule-accent/90 transition-colors"
                    >
                      <span>View Full Recipe</span>
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
                    src="https://images.unsplash.com/photo-1505253716291-6997be06f64b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="Traditional Hellim cheese"
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

export default Recipes;
