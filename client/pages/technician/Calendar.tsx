import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Layout from "@/components/shared/Layout";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  MapPin,
  Phone,
  DollarSign,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  Navigation,
  Play,
  Square,
  MoreHorizontal,
  Plus,
  Briefcase,
  Timer,
  ExternalLink,
} from "lucide-react";

interface Job {
  id: string;
  service: string;
  customer: string;
  customerPhone: string;
  address: string;
  status: string;
  priority: string;
  date: string;
  time: string;
  endTime: string;
  payment: number;
  estimatedDuration: string;
  description: string;
}

export default function TechnicianCalendar() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Mock data for jobs
  const allJobs: Job[] = [
    {
      id: "JOB-001",
      service: "AC Repair",
      customer: "Jane Smith",
      customerPhone: "+1 (555) 123-4567",
      address: "123 Main St, Apt 4B",
      status: "scheduled",
      priority: "high",
      date: "2024-01-25",
      time: "09:00",
      endTime: "11:00",
      payment: 120,
      estimatedDuration: "2 hours",
      description: "AC unit not cooling properly, needs diagnostic and repair",
    },
    {
      id: "JOB-002",
      service: "Plumbing Fix",
      customer: "Bob Johnson",
      customerPhone: "+1 (555) 234-5678",
      address: "456 Oak Ave",
      status: "in-progress",
      priority: "medium",
      date: "2024-01-25",
      time: "14:00",
      endTime: "15:30",
      payment: 85,
      estimatedDuration: "1.5 hours",
      description: "Kitchen sink leak repair",
    },
    {
      id: "JOB-003",
      service: "Electrical Inspection",
      customer: "Alice Wilson",
      customerPhone: "+1 (555) 345-6789",
      address: "789 Pine Road",
      status: "completed",
      priority: "low",
      date: "2024-01-24",
      time: "16:30",
      endTime: "17:30",
      payment: 95,
      estimatedDuration: "1 hour",
      description: "Annual electrical safety inspection",
    },
    {
      id: "JOB-004",
      service: "Appliance Repair",
      customer: "Mike Davis",
      customerPhone: "+1 (555) 456-7890",
      address: "321 Elm Street",
      status: "scheduled",
      priority: "medium",
      date: "2024-01-26",
      time: "10:00",
      endTime: "12:00",
      payment: 110,
      estimatedDuration: "2 hours",
      description: "Washing machine not spinning properly",
    },
    {
      id: "JOB-005",
      service: "HVAC Maintenance",
      customer: "Sarah Johnson",
      customerPhone: "+1 (555) 567-8901",
      address: "654 Maple Ave",
      status: "scheduled",
      priority: "low",
      date: "2024-01-27",
      time: "11:00",
      endTime: "14:00",
      payment: 150,
      estimatedDuration: "3 hours",
      description: "Annual HVAC system maintenance and filter replacement",
    },
    {
      id: "JOB-006",
      service: "Water Heater Repair",
      customer: "Tom Wilson",
      customerPhone: "+1 (555) 678-9012",
      address: "987 Oak Street",
      status: "cancelled",
      priority: "high",
      date: "2024-01-23",
      time: "08:00",
      endTime: "10:30",
      payment: 200,
      estimatedDuration: "2.5 hours",
      description: "Water heater not producing hot water",
    },
    {
      id: "JOB-007",
      service: "Lighting Installation",
      customer: "Emma Brown",
      customerPhone: "+1 (555) 789-0123",
      address: "246 Cedar Lane",
      status: "scheduled",
      priority: "low",
      date: "2024-01-28",
      time: "14:00",
      endTime: "15:30",
      payment: 75,
      estimatedDuration: "1.5 hours",
      description: "Install new LED ceiling lights in living room",
    },
    {
      id: "JOB-008",
      service: "Dishwasher Repair",
      customer: "Chris Lee",
      customerPhone: "+1 (555) 890-1234",
      address: "135 Birch Ave",
      status: "completed",
      priority: "medium",
      date: "2024-01-22",
      time: "15:30",
      endTime: "16:30",
      payment: 90,
      estimatedDuration: "1 hour",
      description: "Dishwasher not draining properly",
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <CalendarIcon className="w-4 h-4 text-orange-600" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-orange-100 text-orange-800 border-l-orange-500";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-l-blue-500";
      case "completed":
        return "bg-green-100 text-green-800 border-l-green-500";
      case "cancelled":
        return "bg-red-100 text-red-800 border-l-red-500";
      default:
        return "bg-gray-100 text-gray-800 border-l-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getMonthDates = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const dates = [];

    // Add previous month's days to fill the first week
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      dates.push({ date: prevDate, isCurrentMonth: false });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      dates.push({ date: currentDate, isCurrentMonth: true });
    }

    // Add next month's days to fill the last week
    const remainingDays = 42 - dates.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      dates.push({ date: nextDate, isCurrentMonth: false });
    }

    return dates;
  };

  const filterJobs = (jobs: Job[]) => {
    if (statusFilter === "all") return jobs;
    return jobs.filter((job) => job.status === statusFilter);
  };

  const getJobsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return filterJobs(allJobs).filter((job) => job.date === dateStr);
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(
        currentDate.getMonth() + (direction === "next" ? 1 : -1),
      );
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8; // Start from 8 AM
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  if (isLoading) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Technician Dashboard", href: "/technician/dashboard" },
          { label: "Calendar" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <Skeleton className="h-10 w-48 mb-4" />
              <Skeleton className="h-6 w-96" />
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4 mb-4">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-48" />
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-7 gap-4">
                {[...Array(7)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <Skeleton className="h-32 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const weekDates = getWeekDates(currentDate);
  const monthDates = getMonthDates(currentDate);

  return (
    <Layout
      breadcrumbs={[
        { label: "Technician Dashboard", href: "/technician/dashboard" },
        { label: "Work Calendar" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Work Calendar
                </h1>
                <p className="text-muted-foreground">
                  Manage your schedule and upcoming jobs
                </p>
              </div>
              <Button asChild>
                <Link to="/technician/jobs?filter=pending">
                  <Plus className="w-4 h-4 mr-2" />
                  Browse Available Jobs
                </Link>
              </Button>
            </div>
          </div>

          {/* Calendar Controls */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateDate("prev")}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateDate("next")}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" onClick={goToToday}>
                      Today
                    </Button>
                  </div>
                  <div className="text-xl font-semibold">
                    {viewMode === "week"
                      ? `${weekDates[0].toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })} - ${weekDates[6].toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}`
                      : currentDate.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Tabs
                    value={viewMode}
                    onValueChange={(v) => setViewMode(v as "week" | "month")}
                  >
                    <TabsList>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Jobs</SelectItem>
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

          {/* Calendar View */}
          {viewMode === "week" ? (
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-8 border-b">
                  <div className="p-4 font-medium text-muted-foreground border-r">
                    Time
                  </div>
                  {weekDates.map((date) => (
                    <div
                      key={date.toISOString()}
                      className="p-4 text-center border-r last:border-r-0"
                    >
                      <div className="font-medium">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </div>
                      <div
                        className={`text-2xl font-bold ${
                          formatDate(date) === formatDate(new Date())
                            ? "text-blue-600"
                            : ""
                        }`}
                      >
                        {date.getDate()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getJobsForDate(date).length} jobs
                      </div>
                    </div>
                  ))}
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {timeSlots.map((timeSlot) => (
                    <div
                      key={timeSlot}
                      className="grid grid-cols-8 border-b min-h-[60px]"
                    >
                      <div className="p-2 text-sm text-muted-foreground border-r bg-muted/30">
                        {timeSlot}
                      </div>
                      {weekDates.map((date) => {
                        const dateJobs = getJobsForDate(date).filter((job) => {
                          const jobTime = job.time.padStart(5, "0");
                          return jobTime === timeSlot;
                        });

                        return (
                          <div
                            key={`${date.toISOString()}-${timeSlot}`}
                            className="p-1 border-r last:border-r-0 relative"
                          >
                            {dateJobs.map((job) => (
                              <Dialog key={job.id}>
                                <DialogTrigger asChild>
                                  <div
                                    className={`p-2 rounded-lg border-l-4 cursor-pointer hover:shadow-sm transition-all text-xs ${getStatusColor(
                                      job.status,
                                    )}`}
                                    onClick={() => setSelectedJob(job)}
                                  >
                                    <div className="font-medium truncate">
                                      {job.service}
                                    </div>
                                    <div className="text-xs opacity-75 truncate">
                                      {job.customer}
                                    </div>
                                    <div className="text-xs opacity-75">
                                      ${job.payment}
                                    </div>
                                  </div>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      {getStatusIcon(job.status)}
                                      {job.service} - {job.id}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Job scheduled for {job.date} at {job.time}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <div className="font-medium text-muted-foreground">
                                          Customer
                                        </div>
                                        <div>{job.customer}</div>
                                      </div>
                                      <div>
                                        <div className="font-medium text-muted-foreground">
                                          Duration
                                        </div>
                                        <div>{job.estimatedDuration}</div>
                                      </div>
                                      <div>
                                        <div className="font-medium text-muted-foreground">
                                          Address
                                        </div>
                                        <div>{job.address}</div>
                                      </div>
                                      <div>
                                        <div className="font-medium text-muted-foreground">
                                          Payment
                                        </div>
                                        <div className="font-bold text-green-600">
                                          ${job.payment}
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="font-medium text-muted-foreground mb-1">
                                        Description
                                      </div>
                                      <div className="text-sm">
                                        {job.description}
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        asChild
                                        size="sm"
                                        className="flex-1"
                                      >
                                        <Link to={`/technician/jobs/${job.id}`}>
                                          <Eye className="w-4 h-4 mr-2" />
                                          View Details
                                        </Link>
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Phone className="w-4 h-4 mr-2" />
                                        Call
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Navigation className="w-4 h-4 mr-2" />
                                        Navigate
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="bg-muted/50 p-3 text-center font-medium text-sm"
                      >
                        {day}
                      </div>
                    ),
                  )}
                  {monthDates.map(({ date, isCurrentMonth }, index) => {
                    const dateJobs = getJobsForDate(date);
                    const isToday = formatDate(date) === formatDate(new Date());

                    return (
                      <div
                        key={index}
                        className={`bg-card p-2 min-h-[120px] ${
                          !isCurrentMonth ? "opacity-50" : ""
                        }`}
                      >
                        <div
                          className={`text-sm font-medium mb-2 ${
                            isToday
                              ? "text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center"
                              : ""
                          }`}
                        >
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dateJobs.slice(0, 3).map((job) => (
                            <Dialog key={job.id}>
                              <DialogTrigger asChild>
                                <div
                                  className={`p-1 rounded text-xs cursor-pointer hover:shadow-sm transition-all border-l-2 ${getStatusColor(
                                    job.status,
                                  )}`}
                                >
                                  <div className="font-medium truncate">
                                    {job.time} {job.service}
                                  </div>
                                  <div className="truncate opacity-75">
                                    {job.customer}
                                  </div>
                                </div>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    {getStatusIcon(job.status)}
                                    {job.service} - {job.id}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Job scheduled for {job.date} at {job.time}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <div className="font-medium text-muted-foreground">
                                        Customer
                                      </div>
                                      <div>{job.customer}</div>
                                    </div>
                                    <div>
                                      <div className="font-medium text-muted-foreground">
                                        Duration
                                      </div>
                                      <div>{job.estimatedDuration}</div>
                                    </div>
                                    <div>
                                      <div className="font-medium text-muted-foreground">
                                        Address
                                      </div>
                                      <div>{job.address}</div>
                                    </div>
                                    <div>
                                      <div className="font-medium text-muted-foreground">
                                        Payment
                                      </div>
                                      <div className="font-bold text-green-600">
                                        ${job.payment}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-medium text-muted-foreground mb-1">
                                      Description
                                    </div>
                                    <div className="text-sm">
                                      {job.description}
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      asChild
                                      size="sm"
                                      className="flex-1"
                                    >
                                      <Link to={`/technician/jobs/${job.id}`}>
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Details
                                      </Link>
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Phone className="w-4 h-4 mr-2" />
                                      Call
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Navigation className="w-4 h-4 mr-2" />
                                      Navigate
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                          {dateJobs.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{dateJobs.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Today's Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Today's Schedule ({formatDate(new Date())})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getJobsForDate(new Date()).length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No jobs today</h3>
                  <p className="text-muted-foreground mb-4">
                    You have a free day! Check for available jobs or take some
                    time to rest.
                  </p>
                  <Button asChild>
                    <Link to="/technician/jobs?filter=pending">
                      <Plus className="w-4 h-4 mr-2" />
                      Browse Available Jobs
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {getJobsForDate(new Date())
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((job) => (
                      <div
                        key={job.id}
                        className={`p-4 rounded-lg border-l-4 ${getStatusColor(job.status)}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getStatusIcon(job.status)}
                              <h4 className="font-semibold">{job.service}</h4>
                              <Badge
                                variant="outline"
                                className={getPriorityColor(job.priority)}
                              >
                                {job.priority} priority
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {job.time} - {job.endTime}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.address}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />${job.payment}
                              </div>
                            </div>
                            <p className="text-sm mt-2">{job.customer}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/technician/jobs/${job.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                Details
                              </Link>
                            </Button>
                            {job.status === "scheduled" && (
                              <Button size="sm">
                                <Play className="w-4 h-4 mr-2" />
                                Start
                              </Button>
                            )}
                            {job.status === "in-progress" && (
                              <Button size="sm">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
