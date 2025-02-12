'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../shared/Button";
import facebook from "../../../public/images/social-media/facebook.svg";
import x from "../../../public/images/social-media/x.svg";
import instagram from "../../../public/images/social-media/instagram.svg";
import linkedin from "../../../public/images/social-media/linkedin.svg";

const Footer = () => {
  const handleSubscribe = () => {
    console.log("Subscribe clicked");
  };

  return (
    <footer className="border-t border-[#F0EDF4] text-white">
      <div className="w-full mx-auto px-5 lg:px-20 py-16">
        <div className="grid grid-cols-3 gap-16">
          {/* Left Column (1/3 width) - Subscription Section */}
          <div className="col-span-1 space-y-8">
            {/* Logo */}
            <h2 className="text-3xl font-satoshi font-bold font-satochi">OURQUILANE</h2>

            {/* Description */}
            <p className="text-3xl font-satoshi font-bold font-satochi">
              Tech stories you won&apos;t read anywhere else.
            </p>

            {/* Email Subscription */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="bg-transparent border-b border-gray-200 p-2 flex-grow focus:outline-none font-satoshi"
                />
                <Button title="Subscribe" handleClick={handleSubscribe} />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              {[
                { icon: facebook, name: "Facebook" },
                { icon: linkedin, name: "LinkedIn" },
                { icon: x, name: "X" },
                { icon: instagram, name: "Instagram" },
              ].map((social) => (
                <Link
                  href="#"
                  key={social.name}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={40}
                    height={40}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column (2/3 width) - Footer Sections */}
          <div className="col-span-2 space-y-8">
            {/* Top Section */}
            <div className="pb-8 border-b border-[#F0EDF4]">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h3 className="text-sm font-satoshi font-bold uppercase tracking-wider mb-4">CONTACT US</h3>
                  <p className="text-gray-400 font-satochi ">(+213) 550923561</p>
                  <p className="text-gray-400 font-satochi ">yourcompany@ourquilane.dz</p>
                </div>
                <div>
                  <h3 className="text-sm font-satoshi font-bold uppercase tracking-wider mb-4">FIND US IN ALGERIA</h3>
                  <p className="text-gray-400 font-satochi font-satoshi">Hydra, Algiers</p>
                </div>
              </div>
            </div>

            {/* Bottom Section - Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
              <div>
                <h4 className="font-satoshi text-lg font-bold mb-4">Navigation</h4>
                <Link href="#" className="block text-gray-400 font-satochi hover:text-white transition-colors mb-2">Home</Link>
                <Link href="#" className="block text-gray-400 font-satochi hover:text-white transition-colors mb-2">About</Link>
                <Link href="#" className="block text-gray-400 font-satochi hover:text-white transition-colors mb-2">Services</Link>
                <Link href="#" className="block text-gray-400 font-satochi hover:text-white transition-colors mb-2">Clients</Link>
                <Link href="#" className="block text-gray-400 font-satochi hover:text-white transition-colors mb-2">Projects</Link>
                <Link href="#" className="block text-gray-400 font-satochi hover:text-white transition-colors mb-2">Testimonials</Link>
              </div>

              <div>
                <h4 className="font-satoshi text-lg font-bold mb-4">About Us</h4>
                <Link href="#" className="block text-gray-400 font-satochi hover:text-white transition-colors mb-2">History</Link>
                <Link href="#" className="block text-gray-400 font-satochi hover:text-white transition-colors mb-2">Mission</Link>
                <Link href="#" className="block text-gray-400 font-satochi hover:text-white transition-colors mb-2">Vision</Link>
                <Link href="#" className="block text-gray-400 font-satochi hover:text-white transition-colors mb-2">Values</Link>
                <Link href="#" className="block text-gray-400 font-satochi hover:text-white transition-colors mb-2">Team</Link>
              </div>

              <div>
                <h4 className="font-satoshi text-lg font-bold mb-4">Services</h4>
                
              </div>

              <div>
                <h4 className="font-satoshi text-lg font-bold mb-4">Projects</h4>
              </div>
              <div>
                <h4 className="font-satoshi text-lg font-bold mb-4">Training</h4>
              </div>
              <div>
                <h4 className="font-satoshi text-lg font-bold mb-4">Contact</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-[#F0EDF4] mt-12 pt-8 text-left">
          <p className="text-gray-400 font-satochi font-satoshi text-sm">
            2025 OURQUILANE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
