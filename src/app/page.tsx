import TechBackground from "@/components/common/Background";
import dynamic from "next/dynamic";

// Import components directly without lazy loading
const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: true });
const AboutUs = dynamic(() => import("@/components/common/AboutUs"), { ssr: true });
const Entreprise = dynamic(() => import("@/components/common/Entreprise"), { ssr: true });
const Services = dynamic(() => import("@/components/common/Services"), { ssr: true });
const Clients = dynamic(() => import("@/components/common/Clients"), { ssr: true });
const Work = dynamic(() => import("@/components/common/Work"), { ssr: true });
const Footer = dynamic(() => import("@/components/common/Footer"), { ssr: true });

export default function Home() {
  return (
    <>
      <TechBackground />
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <AboutUs />
        <Entreprise />
        <Services />
        <Clients />
        <Work />
      </main>
      <Footer />
    </>
  );
}
