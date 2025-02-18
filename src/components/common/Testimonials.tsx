"use client"

import Image from "next/image"
import React, { useRef } from "react"
import { motion, useAnimationFrame } from "framer-motion"
import WhiteButton from "../shared/WhiteButton"
import Button from "../shared/Button"

const testimonials = [
  {
    text: "Working with Yalidine has been an amazing experience. Their team is highly collaborative and forward-thinking. Together, we've been able to achieve significant improvements in operational efficiency, and we’re proud of the results we’ve delivered. It’s always a pleasure to work with such a dedicated team.",
    author: "THE BRIGHTSUN TEAM",
    role: "Your Trusted Partners",
    imageUrl: "",
  },
  {
    text: "Guepex has been a fantastic partner in transforming their logistics processes. Their commitment to innovation and excellence has made our collaboration incredibly rewarding. We’ve been able to support their growth with tailored solutions, and seeing their progress has been truly fulfilling for us.",
    author: "THE BRIGHTSUN TEAM",
    role: "Your Trusted Partners",
    imageUrl: "",
  },
  {
    text: "Zimo Express has been an outstanding client to work with. Their focus on speed, efficiency, and customer satisfaction has aligned perfectly with our approach. Through our collaboration, we’ve helped them streamline their delivery operations, and it’s been exciting to see the positive impact on their business.",
    author: "THE BRIGHTSUN TEAM",
    role: "Your Trusted Partners",
    imageUrl: "",
  },
  {
    text: "The partnership with Yalidine has allowed us to bring innovative solutions to the table. Their team's drive for excellence made it possible to create seamless processes that helped them scale faster. We’re incredibly proud to have been a part of their journey and look forward to continuing this successful collaboration.",
    author: "THE BRIGHTSUN TEAM",
    role: "Your Trusted Partners",
    imageUrl: "",
  },
  {
    text: "Working alongside Guepex has been nothing short of rewarding. Their dedication to improvement and growth is inspiring, and we’ve had the privilege of helping them optimize their operations. The results have been truly remarkable, and we’re thrilled with the progress we’ve made together.",
    author: "THE BRIGHTSUN TEAM",
    role: "Your Trusted Partners",
    imageUrl: "",
  },
  {
    text: "Zimo Express has set a high bar for the logistics industry, and we’ve had the pleasure of helping them achieve even greater success. Their focus on providing top-notch customer service paired with our tailored solutions has led to measurable improvements in their operations. It’s been a true collaboration.",
    author: "THE BRIGHTSUN TEAM",
    role: "Your Trusted Partners",
    imageUrl: "",
  },
]


const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = React.useState(0)

  useAnimationFrame(() => {
    const container = containerRef.current
    const scroll = scrollRef.current

    if (container && scroll) {
      setScrollY((prevScrollY) => {
        const newScrollY = prevScrollY + 2 // Increased scroll speed
        const maxScroll = scroll.offsetHeight - container.offsetHeight
        return newScrollY > maxScroll ? 0 : newScrollY
      })
    }
  })

  return (
    <div className="min-h-screen flex items-center px-4 md:px-8 lg:px-16 py-8 overflow-hidden bg-transparent">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left space-y-8 flex flex-col justify-between h-full lg:ml-8"
        >
          <div>
            <WhiteButton title="Testimonials" handleClick={() => console.log("Testimonials")} />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-normal text-white leading-tight mb-6 font-gabarito"
          >
            Don&apos;t Take It From Us,
            <br />
            Hear It From Our Clients
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-xl text-gray-300 mb-8 md:mb-12 font-dmSans"
          >
            We drive sector transformation with tailor-made solutions and a commitment to excellence, bringing your most
            ambitious projects to life.
          </motion.p>
          <div>
            <Button title="KNOW MORE" handleClick={() => console.log("KNOW MORE")} />
          </div>
        </motion.div>

        <div className="lg:w-1/2 relative overflow-hidden h-[80vh] lg:h-svh" ref={containerRef}>
          <motion.div ref={scrollRef} style={{ y: -scrollY }} className="space-y-6 px-4 lg:px-0">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col rounded-4xl p-6 sm:p-8 border-2 border-white backdrop-blur-sm duration-700 ease-in-out hover:border-white/30 font-dmSans hover:shadow-xl hover:shadow-white/5"
              >
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Image key={i} src="/images/shared/star.svg" alt="star" width={20} height={20} className="mr-1" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed font-dmSans">{testimonial.text}</p>
                <div className="border-t-2 border-white/30 mt-6 pt-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                    {testimonial.imageUrl ? (
                      <Image
                        src={testimonial.imageUrl || "/placeholder.svg"}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium text-lg font-dmSans">{testimonial.author}</p>
                    <p className="text-white text-sm font-dmSans">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection

