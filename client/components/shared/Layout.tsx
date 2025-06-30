import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface LayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function Layout({ children, breadcrumbs }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
