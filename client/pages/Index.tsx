export default function Index() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        padding: "20px",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid #e5e5e5",
          paddingBottom: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
            FIX4HOME
          </h1>
          <nav>
            <a
              href="/"
              style={{
                marginRight: "20px",
                textDecoration: "none",
                color: "#333",
              }}
            >
              Home
            </a>
            <a href="/about" style={{ textDecoration: "none", color: "#333" }}>
              About
            </a>
          </nav>
        </div>
      </header>

      <main
        style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
      >
        <h2 style={{ fontSize: "48px", marginBottom: "20px", color: "#333" }}>
          Welcome to FIX4HOME
        </h2>
        <p style={{ fontSize: "20px", marginBottom: "40px", color: "#666" }}>
          Professional home repair and maintenance services at your doorstep
        </p>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Book Service Now
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              color: "#007bff",
              padding: "12px 24px",
              border: "2px solid #007bff",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Learn More
          </button>
        </div>

        <div style={{ marginTop: "80px" }}>
          <h3 style={{ fontSize: "24px", marginBottom: "40px" }}>
            Why Choose FIX4HOME?
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                padding: "20px",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
              }}
            >
              <h4 style={{ marginBottom: "10px" }}>Professional Technicians</h4>
              <p style={{ color: "#666", margin: 0 }}>
                Certified and experienced professionals
              </p>
            </div>
            <div
              style={{
                padding: "20px",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
              }}
            >
              <h4 style={{ marginBottom: "10px" }}>24/7 Service</h4>
              <p style={{ color: "#666", margin: 0 }}>
                Available when you need us most
              </p>
            </div>
            <div
              style={{
                padding: "20px",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
              }}
            >
              <h4 style={{ marginBottom: "10px" }}>Guaranteed Quality</h4>
              <p style={{ color: "#666", margin: 0 }}>
                100% satisfaction guarantee
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
