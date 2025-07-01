import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  Package,
  RefreshCcw,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Grid3X3,
  List,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  service: string;
  technician: {
    name: string;
    avatar: string;
    rating: number;
  };
  status: "pending" | "in-progress" | "completed" | "cancelled";
  date: string;
  completedDate?: string;
  amount: string;
  rating?: number;
  address: string;
  description: string;
  estimatedTime?: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function CustomerOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"list" | "table">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const itemsPerPage = 10;

  // Mock orders data - in real app this would come from API
  const allOrders: Order[] = [
    {
      id: "ORD-001",
      service: "AC Repair & Maintenance",
      technician: {
        name: "John Smith",
        avatar: "JS",
        rating: 4.9,
      },
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
      service: "Kitchen Plumbing Fix",
      technician: {
        name: "Mike Johnson",
        avatar: "MJ",
        rating: 4.7,
      },
      status: "in-progress",
      date: "2024-01-20",
      amount: "$85",
      address: "123 Main St, Apt 4B",
      description: "Kitchen sink leak repair",
      estimatedTime: "2 hours remaining",
    },
    {
      id: "ORD-003",
      service: "Electrical Safety Inspection",
      technician: {
        name: "Sarah Wilson",
        avatar: "SW",
        rating: 4.8,
      },
      status: "pending",
      date: "2024-01-25",
      amount: "$95",
      address: "123 Main St, Apt 4B",
      description: "Annual electrical safety inspection",
      estimatedTime: "Tomorrow at 2:00 PM",
    },
    {
      id: "ORD-004",
      service: "Washing Machine Repair",
      technician: {
        name: "David Brown",
        avatar: "DB",
        rating: 4.6,
      },
      status: "cancelled",
      date: "2024-01-10",
      amount: "$75",
      address: "123 Main St, Apt 4B",
      description: "Washing machine repair - customer cancelled",
    },
    {
      id: "ORD-005",
      service: "Bathroom Plumbing Installation",
      technician: {
        name: "Lisa Anderson",
        avatar: "LA",
        rating: 4.9,
      },
      status: "completed",
      date: "2024-01-08",
      completedDate: "2024-01-08",
      amount: "$220",
      rating: 4,
      address: "123 Main St, Apt 4B",
      description: "New bathroom sink and faucet installation",
    },
    {
      id: "ORD-006",
      service: "Ceiling Fan Installation",
      technician: {
        name: "Robert Kim",
        avatar: "RK",
        rating: 4.5,
      },
      status: "pending",
      date: "2024-01-30",
      amount: "$150",
      address: "123 Main St, Apt 4B",
      description: "Living room ceiling fan installation with light",
      estimatedTime: "Jan 30 at 10:00 AM",
    },
    {
      id: "ORD-007",
      service: "Kitchen Appliance Repair",
      technician: {
        name: "Maria Garcia",
        avatar: "MG",
        rating: 4.8,
      },
      status: "completed",
      date: "2024-01-05",
      completedDate: "2024-01-05",
      amount: "$95",
      rating: 5,
      address: "123 Main St, Apt 4B",
      description: "Dishwasher repair and maintenance",
    },
    {
      id: "ORD-008",
      service: "Home Security System Check",
      technician: {
        name: "Tom Wilson",
        avatar: "TW",
        rating: 4.7,
      },
      status: "in-progress",
      date: "2024-01-22",
      amount: "$65",
      address: "123 Main St, Apt 4B",
      description: "Annual security system inspection and battery replacement",
      estimatedTime: "1 hour remaining",
    },
  ];

  // Simulate loading
  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1200));
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [statusFilter, searchTerm, sortBy, sortOrder]);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Filter and sort orders
  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch =
      order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.technician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "date":
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case "service":
        aValue = a.service.toLowerCase();
        bValue = b.service.toLowerCase();
        break;
      case "technician":
        aValue = a.technician.name.toLowerCase();
        bValue = b.technician.name.toLowerCase();
        break;
      case "status":
        aValue = a.status;
        bValue = b.status;
        break;
      case "amount":
        aValue = parseFloat(a.amount.replace("$", ""));
        bValue = parseFloat(b.amount.replace("$", ""));
        break;
      default:
        return 0;
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = sortedOrders.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const paginationData: PaginationData = {
    currentPage,
    totalPages,
    totalItems: sortedOrders.length,
    itemsPerPage,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "pending":
        return <Calendar className="w-4 h-4 text-orange-600" />;
      case "cancelled":
        return <X className="w-4 h-4 text-red-600" />;
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
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Loading skeletons
  const OrderListSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const OrderTableSkeleton = () => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-24" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  // Error state
  if (hasError) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Customer Dashboard", href: "/customer/dashboard" },
          { label: "Orders" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <Card className="w-full max-w-md text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Unable to Load Orders
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We're having trouble loading your orders. Please try again.
                  </p>
                  <Button onClick={handleRetry} className="w-full">
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      breadcrumbs={[
        { label: "Customer Dashboard", href: "/customer/dashboard" },
        { label: "Orders" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                My Orders
              </h1>
              <p className="text-muted-foreground">
                Track and manage your service orders
              </p>
            </div>
            <Button asChild>
              <Link to="/services">
                <Package className="w-4 h-4 mr-2" />
                Book New Service
              </Link>
            </Button>
          </div>

          {/* Filter Bar */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by service name, technician, or order ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="w-full lg:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Options */}
                <div className="w-full lg:w-48">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="technician">Technician</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="amount">Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Results Summary */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading orders...
                    </div>
                  ) : (
                    <span>
                      Showing {startIndex + 1}-
                      {Math.min(startIndex + itemsPerPage, sortedOrders.length)}{" "}
                      of {sortedOrders.length} orders
                      {searchTerm && ` for "${searchTerm}"`}
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {sortOrder === "asc" ? "↑" : "↓"} Sorted by {sortBy}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Display */}
          {isLoading ? (
            viewMode === "list" ? (
              <OrderListSkeleton />
            ) : (
              <OrderTableSkeleton />
            )
          ) : sortedOrders.length === 0 ? (
            // Empty State
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {searchTerm || statusFilter !== "all"
                    ? "No orders found"
                    : "No orders yet"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "You haven't placed any orders yet. Browse our services to get started."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {(searchTerm || statusFilter !== "all") && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                  <Button asChild>
                    <Link to="/services">
                      <Package className="w-4 h-4 mr-2" />
                      Browse Services
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : viewMode === "list" ? (
            // List View (Mobile Optimized)
            <div className="space-y-4">
              {paginatedOrders.map((order) => (
                <Card
                  key={order.id}
                  className="hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/customer/orders/${order.id}`)
                  }
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {getStatusIcon(order.status)}
                            <h3 className="text-lg font-semibold text-foreground truncate">
                              {order.service}
                            </h3>
                          </div>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(order.status)} flex-shrink-0 ml-2`}
                          >
                            {order.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="font-medium min-w-0">
                              Order ID:
                            </span>
                            <span className="text-foreground">{order.id}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {order.technician.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-foreground font-medium">
                              {order.technician.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-muted-foreground">
                                {order.technician.rating}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{order.date}</span>
                            {order.estimatedTime && (
                              <>
                                <span>•</span>
                                <span>{order.estimatedTime}</span>
                              </>
                            )}
                          </div>

                          {order.rating && (
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">
                                Your Rating:
                              </span>
                              <div className="flex">
                                {renderStars(order.rating)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Side - Amount & Actions */}
                      <div className="flex flex-row sm:flex-col justify-between sm:items-end gap-3 sm:gap-2">
                        <div className="text-right">
                          <p className="text-xl sm:text-2xl font-bold text-primary">
                            {order.amount}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Link to={`/customer/orders/${order.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              <span className="hidden sm:inline">
                                View Details
                              </span>
                              <span className="sm:hidden">View</span>
                            </Link>
                          </Button>

                          {order.status === "in-progress" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MessageSquare className="w-4 h-4 sm:mr-2" />
                              <span className="hidden sm:inline">Chat</span>
                            </Button>
                          )}

                          {order.status === "completed" && !order.rating && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Star className="w-4 h-4 sm:mr-2" />
                              <span className="hidden sm:inline">Rate</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Table View (Desktop)
            <Card className="hidden md:block">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("id")}
                      >
                        Order ID{" "}
                        {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("service")}
                      >
                        Service{" "}
                        {sortBy === "service" &&
                          (sortOrder === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("date")}
                      >
                        Order Date{" "}
                        {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("technician")}
                      >
                        Technician{" "}
                        {sortBy === "technician" &&
                          (sortOrder === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("status")}
                      >
                        Status{" "}
                        {sortBy === "status" &&
                          (sortOrder === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.service}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.amount}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                {order.technician.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {order.technician.name}
                              </p>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-muted-foreground">
                                  {order.technician.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            <Badge
                              variant="outline"
                              className={getStatusColor(order.status)}
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/customer/orders/${order.id}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            {order.status === "in-progress" && (
                              <Button variant="outline" size="sm">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages} • {paginationData.totalItems}{" "}
                total orders
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum =
                      Math.max(1, Math.min(totalPages - 4, currentPage - 2)) +
                      i;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
