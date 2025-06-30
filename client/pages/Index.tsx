import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/shared/Layout";
import {
  Star,
  Phone,
  MessageCircle,
  CheckCircle,
  Users,
  Award,
  Clock,
  Shield,
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Droplets,
  Settings,
  ChevronLeft,
  ChevronRight,
  Play,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

// Services data - can be set to empty array to test empty state
const services = [
  {
    id: 1,
    name: "Emergency Plumbing Repair",
    description:
      "24/7 emergency plumbing services for urgent leaks, clogs, and repairs.",
    price: 150000,
    image: "/api/placeholder/400/300",
    icon: Droplets,
    rating: 4.9,
    reviews: 324,
    popularity: 95,
  },
  {
    id: 2,
    name: "Home Electrical Installation",
    description:
      "Professional electrical wiring, outlet installation, and safety inspections.",
    price: 200000,
    image: "/api/placeholder/400/300",
    icon: Zap,
    rating: 4.8,
    reviews: 256,
    popularity: 87,
  },
  {
    id: 3,
    name: "Interior Wall Painting",
    description:
      "Quality interior painting services with premium paint and professional finish.",
    price: 120000,
    image: "/api/placeholder/400/300",
    icon: Paintbrush,
    rating: 4.7,
    reviews: 189,
    popularity: 78,
  },
  {
    id: 4,
    name: "Furniture Assembly & Repair",
    description:
      "Expert furniture assembly, repair, and restoration services for all types.",
    price: 100000,
    image: "/api/placeholder/400/300",
    icon: Hammer,
    rating: 4.6,
    reviews: 145,
    popularity: 72,
  },
  {
    id: 5,
    name: "Air Conditioner Maintenance",
    description:
      "Complete AC servicing, cleaning, and repair for optimal cooling performance.",
    price: 180000,
    image: "/api/placeholder/400/300",
    icon: Settings,
    rating: 4.8,
    reviews: 278,
    popularity: 89,
  },
  {
    id: 6,
    name: "Home Maintenance",
    description:
      "Regular maintenance checks and preventive care for your home.",
    price: 250000,
    image: "/api/placeholder/400/300",
    icon: Wrench,
    rating: 4.7,
    reviews: 201,
    popularity: 81,
  },
];

const heroSlides = [
  {
    image: "/api/placeholder/1200/600",
    title: "Professional Home Repair Services",
    subtitle:
      "Get your home fixed by certified technicians. Fast, reliable, and affordable service at your doorstep.",
  },
  {
    image: "/api/placeholder/1200/600",
    title: "24/7 Emergency Repairs",
    subtitle:
      "Urgent home repairs? Our emergency team is available around the clock to help you.",
  },
  {
    image: "/api/placeholder/1200/600",
    title: "Certified Technicians",
    subtitle:
      "All our technicians are certified professionals with years of experience in home repairs.",
  },
];

const reviews = [
  {
    name: "Minh Nguyen",
    rating: 5,
    comment:
      "Excellent service! The technician fixed my plumbing issue quickly and professionally. Highly recommended!",
    avatar: "/api/placeholder/60/60",
    location: "Ho Chi Minh City",
  },
  {
    name: "Thu Ha Tran",
    rating: 5,
    comment:
      "Very satisfied with the electrical work. Clean, efficient, and affordable pricing. Will use again!",
    avatar: "/api/placeholder/60/60",
    location: "Hanoi",
  },
  {
    name: "Duc Le",
    rating: 5,
    comment:
      "Amazing painting service! They transformed my living room completely. Professional and on time.",
    avatar: "/api/placeholder/60/60",
    location: "Da Nang",
  },
];

const stats = [
  { label: "Orders Completed", value: "10,000+", icon: CheckCircle },
  { label: "Certified Technicians", value: "500+", icon: Users },
  { label: "Customer Satisfaction", value: "98%", icon: Star },
  { label: "Cities Served", value: "15+", icon: Award },
];

const processSteps = [
  {
    icon: Users,
    title: "Sign Up",
    description: "Create your account in minutes with just basic information",
    step: "01",
  },
  {
    icon: Phone,
    title: "Book Service",
    description: "Choose your service and preferred time slot easily",
    step: "02",
  },
  {
    icon: Wrench,
    title: "Get Repair",
    description: "Our certified technician arrives and fixes your issue",
    step: "03",
  },
  {
    icon: Star,
    title: "Review",
    description: "Rate your experience and help us improve our service",
    step: "04",
  },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <Layout>
      {/* Hero Section with Image Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/60 to-secondary/70 z-10" />
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <Button
                      size="lg"
                      className="text-lg px-8 py-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                    >
                      <Wrench className="w-5 h-5 mr-2" />
                      Book Service Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary font-semibold"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-primary bg-primary/10 border-primary/20">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Expert Home Repair Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              Professional home repair and maintenance services delivered by
              certified technicians with years of experience
            </p>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className="hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 shadow-lg hover:-translate-y-1"
                >
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
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
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
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
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Starting from
                          </span>
                          <div className="text-lg font-bold text-primary">
                            {formatPrice(service.price)}đ
                          </div>
                        </div>
                        <Button
                          asChild
                          className="group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          <Link to={`/services/${service.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Empty State for Services
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Wrench className="w-16 h-16 text-primary/60" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Services Coming Soon
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  We're working hard to bring you the best home repair services.
                  Check back soon or contact us for immediate assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-primary bg-primary/10 border-primary/20">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Simple Steps to Fix Your Home
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get your home repaired in just four easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews & Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Reviews */}
            <div>
              <div className="mb-12">
                <Badge className="mb-4 text-primary bg-primary/10 border-primary/20">
                  Customer Reviews
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  What Our Customers Say
                </h2>
                <p className="text-muted-foreground text-lg">
                  Real feedback from satisfied customers
                </p>
              </div>

              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-foreground">
                                {review.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {review.location}
                              </p>
                            </div>
                            <div className="flex space-x-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            "{review.comment}"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div>
              <div className="mb-12">
                <Badge className="mb-4 text-primary bg-primary/10 border-primary/20">
                  Our Impact
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Trusted by Thousands
                </h2>
                <p className="text-muted-foreground text-lg">
                  Numbers that speak for our quality
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardContent className="p-8">
                      <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <div className="text-4xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 text-primary bg-primary/10 border-primary/20">
              About FIX4HOME
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8">
              Your Trusted Home Repair Partner
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              FIX4HOME is Vietnam's leading home repair and maintenance
              platform, connecting homeowners with certified technicians for
              reliable, affordable, and professional services. Since our
              founding, we've completed over 10,000 repairs and built a network
              of 500+ skilled professionals across 15 cities.
            </p>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Our mission is to make home maintenance effortless and accessible.
              Whether it's a leaky faucet, electrical issue, or a complete room
              makeover, our certified technicians deliver quality work with
              transparent pricing and guaranteed satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Read Our Full Story</Link>
              </Button>
              <Button size="lg" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          title="WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          title="Zalo"
        >
          <div className="w-6 h-6 bg-white rounded text-blue-500 text-xs font-bold flex items-center justify-center">
            Z
          </div>
        </Button>
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          title="Call Hotline"
        >
          <Phone className="w-6 h-6" />
        </Button>
      </div>

      {/* Quick Contact Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Help Right Away?
            </h2>
            <p className="text-lg mb-10 opacity-90 max-w-2xl mx-auto">
              Contact us through your preferred channel. Our support team is
              available 24/7 for emergency repairs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto min-w-[180px]"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Messenger
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto min-w-[180px]"
              >
                <div className="w-5 h-5 bg-blue-500 rounded mr-2 text-white text-xs font-bold flex items-center justify-center">
                  Z
                </div>
                Zalo
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-w-[180px] bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: 1900-1234
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
