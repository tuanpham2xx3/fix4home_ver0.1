import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/shared/Layout";
import {
  Users,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Wrench,
  User,
  Shield,
} from "lucide-react";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const users = [
    {
      id: "USR-001",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 123-4567",
      role: "customer",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-25",
      ordersCount: 12,
      totalSpent: "$1,240",
      address: "123 Main St, City, State",
    },
    {
      id: "USR-002",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 234-5678",
      role: "technician",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2024-01-25",
      jobsCompleted: 47,
      rating: 4.9,
      specialties: ["Electrical", "HVAC"],
      address: "456 Oak Ave, City, State",
    },
    {
      id: "USR-003",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phone: "+1 (555) 345-6789",
      role: "technician",
      status: "active",
      joinDate: "2024-01-05",
      lastActive: "2024-01-24",
      jobsCompleted: 42,
      rating: 4.8,
      specialties: ["Plumbing", "General"],
      address: "789 Pine Road, City, State",
    },
    {
      id: "USR-004",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: "+1 (555) 456-7890",
      role: "customer",
      status: "inactive",
      joinDate: "2024-01-20",
      lastActive: "2024-01-22",
      ordersCount: 3,
      totalSpent: "$280",
      address: "321 Elm Street, City, State",
    },
    {
      id: "USR-005",
      name: "Admin User",
      email: "admin@fix4home.com",
      phone: "+1 (555) 567-8901",
      role: "admin",
      status: "active",
      joinDate: "2023-01-01",
      lastActive: "2024-01-25",
      permissions: ["manage_users", "view_analytics", "system_settings"],
      address: "FIX4HOME HQ, City, State",
    },
  ];

  const getStatusIcon = (status: string) => {
    return status === "active" ? (
      <UserCheck className="w-4 h-4 text-green-600" />
    ) : (
      <UserX className="w-4 h-4 text-red-600" />
    );
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4 text-purple-600" />;
      case "technician":
        return <Wrench className="w-4 h-4 text-blue-600" />;
      case "customer":
        return <User className="w-4 h-4 text-green-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
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

  const filterUsersByTab = (users: any[], tab: string) => {
    switch (tab) {
      case "customers":
        return users.filter((user) => user.role === "customer");
      case "technicians":
        return users.filter((user) => user.role === "technician");
      case "admins":
        return users.filter((user) => user.role === "admin");
      default:
        return users;
    }
  };

  const filteredUsers = filterUsersByTab(users, activeTab).filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Layout
      breadcrumbs={[
        { label: "Admin Dashboard", href: "/admin/dashboard" },
        { label: "Users" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage customers, technicians, and administrators
            </p>
          </div>

          {/* User Type Tabs */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">
                    All Users ({users.length})
                  </TabsTrigger>
                  <TabsTrigger value="customers">
                    Customers (
                    {users.filter((u) => u.role === "customer").length})
                  </TabsTrigger>
                  <TabsTrigger value="technicians">
                    Technicians (
                    {users.filter((u) => u.role === "technician").length})
                  </TabsTrigger>
                  <TabsTrigger value="admins">
                    Admins ({users.filter((u) => u.role === "admin").length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users by name, email, or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="technician">Technician</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Users ({filteredUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No users found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                {getRoleIcon(user.role)}
                              </div>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {user.email}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  ID: {user.id}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getRoleColor(user.role)}
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(user.status)}
                              <Badge
                                variant="outline"
                                className={getStatusColor(user.status)}
                              >
                                {user.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            {user.role === "customer" && (
                              <div className="text-sm">
                                <p className="font-medium">
                                  {user.ordersCount} orders
                                </p>
                                <p className="text-muted-foreground">
                                  {user.totalSpent} spent
                                </p>
                              </div>
                            )}
                            {user.role === "technician" && (
                              <div className="text-sm">
                                <div className="flex items-center gap-1 mb-1">
                                  <div className="flex">
                                    {renderStars(user.rating)}
                                  </div>
                                  <span className="text-xs">{user.rating}</span>
                                </div>
                                <p className="font-medium">
                                  {user.jobsCompleted} jobs
                                </p>
                                <p className="text-muted-foreground">
                                  {user.specialties?.join(", ")}
                                </p>
                              </div>
                            )}
                            {user.role === "admin" && (
                              <div className="text-sm">
                                <p className="font-medium">Admin Access</p>
                                <p className="text-muted-foreground">
                                  Full permissions
                                </p>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{user.lastActive}</p>
                              <p className="text-muted-foreground">
                                Joined {user.joinDate}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      User Details - {user.name}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <strong>Contact:</strong>
                                        <p>{user.email}</p>
                                        <p>{user.phone}</p>
                                      </div>
                                      <div>
                                        <strong>Address:</strong>
                                        <p>{user.address}</p>
                                      </div>
                                    </div>
                                    {user.role === "technician" && (
                                      <div>
                                        <strong>Specialties:</strong>
                                        <div className="flex gap-2 mt-1">
                                          {user.specialties?.map(
                                            (specialty, index) => (
                                              <Badge
                                                key={index}
                                                variant="secondary"
                                              >
                                                {specialty}
                                              </Badge>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
