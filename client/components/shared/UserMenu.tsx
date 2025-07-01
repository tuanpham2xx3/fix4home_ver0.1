import { useState } from "react";
import {
  User,
  LogOut,
  Settings,
  Shield,
  Home,
  ClipboardList,
  UserCircle,
  Wrench,
  BarChart3,
  Users,
  X,
  Calendar,
  Star,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function UserMenu() {
  const { user, userRole, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (!user || !userRole) {
    return null;
  }

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

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
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300";
      case "technician":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300";
      case "customer":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getAvatarFallback = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getMenuItems = (role: string) => {
    const baseItems = [
      {
        icon: <Home className="w-4 h-4" />,
        label: "Dashboard",
        href: `/${role}/dashboard`,
      },
    ];

    switch (role) {
      case "customer":
        return [
          ...baseItems,
          {
            icon: <ClipboardList className="w-4 h-4" />,
            label: "My Orders",
            href: "/customer/orders",
          },
          {
            icon: <UserCircle className="w-4 h-4" />,
            label: "Profile",
            href: "/customer/profile",
          },
        ];
      case "technician":
        return [
          ...baseItems,
          {
            icon: <Wrench className="w-4 h-4" />,
            label: "My Jobs",
            href: "/technician/jobs",
          },
          {
            icon: <Calendar className="w-4 h-4" />,
            label: "Calendar",
            href: "/technician/calendar",
          },
          {
            icon: <BarChart3 className="w-4 h-4" />,
            label: "Statistics",
            href: "/technician/statistics",
          },
          {
            icon: <Star className="w-4 h-4" />,
            label: "Reviews",
            href: "/technician/reviews",
          },
          {
            icon: <UserCircle className="w-4 h-4" />,
            label: "Profile",
            href: "/technician/profile",
          },
        ];
      case "admin":
        return [
          ...baseItems,
          {
            icon: <Users className="w-4 h-4" />,
            label: "Manage Users",
            href: "/admin/users",
          },
          {
            icon: <BarChart3 className="w-4 h-4" />,
            label: "Analytics",
            href: "/admin/analytics",
          },
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems(userRole);

  return (
    <>
      {/* Avatar Button */}
      <Button
        variant="ghost"
        className="relative h-10 w-10 rounded-full hover:bg-accent/10 focus:bg-accent/10"
        onClick={() => setSidebarOpen(true)}
      >
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt={user.name}
          />
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            {getAvatarFallback(user.name)}
          </AvatarFallback>
        </Avatar>
      </Button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-background border-l shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt={user.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-lg">
                  {getAvatarFallback(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold truncate">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {user.email}
                </p>
                <Badge
                  variant="outline"
                  className={`text-xs mt-2 ${getRoleBadgeColor(userRole)}`}
                >
                  <span className="mr-1">{getRoleIcon(userRole)}</span>
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-sm rounded-lg hover:bg-accent/50 transition-colors group"
                >
                  <span className="text-muted-foreground group-hover:text-foreground">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Quick Actions for Technicians */}
            {userRole === "technician" && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 mb-3">
                  Quick Actions
                </p>
                <Link
                  to="/technician/jobs?filter=pending"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-sm rounded-lg hover:bg-accent/50 transition-colors group"
                >
                  <span className="text-muted-foreground group-hover:text-foreground">
                    <ClipboardList className="w-4 h-4" />
                  </span>
                  <span className="font-medium">Browse Available Jobs</span>
                </Link>
                <Link
                  to="/technician/calendar"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-sm rounded-lg hover:bg-accent/50 transition-colors group"
                >
                  <span className="text-muted-foreground group-hover:text-foreground">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <span className="font-medium">Today's Schedule</span>
                </Link>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t">
            <Button
              onClick={() => {
                logout();
                setSidebarOpen(false);
              }}
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
