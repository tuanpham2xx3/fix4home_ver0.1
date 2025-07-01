import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "customer" | "technician" | "admin";

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("userRole");

    if (storedUser && storedRole) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserRole(storedRole as UserRole);
      } catch (error) {
        // Clear invalid stored data
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    role: UserRole,
  ): Promise<void> => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For development, create a mock user based on the selected role
      const mockUser: User = {
        id: `${role}-${Date.now()}`,
        email,
        role,
        name:
          role === "admin"
            ? "Admin User"
            : role === "technician"
              ? "John Technician"
              : "Jane Customer",
      };

      // Store user data
      setUser(mockUser);
      setUserRole(role);
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("userRole", role);

      // Redirect to appropriate dashboard
      const dashboardRoute = getDashboardRoute(role);
      navigate(dashboardRoute);
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const getDashboardRoute = (role: UserRole): string => {
    switch (role) {
      case "customer":
        return "/customer/dashboard";
      case "technician":
        return "/technician/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  const value: AuthContextType = {
    user,
    userRole,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
