import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/shared/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Shield,
  Camera,
  Upload,
  Save,
  Eye,
  EyeOff,
  Star,
  CheckCircle,
  AlertCircle,
  FileText,
  X,
  Plus,
  Edit,
  Lock,
} from "lucide-react";

export default function TechnicianProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    experience: "",
    specialties: [] as string[],
    certifications: [] as any[],
    avatar: "",
    hourlyRate: "",
    availability: "full-time",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [newSkill, setNewSkill] = useState("");

  // Mock profile data
  const mockProfile = {
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA 94102",
    bio: "Experienced technician with 8+ years in HVAC, electrical, and plumbing services. Passionate about providing quality home repair solutions.",
    experience: "8",
    specialties: [
      "HVAC Systems",
      "Electrical Wiring",
      "Plumbing",
      "Appliance Repair",
      "Home Security",
    ],
    certifications: [
      {
        id: 1,
        name: "HVAC Certification",
        issuer: "NATE",
        date: "2023-03-15",
        expiryDate: "2025-03-15",
        status: "active",
      },
      {
        id: 2,
        name: "Electrical License",
        issuer: "State of California",
        date: "2022-01-10",
        expiryDate: "2024-01-10",
        status: "expiring_soon",
      },
      {
        id: 3,
        name: "Plumbing Certification",
        issuer: "PHCC",
        date: "2021-08-20",
        expiryDate: "2026-08-20",
        status: "active",
      },
    ],
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Alex%20Thompson",
    hourlyRate: "75",
    availability: "full-time",
    stats: {
      jobsCompleted: 156,
      averageRating: 4.8,
      yearsExperience: 8,
      responseTime: "< 2 hours",
    },
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProfileData(mockProfile);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors: any = {};

    if (!profileData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!profileData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!profileData.hourlyRate || parseFloat(profileData.hourlyRate) <= 0) {
      newErrors.hourlyRate = "Valid hourly rate is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: any = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) return;

    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });

    setIsSaving(false);
    setIsEditing(false);
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;

    setIsChangingPassword(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    });

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsChangingPassword(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.specialties.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        specialties: [...profileData.specialties, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      specialties: profileData.specialties.filter((s) => s !== skill),
    });
  };

  const getCertificationStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "expiring_soon":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Technician Dashboard", href: "/technician/dashboard" },
          { label: "Profile" },
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <Skeleton className="h-10 w-48 mb-4" />
              <Skeleton className="h-6 w-96" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-6">
                {[...Array(2)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-32 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="lg:col-span-2 space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-48 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      breadcrumbs={[
        { label: "Technician Dashboard", href: "/technician/dashboard" },
        { label: "My Profile" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  My Profile
                </h1>
                <p className="text-muted-foreground">
                  Manage your personal information and professional details
                </p>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setProfileData(mockProfile);
                        setErrors({});
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <Avatar className="w-24 h-24 mx-auto">
                        <AvatarImage src={profileData.avatar} />
                        <AvatarFallback className="text-lg">
                          {profileData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="icon"
                          variant="outline"
                          className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mt-4">
                      {profileData.name}
                    </h3>
                    <p className="text-muted-foreground">
                      Professional Technician
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Jobs Completed
                      </span>
                      <span className="font-semibold">
                        {mockProfile.stats.jobsCompleted}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Average Rating
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">
                          {mockProfile.stats.averageRating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Experience
                      </span>
                      <span className="font-semibold">
                        {profileData.experience} years
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Response Time
                      </span>
                      <span className="font-semibold">
                        {mockProfile.stats.responseTime}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                          Update your password to keep your account secure.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">
                            Current Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showCurrentPassword ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  currentPassword: e.target.value,
                                })
                              }
                              className={
                                errors.currentPassword ? "border-red-500" : ""
                              }
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          {errors.currentPassword && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.currentPassword}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  newPassword: e.target.value,
                                })
                              }
                              className={
                                errors.newPassword ? "border-red-500" : ""
                              }
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          {errors.newPassword && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.newPassword}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">
                            Confirm New Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  confirmPassword: e.target.value,
                                })
                              }
                              className={
                                errors.confirmPassword ? "border-red-500" : ""
                              }
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          {errors.confirmPassword && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handleChangePassword}
                          disabled={isChangingPassword}
                        >
                          {isChangingPassword ? (
                            <>
                              <div className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full animate-spin mr-2" />
                              Updating...
                            </>
                          ) : (
                            "Update Password"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Certificate
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={profileData.experience}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            experience: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Tell customers about your experience and expertise..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={profileData.hourlyRate}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            hourlyRate: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={errors.hourlyRate ? "border-red-500" : ""}
                      />
                      {errors.hourlyRate && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.hourlyRate}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="availability">Availability</Label>
                      <Select
                        value={profileData.availability}
                        onValueChange={(value) =>
                          setProfileData({
                            ...profileData,
                            availability: value,
                          })
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="weekends">
                            Weekends Only
                          </SelectItem>
                          <SelectItem value="emergency">
                            Emergency Only
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Specialties */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Skills & Specialties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profileData.specialties.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-2">
                        {skill}
                        {isEditing && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-4 w-4 hover:bg-red-100"
                            onClick={() => removeSkill(skill)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </Badge>
                    ))}
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a new skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button onClick={addSkill} disabled={!newSkill.trim()}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Certifications & Licenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {profileData.certifications.length === 0 ? (
                    <div className="text-center py-8">
                      <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No Certifications
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Add your professional certifications to build trust with
                        customers.
                      </p>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certification
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {profileData.certifications.map((cert) => (
                        <div
                          key={cert.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold">{cert.name}</h4>
                              <Badge
                                variant="outline"
                                className={getCertificationStatusColor(
                                  cert.status,
                                )}
                              >
                                {cert.status === "active"
                                  ? "Active"
                                  : cert.status === "expiring_soon"
                                    ? "Expiring Soon"
                                    : "Expired"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Issued by {cert.issuer} • {cert.date}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Expires: {cert.expiryDate}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {cert.status === "expiring_soon" && (
                              <Alert className="w-6 h-6 text-orange-500" />
                            )}
                            {cert.status === "active" && (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            )}
                            {cert.status === "expired" && (
                              <AlertCircle className="w-6 h-6 text-red-500" />
                            )}
                          </div>
                        </div>
                      ))}
                      {isEditing && (
                        <Button variant="outline" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add New Certification
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
