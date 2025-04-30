import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

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
import EventDetailsPage from "./pages/eventDetails";
import ProfilePage from "./pages/profile";
import Music from "./pages/music";
import PoemPage from "./pages/poem";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/history" element={<History />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/arts" element={<Arts />} />
              <Route path="/folklore" element={<Folklore />} />
              <Route path="/music" element={<Music />} />
              <Route path="/poems" element={<PoemPage />} />
              <Route path="/featured" element={<Featured />} />
              <Route path="/capsule/:id" element={<CapsuleDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/contribute" element={<Contribute />} />
              {/* <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} /> */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
