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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function UserMenu() {
  const { user, userRole, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || !userRole) {
    return null;
  }

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-accent/10 focus:bg-accent/10"
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 md:w-72" align="end" sideOffset={8}>
        {/* User Info Header */}
        <div className="flex items-center space-x-3 p-3">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
            />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
              {getAvatarFallback(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
            <Badge
              variant="outline"
              className={`text-xs mt-1 ${getRoleBadgeColor(userRole)}`}
            >
              <span className="mr-1">{getRoleIcon(userRole)}</span>
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Navigation Items */}
        <div className="py-1">
          {menuItems.map((item, index) => (
            <DropdownMenuItem key={index} asChild className="cursor-pointer">
              <Link
                to={item.href}
                className="flex items-center space-x-3 px-3 py-2 text-sm"
              >
                <span className="text-muted-foreground">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* Logout */}
        <div className="py-1">
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-3" />
            <span>Logout</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
