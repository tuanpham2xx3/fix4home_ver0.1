import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/shared/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Save,
  Edit,
  Camera,
  Trash2,
  Star,
  Award,
  Wrench,
  Zap,
  Home,
  Car,
} from "lucide-react";

export default function TechnicianProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    address: "789 Tech Street, City, State 12345",
    bio: "Experienced technician with 8+ years in home repair services. Specializing in electrical, plumbing, and HVAC systems.",
    hourlyRate: "45",
    serviceRadius: "25",
    availability: true,
    emailNotifications: true,
    smsNotifications: true,
    jobAlerts: true,
    specialties: ["electrical", "plumbing", "hvac"],
    certifications: ["EPA Certified", "Licensed Electrician", "Master Plumber"],
  });

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving profile data:", formData);
    setIsEditing(false);
    // Show success message
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      specialties: checked
        ? [...prev.specialties, specialty]
        : prev.specialties.filter((s) => s !== specialty),
    }));
  };

  const specialtyOptions = [
    { id: "electrical", label: "Electrical", icon: Zap },
    { id: "plumbing", label: "Plumbing", icon: Home },
    { id: "hvac", label: "HVAC", icon: Car },
    { id: "appliance", label: "Appliance Repair", icon: Wrench },
    { id: "general", label: "General Maintenance", icon: User },
  ];

  return (
    <Layout
      breadcrumbs={[
        { label: "Technician Dashboard", href: "/technician/dashboard" },
        { label: "Profile" },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-950 dark:to-teal-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your technician profile and service settings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Picture & Quick Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute bottom-0 right-1/2 translate-x-6 translate-y-2"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>

                  <h2 className="text-xl font-semibold mb-1">
                    {formData.name}
                  </h2>
                  <p className="text-muted-foreground mb-2">
                    Professional Technician
                  </p>

                  <div className="flex items-center justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      4.8 (127 reviews)
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{formData.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{formData.phone}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <Badge
                      variant={formData.availability ? "default" : "secondary"}
                      className={
                        formData.availability
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {formData.availability ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Performance Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Jobs Completed
                    </span>
                    <span className="font-medium">342</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Success Rate
                    </span>
                    <span className="font-medium">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Avg. Response
                    </span>
                    <span className="font-medium">12 minutes</span>
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Deactivate Account
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Service Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input
                        id="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={(e) =>
                          handleInputChange("hourlyRate", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceRadius">
                        Service Radius (miles)
                      </Label>
                      <Input
                        id="serviceRadius"
                        value={formData.serviceRadius}
                        onChange={(e) =>
                          handleInputChange("serviceRadius", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Availability Status</p>
                      <p className="text-sm text-muted-foreground">
                        Allow customers to book appointments with you
                      </p>
                    </div>
                    <Switch
                      checked={formData.availability}
                      onCheckedChange={(checked) =>
                        handleInputChange("availability", checked)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specialtyOptions.map((specialty) => {
                      const Icon = specialty.icon;
                      return (
                        <div
                          key={specialty.id}
                          className="flex items-center space-x-3"
                        >
                          <Checkbox
                            id={specialty.id}
                            checked={formData.specialties.includes(
                              specialty.id,
                            )}
                            onCheckedChange={(checked) =>
                              handleSpecialtyChange(specialty.id, !!checked)
                            }
                            disabled={!isEditing}
                          />
                          <Label
                            htmlFor={specialty.id}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Icon className="w-4 h-4" />
                            {specialty.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Licenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {formData.certifications.map((cert, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Award className="w-3 h-3" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <Button variant="outline" className="mt-4">
                      Add Certification
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive job updates and messages via email
                      </p>
                    </div>
                    <Switch
                      checked={formData.emailNotifications}
                      onCheckedChange={(checked) =>
                        handleInputChange("emailNotifications", checked)
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive urgent updates via text message
                      </p>
                    </div>
                    <Switch
                      checked={formData.smsNotifications}
                      onCheckedChange={(checked) =>
                        handleInputChange("smsNotifications", checked)
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Job Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new jobs matching your skills are
                        available
                      </p>
                    </div>
                    <Switch
                      checked={formData.jobAlerts}
                      onCheckedChange={(checked) =>
                        handleInputChange("jobAlerts", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
