import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
} from "@/components/ui/alert-dialog";
import Layout from "@/components/shared/Layout";
import {
  Calendar,
  Clock,
  CheckCircle,
  X,
  MapPin,
  Phone,
  Mail,
  Star,
  MessageSquare,
  AlertTriangle,
  User,
  Award,
  FileText,
  DollarSign,
  RefreshCcw,
  ArrowLeft,
  Edit3,
  Send,
  AlertCircle,
  CheckCircle2,
  Package,
  Settings,
  Wrench,
} from "lucide-react";

interface OrderDetail {
  id: string;
  service: string;
  description: string;
  orderDate: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "booked" | "accepted" | "in-progress" | "completed" | "cancelled";
  address: string;
  specialNotes?: string;
  technician: {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    email: string;
    experience: string;
    rating: number;
    reviewCount: number;
    specialties: string[];
  };
  priceBreakdown: {
    serviceCharge: number;
    materialCost: number;
    laborCost: number;
    tax: number;
    discount?: number;
    total: number;
  };
  timeline: {
    step: string;
    status: "completed" | "current" | "pending";
    timestamp?: string;
    description: string;
  }[];
  canCancel: boolean;
  canReview: boolean;
  hasReview: boolean;
  customerReview?: {
    rating: number;
    comment: string;
    date: string;
  };
}

