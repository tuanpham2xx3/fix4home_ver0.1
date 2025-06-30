import { Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <section className="bg-muted/30 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 text-sm">
          <Link
            to="/"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Go to homepage"
          >
            <Home className="w-4 h-4" />
          </Link>
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              {item.href ? (
                <Link
                  to={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-primary font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
