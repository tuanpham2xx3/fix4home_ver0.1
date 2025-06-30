import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/shared/Layout";
import {
  Wrench,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Facebook,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[0-9+\-\s()]{10,15}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random error for demo
      if (Math.random() < 0.1) {
        throw new Error("Network error. Please try again.");
      }

      setIsSubmitted(true);
      setFormData({ fullName: "", phone: "", email: "", message: "" });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrors({});
    setSubmitError("");
  };

  return (
    <Layout breadcrumbs={[{ label: "Contact" }]}>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Get in touch with our team. We're here to help with all your home
              repair needs.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Thank You!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Your message has been sent successfully. We'll get back
                        to you within 24 hours.
                      </p>
                      <Button onClick={resetForm} variant="outline">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {submitError && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{submitError}</AlertDescription>
                        </Alert>
                      )}

                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          className={
                            errors.fullName ? "border-destructive" : ""
                          }
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className={errors.phone ? "border-destructive" : ""}
                          placeholder="0901 234 567"
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={errors.email ? "border-destructive" : ""}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          className={errors.message ? "border-destructive" : ""}
                          placeholder="Tell us about your home repair needs..."
                          rows={5}
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Hotline</h3>
                      <p className="text-muted-foreground">1900-1234</p>
                      <p className="text-sm text-muted-foreground">
                        24/7 Emergency Support
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground">
                        support@fix4home.vn
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Address</h3>
                      <p className="text-muted-foreground">
                        123 Nguyen Hue Street
                        <br />
                        District 1, Ho Chi Minh City
                        <br />
                        Vietnam
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Office Hours
                      </h3>
                      <p className="text-muted-foreground">
                        Monday - Sunday: 6:00 AM - 10:00 PM
                        <br />
                        Emergency services available 24/7
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media & Quick Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Quick Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex-col">
                      <MessageCircle className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium">Messenger</span>
                      <span className="text-xs text-muted-foreground">
                        Instant chat
                      </span>
                    </Button>

                    <Button variant="outline" className="h-auto py-4 flex-col">
                      <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs font-bold flex items-center justify-center mb-2">
                        Z
                      </div>
                      <span className="text-sm font-medium">Zalo</span>
                      <span className="text-xs text-muted-foreground">
                        Quick response
                      </span>
                    </Button>

                    <Button variant="outline" className="h-auto py-4 flex-col">
                      <Facebook className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium">Facebook</span>
                      <span className="text-xs text-muted-foreground">
                        Follow us
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Find Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-foreground font-medium">
                        Interactive Map
                      </p>
                      <p className="text-sm text-muted-foreground">
                        123 Nguyen Hue St, District 1<br />
                        Ho Chi Minh City
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Google Maps
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Emergency Repair?</h2>
          <p className="text-lg opacity-90 mb-6">
            Our emergency team is available 24/7 for urgent home repairs
          </p>
          <Button variant="secondary" size="lg">
            <Phone className="w-5 h-5 mr-2" />
            Call Emergency: 1900-1234
          </Button>
        </div>
      </section>
    </Layout>
  );
}
