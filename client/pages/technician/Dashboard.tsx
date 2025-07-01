import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Layout from "@/components/shared/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Calendar,
  Clock,
  CheckCircle,
  DollarSign,
  MapPin,
  Phone,
  Wrench,
  Star,
  TrendingUp,
  Eye,
  Bell,
  Settings,
  LogOut,
  Menu,
  CalendarDays,
  Plus,
  AlertCircle,
  Briefcase,
  BarChart3,
  FileText,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function TechnicianDashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "job_alert",
      title: "New Job Available",
      message: "Kitchen sink repair in your area - $85",
      time: "5 minutes ago",
      isRead: false,
    },
    {
      id: 2,
      type: "schedule_update",
      title: "Schedule Update",
      message: "Job JOB-002 time changed to 2:30 PM",
      time: "1 hour ago",
      isRead: false,
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      message: "Payment of $120 received for JOB-001",
      time: "2 hours ago",
      isRead: true,
    },
  ]);

  // Mock data - in a real app, this would come from an API
  const dashboardStats = {
    totalJobs: 156,
    jobsInProgress: 3,
    upcomingJobs: 7,
    weeklyEarnings: 1840,
    monthlyEarnings: 7650,
    rating: 4.8,
    completionRate: 94,
  };

  const recentJobs = [
    {
      id: "JOB-001",
      service: "AC Repair",
      customer: "Jane Smith",
      time: "09:00 AM",
      date: "Today",
      address: "123 Main St, Apt 4B",
      status: "scheduled",
      payment: "$120",
      priority: "high",
    },
    {
      id: "JOB-002",
      service: "Plumbing Fix",
      customer: "Bob Johnson",
      time: "02:00 PM",
      date: "Today",
      address: "456 Oak Ave",
      status: "in-progress",
      payment: "$85",
      priority: "medium",
    },
    {
      id: "JOB-003",
      service: "Electrical Inspection",
      customer: "Alice Wilson",
      time: "04:30 PM",
      date: "Today",
      address: "789 Pine Road",
      status: "scheduled",
      payment: "$95",
      priority: "low",
    },
    {
      id: "JOB-004",
      service: "Appliance Repair",
      customer: "Mike Davis",
      time: "10:00 AM",
      date: "Tomorrow",
      address: "321 Elm Street",
      status: "scheduled",
      payment: "$110",
      priority: "medium",
    },
    {
      id: "JOB-005",
      service: "HVAC Maintenance",
      customer: "Sarah Johnson",
      time: "03:00 PM",
      date: "Tomorrow",
      address: "654 Maple Ave",
      status: "scheduled",
      payment: "$150",
      priority: "low",
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

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

  return (
    <Layout breadcrumbs={[{ label: "Technician Dashboard" }]}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-950 dark:to-teal-900">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground">
              Manage your jobs and track your earnings
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Today's Jobs
                    </p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Completed This Week
                    </p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Weekly Earnings
                    </p>
                    <p className="text-2xl font-bold">$1,840</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Average Rating
                    </p>
                    <p className="text-2xl font-bold">4.8</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Today's Jobs */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Today's Jobs</CardTitle>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/technician/jobs">
                      <Eye className="w-4 h-4 mr-2" />
                      View All
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayJobs.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(job.status)}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium">{job.service}</p>
                              <Badge
                                variant="outline"
                                className={getPriorityColor(job.priority)}
                              >
                                {job.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {job.customer} • {job.time}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {job.address}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-lg">{job.payment}</p>
                          <Badge
                            variant="outline"
                            className={getStatusColor(job.status)}
                          >
                            {job.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Performance */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full" size="lg">
                    <Link to="/technician/jobs">
                      <Wrench className="w-4 h-4 mr-2" />
                      View All Jobs
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <Link to="/technician/profile">
                      <User className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <Link to="/technician/earnings">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Earnings
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Performance This Week */}
              <Card>
                <CardHeader>
                  <CardTitle>This Week's Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Jobs Completed
                    </span>
                    <span className="font-medium">12/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Customer Satisfaction
                    </span>
                    <span className="font-medium">4.8/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "96%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Response Time
                    </span>
                    <span className="font-medium">Excellent</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600">
                    Support Hotline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Need help with a job? Contact our technician support:
                    </p>
                    <Button variant="outline" className="w-full" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Support: 1900-5678
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
