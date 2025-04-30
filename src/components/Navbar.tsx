import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, LogIn, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import refreshToken from "@/api/refresh";
import axios from "axios";
import { User } from "lucide-react";

interface NavbarProps {
  backgroundColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({ backgroundColor }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const getData = async () => {
      try {
        const response = await axios.get(
          "https://culture-capsule-backend.onrender.com/api/auth/me",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("User Profile:", response.data);
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response?.status === 401) {
          await refreshToken();
          await getData(); // Retry after token refresh
        } else {
          console.error("Error fetching user profile:", error);
        }
      } finally {
        setAuthLoading(false);
      }
    };

    getData();
    window.addEventListener("scroll", handleScroll);

    // Close categories dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
    // Close categories dropdown when route changes
    setCategoriesOpen(false);
    setMobileCategoriesOpen(false);
  }, [location.pathname]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("good_morning");
    if (hour < 18) return t("good_afternoon");
    return t("good_evening");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const handleLogout = () => {
    navigate("/");
  };

  const navItems = [
    { name: t("home"), href: "/" },
    {
      name: t("categories"),
      href: "#",
      isDropdown: true,
      children: [
        { name: t("historical_events_category"), href: "/history" },
        { name: t("local_recipes_category"), href: "/recipes" },
        { name: t("folklore_and_stories_category"), href: "/folklore" },
        { name: t("music_and_dance_category"), href: "/music" },
        { name: t("poems_category"), href: "/poems" },
        { name: t("arts_and_crafts_category"), href: "/arts" },
      ],
    },
    { name: t("featured"), href: "/featured" },
    { name: t("contribute"), href: "/contribute" },
    { name: t("events"), href: "/events" },
  ];

  if (isAuthenticated) {
    navItems.push({ name: t("profile"), href: "/profile" });
  }

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const isCategoryActive = () => {
    const categoryPaths = [
      "/history",
      "/recipes",
      "/folklore",
      "/music",
      "/poems",
      "/arts",
    ];
    return categoryPaths.some((path) => location.pathname.startsWith(path));
  };

  return (
    <header
      className={cn(
        `${backgroundColor} z-50 h-20 px-6 border-b-[1.5px] border-b-secondary flex items-center transition-colors duration-75`,
        isScrolled &&
          "fixed top-0 left-0 right-0 bg-capsule-paper backdrop-blur-md shadow-md border-b-white"
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-12 h-12 relative flex items-center justify-center text-white overflow-hidden group">
            <img
              src="/images/logo-black.png"
              alt="Culture Capsule"
              className="w-full h-full object-contain"
            />
          </div>
          <span
            className={`font-serif text-xl font-semibold tracking-tight text-black`}
          >
            Culture Capsule
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.isDropdown ? (
              <div key={item.name} className="relative" ref={categoriesRef}>
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium hover:text-capsule-accent",
                    isCategoryActive() && "text-capsule-accent font-bold"
                  )}
                >
                  {item.name}
                  {categoriesOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                {categoriesOpen && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 mt-2 min-w-48 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-capsule-sand/50 transition-colors",
                          isActive(child.href)
                            ? "bg-capsule-sand/30 text-capsule-accent font-medium"
                            : "text-black"
                        )}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "subtle-link text-sm font-medium text-black hover:text-capsule-accent relative",
                  isActive(item.href) && "text-capsule-accent font-bold"
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-capsule-accent rounded-full" />
                )}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <div className={`flex items-center gap-8 text-sm`}>
                <span>
                  <span>
                    {getGreeting()},{" "}
                    <a href="/profile">{user?.user?.firstName || t("user")}</a>
                  </span>
                </span>
                <Button
                  className="text-black"
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  {t("logout")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-black"
                >
                  <LogIn size={16} />
                  <span>{t("login")}</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="sm"
                  className="bg-capsule-accent hover:bg-capsule-accent/90"
                >
                  {t("signup")}
                </Button>
              </Link>
            </div>
          )}

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
          {navItems.map((item) =>
            item.isDropdown ? (
              <div
                key={item.name}
                className="border-b border-capsule-sand pb-3"
              >
                <button
                  onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                  className={cn(
                    "flex items-center justify-between w-full text-lg font-medium",
                    isCategoryActive()
                      ? "text-capsule-accent font-bold"
                      : "text-black"
                  )}
                >
                  <span>{item.name}</span>
                  {mobileCategoriesOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {mobileCategoriesOpen && (
                  <div className="mt-3 pl-4 border-l border-capsule-sand/50 space-y-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className={cn(
                          "block text-base transition-colors",
                          isActive(child.href)
                            ? "text-capsule-accent font-medium"
                            : "text-black hover:text-capsule-accent/70"
                        )}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-lg font-medium border-b border-capsule-sand pb-3 transition-colors",
                  isActive(item.href)
                    ? "text-capsule-accent font-bold"
                    : "text-black hover:text-capsule-accent"
                )}
              >
                {item.name}
              </Link>
            )
          )}

          <div className="pt-6 mt-auto">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-2 bg-capsule-sand/50 rounded-md">
                  <div className="w-10 h-10 bg-capsule-accent rounded-full flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="font-medium">
                      {user?.user?.firstName || "User"}
                    </p>
                    <p className="text-xs text-capsule-text/70">
                      {user?.user?.email || "User Email"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  {t("logout")}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    {t("login")}
                  </Button>
                </Link>
                <Link
                  to="/signup"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-capsule-accent hover:bg-capsule-accent/90">
                    {t("signup")}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
