import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/shared/Layout";
import {
  Search,
  Filter,
  Wrench,
  Phone,
  Star,
  Droplets,
  Zap,
  Paintbrush,
  Hammer,
  Settings,
  Home,
  ChevronRight,
  SlidersHorizontal,
  TrendingUp,
  Grid3X3,
  List,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock services data
const allServices = [
  {
    id: 1,
    name: "Emergency Plumbing Repair",
    description:
      "24/7 emergency plumbing services for urgent leaks, clogs, and repairs.",
    price: 150000,
    category: "Plumbing",
    image: "/api/placeholder/400/300",
    icon: Droplets,
    rating: 4.9,
    reviews: 324,
    popularity: 95,
    tags: ["emergency", "24/7", "urgent"],
  },
  {
    id: 2,
    name: "Home Electrical Installation",
    description:
      "Professional electrical wiring, outlet installation, and safety inspections.",
    price: 200000,
    category: "Electrical",
    image: "/api/placeholder/400/300",
    icon: Zap,
    rating: 4.8,
    reviews: 256,
    popularity: 87,
    tags: ["installation", "safety", "certified"],
  },
  {
    id: 3,
    name: "Interior Wall Painting",
    description:
      "Quality interior painting services with premium paint and professional finish.",
    price: 120000,
    category: "Painting",
    image: "/api/placeholder/400/300",
    icon: Paintbrush,
    rating: 4.7,
    reviews: 189,
    popularity: 78,
    tags: ["interior", "premium", "professional"],
  },
  {
    id: 4,
    name: "Furniture Assembly & Repair",
    description:
      "Expert furniture assembly, repair, and restoration services for all types.",
    price: 100000,
    category: "General Repair",
    image: "/api/placeholder/400/300",
    icon: Hammer,
    rating: 4.6,
    reviews: 145,
    popularity: 72,
    tags: ["furniture", "assembly", "restoration"],
  },
  {
    id: 5,
    name: "Air Conditioner Maintenance",
    description:
      "Complete AC servicing, cleaning, and repair for optimal cooling performance.",
    price: 180000,
    category: "Appliance Repair",
    image: "/api/placeholder/400/300",
    icon: Settings,
    rating: 4.8,
    reviews: 278,
    popularity: 89,
    tags: ["AC", "maintenance", "cooling"],
  },
  {
    id: 6,
    name: "Kitchen Plumbing Service",
    description:
      "Specialized kitchen plumbing for sinks, dishwashers, and garbage disposals.",
    price: 160000,
    category: "Plumbing",
    image: "/api/placeholder/400/300",
    icon: Droplets,
    rating: 4.7,
    reviews: 201,
    popularity: 81,
    tags: ["kitchen", "sink", "dishwasher"],
  },
  {
    id: 7,
    name: "Ceiling Fan Installation",
    description:
      "Professional ceiling fan installation with electrical wiring and mounting.",
    price: 220000,
    category: "Electrical",
    image: "/api/placeholder/400/300",
    icon: Zap,
    rating: 4.9,
    reviews: 167,
    popularity: 76,
    tags: ["ceiling fan", "installation", "wiring"],
  },
  {
    id: 8,
    name: "Exterior House Painting",
    description:
      "Weather-resistant exterior painting with quality paints and surface prep.",
    price: 250000,
    category: "Painting",
    image: "/api/placeholder/400/300",
    icon: Paintbrush,
    rating: 4.8,
    reviews: 134,
    popularity: 83,
    tags: ["exterior", "weather-resistant", "preparation"],
  },
  {
    id: 9,
    name: "Door Lock Repair",
    description:
      "Lock repair, replacement, and security upgrade services for all door types.",
    price: 90000,
    category: "General Repair",
    image: "/api/placeholder/400/300",
    icon: Hammer,
    rating: 4.5,
    reviews: 98,
    popularity: 65,
    tags: ["lock", "security", "door"],
  },
];

const categories = [
  "All Categories",
  "Plumbing",
  "Electrical",
  "Painting",
  "General Repair",
  "Appliance Repair",
];
const sortOptions = [
  { value: "popularity", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name A-Z" },
];

// Skeleton component for loading state
const ServiceCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <CardContent className="p-6">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </CardContent>
  </Card>
);

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([50000, 300000]);
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let filtered = allServices.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesCategory =
        selectedCategory === "All Categories" ||
        service.category === selectedCategory;
      const matchesPrice =
        service.price >= priceRange[0] && service.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort services
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <Layout breadcrumbs={[{ label: "Services" }]}>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Available Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse our comprehensive range of professional home repair and
              maintenance services
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
            {/* Search Bar */}
            <div className="flex-1 w-full">
              <Label
                htmlFor="search"
                className="text-sm font-medium mb-2 block"
              >
                Search Services
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by service name, description, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-48">
              <Label className="text-sm font-medium mb-2 block">Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="w-full lg:w-64">
              <Label className="text-sm font-medium mb-2 block">
                Price Range: {formatPrice(priceRange[0])}đ -{" "}
                {formatPrice(priceRange[1])}đ
              </Label>
              <div className="px-3">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={300000}
                  min={50000}
                  step={10000}
                  className="w-full"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="w-full lg:w-48">
              <Label className="text-sm font-medium mb-2 block">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <div className="text-sm text-muted-foreground">
              {isLoading ? (
                <span>Loading services...</span>
              ) : (
                <span>
                  Showing {filteredServices.length} of {allServices.length}{" "}
                  services
                  {searchQuery && ` for "${searchQuery}"`}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredServices.length} results
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            // Loading State
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {[...Array(6)].map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredServices.length === 0 ? (
            // Empty State
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search className="w-16 h-16 text-primary/60" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  No Services Found
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  We couldn't find any services matching your search criteria.
                  Try adjusting your filters or search terms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All Categories");
                      setPriceRange([50000, 300000]);
                    }}
                  >
                    Clear Filters
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Services Grid/List
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredServices.map((service) => (
                <Card
                  key={service.id}
                  className={`group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:-translate-y-2 ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <CardContent
                    className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}
                  >
                    {/* Service Image */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list"
                          ? "w-64 h-48 flex-shrink-0"
                          : "h-48 w-full"
                      } ${viewMode === "grid" ? "rounded-t-lg" : "rounded-l-lg"}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                        <service.icon className="w-16 h-16 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-secondary text-secondary-foreground">
                          from {formatPrice(service.price)}đ
                        </Badge>
                      </div>
                      {service.popularity > 85 && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-green-500 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Service Content */}
                    <div
                      className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {service.name}
                        </h3>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(service.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {service.rating} ({service.reviews} reviews)
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Starting from
                          </span>
                          <div className="text-lg font-bold text-primary">
                            {formatPrice(service.price)}đ
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button asChild variant="outline" className="flex-1">
                            <Link to={`/services/${service.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <Button
                            asChild
                            className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground"
                          >
                            <Link to={`/booking/service/${service.id}`}>
                              Book Now
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You Need?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Our team offers custom services beyond our standard offerings.
            Contact us to discuss your specific home repair needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: 1900-1234
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
