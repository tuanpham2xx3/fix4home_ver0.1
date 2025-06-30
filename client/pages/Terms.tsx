import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/shared/Layout";
import {
  Wrench,
  Phone,
  Home,
  ChevronRight,
  FileText,
  AlertCircle,
  ArrowUp,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const tableOfContents = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "description", title: "2. Service Description" },
  { id: "user-accounts", title: "3. User Accounts and Registration" },
  { id: "user-responsibilities", title: "4. User Responsibilities" },
  { id: "technician-terms", title: "5. Technician Terms and Conditions" },
  { id: "service-booking", title: "6. Service Booking and Payment" },
  { id: "cancellation", title: "7. Cancellation and Refund Policy" },
  { id: "quality-guarantee", title: "8. Quality Guarantee and Warranty" },
  { id: "limitation-liability", title: "9. Limitation of Liability" },
  { id: "intellectual-property", title: "10. Intellectual Property Rights" },
  { id: "privacy", title: "11. Privacy and Data Protection" },
  { id: "termination", title: "12. Termination of Service" },
  { id: "governing-law", title: "13. Governing Law and Dispute Resolution" },
  { id: "modifications", title: "14. Modifications to Terms" },
  { id: "contact", title: "15. Contact Information" },
];

export default function Terms() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Simulate loading terms (in real app, this would fetch from API)
    const loadTerms = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate occasional loading error
        if (Math.random() < 0.05) {
          throw new Error("Failed to load Terms of Use");
        }

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load terms");
        setIsLoading(false);
      }
    };

    loadTerms();

    // Scroll spy for active section
    const handleScroll = () => {
      const sections = tableOfContents.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <TermsSkeleton />;
  }

  if (error) {
    return <TermsError error={error} />;
  }

  return (
    <Layout breadcrumbs={[{ label: "Terms of Use" }]}>
      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Terms of Use
              </h1>
              <p className="text-lg text-muted-foreground">
                Effective Date: January 1, 2024
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Last Updated: January 1, 2024
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Table of Contents */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Table of Contents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-2">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                            activeSection === item.id
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-primary hover:bg-muted"
                          }`}
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Terms Content */}
              <div className="lg:col-span-3">
                <div className="prose prose-lg max-w-none">
                  {/* Introduction */}
                  <div className="mb-12 p-6 bg-muted/50 rounded-lg">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Welcome to FIX4HOME
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      These Terms of Use ("Terms") govern your access to and use
                      of FIX4HOME's platform, website, and services. By using
                      our services, you agree to be bound by these Terms. Please
                      read them carefully.
                    </p>
                  </div>

                  {/* Section 1 */}
                  <section id="acceptance" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      1. Acceptance of Terms
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        By accessing or using FIX4HOME's platform, website,
                        mobile application, or any related services
                        (collectively, the "Service"), you acknowledge that you
                        have read, understood, and agree to be bound by these
                        Terms of Use and our Privacy Policy.
                      </p>
                      <p>
                        If you do not agree to these Terms, you may not access
                        or use our Service. These Terms constitute a legally
                        binding agreement between you and FIX4HOME Company
                        Limited ("FIX4HOME," "we," "us," or "our").
                      </p>
                      <p>
                        You must be at least 18 years old to use our Service. By
                        using our Service, you represent and warrant that you
                        are at least 18 years old and have the legal capacity to
                        enter into these Terms.
                      </p>
                    </div>
                  </section>

                  {/* Section 2 */}
                  <section id="description" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      2. Service Description
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        FIX4HOME is an online platform that connects customers
                        with certified technicians for home repair and
                        maintenance services. Our Service includes:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Online booking system for home repair services</li>
                        <li>
                          Technician verification and certification processes
                        </li>
                        <li>Customer support and service coordination</li>
                        <li>Payment processing and transaction management</li>
                        <li>Quality assurance and warranty programs</li>
                        <li>Customer review and rating systems</li>
                      </ul>
                      <p>
                        We act as an intermediary platform and do not directly
                        provide home repair services. All services are performed
                        by independent certified technicians who use our
                        platform.
                      </p>
                    </div>
                  </section>

                  {/* Section 3 */}
                  <section id="user-accounts" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      3. User Accounts and Registration
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        To use certain features of our Service, you must create
                        an account. When creating an account, you agree to:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          Provide accurate, current, and complete information
                        </li>
                        <li>Maintain and update your account information</li>
                        <li>
                          Keep your login credentials secure and confidential
                        </li>
                        <li>
                          Notify us immediately of any unauthorized account
                          access
                        </li>
                        <li>
                          Accept responsibility for all activities under your
                          account
                        </li>
                      </ul>
                      <p>
                        We reserve the right to suspend or terminate accounts
                        that violate these Terms or provide false information.
                        You may only create one account per person or entity.
                      </p>
                    </div>
                  </section>

                  {/* Section 4 */}
                  <section id="user-responsibilities" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      4. User Responsibilities
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>As a user of our Service, you agree to:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Use the Service only for lawful purposes</li>
                        <li>
                          Provide accurate information when booking services
                        </li>
                        <li>
                          Treat technicians with respect and professionalism
                        </li>
                        <li>
                          Allow safe access to your property for service
                          delivery
                        </li>
                        <li>Pay for services as agreed upon</li>
                        <li>Report any issues or concerns promptly</li>
                        <li>Comply with all applicable laws and regulations</li>
                      </ul>
                      <p>
                        You agree not to use our Service to engage in any
                        illegal, fraudulent, or abusive behavior. This includes
                        but is not limited to harassment, discrimination, or any
                        form of threatening behavior towards our staff or
                        service providers.
                      </p>
                    </div>
                  </section>

                  {/* Section 5 */}
                  <section id="technician-terms" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      5. Technician Terms and Conditions
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Technicians using our platform agree to additional terms
                        including:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Maintain valid licenses and certifications</li>
                        <li>
                          Provide services with professional skill and care
                        </li>
                        <li>Comply with safety standards and regulations</li>
                        <li>Use genuine parts and quality materials</li>
                        <li>Complete background verification processes</li>
                        <li>Maintain professional conduct at all times</li>
                        <li>Honor agreed-upon pricing and schedules</li>
                      </ul>
                      <p>
                        Technicians are independent contractors and not
                        employees of FIX4HOME. They are responsible for their
                        own taxes, insurance, and legal compliance.
                      </p>
                    </div>
                  </section>

                  {/* Section 6 */}
                  <section id="service-booking" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      6. Service Booking and Payment
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>When booking services through our platform:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          Service prices are estimates and may vary based on
                          actual work required
                        </li>
                        <li>
                          Final pricing will be confirmed before work begins
                        </li>
                        <li>
                          Payment is due upon completion of services unless
                          otherwise agreed
                        </li>
                        <li>
                          We accept various payment methods as displayed on our
                          platform
                        </li>
                        <li>
                          All transactions are processed securely through our
                          payment partners
                        </li>
                        <li>
                          Additional charges may apply for emergency or
                          after-hours services
                        </li>
                      </ul>
                      <p>
                        By booking a service, you enter into a direct agreement
                        with the assigned technician for the provision of
                        services, with FIX4HOME facilitating the transaction.
                      </p>
                    </div>
                  </section>

                  {/* Section 7 */}
                  <section id="cancellation" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      7. Cancellation and Refund Policy
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>Our cancellation and refund policy includes:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          Free cancellation up to 4 hours before scheduled
                          service
                        </li>
                        <li>
                          Cancellations within 4 hours may incur a cancellation
                          fee
                        </li>
                        <li>
                          No-show customers may be charged the full service fee
                        </li>
                        <li>
                          Refunds for unsatisfactory work will be evaluated
                          case-by-case
                        </li>
                        <li>
                          Emergency services may have different cancellation
                          terms
                        </li>
                        <li>Refund processing may take 5-10 business days</li>
                      </ul>
                      <p>
                        In cases where work cannot be completed due to
                        circumstances beyond the technician's control, customers
                        will only be charged for work actually performed.
                      </p>
                    </div>
                  </section>

                  {/* Section 8 */}
                  <section id="quality-guarantee" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      8. Quality Guarantee and Warranty
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>FIX4HOME provides quality assurance through:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>1-year warranty on most repair work</li>
                        <li>30-day guarantee on parts and materials</li>
                        <li>Free return visits for warranty-covered issues</li>
                        <li>
                          Quality control inspections and customer feedback
                          reviews
                        </li>
                        <li>Technician performance monitoring and training</li>
                        <li>
                          Customer support for any service-related concerns
                        </li>
                      </ul>
                      <p>
                        Warranty coverage excludes normal wear and tear, misuse,
                        or damage caused by factors beyond the technician's
                        control. Warranty claims must be reported within the
                        specified timeframe.
                      </p>
                    </div>
                  </section>

                  {/* Section 9 */}
                  <section id="limitation-liability" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      9. Limitation of Liability
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>To the maximum extent permitted by law:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          FIX4HOME's liability is limited to the cost of
                          services provided
                        </li>
                        <li>
                          We are not liable for indirect, incidental, or
                          consequential damages
                        </li>
                        <li>
                          Our platform facilitates connections but doesn't
                          guarantee service outcomes
                        </li>
                        <li>
                          Technicians are responsible for their own professional
                          liability
                        </li>
                        <li>
                          Users assume responsibility for property access and
                          safety
                        </li>
                        <li>
                          Force majeure events are excluded from liability
                        </li>
                      </ul>
                      <p>
                        This limitation applies except where prohibited by
                        applicable law. Some jurisdictions do not allow certain
                        liability limitations, so these may not apply to you.
                      </p>
                    </div>
                  </section>

                  {/* Section 10 */}
                  <section id="intellectual-property" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      10. Intellectual Property Rights
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        All intellectual property rights in our Service belong
                        to FIX4HOME, including:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Website design, layout, and user interface</li>
                        <li>FIX4HOME trademarks, logos, and brand materials</li>
                        <li>Software, algorithms, and technical systems</li>
                        <li>Content, text, images, and multimedia materials</li>
                        <li>Database structures and compiled user data</li>
                      </ul>
                      <p>
                        Users may not reproduce, distribute, modify, or create
                        derivative works from our intellectual property without
                        explicit written permission. Limited use rights are
                        granted solely for accessing and using our Service as
                        intended.
                      </p>
                    </div>
                  </section>

                  {/* Section 11 */}
                  <section id="privacy" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      11. Privacy and Data Protection
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Your privacy is important to us. Our data handling
                        practices include:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          Collection of information necessary for service
                          delivery
                        </li>
                        <li>
                          Secure storage and transmission of personal data
                        </li>
                        <li>
                          Limited sharing with technicians for service
                          completion
                        </li>
                        <li>
                          Compliance with applicable privacy laws and
                          regulations
                        </li>
                        <li>
                          User rights to access, correct, and delete personal
                          information
                        </li>
                        <li>
                          Regular security audits and data protection measures
                        </li>
                      </ul>
                      <p>
                        For detailed information about our data practices,
                        please review our{" "}
                        <Link
                          to="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        , which is incorporated into these Terms by reference.
                      </p>
                    </div>
                  </section>

                  {/* Section 12 */}
                  <section id="termination" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      12. Termination of Service
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>Either party may terminate this agreement:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Users may close their accounts at any time</li>
                        <li>
                          We may suspend or terminate accounts for Terms
                          violations
                        </li>
                        <li>
                          Immediate termination for illegal or harmful
                          activities
                        </li>
                        <li>
                          30-day notice for material changes to service terms
                        </li>
                        <li>
                          Pending services and payments remain valid after
                          termination
                        </li>
                        <li>
                          Data retention follows our Privacy Policy guidelines
                        </li>
                      </ul>
                      <p>
                        Upon termination, your right to use the Service ceases
                        immediately. However, these Terms remain in effect for
                        any pending transactions or legal obligations.
                      </p>
                    </div>
                  </section>

                  {/* Section 13 */}
                  <section id="governing-law" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      13. Governing Law and Dispute Resolution
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>These Terms are governed by the laws of Vietnam:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          Vietnamese law applies to all disputes and
                          interpretations
                        </li>
                        <li>
                          Courts in Ho Chi Minh City have exclusive jurisdiction
                        </li>
                        <li>Mediation is preferred for resolving disputes</li>
                        <li>
                          Arbitration may be required for certain commercial
                          disputes
                        </li>
                        <li>
                          Small claims may be handled through customer support
                        </li>
                        <li>Consumer protection laws remain applicable</li>
                      </ul>
                      <p>
                        We encourage users to contact our customer support team
                        first to resolve any issues before pursuing formal legal
                        action.
                      </p>
                    </div>
                  </section>

                  {/* Section 14 */}
                  <section id="modifications" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      14. Modifications to Terms
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>We may update these Terms periodically:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          Material changes will be communicated with 30-day
                          notice
                        </li>
                        <li>Updated Terms will be posted on our website</li>
                        <li>
                          Continued use constitutes acceptance of new Terms
                        </li>
                        <li>
                          Users may terminate accounts if they disagree with
                          changes
                        </li>
                        <li>
                          Email notifications for significant modifications
                        </li>
                        <li>Version history available upon request</li>
                      </ul>
                      <p>
                        We recommend reviewing these Terms periodically to stay
                        informed of any updates that may affect your use of our
                        Service.
                      </p>
                    </div>
                  </section>

                  {/* Section 15 */}
                  <section id="contact" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      15. Contact Information
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        For questions about these Terms or our Service, contact
                        us:
                      </p>
                      <div className="bg-muted/50 p-6 rounded-lg">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <strong>FIX4HOME Company Limited</strong>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span>📧</span>
                            <span>legal@fix4home.vn</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span>📞</span>
                            <span>Hotline: 1900-1234</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <span>📍</span>
                            <span>
                              123 Nguyen Hue Street
                              <br />
                              District 1, Ho Chi Minh City
                              <br />
                              Vietnam 700000
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span>🕒</span>
                            <span>
                              Business Hours: Monday-Friday, 8:00 AM - 6:00 PM
                            </span>
                          </div>
                        </div>
                      </div>
                      <p>
                        We strive to respond to all inquiries within 2 business
                        days. For immediate assistance, please use our customer
                        support hotline.
                      </p>
                    </div>
                  </section>

                  {/* Last Updated */}
                  <div className="border-t pt-8 mt-12">
                    <p className="text-sm text-muted-foreground text-center">
                      These Terms of Use were last updated on January 1, 2024.
                      <br />
                      Thank you for choosing FIX4HOME for your home repair
                      needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg"
        size="sm"
      >
        <ArrowUp className="w-4 h-4" />
      </Button>
    </Layout>
  );
}

// Loading Skeleton
function TermsSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-white p-4">
        <div className="container mx-auto">
          <Skeleton className="h-8 w-32" />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-16 w-16 rounded-full mx-auto mb-6" />
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="lg:col-span-3 space-y-8">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-32 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Error State
function TermsError({ error }: { error: string }) {
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
            Unable to Load Terms
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {error}. Please try again later or contact support if the problem
            persists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
            <Button variant="outline" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
