import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Layout from "@/components/shared/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Home,
  Building,
  Plus,
  Loader2,
  Settings,
  DollarSign,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  priceMax?: number;
  image: string;
  duration: string;
  category: string;
}

interface Address {
  id: string;
  type: "home" | "work" | "other";
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface BookingData {
  serviceId: string;
  date: Date | null;
  timeSlot: string;
  addressId: string;
  customAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  specialNotes: string;
}

interface FormErrors {
  date?: string;
  timeSlot?: string;
  address?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export default function BookService() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [service, setService] = useState<Service | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showAddressDialog, setShowAddressDialog] = useState(false);

  const [bookingData, setBookingData] = useState<BookingData>({
    serviceId: id || "",
    date: null,
    timeSlot: "",
    addressId: "",
    specialNotes: "",
  });

  const [addresses] = useState<Address[]>([
    {
      id: "addr-1",
      type: "home",
      label: "Home",
      street: "123 Main Street, Apt 4B",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      isDefault: true,
    },
    {
      id: "addr-2",
      type: "work",
      label: "Office",
      street: "456 Business Blvd, Suite 200",
      city: "Springfield",
      state: "IL",
      zipCode: "62702",
      isDefault: false,
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // Available time slots
  const timeSlots = [
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM",
  ];

  // Mock service data
  const mockService: Service = {
    id: id || "1",
    name: "AC Repair & Maintenance",
    description:
      "Complete AC system diagnostic, cleaning, and repair. Includes filter replacement, coil cleaning, refrigerant check, and electrical component inspection.",
    price: 150,
    priceMax: 350,
    image: "/api/placeholder/600/300",
    duration: "2-3 hours",
    category: "HVAC",
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadService = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setService(mockService);

        // Set default address if available
        const defaultAddress = addresses.find((addr) => addr.isDefault);
        if (defaultAddress) {
          setBookingData((prev) => ({
            ...prev,
            addressId: defaultAddress.id,
          }));
        }
      } catch (error) {
        console.error("Failed to load service:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadService();
  }, [id, isAuthenticated, navigate, addresses]);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!bookingData.date) {
        newErrors.date = "Please select a date";
      }
      if (!bookingData.timeSlot) {
        newErrors.timeSlot = "Please select a time slot";
      }
    }

    if (step === 2) {
      if (!bookingData.addressId && !bookingData.customAddress) {
        newErrors.address = "Please select or add an address";
      }
      if (bookingData.customAddress) {
        if (!bookingData.customAddress.street.trim()) {
          newErrors.street = "Street address is required";
        }
        if (!bookingData.customAddress.city.trim()) {
          newErrors.city = "City is required";
        }
        if (!bookingData.customAddress.state.trim()) {
          newErrors.state = "State is required";
        }
        if (!bookingData.customAddress.zipCode.trim()) {
          newErrors.zipCode = "Zip code is required";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Proceed to technician selection
      setIsProcessing(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Store booking data in localStorage for next step
        if (typeof window !== "undefined") {
          localStorage.setItem("bookingData", JSON.stringify(bookingData));
        }

        navigate(`/booking/technician/${service?.id}`);
      } catch (error) {
        console.error("Failed to proceed:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(`/services/${id}`);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setBookingData((prev) => ({ ...prev, date }));
      if (errors.date) {
        setErrors((prev) => ({ ...prev, date: undefined }));
      }
    }
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setBookingData((prev) => ({ ...prev, timeSlot }));
    if (errors.timeSlot) {
      setErrors((prev) => ({ ...prev, timeSlot: undefined }));
    }
  };

  const handleAddressSelect = (addressId: string) => {
    setBookingData((prev) => ({
      ...prev,
      addressId,
      customAddress: undefined,
    }));
    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: undefined }));
    }
  };

