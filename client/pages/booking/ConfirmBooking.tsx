import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Layout from "@/components/shared/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  DollarSign,
  FileText,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Star,
  Phone,
  Mail,
  Settings,
  Home,
  Building,
  Award,
  Edit,
} from "lucide-react";

interface BookingData {
  serviceId: string;
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
  servicePriceMax?: number;
  date: string;
  timeSlot: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  specialNotes: string;
  technicianId: string;
  technicianName: string;
  technicianAvatar: string;
  technicianRating: number;
  technicianReviews: number;
  technicianExperience: number;
  technicianSkills: string[];
  estimatedCost: number;
}

export default function ConfirmBooking() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadBookingData = async () => {
      setIsLoading(true);
      try {
        // Get booking data from localStorage
        const storedData = localStorage.getItem("bookingData");
        if (!storedData) {
          setError("No booking data found. Please start over.");
          return;
        }

        const bookingInfo = JSON.parse(storedData);

        // Simulate API call to get complete booking details
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock complete booking data
        const completeBookingData: BookingData = {
          serviceId: bookingInfo.serviceId || "1",
          serviceName: "AC Repair & Maintenance",
          serviceDescription:
            "Complete AC system diagnostic, cleaning, and repair. Includes filter replacement, coil cleaning, refrigerant check, and electrical component inspection.",
          servicePrice: 150,
          servicePriceMax: 350,
          date: bookingInfo.date
            ? new Date(bookingInfo.date).toLocaleDateString()
            : "Not selected",
          timeSlot: bookingInfo.timeSlot || "Not selected",
          address: bookingInfo.customAddress || {
            street: "123 Main Street, Apt 4B",
            city: "Springfield",
            state: "IL",
            zipCode: "62701",
          },
          specialNotes: bookingInfo.specialNotes || "",
          technicianId: bookingInfo.technicianId || "tech-1",
          technicianName: "John Smith",
          technicianAvatar: "JS",
          technicianRating: 4.9,
          technicianReviews: 127,
          technicianExperience: 8,
          technicianSkills: [
            "HVAC",
            "Air Conditioning",
            "Heating",
            "Electrical",
          ],
          estimatedCost: bookingInfo.estimatedCost || 170,
        };

        setBookingData(completeBookingData);
      } catch (error) {
        setError("Failed to load booking data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBookingData();
  }, [isAuthenticated, navigate]);

  const handleConfirmBooking = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate API call to create booking
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate booking ID
      const newBookingId = `BK-${Date.now().toString().slice(-6)}`;
      setBookingId(newBookingId);

      // Clear booking data from localStorage
      localStorage.removeItem("bookingData");

      setBookingComplete(true);
      setShowConfirmDialog(false);
    } catch (error) {
      setError("Failed to confirm booking. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditBooking = (section: string) => {
    if (section === "datetime") {
      navigate(`/booking/service/${bookingData?.serviceId}`);
    } else if (section === "technician") {
      navigate(`/booking/technician/${bookingData?.serviceId}`);
    }
  };

  const formatCurrency = (amount: number) => `$${amount}`;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getAddressTypeIcon = (address: any) => {
    // This would normally come from the address type
    return <Home className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Confirm Booking" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin text-primary" />
                          <span>Loading booking details...</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !bookingData) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Confirm Booking" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-md mx-auto">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error || "Booking data not found. Please start over."}
                </AlertDescription>
              </Alert>
              <div className="mt-6 space-y-3">
                <Button
                  onClick={() => navigate("/services")}
                  className="w-full"
                >
                  Browse Services
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/customer/dashboard")}
                  className="w-full"
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (bookingComplete) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Booking Confirmed" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="border-green-200 bg-green-50/50">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>

                  <h1 className="text-3xl font-bold text-foreground mb-4">
                    Booking Confirmed!
                  </h1>

                  <p className="text-lg text-muted-foreground mb-6">
                    Your service has been successfully booked. You'll receive a
                    confirmation email shortly.
                  </p>

                  <div className="bg-white p-4 rounded-lg mb-6">
                    <div className="text-sm text-muted-foreground mb-1">
                      Booking ID
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {bookingId}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Service:</span>
                      <span className="font-medium">
                        {bookingData.serviceName}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Technician:</span>
                      <span className="font-medium">
                        {bookingData.technicianName}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Date & Time:</span>
                      <span className="font-medium">
                        {formatDate(bookingData.date)} at {bookingData.timeSlot}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated Cost:</span>
                      <span className="font-bold text-primary">
                        {formatCurrency(bookingData.estimatedCost)}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate("/customer/orders")}
                      className="w-full"
                      size="lg"
                    >
                      View My Orders
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/customer/dashboard")}
                      className="w-full"
                    >
                      Go to Dashboard
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-6">
                    You can track your order status and communicate with your
                    technician through your dashboard.
                  </p>
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
        { label: "Services", href: "/services" },
        {
          label: "Book Service",
          href: `/booking/service/${bookingData.serviceId}`,
        },
        {
          label: "Select Technician",
          href: `/booking/technician/${bookingData.serviceId}`,
        },
        { label: "Confirm Booking" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Confirm Your Booking
                </h1>
                <p className="text-muted-foreground">
                  Review your booking details before confirming
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  navigate(`/booking/technician/${bookingData.serviceId}`)
                }
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Technicians
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Service Details */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Service Details
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditBooking("service")}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {bookingData.serviceName}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {bookingData.serviceDescription}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Service Price:
                      </span>
                      <span className="font-semibold text-primary">
                        {formatCurrency(bookingData.servicePrice)}
                        {bookingData.servicePriceMax &&
                          ` - ${formatCurrency(bookingData.servicePriceMax)}`}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Date & Time */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Date & Time
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditBooking("datetime")}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            {formatDate(bookingData.date)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Service Date
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{bookingData.timeSlot}</p>
                          <p className="text-sm text-muted-foreground">
                            Time Window
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Address */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Service Address
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditBooking("datetime")}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      {getAddressTypeIcon(bookingData.address)}
                      <div>
                        <p className="font-medium">
                          {bookingData.address.street}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {bookingData.address.city},{" "}
                          {bookingData.address.state}{" "}
                          {bookingData.address.zipCode}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Selected Technician */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Selected Technician
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditBooking("technician")}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Change
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg font-semibold">
                          {bookingData.technicianAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {bookingData.technicianName}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {renderStars(bookingData.technicianRating)}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {bookingData.technicianRating} (
                            {bookingData.technicianReviews} reviews)
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            <span>
                              {bookingData.technicianExperience} years
                              experience
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {bookingData.technicianSkills
                              .slice(0, 3)
                              .map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Special Notes */}
                {bookingData.specialNotes && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Special Instructions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {bookingData.specialNotes}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Booking Summary */}
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Booking Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Service Fee</span>
                        <span>{formatCurrency(bookingData.servicePrice)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Labor (estimated)</span>
                        <span>
                          {formatCurrency(
                            bookingData.estimatedCost -
                              bookingData.servicePrice,
                          )}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Estimated</span>
                        <span className="text-primary">
                          {formatCurrency(bookingData.estimatedCost)}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      Final cost may vary based on actual work performed. You'll
                      be notified of any changes before work begins.
                    </div>

                    <Button
                      onClick={() => setShowConfirmDialog(true)}
                      className="w-full"
                      size="lg"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Confirm Booking
                    </Button>

                    <div className="text-xs text-center text-muted-foreground">
                      By confirming, you agree to our{" "}
                      <a href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>24/7 Support: 1900-1234</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>support@fix4home.com</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
            <DialogDescription>
              Are you ready to book this service? You'll receive a confirmation
              email with all the details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Service:</span>
                <span className="font-medium">{bookingData.serviceName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Date:</span>
                <span className="font-medium">
                  {formatDate(bookingData.date)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Time:</span>
                <span className="font-medium">{bookingData.timeSlot}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Technician:</span>
                <span className="font-medium">
                  {bookingData.technicianName}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-primary">
                  {formatCurrency(bookingData.estimatedCost)}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                disabled={isProcessing}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmBooking}
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
