"use client";
import { useLanguage } from "@/context/LanguageContext";
import React, { lazy, Suspense } from "react";

// Lazy loading Button component
const Button = lazy(() => import("@/components/shared/Button"));

const Header = () => {
  const { language } = useLanguage();
  const formURL = "https://forms.gle/crL34FXLV3FTMXj98";
  const title = language === "FR"
    ? "Innovateurs du Futur : Ourquilane"
    : "Future Innovators : Ourquilane";

  const subtitle = language === "FR"
    ? "Stagiaires & Leurs Projets"
    : "Trainees & Their Projects";

  const description = language === "FR"
    ? "Responsabiliser la prochaine génération à travers des projets pratiques et une expérience réelle."
    : "Empowering the next generation through hands-on projects and real-world experience.";

  return (
    <section
      className="mt-32 mb-24 text-center relative z-10 px-4 md:px-8"
    >
      <h1
        className="font-gabarito font-semibold sm:text-title-about tracking-[2%] text-center text-white mb-6 text-title-mobile"
      >
        <span className="block">
          <span className="bg-gradient-to-r from-[#9747FF] to-[#E9CD2A] text-transparent bg-clip-text">
            {title.split(":")[0]}
          </span>
          <span className="text-white">{title.split(":")[1]}</span>
        </span>
        <span className="block text-white">{subtitle}</span>
      </h1>

      <p
        className="font-dmSans font-normal sm:text-description tracking-[1%] max-w-4xl mx-auto mb-10 text-description-mobile text-white"
      >
        {description}
      </p>

      <div className="sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 mx-auto mt-6 max-w-md">
        <Suspense fallback={<div>Loading...</div>}>
          <Button
            title={language === "FR" ? "POSTULER MAINTENANT" : "APPLY NOW"}
            handleClick={() => window.open(formURL, "_blank")}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default Header;
