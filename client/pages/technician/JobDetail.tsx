import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Layout from "@/components/shared/Layout";
import {
  Calendar,
  Clock,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Star,
  User,
  Navigation,
  MessageSquare,
  FileText,
  AlertCircle,
  Play,
  Square,
  ArrowRight,
  Camera,
  Upload,
  History,
  Shield,
  XCircle,
  CheckCircle2,
  Timer,
  MapIcon,
  ExternalLink,
} from "lucide-react";

export default function TechnicianJobDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<any>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusUpdateNotes, setStatusUpdateNotes] = useState("");

  // Mock job data - in a real app, this would come from an API
  const mockJob = {
    id: "JOB-001",
    service: "AC Repair",
    description:
      "AC unit not cooling properly, needs diagnostic and repair. Customer reports that the unit has been making strange noises and the air coming out is not cold enough. System installed 3 years ago, no recent maintenance.",
    customer: {
      name: "Jane Smith",
      phone: "+1 (555) 123-4567",
      email: "jane.smith@email.com",
      address: "123 Main St, Apt 4B, Downtown, CA 90210",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Jane%20Smith",
      orderHistory: [
        {
          id: "JOB-098",
          service: "Plumbing Fix",
          date: "2023-11-15",
          status: "completed",
          rating: 5,
        },
        {
          id: "JOB-076",
          service: "Electrical Inspection",
          date: "2023-08-22",
          status: "completed",
          rating: 4,
        },
        {
          id: "JOB-054",
          service: "HVAC Maintenance",
          date: "2023-05-10",
          status: "completed",
          rating: 5,
        },
      ],
    },
    status: "scheduled",
    priority: "high",
    date: "2024-01-25",
    time: "09:00 AM",
    estimatedDuration: "2 hours",
    payment: 120,
    location: {
      address: "123 Main St, Apt 4B, Downtown, CA 90210",
      coordinates: { lat: 34.0522, lng: -118.2437 },
      distance: "2.3 miles from your location",
      accessNotes:
        "Apartment building - buzz unit 4B at main entrance. Parking available on street.",
    },
    timeline: [
      {
        status: "accepted",
        title: "Job Accepted",
        description: "You accepted this job request",
        timestamp: "2024-01-24 03:30 PM",
        completed: true,
      },
      {
        status: "scheduled",
        title: "Job Scheduled",
        description: "Job scheduled for January 25th at 9:00 AM",
        timestamp: "2024-01-24 03:45 PM",
        completed: true,
        current: true,
      },
      {
        status: "in-progress",
        title: "Work In Progress",
        description: "Arrived at location and started work",
        timestamp: "",
        completed: false,
      },
      {
        status: "completed",
        title: "Job Completed",
        description: "Work finished and customer satisfied",
        timestamp: "",
        completed: false,
      },
      {
        status: "reviewed",
        title: "Customer Review",
        description: "Customer provided feedback and rating",
        timestamp: "",
        completed: false,
      },
    ],
    notes: [
      {
        id: 1,
        author: "System",
        content:
          "Job automatically assigned based on your skills and location.",
        timestamp: "2024-01-24 03:30 PM",
        type: "system",
      },
      {
        id: 2,
        author: "Jane Smith",
        content:
          "Hi! The AC has been having issues for the past week. It's making a rattling sound and barely cooling. Please bring any replacement parts you think might be needed.",
        timestamp: "2024-01-24 04:15 PM",
        type: "customer",
      },
    ],
    customerFeedback: null, // No feedback yet since job not completed
    specialInstructions:
      "Customer prefers morning appointments. Building requires buzzing for entry. Parking can be challenging during rush hours.",
    requiredTools: [
      "Multimeter",
      "Refrigerant gauges",
      "Basic hand tools",
      "Replacement capacitors",
    ],
    photos: [],
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setJob(mockJob);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="w-5 h-5 text-orange-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
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
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
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

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdatingStatus(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update job status and timeline
    const updatedJob = { ...job };
    updatedJob.status = newStatus;

    // Update timeline
    const currentIndex = updatedJob.timeline.findIndex(
      (item: any) => item.current,
    );
    if (currentIndex !== -1) {
      updatedJob.timeline[currentIndex].current = false;
      updatedJob.timeline[currentIndex].completed = true;
      updatedJob.timeline[currentIndex].timestamp = new Date().toLocaleString();

      if (currentIndex < updatedJob.timeline.length - 1) {
        updatedJob.timeline[currentIndex + 1].current = true;
        if (newStatus === updatedJob.timeline[currentIndex + 1].status) {
          updatedJob.timeline[currentIndex + 1].completed = true;
          updatedJob.timeline[currentIndex + 1].timestamp =
            new Date().toLocaleString();
        }
      }
    }

    setJob(updatedJob);
    setIsUpdatingStatus(false);
    setStatusUpdateNotes("");
  };

  const getNextAction = () => {
    switch (job?.status) {
      case "scheduled":
        return { action: "Start Job", nextStatus: "in-progress", icon: Play };
      case "in-progress":
        return {
          action: "Complete Job",
          nextStatus: "completed",
          icon: CheckCircle2,
        };
      default:
        return null;
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

  if (isLoading) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Technician Dashboard", href: "/technician/dashboard" },
          { label: "My Jobs", href: "/technician/jobs" },
          { label: "Job Details" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <Skeleton className="h-10 w-64 mb-4" />
              <Skeleton className="h-6 w-96" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-32 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="space-y-6">
                {[...Array(2)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-24 w-full" />
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

  if (!job) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Technician Dashboard", href: "/technician/dashboard" },
          { label: "My Jobs", href: "/technician/jobs" },
          { label: "Job Details" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="p-12 text-center">
                <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Job Not Found</h3>
                <p className="text-muted-foreground mb-6">
                  The job you're looking for could not be found.
                </p>
                <Button asChild>
                  <Link to="/technician/jobs">Back to Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  const nextAction = getNextAction();

  return (
    <Layout
      breadcrumbs={[
        { label: "Technician Dashboard", href: "/technician/dashboard" },
        { label: "My Jobs", href: "/technician/jobs" },
        { label: `Job ${job.id}` },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {job.service} - {job.id}
                </h1>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={getStatusColor(job.status)}
                  >
                    {getStatusIcon(job.status)}
                    <span className="ml-2">{job.status.replace("-", " ")}</span>
                  </Badge>
                  <Badge
                    variant="outline"
                    className={getPriorityColor(job.priority)}
                  >
                    {job.priority} priority
                  </Badge>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {job.date} at {job.time}
                  </span>
                </div>
              </div>

              {nextAction &&
                job.status !== "completed" &&
                job.status !== "cancelled" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" disabled={isUpdatingStatus}>
                        <nextAction.icon className="w-5 h-5 mr-2" />
                        {nextAction.action}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Job Status</DialogTitle>
                        <DialogDescription>
                          Are you ready to {nextAction.action.toLowerCase()}?
                          You can add optional notes below.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="notes">Notes (Optional)</Label>
                          <Textarea
                            id="notes"
                            placeholder="Add any notes about this status update..."
                            value={statusUpdateNotes}
                            onChange={(e) =>
                              setStatusUpdateNotes(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() =>
                            handleStatusUpdate(nextAction.nextStatus)
                          }
                          disabled={isUpdatingStatus}
                        >
                          {isUpdatingStatus
                            ? "Updating..."
                            : `${nextAction.action}`}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Job Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Service
                        </Label>
                        <p className="text-lg font-semibold">{job.service}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Job ID
                        </Label>
                        <p className="font-mono">{job.id}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Priority
                        </Label>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(job.priority)}
                        >
                          {job.priority} priority
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Date & Time
                        </Label>
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {job.date} at {job.time}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Duration
                        </Label>
                        <p className="flex items-center gap-2">
                          <Timer className="w-4 h-4" />
                          {job.estimatedDuration}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Payment
                        </Label>
                        <p className="text-xl font-bold text-green-600">
                          ${job.payment}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Description
                    </Label>
                    <p className="text-foreground mt-2">{job.description}</p>
                  </div>

                  {job.specialInstructions && (
                    <>
                      <Separator />
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Special Instructions
                        </Label>
                        <Alert className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            {job.specialInstructions}
                          </AlertDescription>
                        </Alert>
                      </div>
                    </>
                  )}

                  {job.requiredTools && job.requiredTools.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Required Tools
                        </Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {job.requiredTools.map(
                            (tool: string, index: number) => (
                              <Badge key={index} variant="secondary">
                                {tool}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Location Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapIcon className="w-5 h-5" />
                    Location Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">{job.location.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {job.location.distance}
                      </p>
                    </div>
                  </div>

                  {job.location.accessNotes && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <Label className="text-sm font-medium">
                        Access Notes
                      </Label>
                      <p className="text-sm mt-1">{job.location.accessNotes}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Map
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Job Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Job Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {job.timeline.map((item: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                            item.completed
                              ? "bg-green-100 border-green-500 text-green-700"
                              : item.current
                                ? "bg-blue-100 border-blue-500 text-blue-700"
                                : "bg-gray-100 border-gray-300 text-gray-500"
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : item.current ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-current" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`font-medium ${
                                item.completed
                                  ? "text-green-700"
                                  : item.current
                                    ? "text-blue-700"
                                    : "text-gray-500"
                              }`}
                            >
                              {item.title}
                            </h4>
                            {item.current && (
                              <Badge variant="outline" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          {item.timestamp && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.timestamp}
                            </p>
                          )}
                        </div>
                        {index < job.timeline.length - 1 && (
                          <div
                            className={`absolute left-4 mt-8 w-0.5 h-6 ${
                              item.completed ? "bg-green-300" : "bg-gray-300"
                            }`}
                            style={{ marginLeft: "15px" }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Feedback */}
              {job.status === "completed" && job.customerFeedback && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Customer Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Rating:</span>
                        <div className="flex">
                          {renderStars(job.customerFeedback.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({job.customerFeedback.rating}/5)
                        </span>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Review
                        </Label>
                        <p className="mt-1">{job.customerFeedback.review}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Submitted on {job.customerFeedback.date}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={job.customer.avatar} />
                      <AvatarFallback>
                        {job.customer.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{job.customer.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Verified Customer
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{job.customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{job.customer.email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">{job.customer.address}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Order History */}
              {job.customer.orderHistory &&
                job.customer.orderHistory.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <History className="w-5 h-5" />
                        Order History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {job.customer.orderHistory
                          .slice(0, 3)
                          .map((order: any) => (
                            <div
                              key={order.id}
                              className="flex items-center justify-between text-sm"
                            >
                              <div>
                                <p className="font-medium">{order.service}</p>
                                <p className="text-muted-foreground">
                                  {order.date}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {order.status}
                                </Badge>
                                {order.rating && (
                                  <div className="flex">
                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                    <span className="text-xs ml-1">
                                      {order.rating}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        {job.customer.orderHistory.length > 3 && (
                          <p className="text-xs text-muted-foreground text-center">
                            +{job.customer.orderHistory.length - 3} more orders
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Documents
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
