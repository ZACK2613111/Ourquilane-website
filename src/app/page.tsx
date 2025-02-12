import AboutUs from "@/components/common/AboutUs";
import Clients from "@/components/common/Clients";
import Entreprise from "@/components/common/Entreprise";
import Footer from "@/components/common/Footer";
import Services from "@/components/common/Services";
import Work from "@/components/common/Work";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
    <Navbar />
    <AboutUs />
    <Entreprise />
    <Services />
    <Clients />
    <Work />
    <Footer />
    </>
  );
}
