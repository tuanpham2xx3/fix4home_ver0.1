import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/shared/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  Wrench,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Eye,
  UserCheck,
  Settings,
  BarChart3,
  Shield,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();

  const recentActivity = [
    {
      id: 1,
      type: "user_registration",
      message: "New technician registered: John Smith",
      timestamp: "2 minutes ago",
      priority: "low",
    },
    {
      id: 2,
      type: "job_completion",
      message: "Job #JOB-001 completed successfully",
      timestamp: "15 minutes ago",
      priority: "normal",
    },
    {
      id: 3,
      type: "payment_issue",
      message: "Payment failed for order #ORD-123",
      timestamp: "1 hour ago",
      priority: "high",
    },
    {
      id: 4,
      type: "rating",
      message: "Customer rated service 5 stars",
      timestamp: "2 hours ago",
      priority: "low",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return <UserCheck className="w-4 h-4 text-blue-600" />;
      case "job_completion":
        return <Wrench className="w-4 h-4 text-green-600" />;
      case "payment_issue":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "rating":
        return <Star className="w-4 h-4 text-yellow-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Layout breadcrumbs={[{ label: "Admin Dashboard" }]}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Monitor and manage the FIX4HOME
              platform
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">2,847</p>
                    <p className="text-xs text-green-600">+12% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Technicians
                    </p>
                    <p className="text-2xl font-bold">184</p>
                    <p className="text-xs text-green-600">+8% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Monthly Revenue
                    </p>
                    <p className="text-2xl font-bold">$89,420</p>
                    <p className="text-xs text-green-600">+15% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Success Rate
                    </p>
                    <p className="text-2xl font-bold">97.2%</p>
                    <p className="text-xs text-green-600">+2.1% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Activity</CardTitle>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/admin/activity">
                      <Eye className="w-4 h-4 mr-2" />
                      View All
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          {getActivityIcon(activity.type)}
                          <div>
                            <p className="font-medium">{activity.message}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(activity.priority)}
                        >
                          {activity.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & System Status */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full" size="lg">
                    <Link to="/admin/users">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <Link to="/admin/technicians">
                      <Wrench className="w-4 h-4 mr-2" />
                      View Technicians
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <Link to="/admin/analytics">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <Link to="/admin/settings">
                      <Settings className="w-4 h-4 mr-2" />
                      System Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Server Status
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      Operational
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Database
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      Healthy
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Payment System
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      Connected
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      API Response
                    </span>
                    <span className="text-sm font-medium">125ms avg</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Uptime
                    </span>
                    <span className="text-sm font-medium">99.9%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Security Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Failed Login Attempts</span>
                      <Badge variant="outline" className="bg-yellow-100">
                        3 today
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Suspicious Activity</span>
                      <Badge variant="outline" className="bg-green-100">
                        None
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Updates</span>
                      <Badge variant="outline" className="bg-blue-100">
                        Up to date
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View Security Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Top Performing Technicians */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Top Performing Technicians This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: "John Smith",
                    jobs: 47,
                    rating: 4.9,
                    earnings: "$2,340",
                  },
                  {
                    name: "Sarah Wilson",
                    jobs: 42,
                    rating: 4.8,
                    earnings: "$2,180",
                  },
                  {
                    name: "Mike Johnson",
                    jobs: 39,
                    rating: 4.7,
                    earnings: "$1,950",
                  },
                ].map((tech, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{tech.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-muted-foreground">
                            {tech.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Jobs Completed:</span>
                        <span className="font-medium text-foreground">
                          {tech.jobs}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Earnings:</span>
                        <span className="font-medium text-green-600">
                          {tech.earnings}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
