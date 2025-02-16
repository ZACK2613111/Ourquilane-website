'use client';

import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // EmailJS configuration
  const emailjsConfig = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_xzquu6i',
    templateId: 'template_n0pcafw',
    userId: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '43BG19ER9C4zwTxcF'
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
  
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }
  
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
  
    if (formData.phone && !/^[0-9+\-\s()]*$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
  
    if (!formData.message) {
      newErrors.message = 'Message is required';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: formData.fullName,
          company: formData.company,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message
        },
        emailjsConfig.userId
      );

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormInput = ({
    name,
    value,
    error,
    ...props
  }: {
    name: keyof FormData;
    value: string;
    error?: string;
    [key: string]: string | boolean | undefined;
  }) => (
    <div className="relative">
      <input
        name={name}
        value={value}
        onChange={handleInputChange}
        {...props}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
      />
      {error && (
        <p className="mt-1 text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
  

  return (
    <section className="relative min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-semibold text-white mt-8 mb-6">
            Let&apos;s Work Together
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our team will call you to discuss your needs and schedule a work session.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              className="absolute inset-0 w-full h-full border-0 filter grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location map"
            />
          </div>

          <div className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 shadow-2xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  name="fullName"
                  value={formData.fullName}
                  error={errors.fullName}
                  placeholder="Full Name"
                  required
                />
                <FormInput
                  name="company"
                  value={formData.company}
                  placeholder="Company & Position"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  name="email"
                  value={formData.email}
                  error={errors.email}
                  placeholder="Email"
                  required
                  type="email"
                />
                <FormInput
                  name="phone"
                  value={formData.phone}
                  error={errors.phone}
                  placeholder="Phone"
                />
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
                className={`w-full bg-white text-black rounded-xl py-4 px-8 flex items-center justify-center gap-2 hover:bg-white/90 transition-colors ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
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

              {submitStatus !== 'idle' && (
                <div
                  className={`${
                    submitStatus === 'success'
                      ? 'bg-green-500/20 border-green-500/30 text-green-400'
                      : 'bg-red-500/20 border-red-500/30 text-red-400'
                  } border rounded-xl p-4 text-center`}
                >
                  {submitStatus === 'success'
                    ? "Message sent successfully! We'll get back to you soon."
                    : 'Failed to send message. Please try again.'}
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