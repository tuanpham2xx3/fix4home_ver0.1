import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Settings,
  Upload,
  FileText,
  Image,
  Award,
  Clock,
  X,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

interface TechnicianFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  experience: string;
  skills: string[];
  customSkills: string;
  profilePhoto: File | null;
  idDocument: File | null;
  licenseDocument: File | null;
  agreeToTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  experience?: string;
  skills?: string;
  profilePhoto?: string;
  idDocument?: string;
  licenseDocument?: string;
  agreeToTerms?: string;
  general?: string;
}

const skillOptions = [
  "Plumbing",
  "Electrical Work",
  "Painting",
  "Carpentry",
  "Air Conditioning",
  "Appliance Repair",
  "Roofing",
  "Flooring",
  "Tiling",
  "Welding",
  "General Maintenance",
  "Garden/Landscaping",
];

const experienceOptions = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "6-10 years",
  "More than 10 years",
];

export default function RegisterTechnician() {
  const [formData, setFormData] = useState<TechnicianFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    skills: [],
    customSkills: "",
    profilePhoto: null,
    idDocument: null,
    licenseDocument: null,
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
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Experience validation
    if (!formData.experience) {
      newErrors.experience = "Please select your experience level";
    }

    // Skills validation
    if (formData.skills.length === 0 && !formData.customSkills.trim()) {
      newErrors.skills =
        "Please select at least one skill or add custom skills";
    }

    // Profile photo validation
    if (!formData.profilePhoto) {
      newErrors.profilePhoto = "Profile photo is required";
    }

    // ID document validation
    if (!formData.idDocument) {
      newErrors.idDocument = "ID document is required";
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms of Use to register";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof TechnicianFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user makes changes
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const handleSkillToggle = (skill: string) => {
    const currentSkills = formData.skills;
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill];

    handleInputChange("skills", newSkills);
  };

  const handleFileUpload = (
    field: keyof TechnicianFormData,
    file: File | null,
  ) => {
    if (file) {
      // Validate file
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          [field]: "File size must be less than 5MB",
        }));
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [field]: "Only JPG, PNG, and PDF files are allowed",
        }));
        return;
      }
    }

    handleInputChange(field, file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate file upload and registration API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate occasional server errors
      if (Math.random() < 0.1) {
        throw new Error("Registration failed. Please try again later.");
      }

      // Success
      setIsRegistered(true);
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
    return <PendingApprovalScreen />;
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
            <span className="text-primary font-medium">
              Register Technician
            </span>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Join as a Technician
              </h1>
              <p className="text-muted-foreground">
                Become part of our certified professional network
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-center text-xl">
                  Technician Registration
                </CardTitle>
                <p className="text-center text-sm text-muted-foreground">
                  Complete all sections for review and approval
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Error Alert */}
                  {errors.general && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.general}</AlertDescription>
                    </Alert>
                  )}

                  {/* Personal Information Section */}
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <h2 className="text-lg font-semibold text-foreground flex items-center">
                        <User className="w-5 h-5 mr-2 text-primary" />
                        Personal Information
                      </h2>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        className={errors.fullName ? "border-destructive" : ""}
                        disabled={isLoading}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-destructive">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email/Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email or Phone Number *</Label>
                      <Input
                        id="email"
                        type="text"
                        placeholder="your.email@example.com or 0901234567"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={errors.email ? "border-destructive" : ""}
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create password"
                            value={formData.password}
                            onChange={(e) =>
                              handleInputChange("password", e.target.value)
                            }
                            className={
                              errors.password
                                ? "border-destructive pr-10"
                                : "pr-10"
                            }
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
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
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              handleInputChange(
                                "confirmPassword",
                                e.target.value,
                              )
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
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
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
                    </div>
                  </div>

                  {/* Professional Information Section */}
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <h2 className="text-lg font-semibold text-foreground flex items-center">
                        <Award className="w-5 h-5 mr-2 text-primary" />
                        Professional Information
                      </h2>
                    </div>

                    {/* Experience */}
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) =>
                          handleInputChange("experience", value)
                        }
                        disabled={isLoading}
                      >
                        <SelectTrigger
                          className={
                            errors.experience ? "border-destructive" : ""
                          }
                        >
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.experience && (
                        <p className="text-sm text-destructive">
                          {errors.experience}
                        </p>
                      )}
                    </div>

                    {/* Skills */}
                    <div className="space-y-4">
                      <Label>Skills & Specializations *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {skillOptions.map((skill) => (
                          <div
                            key={skill}
                            onClick={() => handleSkillToggle(skill)}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              formData.skills.includes(skill)
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {skill}
                              </span>
                              {formData.skills.includes(skill) && (
                                <CheckCircle className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Custom Skills */}
                      <div className="space-y-2">
                        <Label htmlFor="customSkills">
                          Additional Skills (Optional)
                        </Label>
                        <Textarea
                          id="customSkills"
                          placeholder="List any additional skills not mentioned above..."
                          value={formData.customSkills}
                          onChange={(e) =>
                            handleInputChange("customSkills", e.target.value)
                          }
                          rows={3}
                          disabled={isLoading}
                        />
                      </div>

                      {errors.skills && (
                        <p className="text-sm text-destructive">
                          {errors.skills}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Document Upload Section */}
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <h2 className="text-lg font-semibold text-foreground flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-primary" />
                        Required Documents
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Profile Photo */}
                      <FileUploadField
                        label="Profile Photo *"
                        description="Clear photo for customer confidence"
                        accept="image/*"
                        file={formData.profilePhoto}
                        onFileChange={(file) =>
                          handleFileUpload("profilePhoto", file)
                        }
                        error={errors.profilePhoto}
                        icon={Image}
                        disabled={isLoading}
                      />

                      {/* ID Document */}
                      <FileUploadField
                        label="Government ID *"
                        description="National ID, passport, or driver's license"
                        accept=".pdf,.jpg,.jpeg,.png"
                        file={formData.idDocument}
                        onFileChange={(file) =>
                          handleFileUpload("idDocument", file)
                        }
                        error={errors.idDocument}
                        icon={FileText}
                        disabled={isLoading}
                      />
                    </div>

                    {/* License Document (Optional) */}
                    <FileUploadField
                      label="Professional License (Optional)"
                      description="Any relevant professional certifications or licenses"
                      accept=".pdf,.jpg,.jpeg,.png"
                      file={formData.licenseDocument}
                      onFileChange={(file) =>
                        handleFileUpload("licenseDocument", file)
                      }
                      error={errors.licenseDocument}
                      icon={Award}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Terms Agreement */}
                  <div className="space-y-4">
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
                        </Link>
                        , understand the requirements for technicians, and
                        consent to background verification
                      </Label>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="text-sm text-destructive">
                        {errors.agreeToTerms}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>

                  {/* Info */}
                  <div className="text-center text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Applications are typically reviewed within 2-3 business days
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Customer Registration Link */}
            <div className="mt-8 text-center">
              <div className="text-sm text-muted-foreground mb-4">
                Looking for services instead?
              </div>
              <Button variant="outline" asChild>
                <Link to="/register-customer">
                  <User className="w-4 h-4 mr-2" />
                  Register as Customer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// File Upload Component
interface FileUploadFieldProps {
  label: string;
  description: string;
  accept: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  icon: any;
  disabled?: boolean;
}

function FileUploadField({
  label,
  description,
  accept,
  file,
  onFileChange,
  error,
  icon: Icon,
  disabled,
}: FileUploadFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          error ? "border-destructive" : "border-border"
        } ${disabled ? "opacity-50" : "hover:border-primary/50"}`}
      >
        {file ? (
          <div className="space-y-3">
            <Icon className="w-8 h-8 text-primary mx-auto" />
            <div>
              <p className="text-sm font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onFileChange(null)}
              disabled={disabled}
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Icon className="w-8 h-8 text-muted-foreground mx-auto" />
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <div>
              <input
                type="file"
                accept={accept}
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] || null;
                  onFileChange(selectedFile);
                }}
                className="hidden"
                id={`file-${label.replace(/\s+/g, "-").toLowerCase()}`}
                disabled={disabled}
              />
              <Label
                htmlFor={`file-${label.replace(/\s+/g, "-").toLowerCase()}`}
                className="cursor-pointer"
              >
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={disabled}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Choose File
                </Button>
              </Label>
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

// Pending Approval Screen Component
function PendingApprovalScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <Card className="shadow-xl border-0 text-center">
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Clock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Application Submitted!
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Thank you for applying to become a FIX4HOME technician. Your
              application is now under review. We'll contact you within 2-3
              business days with the next steps.
            </p>
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Check your email for application confirmation and tracking
                  information.
                </AlertDescription>
              </Alert>
              <Button asChild size="lg" className="w-full">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Homepage
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="w-full">
                <Link to="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
