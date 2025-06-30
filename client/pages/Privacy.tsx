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
  Shield,
  AlertCircle,
  ArrowUp,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const tableOfContents = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-collection", title: "2. Information We Collect" },
  { id: "how-we-use", title: "3. How We Use Your Information" },
  { id: "information-sharing", title: "4. Information Sharing and Disclosure" },
  { id: "data-security", title: "5. Data Security and Protection" },
  { id: "user-rights", title: "6. Your Rights and Choices" },
  { id: "cookies", title: "7. Cookies and Tracking Technologies" },
  { id: "third-party", title: "8. Third-Party Services and Links" },
  { id: "data-retention", title: "9. Data Retention and Deletion" },
  { id: "children-privacy", title: "10. Children's Privacy" },
  { id: "international-transfers", title: "11. International Data Transfers" },
  { id: "policy-updates", title: "12. Policy Updates and Changes" },
  { id: "contact-information", title: "13. Contact Information" },
  { id: "legal-basis", title: "14. Legal Basis for Processing" },
];

export default function Privacy() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Simulate loading privacy policy (in real app, this would fetch from API)
    const loadPrivacyPolicy = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Simulate occasional loading error
        if (Math.random() < 0.05) {
          throw new Error("Failed to load Privacy Policy");
        }

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load policy");
        setIsLoading(false);
      }
    };

    loadPrivacyPolicy();

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
    return <PrivacySkeleton />;
  }

  if (error) {
    return <PrivacyError error={error} />;
  }

  return (
    <Layout breadcrumbs={[{ label: "Privacy Policy" }]}>
      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Privacy Policy
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

              {/* Privacy Policy Content */}
              <div className="lg:col-span-3">
                <div className="prose prose-lg max-w-none">
                  {/* Introduction */}
                  <div className="mb-12 p-6 bg-muted/50 rounded-lg">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Your Privacy Matters
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      At FIX4HOME, we respect your privacy and are committed to
                      protecting your personal information. This Privacy Policy
                      explains how we collect, use, disclose, and safeguard your
                      information when you use our services.
                    </p>
                  </div>

                  {/* Section 1 */}
                  <section id="introduction" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      1. Introduction
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        FIX4HOME Company Limited ("FIX4HOME," "we," "us," or
                        "our") operates the FIX4HOME platform, website, and
                        mobile application that connects customers with
                        certified technicians for home repair services.
                      </p>
                      <p>
                        This Privacy Policy describes how we collect, use,
                        process, and disclose your information, including
                        personal information, in conjunction with your access to
                        and use of our platform and services.
                      </p>
                      <p>
                        By using our services, you acknowledge that you have
                        read and understood this Privacy Policy and agree to the
                        collection and use of information in accordance with
                        this policy.
                      </p>
                    </div>
                  </section>

                  {/* Section 2 */}
                  <section id="information-collection" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      2. Information We Collect
                    </h2>
                    <div className="space-y-6 text-muted-foreground leading-relaxed">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          Personal Information You Provide
                        </h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>
                            Account information: name, email address, phone
                            number
                          </li>
                          <li>
                            Profile information: profile photo, preferences,
                            service history
                          </li>
                          <li>
                            Address and location information for service
                            delivery
                          </li>
                          <li>
                            Payment information: billing address, payment method
                            details
                          </li>
                          <li>
                            Communication data: messages, reviews, support
                            inquiries
                          </li>
                          <li>
                            Identity verification: government ID, professional
                            licenses (for technicians)
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          Information We Collect Automatically
                        </h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>
                            Device information: device type, operating system,
                            browser type
                          </li>
                          <li>
                            Usage data: pages visited, features used, time spent
                            on platform
                          </li>
                          <li>
                            Location data: GPS coordinates, IP address location
                          </li>
                          <li>
                            Technical data: IP address, cookies, session
                            information
                          </li>
                          <li>
                            Performance data: app crashes, response times,
                            errors
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          Information from Third Parties
                        </h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>
                            Background check services (for technician
                            verification)
                          </li>
                          <li>Payment processing services</li>
                          <li>
                            Social media platforms (if you choose to connect)
                          </li>
                          <li>Marketing and analytics partners</li>
                          <li>Public databases and business directories</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Section 3 */}
                  <section id="how-we-use" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      3. How We Use Your Information
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>We use the information we collect to:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          Provide, maintain, and improve our platform and
                          services
                        </li>
                        <li>
                          Process service bookings and facilitate transactions
                        </li>
                        <li>Connect customers with appropriate technicians</li>
                        <li>Verify identity and conduct background checks</li>
                        <li>Process payments and manage billing</li>
                        <li>
                          Send service updates, confirmations, and notifications
                        </li>
                        <li>Provide customer support and resolve issues</li>
                        <li>Prevent fraud and enhance platform security</li>
                        <li>
                          Analyze usage patterns and improve user experience
                        </li>
                        <li>
                          Send marketing communications (with your consent)
                        </li>
                        <li>Comply with legal obligations and regulations</li>
                      </ul>
                    </div>
                  </section>

                  {/* Section 4 */}
                  <section id="information-sharing" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      4. Information Sharing and Disclosure
                    </h2>
                    <div className="space-y-6 text-muted-foreground leading-relaxed">
                      <p>
                        We may share your information in the following
                        circumstances:
                      </p>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          With Service Providers
                        </h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>
                            Technicians: Contact and location information for
                            service delivery
                          </li>
                          <li>
                            Customers: Technician information and service
                            details
                          </li>
                          <li>
                            Payment processors: Billing and transaction
                            information
                          </li>
                          <li>
                            Communication services: For notifications and
                            messaging
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          For Legal and Safety Reasons
                        </h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>
                            To comply with legal obligations and court orders
                          </li>
                          <li>To protect our rights, property, and safety</li>
                          <li>To prevent fraud and illegal activities</li>
                          <li>In connection with investigations or disputes</li>
                          <li>To enforce our Terms of Use and policies</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          Business Transfers
                        </h3>
                        <p>
                          In the event of a merger, acquisition, or sale of
                          assets, your information may be transferred as part of
                          the business transaction, subject to confidentiality
                          agreements.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 5 */}
                  <section id="data-security" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      5. Data Security and Protection
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        We implement comprehensive security measures to protect
                        your information:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          Encryption of data in transit and at rest using
                          industry standards
                        </li>
                        <li>
                          Secure servers with regular security updates and
                          patches
                        </li>
                        <li>Access controls and authentication mechanisms</li>
                        <li>
                          Regular security audits and vulnerability assessments
                        </li>
                        <li>
                          Employee training on data protection and privacy
                        </li>
                        <li>
                          Incident response procedures for security breaches
                        </li>
                        <li>
                          Compliance with international security standards
                        </li>
                      </ul>
                      <p>
                        While we strive to protect your information, no method
                        of transmission over the internet or electronic storage
                        is 100% secure. We cannot guarantee absolute security
                        but continuously work to improve our protections.
                      </p>
                    </div>
                  </section>

                  {/* Section 6 */}
                  <section id="user-rights" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      6. Your Rights and Choices
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>You have the following rights regarding your data:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          <strong>Access:</strong> Request copies of your
                          personal information
                        </li>
                        <li>
                          <strong>Correction:</strong> Update or correct
                          inaccurate information
                        </li>
                        <li>
                          <strong>Deletion:</strong> Request deletion of your
                          personal information
                        </li>
                        <li>
                          <strong>Portability:</strong> Receive your data in a
                          structured format
                        </li>
                        <li>
                          <strong>Restriction:</strong> Limit how we process
                          your information
                        </li>
                        <li>
                          <strong>Objection:</strong> Object to certain
                          processing activities
                        </li>
                        <li>
                          <strong>Withdrawal:</strong> Withdraw consent for
                          marketing communications
                        </li>
                      </ul>
                      <p>
                        To exercise these rights, contact us using the
                        information provided in the Contact section. We will
                        respond to requests within 30 days and may require
                        identity verification.
                      </p>
                    </div>
                  </section>

                  {/* Section 7 */}
                  <section id="cookies" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      7. Cookies and Tracking Technologies
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        We use cookies and similar technologies to enhance your
                        experience:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          <strong>Essential cookies:</strong> Required for basic
                          platform functionality
                        </li>
                        <li>
                          <strong>Performance cookies:</strong> Help us analyze
                          usage and improve services
                        </li>
                        <li>
                          <strong>Functionality cookies:</strong> Remember your
                          preferences and settings
                        </li>
                        <li>
                          <strong>Marketing cookies:</strong> Deliver relevant
                          advertising content
                        </li>
                      </ul>
                      <p>
                        You can control cookie settings through your browser
                        preferences. However, disabling certain cookies may
                        affect platform functionality. We also use analytics
                        tools to understand user behavior and improve our
                        services.
                      </p>
                    </div>
                  </section>

                  {/* Section 8 */}
                  <section id="third-party" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      8. Third-Party Services and Links
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Our platform may contain links to third-party websites
                        and integrate with external services:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Payment processing services (Stripe, PayPal)</li>
                        <li>
                          Communication platforms (email, SMS, messaging apps)
                        </li>
                        <li>Social media platforms for sharing and login</li>
                        <li>Analytics and marketing tools</li>
                        <li>Maps and location services</li>
                        <li>Cloud storage and hosting providers</li>
                      </ul>
                      <p>
                        These third parties have their own privacy policies and
                        terms. We are not responsible for their practices and
                        recommend reviewing their policies before providing
                        information.
                      </p>
                    </div>
                  </section>

                  {/* Section 9 */}
                  <section id="data-retention" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      9. Data Retention and Deletion
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>We retain your information for different periods:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          <strong>Account information:</strong> Until account
                          deletion or 3 years of inactivity
                        </li>
                        <li>
                          <strong>Transaction data:</strong> 7 years for
                          financial and tax compliance
                        </li>
                        <li>
                          <strong>Communication records:</strong> 3 years for
                          support and quality purposes
                        </li>
                        <li>
                          <strong>Technical logs:</strong> 12 months for
                          security and troubleshooting
                        </li>
                        <li>
                          <strong>Marketing data:</strong> Until consent
                          withdrawal or 2 years
                        </li>
                      </ul>
                      <p>
                        When deleting information, we ensure secure deletion
                        from our systems and notify relevant third parties.
                        Backups may retain data for additional periods for
                        technical reasons.
                      </p>
                    </div>
                  </section>

                  {/* Section 10 */}
                  <section id="children-privacy" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      10. Children's Privacy
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Our services are not intended for children under 18
                        years of age:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          We do not knowingly collect information from children
                          under 18
                        </li>
                        <li>
                          Users must be at least 18 to create accounts and use
                          services
                        </li>
                        <li>
                          Parents should supervise children's internet usage
                        </li>
                        <li>
                          If we discover we have collected children's
                          information, we will delete it promptly
                        </li>
                      </ul>
                      <p>
                        If you believe we have collected information from a
                        child under 18, please contact us immediately so we can
                        investigate and take appropriate action.
                      </p>
                    </div>
                  </section>

                  {/* Section 11 */}
                  <section id="international-transfers" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      11. International Data Transfers
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Your information may be transferred and processed in
                        countries other than Vietnam:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          We use service providers located in various countries
                        </li>
                        <li>
                          Data transfers comply with applicable privacy laws
                        </li>
                        <li>
                          We implement appropriate safeguards for international
                          transfers
                        </li>
                        <li>
                          Standard contractual clauses protect your rights
                          across borders
                        </li>
                        <li>
                          We regularly review and update transfer mechanisms
                        </li>
                      </ul>
                      <p>
                        By using our services, you consent to the transfer of
                        your information to countries that may have different
                        privacy laws than Vietnam.
                      </p>
                    </div>
                  </section>

                  {/* Section 12 */}
                  <section id="policy-updates" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      12. Policy Updates and Changes
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>We may update this Privacy Policy periodically:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          Material changes will be communicated via email or
                          platform notifications
                        </li>
                        <li>
                          Updated policies will be posted on our website with
                          effective dates
                        </li>
                        <li>
                          Continued use after changes indicates acceptance
                        </li>
                        <li>You may request clarification on any changes</li>
                        <li>Historical versions are available upon request</li>
                      </ul>
                      <p>
                        We encourage you to review this Privacy Policy
                        periodically to stay informed about how we protect your
                        information.
                      </p>
                    </div>
                  </section>

                  {/* Section 13 */}
                  <section id="contact-information" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      13. Contact Information
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        For privacy-related questions, concerns, or requests,
                        contact us:
                      </p>
                      <div className="bg-muted/50 p-6 rounded-lg">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <strong>Data Protection Officer</strong>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span>📧</span>
                            <span>privacy@fix4home.vn</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span>📞</span>
                            <span>Privacy Hotline: 1900-1234 (Option 3)</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <span>📍</span>
                            <span>
                              Privacy Department
                              <br />
                              FIX4HOME Company Limited
                              <br />
                              123 Nguyen Hue Street
                              <br />
                              District 1, Ho Chi Minh City
                              <br />
                              Vietnam 700000
                            </span>
                          </div>
                        </div>
                      </div>
                      <p>
                        We strive to respond to all privacy inquiries within 2
                        business days. For urgent matters, please call our
                        privacy hotline.
                      </p>
                    </div>
                  </section>

                  {/* Section 14 */}
                  <section id="legal-basis" className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      14. Legal Basis for Processing
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        We process your information based on the following legal
                        grounds:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          <strong>Contract performance:</strong> To provide
                          services you have requested
                        </li>
                        <li>
                          <strong>Consent:</strong> For marketing communications
                          and optional features
                        </li>
                        <li>
                          <strong>Legitimate interests:</strong> For business
                          operations, security, and improvements
                        </li>
                        <li>
                          <strong>Legal compliance:</strong> To meet regulatory
                          and legal requirements
                        </li>
                        <li>
                          <strong>Vital interests:</strong> To protect health,
                          safety, and prevent harm
                        </li>
                      </ul>
                      <p>
                        We regularly review our processing activities to ensure
                        they remain lawful and proportionate to our business
                        needs and your privacy rights.
                      </p>
                    </div>
                  </section>

                  {/* Last Updated */}
                  <div className="border-t pt-8 mt-12">
                    <p className="text-sm text-muted-foreground text-center">
                      This Privacy Policy was last updated on January 1, 2024.
                      <br />
                      Thank you for trusting FIX4HOME with your information.
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
function PrivacySkeleton() {
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
function PrivacyError({ error }: { error: string }) {
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
            Unable to Load Privacy Policy
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
