export default function About() {
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

      <main style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "36px", marginBottom: "30px", color: "#333" }}>
          About FIX4HOME
        </h2>

        <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>
          FIX4HOME is your trusted partner for all home repair and maintenance
          needs.
        </p>

        <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#333" }}>
          Our Story
        </h3>
        <p style={{ marginBottom: "30px", lineHeight: "1.6", color: "#555" }}>
          Founded with the mission to provide reliable, professional home
          services, FIX4HOME connects homeowners with skilled technicians who
          can handle any repair or maintenance task.
        </p>

        <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#333" }}>
          Our Services
        </h3>
        <ul style={{ marginBottom: "30px", lineHeight: "1.8", color: "#555" }}>
          <li>Electrical repairs and installations</li>
          <li>Plumbing services</li>
          <li>HVAC maintenance</li>
          <li>Appliance repairs</li>
          <li>General home maintenance</li>
        </ul>

        <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#333" }}>
          Why Choose Us?
        </h3>
        <ul style={{ lineHeight: "1.8", color: "#555" }}>
          <li>Licensed and insured technicians</li>
          <li>24/7 emergency services</li>
          <li>Transparent pricing</li>
          <li>100% satisfaction guarantee</li>
          <li>Quick response times</li>
        </ul>
      </main>
    </div>
  );
}
