'use client';
import { useLanguage } from "@/context/LanguageContext";
import type React from "react";
import { useRouter } from "next/navigation";
import Button from "../shared/Button";

const AboutUs: React.FC = () => {
  const { translations } = useLanguage();
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/contact");
  };

  return (
    <section
      id="about"
      className="relative w-full flex items-center justify-center mt-32 sm:mt-24 md:mt-28 lg:mt-32 xl:mt-36 2xl:mt-40"
    >
      <div className="w-full max-w-[1440px]  flex flex-col items-center justify-center px-4 sm:px-8">
        <div className="w-full text-center max-w-full">
          <h1 className="font-gabarito text-title-mobile sm:text-5xl lg:text-title-about tracking-tight text-white leading-tight sm:leading-snug">
            <span className="bg-gradient-to-r from-violetTitle to-yellowTitle bg-clip-text text-transparent  font-semibold mt-0 mr-3">
              {translations.about.titleSpan}
            </span>
            <br />
            <span className="block font-semibold mb-0 sm:mb-0">
              {translations.about.title}
            </span>
            <span className="block font-semibold mt-0 sm:mt-0">
              {translations.about.titleLine}
            </span>
          </h1>
        </div>

        <p className="font-dmSans text-base sm:text-lg md:text-xl tracking-wide max-w-[90%] md:max-w-4xl mx-auto text-grayDescription text-center mb-6 sm:mb-8">
          {translations.about.description}
        </p>

        <div className="w-64 flex items-center justify-center">
            <Button
              title={translations.about.contactButton}
              handleClick={handleRedirect}
            />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
