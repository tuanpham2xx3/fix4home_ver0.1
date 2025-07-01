import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldX, Home, ArrowLeft, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import Layout from "@/components/shared/Layout";

interface AccessDeniedProps {
  userRole: UserRole;
  requiredRoles: UserRole[];
}

export default function AccessDenied({
  userRole,
  requiredRoles,
}: AccessDeniedProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
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

  const formatRoles = (roles: UserRole[]): string => {
    if (roles.length === 1) {
      return roles[0];
    }
    if (roles.length === 2) {
      return `${roles[0]} or ${roles[1]}`;
    }
    return `${roles.slice(0, -1).join(", ")}, or ${roles[roles.length - 1]}`;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="shadow-xl border-red-200 dark:border-red-800">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldX className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-800 dark:text-red-200">
                Access Denied
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert variant="destructive">
                <ShieldX className="h-4 w-4" />
                <AlertDescription>
                  <strong>403 - Forbidden</strong>
                  <br />
                  You don't have permission to access this page.
                </AlertDescription>
              </Alert>

              <div className="space-y-3 text-center">
                <p className="text-muted-foreground">
                  This page requires{" "}
                  <strong>{formatRoles(requiredRoles)}</strong> access level.
                </p>
                <p className="text-sm text-muted-foreground">
                  You are currently logged in as:{" "}
                  <strong className="text-foreground">{userRole}</strong>
                </p>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full" variant="default">
                  <Link to={getDashboardRoute(userRole)}>
                    <Home className="w-4 h-4 mr-2" />
                    Go to My Dashboard
                  </Link>
                </Button>

                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>

                <Button
                  onClick={() => logout()}
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout & Switch Account
                </Button>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  If you believe this is an error, please contact support.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
