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
  DialogFooter,
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
  Users,
  Search,
  Filter,
  Eye,
  Edit,
  Lock,
  Unlock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingCart,
  DollarSign,
  ArrowUpDown,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountStatus: "active" | "locked";
  registrationDate: string;
  numberOfOrders: number;
  totalSpent: string;
  lastOrderDate?: string;
  address: string;
  avatar?: string;
}

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "CUST-001",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 123-4567",
      accountStatus: "active",
      registrationDate: "2024-01-15",
      numberOfOrders: 12,
      totalSpent: "$1,240.50",
      lastOrderDate: "2024-01-25",
      address: "123 Main St, Springfield, IL 62701",
    },
    {
      id: "CUST-002",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: "+1 (555) 234-5678",
      accountStatus: "active",
      registrationDate: "2024-01-20",
      numberOfOrders: 3,
      totalSpent: "$280.00",
      lastOrderDate: "2024-01-22",
      address: "456 Oak Ave, Springfield, IL 62702",
    },
    {
      id: "CUST-003",
      name: "Alice Brown",
      email: "alice.brown@example.com",
      phone: "+1 (555) 345-6789",
      accountStatus: "locked",
      registrationDate: "2024-01-10",
      numberOfOrders: 8,
      totalSpent: "$890.75",
      lastOrderDate: "2024-01-18",
      address: "789 Pine St, Springfield, IL 62703",
    },
    {
      id: "CUST-004",
      name: "Charlie Wilson",
      email: "charlie.wilson@example.com",
      phone: "+1 (555) 456-7890",
      accountStatus: "active",
      registrationDate: "2024-01-25",
      numberOfOrders: 1,
      totalSpent: "$125.00",
      lastOrderDate: "2024-01-25",
      address: "321 Elm St, Springfield, IL 62704",
    },
    {
      id: "CUST-005",
      name: "Diana Garcia",
      email: "diana.garcia@example.com",
      phone: "+1 (555) 567-8901",
      accountStatus: "active",
      registrationDate: "2024-01-05",
      numberOfOrders: 15,
      totalSpent: "$2,150.25",
      lastOrderDate: "2024-01-24",
      address: "654 Maple Dr, Springfield, IL 62705",
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

  const handleToggleAccountStatus = async (customerId: string) => {
    setIsLoading(true);
    try {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === customerId
            ? {
                ...customer,
                accountStatus:
                  customer.accountStatus === "active" ? "locked" : "active",
              }
            : customer,
        ),
      );
    } catch (error) {
      console.error("Failed to toggle account status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAndSortedCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || customer.accountStatus === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof Customer];
      let bValue = b[sortBy as keyof Customer];

      if (sortBy === "numberOfOrders") {
        aValue = a.numberOfOrders;
        bValue = b.numberOfOrders;
      } else if (sortBy === "totalSpent") {
        aValue = parseFloat(a.totalSpent.replace("$", "").replace(",", ""));
        bValue = parseFloat(b.totalSpent.replace("$", "").replace(",", ""));
      } else if (sortBy === "registrationDate") {
        aValue = new Date(a.registrationDate).getTime();
        bValue = new Date(b.registrationDate).getTime();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const getStatusIcon = (status: string) => {
    return status === "active" ? (
      <Unlock className="w-4 h-4 text-green-600" />
    ) : (
      <Lock className="w-4 h-4 text-red-600" />
    );
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
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
        { label: "User Management" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Customer Management
            </h1>
            <p className="text-muted-foreground">
              View and manage customer accounts, orders, and account status
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
                      placeholder="Search by name, email, phone, or customer ID..."
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="locked">Locked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customers Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Customers ({filteredAndSortedCustomers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-muted-foreground mt-2">Loading...</p>
                </div>
              ) : filteredAndSortedCustomers.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No customers found
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
                        <SortableHeader column="name">Customer</SortableHeader>
                        <SortableHeader column="accountStatus">
                          Status
                        </SortableHeader>
                        <SortableHeader column="registrationDate">
                          Registration Date
                        </SortableHeader>
                        <SortableHeader column="numberOfOrders">
                          Orders
                        </SortableHeader>
                        <SortableHeader column="totalSpent">
                          Total Spent
                        </SortableHeader>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold">
                                  {customer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Mail className="w-3 h-3" />
                                  {customer.email}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Phone className="w-3 h-3" />
                                  {customer.phone}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(customer.accountStatus)}
                              <Badge
                                variant="outline"
                                className={getStatusColor(
                                  customer.accountStatus,
                                )}
                              >
                                {customer.accountStatus}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              {new Date(
                                customer.registrationDate,
                              ).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">
                                {customer.numberOfOrders}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 font-medium text-green-600">
                              <DollarSign className="w-4 h-4" />
                              {customer.totalSpent}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {/* View Details Dialog */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setSelectedCustomer(customer)
                                    }
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Customer Details - {customer.name}
                                    </DialogTitle>
                                    <DialogDescription>
                                      View detailed information about this
                                      customer
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedCustomer && (
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="font-semibold mb-2">
                                            Contact Information
                                          </h4>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                              <Mail className="w-4 h-4 text-muted-foreground" />
                                              {selectedCustomer.email}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Phone className="w-4 h-4 text-muted-foreground" />
                                              {selectedCustomer.phone}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <MapPin className="w-4 h-4 text-muted-foreground" />
                                              {selectedCustomer.address}
                                            </div>
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-semibold mb-2">
                                            Account Information
                                          </h4>
                                          <div className="space-y-2 text-sm">
                                            <div>
                                              <span className="text-muted-foreground">
                                                Customer ID:
                                              </span>{" "}
                                              {selectedCustomer.id}
                                            </div>
                                            <div>
                                              <span className="text-muted-foreground">
                                                Status:
                                              </span>{" "}
                                              <Badge
                                                variant="outline"
                                                className={getStatusColor(
                                                  selectedCustomer.accountStatus,
                                                )}
                                              >
                                                {selectedCustomer.accountStatus}
                                              </Badge>
                                            </div>
                                            <div>
                                              <span className="text-muted-foreground">
                                                Member since:
                                              </span>{" "}
                                              {new Date(
                                                selectedCustomer.registrationDate,
                                              ).toLocaleDateString()}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-2">
                                          Order History
                                        </h4>
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                          <div className="bg-muted p-3 rounded-lg">
                                            <p className="text-muted-foreground">
                                              Total Orders
                                            </p>
                                            <p className="font-semibold text-lg">
                                              {selectedCustomer.numberOfOrders}
                                            </p>
                                          </div>
                                          <div className="bg-muted p-3 rounded-lg">
                                            <p className="text-muted-foreground">
                                              Total Spent
                                            </p>
                                            <p className="font-semibold text-lg text-green-600">
                                              {selectedCustomer.totalSpent}
                                            </p>
                                          </div>
                                          <div className="bg-muted p-3 rounded-lg">
                                            <p className="text-muted-foreground">
                                              Last Order
                                            </p>
                                            <p className="font-semibold text-lg">
                                              {selectedCustomer.lastOrderDate
                                                ? new Date(
                                                    selectedCustomer.lastOrderDate,
                                                  ).toLocaleDateString()
                                                : "None"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

                              {/* Edit Button */}
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>

                              {/* Lock/Unlock Account with Confirmation */}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className={
                                      customer.accountStatus === "active"
                                        ? "text-red-600 hover:text-red-700"
                                        : "text-green-600 hover:text-green-700"
                                    }
                                  >
                                    {customer.accountStatus === "active" ? (
                                      <Lock className="w-4 h-4" />
                                    ) : (
                                      <Unlock className="w-4 h-4" />
                                    )}
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      {customer.accountStatus === "active"
                                        ? "Lock Account"
                                        : "Unlock Account"}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to{" "}
                                      {customer.accountStatus === "active"
                                        ? "lock"
                                        : "unlock"}{" "}
                                      the account for{" "}
                                      <strong>{customer.name}</strong>?{" "}
                                      {customer.accountStatus === "active" &&
                                        "This will prevent them from accessing their account and placing new orders."}
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleToggleAccountStatus(customer.id)
                                      }
                                      className={
                                        customer.accountStatus === "active"
                                          ? "bg-red-600 hover:bg-red-700"
                                          : "bg-green-600 hover:bg-green-700"
                                      }
                                    >
                                      {customer.accountStatus === "active"
                                        ? "Lock Account"
                                        : "Unlock Account"}
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
