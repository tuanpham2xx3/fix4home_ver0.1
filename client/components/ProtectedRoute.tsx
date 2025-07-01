import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import AccessDenied from "./AccessDenied";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  requireAuth?: boolean;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but doesn't have the required role
  if (isAuthenticated && userRole && !allowedRoles.includes(userRole)) {
    return <AccessDenied userRole={userRole} requiredRoles={allowedRoles} />;
  }

  // User has proper access
  return <>{children}</>;
}
