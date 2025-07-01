import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Label } from "@/components/ui/label";
import Layout from "@/components/shared/Layout";
import {
  Settings,
  Search,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  ShoppingCart,
  Upload,
  ArrowUpDown,
  Eye,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  status: "active" | "inactive" | "draft";
  totalBookings: number;
  image: string;
  category: string;
  duration: string;
}

export default function AdminServices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [services, setServices] = useState<Service[]>([
    {
      id: "SRV-001",
      name: "Electrical Repair",
      description: "Complete electrical troubleshooting and repair services",
      price: "$85.00",
      status: "active",
      totalBookings: 234,
      image: "/placeholder.svg",
      category: "Electrical",
      duration: "2-3 hours",
    },
    {
      id: "SRV-002",
      name: "Plumbing Service",
      description: "Professional plumbing installation and repair",
      price: "$75.00",
      status: "active",
      totalBookings: 189,
      image: "/placeholder.svg",
      category: "Plumbing",
      duration: "1-2 hours",
    },
    {
      id: "SRV-003",
      name: "HVAC Maintenance",
      description: "Heating, ventilation, and air conditioning services",
      price: "$150.00",
      status: "active",
      totalBookings: 156,
      image: "/placeholder.svg",
      category: "HVAC",
      duration: "2-4 hours",
    },
    {
      id: "SRV-004",
      name: "Appliance Repair",
      description: "Repair and maintenance of home appliances",
      price: "$95.00",
      status: "inactive",
      totalBookings: 78,
      image: "/placeholder.svg",
      category: "Appliance",
      duration: "1-3 hours",
    },
    {
      id: "SRV-005",
      name: "Smart Home Installation",
      description: "Installation and setup of smart home devices",
      price: "$120.00",
      status: "draft",
      totalBookings: 12,
      image: "/placeholder.svg",
      category: "Technology",
      duration: "3-5 hours",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "draft" as "active" | "inactive" | "draft",
    category: "",
    duration: "",
    image: "/placeholder.svg",
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleAddService = async () => {
    setIsLoading(true);
    try {
      const newService: Service = {
        id: `SRV-${String(services.length + 1).padStart(3, "0")}`,
        ...formData,
        totalBookings: 0,
      } as Service;

      setServices((prev) => [...prev, newService]);
      setFormData({
        name: "",
        description: "",
        price: "",
        status: "draft",
        category: "",
        duration: "",
        image: "/placeholder.svg",
      });
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to add service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditService = async () => {
    if (!selectedService) return;

    setIsLoading(true);
    try {
      setServices((prev) =>
        prev.map((service) =>
          service.id === selectedService.id
            ? { ...service, ...formData }
            : service,
        ),
      );
      setIsEditModalOpen(false);
      setSelectedService(null);
    } catch (error) {
      console.error("Failed to edit service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    setIsLoading(true);
    try {
      setServices((prev) => prev.filter((service) => service.id !== serviceId));
    } catch (error) {
      console.error("Failed to delete service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (service: Service) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      status: service.status,
      category: service.category,
      duration: service.duration,
      image: service.image,
    });
    setIsEditModalOpen(true);
  };

  const filteredAndSortedServices = services
    .filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || service.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof Service];
      let bValue = b[sortBy as keyof Service];

      if (sortBy === "totalBookings") {
        aValue = a.totalBookings;
        bValue = b.totalBookings;
      } else if (sortBy === "price") {
        aValue = parseFloat(a.price.replace("$", "").replace(",", ""));
        bValue = parseFloat(b.price.replace("$", "").replace(",", ""));
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
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

  const ServiceModal = ({ isOpen, onClose, onSubmit, title }: any) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Fill in the service details below
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter service name"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="HVAC">HVAC</SelectItem>
                  <SelectItem value="Appliance">Appliance</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="$0.00"
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="e.g., 2-3 hours"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter service description"
                className="min-h-[100px]"
              />
            </div>
            <div>
              <Label htmlFor="image">Service Image</Label>
              <div className="space-y-3">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <img
                    src={formData.image}
                    alt="Service preview"
                    className="w-32 h-32 object-cover rounded-lg mx-auto mb-3"
                  />
                  <Button variant="outline" type="button">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Service"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <Layout
      breadcrumbs={[
        { label: "Admin Dashboard", href: "/admin/dashboard" },
        { label: "Services Management" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Services Management
                </h1>
                <p className="text-muted-foreground">
                  Create, edit, and manage all available services
                </p>
              </div>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Service
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search services by name, description, or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Services ({filteredAndSortedServices.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && !services.length ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-muted-foreground mt-2">Loading...</p>
                </div>
              ) : filteredAndSortedServices.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No services found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "Get started by adding your first service"}
                  </p>
                  <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Service
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <SortableHeader column="name">Name</SortableHeader>
                        <SortableHeader column="price">Price</SortableHeader>
                        <SortableHeader column="status">Status</SortableHeader>
                        <SortableHeader column="totalBookings">
                          Total Bookings
                        </SortableHeader>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={service.image}
                                alt={service.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium">{service.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {service.category}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{service.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
                                {service.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 font-medium text-green-600">
                              <DollarSign className="w-4 h-4" />
                              {service.price}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getStatusColor(service.status)}
                            >
                              {service.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">
                                {service.totalBookings}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditModal(service)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
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
                                      Delete Service
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to permanently
                                      delete <strong>{service.name}</strong>?
                                      This action cannot be undone and will
                                      remove the service from all active
                                      bookings.
                                      <br />
                                      <br />
                                      <strong>Warning:</strong> This service has{" "}
                                      {service.totalBookings} total bookings and
                                      may affect existing customers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteService(service.id)
                                      }
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete Service
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

          {/* Add Service Modal */}
          <ServiceModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddService}
            title="Add New Service"
          />

          {/* Edit Service Modal */}
          <ServiceModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleEditService}
            title="Edit Service"
          />
        </div>
      </div>
    </Layout>
  );
}
