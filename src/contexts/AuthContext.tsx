import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/axios";
import refreshToken from "@/api/tokenService";
import { useNavigate } from "react-router-dom";
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await api.get("/user/profile");
      console.log("User profile response:", response.data);
      setUser(response.data.data);
    } catch (error) {
      setUser(null);
      console.error("Failed to fetch user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("User:", user);

  // Check and set up token refresh schedule
  useEffect(() => {
    // Function to check token and user session on mount
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        // Attempt to fetch user profile to validate session
        await fetchUser();

        // Set up token refresh schedule
        setupTokenRefresh();
      } else {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Cleanup function
    return () => {
      // Clear any token refresh intervals when component unmounts
      if (window.tokenRefreshInterval) {
        clearInterval(window.tokenRefreshInterval);
      }
    };
  }, []);

  // Set up token refresh on a schedule (every 25 minutes to be safe)
  const setupTokenRefresh = () => {
    // Clear any existing interval
    if (window.tokenRefreshInterval) {
      clearInterval(window.tokenRefreshInterval);
    }

    // Set up a new interval to refresh token every 25 minutes (before the 30 min expiry)
    window.tokenRefreshInterval = setInterval(async () => {
      try {
        await refreshToken();
        console.log("Token refreshed proactively");
      } catch (error) {
        console.error("Failed to refresh token proactively:", error);
      }
    }, 25 * 60 * 1000); // 25 minutes in milliseconds
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.success) {
        const { accessToken } = response.data;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }

        await fetchUser();
        setupTokenRefresh();
        toast({
          title: "Login successful!",
          description: "You are now logged into your account.",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Please try again later.",
      });
      throw error; // Re-throw to handle in component
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
        await login(email, password);
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("accessToken");

      // Clear token refresh interval
      if (window.tokenRefreshInterval) {
        clearInterval(window.tokenRefreshInterval);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
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

// Add token refresh interval to window type
declare global {
  interface Window {
    tokenRefreshInterval?: NodeJS.Timeout;
  }
}
