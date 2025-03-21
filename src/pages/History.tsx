
import React from "react";
import { Landmark, BookOpen, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedImage from "@/components/AnimatedImage";
import CollectionCard from "@/components/CollectionCard";

const History = () => {
  const historicalEvents = [
    {
      title: "The 1974 Turkish Intervention",
      category: "Historical Events",
      contributor: "Prof. Mehmet Kaplan",
      date: "Jun 23, 2023",
      imageSrc: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      href: "#event-1",
    },
    {
      title: "The British Colonial Era",
      category: "Historical Events",
      contributor: "Dr. Sophia Andreou",
      date: "May 15, 2023",
      imageSrc: "https://images.unsplash.com/photo-1559682468-a6bd8b843382?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      href: "#event-2",
    },
    {
      title: "The Ottoman Period",
      category: "Historical Events",
      contributor: "Ahmet Yılmaz",
      date: "Apr 10, 2023",
      imageSrc: "https://images.unsplash.com/photo-1630335528121-4163321542b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      href: "#event-3",
    },
    {
      title: "The Independence Movement",
      category: "Historical Events",
      contributor: "Elena Christodoulou",
      date: "Mar 5, 2023",
      imageSrc: "https://images.unsplash.com/photo-1603145733146-ae562a55031e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      href: "#event-4",
    },
    {
      title: "Ancient Civilizations of Cyprus",
      category: "Historical Events",
      contributor: "Prof. Hasan Çelik",
      date: "Feb 18, 2023",
      imageSrc: "https://images.unsplash.com/photo-1572952112965-cff7bb6f93fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      href: "#event-5",
    },
    {
      title: "The Venetian Rule",
      category: "Historical Events",
      contributor: "Maria Demetriou",
      date: "Jan 30, 2023",
      imageSrc: "https://images.unsplash.com/photo-1638113067847-eee9e6aadc4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      href: "#event-6",
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
                  Historical Archives
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-capsule-text">
                  Preserving Our Past, Enriching Our Future
                </h1>
                <p className="text-capsule-text/80 leading-relaxed mb-6">
                  Explore the rich historical tapestry of North Cyprus through our curated collection of events, milestones, and personal accounts that have shaped our cultural identity.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Landmark size={18} className="text-capsule-accent" />
                    </div>
                    <span className="text-sm font-medium">Key Events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <BookOpen size={18} className="text-capsule-accent" />
                    </div>
                    <span className="text-sm font-medium">Personal Accounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-capsule-sand">
                      <Clock size={18} className="text-capsule-accent" />
                    </div>
                    <span className="text-sm font-medium">Timeline</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <AnimatedImage 
                  src="https://images.unsplash.com/photo-1606988476330-57acee391295?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
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
              <div className="inline-block px-3 py-1 bg-capsule-sand rounded-full text-sm font-medium mb-4">
                Explore History
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">
                Key Historical Events
              </h2>
              
              <p className="text-capsule-text/80 leading-relaxed">
                Discover the pivotal moments that have shaped North Cyprus through the decades,
                from ancient times to modern day, curated by our community members.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {historicalEvents.map((event, index) => (
                <CollectionCard
                  key={event.title}
                  title={event.title}
                  category={event.category}
                  contributor={event.contributor}
                  date={event.date}
                  imageSrc={event.imageSrc}
                  href={event.href}
                  className="animate-fade-in opacity-0"
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
                  <div className="inline-block px-3 py-1 bg-capsule-sand rounded-full text-sm font-medium mb-4">
                    Featured Article
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-serif font-semibold mb-4">
                    The 1974 Turkish Intervention: A Turning Point in North Cyprus History
                  </h3>
                  
                  <p className="text-capsule-text/80 leading-relaxed mb-6">
                    The Turkish intervention of 1974, also known as the "Peace Operation" in Turkey,
                    marked a significant turning point in the history of Cyprus. Following years of
                    inter-communal tensions and a coup d'état backed by the Greek military junta,
                    Turkey intervened militarily, ultimately leading to the de facto division of the island.
                  </p>
                  
                  <p className="text-capsule-text/80 leading-relaxed mb-6">
                    This collection includes personal testimonies, historical documents, and photographs
                    documenting this critical period, offering multiple perspectives on events that
                    continue to shape the political landscape of Cyprus today.
                  </p>
                  
                  <div className="mt-6">
                    <a
                      href="#read-more"
                      className="inline-flex items-center gap-2 bg-capsule-accent text-white px-6 py-3 rounded-lg hover:bg-capsule-accent/90 transition-colors"
                    >
                      <span>Read Full Article</span>
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

export default History;
