import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/shared/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  Star,
  CheckCircle,
  Calendar,
  User,
  MessageSquare,
  AlertCircle,
  Loader2,
  Send,
  Edit3,
  Package,
  ThumbsUp,
  Eye,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

interface CompletedOrder {
  id: string;
  service: string;
  technician: {
    name: string;
    avatar: string;
  };
  completedDate: string;
  amount: string;
  hasReview: boolean;
  canReview: boolean;
}

interface Review {
  id: string;
  orderId: string;
  service: string;
  technician: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  reviewDate: string;
  helpful: number;
  verified: boolean;
}

interface ReviewForm {
  rating: number;
  comment: string;
  orderId: string;
}

export default function CustomerReviews() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<CompletedOrder | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("write-reviews");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    rating: 0,
    comment: "",
    orderId: "",
  });

  // Mock data - in real app this would come from API
  const [completedOrders, setCompletedOrders] = useState<CompletedOrder[]>([
    {
      id: "ORD-001",
      service: "AC Repair & Maintenance",
      technician: {
        name: "John Smith",
        avatar: "JS",
      },
      completedDate: "2024-01-15",
      amount: "$120",
      hasReview: false,
      canReview: true,
    },
    {
      id: "ORD-005",
      service: "Bathroom Plumbing Installation",
      technician: {
        name: "Lisa Anderson",
        avatar: "LA",
      },
      completedDate: "2024-01-08",
      amount: "$220",
      hasReview: false,
      canReview: true,
    },
    {
      id: "ORD-007",
      service: "Kitchen Appliance Repair",
      technician: {
        name: "Maria Garcia",
        avatar: "MG",
      },
      completedDate: "2024-01-05",
      amount: "$95",
      hasReview: true,
      canReview: false,
    },
  ]);

  const [submittedReviews, setSubmittedReviews] = useState<Review[]>([
    {
      id: "REV-001",
      orderId: "ORD-007",
      service: "Kitchen Appliance Repair",
      technician: {
        name: "Maria Garcia",
        avatar: "MG",
      },
      rating: 5,
      comment:
        "Excellent service! Maria was very professional and fixed my dishwasher quickly. She explained everything clearly and even gave me tips for maintenance. Highly recommend!",
      reviewDate: "2024-01-06",
      helpful: 3,
      verified: true,
    },
  ]);

  // Simulate loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1200));
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Auto-hide notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleWriteReview = (order: CompletedOrder) => {
    setSelectedOrder(order);
    setReviewForm({
      rating: 0,
      comment: "",
      orderId: order.id,
    });
    setShowReviewDialog(true);
  };

  const handleSubmitReview = async () => {
    if (reviewForm.rating === 0) {
      setNotification({
        type: "error",
        message: "Please select a rating before submitting your review.",
      });
      return;
    }

    if (!reviewForm.comment.trim()) {
      setNotification({
        type: "error",
        message: "Please write a comment for your review.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create new review
      const newReview: Review = {
        id: `REV-${Date.now()}`,
        orderId: reviewForm.orderId,
        service: selectedOrder?.service || "",
        technician: selectedOrder?.technician || { name: "", avatar: "" },
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        reviewDate: new Date().toISOString().split("T")[0],
        helpful: 0,
        verified: true,
      };

      // Update states
      setSubmittedReviews((prev) => [newReview, ...prev]);
      setCompletedOrders((prev) =>
        prev.map((order) =>
          order.id === reviewForm.orderId
            ? { ...order, hasReview: true, canReview: false }
            : order,
        ),
      );

      setShowReviewDialog(false);
      setNotification({
        type: "success",
        message: "Review submitted successfully! Thank you for your feedback.",
      });

      // Switch to submitted reviews tab
      setActiveTab("my-reviews");
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to submit review. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (
    rating: number,
    interactive = false,
    size = "w-5 h-5",
    onStarClick?: (rating: number) => void,
  ) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${interactive ? "cursor-pointer hover:scale-110" : ""} transition-transform ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
        onClick={
          interactive && onStarClick ? () => onStarClick(i + 1) : undefined
        }
      />
    ));
  };

  const pendingReviewsCount = completedOrders.filter(
    (order) => order.canReview && !order.hasReview,
  ).length;

  return (
    <Layout
      breadcrumbs={[
        { label: "Customer Dashboard", href: "/customer/dashboard" },
        { label: "Reviews" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Notification */}
          {notification && (
            <Alert
              variant={
                notification.type === "error" ? "destructive" : "default"
              }
              className="max-w-md ml-auto"
            >
              {notification.type === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>{notification.message}</AlertDescription>
            </Alert>
          )}

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                My Reviews
              </h1>
              <p className="text-muted-foreground">
                Share your experience and help other customers make informed
                decisions
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {pendingReviewsCount}
                </div>
                <div className="text-xs text-muted-foreground">
                  Pending Reviews
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {submittedReviews.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  Reviews Written
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="write-reviews"
                className="flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Write Reviews
                {pendingReviewsCount > 0 && (
                  <Badge variant="destructive" className="ml-1">
                    {pendingReviewsCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="my-reviews"
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                My Reviews ({submittedReviews.length})
              </TabsTrigger>
            </TabsList>

            {/* Write Reviews Tab */}
            <TabsContent value="write-reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Completed Orders Available for Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4 flex-1">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <div className="space-y-2 flex-1">
                              <Skeleton className="h-5 w-48" />
                              <Skeleton className="h-4 w-32" />
                            </div>
                          </div>
                          <Skeleton className="h-9 w-24" />
                        </div>
                      ))}
                    </div>
                  ) : completedOrders.filter(
                      (order) => order.canReview && !order.hasReview,
                    ).length === 0 ? (
                    // Empty state for pending reviews
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        All caught up!
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        You've reviewed all your completed services. When you
                        book and complete new services, they'll appear here for
                        review.
                      </p>
                      <Button asChild>
                        <Link to="/services">
                          <Package className="w-4 h-4 mr-2" />
                          Book New Service
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {completedOrders
                        .filter((order) => order.canReview && !order.hasReview)
                        .map((order) => (
                          <div
                            key={order.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4"
                          >
                            <div className="flex items-center space-x-4 flex-1">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground mb-1">
                                  {order.service}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6">
                                      <AvatarFallback className="text-xs">
                                        {order.technician.avatar}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{order.technician.name}</span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                      Completed{" "}
                                      {formatDate(order.completedDate)}
                                    </span>
                                  </div>
                                  <span>•</span>
                                  <span className="font-medium text-primary">
                                    {order.amount}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <Button
                              onClick={() => handleWriteReview(order)}
                              className="flex items-center gap-2"
                            >
                              <Star className="w-4 h-4" />
                              Write Review
                            </Button>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Reviews Tab */}
            <TabsContent value="my-reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Your Submitted Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-6">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <div
                          key={i}
                          className="p-4 border rounded-lg space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-4 w-20" />
                          </div>
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-16 w-full" />
                        </div>
                      ))}
                    </div>
                  ) : submittedReviews.length === 0 ? (
                    // Empty state for submitted reviews
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-12 h-12 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        No reviews yet
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        You haven't written any reviews yet. Complete a service
                        and share your experience to help other customers.
                      </p>
                      <Button asChild variant="outline">
                        <Link to="/services">
                          <Package className="w-4 h-4 mr-2" />
                          Browse Services
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {submittedReviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-6 border rounded-lg bg-white hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">
                                  {review.service}
                                </h3>
                                {review.verified && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className="text-xs">
                                      {review.technician.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{review.technician.name}</span>
                                </div>
                                <span>•</span>
                                <span>
                                  Reviewed {formatDate(review.reviewDate)}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  ({review.rating}/5)
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{review.helpful} found this helpful</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                            "{review.comment}"
                          </p>

                          <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Eye className="w-4 h-4" />
                              <span>Order #{review.orderId}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Edit3 className="w-4 h-4 mr-2" />
                              Edit Review
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Review Impact */}
              {submittedReviews.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Your Review Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {submittedReviews.reduce(
                            (sum, review) => sum + review.helpful,
                            0,
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          People helped
                        </div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {(
                            submittedReviews.reduce(
                              (sum, review) => sum + review.rating,
                              0,
                            ) / submittedReviews.length
                          ).toFixed(1)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Average rating
                        </div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {submittedReviews.length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Reviews written
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Write a Review
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Service Info */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">{selectedOrder.service}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {selectedOrder.technician.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedOrder.technician.name}</span>
                  </div>
                  <span>•</span>
                  <span>
                    Completed {formatDate(selectedOrder.completedDate)}
                  </span>
                  <span>•</span>
                  <span className="font-medium">{selectedOrder.amount}</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  How would you rate this service?
                </Label>
                <div className="flex gap-1">
                  {renderStars(reviewForm.rating, true, "w-10 h-10", (rating) =>
                    setReviewForm((prev) => ({ ...prev, rating })),
                  )}
                </div>
                {reviewForm.rating > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {reviewForm.rating === 5
                      ? "Excellent!"
                      : reviewForm.rating === 4
                        ? "Good"
                        : reviewForm.rating === 3
                          ? "Average"
                          : reviewForm.rating === 2
                            ? "Poor"
                            : "Very Poor"}
                  </p>
                )}
              </div>

              {/* Comment */}
              <div>
                <Label
                  htmlFor="review-comment"
                  className="text-base font-medium"
                >
                  Share your experience
                </Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Tell other customers about the quality of service,
                  punctuality, professionalism, etc.
                </p>
                <Textarea
                  id="review-comment"
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  placeholder="The technician was professional and completed the work efficiently. I would recommend this service to others..."
                  rows={4}
                  className="resize-none"
                />
                <div className="text-xs text-muted-foreground mt-2">
                  {reviewForm.comment.length}/500 characters
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowReviewDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              disabled={reviewForm.rating === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
