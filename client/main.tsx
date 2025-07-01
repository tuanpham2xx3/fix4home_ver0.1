import React from "react";
import { createRoot } from "react-dom/client";

// Absolute minimal React app for deployment debugging
const App = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>FIX4HOME - Deployment Test</h1>
      <p>If you can see this, the basic deployment is working.</p>
      <p>Build timestamp: {new Date().toISOString()}</p>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
