// contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import api from "@/api/axios";
import refreshToken from "@/api/tokenService";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tokenRefreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAuthenticatedPage = !["login", "register", "forgot-password"].some(
    (path) => location.pathname.includes(path)
  );

  // Use for cleanup on unmount
  useEffect(() => {
    return () => {
      if (tokenRefreshIntervalRef.current) {
        clearInterval(tokenRefreshIntervalRef.current);
      }
    };
  }, []);

  const fetchUser = useCallback(async (skipLoadingState = false) => {
    if (!skipLoadingState) {
      setIsLoading(true);
    }

    try {
      // Only attempt to fetch user if we have a token
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setUser(null);
        return null;
      }

      const response = await api.get("/user/profile");
      const userData = response.data.user || response.data.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // Only clear user if we get a 401 - other errors might be temporary
      if (error.response?.status === 401) {
        setUser(null);
        localStorage.removeItem("accessToken");
      }
      return null;
    } finally {
      if (!skipLoadingState) {
        setIsLoading(false);
      }
    }
  }, []);

  // Set up token refresh on a schedule
  const setupTokenRefresh = useCallback(() => {
    // Clear any existing interval
    if (tokenRefreshIntervalRef.current) {
      clearInterval(tokenRefreshIntervalRef.current);
      tokenRefreshIntervalRef.current = null;
    }

    // Don't set up refresh if no token exists
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    // Set up new interval - refresh every 25 minutes (before 30 min expiry)
    tokenRefreshIntervalRef.current = setInterval(async () => {
      try {
        await refreshToken();
        console.log("Token refreshed proactively");
      } catch (error) {
        console.error("Failed to refresh token proactively:", error);

        // If refresh fails due to invalid token, clear user state
        if (error.response?.status === 401) {
          setUser(null);

          // Only redirect if on an authenticated page
          if (isAuthenticatedPage) {
            navigate("/login");
            toast({
              title: "Session expired",
              description: "Please log in again to continue.",
            });
          }
        }
      }
    }, 25 * 60 * 1000); // 25 minutes
  }, [navigate, toast, isAuthenticatedPage]);

  // Check auth status on mount and route changes
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");

      // Skip auth check for login/register pages
      if (!isAuthenticatedPage) {
        setIsLoading(false);
        return;
      }

      if (token) {
        try {
          await fetchUser();
          setupTokenRefresh();
        } catch (error) {
          console.error("Auth initialization error:", error);
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [fetchUser, setupTokenRefresh, isAuthenticatedPage]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.success) {
        const { accessToken } = response.data;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          await fetchUser(true); // Skip setting loading state again
          setupTokenRefresh();

          toast({
            title: "Login successful!",
            description: "You are now logged into your account.",
          });

          // Navigate to home or intended page
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Please try again later.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      if (response.data.success) {
        toast({
          title: "Registration successful!",
          description: "Logging in to your account.",
        });

        // Login with the new credentials
        await login(email, password);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Please try again later.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Try to logout on the server
      await api.post("/auth/logout").catch((err) => {
        // Ignore logout errors - we'll clear local state anyway
        console.log("Logout API error (continuing with local logout):", err);
      });
    } finally {
      // Clear local state regardless of server response
      localStorage.removeItem("accessToken");

      if (tokenRefreshIntervalRef.current) {
        clearInterval(tokenRefreshIntervalRef.current);
        tokenRefreshIntervalRef.current = null;
      }

      setUser(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// No need to modify window global - using local ref instead
