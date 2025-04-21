import React, { createContext, useContext, useState, useEffect } from "react";

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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (using localStorage in this demo)
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (storedUser && isLoggedIn === "true") {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes - in a real app, this would validate credentials with a backend
      const mockUser = {
        id: "user-123",
        name: email.split("@")[0],
        email,
      };

      // Store user info (in a real app, you'd store a token)
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isLoggedIn", "true");

      setUser(mockUser);
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
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes - in a real app, this would create a user in the backend
      const mockUser = {
        id: "user-" + Math.floor(Math.random() * 1000),
        name,
        email,
      };

      // In a real app, you'd typically not auto-login after signup,
      // but for demo purposes we'll do that
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isLoggedIn", "true");

      setUser(mockUser);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear user data
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
    setUser(null);
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
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
