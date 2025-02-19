"use client";
import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

interface FormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const emailjsConfig = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_xzquu6i",
    templateId: "template_n0pcafw",
    userId: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "43BG19ER9C4zwTxcF",
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.phone && !/^\+?[\d\s-]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: formData.fullName,
          company: formData.company,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        emailjsConfig.userId
      );

      setSubmitStatus("success");
      setFormData({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-6xl font-semibold text-white mt-8 mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Let&apos;s Work Together
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Our team will call you to discuss your needs and schedule a work
            session.
          </motion.p>
        </div>

        <div className="max-w-full mx-auto grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15518.763978510458!2d3.0439533!3d36.745955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128b7d2dff91c6ad%3A0x9c8907b5044d5c9d!2s36.745955%2C3.0439533!5e0!3m2!1sen!2s!4v1617752984961!5m2!1sen!2s"
                className="absolute inset-0 w-full h-full border-0 filter grayscale contrast-125"
                title="Location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="http://maps.google.com/?ll=36.745955,3.0439533"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 w-full h-full border-0 filter grayscale contrast-125"
              >
                <span className="sr-only">
                  Open this location in Google Maps
                </span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 shadow-2xl border border-white/10"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                    required
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-red-400 text-sm">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company & Position"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                    required
                    type="email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="relative">
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-red-400 text-sm">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors min-h-[150px]"
                  placeholder="Message"
                  required
                />
                {errors.message && (
                  <p className="mt-1 text-red-400 text-sm">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-white text-black rounded-xl py-4 px-8 flex items-center justify-center gap-2 hover:bg-white/90 transition-colors ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    SEND YOUR MESSAGE
                  </>
                )}
              </button>

              {submitStatus !== "idle" && (
                <div
                  className={`${submitStatus === "success"
                      ? "bg-green-500/20 border-green-500/30 text-green-400"
                      : "bg-red-500/20 border-red-500/30 text-red-400"
                    } border rounded-xl p-4 text-center`}
                >
                  {submitStatus === "success"
                    ? "Message sent successfully! We'll get back to you soon."
                    : "Failed to send message. Please try again."}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactForm;
