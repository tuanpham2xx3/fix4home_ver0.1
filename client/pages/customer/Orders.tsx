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
import Layout from "@/components/shared/Layout";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Star,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CustomerOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "ORD-001",
      service: "AC Repair",
      technician: "John Smith",
      status: "completed",
      date: "2024-01-15",
      completedDate: "2024-01-15",
      amount: "$120",
      rating: 5,
      address: "123 Main St, Apt 4B",
      description: "AC unit not cooling properly, needs diagnostic and repair",
    },
    {
      id: "ORD-002",
      service: "Plumbing Fix",
      technician: "Mike Johnson",
      status: "in-progress",
      date: "2024-01-20",
      amount: "$85",
      address: "123 Main St, Apt 4B",
      description: "Kitchen sink leak repair",
    },
    {
      id: "ORD-003",
      service: "Electrical Inspection",
      technician: "Sarah Wilson",
      status: "scheduled",
      date: "2024-01-25",
      amount: "$95",
      address: "123 Main St, Apt 4B",
      description: "Annual electrical safety inspection",
    },
    {
      id: "ORD-004",
      service: "Appliance Repair",
      technician: "David Brown",
      status: "cancelled",
      date: "2024-01-10",
      amount: "$75",
      address: "123 Main St, Apt 4B",
      description: "Washing machine repair - customer cancelled",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "scheduled":
        return <Calendar className="w-4 h-4 text-orange-600" />;
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "scheduled":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Layout
      breadcrumbs={[
        { label: "Customer Dashboard", href: "/customer/dashboard" },
        { label: "Orders" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Orders
            </h1>
            <p className="text-muted-foreground">
              Track and manage your service orders
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders by service, technician, or order ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No orders found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "You haven't placed any orders yet"}
                  </p>
                  <Button asChild>
                    <Link to="/services">Browse Services</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(order.status)}
                          <h3 className="text-lg font-semibold">
                            {order.service}
                          </h3>
                          <Badge
                            variant="outline"
                            className={getStatusColor(order.status)}
                          >
                            {order.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Order ID:</span>
                            <span>{order.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Technician:</span>
                            <span>{order.technician}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{order.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Scheduled: {order.date}</span>
                          </div>
                          {order.completedDate && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              <span>Completed: {order.completedDate}</span>
                            </div>
                          )}
                          <p className="mt-2">{order.description}</p>
                        </div>

                        {order.rating && (
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-sm font-medium">
                              Your Rating:
                            </span>
                            <div className="flex">
                              {renderStars(order.rating)}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col lg:items-end gap-3">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            {order.amount}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/customer/orders/${order.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </Button>

                          {order.status === "in-progress" && (
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Chat
                            </Button>
                          )}

                          {order.status === "completed" && !order.rating && (
                            <Button variant="outline" size="sm">
                              <Star className="w-4 h-4 mr-2" />
                              Rate Service
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
