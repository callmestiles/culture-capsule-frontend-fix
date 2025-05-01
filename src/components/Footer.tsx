import React from "react";
import { Heart, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: t("explore"),
      links: [
        { name: t("recentAdditions"), href: "/featured" },
        { name: t("events"), href: "/events" },
      ],
    },
    {
      title: t("categories"),
      links: [
        { name: t("art"), href: "/art" },
        { name: t("history"), href: "/history" },
        { name: t("food"), href: "/food" },
        { name: t("music"), href: "/music" },
        { name: t("poems"), href: "/traditions" },
        { name: t("folklore"), href: "/folklore" },
      ],
    },
    {
      title: t("contribute"),
      links: [{ name: t("submitContent"), href: "/contribute" }],
    },
  ];

  return (
    <footer className="bg-capsule-paper py-16 relative">
      <div className="absolute inset-0 opacity-[0.04] bg-noise-pattern mix-blend-multiply" />

      <div className="capsule-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="relative z-10 flex items-center gap-2">
              <div className="w-12 h-12 relative flex items-center justify-center text-white overflow-hidden group">
                <img
                  src="/images/logo-black.png"
                  alt="Culture Capsule"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-xl font-semibold tracking-tight">
                Culture Capsule
              </span>
            </Link>

            <p className="text-base text-center text-gray-700  max-w-sm">
              {t("brand_description")}
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-lg text-gray-700 mb-4">
                {column.title}
              </h3>
              {column.title === t("categories") ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {column.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="relative z-10 text-base text-gray-700 hover:text-capsule-accent transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="relative z-10 text-base text-gray-700 hover:text-capsule-accent transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
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
