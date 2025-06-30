import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/shared/Layout";
import {
  Wrench,
  Phone,
  Star,
  Users,
  Award,
  Shield,
  Clock,
  CheckCircle,
  Target,
  Heart,
  Lightbulb,
  Home,
  ChevronRight,
  MapPin,
  Mail,
  Calendar,
  TrendingUp,
  UserPlus,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Nguyen Van Duc",
    role: "Founder & CEO",
    image: "/api/placeholder/200/200",
    description:
      "10+ years in home services industry. Former engineer with passion for solving everyday problems.",
    linkedIn: "#",
  },
  {
    name: "Tran Thi Mai",
    role: "Co-Founder & COO",
    image: "/api/placeholder/200/200",
    description:
      "Expert in operations management. Led scaling of service delivery across 15 cities.",
    linkedIn: "#",
  },
  {
    name: "Le Minh Hieu",
    role: "CTO",
    image: "/api/placeholder/200/200",
    description:
      "Technology leader with background in mobile apps and service platforms.",
    linkedIn: "#",
  },
  {
    name: "Pham Thu Ha",
    role: "Head of Quality",
    image: "/api/placeholder/200/200",
    description:
      "Ensures every technician meets our high standards through rigorous training programs.",
    linkedIn: "#",
  },
];

const coreValues = [
  {
    icon: Shield,
    title: "Quality First",
    description:
      "Every repair meets our strict quality standards with certified technicians and premium materials.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description:
      "On-time service delivery with transparent communication throughout the entire process.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description:
      "Treating every home as our own, with respect, care, and attention to detail.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Constantly improving our services with new technology and better processes.",
  },
  {
    icon: Users,
    title: "Teamwork",
    description:
      "Strong partnerships with technicians and suppliers to deliver exceptional results.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "Striving for perfection in every repair, every interaction, every outcome.",
  },
];

const achievements = [
  {
    icon: CheckCircle,
    number: "10,000+",
    label: "Repairs Completed",
    description: "Successfully fixed over 10,000 home issues",
  },
  {
    icon: Users,
    number: "500+",
    label: "Certified Technicians",
    description: "Professional network across Vietnam",
  },
  {
    icon: Star,
    number: "98%",
    label: "Customer Satisfaction",
    description: "Consistently high ratings and reviews",
  },
  {
    icon: Award,
    number: "15",
    label: "Cities Served",
    description: "Expanding coverage nationwide",
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Emergency Support",
    description: "Always available when you need us",
  },
  {
    icon: TrendingUp,
    number: "3 Years",
    label: "Industry Experience",
    description: "Trusted leader in home services",
  },
];

const galleryImages = [
  {
    src: "/api/placeholder/400/300",
    alt: "FIX4HOME headquarters office",
    caption: "Our modern headquarters in Ho Chi Minh City",
  },
  {
    src: "/api/placeholder/400/300",
    alt: "Technician training session",
    caption: "Regular training sessions for our technicians",
  },
  {
    src: "/api/placeholder/400/300",
    alt: "Customer service team",
    caption: "24/7 customer support team at work",
  },
  {
    src: "/api/placeholder/400/300",
    alt: "Quality control workshop",
    caption: "Quality control and equipment maintenance",
  },
  {
    src: "/api/placeholder/400/300",
    alt: "Team meeting",
    caption: "Weekly team meetings and planning sessions",
  },
  {
    src: "/api/placeholder/400/300",
    alt: "Technology center",
    caption: "Our technology and development center",
  },
];

export default function About() {
  return (
    <Layout breadcrumbs={[{ label: "About Us" }]}>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 text-primary bg-primary/10 border-primary/20">
              About FIX4HOME
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Fixing Homes, Building Trust
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're Vietnam's leading home repair platform, connecting
              homeowners with certified technicians for reliable, professional,
              and affordable services across the nation.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p className="leading-relaxed">
                  FIX4HOME was founded in 2021 when our founders experienced
                  firsthand the frustration of finding reliable home repair
                  services. After a plumbing emergency left them waiting hours
                  for overpriced, unprofessional service, they knew there had to
                  be a better way.
                </p>
                <p className="leading-relaxed">
                  Starting with just five certified technicians in Ho Chi Minh
                  City, we've grown into Vietnam's most trusted home repair
                  platform. Our mission remains unchanged: to make quality home
                  maintenance accessible, reliable, and affordable for every
                  Vietnamese family. Today, we're proud to serve over 15 cities
                  with a network of 500+ certified professionals.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <Wrench className="w-24 h-24 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground">
                      Founded in 2021
                    </p>
                    <p className="text-muted-foreground">
                      Ho Chi Minh City, Vietnam
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-primary bg-primary/10 border-primary/20">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our core values guide every decision we make and every service we
              deliver
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-primary bg-primary/10 border-primary/20">
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Meet the Leaders
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The passionate team behind FIX4HOME's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 group border-0 shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                      <Users className="w-16 h-16 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <Badge className="mb-4" variant="outline">
                    {member.role}
                  </Badge>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-primary bg-primary/10 border-primary/20">
              Our Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Numbers That Matter
            </h2>
            <p className="text-lg text-muted-foreground">
              Measurable results that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md"
              >
                <CardContent className="p-8">
                  <achievement.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">
                    {achievement.number}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {achievement.label}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Office Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-primary bg-primary/10 border-primary/20">
              Behind the Scenes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Inside FIX4HOME
            </h2>
            <p className="text-lg text-muted-foreground">
              A glimpse into our offices, training centers, and daily operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group border-0 shadow-lg"
              >
                <div className="aspect-video relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <Wrench className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-sm text-primary font-medium">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground text-center">
                    {image.caption}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the FIX4HOME Team
            </h2>
            <p className="text-lg opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Be part of Vietnam's leading home repair platform. Whether you're
              a skilled technician looking for flexible work or a professional
              wanting to join our growing team, we'd love to hear from you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white/10 border-white/20 text-center">
                <CardContent className="p-8">
                  <UserPlus className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-4">
                    Become a Technician
                  </h3>
                  <p className="opacity-90 mb-6">
                    Join our network of certified professionals and grow your
                    business with flexible schedules and guaranteed work.
                  </p>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <Link to="/register-technician">Apply as Technician</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 text-center">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-4">
                    Career Opportunities
                  </h3>
                  <p className="opacity-90 mb-6">
                    Join our corporate team in technology, operations, customer
                    service, and business development roles.
                  </p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-transparent border-white text-white hover:bg-white hover:text-primary"
                    asChild
                  >
                    <Link to="/contact">View Open Positions</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact HR Team
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat with Recruiter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Map */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Visit Our Office
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Headquarters
                    </h3>
                    <p className="text-muted-foreground">
                      123 Nguyen Hue Street
                      <br />
                      District 1, Ho Chi Minh City
                      <br />
                      Vietnam 700000
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Contact
                    </h3>
                    <p className="text-muted-foreground">
                      Hotline: 1900-1234
                      <br />
                      Email: support@fix4home.vn
                      <br />
                      Business: business@fix4home.vn
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Office Hours
                    </h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 6:00 PM
                      <br />
                      Saturday: 8:00 AM - 5:00 PM
                      <br />
                      Sunday: Emergency support only
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>

            {/* Map */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Interactive Map
                    </h3>
                    <p className="text-muted-foreground">
                      123 Nguyen Hue Street, District 1
                      <br />
                      Ho Chi Minh City, Vietnam
                    </p>
                    <Button className="mt-6" variant="outline">
                      <MapPin className="w-4 h-4 mr-2" />
                      View on Google Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
