import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wrench, Phone, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  const authLinks = [{ path: "/login", label: "Login" }];

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
