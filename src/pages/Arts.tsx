
import React from "react";
import { Palette, Brush, Scissors } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedImage from "@/components/AnimatedImage";
import CollectionCard from "@/components/CollectionCard";

const Arts = () => {
  const artsCollection = [
    {
      title: "Leftkoniko Pottery: A Dying Artform",
      category: "Arts & Crafts",
      contributor: "Elena Christodoulou",
      date: "Jun 28, 2023",
      imageSrc: "https://images.unsplash.com/photo-1619065513237-828bf1956fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      href: "#arts-1",
    },
    {
      title: "Traditional Lefkara Lace Embroidery",
      category: "Arts & Crafts",
      contributor: "Sophia Andreou",
      date: "May 17, 2023",
      imageSrc: "https://images.unsplash.com/photo-1459789587767-50f9e4b05a67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
      href: "#arts-2",
    },
    {
      title: "Cypriot Folk Painting Techniques",
      category: "Arts & Crafts",
      contributor: "Mehmet Özgür",
      date: "Apr 21, 2023",
      imageSrc: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      href: "#arts-3",
    },
    {
      title: "Basket Weaving from Karpaz Region",
      category: "Arts & Crafts",
      contributor: "Ayşe Yılmaz",
      date: "Mar 14, 2023",
      imageSrc: "https://images.unsplash.com/photo-1635767798638-3e7968993b43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      href: "#arts-4",
    },
    {
      title: "Traditional Carpet Making in Güzelyurt",
      category: "Arts & Crafts",
      contributor: "Hasan Çelik",
      date: "Feb 9, 2023",
      imageSrc: "https://images.unsplash.com/photo-1600045311943-64245394fc84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      href: "#arts-5",
    },
    {
      title: "Cypriot Woodcarving Traditions",
      category: "Arts & Crafts",
      contributor: "Maria Demetriou",
      date: "Jan 23, 2023",
      imageSrc: "https://images.unsplash.com/photo-1605116367194-ba30dbc63fe2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      href: "#arts-6",
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
                  Artistic Heritage
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-capsule-text">
                  Traditional Arts & Crafts
                </h1>
                <p className="text-capsule-text/80 leading-relaxed mb-6">
                  Discover the intricate artistry and craftsmanship that has defined North Cyprus's cultural identity for generations, from pottery and textiles to woodworking and more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Palette size={18} className="text-capsule-accent" />
                    </div>
                    <span className="text-sm font-medium">Visual Arts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Brush size={18} className="text-capsule-accent" />
                    </div>
                    <span className="text-sm font-medium">Craftsmanship</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Scissors size={18} className="text-capsule-accent" />
                    </div>
                    <span className="text-sm font-medium">Textile Arts</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <AnimatedImage 
                  src="https://images.unsplash.com/photo-1596455681373-931d0e1d1c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
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
              <div className="inline-block px-3 py-1 bg-capsule-sand rounded-full text-sm font-medium mb-4">
                Explore Arts
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">
                Handcrafted Traditions
              </h2>
              
              <p className="text-capsule-text/80 leading-relaxed">
                Explore our collection of traditional arts and crafts from across North Cyprus,
                documented and preserved by local artisans and cultural enthusiasts.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artsCollection.map((art, index) => (
                <CollectionCard
                  key={art.title}
                  title={art.title}
                  category={art.category}
                  contributor={art.contributor}
                  date={art.date}
                  imageSrc={art.imageSrc}
                  href={art.href}
                  className="animate-fade-in opacity-0"
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
                  <div className="inline-block px-3 py-1 bg-capsule-sand rounded-full text-sm font-medium mb-4">
                    Featured Art
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-serif font-semibold mb-4">
                    Leftkoniko Pottery: A Dying Artform
                  </h3>
                  
                  <p className="text-capsule-text/80 leading-relaxed mb-6">
                    Leftkoniko pottery is one of North Cyprus's most distinctive craft traditions,
                    characterized by its earthy red clay and geometric patterns that tell stories of
                    village life, nature, and mythology. This ancient craft has been passed down through
                    generations, with techniques dating back to the Bronze Age.
                  </p>
                  
                  <p className="text-capsule-text/80 leading-relaxed mb-6">
                    Today, only a handful of master potters remain who practice this traditional craft.
                    This collection documents their techniques, stories, and finished works to ensure
                    this cultural treasure is preserved for future generations.
                  </p>
                  
                  <div className="mt-4">
                    <a
                      href="#view-collection"
                      className="inline-flex items-center gap-2 bg-capsule-accent text-white px-6 py-3 rounded-lg hover:bg-capsule-accent/90 transition-colors"
                    >
                      <span>View Collection</span>
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
