import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, LogIn, ChevronDown, ChevronUp, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

interface NavbarProps {
  backgroundColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({ backgroundColor }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const categoriesRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Auth context hooks
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // Track previous auth state for smoother transitions
  const [prevAuthState, setPrevAuthState] = useState(isAuthenticated);
  const [isAuthTransitioning, setIsAuthTransitioning] = useState(false);

  // Handle authentication state changes
  useEffect(() => {
    if (prevAuthState !== isAuthenticated && !isLoading) {
      setIsAuthTransitioning(true);
      const timer = setTimeout(() => {
        setIsAuthTransitioning(false);
        setPrevAuthState(isAuthenticated);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, prevAuthState]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setCategoriesOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[aria-label="Menu"]')
      ) {
        setMobileMenuOpen(false);
        document.body.style.overflow = "auto";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
    setMobileCategoriesOpen(false);
    document.body.style.overflow = "auto";
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? "hidden" : "auto";
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("good_morning");
    if (hour < 18) return t("good_afternoon");
    return t("good_evening");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    { name: t("home"), href: "/" },
    {
      name: t("categories"),
      href: "#",
      isDropdown: true,
      children: [
        { name: t("all_categories"), href: "/posts" },
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
    ...(isAuthenticated ? [{ name: t("profile"), href: "/profile" }] : []),
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
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

  // Animation variants
  const authAnimationVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
  };

  return (
    <header
      className={cn(
        `${backgroundColor} z-50 h-20 px-4 sm:px-6 border-b-[1.5px] border-b-secondary flex items-center transition-colors duration-75`,
        isScrolled &&
          "fixed top-0 left-0 right-0 bg-capsule-paper backdrop-blur-md shadow-md border-b-white"
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo and brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex items-center justify-center text-white overflow-hidden group">
            <img
              src="/images/logo-black.png"
              alt="Culture Capsule"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-black">
            Culture Capsule
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Auth and Language Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitcher />

          {/* Desktop Auth Controls */}
          <div className="hidden md:block min-w-[150px] h-10">
            {isLoading ? (
              <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <AnimatePresence mode="wait">
                {isAuthenticated ? (
                  <motion.div
                    key="authenticated"
                    className="flex items-center gap-2"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={authAnimationVariants}
                  >
                    <div className="flex items-center gap-8 text-sm">
                      <span>
                        {getGreeting()},{" "}
                        <Link
                          to="/profile"
                          className="hover:text-capsule-accent transition-colors"
                        >
                          {user?.username || t("user")}
                        </Link>
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="text-black hover:bg-capsule-sand"
                      >
                        {t("logout")}
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="unauthenticated"
                    className="flex items-center gap-4"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={authAnimationVariants}
                  >
                    <Link to="/login">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 text-black hover:bg-capsule-sand"
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
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full text-capsule-text hover:bg-capsule-paper transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-6 pb-8 px-6 md:hidden flex flex-col"
          >
            {/* Close Button - Fixed at top right */}
            <div className="flex justify-end mb-6">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} className="text-gray-700" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <nav className="flex flex-col gap-6">
                {navItems.map((item) =>
                  item.isDropdown ? (
                    <div
                      key={item.name}
                      className="border-b border-gray-200 pb-4"
                    >
                      <button
                        onClick={() =>
                          setMobileCategoriesOpen(!mobileCategoriesOpen)
                        }
                        className={cn(
                          "flex items-center justify-between w-full text-lg font-medium py-2",
                          isCategoryActive()
                            ? "text-capsule-accent font-bold"
                            : "text-gray-900"
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
                        <div className="mt-2 pl-4 border-l border-gray-200 space-y-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.href}
                              className={cn(
                                "block py-2 text-base transition-colors",
                                isActive(child.href)
                                  ? "text-capsule-accent font-medium"
                                  : "text-gray-700 hover:text-capsule-accent"
                              )}
                              onClick={toggleMobileMenu}
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
                        "text-lg font-medium py-3 border-b border-gray-200 transition-colors",
                        isActive(item.href)
                          ? "text-capsule-accent font-bold"
                          : "text-gray-900 hover:text-capsule-accent"
                      )}
                      onClick={toggleMobileMenu}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </nav>

              {/* Auth Section */}
              <div className="pt-8 mt-4 border-t border-gray-200">
                {isLoading ? (
                  <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <AnimatePresence mode="wait">
                    {isAuthenticated ? (
                      <motion.div
                        key="mobile-authenticated"
                        className="space-y-6"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={authAnimationVariants}
                      >
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-capsule-accent rounded-full flex items-center justify-center text-white">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {user?.username || t("user")}
                            </p>
                            <p className="text-sm text-gray-600">
                              {user?.email || t("user_email")}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full h-12 text-base hover:bg-capsule-accent hover:text-white"
                          onClick={() => {
                            handleLogout();
                            toggleMobileMenu();
                          }}
                        >
                          {t("logout")}
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="mobile-unauthenticated"
                        className="flex flex-col gap-4"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={authAnimationVariants}
                      >
                        <Link
                          to="/login"
                          className="w-full"
                          onClick={toggleMobileMenu}
                        >
                          <Button
                            variant="outline"
                            className="w-full h-12 text-base hover:bg-gray-100"
                          >
                            {t("login")}
                          </Button>
                        </Link>
                        <Link
                          to="/signup"
                          className="w-full"
                          onClick={toggleMobileMenu}
                        >
                          <Button className="w-full h-12 text-base bg-capsule-accent hover:bg-capsule-accent/90">
                            {t("signup")}
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
