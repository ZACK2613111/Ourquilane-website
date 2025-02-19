"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
    { icon: Facebook, name: translations.footer.socialMedia.facebook },
    { icon: LinkedIn, name: translations.footer.socialMedia.linkedin },
    { icon: X, name: translations.footer.socialMedia.twitter },
    { icon: Instagram, name: translations.footer.socialMedia.instagram },
  ];

  const footerSections = [
    {
      title: translations.footer.home,
    },
    {
      title: translations.footer.aboutUs,
    },
    {
      title: translations.footer.services,
    },
    {
      title: translations.footer.projects,
    },
    {
      title: translations.footer.products,
    },
    {
      title: translations.footer.trainings,
    },
    {
      title: translations.footer.contact,
    },
  ];

  return (
    <footer className="relative bg-transparent text-white overflow-hidden border-t  border-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="space-y-8">
            <Image
              src={Logo}
              alt="Logo"
              width={300}
              height={300}
              className="max-w-fulll"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6"
            >
              {socialLinks.map((social) => (
                <motion.div key={social.name} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#"
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
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b border-gray-800">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-lg font-gabarito font-bold uppercase tracking-wider mb-4">
                  {translations.footer.contactUs}
                </h3>
                <p className="text-gray-400 font-dmSans">(+213) 550923561</p>
                <br />
                <p className="text-gray-400 font-dmSans">admin@ourquilane.dz</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-lg font-gabarito font-bold uppercase tracking-wider mb-4">
                  {translations.footer.findUs}
                </h3>
                <p className="text-gray-400 font-dmSans">Hydra, Algiers</p>
              </motion.div>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
              {footerSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href="#"
                    className="block text-white transition-colors mb-2 font-dmSans text-base"
                  >
                    {section.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <p className="text-gray-500 font-satoshi text-base">
            {translations.footer.copyright}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
