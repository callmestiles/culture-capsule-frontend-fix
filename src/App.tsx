import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
// import { ThemeProvider } from "./contexts/ThemeContext";

import Index from "./pages/Index";
import History from "./pages/History";
import Recipes from "./pages/Recipes";
import Arts from "./pages/Arts";
import Folklore from "./pages/Folklore";
import Featured from "./pages/Featured";
import CapsuleDetail from "./pages/CapsuleDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Contribute from "./pages/Contribute";
import NotFound from "./pages/NotFound";
import EventsPage from "./pages/Events";
import ProfilePage from "./pages/profile";
import Music from "./pages/music";
import Privacy from "./pages/privacy";
import PoemPage from "./pages/poem";
import Terms from "./pages/Terms";
import { AuthProvider } from "./contexts/AuthContext";
import AllPage from "./pages/all";
import ScrollToTop from "./components/ScrollToTop";
import AboutPage from "./pages/about";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* <ThemeProvider> */}
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/history" element={<History />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/arts" element={<Arts />} />
              <Route path="/folklore" element={<Folklore />} />
              <Route path="/music" element={<Music />} />
              <Route path="/poems" element={<PoemPage />} />
              <Route path="/posts" element={<AllPage />} />
              <Route path="/featured" element={<Featured />} />
              <Route path="/capsule/:id" element={<CapsuleDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/contribute" element={<Contribute />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
      {/* </ThemeProvider> */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
