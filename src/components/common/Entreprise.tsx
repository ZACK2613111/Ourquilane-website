'use client'
import React from 'react'
import WhiteButton from '../shared/WhiteButton'
import Button from '../shared/Button'
import Image from 'next/image'
import Logo from "../../../public/images/logo.png"

const Entreprise = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6">
      {/* Flex Container */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">

        {/* Left Content (Text Section - 2/3 width) */}
        <div className="lg:w-2/3 text-center lg:text-left">
          <div className="mb-8 lg:mb-12 ">
            <WhiteButton 
              handleClick={() => console.log('Who Are We clicked')} 
              title="WHO ARE WE"
            />
          </div>

          <h1 className="font-neueGraphica text-4xl md:text-5xl  font-semibold text-white leading-tight mb-6 max-w-4xl mx-auto">
            Ourquilane, a leader in R&D for innovative and efficient software solutions
          </h1>

          <p className="font-satoshi text-base md:text-xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto lg:mx-0">
            We drive sector transformation with tailor-made solutions<br className="hidden md:block" />
            and a commitment to excellence, bringing your most<br className="hidden md:block" />
            ambitious projects to life.
          </p>

          {/* Know More Button */}
          <div className="flex justify-center lg:justify-start">
            <Button
              handleClick={() => console.log('Know More clicked')} 
              title="KNOW MORE" 
            />
          </div>
        </div>

        {/* Right Content (Image Section - 1/3 width) */}
        <div className="lg:w-1/3 flex justify-center lg:justify-end">
          <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] animate-rotateLogo">
            <Image 
              src={Logo} 
              alt="logo" 
              fill
              className="rounded-full object-contain shadow-xl"
              sizes="(max-width: 768px) 200px, 300px"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Entreprise
