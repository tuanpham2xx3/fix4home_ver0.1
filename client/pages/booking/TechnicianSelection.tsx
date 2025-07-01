import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/shared/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  Star,
  User,
  Award,
  MapPin,
  DollarSign,
  Clock,
  Search,
  Filter,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  Settings,
  ArrowLeft,
  Eye,
  ThumbsUp,
  Loader2,
} from "lucide-react";

interface Technician {
  id: string;
  name: string;
  avatar: string;
  experience: number;
  skills: string[];
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  hourlyRate: number;
  distance: number;
  bio: string;
  certifications: string[];
  availability: "available" | "busy" | "offline";
  phone: string;
  email: string;
  responseTime: string;
  languages: string[];
}

interface TechnicianReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
}

export default function TechnicianSelection() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  // Mock technicians data
  const [technicians] = useState<Technician[]>([
    {
      id: "tech-1",
      name: "John Smith",
      avatar: "JS",
      experience: 8,
      skills: ["HVAC", "Air Conditioning", "Heating", "Electrical"],
      rating: 4.9,
      reviewCount: 127,
      jobsCompleted: 342,
      hourlyRate: 85,
      distance: 2.3,
      bio: "Experienced HVAC technician with over 8 years in the field. Specialized in residential and commercial air conditioning systems. EPA certified and fully licensed. I take pride in providing quality service and clear communication with customers.",
      certifications: [
        "EPA Section 608",
        "NATE Certified",
        "Licensed Electrician",
      ],
      availability: "available",
      phone: "+1 (555) 123-4567",
      email: "john.smith@fix4home.com",
      responseTime: "Usually responds within 30 minutes",
      languages: ["English", "Spanish"],
    },
    {
      id: "tech-2",
      name: "Sarah Wilson",
      avatar: "SW",
      experience: 6,
      skills: ["HVAC", "Plumbing", "General Repair"],
      rating: 4.8,
      reviewCount: 89,
      jobsCompleted: 234,
      hourlyRate: 75,
      distance: 3.7,
      bio: "Multi-skilled technician with expertise in HVAC and plumbing systems. Known for quick problem-solving and efficient service delivery. Always punctual and professional.",
      certifications: ["HVAC Excellence", "Plumbing License"],
      availability: "available",
      phone: "+1 (555) 234-5678",
      email: "sarah.wilson@fix4home.com",
      responseTime: "Usually responds within 1 hour",
      languages: ["English"],
    },
    {
      id: "tech-3",
      name: "Mike Johnson",
      avatar: "MJ",
      experience: 12,
      skills: ["HVAC", "Electrical", "Refrigeration"],
      rating: 4.95,
      reviewCount: 203,
      jobsCompleted: 567,
      hourlyRate: 95,
      distance: 4.1,
      bio: "Senior HVAC specialist with over 12 years of experience. Expert in complex system diagnostics and energy-efficient solutions. Master electrician with additional refrigeration expertise.",
      certifications: ["Master HVAC", "Master Electrician", "EPA Universal"],
      availability: "busy",
      phone: "+1 (555) 345-6789",
      email: "mike.johnson@fix4home.com",
      responseTime: "Usually responds within 2 hours",
      languages: ["English", "French"],
    },
    {
      id: "tech-4",
      name: "Lisa Anderson",
      avatar: "LA",
      experience: 5,
      skills: ["HVAC", "Air Quality", "Ventilation"],
      rating: 4.7,
      reviewCount: 76,
      jobsCompleted: 189,
      hourlyRate: 70,
      distance: 5.2,
      bio: "Dedicated HVAC technician specializing in indoor air quality and ventilation systems. Passionate about helping customers create healthier home environments.",
      certifications: ["NATE Certified", "Indoor Air Quality Specialist"],
      availability: "available",
      phone: "+1 (555) 456-7890",
      email: "lisa.anderson@fix4home.com",
      responseTime: "Usually responds within 45 minutes",
      languages: ["English"],
    },
  ]);

  // Mock reviews for profile dialog
  const mockReviews: TechnicianReview[] = [
    {
      id: "rev-1",
      customerName: "Robert Chen",
      rating: 5,
      comment:
        "Excellent service! Fixed my AC quickly and explained everything clearly. Very professional and knowledgeable.",
      date: "2024-01-20",
      serviceType: "AC Repair",
    },
    {
      id: "rev-2",
      customerName: "Maria Garcia",
      rating: 5,
      comment:
        "Outstanding work! Arrived on time, diagnosed the problem fast, and had it fixed within an hour. Highly recommend!",
      date: "2024-01-18",
      serviceType: "HVAC Maintenance",
    },
    {
      id: "rev-3",
      customerName: "David Thompson",
      rating: 4,
      comment:
        "Good service overall. The technician was professional and got the job done. Would use again.",
      date: "2024-01-15",
      serviceType: "Electrical Work",
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadTechnicians = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      } finally {
        setIsLoading(false);
      }
    };

    loadTechnicians();
  }, [isAuthenticated, navigate]);

  // Filter technicians based on search and filters
  const filteredTechnicians = technicians.filter((tech) => {
    const matchesSearch =
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesExperience =
      experienceFilter === "all" ||
      (experienceFilter === "junior" && tech.experience < 3) ||
      (experienceFilter === "mid" &&
        tech.experience >= 3 &&
        tech.experience < 7) ||
      (experienceFilter === "senior" && tech.experience >= 7);

    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "4+" && tech.rating >= 4) ||
      (ratingFilter === "4.5+" && tech.rating >= 4.5) ||
      (ratingFilter === "4.8+" && tech.rating >= 4.8);

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "budget" && tech.hourlyRate < 75) ||
      (priceFilter === "mid" &&
        tech.hourlyRate >= 75 &&
        tech.hourlyRate < 90) ||
      (priceFilter === "premium" && tech.hourlyRate >= 90);

    return matchesSearch && matchesExperience && matchesRating && matchesPrice;
  });

  const handleSelectTechnician = async (technician: Technician) => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store technician selection
      const bookingData = JSON.parse(
        localStorage.getItem("bookingData") || "{}",
      );
      const updatedBookingData = {
        ...bookingData,
        technicianId: technician.id,
        estimatedCost: technician.hourlyRate * 2, // Assuming 2 hours average
      };
      localStorage.setItem("bookingData", JSON.stringify(updatedBookingData));

      navigate("/booking/confirm");
    } catch (error) {
      console.error("Failed to select technician:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewProfile = (technician: Technician) => {
    setSelectedTechnician(technician);
    setShowProfileDialog(true);
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

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "busy":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "offline":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "available":
        return "Available Now";
      case "busy":
        return "Busy";
      case "offline":
        return "Offline";
      default:
        return "Unknown";
    }
  };

  return (
    <Layout
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Book Service", href: `/booking/service/${serviceId}` },
        { label: "Select Technician" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Select a Technician
                </h1>
                <p className="text-muted-foreground">
                  Choose from our qualified professionals for your service
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate(`/booking/service/${serviceId}`)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Booking
              </Button>
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Filter Technicians
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label>Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or skill..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Experience</Label>
                    <Select
                      value={experienceFilter}
                      onValueChange={setExperienceFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="junior">
                          Junior (0-3 years)
                        </SelectItem>
                        <SelectItem value="mid">Mid (3-7 years)</SelectItem>
                        <SelectItem value="senior">
                          Senior (7+ years)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <Select
                      value={ratingFilter}
                      onValueChange={setRatingFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="4+">4.0+ Stars</SelectItem>
                        <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                        <SelectItem value="4.8+">4.8+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Price Range</Label>
                    <Select value={priceFilter} onValueChange={setPriceFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="budget">
                          Budget ($50-75/hr)
                        </SelectItem>
                        <SelectItem value="mid">
                          Mid-range ($75-90/hr)
                        </SelectItem>
                        <SelectItem value="premium">
                          Premium ($90+/hr)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setExperienceFilter("all");
                        setRatingFilter("all");
                        setPriceFilter("all");
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>

                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {filteredTechnicians.length} of {technicians.length}{" "}
                  technicians
                </div>
              </CardContent>
            </Card>

            {/* Technicians List */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-20 w-full mb-4" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredTechnicians.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No technicians found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to find suitable technicians for
                    your service.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setExperienceFilter("all");
                      setRatingFilter("all");
                      setPriceFilter("all");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTechnicians.map((technician) => (
                  <Card
                    key={technician.id}
                    className="hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarFallback className="text-lg font-semibold">
                              {technician.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">
                              {technician.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant="outline"
                                className={getAvailabilityColor(
                                  technician.availability,
                                )}
                              >
                                {getAvailabilityText(technician.availability)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              {renderStars(technician.rating)}
                              <span className="text-sm text-muted-foreground ml-1">
                                {technician.rating} ({technician.reviewCount})
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="w-4 h-4 text-muted-foreground" />
                          <span>{technician.experience} years experience</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-muted-foreground" />
                          <span>{technician.jobsCompleted} jobs completed</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{technician.distance} miles away</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold text-primary">
                            ${technician.hourlyRate}/hour
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {technician.skills.slice(0, 3).map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {technician.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{technician.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button
                          onClick={() => handleSelectTechnician(technician)}
                          disabled={
                            technician.availability === "offline" ||
                            isProcessing
                          }
                          className="w-full"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Selecting...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              {technician.availability === "available"
                                ? "Select This Technician"
                                : technician.availability === "busy"
                                  ? "Book When Available"
                                  : "Not Available"}
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleViewProfile(technician)}
                          className="w-full"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Technician Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-lg font-semibold">
                  {selectedTechnician?.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedTechnician?.name}
                </h3>
                <Badge
                  variant="outline"
                  className={
                    selectedTechnician
                      ? getAvailabilityColor(selectedTechnician.availability)
                      : ""
                  }
                >
                  {selectedTechnician
                    ? getAvailabilityText(selectedTechnician.availability)
                    : ""}
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedTechnician && (
            <div className="space-y-6">
              {/* Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {selectedTechnician.rating}
                  </div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedTechnician.jobsCompleted}
                  </div>
                  <div className="text-xs text-muted-foreground">Jobs Done</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedTechnician.experience}y
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Experience
                  </div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    ${selectedTechnician.hourlyRate}
                  </div>
                  <div className="text-xs text-muted-foreground">Per Hour</div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedTechnician.bio}
                </p>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedTechnician.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedTechnician.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedTechnician.responseTime}</span>
                  </div>
                </div>
              </div>

              {/* Skills & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTechnician.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Certifications</h4>
                  <div className="space-y-1">
                    {selectedTechnician.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Award className="w-4 h-4 text-primary" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Recent Reviews */}
              <div>
                <h4 className="font-semibold mb-3">Recent Reviews</h4>
                <div className="space-y-4 max-h-48 overflow-y-auto">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {review.customerName}
                          </span>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {review.comment}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {review.serviceType}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    setShowProfileDialog(false);
                    handleSelectTechnician(selectedTechnician);
                  }}
                  disabled={selectedTechnician.availability === "offline"}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Book This Technician
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowProfileDialog(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
