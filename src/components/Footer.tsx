
import React from 'react';
import { Heart, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'Categories', href: '#categories' },
        { name: 'Recent Additions', href: '#explore' },
        { name: 'Featured Stories', href: '#stories' },
        { name: 'Community', href: '#community' },
      ]
    },
    {
      title: 'Contribute',
      links: [
        { name: 'Submit Content', href: '#submit' },
        { name: 'Become a Volunteer', href: '#volunteer' },
        { name: 'Donation', href: '#donate' },
        { name: 'Partner With Us', href: '#partner' },
      ]
    },
    {
      title: 'About',
      links: [
        { name: 'Our Mission', href: '#mission' },
        { name: 'The Team', href: '#team' },
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
      ]
    },
  ];

  return (
    <footer className="bg-capsule-paper py-16 relative">
      <div className="absolute inset-0 opacity-[0.04] bg-noise-pattern mix-blend-multiply" />
      
      <div className="capsule-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 relative rounded-full bg-capsule-accent flex items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-capsule-accent to-capsule-terracotta" />
                <span className="font-bold text-xl relative z-10">C</span>
              </div>
              <span className="font-serif text-xl font-semibold text-capsule-text tracking-tight">
                CultureCapsule
              </span>
            </div>
            
            <p className="text-sm text-capsule-text/80 mb-6 max-w-xs">
              Preserving North Cyprus's rich cultural heritage through community-driven documentation and archiving.
            </p>
            
            <div className="flex items-center gap-4">
              <a 
                href="#instagram" 
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-capsule-accent hover:text-white hover:bg-capsule-accent transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#twitter" 
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-capsule-accent hover:text-white hover:bg-capsule-accent transition-colors shadow-sm"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#facebook" 
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-capsule-accent hover:text-white hover:bg-capsule-accent transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="mailto:info@culturecapsule.org" 
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-capsule-accent hover:text-white hover:bg-capsule-accent transition-colors shadow-sm"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-capsule-text mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-sm text-capsule-text/70 hover:text-capsule-accent transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-6 border-t border-capsule-sand flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-capsule-text/60">
            © {currentYear} CultureCapsule. All rights reserved.
          </p>
          
          <p className="text-xs text-capsule-text/60 flex items-center">
            Made with 
            <Heart size={12} className="mx-1 text-capsule-accent" /> 
            for the people of North Cyprus
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
