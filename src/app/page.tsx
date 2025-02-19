import TechBackground from "@/components/common/Background";
import { Suspense, lazy, ComponentType } from "react";
interface LazyComponentProps {
  [key: string]: unknown;
}

const LazyComponent = <T extends LazyComponentProps>(
  importFunc: () => Promise<{ default: ComponentType<T> }>
) => {
  const Component = lazy(importFunc);
  const LazyWrapper = (props: T) => (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
  LazyWrapper.displayName = `LazyComponent(${importFunc.name || "Anonymous"})`;
  return LazyWrapper;
};

// Lazy-loaded components
const Navbar = LazyComponent(() => import("@/components/layout/Navbar"));
const AboutUs = LazyComponent(() => import("@/components/common/AboutUs"));
const Entreprise = LazyComponent(() => import("@/components/common/Entreprise"));
const Services = LazyComponent(() => import("@/components/common/Services"));
const Clients = LazyComponent(() => import("@/components/common/Clients"));
const ProjectsSection = LazyComponent(() => import("@/components/common/Projects"));
const Work = LazyComponent(() => import("@/components/common/Work"));
const Footer = LazyComponent(() => import("@/components/common/Footer"));

export default function Home() {
  return (
    <>
      <TechBackground />
      <Navbar />
      <AboutUs />
      <Entreprise />
      <Services />
      <Clients />
      <ProjectsSection />
      <Work />
      <Footer />
    </>
  );
}

Home.displayName = "Home";
