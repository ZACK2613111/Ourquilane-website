"use client";
import Button from "@/components/shared/Button";
import { useLanguage } from "@/context/LanguageContext";
import React, { Suspense } from "react";


const JoinUs = () => {
  const { language } = useLanguage();
  const title = language === "FR"
    ? "Rejoignez-Nous : Stages, Candidatures et Opportunités"
    : "Join Us: Internships, Applications, and Opportunities";

  const description = language === "FR"
    ? "Postulez dès maintenant et vivez une expérience formatrice au sein de notre équipe dynamique."
    : "Apply now and experience a formative journey with our dynamic team.";

  const buttonTitle = language === "FR" ? "POSTULER MAINTENANT" : "APPLY NOW";

  // URL of the Google Form
  const formURL = "https://forms.gle/crL34FXLV3FTMXj98";

  return (
    <section className="text-center relative z-10 flex flex-col items-center justify-center text-white px-4 md:px-8 my-10">
      <h1 className="font-gabarito font-semibold text-title-mobile sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center tracking-wide mt-4 sm:mt-8 mb-6">
        <span className="block">
          <span className="block text-white">{title.split(",")[0]}</span>
          <span className="text-white">{title.split(",")[1]}</span>
        </span>
      </h1>

      <p className="font-dmSans font-normal text-description-mobile sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide mt-4 sm:mt-6 text-white/80 mb-6">
        {description}
      </p>

      {/* Button container adjusted for responsiveness */}
      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 mx-auto mt-6">
        <Suspense fallback={<div>Loading...</div>}>
          <Button
            title={buttonTitle}
            handleClick={() => window.open(formURL, "_blank")}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default JoinUs;
