import Navigation from "@/components/shared/Navigation";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to FIX4HOME
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Professional home repair and maintenance services at your doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Book Service Now
            </button>
            <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8">Why Choose FIX4HOME?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Professional Technicians</h3>
              <p className="text-muted-foreground">
                Certified and experienced professionals
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">24/7 Service</h3>
              <p className="text-muted-foreground">
                Available when you need us most
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Guaranteed Quality</h3>
              <p className="text-muted-foreground">
                100% satisfaction guarantee
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
