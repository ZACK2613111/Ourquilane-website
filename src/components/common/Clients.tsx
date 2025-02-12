'use client'
import React from "react";
import Image from "next/image";
import WhiteButton from "../shared/WhiteButton";

const clientsLogos = [
  { id: 1, src: "/images/clients/Frame 34.svg", alt: "Logo 1" },
  { id: 2, src: "/images/clients/logo-1-1 1.svg", alt: "Logo 2" },
  { id: 3, src: "/images/clients/logo-3-1 1.svg", alt: "Logo 3" },
  { id: 4, src: "/images/clients/logo-4-1 1.svg", alt: "Logo 4" },
  { id: 5, src: "/images/clients/logo-5 1.svg", alt: "Logo 5" },
];

const Clients: React.FC = () => { 
  return (
    <section id="clients" className="w-full text-white py-8 ">
      <div className="max-w-full mx-auto">
        <div className="mb-6 sm:mb-8 mx-28">
          <WhiteButton
            title="OUR CLIENTS"
            handleClick={() => console.log("Our Clients clicked")}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 md:mb-12 mx-28">
        <h2 className="font-neueGraphica text-4xl md:text-5xl font-bold leading-tight mb-6 sm:mb-0 max-w-2xl">
          Our Trusted Clients
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 w-full border-t border-white z-10" ></div>

          <div className="flex flex-col sm:flex-row gap-8 justify-between z-10">
            <div className="w-full border-white rounded-lg p-6 relative z-10">
              <div className="overflow-visible relative">
                <div className="flex animate-scroll will-change-transform">
                  {clientsLogos.map((client) => (
                    <div
                      key={client.id}
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
                  {clientsLogos.map((client) => (
                    <div
                      key={`duplicate-${client.id}`}
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
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full border-b border-white z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
