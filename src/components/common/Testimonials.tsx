"use client"

import Image from "next/image"
import React, { useRef } from "react"
import { motion, useAnimationFrame } from "framer-motion"
import WhiteButton from "../shared/WhiteButton"
import Button from "../shared/Button"

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "DERBAL RAYHANE",
    role: "CEO, BrightSun",
    imageUrl: "/images/shared/person1.jpg",
  },
  {
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "DERBAL RAYHANE",
    role: "CEO, BrightSun",
    imageUrl: "",
  },
  {
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "DERBAL RAYHANE",
    role: "CEO, BrightSun",
    imageUrl: "",
  },
  {
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "DERBAL RAYHANE",
    role: "CEO, BrightSun",
    imageUrl: "",
  },
  {
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "DERBAL RAYHANE",
    role: "CEO, BrightSun",
    imageUrl: "",
  },
  {
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "DERBAL RAYHANE",
    role: "CEO, BrightSun",
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
            className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6 font-neueGraphica"
          >
            Don&apos;t Take It From Us,
            <br />
            Hear It From Our Clients
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-xl text-gray-300 mb-8 md:mb-12 font-satochi"
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
                className="group relative flex flex-col rounded-4xl p-6 sm:p-8 border-2 border-white backdrop-blur-sm duration-700 ease-in-out hover:border-white/30 font-satochi hover:shadow-xl hover:shadow-white/5"
              >
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Image key={i} src="/images/shared/star.svg" alt="star" width={20} height={20} className="mr-1" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed font-satochi">{testimonial.text}</p>
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
                    <p className="text-white font-medium text-lg font-satochi">{testimonial.author}</p>
                    <p className="text-white text-sm font-satochi">{testimonial.role}</p>
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