  const handleCustomAddressChange = (field: string, value: string) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
    setBookingData((prev) => ({
      ...prev,
      addressId: "",
      customAddress: { ...newAddress, [field]: value },
    }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const formatCurrency = (amount: number) => `$${amount}`;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" />;
      case "work":
        return <Building className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  if (isLoading) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Book Service" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Book Service" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-md mx-auto text-center">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Service not found. Please try again or contact support.
                </AlertDescription>
              </Alert>
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
        { label: service.name, href: `/services/${service.id}` },
        { label: "Book Service" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Service Header */}
            <Card className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <div className="h-48 md:h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Settings className="w-16 h-16 text-primary" />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-foreground mb-2">
                        {service.name}
                      </h1>
                      <Badge variant="secondary">{service.category}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {formatCurrency(service.price)}
                        {service.priceMax && (
                          <span className="text-sm text-muted-foreground">
                            - {formatCurrency(service.priceMax)}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Est. {service.duration}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </Card>

            {/* Progress Stepper */}
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step < currentStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      step
                    )}
                  </div>
                  <div className="ml-2 text-sm font-medium">
                    {step === 1
                      ? "Date & Time"
                      : step === 2
                        ? "Address"
                        : "Notes"}
                  </div>
                  {step < 3 && (
                    <ArrowRight className="w-4 h-4 mx-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {currentStep === 1 && (
                    <>
                      <CalendarIcon className="w-5 h-5 text-primary" />
                      Select Date & Time
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <MapPin className="w-5 h-5 text-primary" />
                      Service Address
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <FileText className="w-5 h-5 text-primary" />
                      Special Instructions
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Date & Time Selection */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Select Date
                      </Label>
                      <Calendar
                        mode="single"
                        selected={bookingData.date || undefined}
                        onSelect={handleDateSelect}
                        disabled={(date) => isPastDate(date)}
                        className="rounded-md border"
                        modifiers={{
                          weekend: isWeekend,
                        }}
                        modifiersStyles={{
                          weekend: { color: "#ef4444" },
                        }}
                      />
                      {errors.date && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Available Time Slots
                      </Label>
                      {bookingData.date ? (
                        <div className="space-y-2">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot}
                              variant={
                                bookingData.timeSlot === slot
                                  ? "default"
                                  : "outline"
                              }
                              className="w-full justify-start"
                              onClick={() => handleTimeSlotSelect(slot)}
                            >
                              <Clock className="w-4 h-4 mr-2" />
                              {slot}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>
                            Please select a date first to see available times
                          </p>
                        </div>
                      )}
                      {errors.timeSlot && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.timeSlot}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Address Selection */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Select Service Address
                      </Label>
                      <div className="space-y-3">
                        {addresses.map((address) => (
                          <div
                            key={address.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              bookingData.addressId === address.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:bg-muted/50"
                            }`}
                            onClick={() => handleAddressSelect(address.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                {getAddressTypeIcon(address.type)}
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium">
                                      {address.label}
                                    </span>
                                    {address.isDefault && (
                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        Default
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {address.street}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {address.city}, {address.state}{" "}
                                    {address.zipCode}
                                  </p>
                                </div>
                              </div>
                              {bookingData.addressId === address.id && (
                                <CheckCircle className="w-5 h-5 text-primary" />
                              )}
                            </div>
                          </div>
                        ))}

                        <Button
                          variant="outline"
                          onClick={() => setShowAddressDialog(true)}
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add New Address
                        </Button>
                      </div>
                      {errors.address && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.address}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Special Notes */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Special Instructions (Optional)
                      </Label>
                      <Textarea
                        value={bookingData.specialNotes}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            specialNotes: e.target.value,
                          }))
                        }
                        placeholder="Any special instructions for the technician? (e.g., building access codes, specific requirements, preferred contact method)"
                        rows={4}
                        className="resize-none"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        These notes will be shared with your assigned technician
                      </p>
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">Booking Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Service:</span>
                          <span className="font-medium">{service.name}</span>
                        </div>
                        {bookingData.date && (
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span className="font-medium">
                              {formatDate(bookingData.date)}
                            </span>
                          </div>
                        )}
                        {bookingData.timeSlot && (
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span className="font-medium">
                              {bookingData.timeSlot}
                            </span>
                          </div>
                        )}
                        {(bookingData.addressId ||
                          bookingData.customAddress) && (
                          <div className="flex justify-between">
                            <span>Address:</span>
                            <span className="font-medium text-right">
                              {bookingData.addressId
                                ? (() => {
                                    const addr = addresses.find(
                                      (a) => a.id === bookingData.addressId,
                                    );
                                    return addr
                                      ? `${addr.street}, ${addr.city}`
                                      : "";
                                  })()
                                : bookingData.customAddress
                                  ? `${bookingData.customAddress.street}, ${bookingData.customAddress.city}`
                                  : ""}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 border-t">
                          <span>Estimated Cost:</span>
                          <span className="font-bold text-primary">
                            {formatCurrency(service.price)}
                            {service.priceMax &&
                              ` - ${formatCurrency(service.priceMax)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {currentStep === 1 ? "Back to Service" : "Previous"}
                  </Button>

                  <Button onClick={handleNext} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {currentStep === 3 ? "Continue to Technicians" : "Next"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Address Dialog */}
      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Street Address</Label>
              <Input
                value={newAddress.street}
                onChange={(e) =>
                  handleCustomAddressChange("street", e.target.value)
                }
                placeholder="123 Main Street, Apt 4B"
              />
              {errors.street && (
                <p className="text-sm text-red-500">{errors.street}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={newAddress.city}
                  onChange={(e) =>
                    handleCustomAddressChange("city", e.target.value)
                  }
                  placeholder="Springfield"
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  value={newAddress.state}
                  onChange={(e) =>
                    handleCustomAddressChange("state", e.target.value)
                  }
                  placeholder="IL"
                />
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Zip Code</Label>
              <Input
                value={newAddress.zipCode}
                onChange={(e) =>
                  handleCustomAddressChange("zipCode", e.target.value)
                }
                placeholder="62701"
              />
              {errors.zipCode && (
                <p className="text-sm text-red-500">{errors.zipCode}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowAddressDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (validateStep(2)) {
                  setShowAddressDialog(false);
                }
              }}
              className="flex-1"
            >
              Use This Address
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
