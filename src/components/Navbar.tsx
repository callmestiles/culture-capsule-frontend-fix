
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'History', href: '#history' },
    { name: 'Recipes', href: '#recipes' },
    { name: 'Arts', href: '#arts' },
    { name: 'Folklore', href: '#folklore' },
    { name: 'Contribute', href: '#contribute' },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        isScrolled 
          ? "bg-white/80 backdrop-blur-sm shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 relative rounded-full bg-capsule-accent flex items-center justify-center text-white overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-capsule-accent to-capsule-terracotta transition-transform duration-500 ease-in-out group-hover:scale-110" />
            <span className="font-bold text-xl relative z-10">C</span>
          </div>
          <span className="font-serif text-xl font-semibold text-capsule-text tracking-tight">
            CultureCapsule
          </span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="subtle-link text-sm font-medium"
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <button 
            className="p-2 rounded-full text-capsule-text hover:bg-capsule-paper transition-colors duration-200"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <button 
            className="md:hidden p-2 rounded-full text-capsule-text hover:bg-capsule-paper transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 pt-20 pb-6 px-6 transition-transform duration-300 ease-in-out md:hidden overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-lg font-medium border-b border-capsule-sand pb-3 hover:text-capsule-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
