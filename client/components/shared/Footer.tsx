import { Wrench, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background border-t py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">FIX4HOME</span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Professional home repair services at your doorstep. Fast,
              reliable, and affordable solutions for all your home maintenance
              needs.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <span className="text-xs text-white font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <span className="text-xs text-white font-bold">Z</span>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                <Phone className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-bold text-foreground mb-6 text-lg">
              Our Services
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-colors"
                >
                  Plumbing Services
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-colors"
                >
                  Electrical Work
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-colors"
                >
                  Painting Services
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-colors"
                >
                  General Repairs
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-colors"
                >
                  Appliance Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-foreground mb-6 text-lg">Company</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/register-technician"
                  className="hover:text-primary transition-colors"
                >
                  Join as Technician
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-foreground mb-6 text-lg">
              Contact Info
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>support@fix4home.vn</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>1900-1234</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  123 Nguyen Hue Street
                  <br />
                  District 1, Ho Chi Minh City
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-center md:text-left">
            &copy; 2024 FIX4HOME. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-muted-foreground text-sm">
              Made with ❤️ in Vietnam
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
