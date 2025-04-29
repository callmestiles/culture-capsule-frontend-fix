import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Search, User, LogIn } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import refreshToken from "@/api/refresh";
import axios from "axios";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // <-- Add loading state

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: t("history"), href: "/history" },
    { name: t("recipes"), href: "/recipes" },
    { name: t("arts"), href: "/arts" },
    { name: t("folklore"), href: "/folklore" },
    { name: t("contribute"), href: "/contribute" },
    { name: t("events"), href: "/events" },
  ];
  if (isAuthenticated) {
    navItems.push({ name: t("Profile"), href: "/profile" });
  }

  return (
    <header
      className={cn(
        "z-50 transition-all duration-300 h-20 px-6 border-b-[1.5px] border-b-secondary flex items-center",
        isScrolled &&
          "fixed top-0 left-0 right-0 bg-secondary/80 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 relative flex items-center justify-center text-white overflow-hidden group">
            <img
              src="/images/logo.png"
              alt="Culture Capsule"
              className="w-full h-full object-contain"
            />
          </div>
          <span
            className={`font-serif text-xl font-semibold tracking-tight ${
              isScrolled ? "text-white" : "text-black"
            }`}
          >
            Culture Capsule
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`subtle-link text-sm font-medium ${
                isScrolled ? "text-white" : "text-black"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher isScrolled={isScrolled} />

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <div
                className={`flex items-center gap-8 text-sm ${
                  isScrolled ? "text-white" : "text-black"
                }`}
              >
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
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-lg font-medium border-b border-capsule-sand pb-3 hover:text-capsule-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-6 mt-auto">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-2 bg-capsule-sand/50 rounded-md">
                  <div className="w-10 h-10 bg-capsule-accent rounded-full flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{"User"}</p>
                    <p className="text-xs text-capsule-text/70">
                      {/* {user?.email} */}User Email
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
