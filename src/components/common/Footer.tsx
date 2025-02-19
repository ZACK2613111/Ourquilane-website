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
      // If the link is a section (e.g., #services), redirect to home first
      if (window.location.pathname !== "/") {
        window.location.href = `/${link}`;
      } else {
        // If already on the home page, scroll to the section
        const section = document.querySelector(link);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // If the link is a route (e.g., /contact), navigate directly
      window.location.href = link;
    }
  };

  return (
    <footer className="relative bg-transparent text-white overflow-hidden border-t border-gray-800">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="space-y-8">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo"
                width={300}
                height={300}
                className="max-w-full"
              />
            </Link>
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <div key={social.name}>
                  <Link
                    href={social.url}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={30}
                      height={30}
                      className="w-7 h-7"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b border-gray-800">
              <div>
                <h3 className="text-lg font-gabarito font-bold uppercase tracking-wider mb-4 text-white">
                  {translations.footer.contactUs}
                </h3>
                <p className="text-description text-grayDescription font-dmSans">(+213) 550923561</p>
                <br />
                <p className="text-description text-grayDescription font-dmSans">admin@ourquilane.dz</p>
              </div>

              <div>
                <h3 className="text-lg font-gabarito font-bold uppercase tracking-wider mb-4">
                  {translations.footer.findUs}
                </h3>
                <p className="text-grayDescription font-dmSans">Hydra, Algiers</p>
              </div>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleFooterLinkClick(section.link)}
                    className="block text-white transition-colors mb-2 font-dmSans text-base hover:text-gray-300"
                  >
                    {section.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-grayDescription font-satoshi text-base">
            {translations.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);