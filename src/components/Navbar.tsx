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
  // const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const user = useRef(null);
  const isAuthenticated = useRef(false); // Use a ref to store authentication status

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    axios
      .get("https://culture-capsule-backend.onrender.com/api/auth/me", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log("User Profile:", response.data);
        user.current = response.data;
        isAuthenticated.current = true; // Update authentication status
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          refreshToken()
            .then(() => {
              // Retry the request after refreshing the token
              return axios.get(
                "https://culture-capsule-backend.onrender.com/api/auth/me",
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                }
              );
            })
            .then((response) => {
              console.log("User Profile after refresh:", response.data);
              user.current = response.data;
              isAuthenticated.current = true; // Update authentication status
            })
            .catch((refreshError) => {
              console.error("Error refreshing token:", refreshError);
              // Handle token refresh failure (e.g., redirect to login)
            });
        }
        console.error("Error fetching user profile:", error);
        // Handle error (e.g., show a toast notification)
      });

    console.log("User Profile:", user.current);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  const handleLogout = () => {
    // logout();
    navigate("/");
  };

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("history"), href: "/history" },
    { name: t("recipes"), href: "/recipes" },
    { name: t("arts"), href: "/arts" },
    { name: t("folklore"), href: "/folklore" },
    { name: t("contribute"), href: "/contribute" },
  ];
  const [delayedMount, setDelayedMount] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedMount(true);
    }, 1000); // 2 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (!delayedMount) {
    return <div> </div>; // or a spinner
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        isScrolled ? "bg-white/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 relative flex items-center justify-center text-white overflow-hidden group">
            <img
              src="/images/logo.png"
              alt="Culture Capsule"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-serif text-xl font-semibold text-capsule-text tracking-tight">
            Culture Capsule
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="subtle-link text-sm font-medium text-black"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full text-capsule-text hover:bg-capsule-paper transition-colors duration-200"
            aria-label={t("search")}
          >
            <Search size={20} />
          </button>

          <LanguageSwitcher />

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-capsule-text">
                <span>Hi, {user.current?.user.firstName}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  {t("logout")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
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
