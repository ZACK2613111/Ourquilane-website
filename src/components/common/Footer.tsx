"use client";
import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Facebook,
  Instagram,
  LinkedIn,
  X,
} from "../../../public/images/social-media";

import Logo from "../../../public/images/Logo-header.svg";

const Footer: React.FC = () => {
  const { translations } = useLanguage();

  const socialLinks = [
    { icon: Facebook, name: translations.footer.socialMedia.facebook, url: "https://www.instagram.com/ourquilane" },
    { icon: LinkedIn, name: translations.footer.socialMedia.linkedin, url: "https://www.instagram.com/ourquilane" },
    { icon: X, name: translations.footer.socialMedia.twitter, url: "https://www.instagram.com/ourquilane" },
    { icon: Instagram, name: translations.footer.socialMedia.instagram, url: "https://www.instagram.com/ourquilane" },
  ];

  const footerSections = [
    { title: translations.footer.home, link: "#entreprise" },
    { title: translations.footer.aboutUs, link: "#aboutUs" },
    { title: translations.footer.services, link: "#services" },
    { title: translations.footer.projects, link: "#projects" },
    { title: translations.footer.products, link: "#" }, // No link for Products
    { title: translations.footer.trainings, link: "/trainings" }, // Route to Trainings
    { title: translations.footer.contact, link: "/contact" }, // Route to Contact
  ];

  const handleFooterLinkClick = (link: string) => {
    if (link.startsWith("#")) {
      if (window.location.pathname !== "/") {
        window.location.href = `/${link}`;
      } else {
        const section = document.querySelector(link);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      window.location.href = link;
    }
  };

  return (
    <footer className="relative bg-transparent text-white overflow-hidden border-t border-gray-800">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="space-y-6 sm:space-y-8">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo"
                width={120}  // Adjust width to be smaller for footer
                height={48}  // Adjust height to match proportionality
                className="h-8 w-auto sm:h-10 sm:w-auto" // Responsive size similar to navbar
                priority
              />
            </Link>
            <div className="flex items-center gap-4 sm:gap-6">
              {socialLinks.map((social) => (
                <div key={social.name}>
                  <Link
                    href={social.url}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={120} 
                      height={48} 
                      className="h-8 w-auto lg:h-10"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8 sm:space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-gray-800">
              <div>
                <h3 className="text-base sm:text-lg font-gabarito font-bold uppercase tracking-wider mb-2 sm:mb-4 text-white">
                  {translations.footer.contactUs}
                </h3>
                <p className="text-sm text-grayDescription font-dmSans sm:text-description">(+213) 550923561</p>
                <br />
                <p className="text-sm text-grayDescription font-dmSans sm:text-description">admin@ourquilane.dz</p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-gabarito font-bold uppercase tracking-wider mb-2 sm:mb-4">
                  {translations.footer.findUs}
                </h3>
                <p className="text-grayDescription font-dmSans text-sm sm:text-base">Hydra, Algiers</p>
              </div>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 sm:gap-6">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleFooterLinkClick(section.link)}
                    className="block text-white font-semibold transition-colors mb-2 font-dmSans text-sm sm:text-base hover:text-gray-300"
                  >
                    {section.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
          <p className="text-grayDescription font-dmSans text-sm sm:text-description">
            {translations.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
