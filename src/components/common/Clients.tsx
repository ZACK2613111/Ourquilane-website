'use client';
import React, { memo } from "react";
import Image from "next/image";
import WhiteButton from "../shared/WhiteButton";
import { useLanguage } from "@/context/LanguageContext";
import { Guepex, Yalidine, WeCan, EasySpeed, Varbiof, SpeedMail } from '../../../public/images/clients';

const clientsLogos = [
  { id: 1, src: Guepex, alt: "Guepex" },
  { id: 2, src: Yalidine, alt: "Yalidine" },
  { id: 3, src: EasySpeed, alt: "EasySpeed" },
  { id: 4, src: WeCan, alt: "WeCan" },
  { id: 5, src: Varbiof, alt: "Varbiof" },
  { id: 6, src: SpeedMail, alt: "Speedmail" },
];

const ClientLogo: React.FC<{ client: { src: string; alt: string }; index: number }> = (
  ({ client, index }) => {
    return (
      <div
        key={`${client.alt}-${index}`}
        className="flex-shrink-0 px-8 py-4 flex justify-center items-center"
      >
        <Image
          src={client.src}
          alt={client.alt}
          width={240} 
          height={60} 
          className="object-contain" // Maintain aspect ratio
          loading={index < 3 ? "eager" : "lazy"}
          priority={index < 3}
        />
      </div>
    );
  }
);

const Clients: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <section id="clients" className="w-full text-white py-8 px-6 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-6 sm:mb-8">
          <WhiteButton
            title={translations.clients.titleButton}
            handleClick={() => console.log("Our Clients clicked")}
          />
        </div>

        <div className="flex flex-col items-start mb-8 sm:mb-10 md:mb-12">
          <h2 className="font-gabarito font-semibold sm:text-title-other tracking-[2%] text-left text-grayDescription mb-6 text-title-mobile">
            {translations.clients.title}
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden w-full relative">
            <div className="flex animate-scroll gap-8 justify-start items-center space-x-8">
              {[...clientsLogos, ...clientsLogos].map((client, index) => (
                <ClientLogo client={client} index={index} key={`${client.id}-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Clients);
