import React, { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/shared/Layout";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Star,
  Briefcase,
  Clock,
  Award,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Users,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";

export default function TechnicianStatistics() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month");
  const [chartType, setChartType] = useState("earnings");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");

  // Mock data for charts and statistics
  const earningsData = {
    daily: [
      { date: "Jan 1", earnings: 120, jobs: 2 },
      { date: "Jan 2", earnings: 85, jobs: 1 },
      { date: "Jan 3", earnings: 200, jobs: 3 },
      { date: "Jan 4", earnings: 150, jobs: 2 },
      { date: "Jan 5", earnings: 95, jobs: 1 },
      { date: "Jan 6", earnings: 180, jobs: 3 },
      { date: "Jan 7", earnings: 110, jobs: 2 },
    ],
    weekly: [
      { date: "Week 1", earnings: 850, jobs: 12 },
      { date: "Week 2", earnings: 1200, jobs: 16 },
      { date: "Week 3", earnings: 950, jobs: 14 },
      { date: "Week 4", earnings: 1400, jobs: 18 },
    ],
    monthly: [
      { date: "Sep", earnings: 4200, jobs: 56 },
      { date: "Oct", earnings: 4800, jobs: 64 },
      { date: "Nov", earnings: 5200, jobs: 68 },
      { date: "Dec", earnings: 5800, jobs: 72 },
      { date: "Jan", earnings: 6200, jobs: 78 },
    ],
  };

  const jobTypeData = [
    { name: "HVAC", value: 35, count: 42, color: "#3b82f6" },
    { name: "Electrical", value: 25, count: 30, color: "#f59e0b" },
    { name: "Plumbing", value: 20, count: 24, color: "#10b981" },
    { name: "Appliances", value: 15, count: 18, color: "#8b5cf6" },
    { name: "Other", value: 5, count: 6, color: "#ef4444" },
  ];

  const performanceData = [
    { metric: "Response Time", current: 1.2, target: 2, unit: "hours" },
    { metric: "Customer Rating", current: 4.8, target: 4.5, unit: "stars" },
    { metric: "Job Completion", current: 94, target: 90, unit: "%" },
    { metric: "Revenue Growth", current: 15, target: 10, unit: "%" },
  ];

  const monthlyTrends = [
    {
      month: "Sep",
      totalEarnings: 4200,
      avgRating: 4.6,
      jobsCompleted: 56,
      responseTime: 1.8,
    },
    {
      month: "Oct",
      totalEarnings: 4800,
      avgRating: 4.7,
      jobsCompleted: 64,
      responseTime: 1.5,
    },
    {
      month: "Nov",
      totalEarnings: 5200,
      avgRating: 4.8,
      jobsCompleted: 68,
      responseTime: 1.3,
    },
    {
      month: "Dec",
      totalEarnings: 5800,
      avgRating: 4.8,
      jobsCompleted: 72,
      responseTime: 1.2,
    },
    {
      month: "Jan",
      totalEarnings: 6200,
      avgRating: 4.8,
      jobsCompleted: 78,
      responseTime: 1.2,
    },
  ];

  const summaryStats = {
    totalEarnings: 26200,
    thisMonthEarnings: 6200,
    totalJobs: 338,
    thisMonthJobs: 78,
    averageRating: 4.8,
    totalReviews: 312,
    completionRate: 94,
    responseTime: 1.2,
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const getCurrentData = () => {
    switch (timeRange) {
      case "day":
        return earningsData.daily;
      case "week":
        return earningsData.weekly;
      case "month":
        return earningsData.monthly;
      default:
        return earningsData.monthly;
    }
  };

  const getEarningsChange = () => {
    const data = getCurrentData();
    if (data.length < 2) return { change: 0, isPositive: true };

    const current = data[data.length - 1].earnings;
    const previous = data[data.length - 2].earnings;
    const change = ((current - previous) / previous) * 100;

    return {
      change: Math.abs(change).toFixed(1),
      isPositive: change >= 0,
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatValue = (value: number, unit: string) => {
    switch (unit) {
      case "hours":
        return `${value} hrs`;
      case "stars":
        return `${value}/5`;
      case "%":
        return `${value}%`;
      default:
        return value.toString();
    }
  };

  const getPerformanceColor = (
    current: number,
    target: number,
    unit: string,
  ) => {
    const isGood = unit === "hours" ? current <= target : current >= target;
    return isGood ? "text-green-600" : "text-orange-600";
  };

  const earningsChange = getEarningsChange();

  if (isLoading) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Technician Dashboard", href: "/technician/dashboard" },
          { label: "Statistics" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <Skeleton className="h-10 w-48 mb-4" />
              <Skeleton className="h-6 w-96" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-64 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      breadcrumbs={[
        { label: "Technician Dashboard", href: "/technician/dashboard" },
        { label: "Performance Analytics" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Performance Analytics
                </h1>
                <p className="text-muted-foreground">
                  Track your earnings, job performance, and growth metrics
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Earnings
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(summaryStats.totalEarnings)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {earningsChange.isPositive ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm ${
                          earningsChange.isPositive
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {earningsChange.change}% this {timeRange}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Completed Jobs
                    </p>
                    <p className="text-2xl font-bold">
                      {summaryStats.totalJobs}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {summaryStats.thisMonthJobs} this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Average Rating
                    </p>
                    <p className="text-2xl font-bold flex items-center gap-1">
                      {summaryStats.averageRating}
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {summaryStats.totalReviews} reviews
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Response Time
                    </p>
                    <p className="text-2xl font-bold">
                      {summaryStats.responseTime}h
                    </p>
                    <p className="text-sm text-green-600">Excellent</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Time Range
                    </label>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Daily</SelectItem>
                        <SelectItem value="week">Weekly</SelectItem>
                        <SelectItem value="month">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Job Type
                    </label>
                    <Select
                      value={jobTypeFilter}
                      onValueChange={setJobTypeFilter}
                    >
                      <SelectTrigger className="w-48">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        <SelectItem value="hvac">HVAC</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="appliances">Appliances</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Tabs value={chartType} onValueChange={setChartType}>
                  <TabsList>
                    <TabsTrigger value="earnings">Earnings</TabsTrigger>
                    <TabsTrigger value="jobs">Jobs</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    {chartType === "earnings"
                      ? "Earnings Overview"
                      : chartType === "jobs"
                        ? "Jobs Completed"
                        : "Performance Trends"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {chartType === "earnings" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={getCurrentData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [
                              formatCurrency(Number(value)),
                              "Earnings",
                            ]}
                          />
                          <Area
                            type="monotone"
                            dataKey="earnings"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.1}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}

                    {chartType === "jobs" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getCurrentData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [value, "Jobs Completed"]}
                          />
                          <Bar dataKey="jobs" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}

                    {chartType === "performance" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="avgRating"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            name="Avg Rating"
                          />
                          <Line
                            type="monotone"
                            dataKey="responseTime"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            name="Response Time (hrs)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {performanceData.map((metric) => (
                      <div key={metric.metric} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            {metric.metric}
                          </span>
                          <span
                            className={`text-sm font-bold ${getPerformanceColor(
                              metric.current,
                              metric.target,
                              metric.unit,
                            )}`}
                          >
                            {formatValue(metric.current, metric.unit)}
                          </span>
                        </div>
                        <Progress
                          value={
                            metric.unit === "hours"
                              ? Math.max(
                                  0,
                                  100 - (metric.current / metric.target) * 100,
                                )
                              : (metric.current / metric.target) * 100
                          }
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          Target: {formatValue(metric.target, metric.unit)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5" />
                    Job Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={jobTypeData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name} ${value}%`}
                        >
                          {jobTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [
                            `${value}% (${
                              jobTypeData.find((d) => d.name === name)?.count
                            } jobs)`,
                            name,
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      This Month Earnings
                    </span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(summaryStats.thisMonthEarnings)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Completion Rate
                    </span>
                    <span className="font-bold">
                      {summaryStats.completionRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Avg Job Value
                    </span>
                    <span className="font-bold">
                      {formatCurrency(
                        summaryStats.totalEarnings / summaryStats.totalJobs,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Customer Satisfaction
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-bold">
                        {summaryStats.averageRating}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Growth Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle>Growth Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Revenue Growth</span>
                    <Badge className="bg-green-100 text-green-800">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +15%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Job Volume</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Rating</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +0.2
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <Badge className="bg-green-100 text-green-800">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      -20%
                    </Badge>
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
