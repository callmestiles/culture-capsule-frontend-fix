import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/axios"; // axios instance with refresh interceptor
import refreshToken from "@/api/tokenService";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await api.get("/user/profile");
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
      console.error("Failed to fetch user:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      const res = await api.post("/auth/login", { email, password });
      const { accessToken } = res.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      await fetchUser(); // Refresh user after login
      setupTokenRefresh(); // Setup token refresh schedule
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      await login(email, password); // Auto-login after signup
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("accessToken");

      // Clear token refresh interval
      if (window.tokenRefreshInterval) {
        clearInterval(window.tokenRefreshInterval);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
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
