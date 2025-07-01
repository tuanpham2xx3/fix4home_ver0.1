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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/shared/Layout";
import {
  Wrench,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Download,
  User,
  ArrowUpDown,
} from "lucide-react";

interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "locked";
  jobsCompleted: number;
  rating: number;
  specialties: string[];
  experience: number;
  joinDate: string;
  lastActive: string;
  address: string;
  documents: {
    type: string;
    name: string;
    url: string;
    uploadDate: string;
  }[];
  bio: string;
  certifications: string[];
}

export default function AdminTechnicians() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);

  const [technicians, setTechnicians] = useState<Technician[]>([
    {
      id: "TECH-001",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      jobsCompleted: 147,
      rating: 4.9,
      specialties: ["Electrical", "HVAC"],
      experience: 8,
      joinDate: "2023-06-15",
      lastActive: "2024-01-25",
      address: "123 Tech Lane, Springfield, IL 62701",
      documents: [
        {
          type: "License",
          name: "Electrical License",
          url: "#",
          uploadDate: "2023-06-15",
        },
        {
          type: "Insurance",
          name: "Liability Insurance",
          url: "#",
          uploadDate: "2023-06-15",
        },
        {
          type: "Certification",
          name: "HVAC Certification",
          url: "#",
          uploadDate: "2023-07-01",
        },
      ],
      bio: "Experienced electrician and HVAC technician with 8 years in the field. Specializes in residential and commercial installations.",
      certifications: [
        "EPA Section 608",
        "NATE Certified",
        "Master Electrician",
      ],
    },
    {
      id: "TECH-002",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      jobsCompleted: 89,
      rating: 4.8,
      specialties: ["Plumbing", "General Repairs"],
      experience: 5,
      joinDate: "2023-08-20",
      lastActive: "2024-01-24",
      address: "456 Repair St, Springfield, IL 62702",
      documents: [
        {
          type: "License",
          name: "Plumbing License",
          url: "#",
          uploadDate: "2023-08-20",
        },
        {
          type: "Insurance",
          name: "General Liability",
          url: "#",
          uploadDate: "2023-08-20",
        },
      ],
      bio: "Skilled plumber with expertise in both residential and commercial plumbing systems. Quick problem solver.",
      certifications: ["Master Plumber", "Backflow Prevention"],
    },
    {
      id: "TECH-003",
      name: "Mike Brown",
      email: "mike.brown@example.com",
      phone: "+1 (555) 345-6789",
      status: "pending",
      jobsCompleted: 0,
      rating: 0,
      specialties: ["Appliance Repair"],
      experience: 3,
      joinDate: "2024-01-20",
      lastActive: "2024-01-23",
      address: "789 Service Ave, Springfield, IL 62703",
      documents: [
        {
          type: "License",
          name: "Appliance Repair License",
          url: "#",
          uploadDate: "2024-01-20",
        },
        {
          type: "Resume",
          name: "Professional Resume",
          url: "#",
          uploadDate: "2024-01-20",
        },
      ],
      bio: "Appliance repair specialist looking to join the FIX4HOME platform. Background in major appliance repair and maintenance.",
      certifications: ["Appliance Service Technician"],
    },
    {
      id: "TECH-004",
      name: "Lisa Garcia",
      email: "lisa.garcia@example.com",
      phone: "+1 (555) 456-7890",
      status: "locked",
      jobsCompleted: 23,
      rating: 3.2,
      specialties: ["General Repairs"],
      experience: 2,
      joinDate: "2023-11-10",
      lastActive: "2024-01-15",
      address: "321 Fix St, Springfield, IL 62704",
      documents: [
        {
          type: "License",
          name: "General Contractor",
          url: "#",
          uploadDate: "2023-11-10",
        },
      ],
      bio: "General repair technician. Account locked due to performance issues.",
      certifications: [],
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

  const handleStatusChange = async (
    technicianId: string,
    newStatus: "active" | "pending" | "locked",
  ) => {
    setIsLoading(true);
    try {
      setTechnicians((prev) =>
        prev.map((tech) =>
          tech.id === technicianId ? { ...tech, status: newStatus } : tech,
        ),
      );
    } catch (error) {
      console.error("Failed to update technician status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTechnician = async (technicianId: string) => {
    setIsLoading(true);
    try {
      setTechnicians((prev) => prev.filter((tech) => tech.id !== technicianId));
    } catch (error) {
      console.error("Failed to delete technician:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTechniciansByTab = (technicians: Technician[], tab: string) => {
    switch (tab) {
      case "active":
        return technicians.filter((tech) => tech.status === "active");
      case "pending":
        return technicians.filter((tech) => tech.status === "pending");
      case "locked":
        return technicians.filter((tech) => tech.status === "locked");
      default:
        return technicians;
    }
  };

  const filteredAndSortedTechnicians = filterTechniciansByTab(
    technicians,
    activeTab,
  )
    .filter((tech) => {
      const matchesSearch =
        tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.phone.includes(searchTerm) ||
        tech.specialties.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      const matchesStatus =
        statusFilter === "all" || tech.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof Technician];
      let bValue = b[sortBy as keyof Technician];

      if (
        sortBy === "jobsCompleted" ||
        sortBy === "rating" ||
        sortBy === "experience"
      ) {
        aValue = a[sortBy as keyof Technician] as number;
        bValue = b[sortBy as keyof Technician] as number;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "locked":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "locked":
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
        { label: "Technician Management" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Technician Management
            </h1>
            <p className="text-muted-foreground">
              Manage technician accounts, approvals, and performance
            </p>
          </div>

          {/* Status Tabs */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">
                    All Technicians ({technicians.length})
                  </TabsTrigger>
                  <TabsTrigger value="active" className="text-green-700">
                    Active (
                    {technicians.filter((t) => t.status === "active").length})
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="text-yellow-700">
                    Pending Approval (
                    {technicians.filter((t) => t.status === "pending").length})
                  </TabsTrigger>
                  <TabsTrigger value="locked" className="text-red-700">
                    Locked (
                    {technicians.filter((t) => t.status === "locked").length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, phone, or specialty..."
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="locked">Locked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technicians Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Technicians ({filteredAndSortedTechnicians.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-muted-foreground mt-2">Loading...</p>
                </div>
              ) : filteredAndSortedTechnicians.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No technicians found
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
                        <SortableHeader column="name">
                          Technician
                        </SortableHeader>
                        <SortableHeader column="status">Status</SortableHeader>
                        <SortableHeader column="jobsCompleted">
                          Jobs Completed
                        </SortableHeader>
                        <SortableHeader column="rating">Rating</SortableHeader>
                        <SortableHeader column="experience">
                          Experience
                        </SortableHeader>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedTechnicians.map((tech) => (
                        <TableRow key={tech.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                <Wrench className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="font-medium">{tech.name}</p>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Mail className="w-3 h-3" />
                                  {tech.email}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Phone className="w-3 h-3" />
                                  {tech.phone}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(tech.status)}
                              <Badge
                                variant="outline"
                                className={getStatusColor(tech.status)}
                              >
                                {tech.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">
                              {tech.jobsCompleted}
                            </span>
                          </TableCell>
                          <TableCell>
                            {tech.rating > 0 ? (
                              <div className="flex items-center gap-1">
                                <div className="flex">
                                  {renderStars(tech.rating)}
                                </div>
                                <span className="text-xs ml-1">
                                  {tech.rating}
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">
                                No ratings
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {tech.experience} years
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {/* View Profile Dialog */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedTechnician(tech)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Technician Profile - {tech.name}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Complete technician information and
                                      documents
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedTechnician && (
                                    <div className="space-y-6">
                                      {/* Personal Information */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                          <h4 className="font-semibold mb-3">
                                            Personal Information
                                          </h4>
                                          <div className="space-y-3 text-sm">
                                            <div className="flex items-center gap-2">
                                              <Mail className="w-4 h-4 text-muted-foreground" />
                                              {selectedTechnician.email}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Phone className="w-4 h-4 text-muted-foreground" />
                                              {selectedTechnician.phone}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <MapPin className="w-4 h-4 text-muted-foreground" />
                                              {selectedTechnician.address}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Calendar className="w-4 h-4 text-muted-foreground" />
                                              Joined{" "}
                                              {new Date(
                                                selectedTechnician.joinDate,
                                              ).toLocaleDateString()}
                                            </div>
                                          </div>
                                        </div>

                                        <div>
                                          <h4 className="font-semibold mb-3">
                                            Professional Information
                                          </h4>
                                          <div className="space-y-3 text-sm">
                                            <div>
                                              <span className="text-muted-foreground">
                                                Specialties:
                                              </span>
                                              <div className="flex flex-wrap gap-1 mt-1">
                                                {selectedTechnician.specialties.map(
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
                                            <div>
                                              <span className="text-muted-foreground">
                                                Experience:
                                              </span>{" "}
                                              {selectedTechnician.experience}{" "}
                                              years
                                            </div>
                                            <div>
                                              <span className="text-muted-foreground">
                                                Jobs Completed:
                                              </span>{" "}
                                              {selectedTechnician.jobsCompleted}
                                            </div>
                                            <div>
                                              <span className="text-muted-foreground">
                                                Rating:
                                              </span>
                                              {selectedTechnician.rating > 0 ? (
                                                <div className="flex items-center gap-1 mt-1">
                                                  <div className="flex">
                                                    {renderStars(
                                                      selectedTechnician.rating,
                                                    )}
                                                  </div>
                                                  <span className="ml-1">
                                                    {selectedTechnician.rating}
                                                  </span>
                                                </div>
                                              ) : (
                                                " No ratings yet"
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Bio */}
                                      <div>
                                        <h4 className="font-semibold mb-2">
                                          About
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                          {selectedTechnician.bio}
                                        </p>
                                      </div>

                                      {/* Certifications */}
                                      <div>
                                        <h4 className="font-semibold mb-2">
                                          Certifications
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                          {selectedTechnician.certifications.map(
                                            (cert, index) => (
                                              <Badge
                                                key={index}
                                                variant="outline"
                                                className="bg-blue-50"
                                              >
                                                {cert}
                                              </Badge>
                                            ),
                                          )}
                                        </div>
                                      </div>

                                      {/* Documents */}
                                      <div>
                                        <h4 className="font-semibold mb-3">
                                          Documents
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                          {selectedTechnician.documents.map(
                                            (doc, index) => (
                                              <div
                                                key={index}
                                                className="border rounded-lg p-3"
                                              >
                                                <div className="flex items-center justify-between">
                                                  <div className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                                    <div>
                                                      <p className="text-sm font-medium">
                                                        {doc.name}
                                                      </p>
                                                      <p className="text-xs text-muted-foreground">
                                                        {doc.type}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <Button
                                                    variant="outline"
                                                    size="sm"
                                                  >
                                                    <Download className="w-3 h-3" />
                                                  </Button>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                  Uploaded{" "}
                                                  {new Date(
                                                    doc.uploadDate,
                                                  ).toLocaleDateString()}
                                                </p>
                                              </div>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

                              {/* Status Change Buttons */}
                              {tech.status === "pending" && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-green-600"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Approve Technician
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to approve{" "}
                                        <strong>{tech.name}</strong>? This will
                                        allow them to receive job assignments.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleStatusChange(tech.id, "active")
                                        }
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        Approve
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}

                              {tech.status === "active" && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-600"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Lock Technician Account
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to lock{" "}
                                        <strong>{tech.name}</strong>? This will
                                        prevent them from receiving new job
                                        assignments.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleStatusChange(tech.id, "locked")
                                        }
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Lock Account
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}

                              {tech.status === "locked" && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-green-600"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Reactivate Technician
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to reactivate{" "}
                                        <strong>{tech.name}</strong>? This will
                                        allow them to receive job assignments
                                        again.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleStatusChange(tech.id, "active")
                                        }
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        Reactivate
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}

                              {/* Edit Button */}
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>

                              {/* Delete Button */}
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
                                      Delete Technician
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to permanently
                                      delete <strong>{tech.name}</strong>? This
                                      action cannot be undone and will remove
                                      all their data.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteTechnician(tech.id)
                                      }
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
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
