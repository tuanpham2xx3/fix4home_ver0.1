import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/shared/Layout";
import {
  FileText,
  Download,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Calendar,
  Star,
  Wrench,
} from "lucide-react";
// Temporarily disabled recharts for deployment debugging
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

export default function AdminReports() {
  const [timeFilter, setTimeFilter] = useState("month");
  const [isLoading, setIsLoading] = useState(false);

  // Revenue data for charts
  const revenueData = {
    day: [
      { period: "Mon", revenue: 1200, orders: 8 },
      { period: "Tue", revenue: 1800, orders: 12 },
      { period: "Wed", revenue: 900, orders: 6 },
      { period: "Thu", revenue: 2200, orders: 14 },
      { period: "Fri", revenue: 2800, orders: 18 },
      { period: "Sat", revenue: 3200, orders: 22 },
      { period: "Sun", revenue: 1500, orders: 10 },
    ],
    week: [
      { period: "Week 1", revenue: 8500, orders: 52 },
      { period: "Week 2", revenue: 12200, orders: 78 },
      { period: "Week 3", revenue: 9800, orders: 64 },
      { period: "Week 4", revenue: 15400, orders: 96 },
    ],
    month: [
      { period: "Jan", revenue: 25400, orders: 156 },
      { period: "Feb", revenue: 28900, orders: 178 },
      { period: "Mar", revenue: 32100, orders: 203 },
      { period: "Apr", revenue: 29800, orders: 189 },
      { period: "May", revenue: 35600, orders: 234 },
      { period: "Jun", revenue: 38200, orders: 256 },
    ],
  };

  // Service breakdown data
  const serviceBreakdown = [
    { name: "Electrical", revenue: 45600, orders: 234, color: "#3b82f6" },
    { name: "Plumbing", revenue: 38900, orders: 189, color: "#10b981" },
    { name: "HVAC", revenue: 42300, orders: 156, color: "#f59e0b" },
    { name: "Appliance", revenue: 28700, orders: 98, color: "#ef4444" },
    { name: "General", revenue: 15800, orders: 67, color: "#8b5cf6" },
  ];

  // Top technicians data
  const topTechnicians = [
    {
      id: 1,
      name: "John Smith",
      revenue: "$12,450",
      jobs: 78,
      rating: 4.9,
      specialty: "Electrical",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      revenue: "$10,890",
      jobs: 64,
      rating: 4.8,
      specialty: "Plumbing",
    },
    {
      id: 3,
      name: "Mike Johnson",
      revenue: "$9,670",
      jobs: 56,
      rating: 4.7,
      specialty: "HVAC",
    },
    {
      id: 4,
      name: "Lisa Garcia",
      revenue: "$8,340",
      jobs: 48,
      rating: 4.6,
      specialty: "Appliance",
    },
    {
      id: 5,
      name: "David Brown",
      revenue: "$7,920",
      jobs: 42,
      rating: 4.5,
      specialty: "General",
    },
  ];

  // Top customers data
  const topCustomers = [
    {
      id: 1,
      name: "Alice Johnson",
      totalSpent: "$2,450",
      orders: 12,
      joinDate: "2023-03-15",
    },
    {
      id: 2,
      name: "Bob Wilson",
      totalSpent: "$1,890",
      orders: 8,
      joinDate: "2023-05-22",
    },
    {
      id: 3,
      name: "Carol Davis",
      totalSpent: "$1,670",
      orders: 7,
      joinDate: "2023-07-10",
    },
    {
      id: 4,
      name: "David Miller",
      totalSpent: "$1,340",
      orders: 6,
      joinDate: "2023-09-05",
    },
    {
      id: 5,
      name: "Emma Taylor",
      totalSpent: "$1,120",
      orders: 5,
      joinDate: "2023-11-18",
    },
  ];

  // Summary statistics
  const summaryStats = {
    totalRevenue: "$171,300",
    totalOrders: 944,
    averageOrderValue: "$181.46",
    activeCustomers: 523,
    activeTechnicians: 87,
    completionRate: "96.8%",
  };

  const getCurrentData = () => {
    return (
      revenueData[timeFilter as keyof typeof revenueData] || revenueData.month
    );
  };

  const handleExportPDF = () => {
    setIsLoading(true);
    // Simulate PDF export
    setTimeout(() => {
      setIsLoading(false);
      // In real implementation, this would trigger PDF download
      console.log("Exporting PDF report...");
    }, 2000);
  };

  const handleExportExcel = () => {
    setIsLoading(true);
    // Simulate Excel export
    setTimeout(() => {
      setIsLoading(false);
      // In real implementation, this would trigger Excel download
      console.log("Exporting Excel report...");
    }, 2000);
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

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Layout
      breadcrumbs={[
        { label: "Admin Dashboard", href: "/admin/dashboard" },
        { label: "Reports & Analytics" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Reports & Analytics
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive business insights and data visualization
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleExportExcel}
                  disabled={isLoading}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
                <Button onClick={handleExportPDF} disabled={isLoading}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold">
                      {summaryStats.totalRevenue}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold">
                      {summaryStats.totalOrders}
                    </p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg Order Value
                    </p>
                    <p className="text-2xl font-bold">
                      {summaryStats.averageOrderValue}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Customers
                    </p>
                    <p className="text-2xl font-bold">
                      {summaryStats.activeCustomers}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-orange-600" />
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
                    <p className="text-2xl font-bold">
                      {summaryStats.activeTechnicians}
                    </p>
                  </div>
                  <Wrench className="w-8 h-8 text-indigo-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Completion Rate
                    </p>
                    <p className="text-2xl font-bold">
                      {summaryStats.completionRate}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Trend */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Revenue Trend</CardTitle>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      Revenue Chart - deployment debugging
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Orders Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Orders Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      Orders Chart - deployment debugging
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue by Service */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      Service Revenue Chart - deployment debugging
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Service Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Avg. Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceBreakdown.map((service, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: service.color }}
                            />
                            {service.name}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          ${service.revenue.toLocaleString()}
                        </TableCell>
                        <TableCell>{service.orders}</TableCell>
                        <TableCell>
                          ${(service.revenue / service.orders).toFixed(0)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Tabs defaultValue="technicians" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="technicians">Top Technicians</TabsTrigger>
              <TabsTrigger value="customers">Top Customers</TabsTrigger>
            </TabsList>

            <TabsContent value="technicians">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Technicians</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-muted-foreground mt-2">Loading...</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>Technician</TableHead>
                          <TableHead>Specialty</TableHead>
                          <TableHead>Jobs Completed</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Rating</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topTechnicians.map((tech, index) => (
                          <TableRow key={tech.id}>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  index === 0
                                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                    : index === 1
                                      ? "bg-gray-100 text-gray-800 border-gray-200"
                                      : index === 2
                                        ? "bg-orange-100 text-orange-800 border-orange-200"
                                        : "bg-blue-100 text-blue-800 border-blue-200"
                                }
                              >
                                #{index + 1}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                  <Wrench className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-medium">{tech.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {tech.specialty}
                              </Badge>
                            </TableCell>
                            <TableCell>{tech.jobs}</TableCell>
                            <TableCell className="font-medium text-green-600">
                              {tech.revenue}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <div className="flex">
                                  {renderStars(tech.rating)}
                                </div>
                                <span className="text-xs ml-1">
                                  {tech.rating}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers">
              <Card>
                <CardHeader>
                  <CardTitle>Top Customers by Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-muted-foreground mt-2">Loading...</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Total Spent</TableHead>
                          <TableHead>Orders</TableHead>
                          <TableHead>Avg. Order Value</TableHead>
                          <TableHead>Member Since</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topCustomers.map((customer, index) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  index === 0
                                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                    : index === 1
                                      ? "bg-gray-100 text-gray-800 border-gray-200"
                                      : index === 2
                                        ? "bg-orange-100 text-orange-800 border-orange-200"
                                        : "bg-blue-100 text-blue-800 border-blue-200"
                                }
                              >
                                #{index + 1}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                  <Users className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-medium">
                                  {customer.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-green-600">
                              {customer.totalSpent}
                            </TableCell>
                            <TableCell>{customer.orders}</TableCell>
                            <TableCell>
                              $
                              {(
                                parseFloat(
                                  customer.totalSpent
                                    .replace("$", "")
                                    .replace(",", ""),
                                ) / customer.orders
                              ).toFixed(0)}
                            </TableCell>
                            <TableCell>
                              {new Date(customer.joinDate).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
