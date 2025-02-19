"use client";
import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/context/LanguageContext";
import WhiteButton from "@/components/shared/WhiteButton";

interface FormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const emailjsConfig = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_92in9bi",
    templateId: "template_tk6ey0a",
    userId: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "S-dXPVeEkgkhjU6yJ",
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = language === "FR" ? "Le nom complet est requis" : "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = language === "FR" ? "L'email est requis" : "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === "FR" ? "Adresse email invalide" : "Invalid email address";
    }

    if (formData.phone && !/^\+?[\d\s-]+$/.test(formData.phone)) {
      newErrors.phone = language === "FR" ? "Numéro de téléphone invalide" : "Invalid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = language === "FR" ? "Le message est requis" : "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <section className="relative min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <WhiteButton title={language === "FR" ? "CONTACTEZ NOUS" : "CONTACT US"} handleClick={()=> console.log("Contact")} />
          <h1 className="text-4xl md:text-6xl font-semibold text-white mt-8 mb-6">
            {language === "FR" ? "Travaillons ensemble" : "Let's Work Together"}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {language === "FR" ? "Notre équipe vous contactera pour discuter de vos besoins et planifier une session de travail." : "Our team will contact you to discuss your needs and schedule a working session."}
          </p>
        </div>

        <div className="max-w-full mx-auto grid md:grid-cols-2 gap-12 items-start mt-12">
          {/* Location Map */}
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-8 md:mb-0">
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
                {language === "FR" ? "Ouvrir cet emplacement sur Google Maps" : "Open this location on Google Maps"}
              </span>
            </a>
          </div>

          {/* Form Section */}
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 shadow-2xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder={language === "FR" ? "Nom complet" : "Full Name"}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                    required
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-red-400 text-sm">{errors.fullName}</p>
                  )}
                </div>
                <div className="relative">
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={language === "FR" ? "Entreprise & Poste" : "Company & Position"}
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
                    placeholder={language === "FR" ? "Téléphone" : "Phone Number"}
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
                  placeholder={language === "FR" ? "Message" : "Message"}
                  required
                />
                {errors.message && (
                  <p className="mt-1 text-red-400 text-sm">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-white text-black rounded-xl py-4 px-8 flex items-center justify-center gap-2 hover:bg-white/90 transition-colors ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {language === "FR" ? "Envoi en cours..." : "Sending..."}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {language === "FR" ? "ENVOYER VOTRE MESSAGE" : "SEND YOUR MESSAGE"}
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
                    ? (language === "FR" ? "Message envoyé avec succès ! Nous reviendrons vers vous bientôt." : "Message sent successfully! We will get back to you soon.")
                    : (language === "FR" ? "Échec de l'envoi du message. Veuillez réessayer." : "Failed to send message. Please try again.")}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;