export default function CustomerOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  // Mock order data - in real app this would come from API
  const mockOrder: OrderDetail = {
    id: id || "ORD-001",
    service: "AC Repair & Maintenance",
    description:
      "Complete AC system diagnostic, cleaning, and repair. Includes filter replacement, coil cleaning, refrigerant check, and electrical component inspection.",
    orderDate: "2024-01-15T10:30:00Z",
    scheduledDate: "2024-01-20",
    scheduledTime: "2:00 PM - 4:00 PM",
    status: "in-progress",
    address: "123 Main Street, Apartment 4B, Springfield, IL 62701",
    specialNotes:
      "Please call 30 minutes before arrival. Building requires visitor parking pass from front desk.",
    technician: {
      id: "TECH-001",
      name: "John Smith",
      avatar: "JS",
      phone: "+1 (555) 123-4567",
      email: "john.smith@fix4home.com",
      experience: "8 years",
      rating: 4.9,
      reviewCount: 127,
      specialties: [
        "HVAC Systems",
        "Air Conditioning",
        "Heating Repair",
        "Electrical",
      ],
    },
    priceBreakdown: {
      serviceCharge: 80,
      materialCost: 25,
      laborCost: 40,
      tax: 11.6,
      discount: 10,
      total: 146.6,
    },
    timeline: [
      {
        step: "Booked",
        status: "completed",
        timestamp: "2024-01-15T10:30:00Z",
        description: "Service request submitted and confirmed",
      },
      {
        step: "Accepted",
        status: "completed",
        timestamp: "2024-01-15T11:15:00Z",
        description: "Technician assigned and job accepted",
      },
      {
        step: "In Progress",
        status: "current",
        timestamp: "2024-01-20T14:00:00Z",
        description: "Technician arrived and work is in progress",
      },
      {
        step: "Completed",
        status: "pending",
        description: "Service completed and quality checked",
      },
    ],
    canCancel: true,
    canReview: false,
    hasReview: false,
  };

  useEffect(() => {
    const loadOrderDetails = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simulate different order states based on ID
        let orderData = { ...mockOrder };

        if (id === "ORD-001") {
          orderData.status = "completed";
          orderData.canCancel = false;
          orderData.canReview = true;
          orderData.hasReview = false;
          orderData.timeline[3] = {
            ...orderData.timeline[3],
            status: "completed",
            timestamp: "2024-01-20T16:30:00Z",
          };
        } else if (id === "ORD-003") {
          orderData.status = "booked";
          orderData.canCancel = true;
          orderData.canReview = false;
          orderData.hasReview = false;
          orderData.timeline[1].status = "pending";
          orderData.timeline[2].status = "pending";
          orderData.timeline[3].status = "pending";
        } else if (id === "ORD-004") {
          orderData.status = "cancelled";
          orderData.canCancel = false;
          orderData.canReview = false;
          orderData.hasReview = false;
        }

        setOrder(orderData);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrderDetails();
  }, [id]);

  const handleCancelOrder = async () => {
    setIsCancelling(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update order status
      if (order) {
        setOrder({
          ...order,
          status: "cancelled",
          canCancel: false,
        });
      }

      setShowCancelDialog(false);
    } catch (error) {
      console.error("Failed to cancel order:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleSubmitReview = async () => {
    if (reviewRating === 0) return;

    setIsSubmittingReview(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update order with review
      if (order) {
        setOrder({
          ...order,
          canReview: false,
          hasReview: true,
          customerReview: {
            rating: reviewRating,
            comment: reviewComment,
            date: new Date().toISOString(),
          },
        });
      }

      setShowReviewDialog(false);
      setReviewRating(0);
      setReviewComment("");
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "accepted":
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      case "booked":
        return <Package className="w-5 h-5 text-orange-600" />;
      case "cancelled":
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "booked":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const renderStars = (
    rating: number,
    interactive = false,
    size = "w-4 h-4",
  ) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} cursor-pointer ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
        onClick={interactive ? () => setReviewRating(i + 1) : undefined}
      />
    ));
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Customer Dashboard", href: "/customer/dashboard" },
          { label: "My Orders", href: "/customer/orders" },
          { label: "Order Details" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
          <div className="container mx-auto px-4 py-6 space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (hasError || !order) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Customer Dashboard", href: "/customer/dashboard" },
          { label: "My Orders", href: "/customer/orders" },
          { label: "Order Details" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center min-h-[60vh]">
              <Card className="w-full max-w-md text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Order Not Found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find the order you're looking for. It may have
                    been removed or you may not have access to it.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button onClick={() => navigate("/customer/orders")}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Orders
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.location.reload()}
                    >
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      breadcrumbs={[
        { label: "Customer Dashboard", href: "/customer/dashboard" },
        { label: "My Orders", href: "/customer/orders" },
        { label: `Order ${order.id}` },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-6 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Order Details
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">
                  Order ID: {order.id}
                </span>
                <Badge
                  variant="outline"
                  className={getStatusColor(order.status)}
                >
                  <div className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {order.canCancel && (
                <Button
                  variant="destructive"
                  onClick={() => setShowCancelDialog(true)}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel Order
                </Button>
              )}

              {order.canReview && (
                <Button
                  onClick={() => setShowReviewDialog(true)}
                  className="flex items-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  Write Review
                </Button>
              )}

              {order.status === "in-progress" && (
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Chat with Technician
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-primary" />
                    Service Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {order.service}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {order.description}
                    </p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Order Date:</span>
                        <span className="text-sm">
                          {formatDate(order.orderDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Scheduled:</span>
                        <span className="text-sm">
                          {order.scheduledDate} at {order.scheduledTime}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <span className="text-sm font-medium block">
                            Address:
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {order.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {order.specialNotes && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Special Notes
                        </h4>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                          {order.specialNotes}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    Order Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {order.timeline.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 relative"
                      >
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                            step.status === "completed"
                              ? "bg-green-100 border-green-500 text-green-600"
                              : step.status === "current"
                                ? "bg-blue-100 border-blue-500 text-blue-600"
                                : "bg-gray-100 border-gray-300 text-gray-400"
                          }`}
                        >
                          {step.status === "completed" ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : step.status === "current" ? (
                            <Clock className="w-5 h-5" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-current" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground">
                            {step.step}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {step.description}
                          </p>
                          {step.timestamp && (
                            <p className="text-xs text-muted-foreground mt-2">
                              {formatDate(step.timestamp)}
                            </p>
                          )}
                        </div>

                        {index < order.timeline.length - 1 && (
                          <div
                            className={`absolute left-5 top-10 w-0.5 h-8 ${
                              step.status === "completed"
                                ? "bg-green-300"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Review */}
              {order.hasReview && order.customerReview && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      Your Review
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {renderStars(order.customerReview.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Reviewed on {formatDate(order.customerReview.date)}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {order.customerReview.comment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Technician Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Your Technician
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="text-lg font-semibold">
                        {order.technician.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{order.technician.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">
                          {order.technician.rating} (
                          {order.technician.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Experience:</span>
                      <span>{order.technician.experience}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Phone:</span>
                      <a
                        href={`tel:${order.technician.phone}`}
                        className="text-primary hover:underline"
                      >
                        {order.technician.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Email:</span>
                      <a
                        href={`mailto:${order.technician.email}`}
                        className="text-primary hover:underline"
                      >
                        {order.technician.email}
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {order.technician.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Price Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Service Charge</span>
                      <span>
                        {formatCurrency(order.priceBreakdown.serviceCharge)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Material Cost</span>
                      <span>
                        {formatCurrency(order.priceBreakdown.materialCost)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Labor Cost</span>
                      <span>
                        {formatCurrency(order.priceBreakdown.laborCost)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>{formatCurrency(order.priceBreakdown.tax)}</span>
                    </div>
                    {order.priceBreakdown.discount && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>
                          -{formatCurrency(order.priceBreakdown.discount)}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatCurrency(order.priceBreakdown.total)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Status Alert */}
              {order.status === "cancelled" && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This order has been cancelled. If you need to reschedule or
                    book a new service, please contact our support team.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Order Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This action cannot be
              undone. You may be charged a cancellation fee depending on the
              timing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Order</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelOrder}
              disabled={isCancelling}
              className="bg-red-600 hover:bg-red-700"
            >
              {isCancelling ? (
                <>
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Cancel Order"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Write Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Rating</Label>
              <div className="flex gap-1 mt-2">
                {renderStars(reviewRating, true, "w-8 h-8")}
              </div>
            </div>

            <div>
              <Label htmlFor="review-comment" className="text-sm font-medium">
                Your Experience (Optional)
              </Label>
              <Textarea
                id="review-comment"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Tell us about your experience with the service..."
                className="mt-2"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowReviewDialog(false)}
              disabled={isSubmittingReview}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              disabled={reviewRating === 0 || isSubmittingReview}
            >
              {isSubmittingReview ? (
                <>
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
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
