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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Layout from "@/components/shared/Layout";
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  User,
  Wrench,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpDown,
} from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  serviceName: string;
  serviceDescription: string;
  technicianName: string;
  technicianPhone: string;
  creationDate: string;
  scheduledDate: string;
  completionDate?: string;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  totalPrice: string;
  notes: string;
}

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("creationDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001234",
      customerName: "Jane Smith",
      customerEmail: "jane.smith@example.com",
      customerPhone: "+1 (555) 123-4567",
      customerAddress: "123 Main St, Springfield, IL 62701",
      serviceName: "Electrical Repair",
      serviceDescription: "Fix kitchen outlet and replace switch",
      technicianName: "John Smith",
      technicianPhone: "+1 (555) 987-6543",
      creationDate: "2024-01-25",
      scheduledDate: "2024-01-26",
      status: "in-progress",
      totalPrice: "$125.00",
      notes: "Customer prefers morning appointment",
    },
    {
      id: "ORD-001235",
      customerName: "Bob Johnson",
      customerEmail: "bob.johnson@example.com",
      customerPhone: "+1 (555) 234-5678",
      customerAddress: "456 Oak Ave, Springfield, IL 62702",
      serviceName: "Plumbing Service",
      serviceDescription: "Unclog bathroom drain",
      technicianName: "Sarah Wilson",
      technicianPhone: "+1 (555) 876-5432",
      creationDate: "2024-01-24",
      scheduledDate: "2024-01-25",
      completionDate: "2024-01-25",
      status: "completed",
      totalPrice: "$85.00",
      notes: "Job completed successfully",
    },
    {
      id: "ORD-001236",
      customerName: "Alice Brown",
      customerEmail: "alice.brown@example.com",
      customerPhone: "+1 (555) 345-6789",
      customerAddress: "789 Pine St, Springfield, IL 62703",
      serviceName: "HVAC Maintenance",
      serviceDescription: "Annual AC unit inspection and cleaning",
      technicianName: "John Smith",
      technicianPhone: "+1 (555) 987-6543",
      creationDate: "2024-01-23",
      scheduledDate: "2024-01-27",
      status: "confirmed",
      totalPrice: "$150.00",
      notes: "Customer has pets",
    },
    {
      id: "ORD-001237",
      customerName: "Charlie Wilson",
      customerEmail: "charlie.wilson@example.com",
      customerPhone: "+1 (555) 456-7890",
      customerAddress: "321 Elm St, Springfield, IL 62704",
      serviceName: "Appliance Repair",
      serviceDescription: "Refrigerator not cooling properly",
      technicianName: "Mike Brown",
      technicianPhone: "+1 (555) 765-4321",
      creationDate: "2024-01-22",
      scheduledDate: "2024-01-28",
      status: "pending",
      totalPrice: "$95.00",
      notes: "Pending technician approval",
    },
    {
      id: "ORD-001238",
      customerName: "Diana Garcia",
      customerEmail: "diana.garcia@example.com",
      customerPhone: "+1 (555) 567-8901",
      customerAddress: "654 Maple Dr, Springfield, IL 62705",
      serviceName: "General Repairs",
      serviceDescription: "Fix door handle and patch wall hole",
      technicianName: "Lisa Garcia",
      technicianPhone: "+1 (555) 654-3210",
      creationDate: "2024-01-21",
      scheduledDate: "2024-01-22",
      status: "cancelled",
      totalPrice: "$75.00",
      notes: "Customer cancelled due to emergency",
    },
  ]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setIsLoading(true);
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus as Order["status"],
                ...(newStatus === "completed" && {
                  completionDate: new Date().toISOString().split("T")[0],
                }),
              }
            : order,
        ),
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    setIsLoading(true);
    try {
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Failed to delete order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAndSortedOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.technicianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof Order];
      let bValue = b[sortBy as keyof Order];

      if (sortBy === "totalPrice") {
        aValue = parseFloat(a.totalPrice.replace("$", "").replace(",", ""));
        bValue = parseFloat(b.totalPrice.replace("$", "").replace(",", ""));
      } else if (
        sortBy === "creationDate" ||
        sortBy === "scheduledDate" ||
        sortBy === "completionDate"
      ) {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case "in-progress":
        return <Wrench className="w-4 h-4 text-purple-600" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in-progress":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const SortableHeader = ({ column, children }: any) => (
    <TableHead
      className="cursor-pointer hover:bg-muted/50 select-none"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-2">
        {children}
        <ArrowUpDown className="w-4 h-4" />
      </div>
    </TableHead>
  );

  return (
    <Layout
      breadcrumbs={[
        { label: "Admin Dashboard", href: "/admin/dashboard" },
        { label: "Orders Management" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Orders Management
            </h1>
            <p className="text-muted-foreground">
              View and manage all service orders in the system
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by order ID, customer, service, or technician..."
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Orders ({filteredAndSortedOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-muted-foreground mt-2">Loading...</p>
                </div>
              ) : filteredAndSortedOrders.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No orders found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <SortableHeader column="id">Order ID</SortableHeader>
                        <SortableHeader column="customerName">
                          Customer
                        </SortableHeader>
                        <SortableHeader column="serviceName">
                          Service
                        </SortableHeader>
                        <SortableHeader column="technicianName">
                          Technician
                        </SortableHeader>
                        <SortableHeader column="creationDate">
                          Created
                        </SortableHeader>
                        <SortableHeader column="status">Status</SortableHeader>
                        <SortableHeader column="totalPrice">
                          Total Price
                        </SortableHeader>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <span className="font-mono text-sm">
                              {order.id}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {order.customerName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {order.customerEmail}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.serviceName}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {order.serviceDescription}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Wrench className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">
                                {order.technicianName}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {new Date(
                                order.creationDate,
                              ).toLocaleDateString()}
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
                            <div className="flex items-center gap-1 font-medium text-green-600">
                              <DollarSign className="w-4 h-4" />
                              {order.totalPrice}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {/* View Order Details Dialog */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedOrder(order)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Order Details - {order.id}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Complete order information and details
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedOrder && (
                                    <div className="space-y-6">
                                      {/* Order Overview */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                          <h4 className="font-semibold mb-3">
                                            Customer Information
                                          </h4>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                              <User className="w-4 h-4 text-muted-foreground" />
                                              {selectedOrder.customerName}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Mail className="w-4 h-4 text-muted-foreground" />
                                              {selectedOrder.customerEmail}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Phone className="w-4 h-4 text-muted-foreground" />
                                              {selectedOrder.customerPhone}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <MapPin className="w-4 h-4 text-muted-foreground" />
                                              {selectedOrder.customerAddress}
                                            </div>
                                          </div>
                                        </div>

                                        <div>
                                          <h4 className="font-semibold mb-3">
                                            Technician Information
                                          </h4>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                              <Wrench className="w-4 h-4 text-muted-foreground" />
                                              {selectedOrder.technicianName}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Phone className="w-4 h-4 text-muted-foreground" />
                                              {selectedOrder.technicianPhone}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Service Details */}
                                      <div>
                                        <h4 className="font-semibold mb-3">
                                          Service Details
                                        </h4>
                                        <div className="bg-muted p-4 rounded-lg">
                                          <p className="font-medium mb-2">
                                            {selectedOrder.serviceName}
                                          </p>
                                          <p className="text-sm text-muted-foreground mb-3">
                                            {selectedOrder.serviceDescription}
                                          </p>
                                          <div className="flex items-center justify-between">
                                            <Badge
                                              variant="outline"
                                              className={getStatusColor(
                                                selectedOrder.status,
                                              )}
                                            >
                                              {selectedOrder.status}
                                            </Badge>
                                            <span className="font-semibold text-green-600">
                                              {selectedOrder.totalPrice}
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Timeline */}
                                      <div>
                                        <h4 className="font-semibold mb-3">
                                          Timeline
                                        </h4>
                                        <div className="space-y-3">
                                          <div className="flex items-center gap-3">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <div>
                                              <span className="text-sm font-medium">
                                                Order Created:
                                              </span>
                                              <span className="text-sm text-muted-foreground ml-2">
                                                {new Date(
                                                  selectedOrder.creationDate,
                                                ).toLocaleDateString()}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-3">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <div>
                                              <span className="text-sm font-medium">
                                                Scheduled Date:
                                              </span>
                                              <span className="text-sm text-muted-foreground ml-2">
                                                {new Date(
                                                  selectedOrder.scheduledDate,
                                                ).toLocaleDateString()}
                                              </span>
                                            </div>
                                          </div>
                                          {selectedOrder.completionDate && (
                                            <div className="flex items-center gap-3">
                                              <CheckCircle className="w-4 h-4 text-green-600" />
                                              <div>
                                                <span className="text-sm font-medium">
                                                  Completed Date:
                                                </span>
                                                <span className="text-sm text-muted-foreground ml-2">
                                                  {new Date(
                                                    selectedOrder.completionDate,
                                                  ).toLocaleDateString()}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      {/* Notes */}
                                      <div>
                                        <h4 className="font-semibold mb-2">
                                          Notes
                                        </h4>
                                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                          {selectedOrder.notes}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

                              {/* Update Status */}
                              <Select
                                value={order.status}
                                onValueChange={(value) =>
                                  handleStatusUpdate(order.id, value)
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <Edit className="w-4 h-4 mr-1" />
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">
                                    Pending
                                  </SelectItem>
                                  <SelectItem value="confirmed">
                                    Confirmed
                                  </SelectItem>
                                  <SelectItem value="in-progress">
                                    In Progress
                                  </SelectItem>
                                  <SelectItem value="completed">
                                    Completed
                                  </SelectItem>
                                  <SelectItem value="cancelled">
                                    Cancelled
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              {/* Delete Order */}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Order
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to permanently
                                      delete order <strong>{order.id}</strong>?
                                      This action cannot be undone and will
                                      remove all order data.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteOrder(order.id)
                                      }
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete Order
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
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
