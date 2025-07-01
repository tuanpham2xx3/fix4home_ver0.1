import "./global.css";

import React from "react";
// Temporarily simplified imports for deployment debugging
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import RegisterCustomer from "./pages/RegisterCustomer";
import RegisterTechnician from "./pages/RegisterTechnician";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// Customer Pages
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerOrders from "./pages/customer/Orders";
import CustomerOrderDetail from "./pages/customer/OrderDetail";
import CustomerProfile from "./pages/customer/Profile";
import CustomerReviews from "./pages/customer/Reviews";

// Booking Pages
import BookService from "./pages/booking/BookService";
import TechnicianSelection from "./pages/booking/TechnicianSelection";
import ConfirmBooking from "./pages/booking/ConfirmBooking";

// Technician Pages
import TechnicianDashboard from "./pages/technician/Dashboard";
import TechnicianJobs from "./pages/technician/Jobs";
import TechnicianJobDetail from "./pages/technician/JobDetail";
import TechnicianCalendar from "./pages/technician/Calendar";
import TechnicianProfile from "./pages/technician/Profile";
import TechnicianStatistics from "./pages/technician/Statistics";
import TechnicianReviews from "./pages/technician/Reviews";

// Admin Pages - temporarily disabled for deployment debugging
// import AdminDashboard from "./pages/admin/Dashboard";
// import AdminUsers from "./pages/admin/Users";
// import AdminTechnicians from "./pages/admin/Technicians";
// import AdminOrders from "./pages/admin/Orders";
// import AdminServices from "./pages/admin/Services";
// import AdminReports from "./pages/admin/Reports";

// Minimal App component for deployment debugging
const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* Minimal routes for deployment debugging */}
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
