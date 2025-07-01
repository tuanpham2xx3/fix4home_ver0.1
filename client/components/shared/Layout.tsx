import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Wrench,
  Settings,
  ShoppingCart,
  FileText,
} from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface LayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function Layout({ children, breadcrumbs }: LayoutProps) {
  const { userRole } = useAuth();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const adminSidebarItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/users", label: "Users", icon: Users },
    { path: "/admin/technicians", label: "Technicians", icon: Wrench },
    { path: "/admin/services", label: "Services", icon: Settings },
    { path: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { path: "/admin/reports", label: "Reports", icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Show sidebar only for admin users on admin pages
  const showSidebar = userRole === "admin" && isAdminPage;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}

      <div className={cn("flex", showSidebar && "ml-64")}>
        {/* Admin Sidebar */}
        {showSidebar && (
          <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-border pt-20 z-40">
            <div className="p-4">
              <nav className="space-y-2">
                {adminSidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive(item.path)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
