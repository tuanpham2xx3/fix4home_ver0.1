import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Wrench,
  Phone,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Lock,
  Home,
  ChevronRight,
  ArrowRight,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

interface CustomerFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  general?: string;
}

export default function RegisterCustomer() {
  const [formData, setFormData] = useState<CustomerFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Full name can only contain letters and spaces";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email or phone number is required";
    } else {
      const isEmail = formData.email.includes("@");
      if (isEmail) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
      } else {
        // Phone number validation
        if (!/^[0-9+\-\s()]{10,15}$/.test(formData.email.replace(/\s/g, ""))) {
          newErrors.email = "Please enter a valid phone number";
        }
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms of Use to register";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CustomerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Clear general error
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const checkDuplicateEmail = async (email: string): Promise<boolean> => {
    // Simulate API call to check duplicate email/phone
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulate some emails already being taken
    const takenEmails = ["test@example.com", "user@fix4home.vn", "0901234567"];
    return takenEmails.includes(email.toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Check for duplicate email/phone
      const isDuplicate = await checkDuplicateEmail(formData.email);

      if (isDuplicate) {
        const isEmail = formData.email.includes("@");
        setErrors({
          email: `This ${isEmail ? "email" : "phone number"} is already registered. Please use a different one or try logging in.`,
        });
        setIsLoading(false);
        return;
      }

      // Simulate registration API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate occasional server errors
      if (Math.random() < 0.1) {
        throw new Error("Registration failed. Please try again later.");
      }

      // Success
      setIsRegistered(true);

      // Auto-redirect to login after 3 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isRegistered) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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
                className="text-foreground hover:text-primary font-medium transition-colors"
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
              to="/login"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Login
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary font-medium">Register Customer</span>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Create Customer Account
              </h1>
              <p className="text-muted-foreground">
                Join FIX4HOME to book reliable home repair services
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-center text-xl">
                  Customer Registration
                </CardTitle>
                <p className="text-center text-sm text-muted-foreground">
                  Fill in your details to get started
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Alert */}
                  {errors.general && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.general}</AlertDescription>
                    </Alert>
                  )}

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <div className="relative">
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        className={
                          errors.fullName ? "border-destructive pr-10" : "pr-10"
                        }
                        disabled={isLoading}
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    {errors.fullName && (
                      <p className="text-sm text-destructive">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email/Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email or Phone Number *</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="text"
                        placeholder="your.email@example.com or 0901234567"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={
                          errors.email ? "border-destructive pr-10" : "pr-10"
                        }
                        disabled={isLoading}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {formData.email.includes("@") ? (
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Phone className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={
                          errors.password ? "border-destructive pr-10" : "pr-10"
                        }
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters with uppercase,
                      lowercase, and number
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        className={
                          errors.confirmPassword
                            ? "border-destructive pr-10"
                            : "pr-10"
                        }
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Terms Agreement */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          handleInputChange("agreeToTerms", checked)
                        }
                        disabled={isLoading}
                        className="mt-1"
                      />
                      <Label
                        htmlFor="agreeToTerms"
                        className="text-sm font-normal leading-relaxed"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-primary hover:underline font-medium"
                          target="_blank"
                        >
                          Terms of Use
                        </Link>{" "}
                        and acknowledge that I have read the Privacy Policy
                      </Label>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="text-sm text-destructive">
                        {errors.agreeToTerms}
                      </p>
                    )}
                  </div>

                  {/* Register Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Customer Account
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>

                  {/* Login Link */}
                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary hover:underline font-medium"
                    >
                      Sign in here
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Technician Registration Link */}
            <div className="mt-8 text-center">
              <div className="text-sm text-muted-foreground mb-4">
                Looking to work with us?
              </div>
              <Button variant="outline" asChild>
                <Link to="/register-technician">
                  <Wrench className="w-4 h-4 mr-2" />
                  Register as Technician
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 FIX4HOME. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Success Screen Component
function SuccessScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <Card className="shadow-xl border-0 text-center">
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Registration Successful!
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Welcome to FIX4HOME! Your customer account has been created
              successfully. You can now sign in and start booking our services.
            </p>
            <div className="space-y-4">
              <Button asChild size="lg" className="w-full">
                <Link to="/login">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Sign In Now
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="w-full">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Homepage
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
