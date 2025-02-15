import AboutUs from "@/components/common/AboutUs";
import AuroraBackground from "@/components/common/Background";
import Clients from "@/components/common/Clients";
import Entreprise from "@/components/common/Entreprise";
import Footer from "@/components/common/Footer";
import ProjectsSection from "@/components/common/Projects";
import Services from "@/components/common/Services";
import TestimonialsSection from "@/components/common/Testimonials";
import Work from "@/components/common/Work";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
    <AuroraBackground />
    <Navbar />
    <AboutUs />
    <Entreprise />
    <Services />
    <Clients />
    <ProjectsSection />
    <TestimonialsSection />
    <Work />
    <Footer />
    </>
  );
}
