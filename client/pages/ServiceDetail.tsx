import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Wrench,
  Phone,
  Star,
  CheckCircle,
  Clock,
  Calendar,
  ArrowLeft,
  User,
  Shield,
  Award,
  Home,
  ChevronRight,
  MessageCircle,
  Mail,
  Droplets,
  Zap,
  Paintbrush,
  Hammer,
  Settings,
  AlertCircle,
  BookOpen,
} from "lucide-react";

// Mock service data - in real app this would come from API
const mockServices = {
  1: {
    id: 1,
    name: "Emergency Plumbing Repair",
    description: `Our emergency plumbing repair service provides immediate assistance for urgent plumbing issues that can't wait. Our certified technicians are available 24/7 to handle everything from burst pipes and severe leaks to clogged drains and toilet overflows.

We understand that plumbing emergencies can cause significant damage to your property if not addressed quickly. That's why we guarantee a response time of under 2 hours for emergency calls within our service areas.

Our comprehensive emergency plumbing service includes advanced diagnostic equipment, professional-grade tools, and high-quality replacement parts to ensure lasting repairs. All work comes with our satisfaction guarantee and warranty coverage.`,
    shortDescription:
      "24/7 emergency plumbing services for urgent leaks, clogs, and repairs.",
    price: 150000,
    priceMax: 350000,
    category: "Plumbing",
    image: "/api/placeholder/800/400",
    icon: Droplets,
    rating: 4.9,
    totalReviews: 324,
    duration: "1-3 hours",
    availability: "24/7 Emergency Service",
    features: [
      "24/7 emergency response",
      "Under 2-hour response time",
      "Licensed and insured technicians",
      "Advanced diagnostic equipment",
      "High-quality replacement parts",
      "1-year warranty on repairs",
      "Upfront pricing with no hidden fees",
      "Emergency water shut-off assistance",
      "Damage prevention consultation",
      "Follow-up maintenance recommendations",
    ],
    process: [
      {
        step: 1,
        title: "Emergency Call",
        description: "Call our 24/7 hotline for immediate assistance",
        duration: "Immediate",
      },
      {
        step: 2,
        title: "Technician Dispatch",
        description:
          "Certified technician assigned and dispatched to your location",
        duration: "15-30 minutes",
      },
      {
        step: 3,
        title: "Diagnosis & Quote",
        description: "Professional assessment with upfront pricing",
        duration: "15-30 minutes",
      },
      {
        step: 4,
        title: "Emergency Repair",
        description: "Complete repair with quality parts and warranty",
        duration: "1-2 hours",
      },
      {
        step: 5,
        title: "Quality Check",
        description: "Final inspection and cleanup",
        duration: "15 minutes",
      },
    ],
    timeSlots: [
      "Emergency - Within 2 hours",
      "Morning (6:00 AM - 12:00 PM)",
      "Afternoon (12:00 PM - 6:00 PM)",
      "Evening (6:00 PM - 10:00 PM)",
      "Late Night (10:00 PM - 6:00 AM)",
    ],
    priceBreakdown: [
      { item: "Emergency service call", price: "150,000đ" },
      { item: "Labor (per hour)", price: "200,000đ" },
      { item: "Parts and materials", price: "Variable" },
      { item: "After hours surcharge", price: "50,000đ" },
    ],
  },
  // Add more services as needed
};

