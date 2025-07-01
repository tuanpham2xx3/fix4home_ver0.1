import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Basic pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Get basename from environment or use default for GitHub Pages
const basename =
  import.meta.env.MODE === "production" ? "/fix4home_ver0.1" : "";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
