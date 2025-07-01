import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/shared/Layout";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  Calendar,
  Filter,
  Search,
  TrendingUp,
  Award,
  Eye,
  MoreHorizontal,
  ExternalLink,
  User,
  CheckCircle,
} from "lucide-react";

interface Review {
  id: string;
  jobId: string;
  customer: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  rating: number;
  review: string;
  date: string;
  service: string;
  helpful: number;
  response?: string;
  photos?: string[];
  jobDetails: {
    completedDate: string;
    duration: string;
    payment: number;
  };
}

export default function TechnicianReviews() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const itemsPerPage = 10;

  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: "REV-001",
      jobId: "JOB-001",
      customer: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Jane%20Smith",
        verified: true,
      },
      rating: 5,
      review:
        "Excellent service! Alex was very professional and fixed our AC unit quickly. He explained everything clearly and even gave us maintenance tips. Highly recommend!",
      date: "2024-01-20",
      service: "AC Repair",
      helpful: 8,
      response:
        "Thank you so much for the wonderful review, Jane! I'm glad I could help get your AC running smoothly again. Don't hesitate to reach out if you need any other assistance.",
      jobDetails: {
        completedDate: "2024-01-20",
        duration: "2 hours",
        payment: 120,
      },
    },
    {
      id: "REV-002",
      jobId: "JOB-002",
      customer: {
        name: "Bob Johnson",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Bob%20Johnson",
        verified: true,
      },
      rating: 4,
      review:
        "Good work on the plumbing repair. Arrived on time and got the job done efficiently. Only minor issue was some cleanup could have been better, but overall satisfied with the service.",
      date: "2024-01-18",
      service: "Plumbing Fix",
      helpful: 5,
      jobDetails: {
        completedDate: "2024-01-18",
        duration: "1.5 hours",
        payment: 85,
      },
    },
    {
      id: "REV-003",
      jobId: "JOB-003",
      customer: {
        name: "Alice Wilson",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Alice%20Wilson",
        verified: true,
      },
      rating: 5,
      review:
        "Outstanding electrical inspection! Very thorough and detailed report. Alex identified several potential issues and provided cost-effective solutions. Professional and knowledgeable.",
      date: "2024-01-15",
      service: "Electrical Inspection",
      helpful: 12,
      response:
        "Thank you for the detailed feedback, Alice! Safety is always my top priority, and I'm glad I could help identify those issues before they became bigger problems.",
      photos: ["inspection1.jpg", "inspection2.jpg"],
      jobDetails: {
        completedDate: "2024-01-15",
        duration: "1 hour",
        payment: 95,
      },
    },
    {
      id: "REV-004",
      jobId: "JOB-004",
      customer: {
        name: "Mike Davis",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Mike%20Davis",
        verified: false,
      },
      rating: 3,
      review:
        "Service was okay. Fixed the washing machine but took longer than expected. Communication could be improved - would have liked more updates during the repair process.",
      date: "2024-01-12",
      service: "Appliance Repair",
      helpful: 2,
      jobDetails: {
        completedDate: "2024-01-12",
        duration: "3 hours",
        payment: 110,
      },
    },
    {
      id: "REV-005",
      jobId: "JOB-005",
      customer: {
        name: "Sarah Johnson",
        avatar:
          "https://api.dicebear.com/7.x/initials/svg?seed=Sarah%20Johnson",
        verified: true,
      },
      rating: 5,
      review:
        "Fantastic HVAC maintenance service! Alex was punctual, thorough, and very knowledgeable. He explained the maintenance process step by step and provided great energy-saving tips. Will definitely book again!",
      date: "2024-01-10",
      service: "HVAC Maintenance",
      helpful: 15,
      response:
        "Thank you, Sarah! Regular maintenance is key to keeping your HVAC system running efficiently. I'm happy I could help improve your system's performance.",
      jobDetails: {
        completedDate: "2024-01-10",
        duration: "2.5 hours",
        payment: 150,
      },
    },
    {
      id: "REV-006",
      jobId: "JOB-006",
      customer: {
        name: "Tom Wilson",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Tom%20Wilson",
        verified: true,
      },
      rating: 4,
      review:
        "Very reliable technician. Fixed our water heater issue same day. Price was fair and work quality was good. Appreciated the warranty on the repair work.",
      date: "2024-01-08",
      service: "Water Heater Repair",
      helpful: 7,
      jobDetails: {
        completedDate: "2024-01-08",
        duration: "2 hours",
        payment: 180,
      },
    },
    {
      id: "REV-007",
      jobId: "JOB-007",
      customer: {
        name: "Emma Brown",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Emma%20Brown",
        verified: true,
      },
      rating: 5,
      review:
        "Amazing lighting installation! Alex helped us choose the perfect LED fixtures and the installation was flawless. The room looks incredible now. Highly professional and creative suggestions.",
      date: "2024-01-05",
      service: "Lighting Installation",
      helpful: 9,
      response:
        "So glad you love the new lighting, Emma! It was a pleasure working with you on this project. The LED fixtures will save you energy for years to come.",
      jobDetails: {
        completedDate: "2024-01-05",
        duration: "1.5 hours",
        payment: 75,
      },
    },
    {
      id: "REV-008",
      jobId: "JOB-008",
      customer: {
        name: "Chris Lee",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Chris%20Lee",
        verified: true,
      },
      rating: 4,
      review:
        "Good dishwasher repair service. Problem was diagnosed quickly and fixed properly. Alex was friendly and professional. Only improvement would be earlier appointment availability.",
      date: "2024-01-03",
      service: "Dishwasher Repair",
      helpful: 4,
      jobDetails: {
        completedDate: "2024-01-03",
        duration: "1 hour",
        payment: 90,
      },
    },
  ];

  // Summary statistics
  const summaryStats = {
    totalReviews: mockReviews.length,
    averageRating: 4.4,
    ratingDistribution: {
      5: mockReviews.filter((r) => r.rating === 5).length,
      4: mockReviews.filter((r) => r.rating === 4).length,
      3: mockReviews.filter((r) => r.rating === 3).length,
      2: mockReviews.filter((r) => r.rating === 2).length,
      1: mockReviews.filter((r) => r.rating === 1).length,
    },
    totalHelpful: mockReviews.reduce((sum, review) => sum + review.helpful, 0),
    responseRate: Math.round(
      (mockReviews.filter((r) => r.response).length / mockReviews.length) * 100,
    ),
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setReviews(mockReviews);
      setFilteredReviews(mockReviews);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = [...reviews];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.customer.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          review.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.jobId.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply rating filter
    if (ratingFilter !== "all") {
      filtered = filtered.filter(
        (review) => review.rating === parseInt(ratingFilter),
      );
    }

    // Apply service filter
    if (serviceFilter !== "all") {
      filtered = filtered.filter((review) =>
        review.service.toLowerCase().includes(serviceFilter.toLowerCase()),
      );
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "quarter":
          filterDate.setMonth(now.getMonth() - 3);
          break;
      }

      filtered = filtered.filter(
        (review) => new Date(review.date) >= filterDate,
      );
    }

    setFilteredReviews(filtered);
    setCurrentPage(1);
  }, [searchTerm, ratingFilter, serviceFilter, dateFilter, reviews]);

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Technician Dashboard", href: "/technician/dashboard" },
          { label: "Reviews" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <Skeleton className="h-10 w-48 mb-4" />
              <Skeleton className="h-6 w-96" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="space-y-6">
                {[...Array(2)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-32 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="lg:col-span-3 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Skeleton className="h-10 flex-1" />
                      <Skeleton className="h-10 w-32" />
                      <Skeleton className="h-10 w-32" />
                    </div>
                  </CardContent>
                </Card>
                {[...Array(5)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
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

  return (
    <Layout
      breadcrumbs={[
        { label: "Technician Dashboard", href: "/technician/dashboard" },
        { label: "Customer Reviews" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Customer Reviews
                </h1>
                <p className="text-muted-foreground">
                  Track customer feedback and improve your service quality
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold">
                    {summaryStats.averageRating}
                  </span>
                  <span className="text-muted-foreground">
                    ({summaryStats.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Rating Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Rating Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {summaryStats.averageRating}
                    </div>
                    <div className="flex justify-center mb-2">
                      {renderStars(Math.round(summaryStats.averageRating))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {summaryStats.totalReviews} reviews
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm w-3">{rating}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Progress
                          value={
                            (summaryStats.ratingDistribution[
                              rating as keyof typeof summaryStats.ratingDistribution
                            ] /
                              summaryStats.totalReviews) *
                            100
                          }
                          className="flex-1 h-2"
                        />
                        <span className="text-sm text-muted-foreground w-8">
                          {
                            summaryStats.ratingDistribution[
                              rating as keyof typeof summaryStats.ratingDistribution
                            ]
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Performance Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Response Rate
                    </span>
                    <span className="font-bold">
                      {summaryStats.responseRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Helpful Votes
                    </span>
                    <span className="font-bold">
                      {summaryStats.totalHelpful}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      5-Star Reviews
                    </span>
                    <span className="font-bold text-green-600">
                      {Math.round(
                        (summaryStats.ratingDistribution[5] /
                          summaryStats.totalReviews) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Avg Response Time
                    </span>
                    <span className="font-bold">2.3 hours</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select
                      value={ratingFilter}
                      onValueChange={setRatingFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={serviceFilter}
                      onValueChange={setServiceFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        <SelectItem value="hvac">HVAC</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="appliance">Appliance</SelectItem>
                        <SelectItem value="lighting">Lighting</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                        <SelectItem value="quarter">Last 3 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              {currentReviews.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No Reviews Found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm ||
                      ratingFilter !== "all" ||
                      serviceFilter !== "all" ||
                      dateFilter !== "all"
                        ? "Try adjusting your filters to see more reviews."
                        : "You haven't received any customer reviews yet. Complete more jobs to start getting feedback!"}
                    </p>
                    {(searchTerm ||
                      ratingFilter !== "all" ||
                      serviceFilter !== "all" ||
                      dateFilter !== "all") && (
                      <Button
                        onClick={() => {
                          setSearchTerm("");
                          setRatingFilter("all");
                          setServiceFilter("all");
                          setDateFilter("all");
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {currentReviews.map((review) => (
                    <Card
                      key={review.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={review.customer.avatar} />
                              <AvatarFallback>
                                {review.customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">
                                  {review.customer.name}
                                </h4>
                                {review.customer.verified && (
                                  <CheckCircle className="w-4 h-4 text-blue-500" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                  {renderStars(review.rating)}
                                </div>
                                <span
                                  className={`font-bold ${getRatingColor(
                                    review.rating,
                                  )}`}
                                >
                                  {review.rating}/5
                                </span>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">
                                  {formatDate(review.date)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">
                                  {review.service}
                                </Badge>
                                <Badge variant="outline">
                                  Job {review.jobId}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedReview(review)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Review Details - {selectedReview?.jobId}
                                </DialogTitle>
                                <DialogDescription>
                                  Complete review information and job details
                                </DialogDescription>
                              </DialogHeader>
                              {selectedReview && (
                                <div className="space-y-6">
                                  <div className="flex items-center gap-4">
                                    <Avatar className="w-16 h-16">
                                      <AvatarImage
                                        src={selectedReview.customer.avatar}
                                      />
                                      <AvatarFallback>
                                        {selectedReview.customer.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="text-lg font-semibold">
                                        {selectedReview.customer.name}
                                      </h3>
                                      <div className="flex items-center gap-2">
                                        <div className="flex">
                                          {renderStars(selectedReview.rating)}
                                        </div>
                                        <span className="font-bold">
                                          {selectedReview.rating}/5
                                        </span>
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        {formatDate(selectedReview.date)}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Review</h4>
                                    <p className="text-sm">
                                      {selectedReview.review}
                                    </p>
                                  </div>

                                  {selectedReview.response && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                      <h4 className="font-medium mb-2">
                                        Your Response
                                      </h4>
                                      <p className="text-sm">
                                        {selectedReview.response}
                                      </p>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2">
                                        Job Details
                                      </h4>
                                      <div className="space-y-1 text-sm">
                                        <p>Service: {selectedReview.service}</p>
                                        <p>
                                          Duration:{" "}
                                          {selectedReview.jobDetails.duration}
                                        </p>
                                        <p>
                                          Payment: $
                                          {selectedReview.jobDetails.payment}
                                        </p>
                                        <p>
                                          Completed:{" "}
                                          {formatDate(
                                            selectedReview.jobDetails
                                              .completedDate,
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">
                                        Engagement
                                      </h4>
                                      <div className="space-y-1 text-sm">
                                        <p>
                                          Helpful votes:{" "}
                                          {selectedReview.helpful}
                                        </p>
                                        <p>
                                          Customer verified:{" "}
                                          {selectedReview.customer.verified
                                            ? "Yes"
                                            : "No"}
                                        </p>
                                        {selectedReview.photos && (
                                          <p>
                                            Photos:{" "}
                                            {selectedReview.photos.length}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>

                        <p className="text-foreground mb-4">{review.review}</p>

                        {review.response && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <User className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-600">
                                Your Response
                              </span>
                            </div>
                            <p className="text-sm">{review.response}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{review.helpful} found helpful</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Completed:{" "}
                                {formatDate(review.jobDetails.completedDate)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>${review.jobDetails.payment}</span>
                            <span>•</span>
                            <span>{review.jobDetails.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1)
                                  setCurrentPage(currentPage - 1);
                              }}
                              className={
                                currentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : ""
                              }
                            />
                          </PaginationItem>

                          {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 &&
                                page <= currentPage + 1)
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setCurrentPage(page);
                                    }}
                                    isActive={currentPage === page}
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            } else if (
                              page === currentPage - 2 ||
                              page === currentPage + 2
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }
                            return null;
                          })}

                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages)
                                  setCurrentPage(currentPage + 1);
                              }}
                              className={
                                currentPage === totalPages
                                  ? "pointer-events-none opacity-50"
                                  : ""
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>

                      <div className="text-center mt-4 text-sm text-muted-foreground">
                        Showing {startIndex + 1}-
                        {Math.min(endIndex, filteredReviews.length)} of{" "}
                        {filteredReviews.length} reviews
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
