"use client"
import Button from "@/components/shared/Button";

const AboutUs = () => {
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center">
      <div className="max-w-full mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <h1 className="font-neueGraphica text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6 max-w-4xl mx-auto">
          Custom Innovation & Excellence to Modernize Your Industry
        </h1>

        <p className="font-satoshi text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-10 leading-relaxed">
          Experience the future with OURQUILANE—your trusted partner in innovative software solutions. Discover our
          services, projects, and expert team dedicated to bringing your ideas to life.
        </p>

        <div className="flex items-center justify-center">
          <Button handleClick={handleContactClick} title="CONTACT US" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
