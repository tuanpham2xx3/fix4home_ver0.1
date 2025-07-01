import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/components/shared/Layout";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  MapPin,
  Phone,
  MessageSquare,
  Navigation,
  DollarSign,
  Star,
  Play,
  Square,
  Briefcase,
  XCircle,
  SortAsc,
  SortDesc,
  Eye,
  MoreHorizontal,
  FileText,
  ExternalLink,
} from "lucide-react";

export default function TechnicianJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");

  const itemsPerPage = 10;

  // Expanded mock data for demonstration
  const allJobs = [
    {
      id: "JOB-001",
      service: "AC Repair",
      customer: "Jane Smith",
      customerPhone: "+1 (555) 123-4567",
      address: "123 Main St, Apt 4B, City, State",
      status: "scheduled",
      priority: "high",
      date: "2024-01-25",
      time: "09:00 AM",
      payment: 120,
      description: "AC unit not cooling properly, needs diagnostic and repair",
      estimatedDuration: "2 hours",
      distance: "2.3 miles",
    },
    {
      id: "JOB-002",
      service: "Plumbing Fix",
      customer: "Bob Johnson",
      customerPhone: "+1 (555) 234-5678",
      address: "456 Oak Ave, City, State",
      status: "in-progress",
      priority: "medium",
      date: "2024-01-25",
      time: "02:00 PM",
      payment: 85,
      description: "Kitchen sink leak repair",
      estimatedDuration: "1.5 hours",
      startedAt: "02:15 PM",
      distance: "1.8 miles",
    },
    {
      id: "JOB-003",
      service: "Electrical Inspection",
      customer: "Alice Wilson",
      customerPhone: "+1 (555) 345-6789",
      address: "789 Pine Road, City, State",
      status: "completed",
      priority: "low",
      date: "2024-01-24",
      time: "04:30 PM",
      payment: 95,
      description: "Annual electrical safety inspection",
      estimatedDuration: "1 hour",
      completedAt: "05:15 PM",
      rating: 5,
      distance: "3.1 miles",
    },
    {
      id: "JOB-004",
      service: "Appliance Repair",
      customer: "Mike Davis",
      customerPhone: "+1 (555) 456-7890",
      address: "321 Elm Street, City, State",
      status: "pending",
      priority: "medium",
      date: "2024-01-26",
      time: "10:00 AM",
      payment: 110,
      description: "Washing machine not spinning properly",
      estimatedDuration: "2 hours",
      distance: "4.2 miles",
    },
    {
      id: "JOB-005",
      service: "HVAC Maintenance",
      customer: "Sarah Johnson",
      customerPhone: "+1 (555) 567-8901",
      address: "654 Maple Ave, City, State",
      status: "scheduled",
      priority: "low",
      date: "2024-01-27",
      time: "11:00 AM",
      payment: 150,
      description: "Annual HVAC system maintenance and filter replacement",
      estimatedDuration: "3 hours",
      distance: "5.7 miles",
    },
    {
      id: "JOB-006",
      service: "Water Heater Repair",
      customer: "Tom Wilson",
      customerPhone: "+1 (555) 678-9012",
      address: "987 Oak Street, City, State",
      status: "cancelled",
      priority: "high",
      date: "2024-01-23",
      time: "08:00 AM",
      payment: 200,
      description: "Water heater not producing hot water",
      estimatedDuration: "2.5 hours",
      cancelledReason: "Customer rescheduled",
      distance: "6.1 miles",
    },
    {
      id: "JOB-007",
      service: "Lighting Installation",
      customer: "Emma Brown",
      customerPhone: "+1 (555) 789-0123",
      address: "246 Cedar Lane, City, State",
      status: "pending",
      priority: "low",
      date: "2024-01-28",
      time: "02:00 PM",
      payment: 75,
      description: "Install new LED ceiling lights in living room",
      estimatedDuration: "1.5 hours",
      distance: "2.9 miles",
    },
    {
      id: "JOB-008",
      service: "Dishwasher Repair",
      customer: "Chris Lee",
      customerPhone: "+1 (555) 890-1234",
      address: "135 Birch Ave, City, State",
      status: "completed",
      priority: "medium",
      date: "2024-01-22",
      time: "03:30 PM",
      payment: 90,
      description: "Dishwasher not draining properly",
      estimatedDuration: "1 hour",
      completedAt: "04:20 PM",
      rating: 4,
      distance: "3.4 miles",
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="w-4 h-4 text-orange-600" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "available":
        return <AlertCircle className="w-4 h-4 text-purple-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "available":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filterJobsByTab = (jobs: any[], tab: string) => {
    switch (tab) {
      case "pending":
        return jobs.filter((job) => job.status === "pending");
      case "scheduled":
        return jobs.filter((job) => job.status === "scheduled");
      case "in-progress":
        return jobs.filter((job) => job.status === "in-progress");
      case "completed":
        return jobs.filter((job) => job.status === "completed");
      case "cancelled":
        return jobs.filter((job) => job.status === "cancelled");
      default:
        return jobs;
    }
  };

  const sortJobs = (jobs: any[]) => {
    return [...jobs].sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "date":
          aValue = new Date(`${a.date} ${a.time}`);
          bValue = new Date(`${b.date} ${b.time}`);
          break;
        case "payment":
          aValue = a.payment;
          bValue = b.payment;
          break;
        case "customer":
          aValue = a.customer.toLowerCase();
          bValue = b.customer.toLowerCase();
          break;
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
          bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

  const filteredJobs = sortJobs(
    filterJobsByTab(allJobs, activeTab).filter((job) => {
      const matchesSearch =
        job.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    }),
  );

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

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

  const handleAcceptJob = (jobId: string) => {
    console.log("Accepting job:", jobId);
    // Here you would typically call your API
  };

  const handleStartJob = (jobId: string) => {
    console.log("Starting job:", jobId);
    // Here you would typically call your API
  };

  const handleCompleteJob = (jobId: string) => {
    console.log("Completing job:", jobId);
    // Here you would typically call your API
  };

  return (
    <Layout
      breadcrumbs={[
        { label: "Technician Dashboard", href: "/technician/dashboard" },
        { label: "Jobs" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-950 dark:to-teal-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Jobs</h1>
            <p className="text-muted-foreground">
              Manage your service jobs and appointments
            </p>
          </div>

          {/* Job Tabs */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All Jobs</TabsTrigger>
                  <TabsTrigger value="available">Available</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
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
                      placeholder="Search jobs by service, customer, ID, or address..."
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
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "No jobs available at the moment"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {getStatusIcon(job.status)}
                          <h3 className="text-lg font-semibold">
                            {job.service}
                          </h3>
                          <Badge
                            variant="outline"
                            className={getStatusColor(job.status)}
                          >
                            {job.status}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(job.priority)}
                          >
                            {job.priority} priority
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Job ID:</span>
                              <span>{job.id}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Customer:</span>
                              <span>{job.customer}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span>{job.customerPhone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{job.address}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {job.date} at {job.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>Est. {job.estimatedDuration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              <span className="font-medium text-green-600">
                                {job.payment}
                              </span>
                            </div>
                            {job.startedAt && (
                              <div className="flex items-center gap-2">
                                <Play className="w-4 h-4" />
                                <span>Started: {job.startedAt}</span>
                              </div>
                            )}
                            {job.completedAt && (
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                <span>Completed: {job.completedAt}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="mt-3 text-sm">{job.description}</p>

                        {job.rating && (
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-sm font-medium">
                              Customer Rating:
                            </span>
                            <div className="flex">
                              {renderStars(job.rating)}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ({job.rating}/5)
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col lg:items-end gap-3">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            {job.payment}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {job.estimatedDuration}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                          {job.status === "available" && (
                            <Button
                              onClick={() => handleAcceptJob(job.id)}
                              size="sm"
                            >
                              Accept Job
                            </Button>
                          )}

                          {job.status === "scheduled" && (
                            <>
                              <Button
                                onClick={() => handleStartJob(job.id)}
                                size="sm"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Start Job
                              </Button>
                              <Button variant="outline" size="sm">
                                <Navigation className="w-4 h-4 mr-2" />
                                Navigate
                              </Button>
                            </>
                          )}

                          {job.status === "in-progress" && (
                            <>
                              <Button
                                onClick={() => handleCompleteJob(job.id)}
                                size="sm"
                              >
                                <Square className="w-4 h-4 mr-2" />
                                Complete
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Chat
                              </Button>
                            </>
                          )}

                          {(job.status === "scheduled" ||
                            job.status === "in-progress") && (
                            <Button variant="outline" size="sm">
                              <Phone className="w-4 h-4 mr-2" />
                              Call Customer
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
