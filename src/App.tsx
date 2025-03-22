
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/history" element={<History />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/arts" element={<Arts />} />
                <Route path="/folklore" element={<Folklore />} />
                <Route path="/featured" element={<Featured />} />
                <Route path="/capsule/:id" element={<CapsuleDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/contribute" element={<Contribute />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
