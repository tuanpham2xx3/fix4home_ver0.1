import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wrench,
  Phone,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Shield,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, userRole, user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === "/" || path === "/home") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname === path;
  };

  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  const legalLinks = [
    { path: "/privacy", label: "Privacy Policy" },
    { path: "/terms", label: "Terms of Use" },
  ];

  // Role-based navigation links
  const roleBasedLinks = {
    customer: [
      { path: "/customer/dashboard", label: "Dashboard" },
      { path: "/customer/orders", label: "My Orders" },
      { path: "/customer/profile", label: "Profile" },
    ],
    technician: [
      { path: "/technician/dashboard", label: "Dashboard" },
      { path: "/technician/jobs", label: "My Jobs" },
      { path: "/technician/profile", label: "Profile" },
    ],
    admin: [
      { path: "/admin/dashboard", label: "Admin Dashboard" },
      { path: "/admin/users", label: "Manage Users" },
    ],
  };

  const authLinks = isAuthenticated ? [] : [{ path: "/login", label: "Login" }];

  const userLinks =
    isAuthenticated && userRole ? roleBasedLinks[userRole] || [] : [];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4" />;
      case "technician":
        return <Settings className="w-4 h-4" />;
      case "customer":
        return <User className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "technician":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "customer":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">FIX4HOME</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Main Navigation */}
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(link.path)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Role-based Links */}
            {userLinks.length > 0 && (
              <>
                <div className="h-6 w-px bg-border mx-2" />
                {userLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-medium transition-colors hover:text-primary ${
                      isActive(link.path)
                        ? "text-primary border-b-2 border-primary pb-1"
                        : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}

            {/* Legal Links */}
            <div className="h-6 w-px bg-border mx-2" />
            {legalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Auth Links */}
            <div className="h-6 w-px bg-border mx-2" />
            {authLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(link.path)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* User Menu */}
            {isAuthenticated && user && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    {getRoleIcon(userRole!)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getRoleBadgeColor(userRole!)}`}
                    >
                      {userRole}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Hotline Button */}
          <Button className="hidden lg:flex bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
            <Phone className="w-4 h-4 mr-2" />
            Hotline: 1900-1234
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              {/* User Info */}
              {isAuthenticated && user && (
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      {getRoleIcon(userRole!)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getRoleBadgeColor(userRole!)}`}
                      >
                        {userRole}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Navigation */}
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors hover:text-primary ${
                    isActive(link.path) ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Role-based Links */}
              {userLinks.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    {userRole} Dashboard
                  </div>
                  {userLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block py-1 font-medium transition-colors hover:text-primary ${
                        isActive(link.path) ? "text-primary" : "text-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Legal Links */}
              <div className="border-t pt-4 mt-4">
                <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Legal
                </div>
                {legalLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block py-1 text-sm font-medium transition-colors hover:text-primary ${
                      isActive(link.path)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Auth Links */}
              {authLinks.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  {authLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`font-medium transition-colors hover:text-primary ${
                        isActive(link.path) ? "text-primary" : "text-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Logout Button */}
              {isAuthenticated && (
                <div className="border-t pt-4 mt-4">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              )}

              {/* Mobile Hotline Button */}
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold w-full mt-4">
                <Phone className="w-4 h-4 mr-2" />
                Hotline: 1900-1234
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
