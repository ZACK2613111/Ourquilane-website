'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import WhiteButton from "../shared/WhiteButton";
import { useLanguage } from "@/context/LanguageContext";

const clientsLogos = [
  { id: 1, src: "/images/clients/Frame 34.svg", alt: "Logo 1" },
  { id: 2, src: "/images/clients/logo-1-1 1.svg", alt: "Logo 2" },
  { id: 3, src: "/images/clients/logo-3-1 1.svg", alt: "Logo 3" },
  { id: 4, src: "/images/clients/logo-4-1 1.svg", alt: "Logo 4" },
  { id: 5, src: "/images/clients/logo-5 1.svg", alt: "Logo 5" },
];

const Clients: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <section id="clients" className="w-full text-white py-8 px-6 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <WhiteButton
            title={translations.clients.titleButton}
            handleClick={() => console.log("Our Clients clicked")}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-start mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="font-gabarito font-semibold text-title-other tracking-[2%] text-white mb-6 sm:mb-0">
            {translations.clients.title}
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="overflow-hidden w-full relative">
            <div className="flex animate-scroll gap-8 justify-start items-center">
              {[...clientsLogos, ...clientsLogos].map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="flex-shrink-0 px-8 py-4 flex justify-center items-center"
                >
                  <Image
                    src={client.src}
                    alt={client.alt}
                    width={200}
                    height={32}
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;