const mockReviews = [
  {
    id: 1,
    serviceId: 1,
    userName: "Minh Nguyen",
    rating: 5,
    comment:
      "Excellent emergency service! Had a burst pipe at 2 AM and they arrived within an hour. The technician was professional, explained everything clearly, and fixed the issue perfectly. Highly recommend!",
    date: "2024-01-15",
    verified: true,
  },
  {
    id: 2,
    serviceId: 1,
    userName: "Thu Ha Tran",
    rating: 5,
    comment:
      "Very impressed with the quick response and quality work. The technician was courteous and cleaned up everything after the repair. Fair pricing and great warranty. Will definitely use again.",
    date: "2024-01-10",
    verified: true,
  },
  {
    id: 3,
    serviceId: 1,
    userName: "Duc Le",
    rating: 4,
    comment:
      "Good service overall. Technician arrived on time and fixed the clogged drain efficiently. Only minor issue was having to wait a bit longer than expected, but the quality of work was excellent.",
    date: "2024-01-05",
    verified: true,
  },
];

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchServiceData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const serviceId = parseInt(id || "0");
        const serviceData =
          mockServices[serviceId as keyof typeof mockServices];

        if (!serviceData) {
          setError("Service not found");
          return;
        }

        setService(serviceData);
        setReviews(
          mockReviews.filter((review) => review.serviceId === serviceId),
        );
      } catch (err) {
        setError("Failed to load service data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    return (
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    );
  };

  if (isLoading) {
    return <ServiceDetailSkeleton />;
  }

  if (error || !service) {
    return <ServiceNotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                FIX4HOME
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-primary font-semibold border-b-2 border-primary pb-1"
              >
                Services
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/login"
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Login
              </Link>
            </div>

            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
              <Phone className="w-4 h-4 mr-2" />
              Hotline: 1900-1234
            </Button>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link
              to="/services"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary font-medium">{service.name}</span>
          </div>
        </div>
      </section>

      {/* Service Header */}
      <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-accent/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-secondary text-secondary-foreground">
                  {service.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Available Now
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {service.name}
              </h1>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(service.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{service.rating}</span>
                  <span className="text-muted-foreground">
                    ({service.totalReviews} reviews)
                  </span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {service.shortDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to={`/booking/service/${service.id}`}>
                    <Calendar className="w-5 h-5 mr-2" />
                    Book This Service
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Ask Questions
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <service.icon className="w-24 h-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary" />
                    Service Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                    {service.description
                      .split("\n\n")
                      .map((paragraph: string, index: number) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features Included */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-primary" />
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Service Process */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Settings className="w-6 h-6 mr-2 text-primary" />
                    Service Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {service.process.map((step: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground mb-2">
                            {step.description}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {step.duration}
                          </Badge>
                        </div>
                        {index < service.process.length - 1 && (
                          <div className="absolute left-9 top-12 w-0.5 h-8 bg-border"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Reviews */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center">
                      <Star className="w-6 h-6 mr-2 text-primary" />
                      Customer Reviews
                    </CardTitle>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {calculateAverageRating().toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {reviews.length} reviews
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No reviews yet. Be the first to review this service!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b pb-6 last:border-b-0"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                              {review.userName.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-foreground">
                                    {review.userName}
                                  </h4>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < review.rating
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    {review.verified && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        <Shield className="w-3 h-3 mr-1" />
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString(
                                    "vi-VN",
                                  )}
                                </span>
                              </div>
                              <p className="text-muted-foreground leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(service.price)}đ
                    </div>
                    {service.priceMax && (
                      <div className="text-sm text-muted-foreground">
                        up to {formatPrice(service.priceMax)}đ
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {service.priceBreakdown.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {item.item}
                        </span>
                        <span className="font-medium">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>

              {/* Service Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Service Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-sm text-muted-foreground">
                        {service.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Availability</div>
                      <div className="text-sm text-muted-foreground">
                        {service.availability}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Warranty</div>
                      <div className="text-sm text-muted-foreground">
                        1-year guarantee
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Available Time Slots */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Available Time Slots
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.timeSlots.map((slot: string, index: number) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg text-sm hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Book Button (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:hidden z-40">
        <Button
          className="w-full"
          size="lg"
          onClick={() => setIsBookingOpen(true)}
        >
          <Calendar className="w-5 h-5 mr-2" />
          Book This Service - {formatPrice(service.price)}đ
        </Button>
      </div>

      {/* Booking Modal Placeholder */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Book Service</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Booking functionality will redirect to login or booking flow.
                  This is a demo placeholder.
                </AlertDescription>
              </Alert>
              <div className="flex gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsBookingOpen(false)}
                >
                  Cancel
                </Button>
                <Button asChild>
                  <Link to="/login">Login to Book</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Loading Skeleton Component
function ServiceDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-white p-4">
        <div className="container mx-auto">
          <Skeleton className="h-8 w-32" />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 404 Component
function ServiceNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">FIX4HOME</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="w-32 h-32 bg-gradient-to-br from-destructive/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertCircle className="w-16 h-16 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Service Not Found
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The service you're looking for doesn't exist or has been removed.
            Please check the service ID or browse our available services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/services">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Go to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
