import Navigation from "@/components/shared/Navigation";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About FIX4HOME</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              FIX4HOME is your trusted partner for all home repair and
              maintenance needs.
            </p>

            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="mb-6">
              Founded with the mission to provide reliable, professional home
              services, FIX4HOME connects homeowners with skilled technicians
              who can handle any repair or maintenance task.
            </p>

            <h2 className="text-2xl font-bold mb-4">Our Services</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Electrical repairs and installations</li>
              <li>Plumbing services</li>
              <li>HVAC maintenance</li>
              <li>Appliance repairs</li>
              <li>General home maintenance</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Licensed and insured technicians</li>
              <li>24/7 emergency services</li>
              <li>Transparent pricing</li>
              <li>100% satisfaction guarantee</li>
              <li>Quick response times</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
